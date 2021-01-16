import Smart from "./smart.js";

const createEventsBoardTemplate = () => {
  return `<section class="trip-events">
            <h2 class="visually-hidden">Trip events</h2>
          </section>`;
};

export default class TripEventsBoard extends Smart {

  getTemplate() {
    return createEventsBoardTemplate();
  }
}
