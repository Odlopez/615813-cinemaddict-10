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

import {getFilmDataObject} from './mock/films';

const filmsData = new Array(filmNames.length).fill(``).map(getFilmDataObject);

const userWatchedFilmsQuantity = getRandomNumber(30);

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

const drawIndexMarkup = () => {
  renderElement(header, getProfileComponent(userWatchedFilmsQuantity));
  renderElement(main, getMenuComponent(filmsData));
  renderElement(main, getSortMarkup());
  renderElement(main, getBlockFilmsMarkup());
};

drawIndexMarkup();
renderFilms(filmsData);
renderFooterStatistic(filmsData);
filterInit(filmsData);
renderPopupComponent(filmsData[0]);
