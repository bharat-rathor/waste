import React from "react";
import { Loader2 } from "lucide-react";

export default function Loader({ message = "Loading...", fullScreen = false }) {
  if (fullScreen) {
    return (
      <div style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem"
      }}>
        <Loader2 size={36} className="spin-animation" style={{ color: "var(--color-primary)" }} />
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>{message}</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "2rem" }}>
      <Loader2 size={24} className="spin-animation" style={{ color: "var(--color-primary)" }} />
      <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{message}</span>
    </div>
  );
}
