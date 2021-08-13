export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._close = this.close.bind(this);
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if(evt.target === evt.currentTarget) {
      this.close();
    }
  }

  open(profile) {
    if(profile) {
      this._popup.querySelector('.popup__input_author_name').value = userInfo.getUserInfo().name;
      this._popup.querySelector('.popup__input_author_about').value = userInfo.getUserInfo().about;
    }
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', this._close);
    document.addEventListener('keyup', this._handleEscClose);
    this._popup.addEventListener('click', this._handleOverlayClose);
  }
}
