import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import App from './App';
import authStore from './stores/authStore';

const stores = {
  authStore,
}

const renderApp = () => {
  render(
    <BrowserRouter>
      <Provider {...stores} >
        <App />
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
