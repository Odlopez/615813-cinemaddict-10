import {filterNames} from './constants';
import {renderFilms} from './components/render-cards';

let filterLinks = null;
let filmsCopy = null;

/**
 * Сбрасывает активный класс у всех ссылок фильтра
 */
const resetActiveClass = () => {
  filterLinks.forEach((item) => item.classList.remove(`main-navigation__item--active`));
};

/**
 * Сортирует карточки фильмов по определенному значению из фильтров
 *
 * @param {Strins} name
 * @return {Array} отсортированный массив с данными фильмов
 */
const getSortfilms = (name) => filterNames.find((item) => item.toLowerCase() === name.toLowerCase()) ? filmsCopy.filter((item) => item[name]) : filmsCopy;

/**
 * Функция-callback для обработчика клика по ссылке фильтра.
 * Фильтрует карточки по заданному параметру
 *
 * @param {Event} evt
 */
const onFilterLinkClick = (evt) => {
  evt.preventDefault();

  const filterValue = evt.currentTarget.href.match(/#.{1,}/)[0].slice(1);
  const filterfilms = getSortfilms(filterValue);

  resetActiveClass();
  renderFilms(filterfilms);
  evt.currentTarget.classList.add(`main-navigation__item--active`);
};

/**
 * Записывает данные фильмов во внутреннюю переменную и развешивает обработчики на ссылки фильтра
 *
 * @param {Array} films массив с данными карточек фильмов
 */
export const filterInit = (films) => {
  filmsCopy = films;
  filterLinks = document.querySelectorAll(`.main-navigation__item:not(.main-navigation__item--additional)`);

  filterLinks.forEach((item) => item.addEventListener(`click`, onFilterLinkClick));
};
