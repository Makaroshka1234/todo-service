import React, { useEffect } from "react";
import { SnackbarProvider } from "notistack";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { Provider } from "react-redux";

import { store } from "./store/store";
import { fetchTodoListsFromFirestore } from "./store/slices/todoListsSlice";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ListPage from "./pages/ListPage";
import MyLists from "./pages/MyLists";
import Login from "./pages/LoginPage";

import RegisterPage from "./pages/RegisterPage";

import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";

import "./App.css";

function App() {
  const userId = useAppSelector((state) => state.user.id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      dispatch(fetchTodoListsFromFirestore(userId));
    } else {
      navigate("/");
    }
  }, [userId, dispatch]);

  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/lists/:id" element={<ListPage />} />
          <Route path="/lists" element={<MyLists />} />
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<RegisterPage />} />
        </Routes>
      </SnackbarProvider>
    </>
  );
}

export default App;
