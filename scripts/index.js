const cardTemplate = document.querySelector('#card-template').content;


function createCard(cardTitle, cardImageLink) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

	const cardTitleElement = cardElement.querySelector('.card__title');
	const cardImageElement = cardElement.querySelector('.card__image');

	cardTitleElement.textContent = cardTitle;
	cardImageElement.src = cardImageLink;
	cardImageElement.alt = cardTitle;

	return cardElement;
}

// @todo: Функция удаления карточки

placesList = document.querySelector(".places__list")
for (let i = 0; i < initialCards.length; i++) {
	placesList.append(createCard(initialCards[i].name, initialCards[i].link));
}
