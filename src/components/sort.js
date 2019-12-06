import {createElement} from '../utils';

export const getSortMarkup = () => `
  <ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>
`;

export default class Sort {
  constructor() {
    this._element = null;
  }

  /**
   * Генерирует разметку всего меню сортировки
   *
   * @return {String} возвращщает разметку компонента сортировки
   */
  getTemplate() {
    return getSortMarkup();
  }

  /**
   * Возвращает ссылку на node-элемент сортировки
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
   * Очищает ссылку на node-элемент сортировки
   */
  removeElement() {
    this._element = null;
  }
}
