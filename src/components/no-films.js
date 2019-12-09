import {createElement} from '../utils';

/**
 * Генерирует разметку основого блока с контентом
 *
 * @return {String} строкове представление разметки блока фильмов
 */
export const getNoFilmsMarkup = () => `
  <section class="films-list">
    <h2 class="films-list__title">There are no movies in our database</h2>
  </section>
`;

export default class NoFilms {
  constructor() {
    this._element = null;
  }

  /**
   * Генерирует разметку блока оповещения об отсутствии фильмов
   *
   * @return {String} возвращщает разметку компонента блока оповещения об отсутствии фильмов
   */
  getTemplate() {
    return getNoFilmsMarkup();
  }

  /**
   * Возвращает ссылку на node-элемент блока оповещения об отсутствии фильмов
   *
   * @return {Node}
   */
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  /**
   * Очищает ссылку на node-элемент блока оповещения об отсутствии фильмов
   */
  removeElement() {
    this._element = null;
  }
}
