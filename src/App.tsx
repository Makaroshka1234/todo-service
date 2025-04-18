import React from 'react';

import './App.css';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
