import Popup from "./Popup,js";
class PopupWithImage extends Popup{
  constructor({ data }, popupSelector){
    this._src = data.src;
    this._text = data.text;
    this._popupSelector = popupSelector;
  }

  open() {

  }
}
