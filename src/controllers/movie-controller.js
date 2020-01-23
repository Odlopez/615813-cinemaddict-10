import {render, remove} from '../utils/render';
import {getNewCommentId} from '../utils/common';
import Card from '../components/card';
import Film from '../models/film.js';
import FilmDetails from '../components/film-details';
import {ESC_KEYCODE} from '../constants';
import he from 'he';

export default class MovieController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._api = api;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._card = null;
    this._popup = null;
    this._film = null;

    this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
    this.onDocumentKeydown = this.onDocumentKeydown.bind(this);
  }

  get film() {
    return this._film;
  }

  set film(film) {
    this._film = film;
  }

  /**
   * Закрывает попап-блок с подробной информацией о фильме
   */
  closePopup() {
    const closeButton = this._popup.getElement().querySelector(`.film-details__close-btn`);

    closeButton.removeEventListener(`click`, this.onCloseButtonClick);
    document.removeEventListener(`keydown`, this.onDocumentKeydown);

    remove(this._popup);
    this._popup = null;
  }

  /**
   * Устанавливает дефолтное положение карточки
   */
  setDefaultView() {
    if (this._popup) {
      this.closePopup();
    }
  }

  /**
   * Функция-callback обработчика клика по кнопке закрытия попапа
   */
  onCloseButtonClick() {
    this.closePopup();
  }

  /**
   * Функция-callback обработчика нажатия клавиши (esc) на клавиатуре
   * закрывает попап-блок с подробной информацией о фильме
   *
   * @param {Event} evt
   */
  onDocumentKeydown(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      this.closePopup();
    }
  }

  /**
   * Создает попап с подробной информацией о фильме
   * @return {Promise}
   */
  createPopup() {
    if (this.film.comments) {
      return new Promise((resolve) => {
        this._popup = new FilmDetails(this.film);

        this._subscribePopupOnEvents();
        resolve();
      });
    }

    return this._api.getComment(this.film.id)
      .then((comments) => {
        this.film.comments = comments;
      })
      .then(() => {
        this._popup = new FilmDetails(this.film);

        this._subscribePopupOnEvents();
      });
  }

  _getActiveFilterName() {
    const activeFilterLink = document.querySelector(`.main-navigation__item--active`);

    return activeFilterLink ? activeFilterLink.href.match(/#.{1,}/)[0].slice(1) : ``;
  }

  _onWatchListChange() {
    this._onDataChange(this, Object.assign(Object.create(Film.prototype), this.film, {
      watchlist: !this.film.watchlist,
      watchingDate: !this.film.watchlist ? new Date().toISOString() : new Date(0).toISOString()
    }));

    if (this._getActiveFilterName() === `watchlist`) {
      remove(this._card);
    }
  }

  _onWatchedChange() {
    this._onDataChange(this, Object.assign(Object.create(Film.prototype), this.film, {
      history: !this.film.history,
      watchingDate: this.watchingDate ? this.watchingDate : new Date(0).toISOString()
    }));

    if (this._getActiveFilterName() === `history`) {
      remove(this._card);
    }
  }

  _onFavoriteChange() {
    this._onDataChange(this, Object.assign(Object.create(Film.prototype), this.film, {
      favorites: !this.film.favorites,
      watchingDate: this.watchingDate ? this.watchingDate : new Date(0).toISOString()
    }));

    if (this._getActiveFilterName() === `favorites`) {
      remove(this._card);
    }
  }

  /**
   * Вешает на элемент попапа обработчики событий
   */
  _subscribePopupOnEvents() {
    this._popup.setCloseHandler(this.onCloseButtonClick, this.onDocumentKeydown);

    this._popup.setAddWatchlistButtonHandler((evt) => {
      evt.preventDefault();

      this._onWatchListChange();
    });

    this._popup.setAlreadyWatchedButtonHandler((evt) => {
      evt.preventDefault();

      this._onWatchedChange();
    });

    this._popup.setAddFavoriteButtonHandler((evt) => {
      evt.preventDefault();

      this._onFavoriteChange();
    });

    this._popup.setDeleteCommentButtonHandler((evt) => {
      evt.preventDefault();

      const comment = evt.target.closest(`.film-details__comment`);

      if (!comment) {
        return;
      }

      const index = Array.from(this._popup.getElement().querySelectorAll(`.film-details__comment-delete`))
        .findIndex((item) => item === comment);

      this.film.comments.splice(index, 1);

      this._onDataChange(this, Object.assign({}, this.film));

      comment.remove();
    });

    this._popup.setFormHandler((evt) => {
      if (evt.ctrlKey && evt.key === `Enter`) {
        const data = new Map(new FormData(evt.target.form));

        const comment = data.get(`comment`);
        const emoji = data.get(`comment-emoji`);

        if (comment && emoji) {
          this.film.comments.unshift({
            id: getNewCommentId(this.film.comments).toString(),
            comment: he.encode(comment),
            emotion: emoji,
            author: `John Doe`,
            date: new Date()
          });

          this._onDataChange(this, Object.assign({}, this.film));
        }
      }
    });
  }

  /**
   * Вешает на элемент карточки необходимые обработчики события
   */
  _subscribeCardOnEvents() {
    this._card.setOpenDetailstHandler(() => {
      this._onViewChange();

      this.createPopup().then(() => {
        render(this._container, this._popup.getElement());
      });
    });

    this._card.setAddWatchlistButtonHandler((evt) => {
      evt.preventDefault();

      this._onWatchListChange();
    });

    this._card.setAlreadyWatchedButtonHandler((evt) => {
      evt.preventDefault();

      this._onWatchedChange();
    });

    this._card.setAddFavoriteButtonHandler((evt) => {
      evt.preventDefault();

      this._onFavoriteChange();
    });
  }

  /**
   *
   * @param {Object} film объект с данными фильма
   */
  render(film) {
    this.film = film;
    this._card = new Card(film);

    this._subscribeCardOnEvents();

    render(this._container, this._card.getElement());
  }

  /**
   *
   * @param {*} film
   */
  rerender(film) {
    this.film = film;

    const oldPopup = this._popup;
    const oldCard = this._card;

    this._card = new Card(film);

    this._subscribeCardOnEvents();

    oldCard.getElement().replaceWith(this._card.getElement());
    remove(oldCard);

    if (oldPopup) {
      this.createPopup()
      .then(() => oldPopup.getElement().replaceWith(this._popup.getElement()))
      .then(() => remove(oldPopup));

      // oldPopup.getElement().replaceWith(this._popup.getElement());
      // remove(oldPopup);
    }
  }
}
