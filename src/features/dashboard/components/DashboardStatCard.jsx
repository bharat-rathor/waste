import React from "react";

export default function DashboardStatCard({
  label,
  value,
  subtext,
  icon: Icon,
  color = "#2e7d32",
  bgColor = "#e8f5e9"
}) {
  return (
    <div className="stat-card" style={{ borderLeft: `4px solid ${color}` }}>
      <div>
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
        {subtext && <div className="stat-subtext">{subtext}</div>}
      </div>
      <div className="stat-icon-box" style={{ background: bgColor, color }}>
        {Icon && <Icon size={22} />}
      </div>
    </div>
  );
}
