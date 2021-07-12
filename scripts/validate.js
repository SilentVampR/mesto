const setEventListeners = (form, inputSelector) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })
  const inputList = form.querySelectorAll(inputSelector);
  const submitButton = form.querySelector('.popup__submit-button');

  const setInputValidity = (inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(form, inputElement);
      changeButtonState(inputList, submitButton);
      console.log(inputList);
    })
  }
  inputList.forEach(setInputValidity);
}

const enableValidation = (settings) => {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach((form) => {
    setEventListeners(form, settings.inputSelector);
  })
}

enableValidation(classNamesSettings);
