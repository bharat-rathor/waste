import React from "react";
import { Search, SplitSquareVertical, BookOpen, Lightbulb, Hammer, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Identify Your Waste",
    description: "Look at your daily household and study discards to recognize what material it actually is.",
    icon: Search
  },
  {
    number: "2",
    title: "Separate Materials",
    description: "Segregate wet organic scraps from dry clean paper, glass, plastic packaging, and hazardous items.",
    icon: SplitSquareVertical
  },
  {
    number: "3",
    title: "Learn Management",
    description: "Review proper handling guidelines, municipal disposal rules, and contamination prevention tips.",
    icon: BookOpen
  },
  {
    number: "4",
    title: "Discover Reuse Ideas",
    description: "Select what you have—like plastic bottles, jars, or cartons—and find suitable upcycling tutorials.",
    icon: Lightbulb
  },
  {
    number: "5",
    title: "Create Useful Products",
    description: "Follow safe, realistic step-by-step instructions to craft durable planters, organizers, and totes.",
    icon: Hammer
  },
  {
    number: "6",
    title: "Track Your Progress",
    description: "Log your daily waste in the local dashboard, complete eco challenges, and monitor your personal impact.",
    icon: TrendingUp
  }
];

export default function HowItWorks() {
  return (
    <div className="how-it-works-grid">
      {steps.map((step) => {
        const Icon = step.icon;
        return (
          <div key={step.number} className="step-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <div className="step-number">{step.number}</div>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--bg-subtle)",
                  color: "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon size={20} />
              </div>
            </div>
            <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: "0.4rem" }}>
              {step.title}
            </h4>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: "1.5" }}>
              {step.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
