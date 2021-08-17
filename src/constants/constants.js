const riverTomVoskresenovka = new URL('../images/river_tom_01.jpg', import.meta.url);
const riverTomSerishevskii = new URL('../images/river_tom_02.jpg', import.meta.url);
const riverTomRiver = new URL('../images/river_tom_03.jpg', import.meta.url);
const riverTomSky = new URL('../images/river_tom_04.jpg', import.meta.url);
const riverTomFire = new URL('../images/river_tom_05.jpg', import.meta.url);
const riverTomSandShore = new URL('../images/river_tom_06.jpg', import.meta.url);

export const initialCards = [
  {
    name: 'Воскресеновка',
    image: riverTomVoskresenovka
  },
  {
    name: 'Серышевский район',
    image: riverTomSerishevskii
  },
  {
    name: 'Река Томь',
    image: riverTomRiver
  },
  {
    name: 'Небо над рекой Томь',
    image: riverTomSky
  },
  {
    name: 'Ночной костёр',
    image: riverTomFire
  },
  {
    name: 'Песчаный берег Томи',
    image: riverTomSandShore
  }
];

export const classNamesSettings = {
  formSelector: '.popup__form-container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_state_not-valid',
  errorClass: 'popup__text-error_state_not-valid',
  inputContainer: '.popup__input-container',
  errorText: '.popup__text-error',
  templateId: '#cardTemplate',
  profileNameSelector: '.profile__name',
  profileAboutSelector: '.profile__about',
  sectionCards: '.cards',
}
