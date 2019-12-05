import {fillCardsMarkup} from './card';
import {sortDataFilmsArray, sortFisherYates} from '../utils';
import {EXTRA_CARD_QUANTITY} from '../constants';

/**
 * Проверяет массив с данными карточек на присутствие хотя бы одного объекта с ненулевым показателем, заданным вторым аргументом
 *
 * @param {Array} filmsData массив объектов с данными о фильмах в пунктах фильтра
 * @param {String} sortProperty имя свойства, по которому идет проверка массива с данными
 * @return {Boolean}
 */
const isNotIndex = (filmsData, sortProperty) => !filmsData.filter((item) => item[sortProperty]).length;

/**
 * Проверяет массив с данными карточек фильмов на одинаковость показателя, заданного во втором аргументе
 *
 * @param {Array} filmsData массив объектов с данными о фильмах в пунктах фильтра
 * @param {String} sortProperty имя свойства, по которому идет проверка массива с данными
 * @return {Boolean}
 */
const isEqualRating = (filmsData, sortProperty) => filmsData.every((item, i, arr) => item[sortProperty] === (arr[i + 1] ? arr[i + 1][sortProperty] : item[sortProperty]));

/**
 *
 * @param {String} title заголовок компонента extra-list
 * @param {Array} cardsData массив с данными
 * @return {String}
 */
const getFilmsExtraListMarkup = (title, cardsData) => `
  <section class="films-list--extra">
    <h2 class="films-list__title">${title}</h2>

    <div class="films-list__container">
      ${fillCardsMarkup(cardsData)}
    </div>
  </section>
`;

/**
  * Генерирует разметку компонента "extra-list"
  *
  * @param {*} title заголовок компонента
  * @param {*} sortProperty имя свойства, по которому сортируются карточки фильмов
  * @param {Array} filmsData массив с данными карточек фильмов
  * @return {String} строкове представление разметки компонента extra-list
  */
export const getFilmsExtraListComponent = (title, sortProperty, filmsData) => {
  if (isNotIndex(filmsData, sortProperty)) {
    return ``;
  }

  if (isEqualRating(filmsData, sortProperty)) {
    filmsData = sortFisherYates(filmsData, true).slice(0, EXTRA_CARD_QUANTITY);
  } else {
    filmsData = sortDataFilmsArray(filmsData, sortProperty).slice(0, EXTRA_CARD_QUANTITY);
  }

  return getFilmsExtraListMarkup(title, filmsData);
};
