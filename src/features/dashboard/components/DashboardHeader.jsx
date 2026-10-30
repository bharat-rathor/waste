import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Award, Sparkles, User } from "lucide-react";
import { getEcoLevel } from "../../../utils/calculations";

const titleMap = {
  "/dashboard": "Dashboard Overview",
  "/dashboard/waste-tracker": "Waste Tracker",
  "/dashboard/favorites": "DIY & Favourites",
  "/dashboard/challenges": "Eco Challenges",
  "/dashboard/quiz": "Eco Quiz",
  "/dashboard/history": "Activity History",
  "/dashboard/profile": "My Profile"
};

export default function DashboardHeader({ onToggleSidebar, profile }) {
  const location = useLocation();
  const currentTitle = titleMap[location.pathname] || "Dashboard";
  const ecoRank = getEcoLevel(profile?.ecoPoints || 0);

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button
          onClick={onToggleSidebar}
          className="mobile-toggle"
          style={{ marginRight: "0.5rem" }}
          aria-label="Toggle navigation"
        >
          <Menu size={24} />
        </button>
        <h2 className="header-title">{currentTitle}</h2>
      </div>

      <div className="header-right">
        {/* Eco Points Badge */}
        <div className="points-pill" title={`${profile?.ecoPoints || 0} Total Eco Points`}>
          <Sparkles size={16} color="var(--color-primary)" />
          <span>{profile?.ecoPoints || 0} Pts</span>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>• {ecoRank.badge}</span>
        </div>

        {/* User Profile Mini Badge */}
        <Link to="/dashboard/profile" className="user-profile-badge">
          <div className="user-avatar">
            {profile?.name ? profile.name.charAt(0).toUpperCase() : <User size={18} />}
          </div>
          <div style={{ display: "none", flexDirection: "column" }} className="header-user-text">
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-primary-dark)" }}>
              {profile?.name || "Practitioner"}
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              {profile?.userType || "Student"}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
