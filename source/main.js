import oc from '../../overflow-color';

const onload = function() {

};

if (['interactive', 'complete', 'loaded'].indexOf(document.readyState) >= 0) {
	onload();
}
else if (window.addEventListener) {
	window.addEventListener('DOMContentLoaded', onload);
}
else {
	window.attachEvent('onload', onload);
}
