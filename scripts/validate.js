const toggleInputError = (type, inputElement, settings, errorMessage) => {
  const inputContainer = inputElement.closest(settings.inputContainer);
  const errorElement = inputContainer.querySelector(settings.errorText);
  if(type === 'show') {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  } else {
    errorElement.textContent = "";
    errorElement.classList.remove(settings.errorClass);
  }
};

const checkInputValidity = (inputElement, settings) => {
  const inputIsNotValid = !inputElement.validity.valid;
  if(inputIsNotValid){
    const errorMessage = inputElement.validationMessage;
    toggleInputError('show', inputElement, settings, errorMessage);
  } else {
    toggleInputError('hide', inputElement, settings);
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
      checkInputValidity(inputElement, settings);
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
