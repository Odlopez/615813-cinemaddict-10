import Film from '../models/film';

/**
 * Удаляет пустые массивы комментариев из хранилища
 *
 * @param {Object} storeComments
 * @return {Object}
 */
const filterStoreComments = (storeComments) => {
  Object.keys(storeComments).forEach((key) => {
    if (!storeComments[key].length) {
      delete storeComments[key];
    }
  });

  return storeComments;
};

/**
 * Проверяет, есть удален ли комментарий в хранилище или нет
 *
 * @param {Array} comments
 * @param {Number} commentId
 * @return {Boolean}
 */
const isCommentAbsent = (comments, commentId) => comments.every((item) => item !== commentId);

/**
 * Создает массив из комментариев, требующих удаления при синхронизации
 *
 * @param {Array} offlineMovies
 * @param {Array} allFilms
 * @return {Array}
 */
const createDeletedComments = (offlineMovies, allFilms) => {
  const deletedComments = [];

  offlineMovies.forEach((item) => {
    const suitableFilm = allFilms.find((film) => film.id === item.id);

    suitableFilm.commentsId.forEach((commentId) => {
      if (isCommentAbsent(item.comments, commentId)) {
        deletedComments.push(commentId);
      }
    });
  });

  return deletedComments;
};

/**
 * Создает массив из комментариев, требующих загрузки на сервер
 *
 * @param {Object} storeComments
 * @return {Array}
 */
const createOfflineComments = (storeComments) => {
  const offlineComments = [];

  Object.keys(storeComments).forEach((filmId) => {
    storeComments[filmId].forEach((comment) => {
      if (comment.offline) {
        delete comment.offline;

        offlineComments.push({filmId, comment});
      }
    });
  });

  return offlineComments;
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
    this._isSynchronized = true;
  }

  /**
   * Производит загрузку комментария по переданному айди
   *
   * @param {String} filmId
   * @return {Promise}
   */
  getComments(filmId) {
    if (this._isOnLine()) {
      return this._api.getComments(filmId)
        .then((comments) => {
          this._store.setComment(filmId, comments);
          return comments;
        });
    }

    const storeComments = Object.values(this._store.getAllComments());
    const comments = storeComments[filmId] || [];

    this._isSynchronized = false;

    return Promise.resolve(comments);
  }

  /**
   * Производит загрузку фильмов
   *
   * @return {Promise}
   */
  getFilms() {
    if (this._isOnLine()) {
      return this._api.getFilms()
        .then((films) => {
          films.forEach((film) => {
            this._store.createEmptyComment(film.id);
            this._store.setItem(film.id, film.toRAW());
          });
          return films;
        });
    }

    const storeFilms = Object.values(this._store.getAll());

    this._isSynchronized = false;

    return Promise.resolve(Film.parseFilms(storeFilms));
  }

  /**
   * Обновляет данные фильма
   *
   * @param {String} id
   * @param {Object} film
   * @return {Promise}
   */
  updateFilm(id, film) {
    if (this._isOnLine()) {
      this._store.setItem(id, film.toRAW());

      return this._api.updateFilm(id, film);
    }

    this._store.setItem(id, Object.assign(film.toRAW(), {offline: true}));

    this._isSynchronized = false;

    return Promise.resolve(film);
  }

  /**
   * Загружает новый комментарий на сервер
   *
   * @param {String} filmId
   * @param {Object} comment
   * @return {Promise}
   */
  setComment(filmId, comment) {
    if (this._isOnLine()) {
      this._store.setComment(filmId, comment);

      return this._api.setComment(filmId, comment);
    }

    const storeComments = Object.values(this._store.getAllComments());
    const storeFilms = Object.values(this._store.getAll());
    const updatedFilmComments = storeComments[filmId] || [];
    const updatedFilm = storeFilms.find((item) => item.id === filmId);

    updatedFilmComments.push(Object.assign(comment, {offline: true}));
    updatedFilm.comments.push(comment.id);

    this._store.setItem(updatedFilm.id, Object.assign(updatedFilm, {offline: true}));
    this._store.setComment(updatedFilm.id, updatedFilmComments);

    this._isSynchronized = false;

    return Promise.resolve(updatedFilm);
  }

  /**
   * Удаляет комментарий
   *
   * @param {String} commentId
   * @param {String} filmId
   * @return {Promise}
   */
  deleteComment(commentId, filmId) {
    if (this._isOnLine()) {

      return this._api.deleteComment(commentId)
        .then((data) => {
          this._store.deleteComment(commentId, filmId);

          return data;
        });
    }

    this._store.deleteComment(commentId, filmId);

    this._isSynchronized = false;

    return Promise.resolve();
  }

  /**
   * Возвращает состояние синхронизации
   *
   * @return {Boolean}
   */
  getSynchronize() {
    return this._isSynchronized;
  }

  sync() {
    const storeFilms = Object.values(this._store.getAll());
    const storeComments = filterStoreComments(this._store.getAllComments());
    const offlineMovies = storeFilms.filter((item) => item.offline);

    return this._api.getFilms()
      .then((films) => createDeletedComments(offlineMovies, films))
      .then((comments) => comments.map((item) => this._api.deleteComment(item)))
      .then((commentPromises) => Promise.all(commentPromises))
      .then(() => createOfflineComments(storeComments))
      .then((comments) => comments.map((item) => this._api.setComment(item.filmId, item.comment)))
      .then((commentPromises) => Promise.all(commentPromises))
      .then(() => this._api.getFilms())
      .then((films) => {
        offlineMovies.map((item) => {
          const suitableFilm = films.find((film) => film.id === item.id);
          item.comments = suitableFilm.commentsId;
          return item;
        });

        films.forEach((film) => {
          this._store.createEmptyComment(film.id);
          this._store.setItem(film.id, film.toRAW());
        });

        return this._api.sync(offlineMovies);
      });
  }

  /**
   * Проверяет состояние сети
   *
   * @return {String}
   */
  _isOnLine() {
    return window.navigator.onLine;
  }
}
