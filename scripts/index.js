/* ЗАКРЫТЬ ОТКРЫТЬ POPUP*/

const openClosePopup = (popup) => {
  popup.classList.toggle('popup_opened');
}

/*PROFILE*/
const profileSection  = document.querySelector('.profile');
const profileButton = profileSection.querySelector('.profile__edit-button');
const profileName = profileSection.querySelector('.profile__name');
const profileabout = profileSection.querySelector('.profile__about');

const popupSectionProfileEdit = document.querySelector('.profile-edit');

const popupInputProfileName = popupSectionProfileEdit.querySelector('.popup__input_author_name');
const popupInputProfileAbout = popupSectionProfileEdit.querySelector('.popup__input_author_about');

const popupProfileEditCloseButton = popupSectionProfileEdit.querySelector('.popup__close-button');
const popupProfileEditSubmitButton = popupSectionProfileEdit.querySelector('.popup__submit-button');

const openPopupProfileEdit = () => {
  openClosePopup(popupSectionProfileEdit);
  popupInputProfileName.value = profileName.innerText;
  popupInputProfileAbout.value = profileabout.innerText;
};

const editProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = popupInputProfileName.value;
  profileabout.textContent = popupInputProfileAbout.value;
  openClosePopup(popupSectionProfileEdit);
}

profileButton.addEventListener('click', openPopupProfileEdit);
popupProfileEditCloseButton.addEventListener('click', () => openClosePopup(popupSectionProfileEdit));
popupProfileEditSubmitButton.addEventListener('click', editProfile);

/*NEW PLACE*/
const newPlaceAddButton = document.querySelector('.add-button');

const popupSectionNewPlace = document.querySelector('.new-place');

const popupInputNewPlaceName = popupSectionNewPlace.querySelector('.popup__input_place_name');
const popupInputNewPlaceUrl = popupSectionNewPlace.querySelector('.popup__input_place_url');

const popupNewPlaceCloseButton = popupSectionNewPlace.querySelector('.popup__close-button');
const popupNewPlaceSubmitButton = popupSectionNewPlace.querySelector('.popup__submit-button');

const addNewElement = (evt) => {
  evt.preventDefault();
  createElement(popupInputNewPlaceName.value,popupInputNewPlaceUrl.value);
  popupInputNewPlaceName.value = '';
  popupInputNewPlaceUrl.value = '';
  openClosePopup(popupSectionNewPlace);
}

newPlaceAddButton.addEventListener('click', () => openClosePopup(popupSectionNewPlace));
popupNewPlaceCloseButton.addEventListener('click', () => openClosePopup(popupSectionNewPlace));
popupNewPlaceSubmitButton.addEventListener('click', addNewElement);

/*ELEMENTS*/

const sectionElements = document.querySelector('.elements');
const elementTemplate = sectionElements.querySelector('#elementTemplate').content;

const initialElements = [
  {
    name: 'Воскресеновка',
    link: './images/river_tom_01.jpg'
  },
  {
    name: 'Серышевский район',
    link: './images/river_tom_02.jpg'
  },
  {
    name: 'Река Томь',
    link: './images/river_tom_03.jpg'
  },
  {
    name: 'Небо над рекой Томь',
    link: './images/river_tom_04.jpg'
  },
  {
    name: 'Ночной костёр',
    link: './images/river_tom_05.jpg'
  },
  {
    name: 'Песчаный берег Томи',
    link: './images/river_tom_06.jpg'
  }
];

const makeLikeActive = (evt) => {
  evt.target.classList.add('element__like-button_active');
}

const deleteElement = (evt) => {
  evt.target.closest('.element').remove();
}

const createElement = (name, link) =>{
    if(name && link && (link.includes('http://') || link.includes('https://') || link.includes('.jpg')  || link.includes('.jpeg') || link.includes('.png'))) {
      const elementContainer = elementTemplate.querySelector('.element').cloneNode(true);
      elementContainer.querySelector('.element__title').textContent = name;
      elementContainer.querySelector('.element__image').src = link;
      elementContainer.querySelector('.element__image').alt = name;
      sectionElements.prepend(elementContainer);
      elementContainer.querySelector('.element__like-button').addEventListener('click', makeLikeActive);
      elementContainer.querySelector('.element__delete-button').addEventListener('click', deleteElement);
      elementContainer.querySelector('.element__image').addEventListener('click', openPopupImage);
    }else{
      alert('Не все поля заполнены корректно!');
    }
}

const popupSectionImage  = document.querySelector('.popup__image-overlay');
const popupPhotoCloseButton = popupSectionImage.querySelector('.popup__close-button');
const popupPhotoImage = popupSectionImage.querySelector('.popup__image');
const popupPhotoCaption = popupSectionImage.querySelector('.popup__image-caption');

const openPopupImage = (evt) => {
  openClosePopup(popupSectionImage);
  popupPhotoImage.src = evt.srcElement.src;
  popupPhotoCaption.textContent = evt.srcElement.alt;
}

popupPhotoCloseButton.addEventListener('click', () => openClosePopup(popupSectionImage));

/* ЗАГРУЖАЕМ ЭЛЕМЕНТЫ ИЗ "БАЗЫ" НА СТРАНИЦУ*/

const loadElements = () => {
  initialElements.forEach((element) => {
    createElement(element.name, element.link);
  })
}

loadElements();
