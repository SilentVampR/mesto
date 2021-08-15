export default class UserInfo {
  constructor({ profileNameSelector, profileAboutSelector}) {
    this._userName = document.querySelector(profileNameSelector);
    this._userAbout = document.querySelector(profileAboutSelector);
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
