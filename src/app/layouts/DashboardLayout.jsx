import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../../features/dashboard/components/DashboardSidebar";
import DashboardHeader from "../../features/dashboard/components/DashboardHeader";
import { useIndexedDB } from "../../shared/hooks/useIndexedDB";
import "../../features/dashboard/styles/dashboard.css";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { profile } = useIndexedDB();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <DashboardSidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Main Dashboard Panel */}
      <div className="dashboard-main">
        <DashboardHeader onToggleSidebar={toggleSidebar} profile={profile} />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
