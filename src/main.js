import {getProfileComponent} from './components/profile';
import {getMenuComponent} from './components/menu';
import {getSortMarkup} from './components/sort';
import {getFilmsListMarkup} from './components/films-list';
import {getFilmsExtraListComponent} from './components/films-extra-list';
import {getFilmDetailsMarkup} from './components/film-details';
import {getContentComponent} from './components/content';
import {getRandomNumber} from './utils';
import {filmNames, extraListsOptions} from './constants';

import {getFilmDataObject} from './mock/films';

const filmsData = new Array(filmNames.length).fill(``).map(getFilmDataObject);

const userWatchedFilmsQuantity = getRandomNumber(30);
const filtersData = getFiltersData(filmsData);

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

const renderElement = (container, markup, position = `beforeend`) => {
  container.insertAdjacentHTML(position, markup);
};

const drawIndexMarkup = () => {
  renderElement(header, getProfileComponent(userWatchedFilmsQuantity));
  renderElement(main, getMenuComponent(filmsData));
  renderElement(main, getSortMarkup());
  renderElement(main, getContentComponent(filmsData, extraListsOptions));
  renderElement(main, getFilmDetailsMarkup());
};

drawIndexMarkup();
