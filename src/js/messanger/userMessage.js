import { dateFormat } from '../utils';

export default class UserMessage {
  constructor(name, content, date, isCurrentUser) {
    this.el = document.createElement('div');
    this.el.classList.add('user-message', 'mb-2');

    const titleElement = document.createElement('span');
    titleElement.classList.add('badge', 'mb-2', 'user-message-title');

    titleElement.textContent = `${name}, ${dateFormat(date)}`;

    const contentElement = document.createElement('pre');
    contentElement.classList.add('user-message-content');
    contentElement.textContent = content;

    if (isCurrentUser) {
      titleElement.classList.add('bg-success', 'alignt-self-end');
      contentElement.classList.add('alignt-self-end');
    } else {
      titleElement.classList.add('bg-primary', 'align-self-start');
      contentElement.classList.add('alignt-self-start');
    }

    this.el.insertAdjacentElement('beforeEnd', titleElement);
    this.el.insertAdjacentElement('beforeEnd', contentElement);
  }

  bindToDOM(parentEl) {
    parentEl.insertAdjacentElement('beforeEnd', this.el);
  }
}
