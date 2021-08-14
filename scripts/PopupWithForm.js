import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ formSelector, inputSelector, formSubmitCallback }, popupSelector ) {
    super(popupSelector);
    this._formElement = document.querySelector(formSelector);
    this._formSubmitCallBack = formSubmitCallback;
    this._inputArr = Array.from(this._formElement.querySelectorAll(inputSelector));
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _getInputValues() {
    this._formValues = {};
    this._inputArr.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  open(data) {
    if(this._popup.classList.contains('popup_type_profile-edit')) {
      this.setInputValues(data);
    }
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  _handleSubmit(evt){
    evt.preventDefault();
    console.log(this._getInputValues());
    this._formSubmitCallBack(this._getInputValues());
    this.close();
  }

  setInputValues(data) {
    document.querySelector('.popup__input_author_name').value = data.name;
    document.querySelector('.popup__input_author_about').value = data.about;
  }

  setEventListeners(){
    this._formElement.addEventListener('submit', this._handleSubmit);
    this._popupCloseButton.addEventListener('click', this._close);
    document.addEventListener('keyup', this._handleEscClose);
    this._popup.addEventListener('click', this._handleOverlayClose);
  }

  close() {
    this._formElement.reset();
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
    this._formElement.addEventListener('submit', this._handleSubmit);
  }

}
