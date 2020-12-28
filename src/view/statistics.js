import Smart from "./smart.js";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {makeUniqWaypointTypes, getTypesCost, getTypesCount, getTimeSpend} from "../utils/common.js";
import {ChartConfigs} from "./../consts.js";

const renderMoneyChart = (moneyCtx, waypoints) => {
  const uniqWaypointsType = makeUniqWaypointTypes(waypoints);
  const allTypesCost = getTypesCost(uniqWaypointsType, waypoints);
  moneyCtx.height = ChartConfigs.BAR_HEIGHT * uniqWaypointsType.length;

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: ChartConfigs.TYPE,
    data: {
      labels: uniqWaypointsType,
      datasets: [{
        data: allTypesCost,
        backgroundColor: ChartConfigs.BACKGROUND_COLOR,
        hoverBackgroundColor: ChartConfigs.BACKGROUND_COLOR,
        anchor: `start`,
        barThickness: ChartConfigs.BAR_THICKNESS,
        minBarLength: ChartConfigs.MIN_BAR_LENGTH
      }]
    },
    options: {
      layout: {
        padding: {
          left: ChartConfigs.PADDING_LEFT
        }
      },
      plugins: {
        datalabels: {
          font: {
            size: ChartConfigs.FONT_SIZE
          },
          color: ChartConfigs.COLOR,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: ChartConfigs.MONEY_CHART_TITLE,
        fontColor: ChartConfigs.COLOR,
        fontSize: ChartConfigs.TITLE_FONT_SIZE,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: ChartConfigs.COLOR,
            padding: ChartConfigs.PADDING,
            fontSize: ChartConfigs.FONT_SIZE,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTypeChart = (typeCtx, waypoints) => {
  const uniqWaypointsType = makeUniqWaypointTypes(waypoints);
  const allTypes = getTypesCount(uniqWaypointsType, waypoints);
  typeCtx.height = ChartConfigs.BAR_HEIGHT * uniqWaypointsType.length;
  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: ChartConfigs.TYPE,
    data: {
      labels: uniqWaypointsType,
      datasets: [{
        data: allTypes,
        backgroundColor: ChartConfigs.BACKGROUND_COLOR,
        hoverBackgroundColor: ChartConfigs.BACKGROUND_COLOR,
        anchor: `start`,
        barThickness: ChartConfigs.BAR_THICKNESS,
        minBarLength: ChartConfigs.MIN_BAR_LENGTH
      }]
    },
    options: {
      layout: {
        padding: {
          left: ChartConfigs.PADDING_LEFT
        }
      },
      plugins: {
        datalabels: {
          font: {
            size: ChartConfigs.FONT_SIZE
          },
          color: ChartConfigs.COLOR,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: ChartConfigs.TRANSPORT_CHART_TITLE,
        fontColor: ChartConfigs.COLOR,
        fontSize: ChartConfigs.TITLE_FONT_SIZE,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: ChartConfigs.COLOR,
            padding: ChartConfigs.PADDING,
            fontSize: ChartConfigs.FONT_SIZE,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeSpendChart = (timeCtx, waypoints) => {
  const uniqWaypointsType = makeUniqWaypointTypes(waypoints);
  const allTypesTime = getTimeSpend(uniqWaypointsType, waypoints);
  timeCtx.height = ChartConfigs.BAR_HEIGHT * uniqWaypointsType.length;
  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: ChartConfigs.TYPE,
    data: {
      labels: uniqWaypointsType,
      datasets: [{
        data: allTypesTime,
        backgroundColor: ChartConfigs.BACKGROUND_COLOR,
        hoverBackgroundColor: ChartConfigs.BACKGROUND_COLOR,
        anchor: `start`,
        barThickness: ChartConfigs.BAR_THICKNESS,
        minBarLength: ChartConfigs.MIN_BAR_LENGTH
      }]
    },
    options: {
      layout: {
        padding: {
          left: ChartConfigs.PADDING_LEFT
        }
      },
      plugins: {
        datalabels: {
          font: {
            size: ChartConfigs.FONT_SIZE
          },
          color: ChartConfigs.COLOR,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}D`
        }
      },
      title: {
        display: true,
        text: ChartConfigs.TIME_SPEND_CHART_TITLE,
        fontColor: ChartConfigs.COLOR,
        fontSize: ChartConfigs.TITLE_FONT_SIZE,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: ChartConfigs.COLOR,
            padding: ChartConfigs.PADDING,
            fontSize: ChartConfigs.FONT_SIZE,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

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

export default class StatisticsView extends Smart {
  constructor(waypoints) {
    super();

    this._waypoints = waypoints;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpendChart = null;
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  show() {
    super.show();
    this._setCharts();
  }

  hide() {
    super.hide();
    this.removeElement();
  }

  removeElement() {
    super.removeElement();

    if (this._moneyChart !== null || this._transportChart !== null || this._timeSpendChart !== null) {
      this._moneyChart = null;
      this._transportChart = null;
      this._timeSpendChart = null;
    }
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

    this._moneyChart = renderMoneyChart(moneyCtx, this._waypoints);
    this._transportChart = renderTypeChart(typeCtx, this._waypoints);
    this._timeSpendChart = renderTimeSpendChart(timeCtx, this._waypoints);
  }
}
