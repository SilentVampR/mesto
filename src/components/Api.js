export default class Api {
  constructor({apiURL, headers}){
    this._apiURL = apiURL;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(this._apiURL + '/users/me', {
      headers: this._headers
    })
    .then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка получения информации о пользователе с сервера - ${res.status}`);
    })
  }

  getInitialCards() {
    return fetch(this._apiURL + '/cards/', {
      headers: this._headers
    })
      .then(res => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject(`Ошибка получения карточек с сервера - ${res.status}`);
      })
  }

  addNewPlace(data) {
    return fetch(this._apiURL + '/cards', {
      method: 'POST',
      body: JSON.stringify({
        name: data.placeName,
        link: data.placeUrl,
      }),
      headers: this._headers
    })
      .then(res => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject(`Ошибка добавления карточки на сервер - ${res.status}`);
      })
  }

  removeCard(id) {
    return fetch(this._apiURL + '/cards/' + id, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject(`Ошибка удаления карточки с сервера - ${res.status}`);
      })
  }

  addLike(id) {
    return fetch(this._apiURL + '/cards/likes/' + id, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка добавления лайка для карточки - ${res.status}`);
    })
  }

  removeLike(id) {
    return fetch(this._apiURL + '/cards/likes/' + id, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка удаления лайка для карточки - ${res.status}`);
    })
  }

  editAvatar(data) {
    return fetch(this._apiURL + '/users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.avatarUrl
      }),
      headers: this._headers
    })
    .then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка изменения аватара пользователя - ${res.status}`);
    })
  }

  editUserInfo(data) {
    return fetch(this._apiURL + '/users/me', {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.profileAuthorName,
        about: data.profileAuthorAbout
      }),
      headers: this._headers
    })
    .then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка изменения информации пользователя - ${res.status}`);
    })
  }
}
