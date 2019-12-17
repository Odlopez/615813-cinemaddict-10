import {filmNames,
  posters,
  descriptionFish,
  genres,
  MAX_QUANTITY_SENTENCES,
  MIN_QUANTITY_SENTENCES,
  MIN_QUANTITY_GENRES,
  MAX_QUANTITY_COMMENTS,
  MAX_COMMENT_LENGTH,
  MAX_FILM_DURATION,
  MIN_FILM_DURATION,
  MAX_RATING,
  MAX_AGE,
  MAX_YEAR,
  MIN_YEAR,
  MAX_QUANTUTY_MONTHS,
  MAX_QUANTITY_DAYS} from '../constants';
import {getRandomNumber, getRandomElement, sortFisherYates} from '../utils/common';

const cloneFilmNames = sortFisherYates(filmNames, true);
const descriptionSentences = descriptionFish.split(`\n`);

/**
 * Генерирует описание к фильму
 *
 * @return {String} строка с описанием фильма
 */
const getMockDescription = () => {
  const sentencesQuantity = getRandomNumber(MAX_QUANTITY_SENTENCES, MIN_QUANTITY_SENTENCES);

  return sortFisherYates(descriptionSentences, true)
  .slice(0, sentencesQuantity)
  .join(` `);
};

/**
 * Генерирует массив жанров киноленты
 *
 * @return {Array} случайный массив с жанрами
 */
const getRandomGenres = () => {
  const quantityGenres = getRandomNumber(genres.length, MIN_QUANTITY_GENRES);

  return sortFisherYates(genres, true).slice(0, quantityGenres);
};

/**
 * Генерирует массив комментариев
 *
 * @return {Array} случайный массив с комментариями
 */
const getRandomComments = () => {
  const quantityComments = getRandomNumber(MAX_QUANTITY_COMMENTS);

  return new Array(quantityComments)
  .fill(``)
  .map(() => descriptionFish.substr(getRandomNumber(descriptionFish.length), MAX_COMMENT_LENGTH));
};

/**
 * Возвращает случаную дату
 *
 * @return {Number} случаная дата в миллисекундах
 */
const getRandomDate = () => new Date(getRandomNumber(MAX_YEAR, MIN_YEAR), getRandomNumber(0, MAX_QUANTUTY_MONTHS), getRandomNumber(1, MAX_QUANTITY_DAYS)).getTime();

/**
 * Создаеб объект с дополнительными данными о фильме
 */
const getAdditionalFilmData = () => {
  const watchlist = !!getRandomNumber(1);
  const history = watchlist ? false : !!getRandomNumber(1);
  const favorites = history ? !!getRandomNumber(1) : false;
  const score = history ? getRandomNumber(MAX_RATING - 1, 1) : null;

  return {watchlist, history, favorites, score};
};

/**
 * Генерирует объект с моковыми данными для карточки фильма
 *
 * @return {Object}
 */
export const getFilms = () => {
  const additionalFilmData = getAdditionalFilmData();

  return {
    name: cloneFilmNames.pop(),
    director: `Anthony Mann`,
    writers: [`Anne Wigton`, `Heinz Herald`, `Richard Weil`],
    actors: [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`],
    country: `Uganda`,
    poster: getRandomElement(posters),
    rating: (getRandomNumber(MAX_RATING * 10, 10) / 10).toFixed(1),
    date: getRandomDate(),
    duration: getRandomNumber(MAX_FILM_DURATION, MIN_FILM_DURATION),
    genres: getRandomGenres(),
    description: getMockDescription(),
    comments: getRandomComments(),
    age: getRandomNumber(MAX_AGE),
    ...additionalFilmData
  };
};
