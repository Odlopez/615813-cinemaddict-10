import {getSearchMarkup} from './components/search';
import {getProfileComponent} from './components/profile';
import {getMenuMarkup} from './components/menu';
import {getSortMarkup} from './components/sort';
import {getContentMarkup} from './components/content';
import {getFilmDetailsMarkup} from './components/film-details';
import {getRandomNumber} from './utils';

const CARD_QUANTTITY = 5;
const EXTRA_CARD_QUANTTITY = 2;

const contentOptions = {
  cardsCount: CARD_QUANTTITY,
  leftExtraTitle: `Top rated`,
  leftExtraCardsCount: EXTRA_CARD_QUANTTITY,
  rightExtraTitle: `Most commented`,
  rightExtraCardsCount: EXTRA_CARD_QUANTTITY,
};
const userWatchedFilmsQuantity = getRandomNumber(30);

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

const renderElement = (container, markup, position = `beforeend`) => {
  container.insertAdjacentHTML(position, markup);
};

const drawIndexMarkup = (options) => {
  renderElement(header, getSearchMarkup());
  renderElement(header, getProfileComponent(userWatchedFilmsQuantity));
  renderElement(main, getMenuMarkup());
  renderElement(main, getSortMarkup());
  renderElement(main, getContentMarkup(options));
  renderElement(main, getFilmDetailsMarkup());
};

drawIndexMarkup(contentOptions);
