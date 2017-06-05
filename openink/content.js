// content.js

$('body').addClass("openink");
$('div').addClass("openink");
$('p').addClass("openink");

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if( request.message === "clicked_browser_action" ) {
            var firstHref = $("a[href^='http']").eq(0).attr("href");
            console.log(firstHref);
        }
    }
);

$("p.openink").select(function (e) { 
    console.log('got here');
});
