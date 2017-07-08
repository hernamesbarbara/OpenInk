console.log("event.js => init");

function injectCss(tab) {
    var css = ["./css/style.css"];
    css.forEach(function (filename) {
        chrome.tabs.insertCSS(tab.id, {file: filename});
    });
}

function injectJs(tab, filename) {    
    chrome.tabs.executeScript(tab.id, {file: filename});
}

function injectJquery(tab) {
    injectJs(tab, "./js/jquery-3.2.1.min.js");
}

function injectTooltip(tab) {
    injectJs(tab, "./js/injecttooltip.js");
}

function injectContent(tab) {
    injectJs(tab, "./js/content.js");
}

function onUserHighlights(msg) {
    var el = msg.element;
    var text = msg.text;
    var data = {element: el, text: text};
    return (data)
}

chrome.browserAction.onClicked.addListener(injectCss);
chrome.browserAction.onClicked.addListener(injectJquery);
chrome.browserAction.onClicked.addListener(injectTooltip);
chrome.browserAction.onClicked.addListener(injectContent);


var data;
chrome.runtime.onMessage.addListener(function (message, sender) {
    console.log(message);
    if (message.message == "user highlight") {
        data = onUserHighlights(message);
    }
});



