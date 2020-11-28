import RouteInfoView from "./view/route-info.js";
import FilterView from "./view/filters.js";
import TravelCostView from "./view/travel-cost.js";
import MenuView from "./view/menu.js";
import SortView from "./view/sort.js";
import ListView from "./view/list.js";
import FormEditingView from "./view/form-editing.js";
import WaypointView from "./view/waypoint.js";
import {generateWaypoint} from "./mock/trip-waypoint.js";
import {render, renderPosition} from "./util.js";
import NoWaypointsView from "./view/nowaypoints.js";

const WAYPOINT_COUNT = 15;

const waypoints = new Array(WAYPOINT_COUNT).fill().map(generateWaypoint).sort((a, b) => a.date - b.date);

const pageHeaderElement = document.querySelector(`.page-header`);
const tripMainControlsElement = pageHeaderElement.querySelector(`.trip-main__trip-controls`);
const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);
const pageMainElement = document.querySelector(`.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);
const listTemplate = new ListView();
const routeInfo = new RouteInfoView(waypoints);

render(tripMainControlsElement, new MenuView().getElement(), renderPosition.BEFOREEND);
render(tripMainControlsElement, new FilterView().getElement(), renderPosition.BEFOREEND);

const renderWaypoint = (listElement, waypoint) => {
  const waypointTemplate = new WaypointView(waypoint);
  const formEditTemplate = new FormEditingView(waypoint);

  const replaceWaypointToForm = () => {
    listElement.replaceChild(formEditTemplate.getElement(), waypointTemplate.getElement());
  };

  const replaceFormToWaypoint = () => {
    listElement.replaceChild(waypointTemplate.getElement(), formEditTemplate.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToWaypoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  waypointTemplate.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceWaypointToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  formEditTemplate.getElement().querySelector(`.event__save-btn`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToWaypoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  formEditTemplate.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceFormToWaypoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(listElement, waypointTemplate.getElement(), renderPosition.BEFOREEND);
};

if (waypoints.length < 1) {
  render(tripEventsElement, new NoWaypointsView().getElement(), renderPosition.BEFOREEND);
} else {
  render(tripEventsElement, new SortView().getElement(), renderPosition.BEFOREEND);
  render(tripEventsElement, listTemplate.getElement(), renderPosition.BEFOREEND);
  for (let i = 0; i < WAYPOINT_COUNT; i++) {
    renderWaypoint(listTemplate.getElement(), waypoints[i]);
  }
  render(tripMainElement, routeInfo.getElement(), renderPosition.AFTERBEGIN);
  render(routeInfo.getElement(), new TravelCostView(waypoints).getElement(), renderPosition.BEFOREEND);
}
