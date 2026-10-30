import React from "react";
import { Link } from "react-router-dom";
import {
  Target,
  Compass,
  CheckCircle2,
  Users,
  GraduationCap,
  Home as HomeIcon,
  Globe,
  Scissors,
  ArrowRight
} from "lucide-react";
import Button from "../../../shared/components/Button";

const objectives = [
  "Promote proper waste segregation at source across households and campuses.",
  "Encourage the reuse and recycling of everyday household and academic waste.",
  "Provide practical, safe waste-to-wealth DIY ideas that require minimal tools.",
  "Educate students and families about safe municipal disposal and composting.",
  "Help users record, monitor, and visualize daily waste activities locally.",
  "Encourage environmentally responsible habits through interactive challenges.",
  "Make waste management interactive, accessible, and rewarding for all age groups."
];

const approachSteps = [
  { title: "Awareness", desc: "Understanding the true lifecycle of everyday products and the environmental burden of unchecked landfills." },
  { title: "Segregation", desc: "Instilling the habit of sorting organics, dry recyclables, hazardous chemicals, and e-waste immediately." },
  { title: "Reuse", desc: "Prioritizing creative upcycling before discarding items, finding practical second functions for bottles and jars." },
  { title: "Recycling", desc: "Channeling cleaned dry secondary materials into municipal paper pulping and plastic recycling streams." },
  { title: "Tracking", desc: "Logging daily quantities in a local-first dashboard to observe patterns, habits, and diversion rates." },
  { title: "Sustainable Habits", desc: "Transforming small individual daily actions into lasting circular lifestyle choices." }
];

const targetAudiences = [
  {
    icon: GraduationCap,
    title: "College & School Students",
    desc: "Practical science projects, hostel waste reduction, DIY desk organizers, and environmental awareness."
  },
  {
    icon: HomeIcon,
    title: "Household Users",
    desc: "Kitchen wet waste composting, organized dry storage, zero-sew grocery totes, and family eco-habits."
  },
  {
    icon: Globe,
    title: "Environmental Groups",
    desc: "Workshops, community clean-up drives, waste audit tools, and educational segregation resources."
  },
  {
    icon: Scissors,
    title: "DIY & Reuse Enthusiasts",
    desc: "Creative upcycling techniques, vertical gardens, handmade seed papers, and functional decor."
  }
];

export default function About() {
  return (
    <div className="about-page">
      {/* Page Header */}
      <section style={{ background: "linear-gradient(180deg, #edf7ee 0%, #f8faf8 100%)", padding: "4.5rem 0 3rem 0" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span className="section-badge">About the Project</span>
          <h1 className="section-title" style={{ fontSize: "2.75rem", marginBottom: "1rem" }}>
            Smart Waste Management & Waste-to-Wealth
          </h1>
          <p className="section-subtitle" style={{ fontSize: "1.15rem", lineHeight: 1.6 }}>
            Waste Out Best is a practical platform designed to help students, households, and communities
            manage everyday waste responsibly through hands-on education, creative upcycling, and local tracking.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section-padding" style={{ background: "#ffffff" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2.5rem"
            }}
          >
            {/* Mission */}
            <div
              className="card"
              style={{
                padding: "2.5rem",
                borderLeft: "6px solid var(--color-primary)",
                background: "linear-gradient(180deg, var(--bg-surface) 0%, #edf7ee 100%)"
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-primary-subtle)",
                  color: "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem"
                }}
              >
                <Compass size={26} />
              </div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-primary-dark)", marginBottom: "0.75rem" }}>
                Our Mission
              </h3>
              <p style={{ fontSize: "1.1rem", color: "var(--text-main)", lineHeight: 1.7 }}>
                "To make responsible waste management easier through practical education, creative reuse
                and sustainable habits."
              </p>
            </div>

            {/* Vision */}
            <div
              className="card"
              style={{
                padding: "2.5rem",
                borderLeft: "6px solid var(--color-secondary)",
                background: "linear-gradient(180deg, var(--bg-surface) 0%, #edf7ee 100%)"
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-secondary-subtle)",
                  color: "var(--color-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem"
                }}
              >
                <Target size={26} />
              </div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-primary-dark)", marginBottom: "0.75rem" }}>
                Our Vision
              </h3>
              <p style={{ fontSize: "1.1rem", color: "var(--text-main)", lineHeight: 1.7 }}>
                "To encourage a society where everyday materials are used responsibly and fewer useful
                resources are wasted."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Objectives Section */}
      <section className="section-padding" style={{ background: "var(--bg-page)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Core Pillars</span>
            <h2 className="section-title">Our Seven Main Objectives</h2>
            <p className="section-subtitle">
              Every feature of Waste Out Best is engineered to address one or more of these core
              environmental objectives.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.25rem",
              maxWidth: "1000px",
              margin: "0 auto"
            }}
          >
            {objectives.map((obj, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  padding: "1.25rem 1.5rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem"
                }}
              >
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    background: "var(--color-primary-subtle)",
                    color: "var(--color-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    flexShrink: 0,
                    marginTop: "2px"
                  }}
                >
                  {idx + 1}
                </div>
                <p style={{ fontSize: "0.95rem", color: "var(--text-main)", lineHeight: 1.5, margin: 0 }}>
                  {obj}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="section-padding" style={{ background: "#ffffff" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Strategic Methodology</span>
            <h2 className="section-title">Our Approach</h2>
            <p className="section-subtitle">
              How Waste Out Best guides users through education, creative practice, and habit formation.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.75rem"
            }}
          >
            {approachSteps.map((app, i) => (
              <div key={i} className="card" style={{ padding: "1.75rem" }}>
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "var(--color-primary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    display: "block",
                    marginBottom: "0.5rem"
                  }}
                >
                  Step 0{i + 1}
                </span>
                <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: "0.5rem" }}>
                  {app.title}
                </h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                  {app.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Users Section */}
      <section className="section-padding" style={{ background: "var(--bg-page)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Audience</span>
            <h2 className="section-title">Who Is Waste Out Best For?</h2>
            <p className="section-subtitle">
              Designed to be accessible, intuitive, and educational for diverse everyday participants.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.75rem"
            }}
          >
            {targetAudiences.map((target, idx) => {
              const Icon = target.icon;
              return (
                <div key={idx} className="card" style={{ padding: "1.75rem", textAlign: "center" }}>
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
                      margin: "0 auto 1.25rem auto"
                    }}
                  >
                    <Icon size={26} />
                  </div>
                  <h4 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: "0.5rem" }}>
                    {target.title}
                  </h4>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                    {target.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <Link to="/dashboard">
              <Button variant="primary" size="lg" icon={ArrowRight}>
                Open Your Personal Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
