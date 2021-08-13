import {
  initialCards,
  classNamesSettings
} from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";

/* CARDS */

const sectionCards = document.querySelector('.cards');

const createCard = (item) => {
  const card = new Card(item, classNamesSettings.templateId);
  const cardElement = card.generateCard();
  return cardElement;
}

const renderCard = (item, section) => {
  section.prepend(createCard(item));
}

initialCards.forEach((item) => {
  renderCard(item, sectionCards);
});

/* ЗАКРЫТЬ ОТКРЫТЬ POPUP */

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

/* PROFILE EDIT FORM */
const profileSection  = document.querySelector('.profile');
const profileButton = profileSection.querySelector('.profile__edit-button');
const profileName = profileSection.querySelector('.profile__name');
const profileAbout = profileSection.querySelector('.profile__about');

//const popupSectionProfileEdit = document.querySelector('.popup_type_profile-edit');
const profile = new Popup('.popup_type_profile-edit')
profileButton.addEventListener('click', () => profile.open());
//const popupFormProfileEdit = popupSectionProfileEdit.querySelector('.popup__form-container');

//const popupInputProfileName = popupSectionProfileEdit.querySelector('.popup__input_author_name');
//const popupInputProfileAbout = popupSectionProfileEdit.querySelector('.popup__input_author_about');

/* VALIDATOR */
//const validatorForProfileForm = new FormValidator(classNamesSettings, popupFormProfileEdit);
//validatorForProfileForm.enableValidation();

/* OPEN CLOSE PROFILE FUNCTIONS */

const openPopupProfileEdit = () => {
  openPopup(popupSectionProfileEdit);
  popupInputProfileName.value = profileName.textContent;
  popupInputProfileAbout.value = profileAbout.textContent;
  validatorForProfileForm.hideInputErrors();
};

const editProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = popupInputProfileName.value;
  profileAbout.textContent = popupInputProfileAbout.value;
  closePopup(popupSectionProfileEdit);
}

//profileButton.addEventListener('click', openPopupProfileEdit);
//popupFormProfileEdit.addEventListener('submit', editProfile);

/*NEW PLACE ADD FORM*/

const newPlaceAddButton = document.querySelector('.add-button');
const popupSectionNewPlace = document.querySelector('.popup_type_new-place');
const popupFormNewPlace = popupSectionNewPlace.querySelector('.popup__form-container');

const popupInputNewPlaceName = popupSectionNewPlace.querySelector('.popup__input_place_name');
const popupInputNewPlaceUrl = popupSectionNewPlace.querySelector('.popup__input_place_url');

/* VALIDATOR */
const validatorForNewPlaceForm = new FormValidator(classNamesSettings, popupFormNewPlace);
validatorForNewPlaceForm.enableValidation();

/* OPEN CLOSE PROFILE FUNCTIONS */
const addNewCard = (evt) => {
  evt.preventDefault();
  const newCardData  = {
    name: popupInputNewPlaceName.value,
    link: popupInputNewPlaceUrl.value
  }
  renderCard(newCardData, sectionCards);
  closePopup(popupSectionNewPlace);
}

const openNewPlacePopup = () => {
  popupFormNewPlace.reset();
  validatorForNewPlaceForm.hideInputErrors();
  openPopup(popupSectionNewPlace);
}

newPlaceAddButton.addEventListener('click', openNewPlacePopup);
popupFormNewPlace.addEventListener('submit', addNewCard);
