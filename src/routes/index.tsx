import { Post } from "@/pages/app/post";
import { Publish } from "@/pages/app/publish";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/layout";
import { Home } from "../pages/app/home";
import { Login } from "../pages/auth/login";
import { SignUp } from "../pages/auth/sign-up";
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
        path: "/publish",
        element: <Publish />,
      },
    ],
  },
]);
