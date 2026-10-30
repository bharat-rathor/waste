import React, { useState, useEffect } from "react";
import Button from "../../../shared/components/Button";
import { getTodayDateString } from "../../../utils/dateHelpers";

const categoryOptions = [
  "Wet Waste",
  "Dry Waste",
  "Recyclable Waste",
  "Hazardous Waste",
  "E-Waste"
];

const unitOptions = ["Pieces", "kg", "grams", "Liters"];

const actionOptions = [
  "Reused",
  "Recycled",
  "Disposed",
  "Stored for Later Reuse"
];

export default function WasteForm({ initialData = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    itemName: "",
    category: "Recyclable Waste",
    quantity: 1,
    unit: "Pieces",
    date: getTodayDateString(),
    action: "Reused",
    notes: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        itemName: initialData.itemName || "",
        category: initialData.category || "Recyclable Waste",
        quantity: initialData.quantity || 1,
        unit: initialData.unit || "Pieces",
        date: initialData.date || getTodayDateString(),
        action: initialData.action || "Reused",
        notes: initialData.notes || ""
      });
    }
  }, [initialData]);

  const validate = () => {
    const errs = {};
    if (!formData.itemName.trim()) {
      errs.itemName = "Item name is required.";
    }
    if (!formData.quantity || Number(formData.quantity) <= 0) {
      errs.quantity = "Quantity must be greater than 0.";
    }
    if (!formData.date) {
      errs.date = "Date is required.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...formData,
      quantity: Number(formData.quantity)
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="itemName">
          Item Name *
        </label>
        <input
          id="itemName"
          type="text"
          className="form-input"
          placeholder="e.g. Empty Plastic Bottle, Cereal Box, Vegetable Peels"
          value={formData.itemName}
          onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
        />
        {errors.itemName && <div className="form-error">{errors.itemName}</div>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="category">
            Waste Category *
          </label>
          <select
            id="category"
            className="form-select"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="action">
            Action Taken *
          </label>
          <select
            id="action"
            className="form-select"
            value={formData.action}
            onChange={(e) => setFormData({ ...formData, action: e.target.value })}
          >
            {actionOptions.map((act) => (
              <option key={act} value={act}>
                {act}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="quantity">
            Quantity *
          </label>
          <input
            id="quantity"
            type="number"
            step="any"
            min="0.1"
            className="form-input"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          />
          {errors.quantity && <div className="form-error">{errors.quantity}</div>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="unit">
            Unit of Measurement *
          </label>
          <select
            id="unit"
            className="form-select"
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
          >
            {unitOptions.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="date">
          Date *
        </label>
        <input
          id="date"
          type="date"
          className="form-input"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        {errors.date && <div className="form-error">{errors.date}</div>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="notes">
          Notes / Upcycling Details (Optional)
        </label>
        <textarea
          id="notes"
          rows={3}
          className="form-textarea"
          placeholder="e.g. Cut and reused to plant mint herbs on my window sill."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button variant="primary" type="submit">
          {initialData ? "Update Record" : "Save Record"}
        </Button>
      </div>
    </form>
  );
}
