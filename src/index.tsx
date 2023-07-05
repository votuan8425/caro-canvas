import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { setupStore } from './redux/store';
import App from './App';

const store = setupStore();

const root = ReactDOM.createRoot(
  document.getElementById('tictactoe') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);