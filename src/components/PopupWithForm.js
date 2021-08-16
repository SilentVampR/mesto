import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ formSelector, inputSelector, formSubmitCallback }, popupSelector ) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(formSelector);
    this._formSubmitCallBack = formSubmitCallback;
    this._inputArr = Array.from(this._formElement.querySelectorAll(inputSelector));
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _getInputValues() {
    const formValues = {};
    this._inputArr.forEach(input => formValues[input.name] = input.value);
    return formValues;
  }

  _handleSubmit(evt){
    evt.preventDefault();
    this._formSubmitCallBack(this._getInputValues());
    this.close();
  }

  setEventListeners(){
    this._formElement.addEventListener('submit', this._handleSubmit);
    super.setEventListeners();
  }

  close() {
    super.close();
    this._formElement.reset();
  }

}
