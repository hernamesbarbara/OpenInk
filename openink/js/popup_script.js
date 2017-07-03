console.log("popup_script.js init");


//region {variables and functions}
var consoleGreeting = "Hello World! - from popup_script.js";
//Active-URL can also be cached
//var activeURL = "";
var noteElementID = "note";
var saveButtonID = "save_button";
var removeButtonID = "remove_button";
var noteElement = null;
var saveButton = null;
var removeButton = null;
var queryInfo = {"active":true};
function logSuccess(task) {
	console.log("%s Successful!",task);
	chrome.browserAction.setBadgeText({"text":localStorage.length.toString()});
}
//function logFailure(task) {console.log("%s Failed!",task);}
function loadNoteForActiveURL(noteElement) {
	chrome.tabs.query(queryInfo,function(tabs) {
		var activeURL = tabs[0].url;
		noteElement.value = localStorage.getItem(activeURL);
		logSuccess("Get-Storage");
	});
}
function softSave(noteText) {} //appends the text
function hardSave(noteText) { //overwrites the text
	chrome.tabs.query(queryInfo,function(tabs) {
		var activeURL = tabs[0].url;
		localStorage.setItem(activeURL,noteText);
		logSuccess("Set-Storage");
	});
}
function removeNote() {
		chrome.tabs.query(queryInfo,function(tabs) {
		var activeURL = tabs[0].url;
		localStorage.removeItem(activeURL);
		logSuccess("Remove-Storage");
	});
}
//end-region



//region {calls}
console.log(consoleGreeting);
document.addEventListener('DOMContentLoaded',function(dcle) {
	saveButton = document.getElementById(saveButtonID);
	removeButton = document.getElementById(removeButtonID);
	noteElement = document.getElementById(noteElementID);

	//Load note for active URL (if it was stored before)
	loadNoteForActiveURL(noteElement);
	chrome.browserAction.setBadgeBackgroundColor({"color":[255,0,0,255]})
	//Add listeners to buttons
	saveButton.addEventListener('click',function(ce) {
		var noteText = noteElement.value;
		if(noteText.length > 0) hardSave(noteText);
	});
	removeButton.addEventListener('click',function(ce) {
		removeNote();
	});
});
//end-region
