import AbstractComponent from './abstract-component.js';

/**
 * Генерирует разметку основного списка карточек фильмов
 *
 * @return {String} строковое представление разметки списка фильмов
 */
const getFilmsListMarkup = () => `
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
      </div>
    </section>
`;

export default class FilmsList extends AbstractComponent {
  /**
   * Генерирует разметку основного списка карточек фильмов
   *
   * @return {String} строковое представление разметки списка фильмов
   */
  getTemplate() {
    return getFilmsListMarkup();
  }
}
