import AbstractComponent from './abstract-component.js';
import {filterNames} from '../constants';
import {getFilters} from '../mock/menu';

/**
 * Генерирует разметку одного пункта фильтра
 *
 * @param {String} name название пунтка фильтра
 * @param {Number} quantity количество фильмов в пункте
 * @return {String} разметка пункта фильтра
 */
const getItemFilterMarkup = (name, quantity) => `
  <a href="#${name.toLowerCase()}" class="main-navigation__item">
    ${name}
  <span class="main-navigation__item-count">${quantity}</span></a>
`;

/**
 * Генерирует разметку пунктов фильтра с количеством фильмов соответствующих категориям
 *
 * @param {Object} filters объект с данными о фильмах в пунктах фильтра
 * @return {String} разметка пунктов фильтра
 */
const getFiltersMarkup = (filters) => filterNames.map((item) => getItemFilterMarkup(item, filters[item])).join(``);

/**
 * Генерирует разметку всего меню с фильтрами
 *
 * @param {Array} films массив с данными карточек фильмов
 * @return {String} возвращщает разметку компонента меню
 */
const getMenuMarkup = (films) => `
  <nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${getFiltersMarkup(getFilters(films))}
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
}
