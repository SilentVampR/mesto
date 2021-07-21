import initialCards from "./initial-cards.js";
import { Card } from "./Cards.js";
import { FormValidator } from "./FormValidator.js";

const classNamesSettings = {
  formSelector: '.popup__form-container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_state_not-valid',
  errorClass: 'popup__text-error_state_not-valid',
  inputContainer: '.popup__input-container',
  errorText: '.popup__text-error',
  templateId: '#cardTemplate'
}

const sectionCards = document.querySelector('.cards');

const createCard = (item) => {
  const card = new Card(item, classNamesSettings.templateId);
  const cardElement = card.generateCard();
  return cardElement;
}

const renderCard = (item, section) => {
  section.prepend(createCard(item));
}

const forms = Array.from(document.querySelectorAll(classNamesSettings.formSelector));
forms.forEach((form) => {
  const validity = new FormValidator(classNamesSettings, form);
  validity.enableValidation();
})

initialCards.forEach((item) => {
  renderCard(item, sectionCards);
});

/* ЗАКРЫТЬ ОТКРЫТЬ POPUP*/

const checkKey = (evt) => {
  if(evt.key === 'Escape') {
    const popupToClose = document.querySelector('.popup_opened');
    closePopup(popupToClose);
  }
}

const checkOverlayTarget = (evt) => {
  if(evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

const getPopupFromClosePopupButton = (evt) => {
  const popupToClose = evt.target.closest('.popup');
  closePopup(popupToClose);
}

const closePopup = (popup) => {
  const popupCloseButton = popup.querySelector('.popup__close-button');
  popup.classList.remove('popup_opened');
  popupCloseButton.removeEventListener('click', getPopupFromClosePopupButton);
  document.removeEventListener('keyup', checkKey);
  popup.removeEventListener('click', checkOverlayTarget);
}

export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  const popupCloseButton = popup.querySelector('.popup__close-button');
  popupCloseButton.addEventListener('click', getPopupFromClosePopupButton);
  document.addEventListener('keyup', checkKey);
  popup.addEventListener('click', checkOverlayTarget);
}

/*PROFILE*/
const profileSection  = document.querySelector('.profile');
const profileButton = profileSection.querySelector('.profile__edit-button');
const profileName = profileSection.querySelector('.profile__name');
const profileAbout = profileSection.querySelector('.profile__about');

const popupSectionProfileEdit = document.querySelector('.popup_type_profile-edit');
const popupFormProfileEdit = popupSectionProfileEdit.querySelector('.popup__form-container');
const popupInputProfileName = popupSectionProfileEdit.querySelector('.popup__input_author_name');
const popupInputProfileAbout = popupSectionProfileEdit.querySelector('.popup__input_author_about');

const popupProfileEditSubmitButton = popupSectionProfileEdit.querySelector('.popup__submit-button');

const openPopupProfileEdit = () => {
  openPopup(popupSectionProfileEdit);
  popupInputProfileName.value = profileName.textContent;
  popupInputProfileAbout.value = profileAbout.textContent;
  const inputValidity = new FormValidator(classNamesSettings, popupFormProfileEdit);
  inputValidity.checkInputValidity(popupInputProfileName);
  inputValidity.checkInputValidity(popupInputProfileAbout);
};

const editProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = popupInputProfileName.value;
  profileAbout.textContent = popupInputProfileAbout.value;
  closePopup(popupSectionProfileEdit);
}

profileButton.addEventListener('click', openPopupProfileEdit);
popupFormProfileEdit.addEventListener('submit', editProfile);

/*NEW PLACE*/
const newPlaceAddButton = document.querySelector('.add-button');
const popupSectionNewPlace = document.querySelector('.popup_type_new-place');
const popupFormNewPlace = popupSectionNewPlace.querySelector('.popup__form-container');
const popupInputNewPlaceName = popupSectionNewPlace.querySelector('.popup__input_place_name');
const popupInputNewPlaceUrl = popupSectionNewPlace.querySelector('.popup__input_place_url');
const popupNewPlaceSubmitButton = popupSectionNewPlace.querySelector('.popup__submit-button');

const addNewCard = (evt) => {
  evt.preventDefault();
  const newCardData  = {
    name: popupInputNewPlaceName.value,
    link: popupInputNewPlaceUrl.value
  }
  renderCard(newCardData, sectionCards);

  popupFormNewPlace.reset();
  closePopup(popupSectionNewPlace);
  const newPlaceInputListArray = Array.from(popupFormNewPlace.querySelectorAll('.popup__input'));
  const buttonState = new FormValidator(classNamesSettings, popupFormNewPlace);
  buttonState.changeButtonState();
}

const openNewPlacePopup = (settings) => {
  popupFormNewPlace.reset();
  const popupTextErrorListArray = Array.from(popupFormNewPlace.querySelectorAll('.popup__text-error'));
  popupTextErrorListArray.forEach((textError) => {
    textError.classList.remove(settings.errorClass);
  })
  const newPlaceInputListArray = Array.from(popupFormNewPlace.querySelectorAll('.popup__input'));
  const buttonState = new FormValidator(classNamesSettings, popupFormNewPlace);
  buttonState.changeButtonState();
  openPopup(popupSectionNewPlace);
}

newPlaceAddButton.addEventListener('click', () => openNewPlacePopup(classNamesSettings));
popupFormNewPlace.addEventListener('submit', addNewCard);
