import {filterNames} from '../constants';

export default class Movies {
  constructor(films) {
    this._films = films;
    this.filterValue = `all`;

    this._onDataChangeHandlers = new Set();
  }

  /**
   * Возвращает массив с данными фильмов
   *
   * @return {Array} массив с данными фильмов
   */
  getBaseFilms() {
    return this._films;
  }

  /**
   * Возвращает массив с данными фильмов в зависимости от выбранного фильтра
   *
   * @return {Array} массив с данными фильмов в зависимости от выбранного фильтра
   */
  getFilms() {
    return filterNames.find((item) => item.toLowerCase() === this.filterValue.toLowerCase()) ? this._films.filter((item) => item[this.filterValue]) : this._films;
  }

  /**
   * Перезаписывает фильмы
   *
   * @param {Array} films
   */
  setFilms(films) {
    this._films = films;

    for (const handler of this._onDataChangeHandlers) {
      handler(this._films);
    }
  }

  /**
   * Перезаписывает значение выбранного фильтра
   *
   * @param {String} value
   */
  setFilterValue(value) {
    this.filterValue = value;

    this._onFilterChange();
  }

  /**
   * Записывает функцию-хэндлер для смены фильтра
   *
   * @param {Function} handler
   */
  setFilterChangeHandler(handler) {
    this._onFilterChange = handler;
  }

  /**
   * Записывает функцию-хэндлер для смены данных
   *
   * @param {Function} handler
   */
  setDataChangeHandler(handler) {
    this._onDataChangeHandlers.add(handler);
  }

  /**
   * Обновляет данные фильмов
   *
   * @param {String} id
   * @param {Object} newFilm
   */
  refreshFilm(id, newFilm) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newFilm, this._films.slice(index + 1));

    for (const handler of this._onDataChangeHandlers) {
      handler(this._films);
    }
  }
}
