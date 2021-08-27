import './index.css';
import {
  classNamesSettings,
  url,
  apiToken
} from "../constants/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';

const api = new Api({url: url,
  headers: {
    authorization: apiToken,
    'Content-Type': 'application/json'
  }
});

api.getUserInfo();
/* CARDS */

const popupImage = new PopupWithImage('.popup_type_image-overlay');
popupImage.setEventListeners();

const getCardElement = (item) => {
  const card = new Card({
    data: item,
    imageOpener: () => {
      popupImage.open({ data: { name: item.name, link: item.link, id: item._id } });
    },
    confirmOpener: () => {
      confirmPopup._popup.querySelector('.popup__input_place_id').value = item._id;
      confirmPopup.open();
    }
   }, classNamesSettings.templateId);
   return card.generateCard();
}

const deleteCard = (data) => {
  const cardToDelete = document.querySelector(`#${CSS.escape(data.placeId)}`);
  cardToDelete.remove();
}

const confirmPopup = new PopupWithForm({
  formSelector: classNamesSettings.formSelector,
  inputSelector: classNamesSettings.inputSelector,
  formSubmitCallback: (data) => {
    deleteCard(data);
  }
}, '.popup_type_confirm');

confirmPopup.setEventListeners();

const createSection = (result) => {
  const cardsSection = new Section ({
    items: result,
    renderer: (item)=> {
      cardsSection.addItem(getCardElement(item));
    }
  }, classNamesSettings.sectionCards);
  cardsSection.renderItem();
}


api.getInitialCards()
  .then(result => {
    createSection(result);
  })
  .catch(err => {
    console.log(err);
  });



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
    addElement({link: data.placeUrl, name: data.placeName, id: Math.random() * 100});
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

const changeAvatarImg = (link) => {
  document.querySelector('.profile__avatar').src = link;
}

const editAvatar = new PopupWithForm({
  formSelector: classNamesSettings.formSelector,
  inputSelector: classNamesSettings.inputSelector,
  formSubmitCallback: (data) => {
    console.log(data)
    changeAvatarImg(data.avatarUrl);
  }
}, '.popup_type_avatar-edit');

const validatorForEditAvatarForm = new FormValidator(classNamesSettings, editAvatar._formElement);
validatorForEditAvatarForm.enableValidation();

const handleOpenAvatarEdit = () => {
  validatorForEditAvatarForm.hideInputErrors();
  editAvatar.open();
}

editAvatar.setEventListeners();

const editAvatarButton = profileSection.querySelector('.profile__edit-avatar');
editAvatarButton.addEventListener('click', handleOpenAvatarEdit);
