import {render} from '../utils/render';
import Menu from '../components/menu';
import {filterNames} from '../constants';

const main = document.querySelector(`.main`);

export default class MenuController {
  constructor(pageController) {
    this._pageController = pageController;
  }

  /**
   *
   * @param {Array} films
   */
  render(films) {
    const menuInstance = new Menu(films);
    render(main, menuInstance.getElement());

    menuInstance.setHandler((evt) => {
      evt.preventDefault();

      const filterLinks = document.querySelectorAll(`.main-navigation__item:not(.main-navigation__item--additional)`);
      const filterValue = evt.currentTarget.href.match(/#.{1,}/)[0].slice(1);
      const sortedFilms = filterNames.find((item) => item.toLowerCase() === filterValue.toLowerCase()) ? films.filter((item) => item[filterValue]) : films;

      filterLinks.forEach((item) => item.classList.remove(`main-navigation__item--active`));
      evt.currentTarget.classList.add(`main-navigation__item--active`);

      this._pageController.render(sortedFilms);
    });
  }
}
