import moment from 'moment';
import Message from '../message';
import MESSAGE_TYPES from '../message-types';
import Chat from './chat';
import LoginForm from './loginForm';
import UserList from './userList';

export default class Messanger {
  constructor(socket) {
    this.socket = socket;
    this.el = document.createElement('div');
    this.el.classList.add('messanger');

    this.loginForm = new LoginForm();
    this.userList = new UserList(socket);
    this.chat = new Chat(socket);

    this.nonactiveFilter = document.createElement('div');
    this.nonactiveFilter.classList.add('nonactive-filter');

    this.loginForm.bindToDOM(this.el);
    this.userList.bindToDOM(this.el);
    this.chat.bindToDOM(this.el);

    this.setListeners();
  }

  get isLogin() {
    return this.loginForm.isHide;
  }

  setListeners() {
    this.loginForm.setSendCallback((userName) => {
      if (this.isLogin) {
        return;
      }

      if (userName.length === 0) {
        this.loginForm.showError('empty name');
        return;
      }

      const message = new Message({
        type: MESSAGE_TYPES.login,
        content: userName,
        date: moment().unix,
      });

      try {
        this.socket.send(message);
      } catch (err) {
        this.loginForm.showError(String(err));
      }
    });

    this.socket.addEventListener('message', (data) => {
      if (this.isLogin) {
        return;
      }

      if ('error' in data) {
        this.loginForm.showError(data.error);
        return;
      }

      this.loginForm.hide();
      this.unblockingMessanger();
      this.userList.show();
      this.chat.show();
    });
  }

  blockingMessanger() {
    this.nonactiveFilter.classList.remove('d-none');
  }

  unblockingMessanger() {
    this.nonactiveFilter.classList.add('d-none');
  }

  bindToDOM(parentEl) {
    parentEl.insertAdjacentElement('beforeEnd', this.el);
    parentEl.insertAdjacentElement('beforeEnd', this.nonactiveFilter);
  }
}
