const cardTemplate = document.querySelector('#card-template').content;

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');


function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened'); // TODO: Test
}

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
