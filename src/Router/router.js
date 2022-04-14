import Main from "../pages/Main";
import Login from "../pages/Login";

export const privateRoutes = [{ path: "/main", component: Main, exact: true }];
export const publicRoutes = [{ path: "/login", component: Login, exact: true }];
