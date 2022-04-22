import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import React from "react";
import Main from "../pages/Main";

const RequireAuth = ({ children }) => {
  const { auth } = useAuth();
  const location = useLocation();
  debugger;
  if (!auth?.accessToken) {
    <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
  // return auth?.accessToken ? (
  //   children
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // );
};

export default RequireAuth;
