import "./styles/App.css";
import React, { useState } from "react";
import Main from "./pages/Main";
import Login from "./pages/Login";
import useToken from "./components/hooks/useToken";

import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import AppRouter from "./AppRouter/AppRouter";
import { AuthContext } from "./components/context";

function App() {
  const { token, setToken } = useToken();

  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }
  // debugger;
  return token === null ? (
    <Router>
      <Login setToken={setToken} />;
    </Router>
  ) : (
    <Router>
      <AppRouter token={token} />;
    </Router>
  );
}

export default App;
