const OfferCount = {
  MIN: 0,
  MAX: 5
};

const offerTitles = [
  `Add luggage`,
  `Switch to comfort`,
  `Order Uber`,
  `Rent a Car`,
  `Add breakfast`,
  `Book tickets`,
  `Lunch in city`,
  `Uber, buisness`,
  `Uber, comfort`,
  `Car with driver`,
  `Buy map`
];

const OfferPrice = {
  MIN: 20,
  MAX: 100
};

const waypointTypes = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`
];

const destinations = [
  `Amsterdam`,
  `Chamonix`,
  `Geneva`,
];

const DESCRIPTIONS_MAX_LENGTH = 5;

const PRICE = {
  MAX: 1000,
  MIN: 100
};

const TimeHours = {
  MIN: 0,
  MAX: 24
};

const TimeMinutes = {
  MIN: 0,
  MAX: 60
};

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const PhotosCount = {
  MIN: 1,
  MAX: 5
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
  MAJOR: `MAJOR`
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

export {
  OfferCount,
  offerTitles,
  OfferPrice,
  waypointTypes,
  destinations,
  PRICE,
  DESCRIPTIONS_MAX_LENGTH,
  TimeHours,
  TimeMinutes,
  descriptions,
  PhotosCount,
  Minutes,
  SortType,
  UserAction,
  UpdateType,
  FilterType,
  MenuItem,
  TimeInMs,
  ChartConfigs
};
