// import { autoComplete } from "./autoComplete/js/autoComplete";
// alert("foo");

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // listen for messages sent from background.js
  if (request.message === "hello!") {
    console.log(request.url); // new url is now in content scripts!
  }
});

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
  // fired when a mutation occurs
  console.log(mutations, observer);
  // ...
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  attributes: true
  //...
});

// function nodeInsertedCallback(event) {
//   console.log(event);
// }
// document.addEventListener("DOMNodeInserted", nodeInsertedCallback);

var translateInput = document.querySelector(
  "[data-test='challenge-translate-input']"
);
var textInput = document.querySelector("[data-test='challenge-text-input']");

if (!translateInput && !textInput) {
  console.log("do nothing");
}
if (translateInput) {
  console.log("translate input");
}
if (textInput) {
  console.log("text input");
}

const autoCompletejs = new autoComplete({
  data: {
    src: async function() {
      // Loading placeholder text
      document
        .querySelector("#autoComplete")
        .setAttribute("placeholder", "Loading...");
      // Fetch External Data Source
      const source = await fetch("./db/generic.json");
      const data = await source.json();
      // Returns Fetched data
      return data;
    },
    key: ["food", "cities", "animals"]
  },
  trigger: {
    event: ["input", "focusin", "focusout"],
    condition: function(query) {
      return !!query.replace(/ /g, "").length && query !== "hamburger";
    }
  }
});
console.log(autoCompletejs);

var div = document.createElement("div");

var e = document.querySelector(".i12-l");
e.appendChild(div);
div.innerText = "test123";
