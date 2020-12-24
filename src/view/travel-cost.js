import Abstract from "./abstract.js";

const getOffersCost = (offer, waypoint) => {
  let waypointIds = [];
  let sum = 0;
  waypoint.map((way) => way.offersIds.forEach((off) => {
    waypointIds.push(off);
  }));

  Object.values(offer).forEach((off) => {
    off.forEach((of) => {
      waypointIds.forEach((item) => {
        if (of.id === item) {
          sum += of.price;
        }
      });
    });
  });
  return sum;
};

const getTravelCost = (points, offers) => {
  const basePriceCosts = points.reduce((acc, point) => acc + Number(point.price), 0);
  const offersCost = getOffersCost(offers, points);
  return basePriceCosts + offersCost;
};

const createTravelCostTemplate = (waypoints, offers) => {

  const travelCost = getTravelCost(waypoints, offers);

  return `<p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${travelCost}</span>
          </p>`;
};

export default class TravelCostView extends Abstract {
  constructor(waypoints, globalOffers) {
    super();
    this._waypoints = waypoints;
    this._offers = globalOffers.getOffers();
  }

  getTemplate() {
    return createTravelCostTemplate(this._waypoints, this._offers);
  }
}

