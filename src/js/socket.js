export default class Socket {
  constructor(url) {
    this.url = url;
    this.socket = null;
  }

  open() {
    this.socket = new WebSocket(this.url);
  }

  addEventListener(eventName, callback) {
    this.socket.addEventListener(eventName, (event) => {
      try {
        const object = JSON.parse(event.data);
        callback(object);
      } catch (error) {
        callback({ error: String(error) });
      }
    });
  }

  send(message) {
    this.socket.send(JSON.stringify(message.toObject()));
  }
}
