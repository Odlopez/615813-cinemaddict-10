import Profile from './components/profile';
import Menu from './components/menu';
import Sort from './components/sort';
import ContentBlock from './components/content';
import {renderFooterStatistic} from './footer';
import {getRandomNumber, render} from './utils';
import {filmNames} from './constants';

import {getFilms} from './mock/films';

const films = new Array(filmNames.length).fill(``).map(getFilms);

const userWatchedFilmsQuantity = getRandomNumber(30);

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

const drawIndexMarkup = () => {
  const content = new ContentBlock();
  content.films = films;

  render(header, new Profile(userWatchedFilmsQuantity).getElement());
  render(main, new Menu(films, content).getElement());
  render(main, new Sort().getElement());
  render(main, content.getElement());
};

drawIndexMarkup();
renderFooterStatistic(films);
