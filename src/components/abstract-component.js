import {createElement} from '../utils/render';

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  /**
   * Возвращает ссылку на node-элемент
   *
   * @return {HTMLElement}
   */
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  /**
   * Удаляет ссылку на элемент
   */
  removeElement() {
    this._element = null;
  }
}

