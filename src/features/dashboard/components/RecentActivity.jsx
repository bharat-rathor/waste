import React from "react";
import { Trash2, Heart, Award, HelpCircle, CheckCircle } from "lucide-react";
import { formatDateTime } from "../../../utils/dateHelpers";

export default function RecentActivity({ activities = [] }) {
  if (activities.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
        No recent activities recorded yet. Start by logging waste or taking an eco quiz!
      </div>
    );
  }

  const iconForType = (type) => {
    switch (type) {
      case "waste":
        return { icon: Trash2, color: "#2e7d32", bg: "#e8f5e9" };
      case "diy":
        return { icon: CheckCircle, color: "#0288d1", bg: "#e1f5fe" };
      case "challenge":
        return { icon: Award, color: "#f57c00", bg: "#fff3e0" };
      case "quiz":
        return { icon: HelpCircle, color: "#7b1fa2", bg: "#f3e5f5" };
      default:
        return { icon: Heart, color: "#546e7a", bg: "#eceff1" };
    }
  };

  return (
    <div className="activity-timeline">
      {activities.slice(0, 5).map((act, idx) => {
        const meta = iconForType(act.type);
        const Icon = meta.icon;
        return (
          <div key={idx} className="activity-item">
            <div className="activity-icon" style={{ background: meta.bg, color: meta.color }}>
              <Icon size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h5 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-primary-dark)", margin: 0 }}>
                  {act.title}
                </h5>
                <span style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>
                  {formatDateTime(act.timestamp)}
                </span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.2rem", margin: 0 }}>
                {act.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
