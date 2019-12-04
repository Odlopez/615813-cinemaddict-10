import {renderFilms} from './components/render-cards';

let filterLinks = null;
let films = null;

/**
 * Сбрасывает активный класс у всех ссылок фильтра
 */
const resetActiveClass = () => {
  filterLinks.forEach((item) => item.classList.remove(`main-navigation__item--active`));
};

const getSortFilmsData = (name) => {
  switch (name) {
    case `watchlist`:
      return films.filter((item) => item.watchlist);
    case `history`:
      return films.filter((item) => item.history);
    case `favorites`:
      return films.filter((item) => item.favorites);
  }

  return films;
};

/**
 * Функция-callback для обработчика клика по ссылке фильтра.
 * Фильтрует карточки по заданному параметру
 *
 * @param {Event} evt
 */
const onFilterLinkClick = (evt) => {
  evt.preventDefault();

  const filterValue = evt.currentTarget.href.match(/#.{1,}/)[0].slice(1);
  const filterFilmsData = getSortFilmsData(filterValue);

  resetActiveClass();
  renderFilms(filterFilmsData);
  evt.currentTarget.classList.add(`main-navigation__item--active`);
};

/**
 * Записывает данные фильмов во внутреннюю переменную и развешивает обработчики на ссылки фильтра
 *
 * @param {Array} filmsData массив с данными карточек фильмов
 */
const filterInit = (filmsData) => {
  films = filmsData;
  filterLinks = Array.from(document.querySelectorAll(`.main-navigation__item:not(.main-navigation__item--additional)`));

  filterLinks.forEach((item) => item.addEventListener(`click`, onFilterLinkClick));
};

export {filterInit};
