import "./styles/App.css";
import React from "react";
import Login from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./pages/Main";
import RequireAuth from "./components/RequireAuth";

function App() {
  // const { token, setToken } = useToken();

  return (
    <Routes>
      {/* <Route path="/" element={<Layout />}> */}
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Main />} />
      </Route>
      {/* </Route> */}
    </Routes>
  );
}

export default App;
