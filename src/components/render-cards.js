import {getFilmsListMarkup} from './films-list';
import {fillCardsMarkup} from './card';
import {getFilmsExtraListComponent} from './films-extra-list';
import {getReadMoreButtonMarkup} from './read-more-button';
import {CARD_QUANTITY, extraListsOptions} from '../constants';
import {renderElement} from '../utils';

const {ratedTitle, ratedProperty, commentedTitle, commentedProperty} = extraListsOptions;
let countCards = 0;
let films = null;

/**
 * Генерирует разметку блока Top rated
 *
 * @param {Array} filmsData массив с данными карточек фильмов
 * @return {String} строковое представление разметки блока Top rated
 */
const getRatedExtraListMarkup = (filmsData) => getFilmsExtraListComponent(ratedTitle, ratedProperty, filmsData);

/**
 * Генерирует разметку блока Most commented
 *
 * @param {Array} filmsData массив с данными карточек фильмов
 * @return {String} строковое представление разметки блока Most commented
 */
const getCommentedExtraListMarkup = (filmsData) => getFilmsExtraListComponent(commentedTitle, commentedProperty, filmsData);

/**
 * Рендерит на страницу порцию карточек
 *
 * @param {Array} filmsData массив с данными карточек фильмов
 */
const renderPortionOfCards = (filmsData) => {
  const filmsListContainer = document.querySelector(`.films-list__container`);

  if (!filmsListContainer) {
    return;
  }

  const portionFilmsdata = filmsData.slice(countCards, countCards + CARD_QUANTITY);

  renderElement(filmsListContainer, fillCardsMarkup(portionFilmsdata));

  countCards += CARD_QUANTITY;
};

/**
 * Функция-callback для обработчика клика по кнопке Show More
 *
 * @param {Event} evt
 */
const onReadMoreButtonClick = (evt) => {
  renderPortionOfCards(films);

  if (countCards >= films.length) {
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
 * @param {Array} filmsData массив с данными карточек фильмов
 */
export const renderFilms = (filmsData) => {
  const filmsSection = document.querySelector(`.films`);

  filmsSection.innerHTML = ``;
  countCards = 0;
  films = filmsData;
  removeListenerOldReadMoreButton();

  renderElement(filmsSection, getFilmsListMarkup());
  renderPortionOfCards(filmsData);

  if (filmsData.length > CARD_QUANTITY) {
    renderElement(filmsSection, getReadMoreButtonMarkup());

    const readMoreButton = filmsSection.querySelector(`.films-list__show-more`);
    readMoreButton.addEventListener(`click`, onReadMoreButtonClick);
  }

  renderElement(filmsSection, getRatedExtraListMarkup(filmsData));
  renderElement(filmsSection, getCommentedExtraListMarkup(filmsData));
};
