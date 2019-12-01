import {filmNames, posters, descriptionFish, genres} from '../constants';
import {getRandomNumber, getRandomItem, sortFisherYates} from '../utils';

const filmNamesArray = sortFisherYates(filmNames, true);
const descriptionSentences = descriptionFish.split(`\n`);

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
 * Возвращает случаную дату
 *
 * @return {Number} случаная дата в миллисекундах
 */
const getRandomDate = () => new Date(getRandomNumber(2019, 1930), getRandomNumber(0, 11), getRandomNumber(0, 31)).getTime();

/**
 * Генерирует объект с моковыми данными для карточки фильма
 *
 * @return {Object}
 */
export const getFilmDataObject = () => {
  return {
    name: filmNamesArray.pop(),
    director: `Anthony Mann`,
    writers: [`Anne Wigton`, `Heinz Herald`, `Richard Weil`],
    actors: [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`],
    country: `Uganda`,
    poster: getRandomItem(posters),
    rating: (getRandomNumber(100, 10) / 10).toFixed(1),
    date: getRandomDate(),
    duration: getRandomNumber(300, 15),
    genres: getRandomGenresArray(),
    description: getMockDescription(),
    comments: getRandomCommentsArray(),
    age: getRandomNumber(18),
    watchlist: !!getRandomNumber(1),
    history: !!getRandomNumber(1),
    favorites: !!getRandomNumber(1)
  };
};
