const OFFER_KEYS = [
  `Flight`,
  `Taxi`,
  `Drive`,
  `Sightseeing`,
  `Check-in`
];

const offersCount = {
  MIN: 1,
  MAX: 5
};

const offerTitle = [
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

const offerPrice = {
  MIN: 20,
  MAX: 100
};

const WAYPOINT_TYPE = [
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

const DESTINATION = [
  `Amsterdam`,
  `Chamonix`,
  `Geneva`,
];

const DESCRIPTION_MAX_LENGTH = 5;

const PRICE = {
  MAX: 1000,
  MIN: 100
};

const timeHours = {
  MIN: 0,
  MAX: 24
};

const timeMinutes = {
  MIN: 0,
  MAX: 60
};

const DESCRIPTION = [
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

const photosCount = {
  MIN: 1,
  MAX: 5
};

const minutes = {
  IN_DAY: 1440,
  IN_HOUR: 60
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

export {
  OFFER_KEYS,
  offersCount,
  offerTitle,
  offerPrice,
  WAYPOINT_TYPE,
  DESTINATION,
  PRICE,
  DESCRIPTION_MAX_LENGTH,
  timeHours,
  timeMinutes,
  DESCRIPTION,
  photosCount,
  minutes,
  SortType,
  UserAction,
  UpdateType,
  FilterType
};
