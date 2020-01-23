import Profile from './components/profile';
import ContentBlock from './components/content';
import PageController from './controllers/page-controller';
import MenuController from './controllers/menu-controller';
import Movies from './models/movies';
import {renderFooterStatistic} from './footer';
import {getRandomNumber} from './utils/common';
import {render} from './utils/render';
import Api from './api';

const AUTHORIZATION = `Basic odlopez2399`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;

const api = new Api(END_POINT, AUTHORIZATION);
const userWatchedFilmsQuantity = getRandomNumber(30);

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

const drawIndexMarkup = (movies, films, apiInstance) => {
  const contentBlock = new ContentBlock().getElement();
  const pageController = new PageController(contentBlock, movies, apiInstance);
  const menuController = new MenuController(main, movies);

  render(header, new Profile(userWatchedFilmsQuantity).getElement());
  menuController.render(films);
  render(main, contentBlock);

  pageController.render(films);
};

api.getFilms()
  .then((films) => {
    const movies = new Movies(films);

    drawIndexMarkup(movies, films, api);
    renderFooterStatistic(films);
  });
