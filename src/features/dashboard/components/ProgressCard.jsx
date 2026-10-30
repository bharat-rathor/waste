import React from "react";
import { Sparkles, Trophy, Target } from "lucide-react";
import { getEcoLevel } from "../../../utils/calculations";

export default function ProgressCard({ profile, completedProjectsCount = 0, completedChallengesCount = 0 }) {
  const points = profile?.ecoPoints || 0;
  const levelInfo = getEcoLevel(points);
  const nextTarget = levelInfo.nextThreshold || 500;
  const progressPercent = Math.min(100, Math.round((points / nextTarget) * 100));

  return (
    <div className="card" style={{ padding: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "1.5rem" }}>{levelInfo.badge}</span>
          <div>
            <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--color-primary-dark)", margin: 0 }}>
              {levelInfo.title}
            </h4>
            <span style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>Tier {levelInfo.level} Member</span>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--color-primary)" }}>
            {points}
          </span>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}> Pts</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.35rem" }}>
          <span>Next Rank Target</span>
          <span>{points} / {nextTarget} Pts</span>
        </div>
        <div
          style={{
            height: "8px",
            background: "var(--bg-subtle)",
            borderRadius: "var(--radius-full)",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progressPercent}%`,
              background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))",
              borderRadius: "var(--radius-full)",
              transition: "width 0.4s ease"
            }}
          />
        </div>
      </div>

      {/* Mini Quick Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.75rem",
          paddingTop: "1rem",
          borderTop: "1px solid var(--border-light)"
        }}
      >
        <div style={{ background: "var(--bg-subtle)", padding: "0.75rem", borderRadius: "var(--radius-md)", textAlign: "center" }}>
          <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--color-primary-dark)" }}>
            {completedProjectsCount}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>DIY Upcycled</div>
        </div>
        <div style={{ background: "var(--bg-subtle)", padding: "0.75rem", borderRadius: "var(--radius-md)", textAlign: "center" }}>
          <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--color-primary-dark)" }}>
            {completedChallengesCount}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Challenges Won</div>
        </div>
      </div>
    </div>
  );
}
