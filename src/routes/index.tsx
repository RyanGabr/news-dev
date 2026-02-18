import { Loading } from "@/components/home/loading";
import { Publish } from "@/pages/app/publish";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/layout";
import { Login } from "../pages/auth/login";
import { SignUp } from "../pages/auth/sign-up";
import { AuthRedirect } from "./auth-redirect";
import { Loading as LoadingPost } from "@/components/post/loading";
import { Loading as LoadingProfile } from "@/components/profile/loading";
import { Loading as LoadingSettings } from "@/components/settings/loading";
import { ErrorState } from "@/components/ui/error-state";

const Home = lazy(() => import("@/pages/app/home"));
const Post = lazy(() => import("@/pages/app/post"));
const Profile = lazy(() => import("@/pages/app/profile"));
const Settings = lazy(() => import("@/pages/app/settings"));

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
    errorElement: <ErrorState />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/post/:id",
        element: (
          <Suspense fallback={<LoadingPost />}>
            <Post />
          </Suspense>
        ),
      },
      {
        path: "/publish",
        element: <Publish />,
      },
      {
        path: "/:username",
        element: (
          <Suspense fallback={<LoadingProfile />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "/settings",
        element: (
          <Suspense fallback={<LoadingSettings />}>
            <Settings />
          </Suspense>
        ),
      },
    ],
  },
]);
