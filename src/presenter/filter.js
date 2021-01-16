import FilterView from "../view/filters.js";
import {UpdateType} from "../consts.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";

export default class Filter {
  constructor(filterContainer, filterModel, waypointsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._currentFilter = null;
    this._waypointsModel = waypointsModel;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filterModel.addObserver(this._handleModelEvent);
    this._waypointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();
    const waypoints = this._waypointsModel.getWaypoints();

    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(waypoints, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }
    this._currentFilter = filterType;

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}
