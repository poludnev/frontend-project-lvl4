// @ts-check
// import React from 'react';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import '../assets/application.scss';

// import App from './App.jsx';
// import AuthPtovider from './components/authProvider/authProvider.jsx';
// import { store } from './store.js';
// import { Provider } from 'react-redux';

// import 'core-js/stable/index.js';
// import 'regenerator-runtime/runtime.js';

// import '../assets/application.scss';

import init from './init.jsx';

// @ts-ignore

// import Rollbar from 'rollbar';
// var rollbar = new Rollbar({
//   accessToken: 'a6cf783a913e42f7aec4a319f560848f',
//   captureUncaught: true,
//   captureUnhandledRejections: true,
// });

// // record a generic message and send it to Rollbar
// rollbar.log('Hello world!');

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const app = async () => {
  // console.log('test');
  const socketClient = io();
  const vdom = await init(socketClient);

  ReactDOM.render(vdom, document.querySelector('#chat'));
  return vdom;

  // return init(socketClient);
};

export default app();

// const p = document.createElement('p');
// p.classList.add('card-text');
// p.textContent = 'It works!';

// const h5 = document.createElement('h5');
// h5.classList.add('card-title');
// h5.textContent = 'Project frontend l4 boilerplate';

// const cardBody = document.createElement('div');
// cardBody.classList.add('card-body');
// cardBody.append(h5, p);

// const card = document.createElement('div');
// card.classList.add('card', 'text-center');
// card.append(cardBody);

// const container = document.querySelector('#chat');
// container.append(card);

// ReactDOM.render(
// <Provider store={store}>
//   <AuthPtovider>
//     <App />
//   </AuthPtovider>
// </Provider>,

//   container,
// );
// console.log('it works!');
//
