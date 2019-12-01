import {filmNames, posters, descriptionFish, genres} from '../constants';
import {getRandomNumber, getRandomItem, sortFisherYates} from '../utils';

const filmNamesArray = sortFisherYates(filmNames, true);
const descriptionSentences = descriptionFish.split(`\n`);

/**
 * Генерирует строковое представление продолжительности фильма на основании длительности в минутах
 *
 * @param {Number} duration длительность фильма в минутах
 * @return {String} строка с продожительностью фильма вида {x}h {y}m
 */
const transformFilmDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;

  return `${hours}h ${minutes}m`;
};

/**
 * Генерирует описание к фильму
 *
 * @return {String} строка с описанием фильма
 */
const getMockDescription = () => {
  const sentencesQuantity = getRandomNumber(3, 1);

  return sortFisherYates(descriptionSentences, true)
  .slice(0, sentencesQuantity)
  .join(` `);
};

/**
 * Генерирует массив жанров киноленты
 *
 * @return {Array} случайный массив с жанрами
 */
const getRandomGenresArray = () => {
  const quantityGenres = getRandomNumber(genres.length, 1);

  return sortFisherYates(genres, true).slice(0, quantityGenres);
};

/**
 * Генерирует массив комментариев
 *
 * @return {Array} случайный массив с комментариями
 */
const getRandomCommentsArray = () => {
  const quantityComments = getRandomNumber(50);

  return new Array(quantityComments)
  .fill(``)
  .map(() => descriptionFish.substr(getRandomNumber(40), 25));
};

/**
 * Генерирует объект с моковыми данными для карточки фильма
 *
 * @return {Object}
 */
export const getFilmDataObject = () => {
  return {
    name: filmNamesArray.pop(),
    poster: getRandomItem(posters),
    rating: getRandomNumber(100, 10) / 10,
    year: getRandomNumber(2019, 1930),
    duration: transformFilmDuration(getRandomNumber(300, 15)),
    genre: getRandomGenresArray(),
    description: getMockDescription(),
    comments: getRandomCommentsArray(),
    age: getRandomNumber(18),
    watchlist: !!getRandomNumber(1),
    history: !!getRandomNumber(1),
    favorites: !!getRandomNumber(1)
  };
};
