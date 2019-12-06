import {createElement} from '../utils';

/**
 * @return {String} строковое представление разметки кнопки Show more
 */
export const getReadMoreButtonMarkup = () => `
  <button class="films-list__show-more">Show more</button>
`;

export default class ReadMoreButton {
  constructor() {
    this._element = null;
  }

  /**
   * @return {String} строковое представление разметки кнопки Show more
   */
  getTemplate() {
    return getReadMoreButtonMarkup();
  }

  /**
   * Возвращает ссылку на node-элемент кнопки Show more
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
   * Очищает ссылку на node-элемент кнопки Show more
   */
  removeElement() {
    this._element = null;
  }
}
