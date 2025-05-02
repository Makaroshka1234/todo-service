import React from "react";

import Header from "../components/Header";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
