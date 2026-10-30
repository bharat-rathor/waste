import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Recycle,
  Lightbulb,
  Heart,
  TrendingUp,
  PackageCheck
} from "lucide-react";
import HeroSection from "../components/HeroSection";
import CategoryCard from "../components/CategoryCard";
import ProjectCard from "../components/ProjectCard";
import HowItWorks from "../components/HowItWorks";
import Button from "../../../shared/components/Button";
import EmptyState from "../../../shared/components/EmptyState";
import Toast from "../../../shared/components/Toast";
import { wasteCategories } from "../../../data/wasteCategories";
import { diyProjects } from "../../../data/diyProjects";
import { getFavorites, toggleFavorite } from "../../../services/database/projectService";

const materialOptions = [
  "Plastic Bottle",
  "Cardboard",
  "Glass Jar",
  "Newspaper",
  "Old Clothes",
  "Tin Can",
  "Coconut Shell",
  "Egg Carton"
];

export default function Home() {
  const [selectedMaterial, setSelectedMaterial] = useState("Plastic Bottle");
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    async function loadFavorites() {
      try {
        const favs = await getFavorites();
        setFavoriteIds(new Set(favs.map((f) => f.projectId)));
      } catch (err) {
        console.error("Failed to load favorites", err);
      }
    }
    loadFavorites();
  }, []);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleToggleFavorite = async (projectId, projectTitle) => {
    try {
      const res = await toggleFavorite(projectId, projectTitle);
      setFavoriteIds((prev) => {
        const next = new Set(prev);
        if (res.isFav) {
          next.add(projectId);
          showToast(`Saved "${projectTitle}" to Favorites`);
        } else {
          next.delete(projectId);
          showToast(`Removed "${projectTitle}" from Favorites`, "info");
        }
        return next;
      });
    } catch (err) {
      console.error(err);
      showToast("Error updating favorite", "error");
    }
  };

  // Matched projects for Waste-to-Wealth feature
  const matchedProjects = diyProjects.filter(
    (p) => p.wasteMaterial.toLowerCase() === selectedMaterial.toLowerCase()
  );

  // Featured 4 projects
  const featuredProjects = diyProjects.slice(0, 4);

  return (
    <div className="home-page">
      <HeroSection />

      {/* SECTION 1: THE WASTE PROBLEM */}
      <section className="section-padding" style={{ background: "var(--bg-surface)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">The Problem</span>
            <h2 className="section-title">Small Actions. Big Environmental Impact.</h2>
            <p className="section-subtitle">
              Every day, households and students generate materials that can often be reused or recycled.
              Without proper awareness and segregation, valuable resources may end up as unnecessary waste.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem"
            }}
          >
            <div className="card" style={{ padding: "2rem", borderLeft: "4px solid #ef5350" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "#ffebee",
                  color: "#d32f2f",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem"
                }}
              >
                <AlertCircle size={24} />
              </div>
              <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: "0.5rem" }}>
                Unsegregated Landfill Overflow
              </h4>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Mixing wet organic food scraps with dry paper and plastic contaminates entire collection
                batches, preventing recycling and producing landfill methane gas.
              </p>
            </div>

            <div className="card" style={{ padding: "2rem", borderLeft: "4px solid #ffb74d" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "#fff3e0",
                  color: "#f57c00",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem"
                }}
              >
                <Recycle size={24} />
              </div>
              <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: "0.5rem" }}>
                Overlooked Value in Common Materials
              </h4>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Common discards such as plastic beverage bottles, shipping cartons, and glass jars are
                often discarded after a single use despite being sturdy and highly repurposable.
              </p>
            </div>

            <div className="card" style={{ padding: "2rem", borderLeft: "4px solid #4db6ac" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "#e0f2f1",
                  color: "#00796b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem"
                }}
              >
                <Lightbulb size={24} />
              </div>
              <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: "0.5rem" }}>
                The Knowledge & Action Gap
              </h4>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                People want to live more sustainably, but often lack accessible, student-friendly DIY
                guides and a simple personal tracker to monitor their daily waste habits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: OUR SOLUTION */}
      <section className="section-padding" style={{ background: "var(--bg-page)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Solution</span>
            <h2 className="section-title">A Smarter Way to Manage Waste.</h2>
            <p className="section-subtitle">
              Waste Out Best brings together environmental education, waste segregation, creative DIY
              upcycling, and local waste tracking in one intuitive, serverless platform.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem"
            }}
          >
            <div className="card" style={{ padding: "1.75rem", textAlign: "center" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-primary-subtle)",
                  color: "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem auto"
                }}
              >
                <ShieldCheck size={26} />
              </div>
              <h4 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: "0.5rem" }}>
                Waste Segregation
              </h4>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                Clear, practical guides for sorting wet, dry, recyclable, hazardous, and electronic waste.
              </p>
            </div>

            <div className="card" style={{ padding: "1.75rem", textAlign: "center" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "var(--radius-md)",
                  background: "#e1f5fe",
                  color: "#0288d1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem auto"
                }}
              >
                <Sparkles size={26} />
              </div>
              <h4 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: "0.5rem" }}>
                DIY Reuse & Upcycling
              </h4>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                20 verified, step-by-step tutorials turning everyday discarded materials into useful items.
              </p>
            </div>

            <div className="card" style={{ padding: "1.75rem", textAlign: "center" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "var(--radius-md)",
                  background: "#fff3e0",
                  color: "#e65100",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem auto"
                }}
              >
                <TrendingUp size={26} />
              </div>
              <h4 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: "0.5rem" }}>
                Personal Waste Tracker
              </h4>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                Record daily waste, categorize items, monitor reused vs recycled quantities with IndexedDB.
              </p>
            </div>

            <div className="card" style={{ padding: "1.75rem", textAlign: "center" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "var(--radius-md)",
                  background: "#f3e5f5",
                  color: "#7b1fa2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem auto"
                }}
              >
                <PackageCheck size={26} />
              </div>
              <h4 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: "0.5rem" }}>
                Challenges & Quizzes
              </h4>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                Interactive 10-challenge eco quests and 15 environmental quiz questions to reinforce learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS */}
      <section className="section-padding" style={{ background: "var(--bg-surface)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Simple Process</span>
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Follow our six-step practical workflow to transform everyday discards into valuable home
              and study assets.
            </p>
          </div>

          <HowItWorks />
        </div>
      </section>

      {/* SECTION 4: EXPLORE WASTE CATEGORIES */}
      <section className="section-padding" style={{ background: "var(--bg-page)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Segregation Guide</span>
            <h2 className="section-title">Explore Waste Categories</h2>
            <p className="section-subtitle">
              Proper segregation begins by understanding what can decompose, what can be recycled, and
              what requires specialized handling.
            </p>
          </div>

          <div className="category-cards-grid">
            {wasteCategories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: THE MAIN WASTE-TO-WEALTH FEATURE */}
      <section className="section-padding" style={{ background: "linear-gradient(180deg, #ffffff 0%, #edf7ee 100%)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Interactive Tool</span>
            <h2 className="section-title">What Can I Make From This Waste?</h2>
            <p className="section-subtitle">
              Have something you are about to discard? Choose your waste material below to discover
              practical, creative DIY project ideas instantly!
            </p>
          </div>

          <div className="waste-to-wealth-box">
            <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-primary-dark)" }}>
              Select a Waste Material:
            </h4>

            <div className="material-chips-grid">
              {materialOptions.map((mat) => (
                <button
                  key={mat}
                  className={`material-chip ${selectedMaterial === mat ? "active" : ""}`}
                  onClick={() => setSelectedMaterial(mat)}
                >
                  <Recycle size={16} />
                  <span>{mat}</span>
                </button>
              ))}
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                <h4 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--color-primary-dark)" }}>
                  Suggested DIY Ideas for: <span style={{ color: "var(--color-primary)" }}>{selectedMaterial}</span>
                </h4>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  {matchedProjects.length} {matchedProjects.length === 1 ? "project" : "projects"} found
                </span>
              </div>

              {matchedProjects.length > 0 ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "1.5rem"
                  }}
                >
                  {matchedProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      isFav={favoriteIds.has(project.id)}
                      onToggleFav={handleToggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Lightbulb}
                  title={`No DIY tutorials for ${selectedMaterial}`}
                  description="We are currently designing fresh tutorials for this material. Check out other categories in the meantime!"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: FEATURED DIY PROJECTS */}
      <section className="section-padding" style={{ background: "var(--bg-surface)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Project Library</span>
            <h2 className="section-title">Featured DIY Projects</h2>
            <p className="section-subtitle">
              Step-by-step upcycling ideas tested for safety, practical utility, and simple everyday tools.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
              gap: "1.5rem",
              marginBottom: "2.5rem"
            }}
          >
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isFav={favoriteIds.has(project.id)}
                onToggleFav={handleToggleFavorite}
              />
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <Link to="/diy-projects">
              <Button variant="primary" size="lg" icon={ArrowRight}>
                View All 20 DIY Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: BENEFITS */}
      <section className="section-padding" style={{ background: "var(--bg-page)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Key Advantages</span>
            <h2 className="section-title">Benefits of Waste Out Best</h2>
            <p className="section-subtitle">
              Making environmental responsibility practical, educational, and engaging for households
              and students.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.5rem"
            }}
          >
            {[
              {
                title: "Reduce Unnecessary Waste",
                desc: "Divert useful materials from landfills through source segregation and creative reuse."
              },
              {
                title: "Learn Practical Recycling Habits",
                desc: "Gain lifelong confidence in cleaning, sorting, and responsibly disposing of household waste."
              },
              {
                title: "Discover Creative DIY Projects",
                desc: "Convert everyday cardboard, jars, and bottles into functional organizers and planters."
              },
              {
                title: "Track Personal Waste Activities",
                desc: "Log items in your private IndexedDB dashboard to see tangible progress over time."
              },
              {
                title: "Encourage Sustainable Living",
                desc: "Inspire your family, roommates, and schoolmates to embrace a mindful, circular lifestyle."
              }
            ].map((benefit, i) => (
              <div key={i} className="card" style={{ padding: "1.5rem" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "var(--color-primary-subtle)",
                    color: "var(--color-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem"
                  }}
                >
                  <CheckCircle2 size={20} />
                </div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: "0.4rem" }}>
                  {benefit.title}
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: FINAL CTA */}
      <section className="section-padding" style={{ background: "var(--color-primary-dark)", color: "#ffffff" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "700px" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1rem", lineHeight: 1.2 }}>
            Make Every Waste Material Count.
          </h2>
          <p style={{ fontSize: "1.1rem", color: "#c8e6c9", lineHeight: 1.6, marginBottom: "2rem" }}>
            Join students, households, and green champions who are taking practical action every day.
            Start exploring DIY projects or launch your personal waste tracker.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link to="/diy-projects">
              <Button variant="secondary" size="lg" icon={Sparkles} style={{ background: "#ffffff", borderColor: "#ffffff" }}>
                Start Exploring
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                variant="primary"
                size="lg"
                icon={ArrowRight}
                style={{ background: "var(--color-secondary)", borderColor: "var(--color-secondary)" }}
              >
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Toast toasts={toasts} onRemove={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
}
