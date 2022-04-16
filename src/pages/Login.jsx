import React, { createContext, useContext, useEffect, useState } from "react";
import MyInput from "../components/Input/MyInput";
import MyButton from "../components/MyButton/MyButton";
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "../components/context";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import App from "../App";
import Main from "./Main";
import useToken from "../components/hooks/useToken";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [main, setMain] = useState(false);
  const { token, setToken } = useToken();
  // const [token, setToken] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      debugger;
      navigate("/main");
    }
  }, [token]);

  async function login(event) {
    event.preventDefault();
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    const response = await fetch(
      "http://localhost:3000/user/login",
      config
    ).then((res) => res.json());
    console.log("login", response);
    // debugger;
    await setToken(response.token);
    navigate("/main");
  }

  return (
    <div className="login">
      <h1>Login</h1>

      <form className="login__form" onSubmit={login}>
        <label>
          <MyInput
            type="text"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </label>
        <label>
          <MyInput
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>
        <MyButton type="submit">Login</MyButton>
      </form>
    </div>
  );
};

export default Login;
