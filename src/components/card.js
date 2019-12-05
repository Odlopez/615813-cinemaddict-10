import {MAX_LENGTH_DESCRIPTION} from '../constants';
import {transformFilmDuration} from '../utils';

/**
 * Обрезает строку с описанием фильма до допустимой длинны
 *
 * @param {String} description строка с описанием фильма
 * @return {String} строка с описанием фильма допустимой длины
 */
const cropDescription = (description) => {
  if (description.length > MAX_LENGTH_DESCRIPTION) {
    description = `${description.substr(0, MAX_LENGTH_DESCRIPTION)}...`;
  }

  return description;
};

/**
 * Генерирует разметку карточки фильма в зависимсоти от переданных данных
 *
 * @param {Object} film объект с данными фильма
 * @return {String} строковое представление разметки карточки фильма
 */
const getCardComponent = (film) => `
  <article class="film-card">
    <h3 class="film-card__title">${film.name}</h3>
    <p class="film-card__rating">${film.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${new Date(film.date).getFullYear()}</span>
      <span class="film-card__duration">${transformFilmDuration(film.duration)}</span>
      <span class="film-card__genre">${film.genres[0]}</span>
    </p>
    <img src="images/posters/${film.poster}" alt="Постер ${film.name}" class="film-card__poster">
    <p class="film-card__description">${cropDescription(film.description)}</p>
    <a class="film-card__comments">${film.comments.length} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>
`;

/**
 * Генерирует разметку порции карточек на основании массива с данными
 *
 * @param {Array} cards массив с данными карточек
 * @return {String} строкове представление разметки массива карточек фильмов
 */
export const fillCardsMarkup = (cards) => cards.map((item) => getCardComponent(item)).join(``);
