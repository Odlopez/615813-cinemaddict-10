import {filterItems} from '../constants';
import {getRandomNumber} from '../utils';

/**
 * Генерирует данные для пунктов меню фильтра
 *
 * @return {Object} сгенерированные моковые данные для меню фильтров
 */
export const getFiltersData = () => {
  const filtersData = {};

  for (const value of filterItems) {
    filtersData[value] = getRandomNumber(20);
  }

  return filtersData;
};
