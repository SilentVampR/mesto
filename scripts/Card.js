import { openPopup } from "./index.js";
const popupSectionImage  = document.querySelector('.popup_type_image-overlay');
const popupPhotoImage = popupSectionImage.querySelector('.popup__image');
const popupPhotoCaption = popupSectionImage.querySelector('.popup__image-caption');

export default class Card {
  constructor(data, template) {
    this._image = data.link;
    this._name = data.name;
    this._template = template;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._template)
    .content
    .querySelector('.card')
    .cloneNode(true);
    return cardElement;
  }

  _setEventListeners(){
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._handlerLikeButtonClick();
    });
    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._handlerDeleteButtonClick();
    });
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handlerImageClick();
    });
  }

  _handlerLikeButtonClick() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  _handlerDeleteButtonClick() {
      this._element.remove();
      this._element = null;
  }

  _handlerImageClick() {
    popupPhotoImage.src = this._image;
    popupPhotoImage.alt = this._name;
    popupPhotoCaption.textContent = this._name;
    openPopup(popupSectionImage);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardImageTemplate = this._element.querySelector('.card__image');
    cardImageTemplate.src = this._image;
    cardImageTemplate.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    return this._element;
  }
}
