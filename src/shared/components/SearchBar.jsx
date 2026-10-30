import React from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = "Search waste, materials, DIY projects...",
  className = ""
}) {
  return (
    <div className={`search-bar-wrapper ${className}`} style={{ position: "relative", width: "100%" }}>
      <Search
        size={18}
        style={{
          position: "absolute",
          left: "1rem",
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--text-light)",
          pointerEvents: "none"
        }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="form-input"
        style={{
          paddingLeft: "2.6rem",
          paddingRight: value ? "2.6rem" : "1rem",
          width: "100%",
          borderRadius: "var(--radius-full)",
          background: "var(--bg-surface)",
          boxShadow: "var(--shadow-sm)"
        }}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          style={{
            position: "absolute",
            right: "0.85rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--text-muted)",
            display: "flex",
            alignItems: "center"
          }}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
