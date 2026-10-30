import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Trash2,
  Heart,
  Award,
  HelpCircle,
  History,
  User,
  ArrowLeft,
  Recycle,
  X
} from "lucide-react";

export default function DashboardSidebar({ isOpen, onClose }) {
  const navItems = [
    { name: "Overview", path: "/dashboard", icon: LayoutDashboard, end: true },
    { name: "Waste Tracker", path: "/dashboard/waste-tracker", icon: Trash2 },
    { name: "DIY / Favourites", path: "/dashboard/favorites", icon: Heart },
    { name: "Eco Challenges", path: "/dashboard/challenges", icon: Award },
    { name: "Eco Quiz", path: "/dashboard/quiz", icon: HelpCircle },
    { name: "Activity History", path: "/dashboard/history", icon: History },
    { name: "My Profile", path: "/dashboard/profile", icon: User }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={`sidebar-backdrop ${isOpen ? "active" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={`dashboard-sidebar ${isOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          <Link to="/dashboard" className="sidebar-logo" onClick={onClose}>
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "var(--radius-md)",
                background: "var(--color-primary)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Recycle size={20} />
            </div>
            <span>Waste Out Best</span>
          </Link>
          <button
            onClick={onClose}
            className="mobile-toggle"
            style={{ padding: "0.25rem", color: "var(--text-muted)" }}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-light)", padding: "0 0.75rem 0.5rem 0.75rem" }}>
            Dashboard Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                onClick={onClose}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <Link
            to="/"
            className="sidebar-link"
            style={{ color: "var(--text-main)", borderTop: "1px solid var(--border-light)", paddingTop: "1rem" }}
          >
            <ArrowLeft size={18} />
            <span>Back to Website</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
