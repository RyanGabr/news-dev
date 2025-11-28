import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/app/home";
import { SignUp } from "../pages/auth/sign-up";
import { Login } from "../pages/auth/login";

export const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);
