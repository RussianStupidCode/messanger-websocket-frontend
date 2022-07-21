import Message from '../message';
import MESSAGE_TYPES from '../message-types';

export default class UserList {
  static createUserItem(userName, isCurrentUser) {
    const element = document.createElement('span');
    element.classList.add(
      'user-list-item',
      'd-inline-block',
      'badge',
      'p-3',
      'mb-2',
      'w-100'
    );
    element.textContent = userName;

    if (isCurrentUser) {
      element.classList.add('bg-success');
    } else {
      element.classList.add('bg-primary');
    }

    return element;
  }

  constructor(socket) {
    this.socket = socket;
    this.el = document.createElement('div');
    this.el.classList.add(
      'user-list',
      'm-3',
      'p-3',
      'border',
      'border-3',
      'border-primary'
    );

    this.setListeners();
    this.hide();
  }

  setListeners() {
    this.socket.addEventListener('message', (data) => {
      const serverMessage = Message.fromObject(data);

      if (serverMessage.type !== MESSAGE_TYPES.usersList) {
        return;
      }

      this.setUserList(serverMessage.content);
    });
  }

  setUserList(users) {
    this.el.innerHTML = '';

    users.forEach((user) => {
      const item = UserList.createUserItem(user, false);
      this.el.insertAdjacentElement('beforeEnd', item);
    });

    const selfUser = UserList.createUserItem('You', true);
    this.el.insertAdjacentElement('beforeEnd', selfUser);
  }

  show() {
    this.el.classList.remove('d-none');
  }

  hide() {
    this.el.classList.add('d-none');
  }

  bindToDOM(parentEl) {
    parentEl.insertAdjacentElement('beforeEnd', this.el);
  }
}
