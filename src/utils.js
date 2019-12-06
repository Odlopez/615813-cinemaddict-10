import {monthNames, MINUTES_PER_HOUR, MAX_LENGTH_DESCRIPTION} from './constants';

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
    case `comments`:
      sorter = (a, b) => b[name].length - a[name].length;
      break;
    default:
      sorter = (a, b) => b[name] - a[name];
  }

  return films.slice(0).sort(sorter);
};

/**
 * Отрисовывает разметку в указанном месте
 *
 * @param {Node} container элемент, относительно которого добавляется разметка
 * @param {Node} element DOM-узел, который вставляем
 * @param {String} position позиция, в которою будет вставлена разметка
 */
export const render = (container, element, position = `beforeend`) => {
  container.insertAdjacentElement(position, element);
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
  const date = new Date(dateTime);

  return `${date.getDay()}  ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
};

/**
 * Создает Node-элемент на основании переданной разметки
 *
 * @param {String} markup
 * @return {Node} DOM-узел
 */
export const createElement = (markup) => {
  const container = document.createElement(`div`);

  container.innerHTML = markup;

  return container.firstElementChild;
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
