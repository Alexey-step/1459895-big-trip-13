import {waypointTypes} from "../consts.js";
import Smart from "./smart.js";
import dayjs from "dayjs";
import flatpickr from "flatpickr";
import {isOnline} from "../utils/common.js";

import "./../../node_modules/flatpickr/dist/flatpickr.min.css";

const getBlank = () => {
  return {
    type: `taxi`,
    destination: {},
    price: ``,
    offers: [],
    dateEnd: ``,
    dateStart: ``,
    isNewWaypointMode: true
  };
};

const createDateTemplate = (item, isDisabled) => {
  return `<div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${item.dateStart ? item.dateStart.format(`DD/MM/YY HH:mm`) : ``}" ${isDisabled ? isDisabled : ``}>&mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${item.dateEnd ? item.dateEnd.format(`DD/MM/YY HH:mm`) : ``}" ${isDisabled ? isDisabled : ``}>
          </div>`;
};

const createTypeTemplate = (item, isDisabled) => {
  const typeTemplate = waypointTypes.map((element) => {
    return `<div class="event__type-item">
              <input id="event-type-${element}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${element}" ${element === item ? `checked` : ``} ${isDisabled ? isDisabled : ``}>
              <label class="event__type-label  event__type-label--${element}" for="event-type-${element}-1">${element}</label>
            </div>`;
  });
  return typeTemplate.join(``);
};

const createDescriptionTemplate = (items) => {
  return `<h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${items.description}</p>`;
};

