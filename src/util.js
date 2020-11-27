export const renderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case renderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case renderPosition.BEFOREEND:
      container.append(element);
      break;
  }
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

export const getTimeInfo = (dateEnd, dateStart) => {
  let timeStr = ``;
  let day;
  let hour;
  let minute = dateEnd.diff(dateStart, `m`);
  if (minute < 0) {
    minute = minute * -1;
  }
  if (minute > 1440) {
    day = Math.floor(minute / 1440);
    hour = Math.floor((minute - day * 1440) / 60);
    minute = minute - ((minute - day * 1440) % 60);
    timeStr = `${day}D ${hour}H ${minute}M`;
  } else if (minute >= 60 && minute < 1440) {
    hour = Math.floor(minute / 60);
    minute = minute - hour * 60;
    timeStr = `${hour}H ${minute}M`;
  } else if (minute > 0 && minute < 60) {
    minute = minute;
    timeStr = `${minute}M`;
  }
  return timeStr;
};
