import Observer from "../utils/observer.js";

export default class Destinations extends Observer {
  constructor() {
    super();
    this._destinations = {};
  }

  setDestinations(updateType, destinations) {
    this._destinations = destinations;

    this._notify(updateType);
  }

  getDestinations() {
    return this._destinations;
  }

  static adaptToClient(destinations) {
    const adaptedDestination = destinations.reduce((acc, item) => {
      acc[item.name] = item;
      return acc;
    }, {});

    return adaptedDestination;
  }

  static adaptToServer(destinations) {
    const adaptedDestination = Object.values(destinations).map((item) => item);

    return adaptedDestination;
  }
}
