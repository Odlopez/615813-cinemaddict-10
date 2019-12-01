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
export const getRandomItem = (array) => array[getRandomNumber(array.length - 1)];

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
 * @param {Array} dataFilmsArray массив с данными карточек фильмов
 * @param {String} name имя свойство, по которому происходит сортировка
 * @return {Array} отсортированный по переданному свойству массив с данными карточек фильмов
 */
export const sortDataFilmsArray = (dataFilmsArray, name) => {
  let callback;

  switch (name) {
    case `comments`:
      callback = (a, b) => b[name].length - a[name].length;
      break;
    default:
      callback = (a, b) => b[name] - a[name];
  }

  return dataFilmsArray.slice(0).sort(callback);
};

/**
 * Отрисовывает разметку в указанном месте
 *
 * @param {Node} container элемент, относительно которого добавляется разметка
 * @param {String} markup строковое представление разметки, которую вставляем
 * @param {String} position позиция, в которою будет вставлена разметка
 */
export const renderElement = (container, markup, position = `beforeend`) => {
  container.insertAdjacentHTML(position, markup);
};
