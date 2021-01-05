import Observer from "../utils/observer.js";
import dayjs from "dayjs";

export default class WaypointsModel extends Observer {
  constructor() {
    super();
    this._waypoints = [];
  }

  getWaypoints() {
    return this._waypoints;
  }

  setWaypoints(updateType, waypoints) {
    this._waypoints = waypoints.slice();

    this._notify(updateType);
  }

  updateWaypoint(updateType, update) {
    const index = this._waypoints.findIndex((waypoint) => waypoint.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting waypoint`);
    }

    this._waypoints = [
      ...this._waypoints.slice(0, index),
      update,
      ...this._waypoints.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addWaypoint(updateType, update) {
    this._waypoints = [
      update,
      ...this._waypoints
    ];

    this._notify(updateType, update);
  }

  deleteWaypoint(updateType, update) {
    const index = this._waypoints.findIndex((waypoint) => waypoint.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting task`);
    }

    this._waypoints = [
      ...this._waypoints.slice(0, index),
      ...this._waypoints.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(waypoint) {
    const adaptedWaypoint = Object.assign(
        {},
        waypoint,
        {
          price: waypoint.base_price,
          dateStart: dayjs(waypoint.date_from),
          dateEnd: dayjs(waypoint.date_to),
          isFavorite: waypoint.is_favorite,
        }
    );

    delete adaptedWaypoint.base_price;
    delete adaptedWaypoint.date_from;
    delete adaptedWaypoint.date_to;
    delete adaptedWaypoint.is_favorite;

    return adaptedWaypoint;
  }

  static adaptToServer(waypoint) {
    const adaptedWaypoint = Object.assign(
        {},
        waypoint,
        {
          "base_price": Number(waypoint.price),
          "date_from": waypoint.dateStart,
          "date_to": waypoint.dateEnd,
          "is_favorite": waypoint.isFavorite
        }
    );

    delete adaptedWaypoint.price;
    delete adaptedWaypoint.dateStart;
    delete adaptedWaypoint.dateEnd;
    delete adaptedWaypoint.isFavorite;

    return adaptedWaypoint;
  }
}
