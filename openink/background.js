function parseResponse(req) {
    // handle any text data selected by the user and sent from content.js
    var res;
    console.log("parseResponse called in background.js");
    if (typeof req.data != "undefined" && req.data != "") {
        console.log("TODO: save data here...");
        console.log(req);
        // do something with the data
        res = {
            message: "received_text",
            data: req.data,
            status: "OK"
        }
        
    } else {
        res = {
            message: "no_data",
            data: "",
            status: "OK"
        }
    }
    return (res)
}

// construct an error message response object
function getErrorResponse(message, err_text) {
    var res = {
        status: "ERROR",
        data: err_text,
        message: message
    }
    return (res);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var res;
    if (typeof request == "undefined") {
        res = getErrorResponse("request_error", "Invalid message received in background.js");
    } 
    else {
        switch (request.message) {
            case "submit_text":
                res = parseResponse(request);
                break;

            default:
                res = getErrorResponse("Unrecognized message name was passed " + request.message);
        }
    }
    sendResponse(res);
});
