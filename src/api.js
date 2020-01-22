import Film from './models/film';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

/**
 * Проверяет статус загрузки данных
 * Возвращает данные или ошибку, в зависимости от статуса
 *
 * @param {Object} response
 * @return {Object | Error}
 */
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  /**
   * Производит загрузку данных по переданным параметрам
   *
   * @param {Object} param0
   * @return {Promise}
   */
  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }

  /**
   * Производит загрузку комментария по переданному айди
   *
   * @param {String} commentId
   * @return {Promise}
   */
  getComment(commentId) {
    return this._load({url: `comments/${commentId}`})
      .then((response) => response.json());
  }

  /**
   * Производит загрузку фильмов
   *
   * @return {Promise}
   */
  getFilms() {
    return this._load({url: `movies`})
      .then((response) => response.json())
      .then((data) => Film.parseFilms(data));
  }
}
