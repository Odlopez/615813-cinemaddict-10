import {filterItems} from '../constants';

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
 * @param {Object} filtersData объект с данными о фильмах в пунктах фильтра
 * @return {String} разметка пунктов фильтра
 */
const getFiltersMarkup = (filtersData) => filterItems.map((item) => getItemFilterMarkup(item, filtersData[item])).join(``);

/**
 * Генерирует разметку всего меню с фильтрами
 *
 * @param {Object} filtersData объект с данными о фильмах в пунктах фильтра
 * @return {String} возвращщает разметку компонента меню
 */
export const getMenuComponent = (filtersData) => `
  <nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${getFiltersMarkup(filtersData)}
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>
`;
