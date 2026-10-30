import React, { useState, useEffect } from "react";
import {
  User,
  ShieldCheck,
  Sparkles,
  Award,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Trash2
} from "lucide-react";
import Button from "../../../shared/components/Button";
import Modal from "../../../shared/components/Modal";
import Toast from "../../../shared/components/Toast";
import { useIndexedDB } from "../../../shared/hooks/useIndexedDB";
import {
  getUserProfile,
  saveUserProfile
} from "../../../services/database/profileService";
import { clearAllUserData } from "../../../services/database/db";
import { getEcoLevel } from "../../../utils/calculations";
import { formatDate } from "../../../utils/dateHelpers";

const avatars = [
  { id: "avatar-1", emoji: "🌱", label: "Seedling" },
  { id: "avatar-2", emoji: "🌿", label: "Sprout" },
  { id: "avatar-3", emoji: "🌳", label: "Tree" },
  { id: "avatar-4", emoji: "🦋", label: "Butterfly" },
  { id: "avatar-5", emoji: "🐝", label: "Honeybee" },
  { id: "avatar-6", emoji: "♻️", label: "Recycler" }
];

export default function MyProfile() {
  const { wasteRecords, completedProjects, challenges, quizResults, refreshAll } = useIndexedDB();

  const [name, setName] = useState("");
  const [userType, setUserType] = useState("Student");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("avatar-1");
  const [ecoPoints, setEcoPoints] = useState(0);
  const [joinedDate, setJoinedDate] = useState("");

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    async function load() {
      const p = await getUserProfile();
      if (p) {
        setName(p.name || "Green Practitioner");
        setUserType(p.userType || "Student");
        setBio(p.bio || "");
        setAvatar(p.avatar || "avatar-1");
        setEcoPoints(p.ecoPoints || 0);
        setJoinedDate(p.joinedDate || new Date().toISOString());
      }
    }
    load();
  }, []);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await saveUserProfile({
        name,
        userType,
        bio,
        avatar
      });
      showToast("Profile details updated successfully!");
      refreshAll();
    } catch (err) {
      console.error(err);
      showToast("Error updating profile", "error");
    }
  };

  const handleClearData = async () => {
    try {
      await clearAllUserData();
      setIsResetModalOpen(false);
      showToast("All local user data has been reset.", "info");
      refreshAll();
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (err) {
      console.error(err);
      showToast("Failed to reset data", "error");
    }
  };

  const currentLevel = getEcoLevel(ecoPoints);
  const selectedAvatarObj = avatars.find((a) => a.id === avatar) || avatars[0];

  return (
    <div className="my-profile-page" style={{ maxWidth: "860px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-primary-dark)", margin: 0 }}>
          My Eco Profile
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "0.25rem 0 0 0" }}>
          Manage your local practitioner profile, view earned achievements, and control your IndexedDB storage.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div
        className="card"
        style={{
          padding: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          flexWrap: "wrap",
          marginBottom: "2rem",
          background: "linear-gradient(135deg, #ffffff 0%, #f1f8f2 100%)"
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "var(--color-primary)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.5rem",
            boxShadow: "0 6px 14px rgba(27, 94, 32, 0.25)"
          }}
        >
          {selectedAvatarObj.emoji}
        </div>

        <div style={{ flex: 1, minWidth: "200px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.25rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-primary-dark)", margin: 0 }}>
              {name || "Green Practitioner"}
            </h2>
            <span className="badge badge-wet">{userType}</span>
            <span className="badge badge-stored">{currentLevel.title}</span>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "0.35rem 0 0.5rem 0", lineHeight: 1.5 }}>
            {bio || "Committed to turning everyday waste into worth and building sustainable habits."}
          </p>
          <span style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>
            Practitioner since {formatDate(joinedDate)} • 100% Local Storage
          </span>
        </div>

        <div style={{ textAlign: "center", padding: "1rem 1.5rem", background: "#ffffff", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
          <div style={{ fontSize: "1.85rem", fontWeight: 900, color: "var(--color-primary)" }}>
            {ecoPoints}
          </div>
          <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)" }}>
            Total Eco Points
          </div>
        </div>
      </div>

      {/* User Statistics Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem"
        }}
      >
        <div className="card" style={{ padding: "1.25rem", textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-primary-dark)" }}>
            {wasteRecords.length}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Waste Items Logged</div>
        </div>

        <div className="card" style={{ padding: "1.25rem", textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-primary)" }}>
            {completedProjects.length}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>DIY Projects Crafted</div>
        </div>

        <div className="card" style={{ padding: "1.25rem", textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#f57c00" }}>
            {challenges.filter((c) => c.status === "completed").length}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Eco Challenges Won</div>
        </div>

        <div className="card" style={{ padding: "1.25rem", textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#7b1fa2" }}>
            {quizResults.length}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Quiz Attempts Completed</div>
        </div>
      </div>

      {/* Edit Profile Form */}
      <div className="card" style={{ padding: "2rem", marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: "1.5rem" }}>
          Edit Profile Information
        </h3>

        <form onSubmit={handleSaveProfile}>
          <div className="form-group">
            <label className="form-label" htmlFor="profName">
              Your Name / Nickname
            </label>
            <input
              id="profName"
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Morgan"
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="userType">
                Category / Role
              </label>
              <select
                id="userType"
                className="form-select"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="Student">Student (School / College)</option>
                <option value="Household">Household User</option>
                <option value="Environmental Enthusiast">Environmental Enthusiast</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                Select Your Avatar Emoji
              </label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {avatars.map((av) => (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setAvatar(av.id)}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "var(--radius-md)",
                      border: avatar === av.id ? "2px solid var(--color-primary)" : "1px solid var(--border-light)",
                      background: avatar === av.id ? "var(--color-primary-subtle)" : "#ffffff",
                      fontSize: "1.2rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    title={av.label}
                  >
                    {av.emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="profBio">
              Sustainability Bio / Personal Goal
            </label>
            <textarea
              id="profBio"
              rows={3}
              className="form-textarea"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us what eco habits or DIY skills you're focusing on..."
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
            <Button variant="primary" type="submit" icon={CheckCircle2}>
              Save Profile Details
            </Button>
          </div>
        </form>
      </div>

      {/* Local Storage & Reset Section */}
      <div className="card" style={{ padding: "2rem", border: "1px solid #ffcdd2", background: "#fffbfa" }}>
        <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#c62828", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <AlertTriangle size={20} /> Local Storage Privacy & Reset
        </h3>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
          Waste Out Best runs completely inside your browser using IndexedDB. No passwords or personal
          data are transmitted to any remote servers. If you wish to wipe all logged waste, quiz records,
          and favorites from this device, you can clear all data below.
        </p>

        <Button variant="danger" size="sm" icon={Trash2} onClick={() => setIsResetModalOpen(true)}>
          Clear All User Data
        </Button>
      </div>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Reset All Local Data?"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsResetModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" icon={Trash2} onClick={handleClearData}>
              Yes, Clear Everything
            </Button>
          </>
        }
      >
        <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-main)", lineHeight: 1.5 }}>
          This will wipe your waste logs, DIY favorites, completed projects, quiz history, and reset your
          eco points back to 0. Are you sure you want to proceed?
        </p>
      </Modal>

      <Toast toasts={toasts} onRemove={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
}
