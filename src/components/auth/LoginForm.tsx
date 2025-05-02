import React from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { setUser } from "../../store/slices/userSlice";
import AuthForm from "./AuthForm";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { fetchTodoListsFromFirestore } from "../../store/slices/todoListsSlice";

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const auth = getAuth();
  const navigate = useNavigate();
  function handleLogin(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password).then(async ({ user }) => {
      const token = await user.getIdToken();

      const listsSnapshot = await getDocs(
        collection(db, "users", user.uid, "todoLists"),
      );
      const roles: Record<string, "admin" | "viewer"> = {};

      listsSnapshot.forEach((doc) => {
        const data = doc.data();
        const member = data.member || [];

        const userRole = member.find((m: any) => m.userId === user.uid)?.role;
        if (userRole === "admin" || userRole === "viewer") {
          roles[doc.id] = userRole;
        }
      });

      dispatch(
        setUser({
          email: user.email,
          id: user.uid,
          token: token,
          roles: roles,
        }),
      );

      dispatch(fetchTodoListsFromFirestore(user.uid));
      navigate("/");
    });
  }

  return <AuthForm title="login" handleClick={handleLogin} />;
};

export default LoginForm;
