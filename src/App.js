import "./styles/App.css";
import React from "react";
import Login from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./pages/Main";
import RequireAuth from "./components/RequireAuth";
import { NewExpenseProvider } from "./context/NewExpenseContext";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />

        <Route
          index
          element={
            <RequireAuth>
              <AuthProvider>
                <NewExpenseProvider>
                  <Main />
                </NewExpenseProvider>
              </AuthProvider>
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