const createOfferEditTemplate = (offers, allOffers, isDisabled) => {
  const offersTitles = offers.map((offer) => offer.title);
  const offerEditTemplate = allOffers.map((offer, i) => {
    return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${i}" type="checkbox" name="event-offer-luggage" ${offersTitles.includes(offer.title) ? `checked` : ``} ${isDisabled ? isDisabled : ``}>
              <label class="event__offer-label" for="event-offer-luggage-${i}">
                <span class="event__offer-title">${offer.title}</span>
                  &plus;&euro;&nbsp;
                <span class="event__offer-price">${offer.price}</span>
              </label>
            </div>`;
  });
  return offerEditTemplate.length !== 0 ? `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${offerEditTemplate.join(``)}
            </div>
          </section>` : ``;
};

const createPhotoTemplate = (items) => {
  const photoTemplate = items.pictures.map((item) => {
    return `<img class="event__photo" src="${item.src}" alt="${item.description}">`;
  });
  return `<div class="event__photos-container">
            <div class="event__photos-tape">
              ${photoTemplate.join(``)}
            </div>
          </div>`;
};

const checkDates = (item) => {
  if (item.dateEnd && item.dateStart && item.dateEnd.isAfter(item.dateStart)) {
    return ``;
  } else {
    return `disabled`;
  }
};

const createOptionTemplate = (destinations) => {
  const destinationsNames = Object.values(destinations).map((destination) => destination.name);
  const optionTemplate = destinationsNames.map((type) => {
    return `<option value="${type}"></option>`;
  });

  return optionTemplate.join(``);
};

const createFormEditingTemplate = (data, allOffers, destinations) => {

  const {
    type,
    destination,
    price,
    offers,
    isDisabled,
    isSaving,
    isDeleting,
    isNewWaypointMode
  } = data;

  const deleteCancelButton = isNewWaypointMode ? `Cancel` : `Delete`;
  const descriptionTemplate = destination.description ? createDescriptionTemplate(destination) : ``;
  const typeTemplate = createTypeTemplate(type, isDisabled);
  const offerEditTemplate = allOffers[type] ? createOfferEditTemplate(offers, allOffers[type]) : ``;
  const dateTemplate = createDateTemplate(data, isDisabled);
  const photosTemplate = destination.pictures ? createPhotoTemplate(destination) : ``;
  const isSubmitDisabled = checkDates(data);
  const optionTemplate = createOptionTemplate(destinations);

  return `<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
              <header class="event__header">
                <div class="event__type-wrapper">
                  <label class="event__type  event__type-btn" for="event-type-toggle-1">
                    <span class="visually-hidden">Choose event type</span>
                    <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                  </label>
                  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? isDisabled : ``}>
                  <div class="event__type-list">
                    <fieldset class="event__type-group">
                      <legend class="visually-hidden">Event type</legend>
                      ${typeTemplate}
                    </fieldset>
                  </div>
                </div>
                <div class="event__field-group  event__field-group--destination">
                  <label class="event__label  event__type-output" for="event-destination-1">
                    ${type !== `` ? type : ``}
                  </label>
                  <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name ? destination.name : ``}" list="destination-list-1" required ${isDisabled ? isDisabled : ``}>
                  <datalist id="destination-list-1">
                    ${optionTemplate}
                  </datalist>
                </div>
                ${dateTemplate}
                <div class="event__field-group  event__field-group--price">
                  <label class="event__label" for="event-price-1">
                    <span class="visually-hidden">Price</span>
                    &euro;
                  </label>
                  <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}" required ${isDisabled ? isDisabled : ``}>
                </div>
                <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled} ${isDisabled ? isDisabled : ``}>${isSaving ? `Saving...` : `Save`}</button>
                <button class="event__reset-btn" type="reset" ${isDisabled ? isDisabled : ``}>${isDeleting ? `Deleting...` : deleteCancelButton}</button>
                <button class="event__rollup-btn" type="button" ${isDisabled ? isDisabled : ``}>
                  <span class="visually-hidden">Open event</span>
                </button>
              </header>
              <section class="event__details">
                ${offerEditTemplate}
                <section class="event__section  event__section--destination">
                  ${descriptionTemplate}
                  ${isOnline() ? photosTemplate : ``}
                </section>
              </section>
            </form>
          </li>`;
};

export default class FormEditView extends Smart {
  constructor(offersModel, destinationsModel, waypoint = getBlank()) {
    super();

    this._offers = offersModel.getOffers();
    this._destinations = destinationsModel.getDestinations();

    this._data = FormEditView.parseWaypointToData(waypoint);
    this._dateStartPicker = null;
    this._dateEndPicker = null;

    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._editCloseClickHandler = this._editCloseClickHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._dateStartChangeHandler = this._dateStartChangeHandler.bind(this);
    this._dateEndChangeHandler = this._dateEndChangeHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createFormEditingTemplate(this._data, this._offers, this._destinations);
  }

  removeElement() {
    super.removeElement();

    if (this._dateStartPicker) {
      this._dateStartPicker.destroy();
      this._dateStartPicker = null;
    }
    if (this._dateEndPicker) {
      this._dateEndPicker.destroy();
      this._dateEndPicker = null;
    }
  }

  reset(waypoint) {
    this.updateData(
        FormEditView.parseWaypointToData(waypoint)
    );
  }

  setDatepicker() {

    if (this._dateStartPicker) {
      this._dateStartPicker.destroy();
      this._dateStartPicker = null;
    }
    if (this._dateEndPicker) {
      this._dateEndPicker.destroy();
      this._dateEndPicker = null;
    }

    this._dateStartPicker = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          enableTime: true,
          dateFormat: `d/m/y H:i`,
          dateDefault: this._data.dateStart,
          defaultDate: `${this._data.dateStart}`,
          onChange: this._dateStartChangeHandler
        }
    );

    this._dateEndPicker = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          enableTime: true,
          dateFormat: `d/m/y H:i`,
          minDate: `${this._data.dateStart}`,
          dateDefault: this._data.dateEnd,
          defaultDate: `${this._data.dateEnd}`,
          onChange: this._dateEndChangeHandler
        }
    );
  }

  _dateStartChangeHandler([userDate]) {
    this.updateData({
      dateStart: dayjs(userDate),
    });
  }

  _dateEndChangeHandler([userDate]) {
    this.updateData({
      dateEnd: dayjs(userDate)
    });
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    if (isNaN(evt.target.value)) {
      evt.target.setCustomValidity(`Введите число`);
    } else {
      this.updateData({
        price: evt.target.value
      }, true);
      evt.target.setCustomValidity(``);
    }
  }

  static parseWaypointToData(waypoint) {
    return Object.assign(
        {},
        waypoint,
        {
          isDisabled: false,
          isSaving: false,
          isDeleting: false,
          isNewWaypointMode: waypoint.isNewWaypointMode || false
        });
  }

  static parseDataToWaypoint(data) {
    data = Object.assign({}, data);

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;
    delete data.isNewWaypointMode;

    return data;
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditCloseClickHandler(this._callback.editCloseClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, this._typeChangeHandler);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._destinationChangeHandler);
    this.getElement().querySelector(`.event__field-group--price`).addEventListener(`input`, this._priceInputHandler);
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
    });
  }

  _destinationChangeHandler(evt) {
    if (this._destinations[evt.target.value]) {
      evt.preventDefault();
      this.updateData({
        destination: this._destinations[evt.target.value]
      });
      evt.target.setCustomValidity(``);
    } else {
      evt.target.setCustomValidity(`Выберите значение из списка`);
    }
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    const newOffers = this._offers[this._data.type];
    const selectedOffers = [];
    if (newOffers) {
      newOffers.slice();
      this.getElement().querySelectorAll(`.event__offer-checkbox`)
    .forEach((element, i) => {
      if (element.checked) {
        selectedOffers.push(newOffers[i]);
      }
    });
      this._data.offers = selectedOffers;
    }
    this._callback.formSubmit(FormEditView.parseDataToWaypoint(this._data));
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(FormEditView.parseDataToWaypoint(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
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
