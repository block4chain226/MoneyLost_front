import React, { createContext, useContext, useState } from "react";
import Login from "../pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import { privateRoutes, publicRoutes } from "../Router/router";
import { AuthContext } from "../components/context";
import useToken from "../components/hooks/useToken";

const AppRouter = ({ token }) => {
  // const [token, setToken] = useState("");
  // function setToken(userToken) {
  //   sessionStorage.setItem("token", JSON.stringify(userToken));
  //   console.log(sessionStorage);
  // }

  // function getToken() {}

  // const token = getToken();

  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }
  // debugger;
  // const { token, setToken } = useToken();

  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }
  debugger;
  return token ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          key={route.path}
          element={route.component}
          path={route.path}
          exact={route.exact}
        />
      ))}
      <Route path="*" element={<Main />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          element={<route.component />}
          path={route.path}
          exact={route.exact}
        />
      ))}
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;
