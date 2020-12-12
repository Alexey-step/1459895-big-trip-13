import FormEditingView from "./../view/form-editing.js";
import WaypointView from "./../view/waypoint.js";
import {render, renderPosition, replace, remove} from "./../utils/render.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class PointPresenter {
  constructor(listContainer, changeMode, changeData) {
    this._listComponent = listContainer;
    this._changeMode = changeMode;
    this._changeData = changeData;

    this._waypointComponent = null;
    this._formEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(waypoint) {
    this._waypoint = waypoint;

    const prevWaypointComponent = this._waypointComponent;
    const prevFormEditComponent = this._formEditComponent;

    this._waypointComponent = new WaypointView(waypoint);
    this._formEditComponent = new FormEditingView(waypoint);

    this._waypointComponent.setEditClickHandler(this._handleEditClick);
    this._formEditComponent.setEditClickHandler(this._handleFormSubmit);
    this._formEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._waypointComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevWaypointComponent === null || prevFormEditComponent === null) {
      render(this._listComponent, this._waypointComponent, renderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._waypointComponent, prevWaypointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._formEditComponent, prevFormEditComponent);
    }

    remove(prevWaypointComponent);
    remove(prevFormEditComponent);
  }

  _replaceWaypointToForm() {
    replace(this._formEditComponent, this._waypointComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToWaypoint() {
    replace(this._waypointComponent, this._formEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToWaypoint();
    }
  }

  _handleEditClick() {
    this._replaceWaypointToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToWaypoint();
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._waypoint,
            {
              isFavorite: !this._waypoint.isFavorite
            }
        )
    );
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToWaypoint();
    }
  }

  destroy() {
    remove(this._waypointComponent);
    remove(this._formEditComponent);
  }
}