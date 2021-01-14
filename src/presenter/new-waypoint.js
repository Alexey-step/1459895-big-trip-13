import FormEditView from "../view/form-editing.js";
import {remove, render, renderPosition} from "../utils/render.js";
import {UserAction, UpdateType} from "../consts.js";

export default class NewWaypointPresenter {
  constructor(renderPlace, changeData, offersModel, destinationsModel) {
    this._listContainer = renderPlace;
    this._changeData = changeData;
    this._disabledCallback = null;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;

    this._waypointEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleCloseEditClick = this._handleCloseEditClick.bind(this);
  }

  init(callback) {
    this._disabledCallback = callback;
    if (this._waypointEditComponent !== null) {
      return;
    }

    this._waypointEditComponent = new FormEditView(this._offersModel, this._destinationsModel);
    this._waypointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._waypointEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._waypointEditComponent.setEditCloseClickHandler(this._handleCloseEditClick);

    render(this._listContainer, this._waypointEditComponent, renderPosition.AFTERBEGIN);
    this._waypointEditComponent.setDatepicker();

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._waypointEditComponent === null) {
      return;
    }

    if (this._disabledCallback !== null) {
      this._disabledCallback();
    }

    remove(this._waypointEditComponent);
    this._waypointEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(waypoint) {
    this._changeData(
        UserAction.ADD_WAYPOINT,
        UpdateType.MINOR,
        waypoint
    );
  }

  _handleCloseEditClick() {
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Esc` || evt.key === `Escape`) {
      evt.preventDefault();
      this.destroy();
    }
  }

  setSaving() {
    this._waypointEditComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._waypointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._waypointEditComponent.shake(resetFormState);
  }

}
