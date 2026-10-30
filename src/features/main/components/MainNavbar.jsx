import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Recycle, LayoutDashboard, Menu, X } from "lucide-react";
import Button from "../../../shared/components/Button";

export default function MainNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="main-navbar">
      <div className="container main-navbar-container">
        <Link to="/" className="brand-logo" onClick={closeMenu}>
          <div className="brand-icon">
            <Recycle size={22} />
          </div>
          <span>Waste Out Best</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/waste-guide"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={closeMenu}
          >
            Waste Guide
          </NavLink>
          <NavLink
            to="/diy-projects"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={closeMenu}
          >
            DIY Projects
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={closeMenu}
          >
            About
          </NavLink>
          <Link to="/dashboard" onClick={closeMenu}>
            <Button variant="primary" size="sm" icon={LayoutDashboard}>
              User Dashboard
            </Button>
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
