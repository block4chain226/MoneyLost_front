import React from "react";
import { useRef, useState, useEffect } from "react";
import cl from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import "../../styles/App.css";
import MyInput from "../Input/MyInput";
import MyButton from "../MyButton/MyButton";
import useAuth from "../hooks/useAuth";

const SignUp = () => {
  const userRef = useRef();
  const errorRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const { setAuth, auth, isSignIn, setIsSignIn } = useAuth();

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
        "http://localhost:3000/user/signup",
        config
      ).then((res) => res.json());
      // .then((dat) => setErrorMsg(dat.message));
      debugger;
      if (response.token) {
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
      }
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
    // <div className={`${cl.signUp} ${isSignIn ? cl.show : ""}`}>
    <div className={cl.signUp}>
      <p ref={errorRef} aria-live="assertive">
        {errorMsg}
      </p>
      <h1>Sign Up</h1>
      <form className={cl.signUp__form} onSubmit={handleSubmit}>
        <div className={cl.signUp__input}>
          <label htmlFor="username">Username</label>
          <MyInput
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
        </div>
      </form>
      <div className={cl.signUp__input}>
        <MyButton onClick={handleSubmit}>Sign Up</MyButton>
      </div>
      <span className="line">
        <a href="#" onClick={() => setIsSignIn(true)}>
          Sign In
        </a>
      </span>
    </div>
  );
};

export default SignUp;
