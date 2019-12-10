import {remove} from "../utils/render";
import {ESC_KEYCODE} from '../constants';

export default class PopupController {
  constructor(popup) {
    this._popup = popup;

    this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
    this.onDocumentKeydown = this.onDocumentKeydown.bind(this);
  }

  getElement() {
    return this._popup.getElement();
  }

  /**
   * Закрывает попап-блок с подробной информацией о фильме
   */
  closePopup() {
    const closeButton = this.getElement().querySelector(`.film-details__close-btn`);

    closeButton.removeEventListener(`click`, this.onCloseButtonClick);
    document.removeEventListener(`keydown`, this.onDocumentKeydown);

    remove(this._popup);
  }

  /**
   * Функция-callback обработчика клика по кнопке закрытия попапа
   */
  onCloseButtonClick() {
    this.closePopup();
  }

  /**
   * Функция-callback обработчика нажатия клавиши (esc) на клавиатуре
   * закрывает попап-блок с подробной информацией о фильме
   *
   * @param {Event} evt
   */
  onDocumentKeydown(evt) {
    evt.preventDefault();

    if (evt.keyCode === ESC_KEYCODE) {
      this.closePopup();
    }
  }

  setHandler() {
    this._popup.setHandler(this.onCloseButtonClick, this.onDocumentKeydown);
  }
}
