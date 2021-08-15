export default class FormValidator {
  constructor(settings, formElement){
    this._formElement = formElement;
    this._settings = settings;
    this._inputListArray = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
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
        this.changeButtonState();
    })
  }

  checkInputValidity(inputElement){
    const inputIsNotValid = !inputElement.validity.valid;
    if(inputIsNotValid){
      const errorMessage = inputElement.validationMessage;
      this._toggleInputError('show', inputElement, errorMessage);
    } else {
      this._toggleInputError('hide', inputElement);
    }
  }

  changeButtonState(){
    const noValidElements = this._inputListArray.some(inputElement => !inputElement.validity.valid);
    const formButton = this._formElement.querySelector(this._settings.submitButtonSelector);
    if(noValidElements) {
      formButton.setAttribute('disabled', true);
      formButton.classList.add(this._settings.inactiveButtonClass);
    } else {
      formButton.removeAttribute('disabled', true);
      formButton.classList.remove(this._settings.inactiveButtonClass);
    }
  }

  _setEventListeners(){
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    this.changeButtonState();

    const setInputValidity = (inputElement) => {
      inputElement.addEventListener('input', () => {
        this.checkInputValidity(inputElement);
        this.changeButtonState();
      })
    }
    this._inputListArray.forEach(setInputValidity);
  }
  enableValidation(){
    this._setEventListeners();
  }
}
