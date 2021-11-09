import React from 'react';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
// import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import AuthProvider from './components/providers/AuthProvider.jsx';
import SocketProvider from './components/providers/SocketProvider.jsx';
import store from './store.js';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n.js';

import { addMessage } from './slices/messagesSlice.js';
import {
  addChannel,
  setCurrentChannel,
  deleteChannel,
  changeNameChannel,
} from './slices/channelsSlice.js';

import '../assets/application.scss';

// console.log(store);
// console.log('remove Channesl', deleteChannel);

// import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
// import Rollbar from 'rollbar';

// heroku addons:create deployhooks:http --url="https://api.rollbar.com/api/1/deploy/?access_token=cb90c916b6474920ab9d4c1c12b8d126&environment=production"
// const rollbarConfig = {
//   accessToken: 'cb90c916b6474920ab9d4c1c12b8d126',
//   captureUncaught: true,
//   captureUnhandledRejections: true,
//   payload: {
//     environment: 'production',
//   },
// };

const init = async (socketClient) => {
  // console.log('some text');

  // console.log('remove', deleteChannel, setCurrentChannel, renameChannel);

  const socket = socketClient;

  socket.on('newMessage', (msg) => {
    store.dispatch(addMessage(msg));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel));
    store.dispatch(setCurrentChannel(channel.id));
  });
  socket.on('removeChannel', ({ id }) => {
    console.log('remove channel dispatch id', id);
    store.dispatch(deleteChannel(id));
  });
  socket.on('renameChannel', (channel) => {
    store.dispatch(changeNameChannel(channel));
  });

  const sendMessage = (msg) => {
    console.log('send message in init', msg);
    socket.emit('newMessage', msg, (response) => {
      console.log('send message response', response.status);
    });
  };

  const createChannel = (channel) => {
    console.log('create Channle,', channel);
    socket.emit('newChannel', channel, (response) => {
      console.log(response.status);
    });
  };

  const removeChannel = (channel) => {
    console.log('socket remove', channel);
    socket.emit('removeChannel', channel, (response) => {
      console.log('removed Channel', response.status);
    });
  };

  const renameChannel = (channel) => {
    console.log('rename channel', channel);
    socket.emit('renameChannel', channel, (response) => {
      console.log(response.status);
    });
  };

  // Rollbar.error('Something went wrong');

  return (
    // <RollbarProvider config={rollbarConfig}>
    // <ErrorBoundary>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <SocketProvider
            sendMessage={sendMessage}
            createChannel={createChannel}
            removeChannel={removeChannel}
            renameChannel={renameChannel}
          >
            <App />
          </SocketProvider>
        </AuthProvider>
      </I18nextProvider>
    </Provider>
    // </ErrorBoundary>
    // </RollbarProvider>
  );
};

export default init;
