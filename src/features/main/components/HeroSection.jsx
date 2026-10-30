import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Compass, ShieldCheck, Sprout } from "lucide-react";
import Button from "../../../shared/components/Button";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div>
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Smart Waste-to-Wealth Platform</span>
          </div>

          <h1 className="hero-title">
            Don't Waste It. <br />
            <span>Reimagine It.</span>
          </h1>

          <p className="hero-desc">
            Every discarded material has the potential for a second life. Discover practical ways to
            manage waste, create useful products and make everyday sustainability simple.
          </p>

          <div className="hero-buttons">
            <Link to="/diy-projects">
              <Button variant="primary" size="lg" icon={Sparkles}>
                Explore DIY Projects
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="secondary" size="lg" icon={ArrowRight}>
                Start Your Journey
              </Button>
            </Link>
          </div>

          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <h5>20+</h5>
              <p>Practical DIY Tutorials</p>
            </div>
            <div className="hero-stat-item">
              <h5>5</h5>
              <p>Waste Segregation Types</p>
            </div>
            <div className="hero-stat-item">
              <h5>100%</h5>
              <p>Local & Private (IndexedDB)</p>
            </div>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80"
            alt="Eco-friendly green lifestyle and waste upcycling"
            className="hero-main-img"
          />

          <div className="hero-floating-card">
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "var(--color-primary-subtle)",
                color: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Sprout size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--color-primary-dark)" }}>
                Turn Waste into Worth
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Practical DIY & Local Tracking
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
