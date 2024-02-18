chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'getHTML') {
    var videoItemId = [];
    var readingItemId = [];
    var dict = {};
    document.querySelectorAll('[data-testid="named-item-list-list"]').forEach(function (aa) {
      aa.querySelectorAll('li').forEach(function (a) {
        var xpathEvaluator = new XPathEvaluator();
        var result = xpathEvaluator.evaluate(
          './div/a',
          a,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        );
        if (!result.singleNodeValue) {
          return;
        }
        dict = JSON.parse(result.singleNodeValue.getAttribute('data-click-value'));

        if (dict.href.split('/')[3] === 'lecture') {
          videoItemId.push(dict.href.split('/')[4]);
        }
        if (dict.href.split('/')[3] === 'supplement') {
          readingItemId.push(dict.href.split('/')[4]);
        }
      });
    });
    courseName = JSON.parse(
      document
        .querySelector('[data-testid="named-item-list-list"] li div a')
        .getAttribute('data-click-value')
    ).href.split('/')[2];
    courseId = dict.course_id;
    videoItemId.forEach((id) => {
      fetch(
        `https://www.coursera.org/api/opencourse.v1/user/${userId}/course/${courseName}/item/${id}/lecture/videoEvents/ended?autoEnroll=false`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            authority: 'www.coursera.org',
            accept: '*/*',
            'accept-language': 'en',
            'cache-control': 'no-cache',
            'content-type': 'application/json; charset=UTF-8',
            dnt: '1',
            origin: 'https://www.coursera.org',
            pragma: 'no-cache',
            referer: `https://www.coursera.org/api/opencourse.v1/user/${userId}/course/${courseName}/item/${id}/lecture/videoEvents/ended?autoEnroll=false`,
            'sec-ch-ua': '"Not A(Brand";v="99", "Microsoft Edge";v="121", "Chromium";v="121"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36 Edg/121.0.0.0',
          },
          body: JSON.stringify({
            contentRequestBody: {},
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error('Error:', error));
    });
    readingItemId.forEach((id) => {
      fetch(`https://www.coursera.org/api/onDemandSupplementCompletions.v1`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          authority: 'www.coursera.org',
          accept: '*/*',
          'accept-language': 'en',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          dnt: '1',
          origin: 'https://www.coursera.org',
          pragma: 'no-cache',
          referer: '',
          'sec-ch-ua': '"Not A(Brand";v="99", "Microsoft Edge";v="121", "Chromium";v="121"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36 Edg/121.0.0.0',
        },
        body: JSON.stringify({
          userId: userId,
          courseId: courseId,
          itemId: id,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error('Error:', error));
    });
    sendResponse('ok');
    setTimeout(function () {
      location.reload();
    }, 1000);
    return true;
  }
});
