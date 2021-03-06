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

const DateFormat = {
  EVENT_DATE: `D MMM`,
  FLATPICKR: `d/m/y H:i`,
  ROUT_INFO: `DD MMM`,
  EDIT: `DD/MM/YY HH:mm`
};

const ButtonKey = {
  ESCAPE: `Escape`,
  ESC: `Esc`
};

const AUTHORIZATION = `Basic kD3cu7weGaso2fk86`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;

const SHAKE_ANIMATION_TIMEOUT = 600;

const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v13`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

export {
  waypointTypes,
  Minutes,
  SortType,
  UserAction,
  UpdateType,
  FilterType,
  MenuItem,
  TimeInMs,
  ChartConfigs,
  AUTHORIZATION,
  END_POINT,
  SHAKE_ANIMATION_TIMEOUT,
  STORE_NAME,
  DateFormat,
  ButtonKey
};
