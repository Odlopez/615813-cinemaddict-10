import {getProfileComponent} from './components/profile';
import {getMenuComponent} from './components/menu';
import {getSortMarkup} from './components/sort';
import {renderPopupComponent} from './components/film-details';
import {renderFilms} from './components/render-cards';
import {getBlockFilmsMarkup} from './components/content';
import {renderFooterStatistic} from './footer';
import {filterInit} from './filter';
import {getRandomNumber, renderElement} from './utils';
import {filmNames} from './constants';

import {getFilms} from './mock/films';

const films = new Array(filmNames.length).fill(``).map(getFilms);

const userWatchedFilmsQuantity = getRandomNumber(30);

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

const drawIndexMarkup = () => {
  renderElement(header, getProfileComponent(userWatchedFilmsQuantity));
  renderElement(main, getMenuComponent(films));
  renderElement(main, getSortMarkup());
  renderElement(main, getBlockFilmsMarkup());
};

drawIndexMarkup();
renderFilms(films);
renderFooterStatistic(films);
filterInit(films);
renderPopupComponent(films[0]);
