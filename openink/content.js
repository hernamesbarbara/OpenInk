// this is the code which will be injected into a given page...

function respond(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    console.log(request);
    sendResponse(request);
}
chrome.runtime.onMessage.addListener(respond);


function callback(res) {
    console.log("callback in content.js");
    if (typeof res != "undefined" && res.status == "OK") {
        // do something
        console.log(res);
    } else {
        console.log("content.js: argument `res` passed to callback had an error");

    }
}

function getSelectionText() {
    console.log("inside getSelectionText");

    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if ((activeElTagName == "textarea") || (activeElTagName == "input" &&
            /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) && (typeof activeEl.selectionStart == "number")) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}


function highlightSelectedBlock(event) {
    // TODO Filter only selections
    window.getSelection().baseNode.parentNode.style.backgroundColor = "#eae64b"
}

document.onmouseup = document.onkeyup = document.onselectionchange = function () {
    // document.getElementById("sel").value = getSelectionText();
    text = getSelectionText();

    msg = {
        'message': 'submit_text',
        'data': text
    }
    chrome.runtime.sendMessage(msg, callback);

};


document.addEventListener('mouseup', highlightSelectedBlock)
