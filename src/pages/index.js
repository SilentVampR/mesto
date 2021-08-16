import './index.css';
import {
  initialCards,
  classNamesSettings
} from "../scripts/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';

/* CARDS */

const popupImage = new PopupWithImage('.popup_type_image-overlay');
popupImage.setEventListeners();

const getCardElement = (item) => {
  const card = new Card({
    data: item,
    imageOpener: () => {
      popupImage.open({ data: { name: item.name, image: item.image } });
    }
   }, classNamesSettings.templateId);
   return card.generateCard();
}

const cardList = new Section ({
  items: initialCards,
  renderer: (item)=> {
     cardList.addItem(getCardElement(item));
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

const editProfilePopup = new PopupWithForm({
  formSelector: classNamesSettings.formSelector,
  inputSelector: classNamesSettings.inputSelector,
  formSubmitCallback: (data) => {
    userInfo.setUserInfo(data);
  }
}, '.popup_type_profile-edit');

/* VALIDATOR */
const validatorForProfileForm = new FormValidator(classNamesSettings, editProfilePopup._formElement);
validatorForProfileForm.enableValidation();

const handlerOpenProfile = () => {
  const { name, about } = userInfo.getUserInfo();
  editProfilePopup._popup.querySelector('.popup__input_author_name').value = name;
  editProfilePopup._popup.querySelector('.popup__input_author_about').value = about;
  validatorForProfileForm.hideInputErrors();
  editProfilePopup.open();
}
editProfilePopup.setEventListeners();
profileButton.addEventListener('click', handlerOpenProfile);


/*NEW PLACE ADD FORM*/

const newPlaceAddButton = document.querySelector('.add-button');

const newPlace = new PopupWithForm({
  formSelector: classNamesSettings.formSelector,
  inputSelector: classNamesSettings.inputSelector,
  formSubmitCallback: (data) => {
    const newCard = new Section ({
      items: [{image: data.placeUrl, name: data.placeName}],
      renderer: (item)=> {
        newCard.addItem(getCardElement(item));
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
newPlace.setEventListeners();
newPlaceAddButton.addEventListener('click', handleOpenNewPlace);
