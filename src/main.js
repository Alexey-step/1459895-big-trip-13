import {createRouteInfoTemplate} from "./view/route-info.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createTravelCostTemplate} from "./view/travel-cost.js";
import {createMenuTemplate} from "./view/menu.js";
import {createSortTemplate} from "./view/sort.js";
import {createListTemplate} from "./view/list.js";
import {createFormEditingTemplate} from "./view/form-editing.js";
import {createWaypointTemplate} from "./view/waypoint.js";
import {generateWaypoint} from "./mock/trip-waypoint.js";

const WAYPOINT_COUNT = 15;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const waypoints = new Array(WAYPOINT_COUNT).fill().map(generateWaypoint).sort((a, b) => a.date - b.date);

const pageHeaderElement = document.querySelector(`.page-header`);
const tripMainControlsElement = pageHeaderElement.querySelector(`.trip-main__trip-controls`);
const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);
const pageMainElement = document.querySelector(`.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

render(tripMainControlsElement, createMenuTemplate(), `beforeend`);
render(tripMainControlsElement, createFiltersTemplate(), `beforeend`);

render(tripEventsElement, createSortTemplate(), `beforeend`);
render(tripEventsElement, createListTemplate(), `beforeend`);

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);
render(tripEventsListElement, createFormEditingTemplate(waypoints[0]), `beforeend`);
for (let i = 0; i < WAYPOINT_COUNT; i++) {
  render(tripEventsListElement, createWaypointTemplate(waypoints[i]), `beforeend`);
}
render(tripMainElement, createRouteInfoTemplate(waypoints), `afterbegin`);

const tripInfoElement = tripMainElement.querySelector(`.trip-info`);

render(tripInfoElement, createTravelCostTemplate(waypoints), `beforeend`);
