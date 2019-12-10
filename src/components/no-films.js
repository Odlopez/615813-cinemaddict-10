import AbstractComponent from './abstract-component.js';

/**
 * Генерирует разметку основого блока с контентом
 *
 * @return {String} строкове представление разметки блока фильмов
 */
const getNoFilmsMarkup = () => `
  <section class="films-list">
    <h2 class="films-list__title">There are no movies in our database</h2>
  </section>
`;

export default class NoFilms extends AbstractComponent {
  /**
   * Генерирует разметку блока оповещения об отсутствии фильмов
   *
   * @return {String} возвращщает разметку компонента блока оповещения об отсутствии фильмов
   */
  getTemplate() {
    return getNoFilmsMarkup();
  }
}
