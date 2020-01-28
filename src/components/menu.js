import AbstractComponent from './abstract-component.js';
import {countsFilmAsCategory} from '../utils/common';

/**
 * Генерирует разметку всего меню с фильтрами
 *
 * @param {Array} films массив с данными карточек фильмов
 * @return {String} возвращщает разметку компонента меню
 */
const getMenuMarkup = (films) => `
  <nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">
      Watchlist
      <span class="main-navigation__item-count">${countsFilmAsCategory(films, `watchlist`)}</span>
    </a>
    <a href="#history" class="main-navigation__item">
      History
      <span class="main-navigation__item-count">${countsFilmAsCategory(films, `history`)}</span>
    </a>
    <a href="#favorites" class="main-navigation__item">
      Favorites
      <span class="main-navigation__item-count">${countsFilmAsCategory(films, `favorites`)}</span>
    </a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>
`;

export default class Menu extends AbstractComponent {
  constructor(films) {
    super();

    this._films = films;
  }

  /**
 * Генерирует разметку всего меню с фильтрами
 *
 * @param {Array} films массив с данными карточек фильмов
 * @return {String} возвращщает разметку компонента меню
 */
  getTemplate() {
    return getMenuMarkup(this._films);
  }

  /**
   * Вешает на ссылки фильтр обработчик клика
   *
   * @param {Function} handler
   */
  setHandler(handler) {
    const filterLinks = this._element.querySelectorAll(`.main-navigation__item:not(.main-navigation__item--additional)`);

    filterLinks.forEach((item) => item.addEventListener(`click`, handler));
  }

  /**
   * Вешает на кнопку "Stats" обработчик клика
   *
   * @param {Function} handler
   */
  setAdditionalHandler(handler) {
    this._element.querySelector(`.main-navigation__item--additional`).addEventListener(`click`, handler);
  }
}
