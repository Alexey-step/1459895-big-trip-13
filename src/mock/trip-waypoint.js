import dayjs from "dayjs";

import {getRandomInteger, getRandomElement, Description, getPictures} from "../utils/common.js";
import {waypointTypes, destinations, PRICE, TimeHours, TimeMinutes} from "../consts.js";

import {nanoid} from "./../utils/nanoid.js";

const getRandomTime = (item) => {
  const hoursGap = getRandomInteger(TimeHours.MIN, TimeHours.MAX);
  const minuteGap = getRandomInteger(TimeMinutes.MIN, TimeMinutes.MAX);

  return dayjs(item).hour(hoursGap).minute(minuteGap);
};

const generateDate = () => {
  const maxDaysGap = 3;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, `day`);
};

const getDateEnd = (dateStart) => {
  const hoursGap = getRandomInteger(TimeHours.MIN, TimeHours.MAX);
  const minuteGap = getRandomInteger(TimeMinutes.MIN, TimeMinutes.MAX);

  return dateStart.add(hoursGap, `h`).add(minuteGap, `m`);
};

export const generateWaypoint = (offers) => {
  const newDate = generateDate();
  const dateStart = getRandomTime(newDate);
  const date = dateStart;
  const dateEnd = getDateEnd(dateStart);
  const type = getRandomElement(waypointTypes);

  const destinationName = getRandomElement(destinations);

  const destination = {
    description: Description[destinationName],
    name: destinationName,
    pictures: getPictures[destinationName]
  };

  const offersIds = offers[type]
  .filter(() => getRandomInteger(0, 2) === 1)
  .map((offer) => offer.id);

  return {
    id: nanoid(),
    dateStart,
    dateEnd,
    type,
    destination,
    date,
    price: getRandomInteger(PRICE.MIN, PRICE.MAX),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offersIds,
  };
};
