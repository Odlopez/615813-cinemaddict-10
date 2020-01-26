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
   * @param {String} commentId
   * @return {Promise}
   */
  getComment(commentId) {
    return this._load({url: `comments/${commentId}`})
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
      .then((data) => Film.parseFilms(data))
      .catch((err) => {
        throw err;
      });
  }

  /**
   * Обновляет данные фильма
   *
   * @param {String} id
   * @param {Object} data
   * @return {Promise}
   */
  updateFilm(id, data) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
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
   * @param {Object} data
   * @return {Promise}
   */
  setComment(filmId, data) {
    return this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .catch((err) => {
        throw err;
      });
  }

  deleteComment(commentId) {
    return this._load({url: `comments/${commentId}`, method: Method.DELETE});
  }
}
