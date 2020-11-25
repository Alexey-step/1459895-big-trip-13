import dayjs from "dayjs";
import {getRandomInteger, getRandomElement, getUniqueItem} from "./../util";
import {WAYPOINT_TYPE, DESTINATION, PRICE, DESCRIPTION_MAX_LENGTH, timeHours, timeMinutes, DESCRIPTION} from "./../consts.js";

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

export const generateWaypoint = () => {
  return {
    dateStart: getRandomTime(),
    dateEnd: getRandomTime(),
    type: getRandomElement(WAYPOINT_TYPE),
    destination: getRandomElement(DESTINATION),
    description: createRandomString(DESCRIPTION),
    photos: `http://picsum.photos/248/152?r=${Math.random()}`,
    date: generateDate(),
    price: getRandomInteger(PRICE.MIN, PRICE.MAX),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
