import RouteInfoView from "../view/route-info.js";
import TravelCostView from "../view/travel-cost.js";
import SortView from "../view/sort.js";
import ListView from "../view/list.js";
import NoWaypointsView from "../view/nowaypoints.js";
import WaypointPresenter, {State as WaypointPresenterViewState} from "./waypoint.js";
import LoadingView from "../view/loading.js";
import NewWaypointPresenter from "./new-waypoint.js";
import {render, renderPosition, remove} from "../utils/render.js";
import {sortWaypointsByTime, filter} from "../utils/common.js";
import {SortType, UpdateType, UserAction, FilterType} from "../consts.js";

export default class TripPresenter {
  constructor(tripMainContainer, tripEventsContainer, waypointsModel, filterModel, offersModel, destinationsModel, api) {
    this._tripMainContainer = tripMainContainer;
    this._tripEventsContainer = tripEventsContainer;
    this._waypointPresenter = {};
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._api = api;
    this._currentSortType = SortType.DAY;
    this._waypointsModel = waypointsModel;
    this._isLoading = true;

    this._sortComponent = null;
    this._listComponent = new ListView();
    this._noWaypointsComponent = new NoWaypointsView();
    this._routeInfoComponent = new RouteInfoView(waypointsModel.getWaypoints());
    this._travelCostComponent = new TravelCostView(waypointsModel.getWaypoints());
    this._loadingComponent = new LoadingView();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);

    this._newWaypointPresenter = new NewWaypointPresenter(this._listComponent, this._handleViewAction, this._offersModel, this._destinationsModel);
  }

  init() {

    this._destinationsModel.addObserver(this._handleModelEvent);
    this._offersModel.addObserver(this._handleModelEvent);
    this._waypointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderTrip();
  }

  hide() {
    this._tripEventsContainer.hide();
    this._setDefault();
  }

  show() {
    this._tripEventsContainer.show();
  }

  _setDefault() {
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  }

  createWaypoint(callback) {
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._newWaypointPresenter.init(callback);
  }

  _getWaypoints() {
    const filterType = this._filterModel.getFilter();
    const waypoints = this._waypointsModel.getWaypoints();
    const filteredWaypoints = filter[filterType](waypoints);

    switch (this._currentSortType) {
      case SortType.PRICE:
        return filteredWaypoints.sort((a, b) => b.price - a.price);
      case SortType.TIME:
        return filteredWaypoints.sort(sortWaypointsByTime);
      case SortType.DAY:
        return filteredWaypoints.sort((a, b) => a.dateStart - b.dateStart);
    }
    return filteredWaypoints;
  }

  _renderList() {
    render(this._tripEventsContainer, this._listComponent, renderPosition.BEFOREEND);
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    const waypoints = this._getWaypoints();

    if (waypoints.length === 0) {
      this._renderList();
      this._renderNoWaypoints();
    } else {
      this._renderSort();
      this._renderList();
      this._renderWaypoints(waypoints);
      this._routeInfoComponent = new RouteInfoView(waypoints);
      this._travelCostComponent = new TravelCostView(waypoints, this._offersModel);
      this._renderRouteInfo();
    }
  }

  _renderWaypoints(waypoints) {
    waypoints.forEach((waypoint) => {
      this._renderWaypoint(waypoint);
    });
  }

  _handleModeChange() {
    this._newWaypointPresenter.destroy();
    Object
      .values(this._waypointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_WAYPOINT:
        this._waypointPresenter[update.id].setViewState(WaypointPresenterViewState.SAVING);
        this._api.updateWaypoint(update)
        .then((response) => {
          this._waypointsModel.updateWaypoint(updateType, response);
        })
        .catch(() => {
          this._waypointPresenter[update.id].setViewState(WaypointPresenterViewState.ABORTING);
        });
        break;
      case UserAction.ADD_WAYPOINT:
        this._newWaypointPresenter.setSaving();
        this._api.addWaypoint(update)
        .then((response) => {
          this._waypointsModel.addWaypoint(updateType, response);
        })
        .catch(() => {
          this._newWaypointPresenter.setAborting();
        });
        break;
      case UserAction.DELETE_WAYPOINT:
        this._waypointPresenter[update.id].setViewState(WaypointPresenterViewState.DELETING);
        this._api.deleteWaypoint(update)
        .then(() => {
          this._waypointsModel.deleteWaypoint(updateType, update);
        })
        .catch(() => {
          this._waypointPresenter[update.id].setViewState(WaypointPresenterViewState.ABORTING);
        });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._waypointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
    }
  }

  _renderLoading() {
    render(this._tripEventsContainer, this._loadingComponent, renderPosition.BEFOREEND);
  }

  _renderWaypoint(waypoint) {
    const pointPresenter = new WaypointPresenter(this._listComponent, this._handleModeChange, this._handleViewAction, this._offersModel, this._destinationsModel);
    pointPresenter.init(waypoint);
    this._waypointPresenter[waypoint.id] = pointPresenter;
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._tripEventsContainer, this._sortComponent, renderPosition.BEFOREEND);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();
  }

  _clearTrip({resetSortType = false} = {}) {
    this._newWaypointPresenter.destroy();
    Object
    .values(this._waypointPresenter)
    .forEach((presenter) => presenter.destroy());
    this._waypointPresenter = {};

    remove(this._sortComponent);
    remove(this._noWaypointsComponent);
    remove(this._listComponent);
    remove(this._loadingComponent);
    remove(this._routeInfoComponent);
    remove(this._travelCostComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderRouteInfo() {
    render(this._tripMainContainer, this._routeInfoComponent, renderPosition.AFTERBEGIN);
    render(this._routeInfoComponent, this._travelCostComponent, renderPosition.BEFOREEND);
  }

  _renderNoWaypoints() {
    render(this._tripEventsContainer, this._noWaypointsComponent, renderPosition.BEFOREEND);
  }
}
