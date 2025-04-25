import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router';

import './firebase'
import { Provider } from 'react-redux';
import { store } from './store/store';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

