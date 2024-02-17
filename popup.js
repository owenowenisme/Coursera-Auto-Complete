document.addEventListener('DOMContentLoaded', function() {
    var startButton = document.getElementById('start');
    var statusDiv = document.getElementById('status'); // Get the status div

    startButton.addEventListener('click', function() {
        statusDiv.textContent = 'Starting...'; // Provide immediate feedback when the button is clicked
        chrome.runtime.sendMessage({action: "getDoc"}, function(response) {
            console.log(response);
            // Update the status div with the response or a completion message
            statusDiv.textContent = response ? `Response: ${response}` : 'Completed!';
            if (response === 'ok') {
                statusDiv.textContent = 'Completed!';
                
            }   
        });
    }, false);
}, false);
