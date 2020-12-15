import dayjs from "dayjs";
import {getRandomInteger, getRandomElement, getUniqueItem, getRandomOffers} from "./../utils/common.js";
import {WAYPOINT_TYPE, DESTINATION, PRICE, DESCRIPTION_MAX_LENGTH, timeHours, timeMinutes, DESCRIPTION, photosCount} from "./../consts.js";
import {nanoid} from "./../utils/nanoid.js";

const createRandomString = (items) => {
  let arr = [];
  let cloneArr = [].concat(items);
  let arrRandomLength = Math.floor(Math.random() * DESCRIPTION_MAX_LENGTH + 1);
  while (arr.length < arrRandomLength) {
    arr.push(getUniqueItem(cloneArr));
  }
  return arr.join(` `);
};

const getRandomTime = () => {
  const hoursGap = getRandomInteger(timeHours.MIN, timeHours.MAX);
  const minuteGap = getRandomInteger(timeMinutes.MIN, timeMinutes.MAX);

  return dayjs().hour(hoursGap).minute(minuteGap);
};

const generateDate = () => {
  const maxDaysGap = 3;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, `day`);
};

const createPhotosArray = () => {
  const arr = [];
  const count = getRandomInteger(photosCount.MIN, photosCount.MAX);
  for (let i = 0; i < count; i++) {
    const photo = `http://picsum.photos/248/152?r=${Math.random()}`;
    arr.push(photo);
  }
  return arr;
};

const getDateEnd = (dateStart) => {
  const hoursGap = getRandomInteger(timeHours.MIN, timeHours.MAX);
  const minuteGap = getRandomInteger(timeMinutes.MIN, timeMinutes.MAX);

  return dateStart.add(hoursGap, `h`).add(minuteGap, `m`);
};

export const generateWaypoint = () => {
  const dateStart = getRandomTime();
  const dateEnd = getDateEnd(dateStart);

  return {
    id: nanoid(),
    dateStart,
    dateEnd,
    type: getRandomElement(WAYPOINT_TYPE),
    destination: getRandomElement(DESTINATION),
    description: createRandomString(DESCRIPTION),
    photos: createPhotosArray(),
    date: generateDate(),
    price: getRandomInteger(PRICE.MIN, PRICE.MAX),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: getRandomOffers()
  };
};
