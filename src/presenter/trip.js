import RouteInfoView from "./../view/route-info.js";
import TravelCostView from "./../view/travel-cost.js";
import SortView from "./../view/sort.js";
import ListView from "./../view/list.js";
import NoWaypointsView from "./../view/nowaypoints.js";
import PointPresenter from "./point.js";
import {render, renderPosition} from "./../utils/render.js";
import {updateItem, sortWaypointsByTime} from "./../../src/utils/common.js";
import {SortType} from "./../consts.js";

export default class TripPresenter {
  constructor(tripmainContainer, tripEventsContainer) {
    this._tripmainContainer = tripmainContainer;
    this._tripEventsContainer = tripEventsContainer;
    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;

    this._listComponent = new ListView();
    this._sortComponent = new SortView();
    this._noWaypointsComponent = new NoWaypointsView();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleWaypointChange = this._handleWaypointChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(waypoints) {
    this._waypoints = waypoints.slice();
    this._sourcedWaypoints = waypoints.slice();

    this._renderTrip();
  }

  _renderList() {
    render(this._tripEventsContainer, this._listComponent, renderPosition.BEFOREEND);
  }

  _renderTrip() {
    if (this._waypoints.length < 1) {
      this._renderNoWaypoints();
    } else {
      this._renderSort();
      this._renderList();
      this._renderWaypoints();
      this._renderRouteInfo(this._waypoints);
    }
  }

  _renderWaypoints() {
    this._waypoints.forEach((waypoint) => {
      this._renderWaypoint(waypoint);
    });
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleWaypointChange(updatedWaypoint) {
    this._waypoints = updateItem(this._waypoints, updatedWaypoint);
    this._pointPresenter[updatedWaypoint.id].init(updatedWaypoint);
  }

  _renderWaypoint(waypoint) {
    const pointPresenter = new PointPresenter(this._listComponent, this._handleModeChange, this._handleWaypointChange);
    pointPresenter.init(waypoint);
    this._pointPresenter[waypoint.id] = pointPresenter;
  }

  _renderSort() {
    render(this._tripEventsContainer, this._sortComponent, renderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _sortWaypoints(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this._waypoints.sort((a, b) => b.price - a.price);
        break;
      case SortType.TIME:
        this._waypoints.sort(sortWaypointsByTime);
        break;
      default:
        this._waypoints = this._sourcedWaypoints.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortWaypoints(sortType);
    this._clearWaypointsList();
    this._renderWaypoints();
  }

  _clearWaypointsList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _renderRouteInfo(waypoints) {
    const routeInfoComponent = new RouteInfoView(waypoints);
    const travelCostComponent = new TravelCostView(waypoints);
    render(this._tripmainContainer, routeInfoComponent, renderPosition.AFTERBEGIN);
    render(routeInfoComponent, travelCostComponent, renderPosition.BEFOREEND);
  }

  _renderNoWaypoints() {
    render(this._tripEventsContainer, this._noWaypointsComponent, renderPosition.BEFOREEND);
  }
}
