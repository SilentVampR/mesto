export default class Api {
  constructor({url, headers}){
    this._url = url;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(this._url + '/users/me', {
      headers: this._headers
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
    });
  }

  getInitialCards() {
    return fetch(this._url + '/cards/', {
      headers: this._headers
    })
      .then(res => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject(`Ошибка получения карточек с сервера - ${res.status}`);
      })
  }

  editUserInfo() {

  }

  addNewPlace() {

  }

  showLikeCounters() {

  }

  removeCard() {

  }

  addLike() {

  }

  removeLike() {

  }

  editAvatar() {

  }
}
