import MenuView from "./view/menu.js";
import {generateWaypoint} from "./mock/trip-waypoint.js";
import {render, renderPosition} from "./utils/render.js";
import {getRandomOffers} from "./utils/common.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import OffersModel from "./model/offers.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import {waypointTypes} from "./consts.js";
import {MenuItem} from "./consts.js";
import StatisticsView from "./view/statistics.js";
import TripEventsBoardView from "./view/trip-events-board.js";

const WAYPOINT_COUNT = 15;

const offers = waypointTypes.reduce((acc, item) => {
  acc[item] = getRandomOffers();
  return acc;
}, []);

const pageHeaderElement = document.querySelector(`.page-header`);
const pageBodyContainer = document.querySelector(`main .page-body__container`);
const tripMainControlsElement = pageHeaderElement.querySelector(`.trip-main__trip-controls`);
const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);

const offersModel = new OffersModel();
offersModel.setOffers(offers);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const tripEventsBoardComponent = new TripEventsBoardView();

const waypoints = new Array(WAYPOINT_COUNT).fill().map(() => generateWaypoint(offers)).sort((a, b) => a.date - b.date);

pointsModel.setWaypoints(waypoints);

const siteMenuComponent = new MenuView();
const statisticsView = new StatisticsView(pointsModel.getWaypoints());

render(pageBodyContainer, tripEventsBoardComponent, renderPosition.BEFOREEND);
render(tripMainControlsElement, siteMenuComponent, renderPosition.BEFOREEND);
render(pageBodyContainer, statisticsView, renderPosition.BEFOREEND);

const filterPresenter = new FilterPresenter(tripMainControlsElement, filterModel, pointsModel);

const tripPresenter = new TripPresenter(tripMainElement, tripEventsBoardComponent, pointsModel, filterModel, offersModel);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      siteMenuComponent.setMenuItem(menuItem);
      tripPresenter.show();
      statisticsView.hide();
      break;
    case MenuItem.STATS:
      siteMenuComponent.setMenuItem(menuItem);
      tripPresenter.hide();
      statisticsView.show();
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createWaypoint();
  document.querySelector(`.trip-main__event-add-btn`).disabled = true;
});
