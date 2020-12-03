import Abstract from "./abstract.js";

const createTravelCostTemplate = (items) => {

  const travelCost = items.reduce((acc, item) => acc + item.price, 0);

  return `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${travelCost}</span>
</p>`;
};

export default class TravelCostView extends Abstract {
  constructor(waypoint) {
    super();
    this._waypoint = waypoint;
  }

  getTemplate() {
    return createTravelCostTemplate(this._waypoint);
  }
}

