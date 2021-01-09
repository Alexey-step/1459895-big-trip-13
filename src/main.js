import MenuView from "./view/menu.js";
import {remove, render, renderPosition} from "./utils/render.js";
import WaypointsModel from "./model/waypoints.js";
import FilterModel from "./model/filter.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import {MenuItem, UpdateType, AUTHORIZATION, END_POINT, STORE_NAME} from "./consts.js";
import StatisticsView from "./view/statistics.js";
import TripEventsBoardView from "./view/trip-events-board.js";
import Api from "./api/api.js";
import Provider from "./api/provider.js";
import Store from "./api/store.js";
import {toast} from "./utils/toast/toast.js";
import {isOnline} from "./utils/common.js";

const pageHeaderElement = document.querySelector(`.page-header`);
const pageBodyContainer = document.querySelector(`main .page-body__container`);
const tripMainControlsElement = pageHeaderElement.querySelector(`.trip-main__trip-controls`);
const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);
const newWaypointButton = document.querySelector(`.trip-main__event-add-btn`);


const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const waypointsModel = new WaypointsModel();
const filterModel = new FilterModel();
const tripEventsBoardComponent = new TripEventsBoardView();
const siteMenuComponent = new MenuView();
const filterPresenter = new FilterPresenter(tripMainControlsElement, filterModel, waypointsModel);
const tripPresenter = new TripPresenter(tripMainElement, tripEventsBoardComponent, waypointsModel, filterModel, offersModel, destinationsModel, apiWithProvider);

let statisticsView = null;

render(pageBodyContainer, tripEventsBoardComponent, renderPosition.BEFOREEND);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      siteMenuComponent.setMenuItem(menuItem);
      tripPresenter.show();
      remove(statisticsView);
      statisticsView.hide();
      break;
    case MenuItem.STATS:
      siteMenuComponent.setMenuItem(menuItem);
      statisticsView = new StatisticsView(waypointsModel);
      render(pageBodyContainer, statisticsView, renderPosition.BEFOREEND);
      tripPresenter.hide();
      statisticsView.show();
      break;
  }
};

filterPresenter.init();
tripPresenter.init();

newWaypointButton.disabled = true;

apiWithProvider.getData().then((data) => {
  waypointsModel.setWaypoints(UpdateType.INIT, data.waypoints);
  destinationsModel.setDestinations(UpdateType.MINOR, data.destinations);
  offersModel.setOffers(UpdateType.MINOR, data.offers);
  render(tripMainControlsElement, siteMenuComponent, renderPosition.AFTERBEGIN);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  newWaypointButton.disabled = false;
})
.catch(() => {
  waypointsModel.setWaypoints(UpdateType.INIT, []);
  render(tripMainControlsElement, siteMenuComponent, renderPosition.AFTERBEGIN);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  newWaypointButton.disabled = false;
});

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});

newWaypointButton.addEventListener(`click`, (evt) => {
  if (!isOnline()) {
    toast(`You can't create new Waypoint offline`);
    return;
  }
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
  evt.preventDefault();
  if (statisticsView !== null) {
    remove(statisticsView);
    statisticsView.hide();
    tripPresenter.show();
  }
  tripPresenter.createWaypoint(() => {
    evt.target.disabled = false;
  });
  evt.target.disabled = true;
});
