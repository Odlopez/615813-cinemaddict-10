import {fillCardsMarkup} from './card';
import {sortFilms, sortFisherYates} from '../utils';
import {EXTRA_CARD_QUANTITY} from '../constants';

/**
 * Проверяет массив с данными карточек на присутствие хотя бы одного объекта с ненулевым показателем, заданным вторым аргументом
 *
 * @param {Array} films массив объектов с данными о фильмах в пунктах фильтра
 * @param {String} sortProperty имя свойства, по которому идет проверка массива с данными
 * @return {Boolean}
 */
const isNotIndex = (films, sortProperty) => !films.filter((item) => item[sortProperty]).length;

/**
 * Проверяет массив с данными карточек фильмов на одинаковость показателя, заданного во втором аргументе
 *
 * @param {Array} films массив объектов с данными о фильмах в пунктах фильтра
 * @param {String} sortProperty имя свойства, по которому идет проверка массива с данными
 * @return {Boolean}
 */
const isEqualRating = (films, sortProperty) => films.every((item, i, arr) => item[sortProperty] === (arr[i + 1] ? arr[i + 1][sortProperty] : item[sortProperty]));

/**
 *
 * @param {String} title заголовок компонента extra-list
 * @param {Array} cards массив с данными
 * @return {String}
 */
const getFilmsExtraListMarkup = (title, cards) => `
  <section class="films-list--extra">
    <h2 class="films-list__title">${title}</h2>

    <div class="films-list__container">
      ${fillCardsMarkup(cards)}
    </div>
  </section>
`;

/**
  * Генерирует разметку компонента "extra-list"
  *
  * @param {*} title заголовок компонента
  * @param {*} sortProperty имя свойства, по которому сортируются карточки фильмов
  * @param {Array} films массив с данными карточек фильмов
  * @return {String} строкове представление разметки компонента extra-list
  */
export const getFilmsExtraListComponent = (title, sortProperty, films) => {
  if (isNotIndex(films, sortProperty)) {
    return ``;
  }

  if (isEqualRating(films, sortProperty)) {
    films = sortFisherYates(films, true).slice(0, EXTRA_CARD_QUANTITY);
  } else {
    films = sortFilms(films, sortProperty).slice(0, EXTRA_CARD_QUANTITY);
  }

  return getFilmsExtraListMarkup(title, films);
};
