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
