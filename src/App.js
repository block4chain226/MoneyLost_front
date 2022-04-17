import "./styles/App.css";
import React, { useState } from "react";
import Main from "./pages/Main";
// import Login from "./pages/Login";
import Login from "./components/Login/Login";
import useToken from "./components/hooks/useToken";

import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import AppRouter from "./AppRouter/AppRouter";
// import { AuthContext, AuthProvider } from "./context/AuthProvider";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  // const { token, setToken } = useToken();

  return (
    // <Router>
    //   <Login />
    //   {/* <AppRouter /> */}
    // </Router>

    <Login />

    // <Router>
    //   <Routes>
    //     {token ? (
    //       <Route path="/main" element={<Main />} />
    //     ) : (
    //       <Route path="/login" element={<Login setToken={setToken} />} />
    //     )}
    //     {/* <Route path="*" element={<Login />} /> */}
    //   </Routes>
    // </Router>
  );
}

export default App;
