import WaypointsModel from "../model/waypoints.js";
import DestinationsModel from "../model/destinations.js";
import OffersModel from "../model/offers.js";
import {isOnline} from "../utils/common.js";

const getSyncedWaypoints = (items) => {
  return items.filter(({success}) => success)
  .map(({payload}) => payload.waypoint);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getData() {
    if (isOnline()) {
      return this._api.getData()
        .then((response) => {
          const items = createStoreStructure(response.waypoints.map(WaypointsModel.adaptToServer));
          const destinations = DestinationsModel.adaptToServer(response.destinations);
          const offers = OffersModel.adaptToServer(response.offers);

          this._store.setItems(items);
          this._store.setOffers(offers);
          this._store.setDestinations(destinations);

          return response;
        });
    }
    const storeWaypoints = Object.values(this._store.getItems());
    const storeOffers = Object.values(this._store.getOffers());
    const storeDestinations = Object.values(this._store.getDestinations());

    return Promise.resolve(Object.assign(
        {},
        {waypoints: storeWaypoints.map(WaypointsModel.adaptToClient)},
        {offers: OffersModel.adaptToClient(storeOffers)},
        {destinations: DestinationsModel.adaptToClient(storeDestinations)}
    ));
  }

  getWaypoints() {
    if (isOnline()) {
      return this._api.getWaypoints()
        .then((waypoints) => {
          const items = createStoreStructure(waypoints.map(WaypointsModel.adaptToServer));
          this._store.setItems(items);
          return waypoints;
        });
    }

    const storeWaypoints = Object.values(this._store.getItems());

    return Promise.resolve(storeWaypoints.map(WaypointsModel.adaptToClient));
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          const responseOffers = OffersModel.adaptToServer(offers);
          this._store.setItems(responseOffers);
          return offers;
        });
    }

    const storeOffers = Object.values(this._store.getOffers());

    return Promise.resolve(OffersModel.adaptToClient(storeOffers));
  }

  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          const responseDestinations = DestinationsModel.adaptToServer(destinations);
          this._store.setItems(responseDestinations);
          return destinations;
        });
    }

    const storeDestinations = Object.values(this._store.getDestinations());

    return Promise.resolve(DestinationsModel.adaptToClient(storeDestinations));
  }

  updateWaypoint(waypoint) {
    if (isOnline()) {
      return this._api.updateWaypoint(waypoint)
        .then((updatedWaypoint) => {
          this._store.setItem(updatedWaypoint.id, WaypointsModel.adaptToServer(updatedWaypoint));
          return updatedWaypoint;
        });
    }

    this._store.setItem(waypoint.id, WaypointsModel.adaptToServer(Object.assign({}, waypoint)));

    return Promise.resolve(waypoint);
  }

  addWaypoint(waypoint) {
    if (isOnline()) {
      return this._api.addWaypoint(waypoint)
        .then((newWaypoint) => {
          this._store.setItem(newWaypoint.id, WaypointsModel.adaptToServer(newWaypoint));
          return newWaypoint;
        });
    }

    return Promise.reject(new Error(`Add waypoint failed`));
  }

  deleteWaypoint(waypoint) {
    if (isOnline()) {
      return this._api.deleteWaypoint(waypoint)
        .then(() => this._store.removeItem(waypoint.id));
    }

    return Promise.reject(new Error(`Delete waypoint failed`));
  }

  sync() {
    if (isOnline()) {
      const storeWaypoints = Object.values(this._store.getItems());

      return this._api.sync(storeWaypoints)
        .then((response) => {
          const createdWaypoints = getSyncedWaypoints(response.created);
          const updatedWaypoints = getSyncedWaypoints(response.updated);

          const items = createStoreStructure([...createdWaypoints, ...updatedWaypoints]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}
