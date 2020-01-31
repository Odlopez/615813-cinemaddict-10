import {MINUTES_PER_HOUR, MAX_LENGTH_DESCRIPTION, extraListsOptions, ratings, commentDates} from '../constants';
import moment from 'moment';
import numberToWords from 'number-to-words';

/**
 * Возвращает случайное число в заданном диапазоне
 *
 * @param {Number} max максимальная граница диапазона
 * @param {Number} min минимальная граница диапазона
 * @return {Number} сгенерированное случайное число
 */
const getRandomNumber = (max, min = 0) => Math.floor(min + Math.random() * (max + 1 - min));

/**
 * Производит "тасование" массива по методу Фишера-Йетса
 *
 * @param {Array} arr исходный массив
 * @param {Boolean} isGetNewArray флаг, указывающий создавать ли новый массив или сортировать исходный
 * @return {Array} перетасованный массив
 */
const sortFisherYates = (arr, isGetNewArray) => {
  if (isGetNewArray) {
    arr = arr.slice();
  }

  arr.forEach((item, i) => {
    const j = getRandomNumber(arr.length - 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  });

  return arr;
};

/**
 * Сортирует по убыванию переданный массив по заданному свойству
 *
 * @param {Array} films массив с данными карточек фильмов
 * @param {String} name имя свойство, по которому происходит сортировка
 * @return {Array} отсортированный по переданному свойству массив с данными карточек фильмов
 */
const sortFilms = (films, name) => {
  let sorter;

  switch (name) {
    case extraListsOptions.commentedProperty:
      sorter = (a, b) => b[name].length - a[name].length;
      break;
    default:
      sorter = (a, b) => b[name] - a[name];
  }

  return films.slice(0).sort(sorter);
};

/**
 * Генерирует строковое представление продолжительности фильма на основании длительности в минутах
 *
 * @param {Number} duration длительность фильма в минутах
 * @return {String} строка с продожительностью фильма вида {x}h {y}m
 */
const transformFilmDuration = (duration) => {
  const hours = Math.floor(duration / MINUTES_PER_HOUR);
  const minutes = duration - hours * MINUTES_PER_HOUR;

  return `${hours ? `${hours}h ` : ``}${minutes}m`;
};

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
 * Подсчитывает в массиве данных количество фильмов, соответствующих заданной категории
 *
 * @param {Array} films массив с данными карточек фильмов
 * @param {String} category категория, по которой фильтруем данные фильмов
 * @return {Number} количество фильмов соответстующей категории
 */
const countsFilmAsCategory = (films, category) => {
  return films.reduce((hoarder, item) => {
    hoarder += item[category] ? 1 : 0;
    return hoarder;
  }, 0);
};

/**
 * Генерирует номер следующего комментария
 *
 * @param {Array} comments
 * @return {Number} айди следующего комментария
 */
const getNewCommentId = (comments) => {
  if (!comments.length) {
    return `${+new Date()}`;
  }

  return +comments[comments.length - 1][`id`] + 1;
};

/**
 * Преобразовывает количество просмотренных фильмов в строковое представление рейтинга пользователя
 *
 * @param {Number} filmsQuantity количество просмотренных фильмов
 * @return {String} строковое представление рейтинга пользователя
 */
const getStringRating = (filmsQuantity) => {
  for (const [key, value] of ratings) {
    if (filmsQuantity <= +key) {
      return value;
    }
  }

  return ``;
};

/**
 * Возвращает строковое представление даты для комментария
 *
 * @param {String} date
 * @return {String}
 */
const getCommentDate = (date) => {
  window.moment = moment;
  for (const [key, value] of commentDates) {
    if (moment(date).isBetween(moment().subtract(value.size, value.magnitude), moment())) {
      return key;
    }
  }

  const fromNow = moment(date).fromNow();

  return `a ${numberToWords.toWords(parseInt(fromNow, 10))} ${fromNow.slice(fromNow.indexOf(` `))}`;
};

export {
  getRandomNumber,
  sortFisherYates,
  sortFilms,
  transformFilmDuration,
  cropDescription,
  countsFilmAsCategory,
  getNewCommentId,
  getStringRating,
  getCommentDate
};
