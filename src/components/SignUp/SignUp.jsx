import React from "react";
import { useRef, useState } from "react";
import cl from "./SignUp.module.css";
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

  const { isSignIn, setIsSignIn } = useAuth();

  return (
    // <div className={`${cl.signUp} ${isSignIn ? cl.show : ""}`}>
    <div className={cl.signUp}>
      <h1>Sign Up</h1>
      <form className={cl.signUp__form}>
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
        <MyButton style={{}}>Sign Up</MyButton>
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
