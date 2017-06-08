
var seltext = null;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    switch(request.message)
    {
        case 'setText':
            // window.seltext = request.data
            console.log("background.js received the following data:");
            console.log(request);
            sendResponse({status: "OK", data: request.data});
        break;

        default:
            sendResponse({data: 'Invalid arguments'});
        break;
    }
});


