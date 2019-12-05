import {getStringRating} from '../mock/profile';

/**
 * Возвращает разметку профиля со строковым представлением рейтинга
 *
 * @param {String} rating наименование рейтинга пользователя
 * @return {String} разметка компонента "профиль"
 */
const getProfileMarkup = (rating) => `
  <section class="header__profile profile">
    <p class="profile__rating">${rating}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
`;

/**
 * Возвращает разметку профиля в зависимости от количетства просмотренных пользователем фильмов
 *
 * @param {Number} filmsQuantity количество просмотренных фильмов
 * @return {String} разметка компонента "профиль"
 */
export const getProfileComponent = (filmsQuantity) => {
  const rating = getStringRating(filmsQuantity);

  return getProfileMarkup(rating);
};
