import React, { useState } from "react";
import {
  History,
  Trash2,
  CheckCircle,
  Award,
  HelpCircle,
  Filter,
  Calendar,
  Sparkles
} from "lucide-react";
import SearchBar from "../../../shared/components/SearchBar";
import EmptyState from "../../../shared/components/EmptyState";
import { useIndexedDB } from "../../../shared/hooks/useIndexedDB";
import { formatDateTime } from "../../../utils/dateHelpers";

export default function ActivityHistory() {
  const { wasteRecords, completedProjects, challenges, quizResults } = useIndexedDB();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all"); // all, waste, diy, challenge, quiz
  const [dateFilter, setDateFilter] = useState("");

  // Aggregate all activities chronologically
  const allActivities = [
    ...wasteRecords.map((w) => ({
      id: `w-${w.id}`,
      type: "waste",
      typeLabel: "Waste Log",
      title: `Logged ${w.itemName} (${w.category})`,
      description: `Quantity: ${w.quantity} ${w.unit} • Action: ${w.action}${w.notes ? ` • Note: ${w.notes}` : ""}`,
      timestamp: w.date || w.createdAt,
      badgeClass: "badge-wet"
    })),
    ...completedProjects.map((c) => ({
      id: `c-${c.id}`,
      type: "diy",
      typeLabel: "DIY Upcycling",
      title: `Built "${c.title}"`,
      description: `Completed step-by-step DIY tutorial and earned +25 Eco Points`,
      timestamp: c.completedAt,
      badgeClass: "badge-recyclable"
    })),
    ...challenges
      .filter((ch) => ch.status === "completed")
      .map((ch) => ({
        id: `ch-${ch.id}`,
        type: "challenge",
        typeLabel: "Eco Challenge",
        title: `Won Challenge: ${ch.title}`,
        description: `Successfully completed challenge objectives and earned +${ch.pointsAwarded || 50} Eco Points`,
        timestamp: ch.completedAt,
        badgeClass: "badge-dry"
      })),
    ...quizResults.map((q) => ({
      id: `q-${q.id}`,
      type: "quiz",
      typeLabel: "Eco Quiz",
      title: `Quiz Score: ${q.score}/${q.totalQuestions} (${q.percentage}%)`,
      description: `Tested environmental knowledge and earned +${q.earnedPoints || q.score * 5} Eco Points`,
      timestamp: q.date,
      badgeClass: "badge-ewaste"
    }))
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  // Filter activities
  const filteredActivities = allActivities.filter((act) => {
    const matchesCategory = categoryFilter === "all" || act.type === categoryFilter;
    const matchesSearch =
      !searchTerm ||
      act.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !dateFilter || (act.timestamp && act.timestamp.startsWith(dateFilter));

    return matchesCategory && matchesSearch && matchesDate;
  });

  const getIconForType = (type) => {
    switch (type) {
      case "waste":
        return <Trash2 size={18} color="#2e7d32" />;
      case "diy":
        return <CheckCircle size={18} color="#0288d1" />;
      case "challenge":
        return <Award size={18} color="#f57c00" />;
      case "quiz":
        return <HelpCircle size={18} color="#7b1fa2" />;
      default:
        return <Sparkles size={18} color="#546e7a" />;
    }
  };

  return (
    <div className="activity-history-page">
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-primary-dark)", margin: 0 }}>
          Activity Timeline
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "0.25rem 0 0 0" }}>
          A unified chronological record of all your waste entries, completed DIY projects, eco challenges, and quiz results.
        </p>
      </div>

      {/* Filter Bar */}
      <div
        className="card"
        style={{
          padding: "1.25rem",
          marginBottom: "1.75rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap"
        }}
      >
        <div style={{ flex: "1 1 220px" }}>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onClear={() => setSearchTerm("")}
            placeholder="Search activities..."
          />
        </div>

        {/* Category Filter */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)" }}>
            Type:
          </span>
          <select
            className="form-select"
            style={{ width: "auto", minWidth: "140px", padding: "0.45rem 0.75rem" }}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Activities</option>
            <option value="waste">Waste Logs</option>
            <option value="diy">DIY Projects</option>
            <option value="challenge">Eco Challenges</option>
            <option value="quiz">Quiz Results</option>
          </select>
        </div>

        {/* Date Filter */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)" }}>
            Date:
          </span>
          <input
            type="date"
            className="form-input"
            style={{ width: "auto", padding: "0.45rem 0.75rem" }}
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
          {dateFilter && (
            <button
              onClick={() => setDateFilter("")}
              style={{ fontSize: "0.8rem", color: "var(--color-primary)", textDecoration: "underline" }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Timeline Stream */}
      {filteredActivities.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {filteredActivities.map((act) => (
            <div
              key={act.id}
              className="card"
              style={{
                padding: "1.25rem 1.5rem",
                display: "flex",
                alignItems: "flex-start",
                gap: "1.25rem"
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "var(--bg-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}
              >
                {getIconForType(act.type)}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span className={`badge ${act.badgeClass}`}>{act.typeLabel}</span>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-primary-dark)", margin: 0 }}>
                      {act.title}
                    </h3>
                  </div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>
                    {formatDateTime(act.timestamp)}
                  </span>
                </div>

                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", margin: "0.25rem 0 0 0", lineHeight: 1.5 }}>
                  {act.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={History}
          title="No activity history found"
          description="Log waste items, complete tutorials, or take eco quizzes to see your journey unfold here."
        />
      )}
    </div>
  );
}
