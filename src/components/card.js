const MAX_LENGTH_DESCRIPTION = 139;

/**
 * Обрезает строку с описанием фильма до допустимой длинны
 *
 * @param {String} description строка с описанием фильма
 * @return {String} строка с описанием фильма допустимой длины
 */
const cropDescription = (description) => {
  if (description.length > MAX_LENGTH_DESCRIPTION) {
    description = `${description.substr(0, MAX_LENGTH_DESCRIPTION)}...`;
  }

  return description;
};

/**
 * Генерирует разметку карточки фильма в зависимсоти от переданных данных
 *
 * @param {Object} data объект с данными фильма
 * @return {String} строковое представление разметки карточки фильма
 */
const getCardComponent = (data) => `
  <article class="film-card">
    <h3 class="film-card__title">${data.name}</h3>
    <p class="film-card__rating">${data.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${data.year}</span>
      <span class="film-card__duration">${data.duration}</span>
      <span class="film-card__genre">${data.genre}</span>
    </p>
    <img src="images/posters/${data.poster}" alt="Постер ${data.name}" class="film-card__poster">
    <p class="film-card__description">${cropDescription(data.description)}</p>
    <a class="film-card__comments">${data.comments} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>
`;

/**
 * Генерирует разметку порции карточек на основании массива с данными
 *
 * @param {Array} cardsData массив с данными карточек
 * @return {String} строкове представление разметки массива карточек фильмов
 */
export const fillCardsMarkup = (cardsData) => cardsData.map((item) => getCardComponent(item)).join(``);
