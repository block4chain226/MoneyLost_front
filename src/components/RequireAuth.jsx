import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import React from "react";
import Main from "../pages/Main";

const RequireAuth = ({ children }) => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log("token", sessionStorage.getItem("token"));
  console.log("auth", auth.token);

  return sessionStorage.getItem("token") ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
