import Messanger from './messanger/messanger';
import Socket from './socket';

const root = document.querySelector('.root');

const socket = new Socket('ws://git-messanger-backend.herokuapp.com');
socket.open();

const form = new Messanger(socket);

form.bindToDOM(root);
