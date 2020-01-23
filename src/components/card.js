import {transformFilmDuration, cropDescription} from '../utils/common';
import AbstractComponent from './abstract-component.js';

/**
 * Генерирует разметку карточки фильма в зависимсоти от переданных данных
 *
 * @param {Object} film объект с данными фильма
 * @return {String} строковое представление разметки карточки фильма
 */
const getCardComponent = (film) => {
  const {name, rating, genres, poster, commentsId} = film;
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
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
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
   * @return {String} строкое представление разметки карточки фильма
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
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }


  /**
   * Вешает обработчик клика на кнопку "Add to watchlist"
   *
   * @param {Function} handler
   */
  setAddWatchlistButtonHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  /**
   * Вешает обработчик клика на кнопку "Already watched"
   *
   * @param {Function} handler
   */
  setAlreadyWatchedButtonHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  /**
   * Вешает обработчик клика на кнопку "Add to favorites"
   *
   * @param {Function} handler
   */
  setAddFavoriteButtonHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
