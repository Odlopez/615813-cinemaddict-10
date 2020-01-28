import AbstractComponent from './abstract-component.js';
import {countsFilmAsCategory} from '../utils/common';
import {MINUTES_PER_HOUR} from '../constants';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';

/**
 * Выбирает из массива фильмов только те, которые были просмотренны
 *
 * @param {Array} films массив с данными фильмов
 * @return {Array} отсортированный массив с данными о просмотренных фильмах
 */
const getWathedFilms = (films) => {
  return films.filter((item) => item.history);
};

/**
 * Суммирует время просмотренных фильмов
 *
 * @param {Array} films массив с данными фильмов
 * @return {Number} длительность просмотренных фильмов в минутах
 */
const getDurationWathedFilms = (films) => {
  const wathedFilms = getWathedFilms(films);

  return wathedFilms.reduce((hoarder, item) => {
    return hoarder + item.duration;
  }, 0);
};

/**
 * Подсчитывает количество часов во времени просмотренных фильмов
 *
 * @param {Array} films массив с данными фильмов
 * @return {Number} количество часов во времени просмотренных фильмов
 */
const getHoursTotalDuration = (films) => {
  const totalDuration = getDurationWathedFilms(films);
  return Math.floor(totalDuration / MINUTES_PER_HOUR);
};

/**
 * Подсчитывает количество минут в остатке времени просмотренных фильмов
 *
 * @param {Array} films массив с данными фильмов
 * @return {Number} количество минут в остатке времени просмотренных фильмов
 */
const getMinutesTotalDuration = (films) => {
  const totalDuration = getDurationWathedFilms(films);
  const hours = Math.floor(totalDuration / MINUTES_PER_HOUR);
  return totalDuration - hours * MINUTES_PER_HOUR;
};

/**
 * Собирает данные о жанрах просмотренных фильмов
 *
 * @param {Array} films массив с данными фильмов
 * @return {Object} объект с данными о жанрах просмотренных фильмов
 */
const getGenresData = (films) => {
  const wathedFilms = getWathedFilms(films);
  const genres = {};

  wathedFilms.forEach((film) => {
    film.genres.forEach((genre) => {
      genres[genre] = genres[genre] ? genres[genre] + 1 : 1;
    });
  });

  return genres;
};

/**
 * Возвращает наиболее просматриваемый жанр фильма
 *
 * @param {Array} films массив с данными фильмов
 * @return {String} наиболее просматриваемый жанр
 */
const getTopGenre = (films) => {
  const genres = getGenresData(films);
  const maxQuantity = Math.max(...Object.values(genres), 0);
  const topGenres = Object.keys(genres).filter((item) => genres[item] === maxQuantity);

  return topGenres[0] ? topGenres[0] : `-`;
};

/**
 * Фильтрует просмотренные фильмы за период "сегодня"
 *
 * @param {Array} films массив с данными фильмов
 * @return {Array}
 */
const getTodayFilms = (films) => {
  const begin = moment().startOf(`day`);
  return films.filter((it) => moment(it.watchingDate).isAfter(begin._d));
};

/**
 * Фильтрует просмотренные фильмы за период "неделя"
 *
 * @param {Array} films массив с данными фильмов
 * @return {Array}
 */
const getWeekFilms = (films) => {
  const begin = moment().subtract(7, `days`);

  return films.filter((it) => moment(it.watchingDate).isAfter(begin._d));
};

/**
 * Фильтрует просмотренные фильмы за период "месяц"
 *
 * @param {Array} films массив с данными фильмов
 * @return {Array}
 */
const getMonthFilms = (films) => {
  const begin = moment().subtract(1, `months`);

  return films.filter((it) => moment(it.watchingDate).isAfter(begin._d));
};

/**
 * Фильтрует просмотренные фильмы за период "год"
 *
 * @param {Array} films массив с данными фильмов
 * @return {Array}
 */
