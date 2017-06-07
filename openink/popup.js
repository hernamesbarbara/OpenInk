function getSelectedText() {
    return ("window.getSelection().toString()");
}

chrome.tabs.executeScript({code: getSelectedText()}, 
    function(selection) {
        document.getElementById("output").innerHTML = selection[0];
});
