import Observer from "../utils/observer.js";

export default class Offers extends Observer {
  constructor() {
    super();
    this._offers = [];
  }

  setOffers(updateType, offers) {
    this._offers = offers;

    this._notify(updateType);
  }

  getOffers() {
    return this._offers;
  }

  static adaptToClient(offers) {
    const adaptedOffers = offers.reduce((acc, item) => {
      acc[item.type] = item.offers;
      return acc;
    }, []);

    return adaptedOffers;
  }

  static adaptToServer(offers) {
    const adaptedOffers = Object.keys(offers).map((offer, i) => {
      return {
        type: offer,
        offers: Object.values(offers)[i]
      };
    });

    return adaptedOffers;
  }
}
