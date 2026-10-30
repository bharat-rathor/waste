import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import Button from "./Button";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem"
      }}
    >
      <div
        style={{
          fontSize: "6rem",
          fontWeight: 900,
          color: "var(--color-primary)",
          lineHeight: 1,
          marginBottom: "1rem"
        }}
      >
        404
      </div>
      <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-primary-dark)", marginBottom: "0.5rem" }}>
        Page Not Found
      </h2>
      <p style={{ color: "var(--text-muted)", maxWidth: "480px", marginBottom: "2rem" }}>
        The page you are looking for might have been moved, removed, or is temporarily unavailable. Let's get you back to safe ground!
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link to="/">
          <Button variant="primary" icon={Home}>
            Back to Home
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="secondary" icon={ArrowLeft}>
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
