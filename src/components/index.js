import '../styles/index.css';

import { enableValidation } from './validate.js';
import { createCard } from './card.js';
import { openModal, closeModal } from './modal.js';
import { fetchUser, fetchCards, patchUser, postCard, patchProfile } from './api.js';


const cardTemplate = document.querySelector('#card-template').content;

const profilePopup = document.querySelector('.popup_type_edit');
const avatarPopup = document.querySelector('.popup_type_edit-avatar');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

profilePopup.classList.add('popup_is-animated');
avatarPopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

const profileOpenButton = document.querySelector('.profile__edit-button');
const editAvatarButton = document.querySelector('.profile__edit-avatar-button');
const cardAddButton = document.querySelector('.profile__add-button');

const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
const profileNameElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__image');
const profileImageElement = document.querySelector('.profile__image');

const avatarFormElement = avatarPopup.querySelector('.popup__form');
const avatarImageURLInput = avatarFormElement.querySelector('.popup__input_type_url');

const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardURLInput = cardFormElement.querySelector('.popup__input_type_url');
const imagePopupImageElement = imagePopup.querySelector('.popup__image');
const imagePopupCaptionElement = imagePopup.querySelector('.popup__caption');
const placesList = document.querySelector('.places__list');

let userId = undefined;


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

editAvatarButton.addEventListener('click', function () {
	openModal(avatarPopup);

	updatePopupCloseButton(avatarPopup);

	fillProfileAvatarForm();
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

function fillProfileAvatarForm() {
	const avatarLink = avatarPopup.querySelector('.popup__input_type_url');

	avatarLink.value = profileImageElement.style.src;
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

	const card = postCard(name, url)
		.then((card) => {
			createCardElement(card)
		})

	placesList.prepend(card);

	closeModal(cardPopup);
}

function fillImagePopup(title, imageLink) {
	imagePopupImageElement.src = imageLink
	imagePopupImageElement.alt = title;
	imagePopupCaptionElement.textContent = title;
}

function fillCards(cards) {
	cards.forEach((card) => {
		placesList.append(
			createCardElement(card)
		);
	})
}

function createCardElement(card) {
	return createCard(
		cardTemplate, card, userId,
		() => {
			openModal(imagePopup);
			updatePopupCloseButton(imagePopup);
			fillImagePopup(card.title, card.link);
		}
	)
}

function refreshUser() {
	return fetchUser()
		.then((user) => {
			profileNameElement.textContent = user.name;
			profileDescriptionElement.textContent = user.about;
			profileImageElement.src = user.avatar

			return user
		})
}

function handleProfileFormSubmit(evt) {
	evt.preventDefault();

	const name = nameInput.value;
	const job = jobInput.value;

	const buttonElement = avatarFormElement.querySelector('.popup__button')

	updateUser(name, job)
		.finally(() => {
			buttonElement.textContent = 'Сохранить'
		})

	buttonElement.textContent = 'Сохранение...'

	closeModal(profilePopup);
}

function handleAvatarFormSubmit(evt) {
	evt.preventDefault();

	const url = avatarImageURLInput.value;
	const buttonElement = avatarFormElement.querySelector('.popup__button')

	patchProfile(url)
		.then((user) => {
			profileImageElement.src = user.avatar
		})
		.finally(() => {
			buttonElement.textContent = 'Сохранить'
		})
	
	buttonElement.textContent = 'Сохранение...'

	closeModal(avatarPopup);
}

function updateUser(name, job) {
	return patchUser(name, job)
		.then((user) => {
			profileNameElement.textContent = user.name;
			profileDescriptionElement.textContent = user.about;
		})
}

// Initial calls

Promise.all([fetchCards(), refreshUser()])
	.then((cards_and_user) => {
		userId = cards_and_user[1]._id;
		fillCards(cards_and_user[0]);
	})

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
avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);
