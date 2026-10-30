import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  Repeat,
  Recycle,
  Trash,
  CheckCircle,
  Sparkles,
  ArrowRight,
  PlusCircle,
  Award,
  HelpCircle,
  Heart
} from "lucide-react";
import DashboardStatCard from "../components/DashboardStatCard";
import {
  CategoryPieChart,
  ActionBarChart,
  ActivityAreaChart
} from "../components/DashboardChart";
import RecentActivity from "../components/RecentActivity";
import ProgressCard from "../components/ProgressCard";
import Button from "../../../shared/components/Button";
import EmptyState from "../../../shared/components/EmptyState";
import { useIndexedDB } from "../../../shared/hooks/useIndexedDB";
import {
  calculateWasteTotals,
  formatUnitBreakdown,
  getCategoryChartData,
  getActionChartData,
  getTimelineChartData
} from "../../../utils/calculations";
import { diyProjects } from "../../../data/diyProjects";

export default function DashboardHome() {
  const {
    wasteRecords,
    profile,
    favorites,
    completedProjects,
    challenges,
    quizResults,
    loading
  } = useIndexedDB();

  // Aggregate statistics calculated strictly from IndexedDB
  const totals = calculateWasteTotals(wasteRecords);
  const totalCount = wasteRecords.length;
  const reusedSummary = formatUnitBreakdown(totals.byAction.Reused);
  const recycledSummary = formatUnitBreakdown(totals.byAction.Recycled);
  const disposedSummary = formatUnitBreakdown(totals.byAction.Disposed);
  const totalUnitSummary = formatUnitBreakdown(totals.byUnit);

  // Chart data sets
  const categoryChartData = getCategoryChartData(wasteRecords);
  const actionChartData = getActionChartData(wasteRecords);
  const timelineChartData = getTimelineChartData(wasteRecords);

  // Combine chronological activities for the recent activity widget
  const combinedActivities = [
    ...wasteRecords.map((w) => ({
      type: "waste",
      title: `Logged Waste: ${w.itemName}`,
      description: `${w.quantity} ${w.unit} • Action: ${w.action}`,
      timestamp: w.date || w.createdAt
    })),
    ...completedProjects.map((c) => ({
      type: "diy",
      title: `DIY Upcycled: ${c.title}`,
      description: `Completed project tutorial (+25 Eco Points)`,
      timestamp: c.completedAt
    })),
    ...challenges
      .filter((ch) => ch.status === "completed")
      .map((ch) => ({
        type: "challenge",
        title: `Challenge Completed: ${ch.title}`,
        description: `Earned ${ch.pointsAwarded || 50} Eco Points`,
        timestamp: ch.completedAt
      })),
    ...quizResults.map((q) => ({
      type: "quiz",
      title: `Eco Quiz Scored: ${q.score}/${q.totalQuestions}`,
      description: `${q.percentage}% accuracy (${q.earnedPoints || 0} pts earned)`,
      timestamp: q.date
    }))
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  // Resolved favourite projects from predefined data
  const favProjectCards = diyProjects.filter((p) =>
    favorites.some((f) => f.projectId === p.id)
  );

  return (
    <div className="dashboard-home">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 className="welcome-title">
            Welcome Back! Let's Make Every Waste Material Count.
          </h1>
          <p className="welcome-subtitle">
            Track your daily activities, explore sustainable ideas and see your progress towards a cleaner environment.
          </p>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            <Link to="/dashboard/waste-tracker">
              <Button
                variant="secondary"
                size="sm"
                icon={PlusCircle}
                style={{ background: "#ffffff", borderColor: "#ffffff", color: "var(--color-primary-dark)" }}
              >
                Log New Waste Item
              </Button>
            </Link>
            <Link to="/dashboard/challenges">
              <Button
                variant="outline"
                size="sm"
                icon={Award}
                style={{ color: "#ffffff", borderColor: "rgba(255, 255, 255, 0.4)" }}
              >
                Take an Eco Challenge
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid">
        <DashboardStatCard
          label="Total Waste Recorded"
          value={totalCount}
          subtext={totalUnitSummary}
          icon={Trash2}
          color="#1b5e20"
          bgColor="#e8f5e9"
        />

        <DashboardStatCard
          label="Reused Waste"
          value={reusedSummary.split(" • ")[0] || "0 items"}
          subtext={reusedSummary.split(" • ").slice(1).join(" • ") || "Diverted for reuse"}
          icon={Repeat}
          color="#2e7d32"
          bgColor="#edf7ee"
        />

        <DashboardStatCard
          label="Recycled Waste"
          value={recycledSummary.split(" • ")[0] || "0 items"}
          subtext={recycledSummary.split(" • ").slice(1).join(" • ") || "Sent to recycling"}
          icon={Recycle}
          color="#0288d1"
          bgColor="#e1f5fe"
        />

        <DashboardStatCard
          label="Disposed Waste"
          value={disposedSummary.split(" • ")[0] || "0 items"}
          subtext={disposedSummary.split(" • ").slice(1).join(" • ") || "Safe municipal disposal"}
          icon={Trash}
          color="#78909c"
          bgColor="#eceff1"
        />

        <DashboardStatCard
          label="Completed DIY Projects"
          value={completedProjects.length}
          subtext="Practical creations built"
          icon={CheckCircle}
          color="#f57c00"
          bgColor="#fff3e0"
        />
      </div>

      {/* Onboarding State if no waste logged yet */}
      {totalCount === 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <EmptyState
            icon={Sparkles}
            title="Start Logging Your Daily Household Discards"
            description="You have not recorded any waste items yet. Click 'Log New Waste Item' to record plastic bottles, cardboard, or food scraps and visualize your local impact!"
            actionLabel="Add Your First Waste Record"
            onAction={() => window.location.assign("#/dashboard/waste-tracker")}
            actionIcon={PlusCircle}
          />
        </div>
      )}

      {/* Analytics Charts Grid */}
      <div className="charts-grid">
        {/* Category Breakdown */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Waste Category Distribution</h3>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>By Log Frequency</span>
          </div>
          <CategoryPieChart data={categoryChartData} />
        </div>

        {/* Action Taken Breakdown */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Reused vs Recycled vs Disposed</h3>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Actions Comparison</span>
          </div>
          <ActionBarChart data={actionChartData} />
        </div>
      </div>

      {/* Weekly Activity Area Chart */}
      <div className="chart-card" style={{ marginBottom: "2rem" }}>
        <div className="chart-header">
          <h3 className="chart-title">Daily / Weekly Waste Activity</h3>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Recent Timeline Trends</span>
        </div>
        <ActivityAreaChart data={timelineChartData} />
      </div>

      {/* Middle Grid: Progress & Recent Activity */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "1.5rem",
          marginBottom: "2rem"
        }}
        className="charts-grid"
      >
        {/* Recent Activity */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-primary-dark)", margin: 0 }}>
              Recent Activities
            </h3>
            <Link to="/dashboard/history" style={{ fontSize: "0.85rem", color: "var(--color-primary)", fontWeight: 600 }}>
              View All History →
            </Link>
          </div>
          <RecentActivity activities={combinedActivities} />
        </div>

        {/* Progress & Eco Streak Card */}
        <ProgressCard
          profile={profile}
          completedProjectsCount={completedProjects.length}
          completedChallengesCount={challenges.filter((c) => c.status === "completed").length}
        />
      </div>

      {/* Favourite Projects Quick View */}
      {favProjectCards.length > 0 && (
        <div className="card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-primary-dark)", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Heart size={18} color="#e53935" fill="#e53935" />
              <span>Saved Favorite Projects</span>
            </h3>
            <Link to="/dashboard/favorites" style={{ fontSize: "0.85rem", color: "var(--color-primary)", fontWeight: 600 }}>
              Manage Favorites →
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1rem"
            }}
          >
            {favProjectCards.slice(0, 3).map((proj) => (
              <div
                key={proj.id}
                style={{
                  display: "flex",
                  gap: "0.85rem",
                  alignItems: "center",
                  padding: "0.75rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-light)",
                  background: "var(--bg-subtle)"
                }}
              >
                <img
                  src={proj.image}
                  alt={proj.title}
                  style={{ width: "50px", height: "50px", borderRadius: "var(--radius-sm)", objectFit: "cover" }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--color-primary-dark)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {proj.title}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {proj.wasteMaterial} • {proj.duration}
                  </div>
                </div>
                <Link to={`/diy-projects/${proj.id}`}>
                  <Button variant="secondary" size="sm">
                    Open
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
