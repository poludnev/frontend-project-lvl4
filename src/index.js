// @ts-check
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import init from './init.jsx';
import '../assets/application.scss';
// import 'react-toastify/dist/ReactToastify.css';

// @ts-ignore

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

// const app = async (socketClient) => {
const app = async (socketClient) => {
  // console.log('test');
  // const socketClient = io();
  const vdom = await init(socketClient);
  ReactDOM.render(vdom, document.querySelector('#chat'));
  return vdom;

  // return init(socketClient);
};

const socket = io();

app(socket);

// const app = async (socketClient) => {
//   const vdom = await init(socketClient);
//   return vdom;
// };

export default app;
