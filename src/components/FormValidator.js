export default class FormValidator {
  constructor(settings, formElement){
    this._formElement = formElement;
    this._settings = settings;
    this._inputListArray = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._formButton = this._formElement.querySelector(this._settings.submitButtonSelector);
  }
  _toggleInputError (type, inputElement, errorMessage) {
    const inputContainer = inputElement.closest(this._settings.inputContainer);
    const errorElement = inputContainer.querySelector(this._settings.errorText);
    if(type === 'show') {
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._settings.errorClass);
    } else {
      errorElement.textContent = "";
      errorElement.classList.remove(this._settings.errorClass);
    }
  };

  hideInputErrors() {
    this._inputListArray.forEach((inputElement) => {
        this._toggleInputError('hide', inputElement);
        this._changeButtonState();
    })
  }

  _checkInputValidity(inputElement){
    const inputIsNotValid = !inputElement.validity.valid;
    if(inputIsNotValid){
      const errorMessage = inputElement.validationMessage;
      this._toggleInputError('show', inputElement, errorMessage);
    } else {
      this._toggleInputError('hide', inputElement);
    }
  }

  _changeButtonState(){
    const notValidElement = this._inputListArray.some(inputElement => !inputElement.validity.valid);
    if(notValidElement) {
      this._formButton.setAttribute('disabled', true);
      this._formButton.classList.add(this._settings.inactiveButtonClass);
    } else {
      this._formButton.removeAttribute('disabled', true);
      this._formButton.classList.remove(this._settings.inactiveButtonClass);
    }
  }

  _setEventListeners(){
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    this._changeButtonState();

    const setInputValidity = (inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._changeButtonState();
      })
    }
    this._inputListArray.forEach(setInputValidity);
  }
  enableValidation(){
    this._setEventListeners();
  }
}
