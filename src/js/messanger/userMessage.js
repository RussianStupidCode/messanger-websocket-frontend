import { dateFormat } from '../utils';

export default class UserMessage {
  constructor(name, content, date, isCurrentUser) {
    this.el = document.createElement('div');
    this.el.classList.add('user-message', 'mb-2');

    const titleElement = document.createElement('span');
    titleElement.classList.add('badge', 'mb-2', 'user-message-title');

    titleElement.textContent = `${name}, ${dateFormat(date)}`;

    const contentElement = document.createElement('pre');
    contentElement.classList.add(
      'user-message-content',
      'border',
      'border-2',
      'p-2',
      'rounded'
    );
    contentElement.textContent = content;

    if (isCurrentUser) {
      titleElement.classList.add('bg-success', 'align-self-end');
      contentElement.classList.add('align-self-end', 'border-success');
    } else {
      titleElement.classList.add('bg-primary', 'align-self-start');
      contentElement.classList.add('alignt-self-start', 'border-primary');
    }

    this.el.insertAdjacentElement('beforeEnd', titleElement);
    this.el.insertAdjacentElement('beforeEnd', contentElement);
  }

  bindToDOM(parentEl) {
    parentEl.insertAdjacentElement('beforeEnd', this.el);
  }
}
