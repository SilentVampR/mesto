export default class UserInfo {
  constructor({ nameSelector, aboutSelector}) {
    this._userName = document.querySelector(nameSelector);
    this._userAbout = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
    }
  }

  setUserInfo(data) {
    this._userName.textContent = data.profileAuthorName;
    this._userAbout.textContent = data.profileAuthorAbout;
  }
}
