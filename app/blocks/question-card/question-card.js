'use strict';

import utils from '../../scripts/utils';

export default window.addEventListener('DOMContentLoaded', () => {

	// variables
	const indexContainer = document.querySelector('.index__container');
	const questionsContainer = document.querySelector('.questions__container');

	const filters = document.querySelectorAll('.filter');
	const avatars = Array.prototype.slice.call(document.querySelectorAll('.user-info__avatar img'));

	const animationClasses = ['animated', 'zoomInUp'];

	// question-card variables
	const questionCardCollection = Array.prototype.slice.call(document.querySelectorAll('.question-card'));
	const answersCollection = Array.prototype.slice.call(document.querySelectorAll('.question-card__answer'));
	const defaultViewLinksCollection = Array.prototype.slice.call(document.querySelectorAll('.question-card__close'));

	// text-content variables
	const textContent = Array.prototype.slice.call(document.querySelectorAll('.question-card__answer .text-content'));
	const answer = Array.prototype.slice.call(document.querySelectorAll('.text-content__answer'));
	const firstP = Array.prototype.slice.call(document.querySelectorAll('.text-content__answer > p:first-child'));

	// reduce image size by default
	avatars.forEach(avatar => {
		avatar.setAttribute('width', '45');
		avatar.setAttribute('height', '41');
	});

	// add initial animation
	questionCardCollection.forEach(elem => {
		elem.classList.add(animationClasses[0], animationClasses[1]);
	});

	// truncateString variables
	const len = 150;
	const truncatedFirstP = firstP.map(paragraph => {
		return utils.truncateString(paragraph.innerHTML, len);
	});

	// truncate strings by default
	textContent.forEach(() => {
		answer.forEach((elem, index) => {
			elem.replaceChild(truncatedFirstP[index], elem.firstElementChild);
		});
	});

	/**
	 * Clear animate.css classes.
	 */
	const removeAnimation = () => {
		questionCardCollection.forEach(elem => {
			if (elem.classList.contains(...animationClasses)) {
				elem.classList.remove(...animationClasses);
			}
		});
	};

	/**
	 * Open question-card block in detailed view
	 * @param {MouseEvent} evt
	 */
	const expandDetailedView = evt => {
		// variables
		const questionCard = utils.closest(evt.target, '.question-card');
		const currentTextContent = Array.prototype.slice.call(questionCard.querySelectorAll('.text-content'));
		const currentUserInfo = Array.prototype.slice.call(questionCard.querySelectorAll('.user-info'));

		indexContainer.classList.add('index__container--transparent');
		questionCard.classList.add('question-card--background-color');
		questionsContainer.classList.add('questions__container--full-width');

		filters.forEach(filter => {
			if (filter.classList.contains('filter--questions')) {
				filter.classList.add('filter--hidden');
			}
			if (filter.classList.contains('filter--answers')) {
				filter.classList.remove('filter--hidden');
			}
		});

		avatars.forEach(avatar => {
			avatar.setAttribute('width', '90');
			avatar.setAttribute('height', '82');
		});


		questionCardCollection.forEach(elem => {

			if (elem !== questionCard) {
				questionCard.classList.add('question-card--detailed-view');
				elem.classList.add('question-card--hidden');

				currentTextContent.forEach(textContentBlock => {
					textContentBlock.classList.add('text-content--detailed-view');
				});

				currentUserInfo.forEach(userInfo => {
					userInfo.classList.add('user-info--detailed-view');
				});
			}

		});

		// revert strings to default length in detailed view
		currentTextContent.forEach(() => {
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

		indexContainer.classList.remove('index__container--transparent');
		questionCard.classList.add(animationClasses[0], animationClasses[1]);
		questionCard.classList.remove('question-card--background-color');
		questionsContainer.classList.remove('questions__container--full-width');

		filters.forEach(filter => {
			if (filter.classList.contains('filter--questions')) {
				filter.classList.remove('filter--hidden');
			}
			if (filter.classList.contains('filter--answers')) {
				filter.classList.add('filter--hidden');
			}
		});

		avatars.forEach(avatar => {
			avatar.setAttribute('width', '45');
			avatar.setAttribute('height', '41');
		});

		questionCardCollection.forEach(elem => {

			elem.classList.add(animationClasses[0], animationClasses[1]);

			if (elem !== questionCard) {
				questionCard.classList.remove('question-card--detailed-view');
				elem.classList.remove('question-card--hidden');

				currentTextContent.forEach(textContentBlock => {
					textContentBlock.classList.remove('text-content--detailed-view');
				});

				currentUserInfo.forEach(userInfo => {
					userInfo.classList.remove('user-info--detailed-view');
				});
			}
		});

		// truncate strings in default view
		currentTextContent.forEach(() => {
			answer.forEach((elem, index) => {
				elem.replaceChild(truncatedFirstP[index], elem.firstElementChild);
			});
		});
	};

	answersCollection.forEach(link => {
		link.addEventListener('click', expandDetailedView);
	});

	defaultViewLinksCollection.forEach(elem => {
		elem.addEventListener('click', collapseDetailedView);
	});

	questionCardCollection.forEach(elem => {
		elem.addEventListener('transitionend', removeAnimation);
	});

});
