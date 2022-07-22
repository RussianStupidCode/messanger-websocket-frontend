export default class LoginForm {
  constructor() {
    this.sendCallback = null;
    this.el = document.createElement('form');
    this.el.classList.add('login-form', 'border', 'border-success', 'border-4');

    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.classList.add('form-control', 'mb-3');

    const label = document.createElement('label');
    label.classList.add('mb-3');
    label.textContent = 'Выберите псевдоним';

    this.error = document.createElement('span');
    this.error.classList.add('badge', 'bg-danger', 'd-none', 'mb-2', 'p-2');

    this.button = document.createElement('button');
    this.button.type = 'submit';
    this.button.classList.add('btn', 'btn-primary');
    this.button.textContent = 'Продолжить';

    this.el.insertAdjacentElement('beforeEnd', label);
    this.el.insertAdjacentElement('beforeEnd', this.input);
    this.el.insertAdjacentElement('beforeEnd', this.error);
    this.el.insertAdjacentElement('beforeEnd', this.button);

    this.setListeners();
  }

  setListeners() {
    this.el.addEventListener('submit', (event) => {
      event.preventDefault();
      this.sendCallback(this.input.value.trim());
    });
  }

  get isHide() {
    return this.el.classList.contains('d-none');
  }

  setSendCallback(sendCallback) {
    this.sendCallback = sendCallback;
  }

  show() {
    this.el.classList.remove('d-none');
  }

  hide() {
    this.el.classList.add('d-none');
  }

  showError(message) {
    this.error.classList.remove('d-none');
    this.error.textContent = message;
  }

  bindToDOM(parentEl) {
    parentEl.insertAdjacentElement('beforeEnd', this.el);
  }
}
