import './index.css';
import {
  initialCards,
  classNamesSettings
} from "./scripts/constants.js";
import Card from "./scripts/components/Card.js";
import FormValidator from "./scripts/components/FormValidator.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
import UserInfo from "./scripts/components/UserInfo.js";
import PopupWithImage from './scripts/components/PopupWithImage.js';
import Section from './scripts/components/Section.js';

/* CARDS */

const cardList = new Section ({
  items: initialCards,
  renderer: (item)=> {
    const card = new Card({
      data: item,
      imageOpener: () => {
        const popupImage = new PopupWithImage({
          data: item
        }, '.popup_type_image-overlay');
        popupImage.open();
      }
     }, classNamesSettings.templateId);
     const cardELement = card.generateCard();
     cardList.addItem(cardELement);
    }
  }, classNamesSettings.sectionCards);

  cardList.renderItem();

/* PROFILE EDIT FORM */
const profileSection  = document.querySelector('.profile');
const profileButton = profileSection.querySelector('.profile__edit-button');


const userInfo = new UserInfo({
  profileNameSelector: classNamesSettings.profileNameSelector,
  profileAboutSelector: classNamesSettings.profileAboutSelector
});

const profile = new PopupWithForm({
  formSelector: classNamesSettings.formSelector,
  inputSelector: classNamesSettings.inputSelector,
  formSubmitCallback: (data) => {
    userInfo.setUserInfo(data);
  }
}, '.popup_type_profile-edit');

/* VALIDATOR */
const validatorForProfileForm = new FormValidator(classNamesSettings, profile._formElement);
validatorForProfileForm.enableValidation();

const handlerOpenProfile = () => {
  profile._popup.querySelector('.popup__input_author_name').value = userInfo.getUserInfo().name;
  profile._popup.querySelector('.popup__input_author_about').value = userInfo.getUserInfo().about;
  validatorForProfileForm.hideInputErrors();
  profile.open();
}

profileButton.addEventListener('click', handlerOpenProfile);


/*NEW PLACE ADD FORM*/

const newPlaceAddButton = document.querySelector('.add-button');

const newPlace = new PopupWithForm({
  formSelector: classNamesSettings.formSelector,
  inputSelector: classNamesSettings.inputSelector,
  formSubmitCallback: (data) => {
    const newCard = new Section ({
      items: [data],
      renderer: (item)=> {
        const card = new Card({
          data: item,
          imageOpener: () => {
            const popupImage = new PopupWithImage({
              data: item
            }, '.popup_type_image-overlay');
            popupImage.open();
          }
         }, classNamesSettings.templateId);
         const cardELement = card.generateCard();
         newCard.addItem(cardELement);
        }
      }, classNamesSettings.sectionCards);
      newCard.renderItem();
  }
}, '.popup_type_new-place');

/* VALIDATOR */
const validatorForNewPlaceForm = new FormValidator(classNamesSettings, newPlace._formElement);
validatorForNewPlaceForm.enableValidation();

const handleOpenNewPlace = () => {
  validatorForNewPlaceForm.hideInputErrors();
  newPlace.open();
}

newPlaceAddButton.addEventListener('click', handleOpenNewPlace);
