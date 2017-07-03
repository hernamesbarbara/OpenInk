console.log("event.js => init");

function runContentJs(tab) {
    var js = ["./js/content.js"];
    js.forEach(function (filename) {
        chrome.tabs.executeScript(tab.id, {file: filename});
    });
}

function injectCss(tab) {
    var css = ["./css/style.css"];
    css.forEach(function (filename) {
        chrome.tabs.insertCSS(tab.id, {file: filename});
    });
}

function onUserHighlights(msg) {
    var el = msg.element;
    var text = msg.text;
    var data = {element: el, text: text}
    return (data)
}

// chrome.tabs.sendMessage(tab.id, {message: "init"}, function (res) {});

chrome.browserAction.onClicked.addListener(injectCss);
chrome.browserAction.onClicked.addListener(runContentJs);

var data;
chrome.runtime.onMessage.addListener(function (message, sender) {
    console.log(message);
    if (message.message == "user highlight") {
        data = onUserHighlights(message);
    }
});
