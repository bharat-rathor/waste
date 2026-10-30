import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "../shared/styles/variables.css";
import "../shared/styles/global.css";
import "../shared/styles/responsive.css";

export default function App() {
  return <RouterProvider router={router} />;
}
