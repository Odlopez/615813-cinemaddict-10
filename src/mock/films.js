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
    genre: getRandomItem(genres),
    description: getMockDescription(),
    comments: getRandomNumber(50),
    watchlist: !!getRandomNumber(1),
    history: !!getRandomNumber(1),
    favorites: !!getRandomNumber(1)
  };
};
