import {getFilmsListMarkup} from './films-list';
import {getFilmsExtraListMarkup} from './films-extra-list';

export const getContentMarkup = (options) => `
  <section class="films">
    ${getFilmsListMarkup(options.cardsCount)}
    ${getFilmsExtraListMarkup(options.leftExtraTitle, options.leftExtraCardsCount)}
    ${getFilmsExtraListMarkup(options.rightExtraTitle, options.rightExtraCardsCount)}
  </section>
`;
