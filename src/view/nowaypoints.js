import Abstract from "./abstract.js";

const createNoWaypointsTemplate = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

export default class NoWaypointsView extends Abstract {

  getTemplate() {
    return createNoWaypointsTemplate();
  }
}
