console.log("i am background script");
function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "getDoc"){
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "getHTML" ,tab_id:tabs[0].id}, (response) => {
                console.log(response);
            });
          });
          sendResponse("ok");
    }
    return true;
});



