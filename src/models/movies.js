import {filterNames} from '../constants';

export default class Movies {
  constructor(films) {
    this._films = films;
    this.filterValue = `all`;

    this._onDataChangeHandlers = new Set();
  }

  getBaseFilms() {
    return this._films;
  }

  getFilms() {
    return filterNames.find((item) => item.toLowerCase() === this.filterValue.toLowerCase()) ? this._films.filter((item) => item[this.filterValue]) : this._films;
  }

  setFilms(films) {
    this._films = films;

    for (const handler of this._onDataChangeHandlers) {
      handler(this._films);
    }
  }

  setFilterValue(value) {
    this.filterValue = value;

    this._onFilterChange();
  }

  setFilterChangeHandler(handler) {
    this._onFilterChange = handler;
  }

  setDataChangeHandler(handler) {
    this._onDataChangeHandlers.add(handler);
  }

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
