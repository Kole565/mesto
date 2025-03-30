export function createCard(template, card, clickOnCallback) {
	const cardElement = template.querySelector('.card').cloneNode(true);

	const cardTitleElement = cardElement.querySelector('.card__title');
	const cardImageElement = cardElement.querySelector('.card__image');
	const cardLikeButtonElement = cardElement.querySelector('.card__like-button');
	const cardLikeCounterElement = cardElement.querySelector('.card__like-counter');
	const cardDeleteButtonElement = cardElement.querySelector('.card__delete-button');

	cardTitleElement.textContent = card.name;
	cardImageElement.src = card.link;
	cardImageElement.alt = card.name;
	cardImageElement.addEventListener('click', clickOnCallback)

	cardLikeButtonElement.addEventListener('click', function () {
		cardLikeButtonElement.classList.toggle('card__like-button_is-active');
	});

	cardLikeCounterElement.textContent = card.likes.length;

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
