import React from "react";
import Button from "./Button";

export default function EmptyState({
  icon: Icon,
  title = "No items found",
  description = "Get started by adding a new record or exploring other categories.",
  actionLabel,
  onAction,
  actionIcon
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "3.5rem 1.5rem",
        background: "var(--bg-surface)",
        borderRadius: "var(--radius-lg)",
        border: "1px dashed var(--border-medium)",
        margin: "1rem 0"
      }}
    >
      {Icon && (
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "var(--color-primary-subtle)",
            color: "var(--color-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem"
          }}
        >
          <Icon size={28} />
        </div>
      )}
      <h4 style={{ fontSize: "1.15rem", fontWeight: "700", color: "var(--color-primary-dark)", marginBottom: "0.4rem" }}>
        {title}
      </h4>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", maxWidth: "420px", marginBottom: actionLabel ? "1.25rem" : "0" }}>
        {description}
      </p>
      {actionLabel && (
        <Button variant="primary" icon={actionIcon} onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
