import {OfferCount, offerTitles, OfferPrice, Minutes, DESCRIPTIONS_MAX_LENGTH, PhotosCount, FilterType, TimeInMs, descriptions, destinations} from "./../consts.js";
import dayjs from "dayjs";
import {nanoid} from "./nanoid.js";

export const getTimeInfo = (dateEnd, dateStart) => {
  let timeStr = ``;
  let day;
  let hour;
  let minute = dateEnd.diff(dateStart, `m`);
  if (minute > Minutes.IN_DAY) {
    day = Math.floor(minute / Minutes.IN_DAY);
    hour = Math.floor((minute - day * Minutes.IN_DAY) / Minutes.IN_HOUR);
    minute = ((minute - day * Minutes.IN_DAY) - hour * Minutes.IN_HOUR);
    timeStr = `${day}D ${hour}H ${minute}M`;
  } else if (minute >= Minutes.IN_HOUR && minute < Minutes.IN_DAY) {
    hour = Math.floor(minute / Minutes.IN_HOUR);
    minute = minute - hour * Minutes.IN_HOUR;
    timeStr = `${hour}H ${minute}M`;
  } else if (minute > 0 && minute < Minutes.IN_HOUR) {
    minute = minute;
    timeStr = `${minute}M`;
  }
  return timeStr;
};

export const createRandomString = (items) => {
  let arr = [];
  let cloneArr = [].concat(items);
  let arrRandomLength = Math.floor(Math.random() * DESCRIPTIONS_MAX_LENGTH + 1);
  while (arr.length < arrRandomLength) {
    arr.push(getUniqueItem(cloneArr));
  }
  return arr.join(` `);
};

export const createPhotosArray = () => {
  let picturesArray = [];
  let picture = {};
  const count = getRandomInteger(PhotosCount.MIN, PhotosCount.MAX);
  for (let i = 0; i < count; i++) {
    picture = {
      src: `http://picsum.photos/248/152?r=${Math.random()}`,
      description: `Lorem ipsum`
    };
    picturesArray.push(picture);
  }
  return picturesArray;
};

export const getRandomOffers = () => {
  let offersArr = [];
  let offer = {};
  const offerCount = getRandomInteger(OfferCount.MIN, OfferCount.MAX);
  const offerTitlesClone = [].concat(offerTitles);
  for (let i = 0; i < offerCount; i++) {
    offer = {
      id: nanoid(),
      title: getUniqueItem(offerTitlesClone),
      price: getRandomInteger(OfferPrice.MIN, OfferPrice.MAX)
    };
    offersArr.push(offer);
  }
  return offersArr;
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomElement = (items) => {
  return items[getRandomInteger(0, items.length - 1)];
};

export const getUniqueItem = (items) => {
  const b = getRandomElement(items);
  items.splice(items.indexOf(b), 1);
  return b;
};

export const sortWaypointsByTime = (itemsA, itemsB) => {
  const timeDurationItemsA = itemsA.dateEnd.diff(itemsA.dateStart, `m`);
  const timeDurationItemsB = itemsB.dateEnd.diff(itemsB.dateStart, `m`);

  if (timeDurationItemsB > timeDurationItemsA) {
    return 1;
  }
  if (timeDurationItemsB < timeDurationItemsA) {
    return -1;
  }
  return 0;
};

export const filter = {
  [FilterType.EVERYTHING]: (waypoints) => waypoints,
  [FilterType.FUTURE]: (waypoints) => waypoints.filter((waypoint) => waypoint.date > dayjs()),
  [FilterType.PAST]: (waypoints) => waypoints.filter((waypoint) => waypoint.date < dayjs())
};

export const makeUniqWaypointTypes = (items) => {
  let arr = [];
  items.forEach((item) => arr.push(item.type.toUpperCase()));
  return [...new Set(arr)];
};

export const getTypesCost = (items, data) => {
  let arr = [];
  let sum = 0;
  items.forEach((item) => {
    data.forEach((point) => {
      if (point.type.toUpperCase() === item) {
        sum += point.price;
      }
    });
    arr.push(sum);
    sum = 0;
  });
  return arr;
};

export const getTypesCount = (items, data) => {
  let arr = [];
  let sum = 0;
  items.forEach((item) => {
    data.forEach((point) => {
      if (point.type.toUpperCase() === item) {
        sum++;
      }
    });
    arr.push(sum);
    sum = 0;
  });
  return arr;
};

export const getTimeSpend = (items, data) => {
  let arr = [];
  let sum = 0;
  items.forEach((item) => {
    data.forEach((point) => {
      if (point.type.toUpperCase() === item) {
        sum += (point.dateEnd.diff(point.dateStart)) / TimeInMs.DAY;
      }
    });
    arr.push(Math.round(sum));
    sum = 0;
  });
  return arr;
};

export const Description = {
  "Amsterdam": createRandomString(descriptions),
  "Chamonix": createRandomString(descriptions),
  "Geneva": createRandomString(descriptions)
};

export const getPictures = destinations.reduce((acc, item) => {
  acc[item] = createPhotosArray();
  return acc;
}, []);
