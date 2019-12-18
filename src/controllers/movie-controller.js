import {render, remove} from '../utils/render';
import Card from '../components/card';
import FilmDetails from '../components/film-details';
import {ESC_KEYCODE} from '../constants';

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
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
    evt.preventDefault();

    if (evt.keyCode === ESC_KEYCODE) {
      this.closePopup();
    }
  }

  /**
   * Создает попап с подробной информацией о фильме
   */
  createPopup() {
    this._popup = new FilmDetails(this.film);

    this._subscribePopupOnEvents();
  }

  /**
   * Вешает на элемент попапа обработчики событий
   */
  _subscribePopupOnEvents() {
    this._popup.setCloseHandler(this.onCloseButtonClick, this.onDocumentKeydown);

    this._popup.setAddWatchlistButtonHandler((evt) => {
      evt.preventDefault();

      this._onDataChange(this, Object.assign({}, this.film, {
        watchlist: true,
        history: false
      }));
    });

    this._popup.setAlreadyWatchedButtonHandler((evt) => {
      evt.preventDefault();

      this._onDataChange(this, Object.assign({}, this.film, {
        watchlist: false,
        history: true
      }));
    });

    this._popup.setAddFavoriteButtonHandler((evt) => {
      evt.preventDefault();

      this._onDataChange(this, Object.assign({}, this.film, {
        favorites: !this.film.favorites
      }));
    });
  }

  /**
   * Вешает на элемент карточки необходимые обработчики события
   */
  _subscribeCardOnEvents() {
    this._card.setOpenDetailstHandler(() => {
      this._onViewChange();

      this.createPopup();

      render(this._container, this._popup.getElement());
    });

    this._card.setAddWatchlistButtonHandler((evt) => {
      evt.preventDefault();

      this._onDataChange(this, Object.assign({}, this.film, {
        watchlist: true,
        history: false
      }));
    });

    this._card.setAlreadyWatchedButtonHandler((evt) => {
      evt.preventDefault();

      this._onDataChange(this, Object.assign({}, this.film, {
        watchlist: false,
        history: true
      }));
    });

    this._card.setAddFavoriteButtonHandler((evt) => {
      evt.preventDefault();

      this._onDataChange(this, Object.assign({}, this.film, {
        favorites: !this.film.favorites
      }));
    });
  }

  /**
   *
   * @param {Object} film объект с данными фильма
   */
  render(film) {
    this.film = film;

    const oldPopup = this._popup;
    const oldCard = this._card;

    this._card = new Card(film);

    this._subscribeCardOnEvents();

    if (oldCard) {
      oldCard.getElement().replaceWith(this._card.getElement());
      remove(oldCard);
    } else {
      render(this._container, this._card.getElement());
    }

    if (oldPopup) {
      this.createPopup();

      oldPopup.getElement().replaceWith(this._popup.getElement());
      remove(oldPopup);
    }
  }
}
