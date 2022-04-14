import "./styles/App.css";
import React, { useState } from "react";
import Main from "./pages/Main";
import Login from "./pages/Login";

import { BrowserRouter as Router, Link } from "react-router-dom";
import AppRouter from "./AppRouter/AppRouter";
import { AuthContext } from "./components/context";

function App() {
  ///maybe obj
  const [isAuth, setIsAuth] = useState(false);
  console.log("App: ", isAuth);
  // useEffect(() => {
  //   localStorage.getItem("auth") ? setIsAuth(true) : setIsAuth(false);
  // }, []);

  return (
    <AuthContext.Provider value={[isAuth, setIsAuth]}>
      <Router>
        {" "}
        {/* // return <Main />; // return <Login />; */}
        <AppRouter />;
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
