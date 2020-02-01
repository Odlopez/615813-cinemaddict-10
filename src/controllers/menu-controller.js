import {render} from '../utils/render';
import Menu from '../components/menu';
import {countsFilmAsCategory} from '../utils/common';
import {filterNames} from '../constants';

export default class MenuController {
  constructor(container, movies) {
    this._container = container;
    this._movies = movies;

    this._updatFilmQuantity = this._updatFilmQuantity.bind(this);

    this._movies.setDataChangeHandler(this._updatFilmQuantity);
  }

  /**
   * Удаляет со страницы отрисованное меню фильтров
   */
  _removeOldMenu() {
    const oldMenu = document.querySelector(`.main-navigation`);

    if (oldMenu) {
      oldMenu.remove();
    }
  }

  /**
   * Обновляет количество фильмов в соответствующих категориях фильтра
   */
  _updatFilmQuantity() {
    filterNames.forEach((item) => {
      const activeLink = document.querySelector(`.main-navigation__item[href="#${item.toLocaleLowerCase()}"]`);

      if (activeLink) {
        activeLink.querySelector(`.main-navigation__item-count`).textContent = countsFilmAsCategory(this._movies.getBaseFilms(), item.toLocaleLowerCase());
      }
    });
  }

  /**
   * Отрисовывает компонент меню на странице
   *
   * @param {Array} films массив объектов с данными о фильмах
   */
  render(films) {
    this._removeOldMenu();

    const menuInstance = new Menu(films);
    render(this._container, menuInstance.getElement(), `beforebegin`);

    menuInstance.setHandler((evt) => {
      evt.preventDefault();

      const filterLinks = document.querySelectorAll(`.main-navigation__item:not(.main-navigation__item--additional)`);
      const filterValue = evt.currentTarget.href.match(/#.{1,}/)[0].slice(1);

      filterLinks.forEach((item) => item.classList.remove(`main-navigation__item--active`));
      evt.currentTarget.classList.add(`main-navigation__item--active`);

      this._movies.setFilterValue(filterValue);
    });

    menuInstance.setAdditionalHandler((evt) => {
      evt.preventDefault();

      this._container.closest(`.main`).classList.toggle(`main--statistic`);
    });
  }
}
