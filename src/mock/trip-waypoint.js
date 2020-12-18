import dayjs from "dayjs";
import {getRandomInteger, getRandomElement, getRandomOffers, createRandomString, createPhotosArray} from "./../utils/common.js";
import {WAYPOINT_TYPE, DESTINATION, PRICE, timeHours, timeMinutes, DESCRIPTION} from "./../consts.js";
import {nanoid} from "./../utils/nanoid.js";

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

const getDateEnd = (dateStart) => {
  const hoursGap = getRandomInteger(timeHours.MIN, timeHours.MAX);
  const minuteGap = getRandomInteger(timeMinutes.MIN, timeMinutes.MAX);

  return dateStart.add(hoursGap, `h`).add(minuteGap, `m`);
};

export const generateWaypoint = () => {
  const dateStart = getRandomTime();
  const dateEnd = getDateEnd(dateStart);
  const type = getRandomElement(WAYPOINT_TYPE);
  const destination = getRandomElement(DESTINATION);
  const offers = {
    "Flight": getRandomOffers(),
    "Taxi": getRandomOffers(),
    "Drive": getRandomOffers(),
    "Sightseeing": getRandomOffers(),
    "Check-in": getRandomOffers()
  };
  const description = {
    "Amsterdam": createRandomString(DESCRIPTION),
    "Chamonix": createRandomString(DESCRIPTION),
    "Geneva": createRandomString(DESCRIPTION)
  };
  const photos = {
    "Amsterdam": createPhotosArray(),
    "Chamonix": createPhotosArray(),
    "Geneva": createPhotosArray()
  };

  return {
    id: nanoid(),
    dateStart,
    dateEnd,
    type,
    destination,
    description,
    photos,
    date: generateDate(),
    price: getRandomInteger(PRICE.MIN, PRICE.MAX),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers,
  };
};
