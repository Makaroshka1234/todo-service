import React from 'react';
import { SnackbarProvider } from 'notistack';
import { Route, Routes } from 'react-router';

import Home from './pages/Home';
import NotFound from './pages/NotFound';


import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store';




function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
