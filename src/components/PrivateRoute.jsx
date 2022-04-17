// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Redirect,
//   Navigate,
// } from "react-router-dom";
// import useToken from "../components/hooks/useToken";

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const { token, setToken } = useToken();
//   if (!token) {
//     return (
//       <Navigate
//         to={{
//           pathname: "/login",
//         }}
//       />
//     );
//   } else {
//     return <Component {...rest} token={token} setToken={setToken} />;
//   }
// };

// export default ProtectedRoute;
