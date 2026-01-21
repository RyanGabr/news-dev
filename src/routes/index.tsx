import { Post } from "@/pages/app/post";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/layout";
import { Home } from "../pages/app/home";
import { Login } from "../pages/auth/login";
import { SignUp } from "../pages/auth/sign-up";
import { AuthRedirect } from "./auth-redirect";
import { Profile } from "@/pages/app/profile";
import { Settings } from "@/pages/app/settings";

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
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Post />,
      },
      {
        path: "/:username",
        element: <Profile />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);
