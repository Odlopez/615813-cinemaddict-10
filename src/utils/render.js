/**
 * Отрисовывает разметку в указанном месте
 *
 * @param {Node} container элемент, относительно которого добавляется разметка
 * @param {Node} element DOM-узел, который вставляем
 * @param {String} position позиция, в которою будет вставлена разметка
 */
export const render = (container, element, position = `beforeend`) => {
  container.insertAdjacentElement(position, element);
};

/**
 * Удаляет элемент из разметки и "очищает" ссылку на него
 *
 * @param {Object} component инстанс класса компонента
 */
export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

/**
 * Создает Node-элемент на основании переданной разметки
 *
 * @param {String} markup
 * @return {Node} DOM-узел
 */
export const createElement = (markup) => {
  const container = document.createElement(`div`);

  container.innerHTML = markup;

  return container.firstElementChild;
};
