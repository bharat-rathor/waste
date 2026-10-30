import React, { useState, useEffect } from "react";
import { Sparkles, Filter, SlidersHorizontal, BookOpen } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import SearchBar from "../../../shared/components/SearchBar";
import EmptyState from "../../../shared/components/EmptyState";
import Toast from "../../../shared/components/Toast";
import {
  diyProjects,
  materialFilterOptions,
  categoryFilterOptions
} from "../../../data/diyProjects";
import { getFavorites, toggleFavorite } from "../../../services/database/projectService";

export default function DIYProjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
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

  const filteredProjects = diyProjects.filter((project) => {
    const matchesSearch =
      !searchTerm ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.requiredMaterials.some((m) => m.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesMaterial =
      selectedMaterial === "All" || project.wasteMaterial === selectedMaterial;

    const matchesCategory =
      selectedCategory === "All" || project.materialCategory === selectedCategory;

    const matchesDifficulty =
      selectedDifficulty === "All" || project.difficulty === selectedDifficulty;

    return matchesSearch && matchesMaterial && matchesCategory && matchesDifficulty;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedMaterial("All");
    setSelectedCategory("All");
    setSelectedDifficulty("All");
  };

  return (
    <div className="diy-projects-page">
      {/* Page Header */}
      <section style={{ background: "linear-gradient(180deg, #edf7ee 0%, #f8faf8 100%)", padding: "4rem 0 2.5rem 0" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span className="section-badge">
            <Sparkles size={16} />
            <span>20 Practical Tutorials</span>
          </span>
          <h1 className="section-title" style={{ fontSize: "2.75rem", marginBottom: "1rem" }}>
            DIY Upcycling Library
          </h1>
          <p className="section-subtitle" style={{ marginBottom: "2rem" }}>
            Turn ordinary plastic bottles, cardboard packaging, glass jars, newspapers, and old clothes
            into durable, useful products with our verified step-by-step guides.
          </p>

          <div style={{ maxWidth: "560px", margin: "0 auto" }}>
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              onClear={() => setSearchTerm("")}
              placeholder="Search by project name, tool, or material..."
            />
          </div>
        </div>
      </section>

      {/* Filter Toolbar */}
      <section style={{ background: "#ffffff", borderBottom: "1px solid var(--border-light)", padding: "1.25rem 0" }}>
        <div className="container">
          <div
            className="diy-filter-bar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.25rem",
              flexWrap: "wrap"
            }}
          >
            {/* Material Filter */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-muted)" }}>
                Material:
              </span>
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="form-select"
                style={{ width: "auto", minWidth: "140px", padding: "0.4rem 0.75rem" }}
              >
                {materialFilterOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-muted)" }}>
                Category:
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-select"
                style={{ width: "auto", minWidth: "120px", padding: "0.4rem 0.75rem" }}
              >
                {categoryFilterOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-muted)" }}>
                Difficulty:
              </span>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="form-select"
                style={{ width: "auto", minWidth: "120px", padding: "0.4rem 0.75rem" }}
              >
                <option value="All">All Levels</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Intermediate">Intermediate</option>
              </select>
            </div>

            {/* Project Count & Reset */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>
                Showing <strong>{filteredProjects.length}</strong> of {diyProjects.length}
              </span>
              {(searchTerm || selectedMaterial !== "All" || selectedCategory !== "All" || selectedDifficulty !== "All") && (
                <button
                  onClick={clearFilters}
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-primary)",
                    fontWeight: 600,
                    textDecoration: "underline"
                  }}
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding" style={{ background: "var(--bg-page)" }}>
        <div className="container">
          {filteredProjects.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "2rem"
              }}
            >
              {filteredProjects.map((project) => (
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
              icon={BookOpen}
              title="No DIY tutorials match your filters"
              description="Try adjusting your keywords, selecting 'All' materials, or resetting the difficulty level."
              actionLabel="Reset All Filters"
              onAction={clearFilters}
            />
          )}
        </div>
      </section>

      <Toast toasts={toasts} onRemove={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
}
