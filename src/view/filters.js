import Abstract from "./abstract.js";
import {FilterType} from "../consts.js";
import dayjs from "dayjs";


const getPastWaypoints = (items) => {
  return items.some((item) => item.dateStart < dayjs()) ? `` : `disabled`;
};

const getFutureWaypoints = (items) => {
  return items.some((item) => item.dateStart > dayjs()) ? `` : `disabled`;
};

const createFiltersTemplate = (waypoints, currentFilterType) => {

  const isPastDisabled = getPastWaypoints(waypoints);
  const isFutureDisabled = getFutureWaypoints(waypoints);

  return `<form class="trip-filters" action="#" method="get">
            <div class="trip-filters__filter">
              <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${currentFilterType === FilterType.EVERYTHING ? `checked` : ``}>
              <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
            </div>

            <div class="trip-filters__filter">
              <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${currentFilterType === FilterType.FUTURE ? `checked` : ``} ${isFutureDisabled}>
              <label class="trip-filters__filter-label" for="filter-future">Future</label>
            </div>

            <div class="trip-filters__filter">
              <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${currentFilterType === FilterType.PAST ? `checked` : ``} ${isPastDisabled}>
              <label class="trip-filters__filter-label" for="filter-past">Past</label>
            </div>

            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
};

export default class Filter extends Abstract {
  constructor(waypoints, currentFilterType) {
    super();

    this._currentFilter = currentFilterType;
    this._waypoints = waypoints;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate(this._waypoints, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}
