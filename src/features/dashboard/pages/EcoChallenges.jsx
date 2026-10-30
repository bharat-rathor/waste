import React, { useState, useEffect } from "react";
import {
  Award,
  Clock,
  Sparkles,
  CheckCircle2,
  Play,
  RotateCcw,
  ShieldCheck,
  Filter
} from "lucide-react";
import Button from "../../../shared/components/Button";
import Toast from "../../../shared/components/Toast";
import { ecoChallenges } from "../../../data/ecoChallenges";
import {
  getAllChallengeProgress,
  startChallenge,
  completeChallenge,
  resetChallenge
} from "../../../services/database/challengeService";

export default function EcoChallenges() {
  const [progressMap, setProgressMap] = useState({});
  const [filterStatus, setFilterStatus] = useState("all"); // all, active, completed, available
  const [toasts, setToasts] = useState([]);

  const loadProgress = async () => {
    try {
      const records = await getAllChallengeProgress();
      const map = {};
      records.forEach((r) => {
        map[r.challengeId] = r;
      });
      setProgressMap(map);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProgress();
  }, []);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleStart = async (challenge) => {
    try {
      await startChallenge(challenge.id, challenge.title);
      showToast(`Challenge "${challenge.title}" started! Good luck.`);
      loadProgress();
    } catch (err) {
      console.error(err);
    }
  };

  const handleComplete = async (challenge) => {
    try {
      await completeChallenge(challenge.id, challenge.title, challenge.ecoPoints);
      showToast(`Completed! Earned +${challenge.ecoPoints} Eco Points 🌟`, "success");
      loadProgress();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = async (challenge) => {
    try {
      await resetChallenge(challenge.id);
      showToast(`Challenge reset.`, "info");
      loadProgress();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredChallenges = ecoChallenges.filter((ch) => {
    const status = progressMap[ch.id]?.status || "available";
    if (filterStatus === "active") return status === "in-progress";
    if (filterStatus === "completed") return status === "completed";
    if (filterStatus === "available") return status === "available";
    return true;
  });

  const completedCount = Object.values(progressMap).filter((p) => p.status === "completed").length;
  const activeCount = Object.values(progressMap).filter((p) => p.status === "in-progress").length;

  return (
    <div className="eco-challenges-page">
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-primary-dark)", margin: 0 }}>
          Eco Quests & Challenges
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "0.25rem 0 0 0" }}>
          Engage in 10 actionable sustainable habits, complete eco quests, and earn eco points stored in your IndexedDB.
        </p>
      </div>

      {/* Stats Bar */}
      <div
        className="card"
        style={{
          padding: "1.25rem 1.75rem",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Total Quests</div>
            <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-primary-dark)" }}>
              {ecoChallenges.length}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>In Progress</div>
            <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#f57c00" }}>
              {activeCount}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Completed</div>
            <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-primary)" }}>
              {completedCount} / {ecoChallenges.length}
            </div>
          </div>
        </div>

        {/* Filter Chips */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {["all", "available", "active", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`material-chip ${filterStatus === tab ? "active" : ""}`}
              style={{ fontSize: "0.85rem", padding: "0.4rem 0.85rem", textTransform: "capitalize" }}
            >
              {tab === "active" ? "In Progress" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Challenges Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.5rem"
        }}
      >
        {filteredChallenges.map((challenge) => {
          const progress = progressMap[challenge.id];
          const isCompleted = progress?.status === "completed";
          const isInProgress = progress?.status === "in-progress";

          return (
            <div
              key={challenge.id}
              className="card"
              style={{
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                borderTop: isCompleted
                  ? "4px solid #2e7d32"
                  : isInProgress
                  ? "4px solid #f57c00"
                  : "4px solid var(--border-medium)"
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.85rem" }}>
                <span
                  style={{
                    background: "var(--color-primary-subtle)",
                    color: "var(--color-primary)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    padding: "0.25rem 0.65rem",
                    borderRadius: "var(--radius-full)"
                  }}
                >
                  {challenge.category}
                </span>

                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "var(--color-primary)", fontWeight: 700, fontSize: "0.85rem" }}>
                  <Sparkles size={14} />
                  <span>+{challenge.ecoPoints} Pts</span>
                </div>
              </div>

              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: "0.5rem" }}>
                {challenge.title}
              </h3>

              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "1rem" }}>
                {challenge.description}
              </p>

              <div
                style={{
                  background: "var(--bg-subtle)",
                  borderRadius: "var(--radius-sm)",
                  padding: "0.75rem 1rem",
                  fontSize: "0.8rem",
                  color: "var(--text-main)",
                  marginBottom: "1.25rem"
                }}
              >
                <strong>Objective:</strong> {challenge.objective}
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-light)", marginBottom: "1.25rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <Clock size={14} /> Duration: {challenge.duration}
                </span>
                <span>Level: {challenge.difficulty}</span>
              </div>

              {/* Action Buttons */}
              <div style={{ marginTop: "auto", display: "flex", gap: "0.5rem" }}>
                {!progress && (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Play}
                    style={{ width: "100%" }}
                    onClick={() => handleStart(challenge)}
                  >
                    Start Challenge
                  </Button>
                )}

                {isInProgress && (
                  <>
                    <Button
                      variant="primary"
                      size="sm"
                      icon={CheckCircle2}
                      style={{ flex: 1, background: "#2e7d32" }}
                      onClick={() => handleComplete(challenge)}
                    >
                      Mark Completed
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={RotateCcw}
                      title="Reset challenge"
                      onClick={() => handleReset(challenge)}
                    />
                  </>
                )}

                {isCompleted && (
                  <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ color: "#2e7d32", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.9rem" }}>
                      <CheckCircle2 size={18} /> Completed ✓
                    </span>
                    <button
                      onClick={() => handleReset(challenge)}
                      style={{ fontSize: "0.8rem", color: "var(--text-muted)", textDecoration: "underline" }}
                    >
                      Restart
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Toast toasts={toasts} onRemove={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
}
