import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Trash2, Layers, Recycle, AlertTriangle, Cpu } from "lucide-react";

const iconMap = {
  "wet-waste": Trash2,
  "dry-waste": Layers,
  "recyclable-waste": Recycle,
  "hazardous-waste": AlertTriangle,
  "e-waste": Cpu
};

export default function CategoryCard({ category }) {
  const IconComponent = iconMap[category.id] || Recycle;

  return (
    <div
      className="card category-card"
      style={{
        borderTop: `4px solid ${category.color}`,
        background: `linear-gradient(180deg, ${category.bgColor} 0%, #ffffff 40%)`
      }}
    >
      <div>
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "var(--radius-md)",
            background: "#ffffff",
            color: category.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
            boxShadow: "var(--shadow-sm)",
            border: `1px solid ${category.borderColor}`
          }}
        >
          <IconComponent size={24} />
        </div>

        <h4 style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--color-primary-dark)", marginBottom: "0.25rem" }}>
          {category.name}
        </h4>
        <p style={{ fontSize: "0.8rem", fontWeight: "600", color: category.color, marginBottom: "0.75rem" }}>
          {category.tagline}
        </p>

        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: "1.5", marginBottom: "1.25rem" }}>
          {category.shortDescription}
        </p>

        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "var(--text-light)", marginBottom: "0.4rem" }}>
            Common Examples:
          </div>
          <ul style={{ paddingLeft: "1.1rem", fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: "1.5" }}>
            {category.examples.slice(0, 3).map((ex, idx) => (
              <li key={idx}>{ex}</li>
            ))}
          </ul>
        </div>
      </div>

      <Link
        to={`/waste-guide#${category.id}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          fontWeight: 600,
          fontSize: "0.9rem",
          color: category.color,
          marginTop: "auto"
        }}
      >
        <span>Explore Guide</span>
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
