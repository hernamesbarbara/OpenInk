// this is the code which will be injected into a given page...

function highlight(range) {
  var textNodes = allTextNodes(range)

  // Wrap all child text nodes
  textNodes.forEach(function(node) {
    var range = document.createRange()
    range.selectNodeContents(node)
    range.surroundContents(wrapperNode())
  })

  if (range.startContainer === range.endContainer) {
    range.surroundContents(wrapperNode())
  } else {
    // Wrap start and end elements
    wrapPartial(range, range.startContainer, 'start')
    wrapPartial(range, range.endContainer, 'end')
  }

  // Kill existing user selection
  window.getSelection().removeAllRanges()

  function allTextNodes(range) {
    var nodeIterator = document.createNodeIterator(range.commonAncestorContainer, NodeFilter.SHOW_TEXT, rejectEmpty)
      , mark = false
      , nodes = []
      , node

    while(node = nodeIterator.nextNode()) {
      if (node == range.startContainer) {
        mark = true
        continue
      } else if (node === range.endContainer) {
        break
      }

      if (mark) nodes.push(node)
    }

    return nodes

    function rejectEmpty(node) {
      if (node.data.match(/^\s+$/)) return NodeFilter.FILTER_SKIP

      return NodeFilter.FILTER_ACCEPT
    }
  }

  function wrapPartial(range, node, position) {
    var startOffset = position === 'start' ? range.startOffset : 0
      , endOffset = position === 'start' ? node.length : range.endOffset
      , range = document.createRange()

    range.setStart(node, startOffset)
    range.setEnd(node, endOffset)

    range.surroundContents(wrapperNode())
  }

  function wrapperNode(type) {
    if (type === undefined) type = 'span'
    var elem = document.createElement(type)
    elem.style.backgroundColor = 'yellow'
    return elem
  }
}

function respond(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    console.log(request);
    sendResponse(request);
}
chrome.runtime.onMessage.addListener(respond);


function getSelectionText() {
    console.log("inside getSelectionText");
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if ((activeElTagName == "textarea") || (activeElTagName == "input" &&
            /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) && (typeof activeEl.selectionStart == "number")) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}


function callback(res) {
    if (res.message == "received_text" && res.status == "OK" && typeof res.data != "undefined" && res.data.length >= 1) {
        var sel = window.getSelection();
        var text = getSelectionText();
        var range = sel.getRangeAt(0);
        if (range.startContainer.data.trim().length >= 10) {
            highlight(range);
        }
    }
}

document.onmouseup = document.onkeyup = document.onselectionchange = function () {
    var msg = {
        message: "submit_text",
        data: getSelectionText(),
        status: "OK"
    }
    chrome.runtime.sendMessage(msg, callback);

};

