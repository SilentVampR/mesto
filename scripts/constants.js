/*import riverTomVoskresenovka from '../images/river_tom_01.jpg';
import riverTomSerishevskii from '../images/river_tom_02.jpg';
import riverTomRiver from '../images/river_tom_03.jpg';
import riverTomSky from '../images/river_tom_04.jpg';
import riverTomFire from '../images/river_tom_05.jpg';
import riverTomSandShore from '../images/river_tom_06.jpg';*/




/*export const initialCards = [
  {
    name: 'Воскресеновка',
    link: riverTomVoskresenovka
  },
  {
    name: 'Серышевский район',
    link: riverTomSerishevskii
  },
  {
    name: 'Река Томь',
    link: riverTomRiver
  },
  {
    name: 'Небо над рекой Томь',
    link: riverTomSky
  },
  {
    name: 'Ночной костёр',
    link: riverTomFire
  },
  {
    name: 'Песчаный берег Томи',
    link: riverTomSandShore
  }
];*/
export const initialCards = [
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
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
}
