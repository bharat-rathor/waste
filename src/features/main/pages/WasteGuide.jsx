import React, { useState } from "react";
import {
  Trash2,
  Layers,
  Recycle,
  AlertTriangle,
  Cpu,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ShieldCheck,
  Search
} from "lucide-react";
import SearchBar from "../../../shared/components/SearchBar";
import { wasteCategories } from "../../../data/wasteCategories";

const iconMap = {
  "wet-waste": Trash2,
  "dry-waste": Layers,
  "recyclable-waste": Recycle,
  "hazardous-waste": AlertTriangle,
  "e-waste": Cpu
};

export default function WasteGuide() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryTab, setSelectedCategoryTab] = useState("all");

  const filteredCategories = wasteCategories.filter((cat) => {
    const matchesTab = selectedCategoryTab === "all" || cat.id === selectedCategoryTab;
    const matchesSearch =
      !searchTerm ||
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.examples.some((ex) => ex.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  return (
    <div className="waste-guide-page">
      {/* Header Banner */}
      <section style={{ background: "linear-gradient(180deg, #edf7ee 0%, #f8faf8 100%)", padding: "4rem 0 3rem 0" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span className="section-badge">Comprehensive Handbook</span>
          <h1 className="section-title" style={{ fontSize: "2.75rem", marginBottom: "1rem" }}>
            Household & Student Waste Guide
          </h1>
          <p className="section-subtitle" style={{ marginBottom: "2rem" }}>
            Learn how to segregate wet, dry, recyclable, hazardous, and electronic waste correctly to
            protect your community, maintain hygiene, and enable effective recycling.
          </p>

          <div style={{ maxWidth: "560px", margin: "0 auto" }}>
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              onClear={() => setSearchTerm("")}
              placeholder="Search categories, items (e.g. peel, battery, carton)..."
            />
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section style={{ borderBottom: "1px solid var(--border-light)", background: "#ffffff", position: "sticky", top: "72px", zIndex: 10 }}>
        <div className="container" style={{ overflowX: "auto", display: "flex", gap: "0.5rem", padding: "0.75rem 1.5rem" }}>
          <button
            onClick={() => setSelectedCategoryTab("all")}
            className={`material-chip ${selectedCategoryTab === "all" ? "active" : ""}`}
            style={{ borderRadius: "var(--radius-md)" }}
          >
            All Categories
          </button>
          {wasteCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategoryTab(c.id)}
              className={`material-chip ${selectedCategoryTab === c.id ? "active" : ""}`}
              style={{ borderRadius: "var(--radius-md)" }}
            >
              {c.name}
            </button>
          ))}
        </div>
      </section>

      {/* Guide Content */}
      <section className="section-padding" style={{ background: "var(--bg-page)" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {filteredCategories.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
              <HelpCircle size={48} color="var(--text-light)" style={{ margin: "0 auto 1rem auto" }} />
              <h3>No matching waste categories found</h3>
              <p style={{ color: "var(--text-muted)" }}>Try searching with a different term like "plastic", "batteries", or "food".</p>
            </div>
          ) : (
            filteredCategories.map((category) => {
              const IconComp = iconMap[category.id] || Recycle;
              return (
                <div
                  key={category.id}
                  id={category.id}
                  className="card"
                  style={{
                    padding: "2.5rem",
                    borderTop: `6px solid ${category.color}`,
                    scrollMarginTop: "140px"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem", marginBottom: "1.5rem" }}>
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "var(--radius-lg)",
                        background: category.bgColor,
                        color: category.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        border: `1px solid ${category.borderColor}`
                      }}
                    >
                      <IconComp size={28} />
                    </div>

                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                        <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-primary-dark)", margin: 0 }}>
                          {category.name}
                        </h2>
                        <span
                          style={{
                            background: category.bgColor,
                            color: category.color,
                            padding: "0.2rem 0.65rem",
                            borderRadius: "var(--radius-full)",
                            fontSize: "0.8rem",
                            fontWeight: 700
                          }}
                        >
                          {category.tagline}
                        </span>
                      </div>
                      <p style={{ fontSize: "1rem", color: "var(--text-muted)", marginTop: "0.5rem", lineHeight: 1.6 }}>
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: "2rem",
                      marginTop: "1.5rem"
                    }}
                  >
                    {/* Examples Section */}
                    <div style={{ background: "var(--bg-subtle)", padding: "1.5rem", borderRadius: "var(--radius-md)" }}>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span>Common Examples</span>
                      </h4>
                      <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8, fontSize: "0.9rem", color: "var(--text-main)" }}>
                        {category.examples.map((ex, idx) => (
                          <li key={idx}>{ex}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Guidance Section */}
                    <div style={{ background: "var(--bg-subtle)", padding: "1.5rem", borderRadius: "var(--radius-md)" }}>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <ShieldCheck size={18} color="var(--color-primary)" />
                        <span>Proper Handling Guidance</span>
                      </h4>
                      <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8, fontSize: "0.9rem", color: "var(--text-main)" }}>
                        {category.guidance.map((guide, idx) => (
                          <li key={idx}>{guide}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Do's & Don'ts */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1.5rem",
                      marginTop: "1.5rem"
                    }}
                    className="grid-2"
                  >
                    <div style={{ background: "#e8f5e9", padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid #c8e6c9" }}>
                      <h5 style={{ color: "#2e7d32", display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem", fontWeight: 700 }}>
                        <CheckCircle2 size={18} /> Best Practices (Do's)
                      </h5>
                      <ul style={{ paddingLeft: "1.2rem", fontSize: "0.85rem", color: "#1b5e20", lineHeight: 1.6 }}>
                        {category.dos.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ background: "#ffebee", padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid #ffcdd2" }}>
                      <h5 style={{ color: "#c62828", display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem", fontWeight: 700 }}>
                        <XCircle size={18} /> Avoid Doing (Don'ts)
                      </h5>
                      <ul style={{ paddingLeft: "1.2rem", fontSize: "0.85rem", color: "#b71c1c", lineHeight: 1.6 }}>
                        {category.donts.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Disposal Tip */}
                  <div
                    style={{
                      marginTop: "1.25rem",
                      padding: "1rem 1.25rem",
                      borderRadius: "var(--radius-md)",
                      background: category.bgColor,
                      border: `1px solid ${category.borderColor}`,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      fontSize: "0.9rem",
                      color: category.color
                    }}
                  >
                    <Recycle size={20} style={{ flexShrink: 0 }} />
                    <div>
                      <strong>Recommended Disposal Route: </strong>
                      <span>{category.disposalTip}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
