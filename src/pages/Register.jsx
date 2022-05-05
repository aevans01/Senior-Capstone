import React from "react";
import RegisterForm from "../components/layout/RegisterForm";
import regiBanner from "../assets/testBanner.jfif";

function Register() {
  return (
    <div className="registerContainer">
      <div className="banner">
        <h1 className="bannerText">Registration</h1>
      </div>
      <div className="registerFormContainer">
        <h2>Create an Account</h2>
        <RegisterForm />
      </div>
    </div>
  );
}

export default Register;
