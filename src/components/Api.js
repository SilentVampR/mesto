export default class Api {
  constructor({apiURL, headers}){
    this._apiURL = apiURL;
    this._headers = headers;
  }

  _checkResponse(res, text) {
    if(res.ok){
      return res.json();
    }
    return Promise.reject(`${text} - ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._apiURL + '/users/me', {
      headers: this._headers
    })
    .then(res => {
      return this._checkResponse(res, 'Ошибка получения информации о пользователе с сервера');
    })
  }

  getInitialCards() {
    return fetch(this._apiURL + '/cards/', {
      headers: this._headers
    })
      .then(res => {
        return this._checkResponse(res, 'Ошибка получения карточек с сервера');
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
        return this._checkResponse(res, 'Ошибка добавления карточки на сервер');
      })
  }

  removeCard(id) {
    return fetch(this._apiURL + '/cards/' + id, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        return this._checkResponse(res, 'Ошибка удаления карточки с сервера');
      })
  }

  addLike(id) {
    return fetch(this._apiURL + '/cards/likes/' + id, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => {
      return this._checkResponse(res, 'Ошибка добавления лайка для карточки');
    })
  }

  removeLike(id) {
    return fetch(this._apiURL + '/cards/likes/' + id, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      return this._checkResponse(res, 'Ошибка удаления лайка для карточки');
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
      return this._checkResponse(res, 'Ошибка изменения аватара пользователя');
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
      return this._checkResponse(res, 'Ошибка изменения информации пользователя');
    })
  }
}
