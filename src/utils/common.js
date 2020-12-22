import {offersCount, offerTitle, offerPrice, minutes, DESCRIPTION_MAX_LENGTH, photosCount, FilterType} from "./../consts.js";
import dayjs from "dayjs";
import {nanoid} from "./nanoid.js";

export const getTimeInfo = (dateEnd, dateStart) => {
  let timeStr = ``;
  let day;
  let hour;
  let minute = dateEnd.diff(dateStart, `m`);
  if (minute > minutes.IN_DAY) {
    day = Math.floor(minute / minutes.IN_DAY);
    hour = Math.floor((minute - day * minutes.IN_DAY) / minutes.IN_HOUR);
    minute = ((minute - day * minutes.IN_DAY) - hour * minutes.IN_HOUR);
    timeStr = `${day}D ${hour}H ${minute}M`;
  } else if (minute >= minutes.IN_HOUR && minute < minutes.IN_DAY) {
    hour = Math.floor(minute / minutes.IN_HOUR);
    minute = minute - hour * minutes.IN_HOUR;
    timeStr = `${hour}H ${minute}M`;
  } else if (minute > 0 && minute < minutes.IN_HOUR) {
    minute = minute;
    timeStr = `${minute}M`;
  }
  return timeStr;
};

export const createRandomString = (items) => {
  let arr = [];
  let cloneArr = [].concat(items);
  let arrRandomLength = Math.floor(Math.random() * DESCRIPTION_MAX_LENGTH + 1);
  while (arr.length < arrRandomLength) {
    arr.push(getUniqueItem(cloneArr));
  }
  return arr.join(` `);
};

export const createPhotosArray = () => {
  const arr = [];
  const count = getRandomInteger(photosCount.MIN, photosCount.MAX);
  for (let i = 0; i < count; i++) {
    const photo = `http://picsum.photos/248/152?r=${Math.random()}`;
    arr.push(photo);
  }
  return arr;
};

export const getRandomOffers = () => {
  let offersArr = [];
  let offer = {};
  const offerCount = getRandomInteger(offersCount.MIN, offersCount.MAX);
  const offerTitleClone = [].concat(offerTitle);
  for (let i = 0; i < offerCount; i++) {
    offer = {
      id: nanoid(),
      title: getUniqueItem(offerTitleClone),
      price: getRandomInteger(offerPrice.MIN, offerPrice.MAX)
    };
    offersArr.push(offer);
  }
  return offersArr;
};

// export const getOffers = () => {
//   let offersArr = [];
//   let offer = {};
//   const offerCount = getRandomInteger(offersCount.MIN, offersCount.MAX);
//   const offerTitleClone = [].concat(offerTitle);
//   for (let i = 0; i < offerCount; i++) {
//     offer = {
//       title: getUniqueItem(offerTitleClone),
//       price: getRandomInteger(offerPrice.MIN, offerPrice.MAX),
//       check: false
//     };
//     offersArr.push(offer);
//   }
//   return offersArr;
// };

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
