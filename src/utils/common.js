import {Minutes, FilterType, TimeInMs} from "../consts.js";
import dayjs from "dayjs";

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
    timeStr = `${minute}M`;
  }
  return timeStr;
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
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
  [FilterType.FUTURE]: (waypoints) => waypoints.filter((waypoint) => waypoint.dateStart > dayjs()),
  [FilterType.PAST]: (waypoints) => waypoints.filter((waypoint) => waypoint.dateStart < dayjs())
};

export const makeUniqWaypointTypes = (items) => {
  const uniqs = [];
  items.forEach((item) => uniqs.push(item.type));
  return [...new Set(uniqs)];
};

export const getTypesCost = (items, data) => {
  const itemsCosts = [];
  let sum = 0;
  items.forEach((item) => {
    data.forEach((point) => {
      if (point.type === item) {
        sum += point.price;
      }
    });
    itemsCosts.push(sum);
    sum = 0;
  });
  return itemsCosts;
};

export const getTypesCount = (items, data) => {
  const itemsTypesCount = [];
  let count = 0;
  items.forEach((item) => {
    data.forEach((point) => {
      if (point.type === item) {
        count++;
      }
    });
    itemsTypesCount.push(count);
    count = 0;
  });
  return itemsTypesCount;
};

export const getTimeSpend = (items, data) => {
  const itemsTimes = [];
  let time = 0;
  items.forEach((item) => {
    data.forEach((point) => {
      if (point.type === item) {
        time += (point.dateEnd.diff(point.dateStart)) / TimeInMs.DAY;
      }
    });
    itemsTimes.push(Math.round(time));
    time = 0;
  });
  return itemsTimes;
};

export const isOnline = () => {
  return window.navigator.onLine;
};

const getTimeDifference = (items) => {
  return items.dateEnd.diff(items.dateStart);
};

export const isEqual = (a, b) => {
  const differentTimeA = getTimeDifference(a);
  const differentTimeB = getTimeDifference(b);

  return differentTimeA === differentTimeB;
};
