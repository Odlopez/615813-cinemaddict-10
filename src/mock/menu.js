import {filterNames} from '../constants';

/**
 * Подсчитывает в массиве данных количество фильмов, соответствующих заданной категории
 *
 * @param {Array} films массив с данными карточек фильмов
 * @param {String} category категория, по которой фильтруем данные фильмов
 * @return {Number} количество фильмов соответстующей категории
 */
const countsFilmAsCategory = (films, category) => {
  return films.reduce((hoarder, item) => {
    hoarder += item[category] ? 1 : 0;
    return hoarder;
  }, 0);
};

/**
 * Генерирует данные для пунктов меню фильтра
 *
 * @param {Array} films массив с данными карточек фильмов
 * @return {Object}
 */
export const getFilters = (films) => {
  const filters = {};

  for (const value of filterNames) {
    filters[value] = countsFilmAsCategory(films, value.toLowerCase());
  }

  return filters;
};
