import AbstractComponent from './abstract-component.js';

/**
 * @return {String} строковое представление разметки кнопки Show more
 */
const getReadMoreButtonMarkup = () => `
  <button class="films-list__show-more">Show more</button>
`;

export default class ReadMoreButton extends AbstractComponent {
  /**
   * @return {String} строковое представление разметки кнопки Show more
   */
  getTemplate() {
    return getReadMoreButtonMarkup();
  }
}
