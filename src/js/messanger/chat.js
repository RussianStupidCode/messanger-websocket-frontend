export default class Chat {
  constructor(socket) {
    this.socket = socket;
    this.el = document.createElement('div');
    this.el.classList.add(
      'chat',
      'overflow-auto',
      'p-3',
      'm-3',
      'border',
      'border-3',
      'border-primary'
    );

    this.setListeners();
    this.hide();
  }

  setListeners() {}

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
