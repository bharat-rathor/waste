import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  BarChart2,
  Heart,
  CheckCircle2,
  ShieldAlert,
  Wrench,
  Package,
  Sparkles,
  Share2
} from "lucide-react";
import Button from "../../../shared/components/Button";
import ProjectCard from "../components/ProjectCard";
import Toast from "../../../shared/components/Toast";
import { diyProjects } from "../../../data/diyProjects";
import {
  isFavorite,
  toggleFavorite,
  isProjectCompleted,
  markProjectCompleted,
  unmarkProjectCompleted
} from "../../../services/database/projectService";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const found = diyProjects.find((p) => p.id === projectId);
    setProject(found);

    if (found) {
      isFavorite(found.id).then(setIsFav);
      isProjectCompleted(found.id).then(setIsCompleted);
    }
  }, [projectId]);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleFavoriteToggle = async () => {
    if (!project) return;
    const res = await toggleFavorite(project.id, project.title);
    setIsFav(res.isFav);
    showToast(res.isFav ? "Saved to Favourites!" : "Removed from Favourites", res.isFav ? "success" : "info");
  };

  const handleCompletionToggle = async () => {
    if (!project) return;
    if (isCompleted) {
      await unmarkProjectCompleted(project.id);
      setIsCompleted(false);
      showToast("Project unmarked as completed", "info");
    } else {
      await markProjectCompleted(project.id, project.title);
      setIsCompleted(true);
      showToast("Marked as Completed! Earned +25 Eco Points 🌟", "success");
    }
  };

  if (!project) {
    return (
      <div className="container" style={{ padding: "5rem 1rem", textAlign: "center" }}>
        <h2>Project Not Found</h2>
        <p style={{ color: "var(--text-muted)", margin: "1rem 0 2rem 0" }}>
          The DIY tutorial you are looking for does not exist or has been moved.
        </p>
        <Link to="/diy-projects">
          <Button variant="primary" icon={ArrowLeft}>
            Back to DIY Projects
          </Button>
        </Link>
      </div>
    );
  }

  // Find similar projects (matching category or material, excluding current)
  const similarProjects = diyProjects
    .filter((p) => p.id !== project.id && (p.materialCategory === project.materialCategory || p.wasteMaterial === project.wasteMaterial))
    .slice(0, 3);

  return (
    <div className="project-detail-page" style={{ background: "var(--bg-page)", padding: "2.5rem 0 5rem 0" }}>
      <div className="container">
        {/* Back Link */}
        <div style={{ marginBottom: "1.5rem" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--text-muted)",
              fontWeight: 600,
              fontSize: "0.9rem"
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Projects</span>
          </button>
        </div>

        {/* Hero Details Grid */}
        <div
          className="project-detail-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "2.5rem",
            background: "#ffffff",
            borderRadius: "var(--radius-xl)",
            padding: "2rem",
            border: "1px solid var(--border-light)",
            boxShadow: "var(--shadow-sm)",
            marginBottom: "3rem"
          }}
        >
          {/* Main Image */}
          <div style={{ position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden", minHeight: "360px" }}>
            <img
              src={project.image}
              alt={project.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", top: "1.25rem", left: "1.25rem" }}>
              <span className="badge badge-wet" style={{ fontSize: "0.85rem", padding: "0.35rem 0.85rem" }}>
                {project.materialCategory}
              </span>
            </div>
          </div>

          {/* Project Summary */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                <Clock size={16} />
                {project.duration}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                <BarChart2 size={16} />
                {project.difficulty} Level
              </span>
            </div>

            <h1 style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--color-primary-dark)", lineHeight: 1.25, marginBottom: "1rem" }}>
              {project.title}
            </h1>

            <p style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              {project.shortDescription}
            </p>

            <div
              style={{
                background: "var(--bg-subtle)",
                borderRadius: "var(--radius-md)",
                padding: "1rem 1.25rem",
                marginBottom: "2rem"
              }}
            >
              <div style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-light)", marginBottom: "0.3rem" }}>
                Primary Waste Material
              </div>
              <div style={{ fontWeight: 700, color: "var(--color-primary)", fontSize: "1.05rem" }}>
                {project.wasteMaterial}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "auto", flexWrap: "wrap" }}>
              <Button
                variant={isCompleted ? "primary" : "secondary"}
                icon={CheckCircle2}
                onClick={handleCompletionToggle}
                style={{ flex: 1 }}
              >
                {isCompleted ? "Completed ✓" : "Mark as Completed"}
              </Button>

              <Button
                variant="outline"
                icon={Heart}
                onClick={handleFavoriteToggle}
                style={{
                  color: isFav ? "#e53935" : "inherit",
                  borderColor: isFav ? "#e53935" : "var(--border-medium)"
                }}
              >
                {isFav ? "Saved" : "Save to Favorites"}
              </Button>
            </div>
          </div>
        </div>

        {/* Requirements & Precautions Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem"
          }}
        >
          {/* Required Waste Materials */}
          <div className="card" style={{ padding: "1.75rem" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--color-primary-dark)", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
              <Package size={20} color="var(--color-primary)" />
              Required Materials
            </h3>
            <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8, fontSize: "0.95rem", color: "var(--text-main)" }}>
              {project.requiredMaterials.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Required Tools */}
          <div className="card" style={{ padding: "1.75rem" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--color-primary-dark)", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
              <Wrench size={20} color="var(--color-primary)" />
              Required Tools
            </h3>
            <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8, fontSize: "0.95rem", color: "var(--text-main)" }}>
              {project.requiredTools.map((tool, idx) => (
                <li key={idx}>{tool}</li>
              ))}
            </ul>
          </div>

          {/* Safety Precautions */}
          <div className="card" style={{ padding: "1.75rem", background: "#fffdf5", border: "1px solid #ffe082" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#e65100", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
              <ShieldAlert size={20} color="#e65100" />
              Safety Instructions
            </h3>
            <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8, fontSize: "0.9rem", color: "#4e342e" }}>
              {project.safetyPrecautions.map((safe, idx) => (
                <li key={idx}>{safe}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Step-by-Step Procedure */}
        <div
          className="card"
          style={{
            padding: "2.5rem",
            marginBottom: "3.5rem"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.75rem" }}>
            <span className="section-badge">Tutorial Procedure</span>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-primary-dark)", margin: 0 }}>
              Step-by-Step Instructions
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {project.fullInstructions.map((inst) => (
              <div
                key={inst.step}
                style={{
                  display: "flex",
                  gap: "1.25rem",
                  paddingBottom: "1.5rem",
                  borderBottom: "1px solid var(--border-light)"
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "var(--color-primary-subtle)",
                    color: "var(--color-primary)",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  {inst.step}
                </div>
                <div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: "0.35rem" }}>
                    {inst.title}
                  </h4>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                    {inst.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Expected Result Box */}
          <div
            style={{
              marginTop: "2rem",
              background: "#edf7ee",
              border: "1.5px solid #a5d6a7",
              borderRadius: "var(--radius-lg)",
              padding: "1.5rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "1rem"
            }}
          >
            <Sparkles size={24} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: "0.25rem" }}>
                Expected Result
              </h4>
              <p style={{ fontSize: "0.9rem", color: "var(--text-main)", lineHeight: 1.6, margin: 0 }}>
                {project.expectedResult}
              </p>
            </div>
          </div>
        </div>

        {/* Similar Projects Section */}
        {similarProjects.length > 0 && (
          <div>
            <div style={{ marginBottom: "1.75rem" }}>
              <span className="section-badge">More Ideas</span>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-primary-dark)" }}>
                Similar DIY Upcycling Projects
              </h3>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "2rem"
              }}
            >
              {similarProjects.map((sim) => (
                <ProjectCard key={sim.id} project={sim} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Toast toasts={toasts} onRemove={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
}
