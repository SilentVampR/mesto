import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ formSelector, inputSelector, formSubmitCallback }, popupSelector ) {
    super(popupSelector);
    this._formElement = document.querySelector(formSelector);
    this._formSubmitCallBack = formSubmitCallback;
    this._inputArr = Array.from(this._formElement.querySelectorAll(inputSelector));
  }

  _getInputValues() {
    this._formValues = {};
    this._inputArr.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  _setInputValues() {

  }

  setEventListeners(){
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitCallBack(this._getInputValues());
      this.close();
    });
    this._popupCloseButton.addEventListener('click', this._close);
    document.addEventListener('keyup', this._handleEscClose);
    this._popup.addEventListener('click', this._handleOverlayClose);
  }

  close() {
    this._formElement.reset();
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
    console.log('close');
  }

}
