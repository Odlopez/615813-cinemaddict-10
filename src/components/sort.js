import AbstractComponent from './abstract-component.js';

const getSortMarkup = () => `
  <ul class="sort">
    <li><a href="#" data-sort="default" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" data-sort="date" class="sort__button">Sort by date</a></li>
    <li><a href="#" data-sort="rating" class="sort__button">Sort by rating</a></li>
  </ul>
`;

export default class Sort extends AbstractComponent {
  /**
   * Генерирует разметку всего меню сортировки
   *
   * @return {String} возвращщает разметку компонента сортировки
   */
  getTemplate() {
    return getSortMarkup();
  }

  /**
   * Инициализирует обработчики на элементе
   *
   * @param {Function} callback
   */
  setHandler(callback) {
    const sortButtons = this.getElement().querySelectorAll(`.sort__button`);

    sortButtons.forEach((button) => {
      button.addEventListener(`click`, (evt) => {
        evt.preventDefault();

        const sortValue = evt.currentTarget.dataset[`sort`];

        sortButtons.forEach((item) => {
          item.classList[item === evt.currentTarget ? `add` : `remove`](`sort__button--active`);
        });

        callback(sortValue);
      });
    });
  }
}
