import overflowColor from 'overflow-color';
import focusVisible from 'focus-visible';

const onload = function() {

};

(function() {

  let loaded;

  function load() {
    if (!loaded) {
      loaded = true;
      onload();
    }
  }

  if (['interactive', 'complete'].indexOf(document.readyState) >= 0) {
    onload();
  } else {
    loaded = false;
    document.addEventListener('DOMContentLoaded', load, false);
    window.addEventListener('load', load, false);
  }

})();