const getYearFilms = (films) => {
  const begin = moment().subtract(1, `years`);

  return films.filter((it) => moment(it.watchingDate).isAfter(begin._d));
};

/**
 * Генерирует разметку блока основной статистики
 *
 * @param {Array} films массив с данными фильмов
 * @return {String} строковое представление разметки блока статистики
 */
const getGeneralStatisticMarkup = (films) => {
  return `<li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${countsFilmAsCategory(films, `history`)} <span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${getHoursTotalDuration(films)} <span class="statistic__item-description">h</span> ${getMinutesTotalDuration(films)} <span class="statistic__item-description">m</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${getTopGenre(films)}</p>
    </li>`;
}

/**
 * Генерирует разметку блока статистики
 *
 * @param {Array} films массив с данными фильмов
 * @return {String} строковое представление разметки блока статистики
 */
const getStatisticMarkup = (films) => {
  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Sci-Fighter</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      ${getGeneralStatisticMarkup(films)}
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
};

export default class Statistic extends AbstractComponent {
  constructor(movies) {
    super();

    this._movies = movies;
  }

  /**
   * Генерирует разметку блока статистики
   *
   * @return {String} строковое представление разметки карточки фильма
   */
  getTemplate() {
    return getStatisticMarkup(this._movies.getBaseFilms());
  }

  /**
   * Сбрасывает график статистики
   */
  _resetChart() {
    if (this._chart) {
      this._chart.destroy();
    }
  }

  /**
   * Возвращает значение выбранного фильтра
   *
   * @return {String}
   */
  _getActiveFilter() {
    const filterElements = this.getElement().querySelectorAll(`.statistic__filters-input`);

    return Array.from(filterElements).find((item) => item.checked).value;
  }

  /**
   * Возвращает список просмотренных фильтров в зависимости от фильтра
   *
   * @return {Array}
   */
  _getFilteredFilms() {
    const filterValue = this._getActiveFilter();

    switch (filterValue) {
      case `today`:
        return getTodayFilms(this._movies.getBaseFilms());

      case `week`:
        return getWeekFilms(this._movies.getBaseFilms());

      case `month`:
        return getMonthFilms(this._movies.getBaseFilms());

      case `year`:
        return getYearFilms(this._movies.getBaseFilms());
    }

    return this._movies.getBaseFilms();
  }

  /**
   * Записывает блок с основной статистикой
   */
  _setGeneralStatistic() {
    const statisticTextList = this.getElement().querySelector(`.statistic__text-list`);

    statisticTextList.innerHTML = ``;
    statisticTextList.innerHTML = getGeneralStatisticMarkup(this._getFilteredFilms());
  }

  /**
   * Отрисовывает статистику
   */
  renderChart() {
    const ctx = this.getElement().querySelector(`.statistic__chart`);
    const genres = getGenresData(this._getFilteredFilms());
    const genresQuantity = Object.keys(genres).map((item) => genres[item]);

    this._resetChart();

    this._chart = new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: Object.keys(genres),
        datasets: [
          {
            data: genresQuantity,
            backgroundColor: `#FFFD82`,
            borderWidth: 0,
            barThickness: 32
          }
        ]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 16
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            padding: 40
          }
        },
        tooltips: {
          enabled: false
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false,
            ticks: {
              beginAtZero: true,
            }
          }],
          yAxes: [{
            ticks: {
              fontSize: 18,
              fontColor: `#ffffff`,
              padding: 80,
            }
          }]
        }
      }
    });
  }

  /**
   * Перерисовывает контент блока статистики
   */
  rerender() {
    this._setGeneralStatistic();
    this.renderChart();
  }

  /**
   * Вешает обработчик события 'input' на фильтр
   *
   * @param {Function} handler
   */
  setHandler(handler) {
    const filterElements = this.getElement().querySelectorAll(`.statistic__filters-input`);

    filterElements.forEach((item) => {
      item.addEventListener(`input`, handler);
    });
  }
}
