import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Filter,
  Download,
  Upload,
  AlertTriangle,
  Sparkles,
  Info
} from "lucide-react";
import WasteTable from "../components/WasteTable";
import WasteForm from "../components/WasteForm";
import SearchBar from "../../../shared/components/SearchBar";
import Button from "../../../shared/components/Button";
import Modal from "../../../shared/components/Modal";
import EmptyState from "../../../shared/components/EmptyState";
import Toast from "../../../shared/components/Toast";
import {
  getAllWasteRecords,
  addWasteRecord,
  updateWasteRecord,
  deleteWasteRecord,
  searchWasteRecords
} from "../../../services/database/wasteService";
import { addEcoPoints } from "../../../services/database/profileService";

const categories = [
  "All",
  "Wet Waste",
  "Dry Waste",
  "Recyclable Waste",
  "Hazardous Waste",
  "E-Waste"
];

const actions = [
  "All",
  "Reused",
  "Recycled",
  "Disposed",
  "Stored for Later Reuse"
];

export default function WasteTracker() {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [actionFilter, setActionFilter] = useState("All");

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [deletingRecord, setDeletingRecord] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const loadRecords = async () => {
    try {
      const data = await searchWasteRecords({
        searchTerm,
        category: categoryFilter,
        action: actionFilter
      });
      setRecords(data);
    } catch (err) {
      console.error(err);
      showToast("Failed to fetch waste records", "error");
    }
  };

  useEffect(() => {
    loadRecords();
  }, [searchTerm, categoryFilter, actionFilter]);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleOpenAddModal = () => {
    setEditingRecord(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (record) => {
    setEditingRecord(record);
    setIsFormModalOpen(true);
  };

  const handleOpenDeleteModal = (record) => {
    setDeletingRecord(record);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingRecord) {
        await updateWasteRecord({ ...editingRecord, ...formData });
        showToast("Waste record updated successfully.");
      } else {
        await addWasteRecord(formData);
        // Award eco points for logging waste!
        if (formData.action === "Reused") {
          await addEcoPoints(15);
        } else if (formData.action === "Recycled") {
          await addEcoPoints(10);
        } else {
          await addEcoPoints(5);
        }
        showToast("New waste record added! Points awarded 🌟");
      }
      setIsFormModalOpen(false);
      setEditingRecord(null);
      loadRecords();
    } catch (err) {
      console.error(err);
      showToast("Error saving waste record.", "error");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingRecord) return;
    try {
      await deleteWasteRecord(deletingRecord.id);
      showToast("Record deleted successfully.", "info");
      setIsDeleteModalOpen(false);
      setDeletingRecord(null);
      loadRecords();
    } catch (err) {
      console.error(err);
      showToast("Failed to delete record.", "error");
    }
  };

  // Optional demonstration record importer
  const handleImportSampleRecord = async () => {
    try {
      const sample = {
        itemName: "Plastic Bottle",
        category: "Recyclable Waste",
        quantity: 5,
        unit: "Pieces",
        date: "2026-10-30",
        action: "Reused",
        notes: "Used to create a flower pot and bird feeder."
      };
      await addWasteRecord(sample);
      await addEcoPoints(15);
      showToast("Demonstration sample record imported! (+15 pts)");
      loadRecords();
    } catch (err) {
      console.error(err);
      showToast("Failed to import sample record", "error");
    }
  };

  return (
    <div className="waste-tracker-page">
      {/* Header Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "1.75rem"
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-primary-dark)", margin: 0 }}>
            Waste Tracker
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "0.25rem 0 0 0" }}>
            Log, categorize, and track household & student discards directly into your browser's IndexedDB.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Button
            variant="outline"
            size="sm"
            icon={Sparkles}
            onClick={handleImportSampleRecord}
            title="Import an example record to test calculations"
          >
            Import Sample Record
          </Button>
          <Button variant="primary" size="md" icon={Plus} onClick={handleOpenAddModal}>
            Log Waste Item
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="card"
        style={{
          padding: "1.25rem",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap"
        }}
      >
        <div style={{ flex: "1 1 240px" }}>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onClear={() => setSearchTerm("")}
            placeholder="Search items or notes..."
          />
        </div>

        {/* Category filter */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)" }}>
            Category:
          </span>
          <select
            className="form-select"
            style={{ width: "auto", minWidth: "140px", padding: "0.45rem 0.75rem" }}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Action filter */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)" }}>
            Action:
          </span>
          <select
            className="form-select"
            style={{ width: "auto", minWidth: "130px", padding: "0.45rem 0.75rem" }}
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
          >
            {actions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Records Table or Empty State */}
      <div className="waste-table-wrapper">
        <WasteTable
          records={records}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
        />
      </div>

      {/* Add / Edit Waste Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingRecord ? "Edit Waste Item" : "Log New Waste Item"}
      >
        <WasteForm
          initialData={editingRecord}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormModalOpen(false)}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" icon={Trash2} onClick={handleDeleteConfirm}>
              Delete Record
            </Button>
          </>
        }
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "#ffebee",
              color: "#d32f2f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            <AlertTriangle size={24} />
          </div>
          <div>
            <h4 style={{ margin: "0 0 0.25rem 0", color: "var(--color-primary-dark)" }}>
              Delete "{deletingRecord?.itemName}"?
            </h4>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)" }}>
              Are you sure you want to permanently delete this waste record from IndexedDB? This action
              cannot be undone.
            </p>
          </div>
        </div>
      </Modal>

      <Toast toasts={toasts} onRemove={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
}
