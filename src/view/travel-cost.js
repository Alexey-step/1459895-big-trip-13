import {createElement} from "./../util.js";

const createTravelCostTemplate = (items) => {

  const travelCost = items.reduce((acc, item) => acc + item.price, 0);

  return `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${travelCost}</span>
</p>`;
};

export default class TravelCostView {
  constructor(waypoint) {
    this._waypoint = waypoint;
    this._element = null;
  }

  getTemplate() {
    return createTravelCostTemplate(this._waypoint);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

