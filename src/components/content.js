import {createElement, render} from '../utils';
import FilmsExtraList from './films-extra-list';
import FilmsList from './films-list';
import Card from './card';
import NoFilms from './no-films';
import ReadMoreButton from './read-more-button';
import {CARD_QUANTITY, extraListsOptions, EXTRA_CARD_QUANTITY} from '../constants';
import {sortFisherYates, sortFilms} from '../utils';

const {ratedTitle, ratedProperty, commentedTitle, commentedProperty} = extraListsOptions;

/**
 * Генерирует разметку основого блока с контентом
 *
 * @return {String} строкове представление разметки блока фильмов
 */
export const getBlockFilmsMarkup = () => `
  <section class="films">
   </section>
`;

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

export default class ContentBlock {
  constructor(films) {
    this._element = null;
    this._films = films;
    this._counter = 0;
    this._filmList = null;
    this._ratedExtraList = null;
    this._commentedExtraList = null;
    this._readMoreButton = null;

    this.onReadMoreButtonClick = this.onReadMoreButtonClick.bind(this);
  }

  get films() {
    return this._films;
  }

  set films(val) {
    this._films = val;
  }

  /**
   * Генерирует разметку контентного блока
   *
   * @return {String} возвращщает разметку компонента контентного блока
   */
  getTemplate() {
    return getBlockFilmsMarkup();
  }

  /**
   * Возвращает ссылку на node-элемент контентного блока
   *
   * @return {Node}
   */
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());

      this.renderContent();
    }

    return this._element;
  }

  /**
   * Отрисовывает блоки-контейнеры для карточек фильмов
   */
  renderEmptyLists() {
    this._filmList = new FilmsList().getElement();
    this._ratedExtraList = new FilmsExtraList(ratedTitle).getElement();
    this._commentedExtraList = new FilmsExtraList(commentedTitle).getElement();

    render(this._element, this._filmList);
    render(this._element, this._ratedExtraList);
    render(this._element, this._commentedExtraList);
  }

  /**
   * отрисовывает на странице порцию карточек с фильмами
   */
  renderPortionOfCards() {
    if (!this._filmList) {
      return;
    }

    const filmsListContainer = this._filmList.querySelector(`.films-list__container`);

    const portionfilms = this.films.slice(this._counter, this._counter + CARD_QUANTITY);

    portionfilms.forEach((item) => {
      render(filmsListContainer, new Card(item).getElement());
    });

    this._counter += CARD_QUANTITY;
  }

  /**
   * Заполняет дополнительные блоки с карточками контентом
   *
   * @param {Node} container
   * @param {Array} films
   */
  fillsExstraList(container, films) {
    films.forEach((item) => {
      render(container, new Card(item).getElement());
    });
  }

  /**
   * Перерисовываем в основном блоке весь соответствующий контент
   */
  renderContent() {
    this._element.innerHTML = ``;
    this._counter = 0;

    // если фильмов нет, отрисовываем другой шаблон
    if (!this._films || !this._films.length) {
      render(this._element, new NoFilms().getElement());
      return;
    }

    this.renderEmptyLists();

    const ratedFilms = this.getFilmsExtraListData(ratedProperty);
    const commentedFilms = this.getFilmsExtraListData(commentedProperty);
    const ratedContainer = this._ratedExtraList.querySelector(`.films-list__container`);
    const commentedContainer = this._commentedExtraList.querySelector(`.films-list__container`);

    this.renderPortionOfCards();

    if (ratedFilms.length) {
      this.fillsExstraList(ratedContainer, ratedFilms);
    }

    if (commentedFilms.length) {
      this.fillsExstraList(commentedContainer, commentedFilms);
    }

    if (this.films.length > CARD_QUANTITY) {
      this._readMoreButton = new ReadMoreButton().getElement();
      this._readMoreButton.addEventListener(`click`, this.onReadMoreButtonClick);

      render(this._filmList, this._readMoreButton);
    }
  }

  /**
  * Генерирует разметку компонента "extra-list"
  *
  * @param {*} sortProperty имя свойства, по которому сортируются карточки фильмов
  * @return {Array} строкове представление разметки компонента extra-list
  */
  getFilmsExtraListData(sortProperty) {
    if (isNotIndex(this.films, sortProperty)) {
      return [];
    }

    if (isEqualRating(this.films, sortProperty)) {
      return sortFisherYates(this.films, true).slice(0, EXTRA_CARD_QUANTITY);
    }

    return sortFilms(this.films, sortProperty).slice(0, EXTRA_CARD_QUANTITY);
  }

  /**
   * Функция-callback для обработчика клика по кнопке Show More
   *
   * @param {Event} evt
   */
  onReadMoreButtonClick(evt) {
    this.renderPortionOfCards(this.films);

    if (this._counter >= this.films.length) {
      evt.currentTarget.removeEventListener(`click`, this.onReadMoreButtonClick);
      evt.currentTarget.remove();
    }
  }

  /**
   * Очищает ссылку на node-элемент контентного блока
   */
  removeElement() {
    this._element = null;
  }
}
