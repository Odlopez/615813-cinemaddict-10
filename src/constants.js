export const ratings = new Map([
  [0, ``],
  [10, `novice`],
  [20, `fan`],
  [Infinity, `movie buff`]
]);
export const commentDates = new Map([
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
  [`a hour ago`, {
    size: 1,
    magnitude: `days`,
  }],
]);
export const CARD_QUANTITY = 5;
export const EXTRA_CARD_QUANTITY = 2;
export const MINUTES_PER_HOUR = 60;
export const extraListsOptions = {
  ratedTitle: `Top rated`,
  ratedProperty: `rating`,
  commentedTitle: `Most commented`,
  commentedProperty: `commentsId`,
};
export const filterNames = [`Watchlist`, `History`, `Favorites`];
export const emotionNames = [`smile`, `sleeping`, `puke`, `angry`];
export const MAX_LENGTH_DESCRIPTION = 139;
export const ESC_KEYCODE = 27;
export const DEBOUNCE_TIMEOUT = 500;
