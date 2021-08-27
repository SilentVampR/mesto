export default class Card {
  constructor({ data, imageOpener, confirmOpener }, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._id = data._id;
    this._templateSelector = templateSelector;
    this._imageOpener = imageOpener;
    this._confirmOpener = confirmOpener;
    this._handlerLikeButtonClick = this._handlerLikeButtonClick.bind(this);
    //this._handlerDeleteButtonClick = this._handlerDeleteButtonClick.bind(this);
    this._imageOpener = this._imageOpener.bind(this);
    this._confirmOpener = this._confirmOpener.bind(this);
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
    return cardElement;
  }

  _setEventListeners(){
    this._element.querySelector('.card__like-button').addEventListener('click', this._handlerLikeButtonClick);
    this._element.querySelector('.card__delete-button').addEventListener('click', this._confirmOpener);
    this._element.querySelector('.card__image').addEventListener('click', this._imageOpener);
  }

  _handlerLikeButtonClick() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  /*_handlerDeleteButtonClick() {
    this._element.remove();
    this._element = null;
  }*/

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.id = this._id;
    const cardImageTemplate = this._element.querySelector('.card__image');
    cardImageTemplate.src = this._link;
    cardImageTemplate.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    return this._element;
  }
}