import React, { useState, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import Logout from "../pages/Logout";

const Login = () => {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
      setLoginSuccess(true);
    }
  }, []);

  if (loginSuccess && user) {
    return (
      <div>
        <Logout />
      </div>
    );
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
