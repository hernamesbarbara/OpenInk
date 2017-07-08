console.log("popup_script.js init");

function onHighlight(evt) {
	console.log("onHighlight called");
	console.log(evt);
}

$(document).ready(function() {
  $("#highlight-link").click(onHighlight);
});
