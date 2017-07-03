console.log("saveselection.js => init");

function restoreSelection() {
    rangy.init();
    rangy.restoreSelectionFromCookie();
}

var selectionSaved = false;

function saveSelection() {
    if (!selectionSaved) {
        rangy.saveSelectionCookie();
        selectionSaved = true;
    }
}

restoreSelection();
saveSelection();
