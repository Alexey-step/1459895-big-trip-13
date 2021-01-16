import WaypointsModel from "../model/waypoints.js";
import DestinationsModel from "../model/destinations.js";
import OffersModel from "../model/offers.js";

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

const SuccessHTTPStatus = {
  MIN: 200,
  MAX: 299
};

const Url = {
  POINTS: `points`,
  DESTINATIONS: `destinations`,
  OFFERS: `offers`
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getData() {
    return Promise.all([
      this.getWaypoints(),
      this.getOffers(),
      this.getDestinations()
    ])
    .then((response) => {
      const [waypoints, offers, destinations] = response;
      return {
        waypoints,
        offers,
        destinations
      };
    });
  }

  getWaypoints() {
    return this._load({url: Url.POINTS})
    .then(Api.toJSON)
    .then((points) => points.map(WaypointsModel.adaptToClient));
  }

  getOffers() {
    return this._load({url: Url.OFFERS})
    .then(Api.toJSON)
    .then(OffersModel.adaptToClient);
  }

  getDestinations() {
    return this._load({url: Url.DESTINATIONS})
    .then(Api.toJSON)
    .then(DestinationsModel.adaptToClient);
  }

  updateWaypoint(waypoint) {
    return this._load({
      url: `${Url.POINTS}/${waypoint.id}`,
      method: Method.PUT,
      body: JSON.stringify(WaypointsModel.adaptToServer(waypoint)),
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then(Api.toJSON)
    .then(WaypointsModel.adaptToClient);
  }

  addWaypoint(waypoint) {
    return this._load({
      url: Url.POINTS,
      method: Method.POST,
      body: JSON.stringify(WaypointsModel.adaptToServer(waypoint)),
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then(Api.toJSON)
    .then(WaypointsModel.adaptToClient);
  }

  deleteWaypoint(waypoint) {
    return this._load({
      url: `${Url.POINTS}/${waypoint.id}`,
      method: Method.DELETE
    });
  }

  sync(data) {
    return this._load({
      url: `${Url.POINTS}/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then(Api.toJSON);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers}
    )
    .then(Api.checkStatus)
    .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatus.MIN ||
      response.status > SuccessHTTPStatus.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
