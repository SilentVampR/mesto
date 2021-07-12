const showInputError = (inputElement, errorMessage) => {
  const inputContainer = inputElement.closest(classNamesSettings.inputContainer);
  const errorElement = inputContainer.querySelector(classNamesSettings.errorText);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(classNamesSettings.errorClass);
};

const hideInputError = (inputElement) => {
  const inputContainer = inputElement.closest(classNamesSettings.inputContainer);
  const errorElement = inputContainer.querySelector(classNamesSettings.errorText);

  errorElement.textContent = "";
  errorElement.classList.remove(classNamesSettings.errorClass);
};

const checkInputValidity = (inputElement) => {
  const inputIsNotValid = !inputElement.validity.valid;
  if(inputIsNotValid){
    //const errorMessage = inputElement.validationMessage;
    const errorMessage = getErrorMessage(inputElement);
    showInputError(inputElement, errorMessage);
  } else {
    hideInputError(inputElement);
  }
}

const changeButtonState = (inputListArray, button, settings) => {
  const noValidElements = inputListArray.some(inputElement => !inputElement.validity.valid);
  if(noValidElements) {
    button.setAttribute('disabled', true);
    button.classList.add(settings.inactiveButtonClass);
  } else {
    button.removeAttribute('disabled', true);
    button.classList.remove(settings.inactiveButtonClass);
  }
}


const setEventListeners = (form, settings) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })
  const inputListArray = Array.from(form.querySelectorAll(settings.inputSelector));
  const submitButton = form.querySelector(settings.submitButtonSelector);
  changeButtonState(inputListArray, submitButton, settings);

  const setInputValidity = (inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement);
      changeButtonState(inputListArray, submitButton, settings);
    })
  }
  inputListArray.forEach(setInputValidity);
}

const enableValidation = (settings) => {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach((form) => {
    setEventListeners(form, settings);
  })
}

enableValidation(classNamesSettings);
