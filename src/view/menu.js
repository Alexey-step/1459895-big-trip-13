import Abstract from "./abstract.js";
import {MenuItem} from "../consts.js";

const createMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
            <a class="trip-tabs__btn  trip-tabs__btn--active" data-menu-type="${MenuItem.TABLE}" href="#">Table</a>
            <a class="trip-tabs__btn" data-menu-type="${MenuItem.STATS}" href="#">Stats</a>
          </nav>`;
};

export default class Menu extends Abstract {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.menuType);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const checkedElement = this.getElement().querySelector(`[data-menu-type=${menuItem}]`);
    const activeElement = this.getElement().querySelector(`.trip-tabs__btn--active`);

    if (checkedElement !== null && activeElement !== null) {
      activeElement.classList.remove(`trip-tabs__btn--active`);
      checkedElement.classList.add(`trip-tabs__btn--active`);
    }
  }
}
