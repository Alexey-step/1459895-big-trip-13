import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {makeUniqWaypointTypes, getTypesCost, getTypesCount, getTimeSpend} from "./common.js";
import {ChartConfigs} from "../consts.js";

export const StatsType = {
  MONEY: `MONEY`,
  TYPE: `TYPE`,
  TIME_SPEND: `TIME_SPEND`
};

const getData = (type, waypoints) => {
  const data = {};
  const uniqWaypointsType = makeUniqWaypointTypes(waypoints);

  const DataType = {
    [StatsType.MONEY]: getTypesCost(uniqWaypointsType, waypoints),
    [StatsType.TYPE]: getTypesCount(uniqWaypointsType, waypoints),
    [StatsType.TIME_SPEND]: getTimeSpend(uniqWaypointsType, waypoints)
  };

  const DataValue = {
    [StatsType.MONEY]: (val) => `€ ${val}`,
    [StatsType.TYPE]: (val) => `${val}x`,
    [StatsType.TIME_SPEND]: (val) => `${val}D`
  };

  data.lables = uniqWaypointsType;
  data.type = DataType[type];
  data.formatter = DataValue[type];

  return data;
};

export const renderChart = (container, type, waypoints) => {
  const data = getData(type, waypoints);

  container.height = ChartConfigs.BAR_HEIGHT * data.lables.length;
  return new Chart(container, {
    plugins: [ChartDataLabels],
    type: ChartConfigs.TYPE,
    data: {
      labels: data.lables,
      datasets: [{
        data: data.type,
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
          formatter: data.formatter
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
