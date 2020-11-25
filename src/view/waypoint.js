import {getRandomInteger, getUniqueItem} from "./../util";
import {OFFER_KEYS, offersCount, offerTitle, offerPrice} from "./../consts.js";
import {timeHours, timeMinutes} from "./../consts.js";

const createOfferTemplate = () => {
  const arr = [];
  const offerCount = getRandomInteger(offersCount.MIN, offersCount.MAX);
  const offerTitleClone = [].concat(offerTitle);
  for (let i = 0; i < offerCount; i++) {
    const offerTitleValue = getUniqueItem(offerTitleClone);
    const offerPriceValue = getRandomInteger(offerPrice.MIN, offerPrice.MAX);
    arr.push(`<li class="event__offer">
    <span class="event__offer-title">${offerTitleValue}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offerPriceValue}</span>
  </li>`);
  }
  return arr.join(``);
};

const createTravelTimeTemplate = (dateEnd, dateStart) => {
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

const createDateEndTemplate = (dateStart, dateEnd) => {
  const hoursGap = getRandomInteger(timeHours.MIN, timeHours.MAX);
  const minuteGap = getRandomInteger(timeMinutes.MIN, timeMinutes.MAX);

  const dateEndTime = dateEnd.isAfter(dateStart) ? dateEnd : dateStart.add(hoursGap, `h`).add(minuteGap, `m`);

  return dateEndTime;
};

const createPhotoTemplate = (items) => {
  let arr = [];
  for (let i = 0; i < items.length; i++) {
    arr.push(`<img class="event__type-icon" width="42" height="42" src="${items[i]}" alt="Event type icon">`);
  }
  return arr.join(``);
};

export const createWaypointTemplate = (waypoint) => {

  const {dateStart, dateEnd, type, destination, date, price, photos, isFavorite} = waypoint;

  const offerTemplate = OFFER_KEYS.includes(type) ? createOfferTemplate() : ``;

  const dateEndTime = createDateEndTemplate(dateStart, dateEnd);

  const favoriteBtnActive = isFavorite ? `event__favorite-btn--active` : ``;

  const duration = createTravelTimeTemplate(dateEndTime, dateStart);

  const photosTemplate = createPhotoTemplate(photos);

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="2019-03-18">${date.format(`D MMM`)}</time>
    <div class="event__type">
      ${photosTemplate}
    </div>
    <h3 class="event__title">${type} ${destination}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">${dateStart.format(`HH:mm`)}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T11:00">${dateEndTime.format(`HH:mm`)}</time>
      </p>
      <p class="event__duration">${duration}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">${offerTemplate}
    </ul>
    <button class="event__favorite-btn ${favoriteBtnActive}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};
