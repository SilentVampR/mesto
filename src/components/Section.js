export default class Section {
  constructor({ renderer }, containerSelector, api){
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._api = api;
  }

  _renderItem(items){
    items.reverse();
    items.forEach((item) => {
      this._renderer(item)
    });
  }

  generateItems() {
    this._api.getInitialCards()
      .then((result) => {
        this._renderItem(result)
      })
  }

  saveItem(data) {
    this._renderer(data);
  }

  addItem(element){
    this._container.prepend(element);
  }
}
