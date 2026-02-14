import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./footer";
import { NavigationBar } from "./navigation-bar";
import { Activity } from "react";

export function Layout() {
  const location = useLocation();

  const isPublishPage = location.pathname.includes("publish");

  return (
    <div className="w-full h-screen">
      <NavigationBar />

      <div className="bg-secondary py-2.5">
        <p className="font-semibold text-center">
          O projeto ainda está em versão inicial
        </p>
      </div>

      <main className="w-full my-10">
        <Outlet />
      </main>

      <Activity mode={isPublishPage ? "hidden" : "visible"}>
        <Footer />
      </Activity>
    </div>
  );
}
