import Abstract from "./abstract.js";

const getOffersCost = (waypoints) => {
  const waypointsOffersPrice = waypoints.map((waypoint) => waypoint.offers.reduce((acc, offer) => acc + offer.price, 0));
  const offersCost = waypointsOffersPrice.reduce((acc, price) => acc + price, 0);
  return offersCost;
};

const getTravelCost = (waypoints) => {
  const basePriceCosts = waypoints.reduce((acc, waypoint) => acc + Number(waypoint.price), 0);
  const offersCost = getOffersCost(waypoints);
  return basePriceCosts + offersCost;
};

const createTravelCostTemplate = (waypoints) => {

  const travelCost = getTravelCost(waypoints);

  return `<p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${travelCost}</span>
          </p>`;
};

export default class TravelCostView extends Abstract {
  constructor(waypoints) {
    super();
    this._waypoints = waypoints;
  }

  getTemplate() {
    return createTravelCostTemplate(this._waypoints);
  }
}

