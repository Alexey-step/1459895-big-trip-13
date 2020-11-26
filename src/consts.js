const OFFER_KEYS = [
  `Flight`,
  `Taxi`,
  `Drive`,
  `Sightseeing`,
  `Checkin`
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
  `Book tockets`,
  `Lunch in city`
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
  photosCount
};
