import {getRandomInteger, getUniqueItem} from "./../util";
import {offersCount, offerTitle, offerPrice, OFFER_KEYS, WAYPOINT_TYPE} from "./../consts.js";

const createDateTemplate = (item) => {
  return `<div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${item.dateStart !== null ? item.dateStart.format(`DD/MM/YY HH:mm`) : ``}">&mdash;
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${item.dateEnd !== null ? item.dateEnd.format(`DD/MM/YY HH:mm`) : ``}">
  </div>`;
};

const createTypeTemplate = (item) => {
  const typeTemplate = WAYPOINT_TYPE.map((element) => {
    return `<div class="event__type-item">
    <input id="event-type-${element.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${element}" ${element === item ? `checked` : ``}>
    <label class="event__type-label  event__type-label--${element.toLowerCase()}" for="event-type-${element.toLowerCase()}-1">${element}</label>
  </div>`;
  });
  return typeTemplate.join(``);
};

const createDescriptionTemplate = (item, destination) => {
  return `<p class="event__destination-description">${destination !== null ? item : ``}</p>`;
};

const createOfferEditTemplate = () => {
  const arr = [];
  const offerCount = getRandomInteger(offersCount.MIN, offersCount.MAX);
  const offerTitleClone = [].concat(offerTitle);
  for (let i = 0; i < offerCount; i++) {
    const offerTitleValue = getUniqueItem(offerTitleClone);
    const offerPriceValue = getRandomInteger(offerPrice.MIN, offerPrice.MAX);
    arr.push(`<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${i}" type="checkbox" name="event-offer-luggage" ${getRandomInteger(0, 1) === 1 ? `checked` : ``}>
    <label class="event__offer-label" for="event-offer-luggage-${i}">
      <span class="event__offer-title">${offerTitleValue}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offerPriceValue}</span>
    </label>
  </div>`);
  }
  return arr.join(``);
};

const createPhotoTemplate = (items) => {
  let arr = [];
  for (let i = 0; i < items.length; i++) {
    arr.push(`<img width="80" height="80" src="${items[i]}" alt="">`);
  }
  return arr.join(``);
};

export const createFormEditingTemplate = (waypoint = {}) => {

  const {type, destination, price, photos, description} = waypoint;

  const descriptionTemplate = createDescriptionTemplate(description, destination);
  const typeTemplate = createTypeTemplate(type);
  const offerEditTemplate = OFFER_KEYS.includes(type) ? createOfferEditTemplate() : ``;
  const dateTemplate = createDateTemplate(waypoint);
  const photosTemplate = createPhotoTemplate(photos);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${typeTemplate}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type !== null ? type : ``}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination !== null ? destination : ``}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>

      ${dateTemplate}

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offerEditTemplate}
        </div>
      </section>
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        ${descriptionTemplate}
        ${photosTemplate}
     </section>
    </section>
  </form>
</li>`;
};
