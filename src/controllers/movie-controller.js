import {render, remove} from '../utils/render';
import {getNewCommentId, getActiveFilterName, getFreezeStyleElement} from '../utils/common';
import Card from '../components/card';
import Film from '../models/film.js';
import FilmDetails from '../components/film-details';
import {ESC_KEYCODE, FREEZE_STYLE_CLASS_NAME, FREEZE_ANIMATION_STYLE, FREEZE_ANIMATION_TIMEOUT, INVALID_FORM_CLASS_NAME, INVALID_FORM_STYLE} from '../constants';
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
    this._isCommentFormBlocked = false;
    this._isRatingFormBlocked = false;

    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onDocumentKeydown = this._onDocumentKeydown.bind(this);
  }

  get film() {
    return this._film;
  }

  set film(film) {
    this._film = film;
  }

  /**
   * Создает объект с данными нового комментария
   *
   * @param {String} comment текст комментария
   * @param {String} emoji эмоция
   * @return {Object} объект с данными нового комментария
   */
  _createCommentData(comment, emoji) {
    return {
      id: getNewCommentId(this.film.comments).toString(),
      comment: he.encode(comment),
      emotion: emoji,
      author: `Nevada O'Reilly`,
      date: new Date()
    };
  }

  /**
   * Создает попап с подробной информацией о фильме
   * @return {Promise}
   */
  _createPopup() {
    if (this.film.comments.length === this.film.commentsId.length) {
      return new Promise((resolve) => {
        this._popup = new FilmDetails(this.film);

        this._subscribePopupOnEvents();
        resolve();
      });
    }

    return this._api.getComments(this.film.id)
      .then((comments) => {
        this.film.comments = comments;
      })
      .then(() => {
        this._popup = new FilmDetails(this.film);

        this._subscribePopupOnEvents();
      });
  }

  /**
   * Закрывает попап-блок с подробной информацией о фильме
   */
  _closePopup() {
    document.removeEventListener(`keydown`, this._onDocumentKeydown);

    remove(this._popup);
    this._popup = null;
  }

  /**
   * Блокирует форму отправки комментария
   */
  _blockForm() {
    this._isCommentFormBlocked = true;
  }

  /**
   * Блокирует форму рейтинга
   */
  _blockRating() {
    this._isRatingFormBlocked = true;
  }

  /**
   * Деблокирует форму отправки комментария
   */
  _deblockForm() {
    const form = this._popup.getFormElement();
    const textarea = this._popup.getTextareaElement();

    form.classList.remove(INVALID_FORM_CLASS_NAME);
    textarea.style.outline = ``;

    this._isCommentFormBlocked = false;
  }

  /**
   * Деблокирует форму рейтинга
   */
  _deblockRating() {
    this._isRatingFormBlocked = false;
  }

  /**
   * Удаляет анимацию появляения попапа
   */
  _freezeAnimation() {
    if (getFreezeStyleElement()) {
      return;
    }

    const freezeStyle = document.createElement(`style`);

    freezeStyle.classList.add(FREEZE_STYLE_CLASS_NAME);
    freezeStyle.innerHTML = FREEZE_ANIMATION_STYLE;

    setTimeout(() => {
      document.body.appendChild(freezeStyle);
    }, FREEZE_ANIMATION_TIMEOUT);
  }

  /**
   * Возвращает анимацию появления попапа
   */
  _defrostAnimation() {
    const freezeStyle = getFreezeStyleElement();

    if (freezeStyle) {
      freezeStyle.remove();
    }
  }

  /**
   * Вешает на форму класс "ошибки"
   */
  _setInvalidClassForm() {
    const form = this._popup.getFormElement();
    const textarea = this._popup.getTextareaElement();

    form.classList.add(INVALID_FORM_CLASS_NAME);
    textarea.style.outline = INVALID_FORM_STYLE;
  }

  /**
   * Функция-callback обработчика клика по кнопке закрытия попапа
   */
  _onCloseButtonClick() {
    this._closePopup();
    this._defrostAnimation();
  }

  /**
   * Функция-callback обработчика нажатия клавиши (esc) на клавиатуре
   * закрывает попап-блок с подробной информацией о фильме
   *
   * @param {Event} evt
   */
  _onDocumentKeydown(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      this._closePopup();
      this._defrostAnimation();
    }
  }

  /**
   * Функция-callback для изменения сосотяния 'watchlist' фильма
   */
  _onWatchListChange() {
    this._onDataChange(this, Object.assign(Object.create(Film.prototype), this.film, {
      watchlist: !this.film.watchlist,
      watchingDate: !this.film.watchlist ? new Date().toISOString() : new Date(0).toISOString()
    }));

    if (getActiveFilterName() === `watchlist`) {
      remove(this._card);
    }
  }

  /**
   * Функция-callback для изменения сосотяния 'watched' фильма
   */
  _onWatchedChange() {
    this._blockRating();

    this._onDataChange(this, Object.assign(Object.create(Film.prototype), this.film, {
      history: !this.film.history,
      watchingDate: !this.film.history ? new Date().toISOString() : new Date(0).toISOString(),
      score: this.film.history ? 0 : this.film.score
    }))
    .then(() => this._deblockRating())
    .catch(() => this._deblockRating());

    if (getActiveFilterName() === `history`) {
      remove(this._card);
    }
  }

  /**
   * Функция-callback для изменения сосотяния 'favorites' фильма
   */
  _onFavoriteChange() {
    this._onDataChange(this, Object.assign(Object.create(Film.prototype), this.film, {
      favorites: !this.film.favorites,
      watchingDate: this.watchingDate ? this.watchingDate : new Date(0).toISOString()
    }));

    if (getActiveFilterName() === `favorites`) {
      remove(this._card);
    }
  }

  /**
   * Функция-callback для изменения рейтинга фильма
   *
   * @param {Number} rating значение рейтинга инпута
   */
  _onRatingChange(rating) {
    if (this._isRatingFormBlocked) {
      return;
    }

    this._onDataChange(this, Object.assign(Object.create(Film.prototype), this.film, {
      score: rating
    }))
    .then(() => this._deblockRating())
    .catch(() => this._deblockRating());
  }

  /**
   * Вешает на элемент попапа обработчики событий
   */
  _subscribePopupOnEvents() {
    this._popup.setCloseHandler(this._onCloseButtonClick, this._onDocumentKeydown);

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

    this._popup.setRatingButtonHandler((evt) => {
      evt.preventDefault();

      this._onRatingChange(+evt.target.value);
    });

    this._popup.setRatingResetHandler((evt) => {
      evt.preventDefault();

      this._onRatingChange(0);
    });

    this._popup.setDeleteCommentButtonHandler((evt) => {
      evt.preventDefault();

      if (this._isCommentFormBlocked) {
        return;
      }

      const comment = evt.target.closest(`.film-details__comment-delete`);

      if (!comment) {
        return;
      }

      const index = Array.from(this._popup.getCommentDeleteElements())
        .findIndex((item) => item === comment);

      if (index !== -1) {
        this.film.commentsId.splice(index, 1);
      }

      this._blockForm();

      this._api.deleteComment(this.film.comments[index].id, this.film.id)
        .then(() => {
          this._deblockForm();
          this._onDataChange(this, Object.assign(Object.create(Film.prototype), this.film));
          comment.remove();
        }).catch(() => {
          this._deblockForm();
          this._setInvalidClassForm();
        });
    });

    this._popup.setFormHandler((evt) => {
      if (evt.ctrlKey && evt.key === `Enter`) {
        const data = new Map(new FormData(evt.target.form));
        const comment = data.get(`comment`);
        const emoji = data.get(`comment-emoji`);

        this._deblockForm();

        if (comment && emoji) {
          this._api.setComment(this.film.id, this._createCommentData(comment, emoji))
            .then((film) => this._onDataChange(this, new Film(film.movie || film)))
            .catch(() => this._setInvalidClassForm());
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

      this._createPopup().then(() => {
        render(this._container, this._popup.getElement());

        this._freezeAnimation();
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
   * Устанавливает дефолтное положение карточки
   */
  setDefaultView() {
    if (this._popup) {
      this._closePopup();
      this._defrostAnimation();
    }
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
      this._createPopup()
      .then(() => oldPopup.getElement().replaceWith(this._popup.getElement()))
      .then(() => remove(oldPopup));
    }
  }
}
