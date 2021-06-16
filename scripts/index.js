const profileSection  = document.querySelector('.profile');
const profileButton = profileSection.querySelector('.profile__edit-button');
const profileName = profileSection.querySelector('.profile__name');
const profileabout = profileSection.querySelector('.profile__about');

const popupSection = document.querySelector('.popup');
const popupCloseButton = popupSection.querySelector('.popup__close-button');
const popupSubmitButton = popupSection.querySelector('.popup__submit-button');
const popupInputName = popupSection.querySelector('.popup__input_author_name');
const popupInputabout = popupSection.querySelector('.popup__input_author_about');

const likeButton = document.querySelectorAll('.element__like-button');

const popupOpen = function() {
  popupSection.classList.add('popup_opened');
  popupInputName.value = profileName.innerText;
  popupInputabout.value = profileabout.innerText;
};
const popupClose = function() {
  popupSection.classList.remove('popup_opened');
};

const editProfile = function(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileabout.textContent = popupInputabout.value;
  popupClose();
}

const likeAdd = function(evt){
  evt.target.classList.add('element__like-button_active');
}

profileButton.addEventListener('click', popupOpen);

popupCloseButton.addEventListener('click', popupClose);

popupSubmitButton.addEventListener('click', editProfile);

for(var i = 0; i < likeButton.length; i++) {
  likeButton[i].addEventListener('click', likeAdd);
}
