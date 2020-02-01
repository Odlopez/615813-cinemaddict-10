import AbstractComponent from './abstract-component.js';

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

export default class FilmsExtraList extends AbstractComponent {
  constructor(title, films) {
    super();

    this._films = films;
    this._title = title;
  }

  /**
   * Генерирует разметку дополнительного списка карточек фильмов
   *
   * @return {String} строковое представление разметки дополнительного списка фильмов
   */
  getTemplate() {
    return getFilmsExtraListMarkup(this._title);
  }

  /**
   * Возвращает ссылку на элемент контейнера
   *
   * @return {HTMLElement}
   */
  getContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}
