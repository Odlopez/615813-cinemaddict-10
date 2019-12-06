import {filterNames} from '../constants';
import {getFilters} from '../mock/menu';
import {createElement} from '../utils';

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
export const getMenuMarkup = (films) => `
  <nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${getFiltersMarkup(getFilters(films))}
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>
`;

export default class Menu {
  constructor(films, content) {
    this._films = films;
    this._element = null;
    this._content = content;
    this._filterLinks = null;

    this.onFilterLinkClick = this.onFilterLinkClick.bind(this);
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
   * Возвращает ссылку на node-элемент меню
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
   * Очищает ссылку на node-элемент меню
   */
  removeElement() {
    this._element = null;
  }

  /**
   * Сбрасывает активный класс у всех ссылок фильтра
   */
  resetActiveClass() {
    this._filterLinks.forEach((item) => item.classList.remove(`main-navigation__item--active`));
  }

  /**
   * Сортирует карточки фильмов по определенному значению из фильтров
   *
   * @param {Strins} name
   * @return {Array} отсортированный массив с данными фильмов
   */
  getSortfilms(name) {
    return filterNames.find((item) => item.toLowerCase() === name.toLowerCase()) ? this._films.filter((item) => item[name]) : this._films;
  }

  /**
   * Функция-callback обработчика клика по ссылке фильтра
   * перерисовывает карточки соответственно отфольтрованному массиву с данными о фильмах
   *
   * @param {Event} evt
   */
  onFilterLinkClick(evt) {
    evt.preventDefault();

    const filterValue = evt.currentTarget.href.match(/#.{1,}/)[0].slice(1);
    const filterfilms = this.getSortfilms(filterValue);
    this._content.films = filterfilms;

    this.resetActiveClass();
    this._content.renderContent();
    evt.currentTarget.classList.add(`main-navigation__item--active`);
  }

  /**
   * Инициализирует обработчики
   */
  init() {
    this._filterLinks = this._element.querySelectorAll(`.main-navigation__item:not(.main-navigation__item--additional)`);

    this._filterLinks.forEach((item) => item.addEventListener(`click`, this.onFilterLinkClick));
  }
}
