console.log("content.js => init");

function getSerializedHighlights() {
    var idx = window.location.search.indexOf("=")+1;
    var params = decodeURIComponent(window.location.search.slice(idx));
    return params;
}

var serializedHighlights = getSerializedHighlights();
var highlighter;
var initialDoc;

rangy.init();

highlighter = rangy.createHighlighter();

var highlightOpts = {
    ignoreWhiteSpace: true,
    tagNames: ["span", "a"]
}

highlighter.addClassApplier(rangy.createClassApplier("highlight", highlightOpts));

if (serializedHighlights) {
    try {
        highlighter.deserialize(serializedHighlights);
    } catch (err) {
        console.log("Couldn't deserialize highlights given the query params in the URL.");
        console.log("Either this page has no highlights, or something went wrong.\n");
    }
}

function highlightSelectedText() {
    highlighter.highlightSelection("highlight");
}

function removeHighlightFromSelectedText() {
    highlighter.unhighlightSelection();
}

function highlightScopedSelectedText() {
    highlighter.highlightSelection("highlight", { containerElementId: "summary" });
}

function reloadPage(button) {
    button.form.elements["serializedHighlights"].value = highlighter.serialize();
    button.form.submit();
}

function appendButton(parent_element, button_label, button_id) {
    var tag = document.createElement('input');
    tag.id = button_id;
    tag.type = 'button';
    tag.value = button_label;
    parent_element.appendChild(tag);
}

function sendHighlights(highlightedElement) {
    var payload = {
        message: "user highlight",
        element: highlightedElement,
        text: $(".highlight").text()
    };
    chrome.runtime.sendMessage(payload, function (response) {
        console.log(response);
    });
}

if (document.getElementById("openink-btn") == null) {
    appendButton(document.body, "Highlight!", "openink-btn");
}

if (document.getElementById("openink-reload-btn") == null) {
    var tag = document.createElement("form");
    tag.id  = "openink-reload-form";
    tag.action = window.location.href;
    tag.method = "get";
    document.body.appendChild(tag);
    appendButton(tag, "Reload Page", "openink-reload-btn");
}

$("input#openink-btn").click(function() {
    sendHighlights(highlighter.highlightSelection("highlight")[0]);
});

var target;
$("input#openink-reload-btn").click(function (evt) {
    var payload = {
        message: "reload page",
        element: evt.target
    };
    console.log(evt.target);
    chrome.runtime.sendMessage(payload, function (response) {
        console.log(response);
    });
});
