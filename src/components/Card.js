export default class Card {
  constructor({ data, imageOpener, confirmOpener, handleLikeButton }, templateSelector, myId) {
    this._link = data.link;
    this._name = data.name;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._likesArr = data.likes;
    this._likesCount = data.likes.length;
    this._templateSelector = templateSelector;
    this._myId = myId;
    this._imageOpener = imageOpener;
    this._confirmOpener = confirmOpener;
    this._handleLikeButton = handleLikeButton;
    this._imageOpener = this._imageOpener.bind(this);
    this._confirmOpener = this._confirmOpener.bind(this);
    this._handleLikeButton = this._handleLikeButton.bind(this);
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
    this._element.querySelector('.card__like-button').addEventListener('click', this._handleLikeButton);
    this._element.querySelector('.card__image').addEventListener('click', this._imageOpener);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.id = this._id;
    const cardImageTemplate = this._element.querySelector('.card__image');
    cardImageTemplate.src = this._link;
    cardImageTemplate.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__like-counter').textContent = this._likesCount;
    this._likesArr.forEach((like) => {
      if(like._id === this._myId) {
        this._element.querySelector('.card__like-button').classList.add('card__like-button_active');
      }
    })
    if(this._ownerId === this._myId){
      const deleteButton = this._element.querySelector('.card__delete-button');
      deleteButton.classList.add('card__delete-button_active');
      deleteButton.addEventListener('click', this._confirmOpener);
    }
    this._setEventListeners();
    return this._element;
  }
}
