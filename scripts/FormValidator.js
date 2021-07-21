export class FormValidator {
  constructor(settings, formElement){
    this._formElement = formElement;
    this._settings = settings;
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

  checkInputValidity(inputElement){
    const inputIsNotValid = !inputElement.validity.valid;
    if(inputIsNotValid){
      const errorMessage = inputElement.validationMessage;
      this._toggleInputError('show', inputElement, errorMessage);
    } else {
      this._toggleInputError('hide', inputElement);
    }
  }
  changeButtonState(inputListArray){
    const noValidElements = inputListArray.some(inputElement => !inputElement.validity.valid);
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
    const inputListArray = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this.changeButtonState(inputListArray);

    const setInputValidity = (inputElement) => {
      inputElement.addEventListener('input', () => {
        this.checkInputValidity(inputElement);
        this.changeButtonState(inputListArray);
      })
    }
    inputListArray.forEach(setInputValidity);
  }
  enableValidation(){
    this._setEventListeners();
  }
}
