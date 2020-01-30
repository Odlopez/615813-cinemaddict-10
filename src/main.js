import Profile from './components/profile';
import ContentBlock from './components/content';
import PageController from './controllers/page-controller';
import MenuController from './controllers/menu-controller';
import Movies from './models/movies';
import {renderFooterStatistic} from './footer';
import {getRandomNumber} from './utils/common';
import {render} from './utils/render';
import Api from './api/index';
import Store from './api/store.js';
import Provider from './api/provider.js';

const STORE_PREFIX = `615813-cinemaddict-10-store`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;
const STORE_COMMENT_PREFIX = `615813-cinemaddict-10-comment-store`;
const STORE_COMMENT_NAME = `${STORE_COMMENT_PREFIX}-${STORE_VER}`;

const AUTHORIZATION = `Basic odlopez2399`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, STORE_COMMENT_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
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

apiWithProvider.getFilms()
  .then((films) => {
    const movies = new Movies(films);

    drawIndexMarkup(movies, films, apiWithProvider);
    renderFooterStatistic(films);
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      // Действие, в случае успешной регистрации ServiceWorker
    }).catch(() => {
      // Действие, в случае ошибки при регистрации ServiceWorker
    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  if (!apiWithProvider.getSynchronize()) {
    apiWithProvider.sync()
      .then(() => {
        // Действие, в случае успешной синхронизации
      })
      .catch(() => {
        // Действие, в случае ошибки синхронизации
      });
  }
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
