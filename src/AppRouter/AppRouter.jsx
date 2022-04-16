import React, { createContext, useContext, useState } from "react";
import Login from "../pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import { privateRoutes, publicRoutes } from "../Router/router";
import { AuthContext } from "../components/context";
import useToken from "../components/hooks/useToken";
import ProtectedRoute from "../components/PrivateRoute";

const AppRouter = () => {
  // const { token, setToken } = useToken();
  // debugger;
  // debugger;
  return (
    <Routes>
      {/* {privateRoutes.map((route) => (
      <ProtectedRoute
        key={route.path}
        logged={token}
        setLogged={setToken}
        component={route.component}
        path={route.path}
        exact={route.exact}
      />
    ))} */}
      <Route
        path="/main"
        element={<ProtectedRoute key="/main" path="/main" component={Main} />}
      />

      <Route path="/login" element={<Login />} />
      {/* {publicRoutes.map((route) => {
        <Route
          key={route.path}
          element={route.component}
          setLogged={setToken}
          path={route.path}
          exact={route.exact}
        />;
      })} */}
      {/* <Route path="*" element={<Main />} /> */}
    </Routes>
  );
};

export default AppRouter;
