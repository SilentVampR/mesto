const riverTomVoskresenovka = new URL('../images/river_tom_01.jpg', import.meta.url);
const riverTomSerishevskii = new URL('../images/river_tom_02.jpg', import.meta.url);
const riverTomRiver = new URL('../images/river_tom_03.jpg', import.meta.url);
const riverTomSky = new URL('../images/river_tom_04.jpg', import.meta.url);
const riverTomFire = new URL('../images/river_tom_05.jpg', import.meta.url);
const riverTomSandShore = new URL('../images/river_tom_06.jpg', import.meta.url);

export const apiToken = "beb35b1a-7d6a-4743-95a3-06e29b783755";
export const url = "https://mesto.nomoreparties.co/v1/" + "cohort-27";

export const initialCards = [
  {
    name: 'Воскресеновка',
    link: riverTomVoskresenovka,
    id: '_1'
  },
  {
    name: 'Серышевский район',
    link: riverTomSerishevskii,
    id: '_2'
  },
  {
    name: 'Река Томь',
    link: riverTomRiver,
    id: '_3'
  },
  {
    name: 'Небо над рекой Томь',
    link: riverTomSky,
    id: '_4'
  },
  {
    name: 'Ночной костёр',
    link: riverTomFire,
    id: '_5'
  },
  {
    name: 'Песчаный берег Томи',
    link: riverTomSandShore,
    id: '_6'
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
