import {createElement} from '../utils';

/**
 *
 * @param {String} title заголовок компонента extra-list
 * @return {String}
 */
const getFilmsExtraListMarkup = (title) => `
  <section class="films-list--extra">
    <h2 class="films-list__title">${title}</h2>
    <div class="films-list__container">
    </div>
  </section>
`;

export default class FilmsExtraList {
  constructor(title, films) {
    this._element = null;
    this._films = films;
    this._title = title;
  }

  /**
   * Генерирует разметку дополнительного списка карточек фильмов
   *
   * @return {String} строкое представление разметки дополнительного списка фильмов
   */
  getTemplate() {
    return getFilmsExtraListMarkup(this._title);
  }

  /**
   * Возвращает ссылку на node-элемент дополнительного списка фильмов
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
   * Возвращает ссылку на node-элемент контейнера фильмов
   *
   * @return {Node}
   */
  getContainer() {
    return this._container;
  }

  /**
   * Очищает ссылку на node-элемент дополнительного списка фильмов
   */
  removeElement() {
    this._element = null;
  }
}
