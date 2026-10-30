import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function Toast({ toasts = [], onRemove }) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isError = toast.type === "error";

        return (
          <div
            key={toast.id}
            className={`toast ${isSuccess ? "toast-success" : isError ? "toast-error" : ""}`}
          >
            {isSuccess && <CheckCircle2 size={18} />}
            {isError && <AlertCircle size={18} />}
            {!isSuccess && !isError && <Info size={18} />}
            <span style={{ flex: 1 }}>{toast.message}</span>
            {onRemove && (
              <button
                onClick={() => onRemove(toast.id)}
                style={{ color: "inherit", opacity: 0.8, padding: "2px" }}
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
