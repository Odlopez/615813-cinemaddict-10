import {render, remove} from '../utils/render';
import Sort from '../components/sort';
import Statistic from '../components/statistic';
import FilmsExtraList from '../components/films-extra-list';
import FilmsList from '../components/films-list';
import MovieController from './movie-controller';
import NoFilms from '../components/no-films';
import ReadMoreButton from '../components/read-more-button';
import {CARD_QUANTITY, extraListsOptions, EXTRA_CARD_QUANTITY} from '../constants';
import {sortFisherYates, sortFilms} from '../utils/common';

const {ratedTitle, ratedProperty, commentedTitle, commentedProperty} = extraListsOptions;

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

export default class PageController {
  constructor(container, movies, api) {
    this._container = container;
    this._api = api;

    this._movies = movies;
    this._counter = 0;
    this._filmList = null;
    this._filmListContainer = null;
    this._ratedExtraList = null;
    this._commentedExtraList = null;
    this._readMoreButton = new ReadMoreButton();
    this._sort = new Sort();
    this._statistic = new Statistic(movies);
    this._filterLinks = null;
    this._sortValue = null;
    this._renderedFilms = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onCardRemove = this._onCardRemove.bind(this);
    this._getSortFilmsCallback = this._getSortFilmsCallback.bind(this);
    this.render = this.render.bind(this);
    this._renderExtraLists = this._renderExtraLists.bind(this);

    this._movies.setFilterChangeHandler(this.render);
    this._movies.setDataChangeHandler(this._renderExtraLists);
  }

  /**
  * Перерисовываем в основном блоке весь соответствующий контент
  *
  */
  render() {
    this._statistic.renderChart();
    this._statistic.setHandler((evt) => {
      evt.preventDefault();

      this._statistic.rerender();
    });

    remove(this._sort);
    render(this._container, this._sort.getElement(), `beforebegin`);
    render(this._container, this._statistic.getElement(), `beforebegin`);

    this._sort.setHandler(this._getSortFilmsCallback());

    this._renderFilms();
  }

  /**
   * Возвращает массив данных фильтра с учетом сортировки
   *
   * @return {Array}
   */
  _getFilms() {
    const sortedFilms = this._movies.getFilms().slice();

    switch (this._sortValue) {
      case `date`:
        sortedFilms.sort((a, b) => +new Date(b.date) - +new Date(a.date));
        break;
      case `rating`:
        sortedFilms.sort((a, b) => b.rating - a.rating);
    }

    return sortedFilms;
  }

  /**
   * Отрисовывает блоки-контейнеры для карточек фильмов
   */
  _renderEmptyList() {
    const filmListInstance = new FilmsList();
    this._filmList = filmListInstance.getElement();
    this._filmListContainer = filmListInstance.getContainer();

    render(this._container, this._filmList);
  }

  /**
   * Отрисовывает одну карточку
   *
   * @param {Object} film данные одного фильма
   */
  _renderCard(film) {
    const filmController = new MovieController(this._filmListContainer, this._onDataChange, this._onViewChange, this._onCardRemove, this._api);
    filmController.render(film);
    this._renderedFilms.push(filmController);
  }

  /**
   * отрисовывает на странице порцию карточек с фильмами
   *
   * @param {Array} films массив объектов с данными о фильмах
   */
  _renderPortionOfCards(films) {
    if (!this._filmList) {
      return;
    }

    const portionfilms = films.slice(this._counter, this._counter + CARD_QUANTITY);

    portionfilms.forEach((item) => this._renderCard(item));

    this._counter += CARD_QUANTITY;
  }

  /**
   * Заполняет дополнительные блоки с карточками контентом
   *
   * @param {HTMLElement} container
   * @param {Array} films массив объектов с данными о фильмах
   */
  _fillsExstraList(container, films) {
    films.forEach((item) => {
      const filmController = new MovieController(container, this._onDataChange, this._onViewChange, this._onCardRemove, this._api);
      filmController.render(item);
      this._renderedFilms.push(filmController);
    });
  }

  /**
    * Генерирует разметку компонента "extra-list"
    *
    * @param {Array} films массив объектов с данными о фильмах
    * @param {String} sortProperty имя свойства, по которому сортируются карточки фильмов
    * @return {Array} отсортированный массив с данными о фильмах
    */
  _getFilmsExtraListData(films, sortProperty) {
    if (isNotIndex(films, sortProperty)) {
      return [];
    }

    if (isEqualRating(films, sortProperty)) {
      return sortFisherYates(films, true).slice(0, EXTRA_CARD_QUANTITY);
    }

    return sortFilms(films, sortProperty).slice(0, EXTRA_CARD_QUANTITY);
  }

