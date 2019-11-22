import {fillCardsMarkup} from './card';

export const getFilmsExtraListMarkup = (title, cardsQuantity) => `
  <section class="films-list--extra">
    <h2 class="films-list__title">${title}</h2>

    <div class="films-list__container">
      ${fillCardsMarkup(cardsQuantity)}
    </div>
  </section>
`;
