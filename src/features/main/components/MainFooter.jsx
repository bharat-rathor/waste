import React from "react";
import { Link } from "react-router-dom";
import { Recycle, Heart } from "lucide-react";

export default function MainFooter() {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff"
                }}
              >
                <Recycle size={18} />
              </div>
              <h4 style={{ margin: 0 }}>Waste Out Best</h4>
            </div>
            <p>
              Smart Waste Management & Waste-to-Wealth Platform. Turn everyday household and student
              waste into practical resources, learn proper segregation, and build lasting eco-habits.
            </p>
          </div>

          <div className="footer-col">
            <h5>Explore Website</h5>
            <ul className="footer-links">
              <li>
                <Link to="/">Home Overview</Link>
              </li>
              <li>
                <Link to="/waste-guide">Waste Segregation Guide</Link>
              </li>
              <li>
                <Link to="/diy-projects">DIY Upcycling Library</Link>
              </li>
              <li>
                <Link to="/about">About & Objectives</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>User Dashboard</h5>
            <ul className="footer-links">
              <li>
                <Link to="/dashboard">Dashboard Overview</Link>
              </li>
              <li>
                <Link to="/dashboard/waste-tracker">Waste Tracker</Link>
              </li>
              <li>
                <Link to="/dashboard/favorites">Favorites & Completed</Link>
              </li>
              <li>
                <Link to="/dashboard/challenges">Eco Challenges</Link>
              </li>
              <li>
                <Link to="/dashboard/quiz">Eco Quiz</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Community Mission</h5>
            <p style={{ fontSize: "0.85rem", lineHeight: "1.6", color: "#b0bec5" }}>
              "Turn Waste into Worth. Build a Greener Future." Built with IndexedDB local-first
              technology for students, households, and environmental enthusiasts.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Waste Out Best. All rights reserved.</p>
          <p style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            Promoting sustainability with <Heart size={14} color="#e53935" fill="#e53935" /> & practical education.
          </p>
        </div>
      </div>
    </footer>
  );
}
