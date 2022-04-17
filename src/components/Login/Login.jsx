import React from "react";
import { useRef, useState, useEffect } from "react";
import AuthContext from "../../context/AuthProvider";
import { useContext } from "react";
import MyButton from "../MyButton/MyButton";
import MyInput from "../Input/MyInput";
import cl from "./Login.module.css";
import axios from "axios";

const Login_Url = "/user/login";

const Login = () => {
  const userRef = useRef();
  const errorRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrorMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    try {
      const response = await fetch(
        "http://localhost:3000/user/login",
        config
      ).then((res) => res.json());
      console.log("token = ", response.token);
      const accessToken = response.token;
      setAuth({ email, password, accessToken });
      setEmail("");
      setPassword("");
      setSuccess(true);
    } catch (error) {
      if (!error.response) {
        setErrorMsg("no server response");
      } else {
        setErrorMsg("Login failed");
      }
      errorRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section className={cl.login}>
          <h1>You are logged</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section className={cl.login}>
          <p ref={errorRef} aria-live="assertive">
            {errorMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              autoComplete="off"
              value={email}
              required
            />
            <label htmlFor="password">password</label>
            <MyInput
              type="password"
              id="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              value={password}
              required
            />
            <MyButton
              style={{
                backgroundColor: "white",
                color: "teal",
                textAlign: "center",
                width: "100px",
                marginBottom: "10px",
              }}
            >
              SignIn
            </MyButton>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              <a href="#">Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
