import AbstractComponent from './abstract-component';
import {transformFilmDuration, getCommentDate} from '../utils/common';
import {DEBOUNCE_TIMEOUT} from '../constants';
import moment from 'moment';

/**
 * Возвращает разметку блока оценки фильма, если фильм просмотрен
 *
 * @param {Object} film объект с данными фильма
 * @return {String} строкове представление разметки блока с оценкой фильма
 */
const getMiddleContainerMarkup = (film) => {
  const {history, score, poster} = film;
  if (!history) {
    return ``;
  }

  return `<div class="form-details__middle-container">
    <section class="film-details__user-rating-wrap">
      <div class="film-details__user-rating-controls">
        <button class="film-details__watched-reset" type="button">Undo</button>
      </div>

      <div class="film-details__user-score">
        <div class="film-details__user-rating-poster">
          <img src="${poster}" alt="film-poster" class="film-details__user-rating-img">
        </div>

        <section class="film-details__user-rating-inner">
          <h3 class="film-details__user-rating-title">The Great Flamarion</h3>

          <p class="film-details__user-rating-feelings">How you feel it?</p>

          <div class="film-details__user-rating-score">
            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1" ${score === 1 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-1">1</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2" ${score === 2 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-2">2</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3" ${score === 3 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-3">3</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4" ${score === 4 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-4">4</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5" ${score === 5 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-5">5</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6" ${score === 6 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-6">6</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7" ${score === 7 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-7">7</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8" ${score === 8 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-8">8</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9"  ${score === 9 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-9">9</label>

          </div>
        </section>
      </div>
    </section>
  </div>`;
};

/**
 * Возвращает разметку блока с комментариями
 *
 * @param {Array} comments массив с комментариями
 * @return {String} строкове представление разметки блока с комментариями
 */
const getCommentsMarkup = (comments) => {
  return comments.map((item) => {
    const {comment, emotion, author, date} = item;

    return `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji">
        </span>
        <div>
          <p class="film-details__comment-text">${comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${getCommentDate(date)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>
    `;
  })
  .join(``);

};

/**
 * Генерирует разметку равернутой карточки фильма в зависимсоти от переданных данных
 *
 * @param {Object} film объект с данными фильма
 * @return {String} строковое представление разметки развернутой карточки фильма
 */
const getFilmDetailsMarkup = (film) => {
  const {poster, age, name, alternativeName, rating, director, writers, actors, country, genres, description, watchlist, history, favorites, comments, date, duration} = film;

  return `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">${age}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${name}</h3>
                  <p class="film-details__title-original">Original: ${alternativeName}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tbody><tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${moment(date).format(`DD MMMM YYYY`)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${transformFilmDuration(duration)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genres.length > 1 ? `Genres` : `Genre`}</td>
                  <td class="film-details__cell">
                    ${genres.map((item) => `<span class="film-details__genre">${item}</span>`).join(``)}
                </tr>
              </tbody></table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${history ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favorites ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        ${getMiddleContainerMarkup(film)}

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${getCommentsMarkup(comments)}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="puke">
                <label class="film-details__emoji-label" for="emoji-gpuke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>
  `;
};

export default class FilmDetails extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  /**
   * Декоратор debounce
   *
   * @param {Function} handler
   * @param {Number} timeout
   * @return {Function}
   */
  _debounce(handler, timeout) {
    let isCooldown = false;

    return (evt) => {
      if (isCooldown) {
        return;
      }

      handler(evt);

      isCooldown = true;

      setTimeout(() => {
        isCooldown = false;
      }, timeout);
    };
  }


  /**
   * Генерирует разметку развернутой карточки фильма
   *
   * @return {String} строковое представление разметки карточки фильма
   */
  getTemplate() {
    return getFilmDetailsMarkup(this._film);
  }

  /**
   *
   * @param {Function} cardHandler обработчик клика по кнопке закрытия попапа
   * @param {Function} documentHandler обработчик нажатия клавиши на клавиатуре
   */
  setCloseHandler(cardHandler, documentHandler) {
    const closeButton = this.getElement().querySelector(`.film-details__close-btn`);
    closeButton.addEventListener(`click`, cardHandler);
    document.addEventListener(`keydown`, documentHandler);
  }

  /**
   * Вешает обработчик клика на кнопку "Add to watchlist"
   *
   * @param {Function} handler
   */
  setAddWatchlistButtonHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, this._debounce(handler, DEBOUNCE_TIMEOUT));
  }

  /**
   * Вешает обработчик клика на кнопку "Already watched"
   *
   * @param {Function} handler
   */
  setAlreadyWatchedButtonHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, this._debounce(handler, DEBOUNCE_TIMEOUT));
  }

  /**
   * Вешает обработчик клика на кнопку "Add to favorites"
   *
   * @param {Function} handler
   */
  setAddFavoriteButtonHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, this._debounce(handler, DEBOUNCE_TIMEOUT));
  }

  /**
   * Вешает обработчик клика на кнопки удаления комментария
   *
   * @param {Function} handler
   */
  setDeleteCommentButtonHandler(handler) {
    this.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((item) => {
      item.addEventListener(`click`, handler);
    });
  }

  /**
   * Вешает обработчик события input на кнопки оценки рейтинга
   *
   * @param {Function} handler
   */
  setRatingButtonHandler(handler) {
    const ratingInputs = this.getElement().querySelectorAll(`.film-details__user-rating-input`);

    if (ratingInputs.length) {
      ratingInputs.forEach((item) => {
        item.addEventListener(`input`, handler);
      });
    }
  }

  /**
   * Вешает обработчик клика на кнопке сброса рейтинга
   *
   * @param {Function} handler
   */
  setRatingResetHandler(handler) {
    const ratingReset = this.getElement().querySelector(`.film-details__watched-reset`);

    if (ratingReset) {
      ratingReset.addEventListener(`click`, handler);
    }
  }

  /**
   * Вешает обработчик сабмита на форму
   *
   * @param {Function} handler
   */
  setFormHandler(handler) {
    this.getElement().querySelector(`.film-details__inner`)
      .addEventListener(`keydown`, handler);
  }
}
