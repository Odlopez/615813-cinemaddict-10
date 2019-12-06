import {transformFilmDuration, createElement, cropDescription, render} from '../utils';
import FilmDetails from './film-details';

/**
 * Генерирует разметку карточки фильма в зависимсоти от переданных данных
 *
 * @param {Object} film объект с данными фильма
 * @return {String} строковое представление разметки карточки фильма
 */
const getCardComponent = (film) => {
  const {name, rating, genres, poster, comments} = film;
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
      <span class="film-card__genre">${genres[0]}</span>
    </p>
    <img src="images/posters/${poster}" alt="Постер ${name}" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>`;
};

export default class Card {
  constructor(film) {
    this._film = film;
    this._element = null;

    this.onPopupLinkClick = this.onPopupLinkClick.bind(this);
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
   * Возвращает ссылку на node-элемент карточки фильма
   *
   * @return {Node}
   */
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());

      this.init();
    }

    return this._element;
  }

  /**
   * Очищает ссылку на node-элемент карточки фильма
   */
  removeElement() {
    this._element = null;
  }

  /**
   * Функция-callback для обработчика события "клик" на интерактивных элементах карточки
   * Отрисовывает на странице элемент с карточкой подробной информации о фильме
   */
  onPopupLinkClick() {
    render(document.body, new FilmDetails(this._film).getElement());
  }

  /**
   * Инициализирует обработчики на элементе
   */
  init() {
    this._element.querySelector(`.film-card__poster`).addEventListener(`click`, this.onPopupLinkClick);
    this._element.querySelector(`.film-card__title`).addEventListener(`click`, this.onPopupLinkClick);
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this.onPopupLinkClick);
  }
}
