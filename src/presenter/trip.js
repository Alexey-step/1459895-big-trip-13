import RouteInfoView from "../view/route-info.js";
import TravelCostView from "../view/travel-cost.js";
import SortView from "../view/sort.js";
import ListView from "../view/list.js";
import NoWaypointsView from "../view/nowaypoints.js";
import WaypointPresenter from "./waypoint.js";
import NewWaypointPresenter from "./new-waypoint.js";
import {render, renderPosition, remove} from "../utils/render.js";
import {sortWaypointsByTime, filter} from "../../src/utils/common.js";
import {SortType, UpdateType, UserAction, FilterType} from "../consts.js";

export default class TripPresenter {
  constructor(tripMainContainer, tripEventsContainer, waypointsModel, filterModel, offersModel, destinationsModel) {
    this._tripMainContainer = tripMainContainer;
    this._tripEventsContainer = tripEventsContainer;
    this._waypointPresenter = {};
    this._currentSortType = SortType.DAY;
    this._waypointsModel = waypointsModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;

    this._sortComponent = null;
    this._listComponent = new ListView();
    this._noWaypointsComponent = new NoWaypointsView();
    this._routeInfoComponent = new RouteInfoView(waypointsModel.getWaypoints());
    this._travelCostComponent = new TravelCostView(waypointsModel.getWaypoints(), this._offersModel);

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);


    this._waypointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._newWaypointPresenter = new NewWaypointPresenter(this._listComponent, this._handleViewAction, this._offersModel, this._destinationsModel);
  }

  init() {

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

  createWaypoint() {
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._newWaypointPresenter.init();
  }

  _getWaypoints() {
    const filterType = this._filterModel.getFilter();
    const waypoints = this._waypointsModel.getWaypoints();
    const filtredWaypoints = filter[filterType](waypoints);

    switch (this._currentSortType) {
      case SortType.PRICE:
        return filtredWaypoints.sort((a, b) => b.price - a.price);
      case SortType.TIME:
        return filtredWaypoints.sort(sortWaypointsByTime);
      case SortType.DAY:
        return filtredWaypoints.sort((a, b) => a.date - b.date);
    }
    return filtredWaypoints;
  }

  _renderList() {
    render(this._tripEventsContainer, this._listComponent, renderPosition.BEFOREEND);
  }

  _renderTrip() {
    if (this._getWaypoints().length < 1) {
      this._renderNoWaypoints();
    } else {
      this._renderSort();
      this._renderList();
      this._renderWaypoints(this._getWaypoints());
      this._routeInfoComponent = new RouteInfoView(this._getWaypoints());
      this._travelCostComponent = new TravelCostView(this._getWaypoints(), this._offersModel);
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
        this._waypointsModel.updateWaypoint(updateType, update);
        break;
      case UserAction.ADD_WAYPOINT:
        this._waypointsModel.addWaypoint(updateType, update);
        break;
      case UserAction.DELETE_WAYPOINT:
        this._waypointsModel.deleteWaypoint(updateType, update);
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
    }
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
