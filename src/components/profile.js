import {getStringRating} from '../mock/profile';
import {createElement} from '../utils';

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

export default class Profile {
  constructor(filmsQuantity) {
    this._rating = getStringRating(filmsQuantity);
    this._element = null;
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

  /**
   * Возвращает ссылку на node-элемент меню
   *
   * @return {Node}
   */
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  /**
   * Очищает ссылку на node-элемент профиль
   */
  removeElement() {
    this._element = null;
  }
}
