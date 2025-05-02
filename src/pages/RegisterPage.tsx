import React from "react";

import Header from "../components/Header";
import RegisterForm from "../components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center">
        <RegisterForm />
      </div>
    </>
  );
};

export default RegisterPage;
