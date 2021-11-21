// @ts-check
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import init from './init.jsx';
import '../assets/application.scss';

// @ts-ignore
if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const app = async (socketClient) => {
  const vdom = await init(socketClient);
  ReactDOM.render(vdom, document.querySelector('#chat'));
  return vdom;
};

const socket = io();

app(socket);

export default app;
