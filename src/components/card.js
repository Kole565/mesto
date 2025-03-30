export function createCard(template, cardTitle, cardImageLink, cardLikeCount, callback) {
	const cardElement = template.querySelector('.card').cloneNode(true);

	const cardTitleElement = cardElement.querySelector('.card__title');
	const cardImageElement = cardElement.querySelector('.card__image');
	const cardLikeButtonElement = cardElement.querySelector('.card__like-button');
	const cardLikeCounterElement = cardElement.querySelector('.card__like-counter');
	const cardDeleteButtonElement = cardElement.querySelector('.card__delete-button');

	cardTitleElement.textContent = cardTitle;
	cardImageElement.src = cardImageLink;
	cardImageElement.alt = cardTitle;
	cardImageElement.addEventListener('click', callback)

	cardLikeButtonElement.addEventListener('click', function () {
		cardLikeButtonElement.classList.toggle('card__like-button_is-active');
	});

	cardLikeCounterElement.textContent = cardLikeCount;

	cardDeleteButtonElement.addEventListener('click', function (e) {
		const target = e.target;
		const cardElement = target.closest('.card');

		deleteCard(cardElement);
	});

	return cardElement;
}

function deleteCard(cardElement) {
	cardElement.remove();
}
