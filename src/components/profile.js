import AbstractComponent from './abstract-component.js';
import {getStringRating} from '../utils/common';

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

export default class Profile extends AbstractComponent {
  constructor(filmsQuantity) {
    super();

    this._rating = getStringRating(filmsQuantity);
  }

  /**
   * Возвращает разметку профиля в зависимости от количетства просмотренных пользователем фильмов
   *
   * @param {Number} filmsQuantity количество просмотренных фильмов
   * @return {String} разметка компонента "профиль"
   */
  getTemplate() {
    return getProfileMarkup(this._rating);
  }
}
