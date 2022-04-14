import React, { createContext, useContext } from "react";
import Login from "../pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import { privateRoutes, publicRoutes } from "../Router/router";
import { AuthContext } from "../components/context";

const AppRouter = () => {
  const [isAuth, setIsAuth] = useContext(AuthContext);
  console.log("approuter: ", isAuth);
  return isAuth ? (
    <Routes>
      {console.log("Auth=true in Routes: ", isAuth)}
      {privateRoutes.map((route) => (
        <Route
          key={route.path}
          element={<route.component />}
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
