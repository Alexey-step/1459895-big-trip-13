import Abstract from "./abstract.js";
import {DateFormat} from "../consts.js";

const getRouteInfo = (items) => {
  let destinationStr = `${items[0].destination.name}`;
  if (items.length > 3) {
    destinationStr += ` &mdash; ... &mdash; ${items[items.length - 1].destination.name}`;
    return destinationStr;
  }
  for (let i = 1; i < items.length; i++) {
    destinationStr += ` &mdash; ${items[i].destination.name}`;
  }
  return destinationStr;
};

const createRouteDateTemplate = (items) => {
  return `<p class="trip-info__dates">${items[0].dateStart.format(DateFormat.ROUT_INFO)}&nbsp;&mdash;&nbsp;${items[items.length - 1].dateEnd.format(DateFormat.ROUT_INFO)}</p>`;
};

const createRouteInfoTemplate = (items) => {

  const routeInfoTemplate = getRouteInfo(items);
  const dateTemplate = createRouteDateTemplate(items);

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${routeInfoTemplate}</h1>
              ${dateTemplate}
            </div>
          </section>`;
};

export default class RouteInfo extends Abstract {
  constructor(waypoints) {
    super();

    this._waypoints = waypoints;
  }

  getTemplate() {
    return this._waypoints.length === 0 ? `` : createRouteInfoTemplate(this._waypoints);
  }
}
