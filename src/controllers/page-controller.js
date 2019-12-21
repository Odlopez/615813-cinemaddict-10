import {render, remove} from '../utils/render';
import Sort from '../components/sort';
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
  constructor(container, movies) {
    this._container = container;

    this._movies = movies;
    this._films = [];
    this._counter = 0;
    this._filmList = null;
    this._ratedExtraList = null;
    this._commentedExtraList = null;
    this._ReadMoreButton = new ReadMoreButton();
    this._Sort = new Sort();
    this._filterLinks = null;
    this._renderedFilms = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this.render = this.render.bind(this);
    this.renderExtraLists = this.renderExtraLists.bind(this);

    this._movies.setFilterChangeHandler(this.render);
    this._movies.setDataChangeHandler(this.renderExtraLists);
  }

  get films() {
    return this._films;
  }

  set films(films) {
    this._films = films;
  }

  /**
   * Отрисовывает блоки-контейнеры для карточек фильмов
   */
  _renderEmptyList() {
    this._filmList = new FilmsList().getElement();

    render(this._container, this._filmList);
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

    const filmsListContainer = this._filmList.querySelector(`.films-list__container`);

    const portionfilms = films.slice(this._counter, this._counter + CARD_QUANTITY);

    portionfilms.forEach((item) => {
      const filmController = new MovieController(filmsListContainer, this._onDataChange, this._onViewChange);
      filmController.render(item);
      this._renderedFilms.push(filmController);
    });

    this._counter += CARD_QUANTITY;
  }

  /**
   * Заполняет дополнительные блоки с карточками контентом
   *
   * @param {Node} container
   * @param {Array} films массив объектов с данными о фильмах
   */
  _fillsExstraList(container, films) {
    films.forEach((item) => {
      const filmController = new MovieController(container, this._onDataChange, this._onViewChange);
      filmController.render(item);
      this._renderedFilms.push(filmController);
    });
  }

  /**
   * Отрисовываем дополнительные блоки с карточками фильмов
   */
  renderExtraLists() {
    this._clearExtraLists();

    this._ratedExtraList = new FilmsExtraList(ratedTitle).getElement();
    this._commentedExtraList = new FilmsExtraList(commentedTitle).getElement();

    const ratedFilms = this._getFilmsExtraListData(this._movies.getFilms(), ratedProperty);
    const commentedFilms = this._getFilmsExtraListData(this._movies.getFilms(), commentedProperty);
    const ratedContainer = this._ratedExtraList.querySelector(`.films-list__container`);
    const commentedContainer = this._commentedExtraList.querySelector(`.films-list__container`);

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
    * Генерирует разметку компонента "extra-list"
    *
    * @param {Array} films массив объектов с данными о фильмах
    * @param {*} sortProperty имя свойства, по которому сортируются карточки фильмов
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
   * Возвращает callback для обработчика клика по кнопке сортировки
   *
   * @param {Array} films массив объектов с данными о фильмах
   * @return {Function} функция-callback для обработчика клика по кнопке сортировки
   */
  _getSortFilmsCallback(films) {
    return (sortValue) => {
      let sortedFilms = films.slice();

      switch (sortValue) {
        case `date`:
          sortedFilms.sort((a, b) => b.date - a.date);
          break;
        case `rating`:
          sortedFilms.sort((a, b) => b.rating - a.rating);
      }

      this._renderFilms(sortedFilms);
    };
  }

  /**
   * Перерисовывает карточки при изменении данных фильма
   *
   * @param {Object} filmController инстанс класса компонента фильма
   * @param {Object} newData новые данные фильма
   */
  _onDataChange(filmController, newData) {
    this._movies.refreshFilm(newData.id, newData);

    filmController.rerender(newData);
  }

  /**
   * Вызывает у всех инстансов класса фильма метод setDefaultView при открытии попапа
   */
  _onViewChange() {
    this._renderedFilms.forEach((item) => {
      item.setDefaultView();
    });
  }

  /**
   * Отрисовывает все блоки с карточками фильмов
   *
   * @param {Array} films массив объектов с данными о фильмах
   */
  _renderFilms(films) {
    this._clearAll();

    // если фильмов нет, отрисовываем другой шаблон
    if (!films || !films.length) {
      render(this._container, new NoFilms().getElement());
      return;
    }

    this._renderEmptyList();
    this._renderPortionOfCards(films);
    this.renderExtraLists();

    if (films.length > CARD_QUANTITY) {
      this._ReadMoreButton.getElement().addEventListener(`click`, () => {
        this._renderPortionOfCards(films);

        if (this._counter >= films.length) {
          remove(this._ReadMoreButton);
        }
      });

      render(this._filmList, this._ReadMoreButton.getElement());
    }
  }

  /**
  * Перерисовываем в основном блоке весь соответствующий контент
  *
  */
  render() {
    remove(this._Sort);
    render(this._container, this._Sort.getElement(), `beforebegin`);

    this._Sort.setHandler(this._getSortFilmsCallback(this._movies.getFilms()));

    this._renderFilms(this._movies.getFilms());
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
    this._ratedExtraList = null;
    this._commentedExtraList = null;
    remove(this._ReadMoreButton);
  }
}
