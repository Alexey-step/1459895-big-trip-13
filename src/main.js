import FilterView from "./view/filters.js";
import MenuView from "./view/menu.js";
import {generateWaypoint} from "./mock/trip-waypoint.js";
import {render, renderPosition} from "./utils/render.js";
import TripPresenter from "./presenter/trip.js";

const WAYPOINT_COUNT = 15;

const waypoints = new Array(WAYPOINT_COUNT).fill().map(generateWaypoint).sort((a, b) => a.date - b.date);

const pageHeaderElement = document.querySelector(`.page-header`);
const tripMainControlsElement = pageHeaderElement.querySelector(`.trip-main__trip-controls`);
const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripMainControlsElement, new MenuView(), renderPosition.BEFOREEND);
render(tripMainControlsElement, new FilterView(), renderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripMainElement, tripEventsElement);

tripPresenter.init(waypoints);
