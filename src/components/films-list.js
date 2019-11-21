import {fillCardsMarkup} from './card';
import {getReadMoreButtonMarkup} from './read-more-button';

export const getFilmsListMarkup = (cardsQuantity) => `
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">
        ${fillCardsMarkup(cardsQuantity)}
      </div>

      ${getReadMoreButtonMarkup()}
    </section>
`;
