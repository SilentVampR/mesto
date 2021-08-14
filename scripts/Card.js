export default class Card {
  constructor({ data, imageOpener }, template) {
    this._image = data.image;
    this._name = data.name;
    this._template = template;
    this._imageOpener = imageOpener;
    this._handlerLikeButtonClick = this._handlerLikeButtonClick.bind(this);
    this._handlerDeleteButtonClick = this._handlerDeleteButtonClick.bind(this);
    this._handlerImageClick = this._handlerImageClick.bind(this);
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
    this._element.querySelector('.card__like-button').addEventListener('click', this._handlerLikeButtonClick);
    this._element.querySelector('.card__delete-button').addEventListener('click', this._handlerDeleteButtonClick);
    this._element.querySelector('.card__image').addEventListener('click', this._handlerImageClick);
  }

  _handlerLikeButtonClick() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  _handlerDeleteButtonClick() {
      this._element.remove();
      this._element = null;
  }

  _handlerImageClick() {
    this._imageOpener();
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
