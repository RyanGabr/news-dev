import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/app/home";
import { SignUp } from "../pages/auth/sign-up";
import { Login } from "../pages/auth/login";
import { AuthRedirect } from "./auth-redirect";

export const router = createBrowserRouter([
  {
    path: "/signup",
    element: (
      <AuthRedirect>
        <SignUp />
      </AuthRedirect>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthRedirect>
        <Login />
      </AuthRedirect>
    ),
  },
  {
    path: "/",
    element: <Home />,
  },
]);
