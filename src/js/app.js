import Messanger from './messanger/messanger';
import Socket from './socket';

const root = document.querySelector('.root');

const socket = new Socket('ws://localhost:8080');
socket.open();

const form = new Messanger(socket);

form.bindToDOM(root);
