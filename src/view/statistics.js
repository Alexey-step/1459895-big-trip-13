import Smart from "./smart.js";
import {renderChart, StatsType} from "../utils/stats.js";


const createStatisticsTemplate = () => {

  return `<section class="statistics visually-hidden">
            <h2 class="visually-hidden">Trip statistics</h2>

            <div class="statistics__item statistics__item--money">
              <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
            </div>

            <div class="statistics__item statistics__item--transport">
              <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
            </div>

            <div class="statistics__item statistics__item--time-spend">
              <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
            </div>
          </section>`;
};

export default class Statistics extends Smart {
  constructor(waypointsModel) {
    super();

    this._waypoints = waypointsModel.getWaypoints();

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpendChart = null;
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  show() {
    super.show();
    this._setCharts();
  }

  hide() {
    super.hide();
    this._removeElement();
  }

  _setCharts() {

    if (this._moneyChart !== null || this._transportChart !== null || this._timeSpendChart !== null) {
      this._moneyChart = null;
      this._transportChart = null;
      this._timeSpendChart = null;
    }

    const moneyCtx = document.querySelector(`.statistics__chart--money`);
    const typeCtx = document.querySelector(`.statistics__chart--transport`);
    const timeCtx = document.querySelector(`.statistics__chart--time`);

    this._moneyChart = renderChart(moneyCtx, StatsType.MONEY, this._waypoints);
    this._transportChart = renderChart(typeCtx, StatsType.TYPE, this._waypoints);
    this._timeSpendChart = renderChart(timeCtx, StatsType.TIME_SPEND, this._waypoints);
  }

  _removeElement() {
    super.removeElement();

    if (this._moneyChart !== null || this._transportChart !== null || this._timeSpendChart !== null) {
      this._moneyChart = null;
      this._transportChart = null;
      this._timeSpendChart = null;
    }
  }
}
