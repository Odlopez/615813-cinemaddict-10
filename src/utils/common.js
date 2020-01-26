import moment from 'moment';
import {MINUTES_PER_HOUR, MAX_LENGTH_DESCRIPTION, extraListsOptions, ratings} from '../constants';

/**
 * Возвращает случайное число в заданном диапазоне
 *
 * @param {Number} max максимальная граница диапазона
 * @param {Number} min минимальная граница диапазона
 * @return {Number} сгенерированное случайное число
 */
export const getRandomNumber = (max, min = 0) => Math.floor(min + Math.random() * (max + 1 - min));

/**
 * Возврщает случайный элемент массива
 *
 * @param {*} array массив, из которого необходимо извлечь случайный элемент
 * @return {any} случайный элемент массива
 */
export const getRandomElement = (array) => array[getRandomNumber(array.length - 1)];

/**
 * Производит "тасование" массива по методу Фишера-Йетса
 *
 * @param {Array} arr исходный массив
 * @param {Boolean} isGetNewArray флаг, указывающий создавать ли новый массив или сортировать исходный
 * @return {Array} перетасованный массив
 */
export const sortFisherYates = (arr, isGetNewArray) => {
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
export const sortFilms = (films, name) => {
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
export const transformFilmDuration = (duration) => {
  const hours = Math.floor(duration / MINUTES_PER_HOUR);
  const minutes = duration - hours * MINUTES_PER_HOUR;

  return `${hours ? `${hours}h ` : ``}${minutes}m`;
};

/**
 * Возвращает строковое представление даты фильма
 *
 * @param {Number} dateTime дата в миллисекундах
 * @return {String} дата вида DD Mont-name YYY
 */
export const getDateString = (dateTime) => {
  return moment(dateTime).format(`DD MMMM YYYY`);
};

/**
 * Обрезает строку с описанием фильма до допустимой длинны
 *
 * @param {String} description строка с описанием фильма
 * @return {String} строка с описанием фильма допустимой длины
 */
export const cropDescription = (description) => {
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
export const countsFilmAsCategory = (films, category) => {
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
export const getNewCommentId = (comments) => {
  if (!comments.length) {
    return `1`;
  }

  return +comments[comments.length - 1][`id`] + 1;
};

/**
 * Преобразовывает количество просмотренных фильмов в строковое представление рейтинга пользователя
 *
 * @param {Number} filmsQuantity количество просмотренных фильмов
 * @return {String} строковое представление рейтинга пользователя
 */
export const getStringRating = (filmsQuantity) => {
  for (const [key, value] of ratings) {
    if (filmsQuantity <= +key) {
      return value;
    }
  }

  return ``;
};
