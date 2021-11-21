import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './components/App.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import ApiProvider from './providers/ApiProvider.jsx';
import store from './store.js';
import { addMessage } from './slices/messagesSlice.js';
import geti18nInstance from './i18n/i18n.js';
// import getRollbarConfig from './rollbar/config.js';
import { addChannel, deleteChannel, changeNameChannel } from './slices/channelsSlice.js';
// console.log(process.env.NODE_ENV);
// console.log(process.env.ROLLBAR_TOKEN);
// const getRollbarConfig = () => ({
//   accessToken: 'cb90c916b6474920ab9d4c1c12b8d126',
//   captureUncaught: true,
//   captureUnhandledRejections: true,
//   payload: {
//     environment: 'production',
//   },
// });

const init = async (socket) => {
  const i18nInstance = await geti18nInstance();

  // console.log(process);

  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };
  // const rollbarConfig = getRollbarConfig();

  socket.on('newMessage', (msg) => {
    store.dispatch(addMessage(msg));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel));
  });
  socket.on('removeChannel', ({ id }) => {
    store.dispatch(deleteChannel(id));
  });
  socket.on('renameChannel', (channel) => {
    store.dispatch(changeNameChannel(channel));
  });

  

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18nInstance}>
            <AuthProvider>
              <ApiProvider socket={socket}>
                <App />
              </ApiProvider>
            </AuthProvider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
