'use strict';

const utils = {
	/**
	 * 'closest' method for IE10+
	 * @param el
	 * @param selector
	 * @return {*}
	 */
	closest(el, selector) {
		const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

		while (el) {
			if (matchesSelector.call(el, selector)) {
				return el;
			} else {
				el = el.parentElement;
			}
		}
		return null;
	},

	/**
	 * Truncate the content of the P, then go back to the end of the
	 previous word to ensure that we don't truncate in the middle of
	 a word
	 * @param {String} elem
	 * @param {Number} len
	 * @return {Element}
	 */
	truncateString(elem, len) {
		let trunc = '';
		const p = document.createElement('p');

		if (elem.length > len) {
			trunc = elem.substring(0, len).replace(/[\wа-яё]+$/, '') + '&hellip;';
			p.innerHTML = trunc;
			return p;
		}
		p.innerHTML = elem;
		return p;
	}
};

export default utils;
