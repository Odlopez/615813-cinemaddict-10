import {filterItems} from '../constants';

/**
 *
 * @param {Array} filmsData
 * @param {String} category
 */
const countsFilmAsCategory = (filmsData, category) => {
  return filmsData.reduce((hoarder, item) => {
    hoarder += item[category] ? 1 : 0;
    return hoarder;
  }, 0);
};

/**
 * Генерирует данные для пунктов меню фильтра
 *
 * @return {Object} сгенерированные моковые данные для меню фильтров
 */
export const getFiltersData = (filmsData) => {
  const filtersData = {};

  for (const value of filterItems) {
    filtersData[value] = countsFilmAsCategory(filmsData, value.toLowerCase());
  }

  return filtersData;
};
