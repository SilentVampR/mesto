import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
  }

  open({ data }) {
    const popupPhotoImage = this._popup.querySelector('.popup__image');
    popupPhotoImage.src = data.link;
    popupPhotoImage.alt = data.name;
    this._popup.querySelector('.popup__image-caption').textContent = data.name;
    super.open();
  }
}
