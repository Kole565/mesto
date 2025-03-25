import '../styles/index.css';

import { enableValidation } from './validate.js';
import { initialCards, createCard } from './card.js';
import { openModal, closeModal } from './modal.js';


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


function updatePopupCloseButton(popup) {
	const popupCloseButton = popup.querySelector('.popup__close');
	popupCloseButton.addEventListener('click', function () {
		closeModal(popup);
	});
}

profileOpenButton.addEventListener('click', function () {
	openModal(profilePopup);

	updatePopupCloseButton(profilePopup);

	fillProfileForm();
});

cardAddButton.addEventListener('click', function () {
	openModal(cardPopup);

	updatePopupCloseButton(cardPopup);

	fillCardForm();
});


function fillProfileForm() {
	const formName = profilePopup.querySelector('.popup__input_type_name');
	const formDescription = profilePopup.querySelector('.popup__input_type_description');

	formName.value = profileNameElement.textContent;
	formDescription.value = profileDescriptionElement.textContent;
}

function fillCardForm() {
	const formName = cardPopup.querySelector('.popup__input_type_card-name');
	const formURL = cardPopup.querySelector('.popup__input_type_url');

	formName.value = '';
	formURL.value = '';
}

function handleProfileFormSubmit(evt) {
	evt.preventDefault();

	const name = nameInput.value;
	const job = jobInput.value;

	profileNameElement.textContent = name;
	profileDescriptionElement.textContent = job;

	closeModal(profilePopup);
}

function handleCardFormSubmit(evt) {
	evt.preventDefault();

	const name = cardNameInput.value;
	const url = cardURLInput.value;

	placesList.prepend(createCard(name, url));

	closeModal(cardPopup);
}

function fillImagePopup(title, imageLink) {
	imagePopupImageElement.src = imageLink
	imagePopupImageElement.alt = title;
	imagePopupCaptionElement.textContent = title;
}


profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);

const placesList = document.querySelector('.places__list');
for (let i = 0; i < initialCards.length; i++) {
	const cardTitle = initialCards[i].name;
	const cardImageLink = initialCards[i].link;

	placesList.append(
		createCard(
			cardTemplate, cardTitle, cardImageLink,
			() => {
				openModal(imagePopup);
				updatePopupCloseButton(imagePopup);
				fillImagePopup(cardTitle, cardImageLink);
			}
		)
	);
}

const validationSettings = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
}

enableValidation(validationSettings);
