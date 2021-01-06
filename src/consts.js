const waypointTypes = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
  `check-in`,
  `sightseeing`,
  `restaurant`
];

const TimeHours = {
  MIN: 0,
  MAX: 24
};

const TimeMinutes = {
  MIN: 0,
  MAX: 60
};

const Minutes = {
  IN_DAY: 1440,
  IN_HOUR: 60
};

const TimeInMs = {
  DAY: 86400000,
};

const SortType = {
  DAY: `sort-day`,
  TIME: `sort-time`,
  PRICE: `sort-price`,
};

const UserAction = {
  UPDATE_WAYPOINT: `UPDATE_WAYPOINT`,
  ADD_WAYPOINT: `ADD_WAYPOINT`,
  DELETE_WAYPOINT: `DELETE_WAYPOINT`
};

const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

const MenuItem = {
  TABLE: `Table`,
  STATS: `Stats`
};

const ChartConfigs = {
  TYPE: `horizontalBar`,
  BACKGROUND_COLOR: `#ffffff`,
  BAR_HEIGHT: 55,
  FONT_SIZE: 13,
  TITLE_FONT_SIZE: 23,
  MONEY_CHART_TITLE: `MONEY`,
  TRANSPORT_CHART_TITLE: `TYPE`,
  TIME_SPEND_CHART_TITLE: `TIME-SPEND`,
  COLOR: `#000000`,
  BAR_THICKNESS: 44,
  PADDING: 5,
  MIN_BAR_LENGTH: 50,
  PADDING_LEFT: 35
};

const AUTHORIZATION = `Basic kD3cu7weGaso2fk9z`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;

export {
  waypointTypes,
  TimeHours,
  TimeMinutes,
  Minutes,
  SortType,
  UserAction,
  UpdateType,
  FilterType,
  MenuItem,
  TimeInMs,
  ChartConfigs,
  AUTHORIZATION,
  END_POINT
};
