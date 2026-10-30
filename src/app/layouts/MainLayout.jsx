import React from "react";
import { Outlet } from "react-router-dom";
import MainNavbar from "../../features/main/components/MainNavbar";
import MainFooter from "../../features/main/components/MainFooter";
import "../../features/main/styles/main.css";

export default function MainLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <MainNavbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <MainFooter />
    </div>
  );
}
