import '../styles/index.css';

import { enableValidation } from './validate.js';
import { initialCards, createCard } from './card.js';
import { openModal, closeModal } from './modal.js';
import { fetchUser, fetchCards, patchUser, postCard } from './api.js';


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
const placesList = document.querySelector('.places__list');


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

function handleCardFormSubmit(evt) {
	evt.preventDefault();

	const name = cardNameInput.value;
	const url = cardURLInput.value;

	const card = createCard(
		cardTemplate, name, url,
		() => {
			openModal(imagePopup);
			updatePopupCloseButton(imagePopup);
			fillImagePopup(cardTitle, cardImageLink);
		}
	);

	placesList.prepend(card);
	postCard(name, url);

	closeModal(cardPopup);
}

function fillImagePopup(title, imageLink) {
	imagePopupImageElement.src = imageLink
	imagePopupImageElement.alt = title;
	imagePopupCaptionElement.textContent = title;
}

function fillCards(cards) {
	for (let i = 0; i < cards.length; i++) {
		const cardTitle = cards[i].name;
		const cardImageLink = cards[i].link;
		const cardLikeCount = cards[i].likes.length;

		placesList.append(
			createCard(
				cardTemplate, cardTitle, cardImageLink, cardLikeCount,
				() => {
					openModal(imagePopup);
					updatePopupCloseButton(imagePopup);
					fillImagePopup(cardTitle, cardImageLink);
				}
			)
		);
	}
}

function refreshUser() {
	fetchUser()
		.then((user) => {
			updateUser(
				user.name, user.about
			)
			return user
		})
}

function handleProfileFormSubmit(evt) {
	evt.preventDefault();

	const name = nameInput.value;
	const job = jobInput.value;

	updateUser(name, job);

	closeModal(profilePopup);
}

function updateUser(name, job) {
	patchUser(name, job)
		.then((user) => {
			profileNameElement.textContent = user.name;
			profileDescriptionElement.textContent = user.about;
		})
}

// Initial calls

const validationSettings = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
}

enableValidation(validationSettings);

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);

refreshUser()

fetchCards()
	.then((cards) => {
		fillCards(cards);
	})
