import {WAYPOINT_TYPE} from "./../consts.js";
import Smart from "./smart.js";

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
  return `<h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${item[destination]}</p>`;
};

const createOfferEditTemplate = (items, type) => {
  const offerEditTemplate = items[type].map((item, i) => {
    return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${i}" type="checkbox" name="event-offer-luggage" ${item.check ? `checked` : ``}>
              <label class="event__offer-label" for="event-offer-luggage-${i}">
                <span class="event__offer-title">${item.title}</span>
                  &plus;&euro;&nbsp;
                <span class="event__offer-price">${item.price}</span>
              </label>
            </div>`;
  });
  return `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${offerEditTemplate.join(``)}
            </div>
          </section>`;
};

const createPhotoTemplate = (items, destination) => {
  const photoTemplate = items[destination].map((item) => {
    return `<img width="80" height="80" src="${item}" alt="">`;
  });
  return photoTemplate.join(``);
};

const createFormEditingTemplate = (data) => {

  const {type, destination, price, photos, description, offers} = data;

  const descriptionTemplate = destination ? createDescriptionTemplate(description, destination) : ``;
  const typeTemplate = createTypeTemplate(type);
  const offerEditTemplate = offers[type] ? createOfferEditTemplate(offers, type) : ``;
  const dateTemplate = createDateTemplate(data);
  const photosTemplate = destination ? createPhotoTemplate(photos, destination) : ``;

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
                ${offerEditTemplate}
                <section class="event__section  event__section--destination">
                  ${descriptionTemplate}
                  ${photosTemplate}
                </section>
              </section>
            </form>
          </li>`;
};

export default class FormEditView extends Smart {
  constructor(waypoint) {
    super();

    this._data = FormEditView.parseWaypointToData(waypoint);

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._editCloseClickHandler = this._editCloseClickHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createFormEditingTemplate(this._data);
  }

  reset(waypoint) {
    this.updateData(
        FormEditView.parseWaypointToData(waypoint)
    );
  }

  static parseWaypointToData(waypoint) {
    return Object.assign({}, waypoint);
  }

  static parseDataToWaypoint(data) {
    data = Object.assign({}, data);

    return data;
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditCloseClickHandler(this._callback.editCloseClick);
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, this._typeChangeHandler);
    this.getElement().querySelector(`.event__field-group--destination`).addEventListener(`change`, this._destinationChangeHandler);
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
    });
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      destination: evt.target.value
    });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    const newOffers = this._data.offers[this._data.type];

    this.getElement().querySelectorAll(`.event__offer-checkbox`)
    .forEach((offer, i) => {
      newOffers[i].check = offer.checked;
    });

    this._callback.formSubmit(FormEditView.parseDataToWaypoint(this._data));
  }

  _editCloseClickHandler(evt) {
    evt.preventDefault();
    this._callback.editCloseClick();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setEditCloseClickHandler(callback) {
    this._callback.editCloseClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editCloseClickHandler);
  }
}
