import React, { createContext, useContext, useEffect, useState } from "react";
import MyInput from "../components/Input/MyInput";
import MyButton from "../components/MyButton/MyButton";
import { AuthContext } from "../components/context";

const Login = () => {
  const [isAuth, setIsAuth] = useContext(AuthContext);
  const [token, setToken] = useContext("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(event) {
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
    await fetch("http://localhost:3000/user/login", config)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(setIsAuth(true))
      .catch((error) => console.log("ERROR"));

    console.log("login: ", isAuth);
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
