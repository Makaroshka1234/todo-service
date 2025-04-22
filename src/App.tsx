import React from 'react';
import { SnackbarProvider } from 'notistack';
import { Route, Routes } from 'react-router';

import Home from './pages/Home';
import NotFound from './pages/NotFound';


import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ListPage from './pages/ListPage';
import MyLists from './pages/MyLists';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import RegisterPage from './pages/RegisterPage';





function App() {
  return (
    < >
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/lists/:id' element={<ListPage />} />
            <Route path='/lists' element={<MyLists />} />
            <Route path='/login' element={<Login />} />
            <Route path='register' element={<RegisterPage />} />
          </Routes>
        </SnackbarProvider>
      </Provider>
    </>
  );
}

export default App;
