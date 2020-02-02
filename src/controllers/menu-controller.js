import {render} from '../utils/render';
import Menu from '../components/menu';
import {countsFilmAsCategory} from '../utils/common';
import {filterNames, MENU_LINK_ACTIVE_CLASS_NAME, MAIN_STATISTIC_CLASS_NAME} from '../constants';

export default class MenuController {
  constructor(container, movies) {
    this._container = container;
    this._movies = movies;
    this._menu = null;

    this._updatFilmQuantity = this._updatFilmQuantity.bind(this);

    this._movies.setDataChangeHandler(this._updatFilmQuantity);
  }

  /**
   * Отрисовывает компонент меню на странице
   *
   * @param {Array} films массив объектов с данными о фильмах
   */
  render(films) {
    this._removeOldMenu();

    this._menu = new Menu(films);
    render(this._container, this._menu.getElement(), `beforebegin`);

    this._menu.setHandler((evt) => {
      evt.preventDefault();

      const filterLinks = this._menu.getAllFilterLinks();
      const filterValue = evt.currentTarget.href.match(/#.{1,}/)[0].slice(1);

      filterLinks.forEach((item) => item.classList.remove(MENU_LINK_ACTIVE_CLASS_NAME));
      evt.currentTarget.classList.add(MENU_LINK_ACTIVE_CLASS_NAME);

      this._movies.setFilterValue(filterValue);
    });

    this._menu.setAdditionalHandler((evt) => {
      evt.preventDefault();

      this._container.classList.toggle(MAIN_STATISTIC_CLASS_NAME);
    });
  }

  /**
   * Удаляет со страницы отрисованное меню фильтров
   */
  _removeOldMenu() {
    if (this._menu) {
      this._menu.getElement().remove();
      this._menu = null;
    }
  }

  /**
   * Обновляет количество фильмов в соответствующих категориях фильтра
   */
  _updatFilmQuantity() {
    filterNames.forEach((item) => {
      const filterLink = this._menu.getFilterLink(item);

      if (filterLink) {
        this._menu.getFilterLinkCountElement(filterLink).textContent = countsFilmAsCategory(this._movies.getBaseFilms(), item.toLocaleLowerCase());
      }
    });
  }
}
