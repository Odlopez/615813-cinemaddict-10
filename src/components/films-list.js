import {fillCardsMarkup} from './card';
import {getReadMoreButtonMarkup} from './read-more-button';

/**
 * Генерирует разметку основного списка карточек фильмов
 *
 * @param {*} cardsData массив с порцией данных карточек фильмов
 * @param {*} isMoreButton флаг необходимости отрисовывать кнопку 'show more'
 * @return {String} строкое представление разметки списка фильмов
 */
export const getFilmsListMarkup = (cardsData, isMoreButton) => `
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">
        ${fillCardsMarkup(cardsData)}
      </div>

      ${isMoreButton ? getReadMoreButtonMarkup() : ``}
    </section>
`;
