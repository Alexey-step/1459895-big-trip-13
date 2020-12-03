import RouteInfoView from "./view/route-info.js";
import FilterView from "./view/filters.js";
import TravelCostView from "./view/travel-cost.js";
import MenuView from "./view/menu.js";
import SortView from "./view/sort.js";
import ListView from "./view/list.js";
import FormEditingView from "./view/form-editing.js";
import WaypointView from "./view/waypoint.js";
import {generateWaypoint} from "./mock/trip-waypoint.js";
import {render, renderPosition, replace} from "./utils/render.js";
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

render(tripMainControlsElement, new MenuView(), renderPosition.BEFOREEND);
render(tripMainControlsElement, new FilterView(), renderPosition.BEFOREEND);

const renderWaypoint = (listElement, waypoint) => {
  const waypointTemplate = new WaypointView(waypoint);
  const formEditTemplate = new FormEditingView(waypoint);

  const replaceWaypointToForm = () => {
    replace(formEditTemplate, waypointTemplate);
  };

  const replaceFormToWaypoint = () => {
    replace(waypointTemplate, formEditTemplate);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToWaypoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  waypointTemplate.setEditClickHandler(() => {
    replaceWaypointToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  formEditTemplate.setFormSubmitHandler(() => {
    replaceFormToWaypoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  formEditTemplate.setEditClickHandler(() => {
    replaceFormToWaypoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(listElement, waypointTemplate, renderPosition.BEFOREEND);
};

if (waypoints.length < 1) {
  render(tripEventsElement, new NoWaypointsView(), renderPosition.BEFOREEND);
} else {
  render(tripEventsElement, new SortView(), renderPosition.BEFOREEND);
  render(tripEventsElement, listTemplate, renderPosition.BEFOREEND);
  for (let i = 0; i < WAYPOINT_COUNT; i++) {
    renderWaypoint(listTemplate, waypoints[i]);
  }
  render(tripMainElement, routeInfo, renderPosition.AFTERBEGIN);
  render(routeInfo, new TravelCostView(waypoints), renderPosition.BEFOREEND);
}
