import Abstract from "./abstract.js";

const getOffersCost = (offers, waypoint) => {
  let waypointIds = [];
  let sum = 0;
  waypoint.map((way) => way.offersIds.forEach((offerId) => {
    waypointIds.push(offerId);
  }));

  Object.values(offers).forEach((offer) => {
    offer.forEach((elem) => {
      waypointIds.forEach((item) => {
        if (elem.id === item) {
          sum += elem.price;
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
  constructor(waypoints, offersModel) {
    super();
    this._waypoints = waypoints;
    this._offers = offersModel.getOffers();
  }

  getTemplate() {
    return createTravelCostTemplate(this._waypoints, this._offers);
  }
}

