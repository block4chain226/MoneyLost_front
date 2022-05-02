import "./styles/App.css";
import React from "react";
import Login from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./pages/Main";
import RequireAuth from "./components/RequireAuth";
import { AuthProvider } from "./context/AuthProvider";
import { CategoryContextProvider } from "./context/CategoryContext";
import { ExpensesContextProvider } from "./context/ExpensesContext";

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
                <CategoryContextProvider>
                  <ExpensesContextProvider>
                    <Main />
                  </ExpensesContextProvider>
                </CategoryContextProvider>
              </AuthProvider>
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
