import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Main Pages
import Home from "../features/main/pages/Home";
import WasteGuide from "../features/main/pages/WasteGuide";
import DIYProjects from "../features/main/pages/DIYProjects";
import ProjectDetails from "../features/main/pages/ProjectDetails";
import About from "../features/main/pages/About";

// Dashboard Pages
import DashboardHome from "../features/dashboard/pages/DashboardHome";
import WasteTracker from "../features/dashboard/pages/WasteTracker";
import Favorites from "../features/dashboard/pages/Favorites";
import EcoChallenges from "../features/dashboard/pages/EcoChallenges";
import EcoQuiz from "../features/dashboard/pages/EcoQuiz";
import MyProfile from "../features/dashboard/pages/MyProfile";
import ActivityHistory from "../features/dashboard/pages/ActivityHistory";

// 404
import NotFound from "../shared/components/NotFound";

export const router = createBrowserRouter(
  [
    // Main Public Website
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "waste-guide", element: <WasteGuide /> },
        { path: "diy-projects", element: <DIYProjects /> },
        { path: "diy-projects/:projectId", element: <ProjectDetails /> },
        { path: "about", element: <About /> },
        { path: "*", element: <NotFound /> }
      ]
    },

    // User Dashboard
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { index: true, element: <DashboardHome /> },
        { path: "waste-tracker", element: <WasteTracker /> },
        { path: "favorites", element: <Favorites /> },
        { path: "challenges", element: <EcoChallenges /> },
        { path: "quiz", element: <EcoQuiz /> },
        { path: "profile", element: <MyProfile /> },
        { path: "history", element: <ActivityHistory /> },
        { path: "*", element: <NotFound /> }
      ]
    }
  ],
  { basename: "/waste" }
);
