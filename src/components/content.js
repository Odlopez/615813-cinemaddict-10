import {getFilmsListMarkup} from './films-list';
import {getFilmsExtraListComponent} from './films-extra-list';
import {CARD_QUANTITY} from '../constants';

/**
 *
 * @param {Array} filmsData
 * @param {Object} options
 * @return {String} строкове представление разметки контента
 */
export const getContentComponent = (filmsData, options) => {
  const {ratedTitle, ratedProperty, commentedTitle, commentedProperty} = options;
  const portionFilmsdata = filmsData.slice(0, CARD_QUANTITY);
  const isMoreButton = filmsData.length > CARD_QUANTITY;

  return `
  <section class="films">
     ${getFilmsListMarkup(portionFilmsdata, isMoreButton)}
     ${getFilmsExtraListComponent(ratedTitle, ratedProperty, filmsData)}
     ${getFilmsExtraListComponent(commentedTitle, commentedProperty, filmsData)}
   </section>
 `;
};


