import { DuoAssistant } from "./background-module.js";
// console.log(new DuoAssistant());
console.log("bg-mod");
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  // read changeInfo data and do something with it
  // like send the new url to contentscripts.js
  if (changeInfo.url) {
    console.log(changeInfo.url);
    chrome.tabs.sendMessage(tabId, {
      message: "hello!",
      url: changeInfo.url
    });
  }
});
// logMessage("Hello World from Background using modules");
//  1 - get cookie
// 2 -
// chrome.runtime.onInstalled.addListener(function() {
//   console.log("loaded");
//   // var foo = new DuoAssistant();
// });
// (async () => {
// })();
