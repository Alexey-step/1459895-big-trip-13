import FormEditView from "./../view/form-editing.js";
import {nanoid} from "./../utils/nanoid.js";
import {remove, render, renderPosition} from "./../utils/render.js";
import {UserAction, UpdateType} from "./../consts.js";

export default class WaypointNewPresenter {
  constructor(listContainer, changeData, pointsModel, offersModel) {
    this._listContainer = listContainer;
    this._changeData = changeData;
    this._offers = offersModel;
    this._points = pointsModel;

    this._waypointEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleCloseEditClick = this._handleCloseEditClick.bind(this);
  }

  init() {
    if (this._waypointEditComponent !== null) {
      return;
    }

    this._waypointEditComponent = new FormEditView(this._points, this._offers);
    this._waypointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._waypointEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._waypointEditComponent.setEditCloseClickHandler(this._handleCloseEditClick);

    render(this._listContainer, this._waypointEditComponent, renderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._waypointEditComponent === null) {
      return;
    }

    remove(this._waypointEditComponent);
    this._waypointEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(waypoint) {
    this._changeData(
        UserAction.ADD_WAYPOINT,
        UpdateType.MINOR,
        Object.assign({id: nanoid()}, waypoint)
    );
    this.destroy();
    document.querySelector(`.trip-main__event-add-btn`).disabled = false;
  }

  _handleCloseEditClick() {
    this.destroy();
    document.querySelector(`.trip-main__event-add-btn`).disabled = false;
  }

  _handleDeleteClick() {
    this.destroy();
    document.querySelector(`.trip-main__event-add-btn`).disabled = false;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Esc` || evt.key === `Escape`) {
      evt.preventDefault();
      this.destroy();
      document.querySelector(`.trip-main__event-add-btn`).disabled = false;
    }
  }

}
