import {transformFilmDuration, cropDescription} from '../utils/common';
import AbstractComponent from './abstract-component.js';
import {DEBOUNCE_TIMEOUT} from '../constants';

/**
 * Генерирует разметку карточки фильма в зависимсоти от переданных данных
 *
 * @param {Object} film объект с данными фильма
 * @return {String} строковое представление разметки карточки фильма
 */
const getCardComponent = (film) => {
  const {name, rating, genres, poster, commentsId, watchlist, history, favorites} = film;
  let {date, duration, description} = film;

  date = new Date(date).getFullYear();
  duration = transformFilmDuration(duration);
  description = cropDescription(description);

  return `<article class="film-card">
    <h3 class="film-card__title">${name}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${date}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genres[0] ? genres[0] : ``}</span>
    </p>
    <img src="${poster}" alt="Постер ${name}" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${commentsId.length} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${history ? `film-card__controls-item--active` : ``}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${favorites ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
    </form>
  </article>`;
};

export default class Card extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  /**
   * Генерирует разметку карточки фильма
   *
   * @return {String} строковое представление разметки карточки фильма
   */
  getTemplate() {
    return getCardComponent(this._film);
  }

  /**
   * Инициализирует обработчики на элементе
   *
   * @param {Function} handler
   */
  setOpenDetailstHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._debounce(handler, DEBOUNCE_TIMEOUT));
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._debounce(handler, DEBOUNCE_TIMEOUT));
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._debounce(handler, DEBOUNCE_TIMEOUT));
  }

  /**
   * Вешает обработчик клика на кнопку "Add to watchlist"
   *
   * @param {Function} handler
   */
  setAddWatchlistButtonHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, this._debounce(handler, DEBOUNCE_TIMEOUT));
  }

  /**
   * Вешает обработчик клика на кнопку "Already watched"
   *
   * @param {Function} handler
   */
  setAlreadyWatchedButtonHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, this._debounce(handler, DEBOUNCE_TIMEOUT));
  }

  /**
   * Вешает обработчик клика на кнопку "Add to favorites"
   *
   * @param {Function} handler
   */
  setAddFavoriteButtonHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, this._debounce(handler, DEBOUNCE_TIMEOUT));
  }

  /**
   * Декоратор debounce
   *
   * @param {Function} handler
   * @param {Number} timeout
   * @return {Function}
   */
  _debounce(handler, timeout) {
    let isCooldown = false;

    return (evt) => {
      if (isCooldown) {
        return;
      }

      handler(evt);

      isCooldown = true;

      setTimeout(() => {
        isCooldown = false;
      }, timeout);
    };
  }
}
