import React from "react";
import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MyButton from "../MyButton/MyButton";
import MyInput from "../Input/MyInput";
import cl from "./Login.module.css";
import RequireAuth from "../RequireAuth";

const Login = () => {
  const userRef = useRef();
  const errorRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { setAuth } = useAuth();

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
      console.log("user = ", response.userid);
      const accessToken = response.token;
      const userId = response.userid;
      setAuth({ userId, email, password, accessToken });
      setEmail("");
      sessionStorage.setItem("token", accessToken);
      sessionStorage.setItem("userId", userId);
      setPassword("");
      navigate("/", { replace: true });
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
        <label htmlFor="password">Password</label>
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
            fontSize: "16px",
          }}
        >
          Sign In
        </MyButton>
      </form>
      <p>
        Need an Account?
        <br />
        <Link to="/">main </Link>
        <span className="line">
          <a href="#">Sign Up</a>
        </span>
      </p>
    </section>
  );
};

export default Login;