  /**
   * Отрисовываем дополнительные блоки с карточками фильмов
   */
  _renderExtraLists() {
    this._clearExtraLists();

    const ratedExtraListInstance = new FilmsExtraList(ratedTitle);
    const commentedExtraListInstance = new FilmsExtraList(commentedTitle);

    this._ratedExtraList = ratedExtraListInstance.getElement();
    this._commentedExtraList = commentedExtraListInstance.getElement();

    const ratedFilms = this._getFilmsExtraListData(this._movies.getFilms(), ratedProperty);
    const commentedFilms = this._getFilmsExtraListData(this._movies.getFilms(), commentedProperty);
    const ratedContainer = ratedExtraListInstance.getContainer();
    const commentedContainer = commentedExtraListInstance.getContainer();

    render(this._container, this._ratedExtraList);
    render(this._container, this._commentedExtraList);

    if (ratedFilms.length) {
      this._fillsExstraList(ratedContainer, ratedFilms);
    }

    if (commentedFilms.length) {
      this._fillsExstraList(commentedContainer, commentedFilms);
    }
  }

  /**
   * Отрисовывает все блоки с карточками фильмов
   */
  _renderFilms() {
    this._clearAll();
    const films = this._getFilms();

    // если фильмов нет, отрисовываем другой шаблон
    if (!films || !films.length) {
      render(this._container, new NoFilms().getElement());
      return;
    }

    this._renderEmptyList();
    this._renderPortionOfCards(films);
    this._renderExtraLists();

    if (films.length > CARD_QUANTITY) {
      this._readMoreButton.getElement().addEventListener(`click`, () => {
        this._renderPortionOfCards(this._getFilms());

        if (this._counter >= this._getFilms().length) {
          remove(this._readMoreButton);
        }
      });

      render(this._filmList, this._readMoreButton.getElement());
    }
  }

  /**
   * Очищает дополнительные блоки с карточками фильмов
   */
  _clearExtraLists() {
    if (this._ratedExtraList) {
      this._ratedExtraList.remove();
    }

    if (this._commentedExtraList) {
      this._commentedExtraList.remove();
    }

    this._ratedExtraList = null;
    this._commentedExtraList = null;
  }

  /**
   * Очищает контентный блок, сбрасывает счетчик, удаляет ссылки на дочерние элементы
   */
  _clearAll() {
    this._clearExtraLists();
    this._container.innerHTML = ``;
    this._counter = 0;
    this._renderedFilms = [];

    this._filmList = null;
    this._filmListContainer = null;
    this._ratedExtraList = null;
    this._commentedExtraList = null;

    remove(this._readMoreButton);
  }

  /**
   * Возвращает callback для обработчика клика по кнопке сортировки
   *
   * @return {Function} функция-callback для обработчика клика по кнопке сортировки
   */
  _getSortFilmsCallback() {
    return (sortValue) => {
      this._sortValue = sortValue;

      this._renderFilms();
    };
  }

  /**
   * Отрисовывает новую карточку вместо удаленной
   */
  _onCardRemove() {
    const films = this._movies.getFilms();

    if (this._counter >= films.length) {
      return;
    }

    this._renderCard(films[this._counter]);

    if (this._counter >= films.length - 1) {
      remove(this._readMoreButton);
    }
  }

  /**
   * Перерисовывает карточки при изменении данных фильма
   *
   * @param {Object} filmController инстанс класса компонента фильма
   * @param {Object} newData новые данные фильма
   * @return {Promise}
   */
  _onDataChange(filmController, newData) {
    return this._api.updateFilm(newData.id, newData)
      .then((newFilm) => {
        this._movies.refreshFilm(newData.id, newFilm);
        return newFilm;
      })
      .then((newFilm) => {
        this._statistic.rerender();
        filmController.rerender(newFilm);
      });
  }

  /**
   * Вызывает у всех инстансов класса фильма метод setDefaultView при открытии попапа
   */
  _onViewChange() {
    this._renderedFilms.forEach((item) => {
      item.setDefaultView();
    });
  }
}
