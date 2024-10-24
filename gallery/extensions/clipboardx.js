(function (ext) {

  let lastPastedText = "";
  let pastedBool = false;
  let copiedBool = false;

  window.addEventListener("copy", (event) => {
    copiedBool = true;
  });

  window.addEventListener("paste", (event) => {
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData("Text");
    lastPastedText = pastedText;
    pastedBool = true;
  });

  ext.whenCopied = function() {
    if (copiedBool) {
      copiedBool = false;
      return true;
    }
    return false;
  };

  ext.whenPasted = function() {
    if (pastedBool) {
      pastedBool = false;
      return true;
    }
    return false;
  };

  ext.setClipboard = function(text) {
    navigator.clipboard.writeText(text);
  };

  ext.resetClipboard = function() {
    navigator.clipboard.writeText("");
  };

  ext.clipboard = function() {
    if (navigator.clipboard && navigator.clipboard.readText) {
      return JSON.stringify(navigator.clipboard.readText()) ?? "";
    }
    return "";
  };

  ext.canClipboard = function() {
    return navigator.clipboard;
  };

  ext.getLastPastedText = function() {
    return lastPastedText;
  };

  var blocks = [
    ['h', 'when something is copied', 'whenCopied'],
    ['h', 'when something is pasted', 'whenPasted'],
    [' '],
    ['', 'copy to clipboard: %s', 'setClipboard', ''],
    ['', 'reset clipboard', 'resetClipboard', ''],
    [' '],
    ['r', 'clipboard', 'clipboard', ''],
    ['r', 'last pasted text', 'getLastPastedText', ''],
    ['b', 'clipboard?', 'canClipboard']
  ];

  var descriptor = {
    blocks: blocks,
  };

  ScratchExtensions.register('clipboard', descriptor, ext);
})({});