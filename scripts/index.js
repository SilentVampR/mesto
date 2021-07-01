/* ЗАКРЫТЬ ОТКРЫТЬ POPUP*/

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

/*PROFILE*/
const profileSection  = document.querySelector('.profile');
const profileButton = profileSection.querySelector('.profile__edit-button');
const profileName = profileSection.querySelector('.profile__name');
const profileAbout = profileSection.querySelector('.profile__about');

const popupSectionProfileEdit = document.querySelector('.profile-edit');

const popupInputProfileName = popupSectionProfileEdit.querySelector('.popup__input_author_name');
const popupInputProfileAbout = popupSectionProfileEdit.querySelector('.popup__input_author_about');

const popupProfileEditCloseButton = popupSectionProfileEdit.querySelector('.popup__close-button');
const popupProfileEditSubmitButton = popupSectionProfileEdit.querySelector('.popup__submit-button');

const openPopupProfileEdit = () => {
  openPopup(popupSectionProfileEdit);
  popupInputProfileName.value = profileName.textContent;
  popupInputProfileAbout.value = profileAbout.textContent;
};

const editProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = popupInputProfileName.value;
  profileAbout.textContent = popupInputProfileAbout.value;
  closePopup(popupSectionProfileEdit);
}

profileButton.addEventListener('click', openPopupProfileEdit);
popupProfileEditCloseButton.addEventListener('click', () => closePopup(popupSectionProfileEdit));
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
  const newElementName = popupInputNewPlaceName.value;
  const newElementLink = popupInputNewPlaceUrl.value;
  if(newElementName && newElementLink && (newElementLink.includes('http://') || newElementLink.includes('https://') || newElementLink.includes('.jpg')  || newElementLink.includes('.jpeg') || newElementLink.includes('.png'))) {
    sectionElements.prepend(createElement(newElementName,newElementLink));
    popupInputNewPlaceName.value = '';
    popupInputNewPlaceUrl.value = '';
    closePopup(popupSectionNewPlace);
  }else{
    alert('Не все поля заполнены корректно!');
  }
}

newPlaceAddButton.addEventListener('click', () => openPopup(popupSectionNewPlace));
popupNewPlaceCloseButton.addEventListener('click', () => closePopup(popupSectionNewPlace));
popupNewPlaceSubmitButton.addEventListener('click', addNewElement);
popupSectionProfileEdit.addEventListener('click', (evt) => {
  if(evt.target === evt.currentTarget) {
    closePopup(popupSectionProfileEdit);
  }
})

/*ELEMENTS*/

const sectionElements = document.querySelector('.elements');
const elementTemplate = sectionElements.querySelector('#elementTemplate').content;

const makeLikeActive = (evt) => {
  evt.target.classList.add('element__like-button_active');
}

const deleteElement = (evt) => {
  evt.target.closest('.element').remove();
}

const popupSectionImage  = document.querySelector('.image-overlay');
const popupPhotoCloseButton = popupSectionImage.querySelector('.popup__close-button');
const popupPhotoImage = popupSectionImage.querySelector('.popup__image');
const popupPhotoCaption = popupSectionImage.querySelector('.popup__image-caption');

const openPopupImage = (evt) => {
  openPopup(popupSectionImage);
  popupPhotoImage.src = evt.srcElement.src;
  popupPhotoImage.alt = evt.srcElement.alt;
  popupPhotoCaption.textContent = evt.srcElement.alt;
}

popupPhotoCloseButton.addEventListener('click', () => closePopup(popupSectionImage));
popupSectionImage.addEventListener('click', (evt) => {
  if(evt.target === evt.currentTarget) {
    closePopup(popupSectionImage);
  }
})
popupSectionNewPlace.addEventListener('click', (evt) => {
  if(evt.target === evt.currentTarget) {
    closePopup(popupSectionNewPlace);
  }
})

const createElement = (imgName, imgLink) => {
  const elementContainer = elementTemplate.querySelector('.element').cloneNode(true);
  elementContainer.querySelector('.element__title').textContent = imgName;
  const elementImage = elementContainer.querySelector('.element__image');
  elementImage.src = imgLink;
  elementImage.alt = imgName;
  elementContainer.querySelector('.element__like-button').addEventListener('click', makeLikeActive);
  elementContainer.querySelector('.element__delete-button').addEventListener('click', deleteElement);
  elementImage.addEventListener('click', openPopupImage);
  return elementContainer;
}


/* ЗАГРУЖАЕМ ЭЛЕМЕНТЫ ИЗ "БАЗЫ" НА СТРАНИЦУ*/

const loadElements = (container) => {
  initialElements.forEach((element) => {
    container.prepend(createElement(element.name, element.link));
  })
}

loadElements(sectionElements);
