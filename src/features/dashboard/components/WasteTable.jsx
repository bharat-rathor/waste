import React from "react";
import { Edit2, Trash2, Calendar, Tag } from "lucide-react";
import { formatDate } from "../../../utils/dateHelpers";
import { getActionBadgeClass, getCategoryBadgeClass } from "../../../utils/formatters";

export default function WasteTable({ records = [], onEdit, onDelete }) {
  if (records.length === 0) {
    return (
      <div style={{ padding: "3rem 1.5rem", textAlign: "center", color: "var(--text-muted)" }}>
        No waste records found matching the current search/filter.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="waste-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Action Taken</th>
            <th>Notes</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>
                <strong style={{ color: "var(--color-primary-dark)" }}>{record.itemName}</strong>
              </td>
              <td>
                <span className={`badge ${getCategoryBadgeClass(record.category)}`}>
                  {record.category}
                </span>
              </td>
              <td>
                <span style={{ fontWeight: 600 }}>
                  {record.quantity} {record.unit}
                </span>
              </td>
              <td style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                {formatDate(record.date)}
              </td>
              <td>
                <span className={`badge ${getActionBadgeClass(record.action)}`}>
                  {record.action}
                </span>
              </td>
              <td style={{ maxWidth: "220px", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                {record.notes || "—"}
              </td>
              <td>
                <div className="action-buttons" style={{ justifyContent: "flex-end" }}>
                  <button
                    className="btn-icon"
                    onClick={() => onEdit(record)}
                    title="Edit Record"
                    aria-label="Edit Record"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="btn-icon delete"
                    onClick={() => onDelete(record)}
                    title="Delete Record"
                    aria-label="Delete Record"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
