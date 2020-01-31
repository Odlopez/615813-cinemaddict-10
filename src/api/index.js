import Film from '../models/film';

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
  }
  
  throw new Error(`${response.status}: ${response.statusText}`);
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  /**
   * Производит загрузку данных на/с сервера по переданным параметрам
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
   * @param {String} filmId
   * @return {Promise}
   */
  getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
      .then((response) => response.json())
      .catch((err) => {
        throw err;
      });
  }

  /**
   * Производит загрузку фильмов
   *
   * @return {Promise}
   */
  getFilms() {
    return this._load({url: `movies`})
      .then((response) => response.json())
      .then((films) => Film.parseFilms(films))
      .catch((err) => {
        throw err;
      });
  }

  /**
   * Обновляет данные фильма
   *
   * @param {String} id
   * @param {Object} film
   * @return {Promise}
   */
  updateFilm(id, film) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(film.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(Film.parseFilm)
      .catch((err) => {
        throw err;
      });
  }

  /**
   * Загружает новый комментарий на сервер
   *
   * @param {String} filmId
   * @param {Object} comment
   * @return {Promise}
   */
  setComment(filmId, comment) {
    return this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .catch((err) => {
        throw err;
      });
  }

  /**
   * Удаляет комментарий
   *
   * @param {String} commentId
   * @return {Promise}
   */
  deleteComment(commentId) {
    return this._load({url: `comments/${commentId}`, method: Method.DELETE});
  }

  /**
   * Синхронизирует данные с сервером
   *
   * @param {Array} data
   * @return {Promise}
   */
  sync(data) {
    return this._load({
      url: `movies/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json());
  }
}
