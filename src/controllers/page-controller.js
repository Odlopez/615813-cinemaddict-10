import {render, remove} from '../utils/render';
import FilmsExtraList from '../components/films-extra-list';
import FilmsList from '../components/films-list';
import Card from '../components/card';
import FilmDetails from '../components/film-details';
import PopupController from './popup-controller';
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
  constructor(container) {
    this._container = container;

    this._counter = 0;
    this._filmList = null;
    this._ratedExtraList = null;
    this._commentedExtraList = null;
    this._ReadMoreButton = new ReadMoreButton();

    this._filterLinks = null;
  }

  /**
   * Отрисовывает блоки-контейнеры для карточек фильмов
   */
  renderEmptyLists() {
    this._filmList = new FilmsList().getElement();
    this._ratedExtraList = new FilmsExtraList(ratedTitle).getElement();
    this._commentedExtraList = new FilmsExtraList(commentedTitle).getElement();

    render(this._container, this._filmList);
    render(this._container, this._ratedExtraList);
    render(this._container, this._commentedExtraList);
  }

  /**
   * отрисовывает на странице порцию карточек с фильмами
   *
   * @param {Array} films массив объектов с данными о фильмах
   */
  renderPortionOfCards(films) {
    if (!this._filmList) {
      return;
    }

    const filmsListContainer = this._filmList.querySelector(`.films-list__container`);

    const portionfilms = films.slice(this._counter, this._counter + CARD_QUANTITY);

    portionfilms.forEach((item) => {
      render(filmsListContainer, this.getCard(item));
    });

    this._counter += CARD_QUANTITY;
  }

  /**
   * Заполняет дополнительные блоки с карточками контентом
   *
   * @param {Node} container
   * @param {Array} films массив объектов с данными о фильмах
   */
  fillsExstraList(container, films) {
    films.forEach((item) => {
      render(container, this.getCard(item));
    });
  }

  /**
    * Генерирует разметку компонента "extra-list"
    *
    * @param {Array} films массив объектов с данными о фильмах
    * @param {*} sortProperty имя свойства, по которому сортируются карточки фильмов
    * @return {Array} отсортированный массив с данными о фильмах
    */
  getFilmsExtraListData(films, sortProperty) {
    if (isNotIndex(films, sortProperty)) {
      return [];
    }

    if (isEqualRating(films, sortProperty)) {
      return sortFisherYates(films, true).slice(0, EXTRA_CARD_QUANTITY);
    }

    return sortFilms(films, sortProperty).slice(0, EXTRA_CARD_QUANTITY);
  }

  /**
   * Возвращает node-элемент карточки с подключенными обработчиками
   *
   * @param {Object} film объект с данными фильтра
   * @return {Node} элемент карточки
   */
  getCard(film) {
    const card = new Card(film);

    card.setHandler(() => {
      const popup = new PopupController(new FilmDetails(film));
      popup.setHandler();

      render(document.body, popup.getElement());
    });

    return card.getElement();
  }

  /**
  * Перерисовываем в основном блоке весь соответствующий контент
  *
  * @param {Array} films массив объектов с данными о фильмах
  */
  render(films) {
    this.clear();

    // если фильмов нет, отрисовываем другой шаблон
    if (!films || !films.length) {
      render(this._container, new NoFilms().getElement());
      return;
    }

    this.renderEmptyLists();

    const ratedFilms = this.getFilmsExtraListData(films, ratedProperty);
    const commentedFilms = this.getFilmsExtraListData(films, commentedProperty);
    const ratedContainer = this._ratedExtraList.querySelector(`.films-list__container`);
    const commentedContainer = this._commentedExtraList.querySelector(`.films-list__container`);

    this.renderPortionOfCards(films);

    if (ratedFilms.length) {
      this.fillsExstraList(ratedContainer, ratedFilms);
    }

    if (commentedFilms.length) {
      this.fillsExstraList(commentedContainer, commentedFilms);
    }

    if (films.length > CARD_QUANTITY) {
      this._ReadMoreButton.getElement().addEventListener(`click`, () => {
        this.renderPortionOfCards(films);

        if (this._counter >= films.length) {
          remove(this._ReadMoreButton);
        }
      });

      render(this._filmList, this._ReadMoreButton.getElement());
    }
  }

  /**
   * Очищает контентный блок, сбрасывает счетчик, удаляет ссылки на дочерние элементы
   */
  clear() {
    this._container.innerHTML = ``;
    this._counter = 0;

    this._filmList = null;
    this._ratedExtraList = null;
    this._commentedExtraList = null;
  }
}
