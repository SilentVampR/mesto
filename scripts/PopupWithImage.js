import Popup from "./Popup,js";

export default class PopupWithImage extends Popup{
  constructor({ data }, popupSelector){
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._image = data.img;
    this._name = data.name;
  }

  open() {
    super._setEventListeners();
    const popupPhotoImage = this._popup.querySelector('.popup__image')
    popupPhotoImage.src = this._image;
    popupPhotoImage.alt = this._name;
    this._popup.querySelector('.popup__image-caption').textContent = this._name;
    this._popup.classList.add('popup_opened');
  }
}
