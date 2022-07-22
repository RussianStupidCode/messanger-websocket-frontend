import Message from '../message';
import MESSAGE_TYPES from '../message-types';
import UserMessage from './userMessage';

export default class Chat {
  constructor(socket) {
    this.socket = socket;
    this.el = document.createElement('div');
    this.el.classList.add(
      'chat',
      'p-2',
      'm-3',
      'border',
      'border-3',
      'border-primary'
    );

    this.chatContent = document.createElement('div');
    this.chatContent.classList.add(
      'w-100',
      'p-2',
      'mb-2',
      'chat-content',
      'overflow-auto'
    );

    this.input = document.createElement('input');
    this.input.classList.add('w-100', 'form-control');
    this.input.placeholder = 'type your message';

    this.el.insertAdjacentElement('beforeEnd', this.chatContent);
    this.el.insertAdjacentElement('beforeEnd', this.input);

    this.setListeners();
    this.hide();
  }

  setListeners() {
    this.input.addEventListener('keypress', (event) => {
      if (event.key !== 'Enter') {
        return;
      }

      const { value } = this.input;

      if (value.length === 0) {
        return;
      }

      const message = Message.fromObject({
        type: MESSAGE_TYPES.userMessage,
        content: value,
      });

      this.input.value = '';

      this.socket.send(message);
    });

    this.socket.addEventListener('message', (object) => {
      if (object.type !== MESSAGE_TYPES.userMessage) {
        return;
      }

      const message = Message.fromObject(object);

      const userMessage = new UserMessage(
        message.fields.senderName,
        message.content,
        message.date,
        message.fields.isYouOwner
      );

      userMessage.bindToDOM(this.chatContent);
    });
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
