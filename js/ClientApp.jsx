import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import MuiThemeProvider from 'materal-ui/styles/MuiThemeProvider'

import App from './App';
import authStore from './stores/authStore';

const stores = {
  authStore,
}

const renderApp = () => {
  render(
    <BrowserRouter>
      <Provider {...stores} >
        <MuiThemeProvider>
          <App />
        </MuiThemeProvider>
      </Provider>
    </BrowserRouter>,
    document.getElementById('app')
  );
};
renderApp();

if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp();
  });
}
