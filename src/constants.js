const ratings = new Map([
  [0, ``],
  [10, `novice`],
  [20, `fan`],
  [Infinity, `movie buff`]
]);
const commentDates = new Map([
  [`now`, {
    size: 1,
    magnitude: `minutes`,
  }],
  [`a minute ago`, {
    size: 3,
    magnitude: `minutes`,
  }],
  [`a few minutes ago`, {
    size: 1,
    magnitude: `hours`,
  }],
  [`a hour ago`, {
    size: 2,
    magnitude: `hours`,
  }],
  [`a few hours ago`, {
    size: 1,
    magnitude: `days`,
  }],
]);
const CARD_QUANTITY = 5;
const EXTRA_CARD_QUANTITY = 2;
const MINUTES_PER_HOUR = 60;
const extraListsOptions = {
  ratedTitle: `Top rated`,
  ratedProperty: `rating`,
  commentedTitle: `Most commented`,
  commentedProperty: `commentsId`,
};
const filterNames = [`Watchlist`, `History`, `Favorites`];
const MAX_LENGTH_DESCRIPTION = 139;
const ESC_KEYCODE = 27;
const DEBOUNCE_TIMEOUT = 500;

export {
  ratings,
  commentDates,
  CARD_QUANTITY,
  EXTRA_CARD_QUANTITY,
  MINUTES_PER_HOUR,
  extraListsOptions,
  filterNames,
  MAX_LENGTH_DESCRIPTION,
  ESC_KEYCODE,
  DEBOUNCE_TIMEOUT
};
