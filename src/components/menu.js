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
export const getMenuComponent = (films) => `
  <nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${getFiltersMarkup(getFilters(films))}
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>
`;
