import MenuView from "./view/menu.js";
import {generateWaypoint} from "./mock/trip-waypoint.js";
import {render, renderPosition} from "./utils/render.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";

const WAYPOINT_COUNT = 15;

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const waypoints = new Array(WAYPOINT_COUNT).fill().map(generateWaypoint).sort((a, b) => a.date - b.date);

pointsModel.setWaypoints(waypoints);

const pageHeaderElement = document.querySelector(`.page-header`);
const tripMainControlsElement = pageHeaderElement.querySelector(`.trip-main__trip-controls`);
const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripMainControlsElement, new MenuView(), renderPosition.BEFOREEND);

const filterPresenter = new FilterPresenter(tripMainControlsElement, filterModel);

const tripPresenter = new TripPresenter(tripMainElement, tripEventsElement, pointsModel, filterModel);

filterPresenter.init();
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createWaypoint();
  document.querySelector(`.trip-main__event-add-btn`).disabled = true;
});
