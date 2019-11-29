/**
 * Возвращает случайное число в заданном диапазоне
 *
 * @param {Number} max максимальная граница диапазона
 * @param {Number} min минимальная граница диапазона
 * @return {Number} сгенерированное случайное число
 */
export const getRandomNumber = (max, min = 0) => min + Math.round(Math.random() * (max - min));
