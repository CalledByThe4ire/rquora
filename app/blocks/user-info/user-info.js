'use strict';

export default window.addEventListener('DOMContentLoaded', () => {
	Array.prototype.slice.call(document.querySelectorAll('.user-info__avatar' +
		' img')).forEach(avatar => {
		avatar.setAttribute('width', '45');
		avatar.setAttribute('height', '41');
	});
});
