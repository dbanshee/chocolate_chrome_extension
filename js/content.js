

const injectedScript = document.createElement('script');
injectedScript.src =chrome.runtime.getURL('js/injected.js');
(document.head || document.documentElement).appendChild(injectedScript);
console.log('Injected Chocolate libraries');


