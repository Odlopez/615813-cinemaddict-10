export default class Store {
  constructor(key, commentKey, storage) {
    this._storage = storage;
    this._storeKey = key;
    this._storeCommentKey = commentKey;
  }

  getAll() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey));
    } catch (err) {
      return {};
    }
  }

  getAllComments() {
    try {
      return JSON.parse(this._storage.getItem(this._storeCommentKey));
    } catch (err) {
      return {};
    }
  }

  dropAll() {}

  setItem(key, value) {
    const store = this.getAll();

    this._storage.setItem(this._storeKey, JSON.stringify(Object.assign({}, store, {[key]: value})));
  }

  setComment(filmId, comments) {
    const store = this.getAllComments();

    this._storage.setItem(this._storeCommentKey, JSON.stringify(Object.assign({}, store, {[filmId]: comments})));
  }

  createEmptyComment(filmId) {
    this.setComment(filmId, []);
  }

  deleteItem(key) {
    const store = this.getAll();

    delete store[key];

    this._storage.setItem(this._storeKey, JSON.stringify(Object.assign({}, store)));
  }

  deleteComment(commentId, filmId) {
    let store = this.getAll();
    const storeComments = this.getAllComments();
    const updatedFilm = store[filmId];
    const deletedFilmCommentFilmIndex = updatedFilm.comments.indexOf(commentId);
    const deletedFilmCommentStorageIndex = storeComments[filmId].findIndex((item) => item.id === commentId);


    updatedFilm.comments.splice(deletedFilmCommentFilmIndex, 1);
    storeComments[filmId].splice(deletedFilmCommentStorageIndex, 1);
    updatedFilm.offline = true;

    this._storage.setItem(this._storeCommentKey, JSON.stringify(Object.assign({}, storeComments)));
    this._storage.setItem(this._storeKey, JSON.stringify(store));
  }
}
