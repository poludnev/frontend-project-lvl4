import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './components/App.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import ApiContext from './contexts/apiContext.jsx';
import store from './store.js';
import createApi from './api/index.js';
import geti18nInstance from './i18n/i18n.js';

const init = async (socketClient) => {
  const i18nInstance = await geti18nInstance();
  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

  const api = createApi(socketClient, store);

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18nInstance}>
            <AuthProvider>
              <ApiContext.Provider value={api}>
                <App />
              </ApiContext.Provider>
            </AuthProvider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
