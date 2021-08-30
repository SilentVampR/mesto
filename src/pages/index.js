import './index.css';
import {
  classNamesSettings,
  yandexMestoApiURL,
  apiToken,
  myId
} from "../constants/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';

const api = new Api({apiURL: yandexMestoApiURL,
  headers: {
    authorization: apiToken,
    'Content-Type': 'application/json; charset=UTF-8'
  }
});

const renderLoading = (isLoading, popup) => {
  const submitButtonElement = popup.querySelector('.popup__submit-button');
  if(isLoading){
    submitButtonElement.textContent = "Сохранение...";
  } else {
    submitButtonElement.textContent = "Сохранить"
  }
}

/* PROFILE EDIT FORM */
const profileSection  = document.querySelector('.profile');
const profileNameElement = profileSection.querySelector(classNamesSettings.profileNameSelector);
const profileAboutElement = profileSection.querySelector(classNamesSettings.profileAboutSelector);
const profileAvatarElement = profileSection.querySelector(classNamesSettings.profileAvatarSelector);
const profileButton = profileSection.querySelector('.profile__edit-button');

api.getUserInfo()
  .then((result) => {
    profileNameElement.textContent = result.name;
    profileAboutElement.textContent = result.about;
    profileAvatarElement.src = result.avatar;
    profileAvatarElement.alt = result.name;
  })
  .catch(err => console.log(err))


const userInfo = new UserInfo({
  profileNameSelector: classNamesSettings.profileNameSelector,
  profileAboutSelector: classNamesSettings.profileAboutSelector
});

const editProfilePopup = new PopupWithForm({
  formSelector: classNamesSettings.formSelector,
  inputSelector: classNamesSettings.inputSelector,
  formSubmitCallback: (data) => {
    renderLoading(true, editProfilePopup._popup);
    api.editUserInfo(data)
      .then(() => {
        userInfo.setUserInfo(data);
      })
      .then(() => {
        renderLoading(false, editProfilePopup._popup);
      })
      .catch(err => console.log(err))
  }
}, '.popup_type_profile-edit');

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

/* EDIT AVATAR */

const changeAvatarImg = (link) => {
  profileAvatarElement.src = link;
}

const editAvatar = new PopupWithForm({
  formSelector: classNamesSettings.formSelector,
  inputSelector: classNamesSettings.inputSelector,
  formSubmitCallback: (data) => {
    renderLoading(true, editAvatar._popup);
    api.editAvatar(data)
      .then(result => {
        changeAvatarImg(result.avatar);
      })
      .then(() => {
        renderLoading(false, editAvatar._popup);
      })
      .catch(err => console.log(err))
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
    },
    handleLikeButton: (evt) => {
      const cardElement = document.querySelector(`#${CSS.escape(card._id)}`);
      const likeCounterElement = cardElement.querySelector('.card__like-counter');
      const likeButtonElement = evt.target;
      if(likeButtonElement.classList.contains('card__like-button_active')){
        api.removeLike(item._id)
          .then(result => {
            likeButtonElement.classList.remove('card__like-button_active');
            likeCounterElement.textContent = result.likes.length;
          })
          .catch(err => console.log(err));
      } else {
        api.addLike(item._id)
          .then(result => {
            likeButtonElement.classList.add('card__like-button_active');
            likeCounterElement.textContent = result.likes.length;
          })
          .catch(err => console.log(err));
      }
    }
  }, classNamesSettings.templateId, myId);
  return card.generateCard();
}

const deleteCard = (data) => {
  api.removeCard(data.placeId)
    .then(() => {
      const cardToDelete = document.querySelector(`#${CSS.escape(data.placeId)}`);
      cardToDelete.remove();
    })
    .catch(err => console.log(err));
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

/*NEW PLACE ADD FORM*/

const newPlaceAddButton = document.querySelector('.add-button');

const newPlace = new PopupWithForm({
  formSelector: classNamesSettings.formSelector,
  inputSelector: classNamesSettings.inputSelector,
  formSubmitCallback: (data) => {
    renderLoading(true, newPlace._popup);
    api.addNewPlace(data)
      .then((result) => {
        createSection([result]);
      })
      .then(() => {
        renderLoading(false, newPlace._popup);
      })
      .catch(err => {
        console.log(err);
      });
  }
}, '.popup_type_new-place');

const validatorForNewPlaceForm = new FormValidator(classNamesSettings, newPlace._formElement);
validatorForNewPlaceForm.enableValidation();

const handleOpenNewPlace = () => {
  validatorForNewPlaceForm.hideInputErrors();
  newPlace.open();
}

newPlace.setEventListeners();

newPlaceAddButton.addEventListener('click', handleOpenNewPlace);


