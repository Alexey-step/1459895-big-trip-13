import FormEditView from "../view/form-editing.js";
import WaypointView from "../view/waypoint.js";
import {render, renderPosition, replace, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../consts.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class WaypointPresenter {
  constructor(listContainer, changeMode, changeData, offersModel, destinationsModel) {
    this._listComponent = listContainer;
    this._changeMode = changeMode;
    this._changeData = changeData;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;

    this._waypointComponent = null;
    this._formEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleCloseEditClick = this._handleCloseEditClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
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
    this._formEditComponent = new FormEditView(this._offersModel, this._destinationsModel, waypoint);

    this._waypointComponent.setEditClickHandler(this._handleEditClick);
    this._formEditComponent.setEditCloseClickHandler(this._handleCloseEditClick);
    this._formEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._formEditComponent.setDeleteClickHandler(this._handleDeleteClick);
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
      this._formEditComponent.reset(this._waypoint);
      this._replaceFormToWaypoint();
    }
  }

  _handleEditClick() {
    this._replaceWaypointToForm();
    this._formEditComponent.reset(this._waypoint);
  }

  _handleCloseEditClick() {
    this._formEditComponent.reset(this._waypoint);
    this._replaceFormToWaypoint();
  }

  _handleFormSubmit(waypoint) {
    this._changeData(UserAction.UPDATE_WAYPOINT, UpdateType.MINOR, waypoint);
    this._replaceFormToWaypoint();
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_WAYPOINT,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._waypoint,
            {
              isFavorite: !this._waypoint.isFavorite
            }
        )
    );
  }

  _handleDeleteClick(waypoint) {
    this._changeData(
        UserAction.DELETE_WAYPOINT,
        UpdateType.MINOR,
        waypoint
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
