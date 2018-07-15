import 'overflow-color';
import './vendor/focus-visible.js';

const onDOMContentLoaded = () => {

};
const onLoad = () => {

};

(() => {
  let DOMContentLoaded;
  let windowLoaded;

  const test = (variable, func) => {
    if (!variable) {
      variable = true;
      func();
    }
  };

  if (['interactive', 'complete'].indexOf(document.readyState) >= 0) {
    test(DOMContentLoaded, onDOMContentLoaded);
  } else {
    DOMContentLoaded = false;
    document.addEventListener('DOMContentLoaded', () => test(DOMContentLoaded, onDOMContentLoaded), false);
    window.addEventListener('load', () => test(DOMContentLoaded, onDOMContentLoaded), false);
  }

  if (document.readyState === 'complete') {
    test(windowLoaded, onLoad);
  } else {
    window.addEventListener('load', () => test(windowLoaded, onLoad), false);
  }
})();
