function respond (request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    console.log(request);
    
    sendResponse(request);
}
chrome.runtime.onMessage.addListener(respond);

function callback(res) {
    console.log("callback in content.js");
    console.log(res);
    if (res.status=="OK") {
        alert("RECEIVED DATA "+res.data);
    }
    
}

document.addEventListener('mouseup', function(event) {
        var sel = window.getSelection().toString();
        chrome.runtime.sendMessage({'message': 'setText','data': sel}, callback)
});




