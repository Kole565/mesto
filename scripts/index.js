const cardTemplate = document.querySelector('#card-template').content;

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

const profileOpenButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
const profileNameElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');
const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardURLInput = cardFormElement.querySelector('.popup__input_type_url');
const imagePopupImageElement = imagePopup.querySelector('.popup__image');
const imagePopupCaptionElement = imagePopup.querySelector('.popup__caption');

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);


function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

profileOpenButton.addEventListener('click', function () {
	openModal(profilePopup);

	const popupCloseButton = profilePopup.querySelector('.popup__close');
	popupCloseButton.addEventListener('click', function () {
		closeModal(profilePopup);
	});

	prefillProfileForm();
});

function prefillProfileForm() {
	const formName = profilePopup.querySelector('.popup__input_type_name');
	const formDescription = profilePopup.querySelector('.popup__input_type_description');

	formName.value = profileNameElement.textContent;
	formDescription.value = profileDescriptionElement.textContent;
}

function handleProfileFormSubmit(evt) {
	evt.preventDefault();

	const name = nameInput.value;
	const job = jobInput.value;

	profileNameElement.textContent = name;
	profileDescriptionElement.textContent = job;

	closeModal(profilePopup);
}

cardAddButton.addEventListener('click', function () {
	openModal(cardPopup);

	const popupCloseButton = cardPopup.querySelector('.popup__close');
	popupCloseButton.addEventListener('click', function () {
		closeModal(cardPopup);
	});

	prefillCardForm();
});

function prefillCardForm() {
	const formName = cardPopup.querySelector('.popup__input_type_card-name');
	const formURL = cardPopup.querySelector('.popup__input_type_url');

	formName.value = '';
	formURL.value = '';
}

function handleCardFormSubmit(evt) {
	evt.preventDefault();

	const name = cardNameInput.value;
	const url = cardURLInput.value;

	placesList.prepend(createCard(name, url));

	closeModal(cardPopup);
}

function createCard(cardTitle, cardImageLink) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

	const cardTitleElement = cardElement.querySelector('.card__title');
	const cardImageElement = cardElement.querySelector('.card__image');
	const cardLikeButtonElement = cardElement.querySelector('.card__like-button');
	const cardDeleteButtonElement = cardElement.querySelector('.card__delete-button');

	cardTitleElement.textContent = cardTitle;
	cardImageElement.src = cardImageLink;
	cardImageElement.alt = cardTitle;
	cardImageElement.addEventListener('click', function (e) {
		openModal(imagePopup);

		const target = e.target;
		const cardElement = target.closest('.card');

		imagePopupImageElement.src = cardImageLink
		imagePopupImageElement.alt = cardTitle;
		imagePopupCaptionElement.textContent = cardTitle;

		const popupCloseButton = imagePopup.querySelector('.popup__close');
		console.log(popupCloseButton);
		popupCloseButton.addEventListener('click', function () {
			console.log('Popup close');
			closeModal(imagePopup);
		});
	});

	cardLikeButtonElement.addEventListener('click', function () {
		cardLikeButtonElement.classList.toggle('card__like-button_is-active');
	});

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


placesList = document.querySelector(".places__list")
for (let i = 0; i < initialCards.length; i++) {
	placesList.append(createCard(initialCards[i].name, initialCards[i].link));
}
