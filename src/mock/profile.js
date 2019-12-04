import {ratings} from '../constants';

/**
 * Преобразовывает количество просмотренных фильмов в строковое представление рейтинга пользователя
 *
 * @param {Number} filmsQuantity количество просмотренных фильмов
 * @return {String} строковое представление рейтинга пользователя
 */
const getStringRating = (filmsQuantity) => {
  for (const [key, value] of ratings) {
    if (filmsQuantity <= +key) {
      return value;
    }
  }

  return ``;
};

export {getStringRating};
