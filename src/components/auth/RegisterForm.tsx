import React from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from "../../hooks/reduxHooks";
import AuthForm from "./AuthForm";
import { setUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleRegister(email: string, password: string) {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password).then(
      async ({ user }) => {
        const token = await user.getIdToken();

        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: token,
            roles: {},
          }),
        );
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
        });
        navigate("/");
      },
    );
  }

  return <AuthForm title="Register" handleClick={handleRegister} />;
};

export default RegisterForm;
