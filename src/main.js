import 'overflow-color';
import './vendor/focus-visible.js';

const onload = () => {
  // main code
};

(() => {
  let loaded;

  const load = () => {
    if (!loaded) {
      loaded = true;
      onload();
    }
  };

  if (['interactive', 'complete'].indexOf(document.readyState) >= 0) {
    onload();
  } else {
    loaded = false;
    document.addEventListener('DOMContentLoaded', load, false);
    window.addEventListener('load', load, false);
  }
})();
