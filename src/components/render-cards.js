import {getFilmsListMarkup} from './films-list';
import {fillCardsMarkup} from './card';
import {getFilmsExtraListComponent} from './films-extra-list';
import {getReadMoreButtonMarkup} from './read-more-button';
import {CARD_QUANTITY, extraListsOptions} from '../constants';
import {renderElement} from '../utils';

const {ratedTitle, ratedProperty, commentedTitle, commentedProperty} = extraListsOptions;
let countCards = 0;
let filmsCopy = null;

/**
 * Генерирует разметку блока Top rated
 *
 * @param {Array} films массив с данными карточек фильмов
 * @return {String} строковое представление разметки блока Top rated
 */
const getRatedExtraListMarkup = (films) => getFilmsExtraListComponent(ratedTitle, ratedProperty, films);

/**
 * Генерирует разметку блока Most commented
 *
 * @param {Array} films массив с данными карточек фильмов
 * @return {String} строковое представление разметки блока Most commented
 */
const getCommentedExtraListMarkup = (films) => getFilmsExtraListComponent(commentedTitle, commentedProperty, films);

/**
 * Рендерит на страницу порцию карточек
 *
 * @param {Array} films массив с данными карточек фильмов
 */
const renderPortionOfCards = (films) => {
  const filmsListContainer = document.querySelector(`.films-list__container`);

  if (!filmsListContainer) {
    return;
  }

  const portionfilms = films.slice(countCards, countCards + CARD_QUANTITY);

  renderElement(filmsListContainer, fillCardsMarkup(portionfilms));

  countCards += CARD_QUANTITY;
};

/**
 * Функция-callback для обработчика клика по кнопке Show More
 *
 * @param {Event} evt
 */
const onReadMoreButtonClick = (evt) => {
  renderPortionOfCards(filmsCopy);

  if (countCards >= filmsCopy.length) {
    evt.currentTarget.removeEventListener(`click`, onReadMoreButtonClick);
    evt.currentTarget.remove();
  }
};

/**
 * Удаляет обработчик клика кнопки Show More, если она была раньше в разметке
 */
const removeListenerOldReadMoreButton = () => {
  const readMoreButton = document.querySelector(`.films-list__show-more`);

  if (readMoreButton) {
    readMoreButton.removeEventListener(`click`, onReadMoreButtonClick);
  }
};

/**
 * Рендерит на страницу основной блок с фильмами
 *
 * @param {Array} films массив с данными карточек фильмов
 */
export const renderFilms = (films) => {
  const filmsSection = document.querySelector(`.films`);

  filmsSection.innerHTML = ``;
  countCards = 0;
  filmsCopy = films;
  removeListenerOldReadMoreButton();

  renderElement(filmsSection, getFilmsListMarkup());
  renderPortionOfCards(films);

  if (films.length > CARD_QUANTITY) {
    renderElement(filmsSection, getReadMoreButtonMarkup());

    const readMoreButton = filmsSection.querySelector(`.films-list__show-more`);
    readMoreButton.addEventListener(`click`, onReadMoreButtonClick);
  }

  renderElement(filmsSection, getRatedExtraListMarkup(films));
  renderElement(filmsSection, getCommentedExtraListMarkup(films));
};
