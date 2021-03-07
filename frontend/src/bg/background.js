
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(chrome.debugger);
  if (request.cmd && request.cmd === 'start') {
    let target = { tabId: sender.tab.id };
    chrome.debugger.attach(target, '1.0', function () {
      console.log("hello");
      chrome.debugger.sendCommand(target, 'Debugger.enable', {}, function () {
        chrome.debugger.sendCommand(target, 'DOM.enable', {}, function () {
          chrome.debugger.sendCommand(target, "DOMDebugger.setEventListenerBreakpoint", { 'eventName': 'click' },
            function (result) {
              console.log('registering click');
            });
        });
      });
    });
  }
  sendResponse({
    tab: sender.tab,
    debugger_obj: chrome.debugger,
  });
});