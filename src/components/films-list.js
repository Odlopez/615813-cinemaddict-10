import {createElement} from '../utils';

/**
 * Генерирует разметку основного списка карточек фильмов
 *
 * @return {String} строкое представление разметки списка фильмов
 */
export const getFilmsListMarkup = () => `
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
      </div>
    </section>
`;

export default class FilmsList {
  constructor() {
    this._element = null;
  }

  /**
   * Генерирует разметку основного списка карточек фильмов
   *
   * @return {String} строкое представление разметки списка фильмов
   */
  getTemplate() {
    return getFilmsListMarkup();
  }

  /**
   * Возвращает ссылку на node-элемент списка фильмов
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
   * Очищает ссылку на node-элемент списка фильмов
   */
  removeElement() {
    this._element = null;
  }
}
