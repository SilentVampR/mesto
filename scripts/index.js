const classNamesSettings = {
  formSelector: '.popup__form-container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_state_not-valid',
  errorClass: 'popup__text-error_state_not-valid',
  inputContainer: '.popup__input-container',
  errorText: '.popup__text-error'
}

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

const openPopup = (popup) => {
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

const popupInputProfileName = popupSectionProfileEdit.querySelector('.popup__input_author_name');
const popupInputProfileAbout = popupSectionProfileEdit.querySelector('.popup__input_author_about');

const popupProfileEditSubmitButton = popupSectionProfileEdit.querySelector('.popup__submit-button');

const openPopupProfileEdit = () => {
  openPopup(popupSectionProfileEdit);
  popupInputProfileName.value = profileName.textContent;
  popupInputProfileAbout.value = profileAbout.textContent;
  checkInputValidity(popupInputProfileName, classNamesSettings);
  checkInputValidity(popupInputProfileAbout, classNamesSettings);
};

const editProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = popupInputProfileName.value;
  profileAbout.textContent = popupInputProfileAbout.value;
  closePopup(popupSectionProfileEdit);
}

profileButton.addEventListener('click', openPopupProfileEdit);
popupProfileEditSubmitButton.addEventListener('click', editProfile);

/*NEW PLACE*/
const newPlaceAddButton = document.querySelector('.add-button');

const popupSectionNewPlace = document.querySelector('.popup_type_new-place');

const popupFormNewPlace = popupSectionNewPlace.querySelector('.popup__form-container');
const popupInputNewPlaceName = popupSectionNewPlace.querySelector('.popup__input_place_name');
const popupInputNewPlaceUrl = popupSectionNewPlace.querySelector('.popup__input_place_url');
const popupNewPlaceSubmitButton = popupSectionNewPlace.querySelector('.popup__submit-button');

const addNewElement = (evt) => {
  evt.preventDefault();
  const newElement  = {
    name: popupInputNewPlaceName.value,
    link: popupInputNewPlaceUrl.value
  }
  sectionElements.prepend(createElement(newElement));
  popupFormNewPlace.reset();
  closePopup(popupSectionNewPlace);
  const newPlaceInputListArray = Array.from(popupFormNewPlace.querySelectorAll('.popup__input'));
  const popupSubmitButton = popupFormNewPlace.querySelector('.popup__submit-button');
  changeButtonState(newPlaceInputListArray, popupSubmitButton, classNamesSettings);
}

const openNewPlacePopup = (settings) => {
  popupFormNewPlace.reset();
  const popupTextErrorListArray = Array.from(popupFormNewPlace.querySelectorAll('.popup__text-error'));
  popupTextErrorListArray.forEach((textError) => {
    textError.classList.remove(settings.errorClass);
  })
  openPopup(popupSectionNewPlace);
}

newPlaceAddButton.addEventListener('click', () => openNewPlacePopup(classNamesSettings));
popupNewPlaceSubmitButton.addEventListener('click', addNewElement);

/*ELEMENTS*/

const sectionElements = document.querySelector('.elements');
const elementTemplate = sectionElements.querySelector('#elementTemplate').content;

const makeLikeActive = (evt) => {
  evt.target.classList.toggle('element__like-button_active');
}

const deleteElement = (evt) => {
  evt.target.closest('.element').remove();
}

const popupSectionImage  = document.querySelector('.popup_type_image-overlay');
const popupPhotoImage = popupSectionImage.querySelector('.popup__image');
const popupPhotoCaption = popupSectionImage.querySelector('.popup__image-caption');

/* OPEN POPUP WITH IMAGE */

const openPopupImage = (imgData) => {
  openPopup(popupSectionImage);
  popupPhotoImage.src = imgData.link;
  popupPhotoImage.alt = imgData.name;
  popupPhotoCaption.textContent = imgData.name;
}

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
