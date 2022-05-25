import React, { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isSignIn, setIsSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
