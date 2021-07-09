/* ЗАКРЫТЬ ОТКРЫТЬ POPUP*/

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

document.addEventListener('keyup', (evt) => {
  const openedPopup = document.querySelector('.popup_opened');
  if(evt.key === 'Escape' && openedPopup){
    closePopup(openedPopup);
  }
})

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

const popupFormNewPlace = popupSectionNewPlace.querySelector('.popup__form-container');
const popupInputNewPlaceName = popupSectionNewPlace.querySelector('.popup__input_place_name');
const popupInputNewPlaceUrl = popupSectionNewPlace.querySelector('.popup__input_place_url');

const popupNewPlaceCloseButton = popupSectionNewPlace.querySelector('.popup__close-button');
const popupNewPlaceSubmitButton = popupSectionNewPlace.querySelector('.popup__submit-button');

const addNewElement = (evt) => {
  evt.preventDefault();
  const newElement  = {
    name: popupInputNewPlaceName.value,
    link: popupInputNewPlaceUrl.value
  }
  if(newElement.name && newElement.link && (newElement.link.includes('http://') || newElement.link.includes('https://') || newElement.link.includes('.jpg')  || newElement.link.includes('.jpeg') || newElement.link.includes('.png'))) {
    sectionElements.prepend(createElement(newElement));
    popupFormNewPlace.reset();
    closePopup(popupSectionNewPlace);
  }else{
    alert('Не все поля заполнены корректно!');
  }
}

newPlaceAddButton.addEventListener('click', () => openPopup(popupSectionNewPlace));
popupNewPlaceCloseButton.addEventListener('click', () => closePopup(popupSectionNewPlace));
popupNewPlaceSubmitButton.addEventListener('click', addNewElement);

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

popupPhotoCloseButton.addEventListener('click', () => closePopup(popupSectionImage));

/* OPEN POPUP WITH IMAGE */

const openPopupImage = (imgData) => {
  openPopup(popupSectionImage);
  popupPhotoImage.src = imgData.link;
  popupPhotoImage.alt = imgData.name;
  popupPhotoCaption.textContent = imgData.name;
}

/* OVERLAY CLICK ACTION */
popupSectionProfileEdit.addEventListener('click', (evt) => {
  if(evt.target === evt.currentTarget) {
    closePopup(popupSectionProfileEdit);
  }
})

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

/* CREATE ELEMENT */

const createElement = (imgData) => {
  const elementContainer = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = elementContainer.querySelector('.element__image');
  const elementTitle = elementContainer.querySelector('.element__title');
  const elementLikeButton = elementContainer.querySelector('.element__like-button');
  const elementDeleteButton = elementContainer.querySelector('.element__delete-button');

  elementTitle.textContent = imgData.name;
  elementImage.src = imgData.link;
  elementImage.alt = imgData.name;

  elementLikeButton.addEventListener('click', makeLikeActive);
  elementDeleteButton.addEventListener('click', deleteElement);
  elementImage.addEventListener('click', () => openPopupImage(imgData));

  return elementContainer;
}

/* ЗАГРУЖАЕМ ЭЛЕМЕНТЫ ИЗ "БАЗЫ" НА СТРАНИЦУ*/

const loadElements = (container) => {
  initialElements.forEach((element) => {
    container.prepend(createElement(element));
  })
}

loadElements(sectionElements);
