import React from "react";
import { Link } from "react-router-dom";
import { Clock, BarChart2, Heart, ArrowRight } from "lucide-react";
import Button from "../../../shared/components/Button";

export default function ProjectCard({ project, isFav = false, onToggleFav }) {
  const handleFavClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFav) {
      onToggleFav(project.id, project.title);
    }
  };

  return (
    <div className="card project-card">
      <div className="project-card-image-box">
        <img
          src={project.image}
          alt={project.title}
          className="project-card-img"
          loading="lazy"
        />
        <div className="project-card-badge">
          <span className="badge badge-wet">{project.materialCategory}</span>
        </div>
        <button
          className={`project-fav-btn ${isFav ? "active" : ""}`}
          onClick={handleFavClick}
          title={isFav ? "Remove from Favorites" : "Save to Favorites"}
          aria-label={isFav ? "Remove from Favorites" : "Save to Favorites"}
        >
          <Heart size={18} fill={isFav ? "#e53935" : "none"} color={isFav ? "#e53935" : "currentColor"} />
        </button>
      </div>

      <div className="project-card-content">
        <div className="project-card-meta">
          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <Clock size={14} />
            {project.duration}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <BarChart2 size={14} />
            {project.difficulty}
          </span>
        </div>

        <h4 className="project-card-title">{project.title}</h4>
        <p className="project-card-desc">{project.shortDescription}</p>

        <Link to={`/diy-projects/${project.id}`} style={{ marginTop: "auto" }}>
          <Button variant="secondary" size="sm" icon={ArrowRight} style={{ width: "100%" }}>
            View Tutorial
          </Button>
        </Link>
      </div>
    </div>
  );
}
