import { openDB } from "./db.js";

const STORE_NAME = "wasteRecords";

export async function getAllWasteRecords() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      // Sort newest to oldest
      const records = request.result || [];
      records.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
      resolve(records);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function getWasteRecordById(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function addWasteRecord(record) {
  const db = await openDB();
  const newRecord = {
    ...record,
    id: record.id || `waste-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    quantity: Number(record.quantity) || 0
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.add(newRecord);

    request.onsuccess = () => resolve(newRecord);
    request.onerror = () => reject(request.error);
  });
}

export async function updateWasteRecord(record) {
  const db = await openDB();
  const updatedRecord = {
    ...record,
    updatedAt: new Date().toISOString(),
    quantity: Number(record.quantity) || 0
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(updatedRecord);

    request.onsuccess = () => resolve(updatedRecord);
    request.onerror = () => reject(request.error);
  });
}

export async function deleteWasteRecord(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Filter and search waste records locally
 */
export async function searchWasteRecords({ searchTerm = "", category = "", action = "" }) {
  const all = await getAllWasteRecords();
  return all.filter((rec) => {
    const matchesSearch =
      !searchTerm ||
      rec.itemName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.notes?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat = !category || category === "All" || rec.category === category;
    const matchesAction = !action || action === "All" || rec.action === action;

    return matchesSearch && matchesCat && matchesAction;
  });
}
