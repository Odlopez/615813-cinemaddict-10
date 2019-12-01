import {filterItems} from '../constants';

/**
 * Подсчитывает в массиве данных количество фильмов, соответствующих заданной категории
 *
 * @param {Array} filmsData массив с данными карточек фильмов
 * @param {String} category категория, по которой фильтруем данные фильмов
 * @return {Number} количество фильмов соответстующей категории
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
 * @param {Array} filmsData массив с данными карточек фильмов
 * @return {Object}
 */
const getFiltersData = (filmsData) => {
  const filtersData = {};

  for (const value of filterItems) {
    filtersData[value] = countsFilmAsCategory(filmsData, value.toLowerCase());
  }

  return filtersData;
};

export {getFiltersData};
