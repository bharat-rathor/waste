import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, CheckCircle2, Clock, Sparkles, BookOpen } from "lucide-react";
import ProjectCard from "../../main/components/ProjectCard";
import Button from "../../../shared/components/Button";
import EmptyState from "../../../shared/components/EmptyState";
import Toast from "../../../shared/components/Toast";
import {
  getFavorites,
  getCompletedProjects,
  toggleFavorite
} from "../../../services/database/projectService";
import { diyProjects } from "../../../data/diyProjects";

export default function Favorites() {
  const [activeTab, setActiveTab] = useState("favorites"); // "favorites" | "completed"
  const [favorites, setFavorites] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [toasts, setToasts] = useState([]);

  const loadData = async () => {
    try {
      const [favs, comps] = await Promise.all([getFavorites(), getCompletedProjects()]);
      setFavorites(favs);
      setCompleted(comps);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleToggleFav = async (projectId, projectTitle) => {
    try {
      const res = await toggleFavorite(projectId, projectTitle);
      showToast(res.isFav ? `Saved to Favourites` : `Removed from Favourites`, res.isFav ? "success" : "info");
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  // Map IDs to full project models
  const favoriteProjects = diyProjects.filter((p) =>
    favorites.some((f) => f.projectId === p.id)
  );

  const completedProjectsList = diyProjects.filter((p) =>
    completed.some((c) => c.projectId === p.id)
  );

  return (
    <div className="favorites-page">
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-primary-dark)", margin: 0 }}>
          DIY Upcycling Hub
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "0.25rem 0 0 0" }}>
          Revisit saved DIY tutorials, review completed creations, and build practical upcycling habits.
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          borderBottom: "1px solid var(--border-light)",
          marginBottom: "2rem"
        }}
      >
        <button
          onClick={() => setActiveTab("favorites")}
          style={{
            padding: "0.75rem 1.25rem",
            fontWeight: 700,
            fontSize: "0.95rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            borderBottom: activeTab === "favorites" ? "3px solid var(--color-primary)" : "3px solid transparent",
            color: activeTab === "favorites" ? "var(--color-primary-dark)" : "var(--text-muted)"
          }}
        >
          <Heart size={18} fill={activeTab === "favorites" ? "var(--color-primary)" : "none"} />
          <span>Favourites ({favoriteProjects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("completed")}
          style={{
            padding: "0.75rem 1.25rem",
            fontWeight: 700,
            fontSize: "0.95rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            borderBottom: activeTab === "completed" ? "3px solid var(--color-primary)" : "3px solid transparent",
            color: activeTab === "completed" ? "var(--color-primary-dark)" : "var(--text-muted)"
          }}
        >
          <CheckCircle2 size={18} />
          <span>Completed ({completedProjectsList.length})</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "favorites" && (
        <div>
          {favoriteProjects.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "2rem"
              }}
            >
              {favoriteProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isFav={true}
                  onToggleFav={handleToggleFav}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Heart}
              title="No favourite projects saved yet"
              description="Explore the DIY Projects Library and click the heart icon on any project you'd like to try later."
              actionLabel="Explore DIY Projects"
              onAction={() => window.location.assign("#/diy-projects")}
              actionIcon={Sparkles}
            />
          )}
        </div>
      )}

      {activeTab === "completed" && (
        <div>
          {completedProjectsList.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "2rem"
              }}
            >
              {completedProjectsList.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isFav={favorites.some((f) => f.projectId === project.id)}
                  onToggleFav={handleToggleFav}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={CheckCircle2}
              title="No completed creations logged yet"
              description="When you craft a DIY item, open its tutorial page and click 'Mark as Completed' to earn +25 Eco Points and log your achievement here."
              actionLabel="Browse Tutorials"
              onAction={() => window.location.assign("#/diy-projects")}
              actionIcon={BookOpen}
            />
          )}
        </div>
      )}

      <Toast toasts={toasts} onRemove={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
}
