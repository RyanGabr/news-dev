import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/app/home";
import { SignUp } from "../pages/auth/sign-up";

export const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);
