import Profile from './components/profile';
import ContentBlock from './components/content';
import PageController from './controllers/page-controller';
import MenuController from './controllers/menu-controller';
import {renderFooterStatistic} from './footer';
import {getRandomNumber} from './utils/common';
import {render} from './utils/render';
import {filmNames} from './constants';

import {getFilms} from './mock/films';

const films = new Array(filmNames.length).fill(``).map(getFilms);

const userWatchedFilmsQuantity = getRandomNumber(30);

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

const drawIndexMarkup = () => {
  const contentBlock = new ContentBlock().getElement();
  const pageController = new PageController(contentBlock);
  const menuController = new MenuController(pageController);

  render(header, new Profile(userWatchedFilmsQuantity).getElement());
  menuController.render(films);
  render(main, contentBlock);

  pageController.render(films);
};

drawIndexMarkup();
renderFooterStatistic(films);
