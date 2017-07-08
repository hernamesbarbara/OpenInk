console.log("content.js => init");

if (document.getElementById("openink-tooltip") == null) {
    var tag = document.createElement("div");
    tag.id = "openink-tooltip";
    document.body.appendChild(tag);
}

$("#openink-tooltip").load("../html/tooltip.html");

console.log($("a")[0]);

function getSerializedHighlights() {
    var idx = window.location.search.indexOf("=") + 1;
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
    highlighter.highlightSelection("highlight", {
        containerElementId: "summary"
    });
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
