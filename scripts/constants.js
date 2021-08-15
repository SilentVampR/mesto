/*import riverTomVoskresenovka from '../images/river_tom_01.jpg';
import riverTomSerishevskii from '../images/river_tom_02.jpg';
import riverTomRiver from '../images/river_tom_03.jpg';
import riverTomSky from '../images/river_tom_04.jpg';
import riverTomFire from '../images/river_tom_05.jpg';
import riverTomSandShore from '../images/river_tom_06.jpg';*/

/*export const initialCards = [
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
];*/
export const initialCards = [
  {
    name: 'Воскресеновка',
    image: './images/river_tom_01.jpg'
  },
  {
    name: 'Серышевский район',
    image: './images/river_tom_02.jpg'
  },
  {
    name: 'Река Томь',
    image: './images/river_tom_03.jpg'
  },
  {
    name: 'Небо над рекой Томь',
    image: './images/river_tom_04.jpg'
  },
  {
    name: 'Ночной костёр',
    image: './images/river_tom_05.jpg'
  },
  {
    name: 'Песчаный берег Томи',
    image: './images/river_tom_06.jpg'
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
