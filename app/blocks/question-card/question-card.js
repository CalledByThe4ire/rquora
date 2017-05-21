'use strict';

import utils from '../../scripts/utils';

export default window.addEventListener('DOMContentLoaded', () => {

	// question-card variables
	const questionCardCollection = Array.prototype.slice.call(document.querySelectorAll('.question-card'));
	const detailedViewLinkCollection = Array.prototype.slice.call(document.querySelectorAll('.question-card__extended-answer a'));
	const defaultViewLinksCollection = Array.prototype.slice.call(document.querySelectorAll('.question-card__close'));

	// text-content variables
	const textContent = Array.prototype.slice.call(document.querySelectorAll('.question-card__answer .text-content'));
	const answer = Array.prototype.slice.call(document.querySelectorAll('.text-content__answer'));
	const firstP = Array.prototype.slice.call(document.querySelectorAll('.text-content__answer > p:first-child'));

	// truncateString variables
	const len = 150;
	const truncatedFirstP = firstP.map(paragraph => {
		return utils.truncateString(paragraph.innerHTML, len);
	});

	// truncate strings by default
	textContent.forEach(elem => {
		answer.forEach((elem, index) => {
			elem.replaceChild(truncatedFirstP[index], elem.firstElementChild);
		});
	});

	/**
	 * Open question-card block in detailed view
	 * @param {MouseEvent} evt
	 */
	const expandDetailedView = evt => {
		// variables
		const questionCard = utils.closest(evt.target, '.question-card');
		const currentTextContent = Array.prototype.slice.call(questionCard.querySelectorAll('.text-content'));
		const currentUserInfo = Array.prototype.slice.call(questionCard.querySelectorAll('.user-info'));

		questionCardCollection.forEach(elem => {

			if (elem !== questionCard) {

				questionCard.classList.add('question-card--detailed-view');
				elem.classList.add('question-card--hidden');

				currentTextContent.forEach(elem => {
					elem.classList.add('text-content--detailed-view');
				});

				currentUserInfo.forEach(elem => {
					elem.classList.add('user-info--detailed-view');
				});
			}

		});

		// revert strings to default length in detailed view
		currentTextContent.forEach(elem => {
			answer.forEach((elem, index) => {
				elem.replaceChild(firstP[index], elem.firstElementChild);
			});
		});
	};

	/**
	 * Revert question-card block to default view
	 * @param {MouseEvent} evt
	 */
	const collapseDetailedView = evt => {
		// variables block
		const questionCard = utils.closest(evt.target, '.question-card');
		const currentTextContent = Array.prototype.slice.call(questionCard.querySelectorAll('.text-content'));
		const currentUserInfo = Array.prototype.slice.call(questionCard.querySelectorAll('.user-info'));

		questionCardCollection.forEach(elem => {

			if (elem !== questionCard) {

				questionCard.classList.remove('question-card--detailed-view');
				elem.classList.remove('question-card--hidden');

				currentTextContent.forEach(elem => {
					elem.classList.remove('text-content--detailed-view');
				});

				currentUserInfo.forEach(elem => {
					elem.classList.remove('user-info--detailed-view');
				});
			}
		});

		// truncate strings in default view
		currentTextContent.forEach(elem => {
			answer.forEach((elem, index) => {
				elem.replaceChild(truncatedFirstP[index], elem.firstElementChild);
			});
		});
	};

	detailedViewLinkCollection.forEach(link => {
		link.addEventListener('click', expandDetailedView);
	});

	defaultViewLinksCollection.forEach(elem => {
		elem.addEventListener('click', collapseDetailedView);
	});

});
