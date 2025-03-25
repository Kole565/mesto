import '../styles/index.css';

import { initialCards, createCard } from './card.js';
import { enableValidation } from './validate.js';


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


function openModal(popup) {
	popup.classList.add('popup_is-opened');
	popup.addEventListener('click', (evt) => {
		if (evt.target === popup) {
			closeModal(popup);
		}
	});

	document.addEventListener('keydown', closeByEsc);
}

function closeModal(popup) {
	popup.classList.remove('popup_is-opened');

	document.removeEventListener('keydown', closeByEsc);
}

function closeByEsc(evt) {
	if (evt.key === 'Escape') {
		const openedPopup = document.querySelector('.popup_is-opened');
		closeModal(openedPopup);
	}
}

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

		updatePopupCloseButton(imagePopup);

		fillImagePopup(cardTitle, cardImageLink);
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

function fillImagePopup(title, imageLink) {
	imagePopupImageElement.src = imageLink
	imagePopupImageElement.alt = title;
	imagePopupCaptionElement.textContent = title;
}

function deleteCard(cardElement) {
	cardElement.remove();
}


profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);

const placesList = document.querySelector('.places__list');
for (let i = 0; i < initialCards.length; i++) {
	placesList.append(createCard(initialCards[i].name, initialCards[i].link));
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
