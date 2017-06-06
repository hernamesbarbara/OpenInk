chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    var res;
    if (request.method == "getSelection") {
        res = {data: window.getSelection().toString(), url: window.location.href}
    }
    else {
        res = {}
    }
    console.log("sending...");
    sendResponse(res); // snub them.
});


s = window.getSelection()
$('.'+s.baseNode.parentElement.parentElement.className.toString())
