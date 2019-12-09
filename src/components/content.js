import AbstractComponent from './abstract-component.js';

/**
 * Генерирует разметку основого блока с контентом
 *
 * @return {String} строкове представление разметки блока фильмов
 */
const getBlockFilmsMarkup = () => `
  <section class="films">
   </section>
`;


export default class ContentBlock extends AbstractComponent {
  constructor() {
    super();
  }

  /**
   * Генерирует разметку контентного блока
   *
   * @return {String} возвращщает разметку компонента контентного блока
   */
  getTemplate() {
    return getBlockFilmsMarkup();
  }
}
