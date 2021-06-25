/*PROFILE*/
const profileSection  = document.querySelector('.profile');
const profileButton = profileSection.querySelector('.profile__edit-button');
const profileName = profileSection.querySelector('.profile__name');
const profileabout = profileSection.querySelector('.profile__about');

const popupSectionProfileEdit = document.querySelector('.popup__profile-edit');

const popupInputProfileName = popupSectionProfileEdit.querySelector('.popup__input_author_name');
const popupInputProfileAbout = popupSectionProfileEdit.querySelector('.popup__input_author_about');

const popupProfileEditCloseButton = popupSectionProfileEdit.querySelector('.popup__close-button');
const popupProfileEditSubmitButton = popupSectionProfileEdit.querySelector('.popup__submit-button');

const popupOpenProfileEdit = function() {
  popupSectionProfileEdit.classList.add('popup_opened');
  popupInputProfileName.value = profileName.innerText;
  popupInputProfileAbout.value = profileabout.innerText;
};

const popupCloseProfileEdit = function() {
  popupSectionProfileEdit.classList.remove('popup_opened');
};

const editProfile = function(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputProfileName.value;
  profileabout.textContent = popupInputProfileAbout.value;
  popupCloseProfileEdit();
}

profileButton.addEventListener('click', popupOpenProfileEdit);

popupProfileEditCloseButton.addEventListener('click', popupCloseProfileEdit);

popupProfileEditSubmitButton.addEventListener('click', editProfile);

/*NEW PLACE*/
const newPlaceAddButton = document.querySelector('.add-button');

const popupSectionNewPlace = document.querySelector('.popup__new-place');

const popupInputNewPlaceName = popupSectionNewPlace.querySelector('.popup__input_place_name');
const popupInputNewPlaceUrl = popupSectionNewPlace.querySelector('.popup__input_place_url');

const popupNewPlaceCloseButton = popupSectionNewPlace.querySelector('.popup__close-button');
const popupNewPlaceSubmitButton = popupSectionNewPlace.querySelector('.popup__submit-button');

const popupOpenNewPlace = () => {
  popupSectionNewPlace.classList.add('popup_opened');
}

const addPlace = (evt) => {
  evt.preventDefault();
  addElement(popupInputNewPlaceName.value,popupInputNewPlaceUrl.value);
  popupCloseNewPlace();
}

const popupCloseNewPlace = () => {
  popupSectionNewPlace.classList.remove('popup_opened');
};

newPlaceAddButton.addEventListener('click', popupOpenNewPlace);

popupNewPlaceCloseButton.addEventListener('click', popupCloseNewPlace);

popupNewPlaceSubmitButton.addEventListener('click', addPlace);

/*ELEMENTS*/

const sectionElements = document.querySelector('.elements');

const elementTemplate = sectionElements.querySelector('#elementTemplate').content;

/*const initialElements = [
  {
    name: 'Воскресеновка',
    alt: 'Берег реки покрытый зеленой травой.',
    link: './images/river_tom_01.jpg'
  },
  {
    name: 'Серышевский район',
    alt: 'Берег реки зеленая трава и спокойная река.',
    link: './images/river_tom_02.jpg'
  },
  {
    name: 'Река Томь',
    alt: 'Зеркальная поверхность реки, вдали виднеется берег с деревьями. Множество белых облаков на небе.',
    link: './images/river_tom_03.jpg'
  },
  {
    name: 'Небо над рекой Томь',
    alt: 'Безоблачное небо и кроны деревьев.',
    link: './images/river_tom_04.jpg'
  },
  {
    name: 'Ночной костёр',
    alt: 'Ночной костёр.',
    link: './images/river_tom_05.jpg'
  },
  {
    name: 'Песчаный берег Томи',
    alt: 'Мокрый песок на берегу реки.',
    link: './images/river_tom_06.jpg'
  }
];*/

const initialElements = [
  {
    name: 'Воскресеновка',
    link: './images/river_tom_01.jpg'
  },
  {
    name: 'Серышевский район',
    link: './images/river_tom_02.jpg'
  },
  {
    name: 'Река Томь',
    link: './images/river_tom_03.jpg'
  },
  {
    name: 'Небо над рекой Томь',
    link: './images/river_tom_04.jpg'
  },
  {
    name: 'Ночной костёр',
    link: './images/river_tom_05.jpg'
  },
  {
    name: 'Песчаный берег Томи',
    link: './images/river_tom_06.jpg'
  }
];

const likeAdd = (evt) => {
  evt.target.classList.add('element__like-button_active');
}

const addElement = (name,link) =>{
    if(name && link){
      const elementContainer = elementTemplate.querySelector('.element').cloneNode(true);
      elementContainer.querySelector('.element__title').textContent = name;
      elementContainer.querySelector('.element__image').src = link;
      elementContainer.querySelector('.element__image').alt = name;
      sectionElements.append(elementContainer);
    }
}

const loadElements = () => {
  initialElements.forEach((element) => {
    addElement(element.name, element.link);
  })
}
loadElements();

const countButtons = () => {

}

let likeButton = sectionElements.querySelectorAll('.element__like-button');

for(var i = 0; i < likeButton.length; i++) {
  likeButton[i].addEventListener('click', likeAdd);
}


const deleteButton = sectionElements.querySelectorAll('element__delete-button');
