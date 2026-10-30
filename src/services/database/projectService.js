import { openDB } from "./db.js";
import { addEcoPoints } from "./profileService.js";

const FAV_STORE = "favorites";
const COMP_STORE = "diyCompletions";

// Favorites Methods
export async function getFavorites() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(FAV_STORE, "readonly");
    const store = tx.objectStore(FAV_STORE);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

export async function isFavorite(projectId) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(FAV_STORE, "readonly");
    const store = tx.objectStore(FAV_STORE);
    const request = store.get(projectId);
    request.onsuccess = () => resolve(!!request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function toggleFavorite(projectId, projectTitle) {
  const currentlyFav = await isFavorite(projectId);
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(FAV_STORE, "readwrite");
    const store = tx.objectStore(FAV_STORE);

    if (currentlyFav) {
      const request = store.delete(projectId);
      request.onsuccess = () => resolve({ isFav: false });
      request.onerror = () => reject(request.error);
    } else {
      const record = {
        id: projectId,
        projectId,
        title: projectTitle,
        savedAt: new Date().toISOString()
      };
      const request = store.put(record);
      request.onsuccess = () => resolve({ isFav: true, record });
      request.onerror = () => reject(request.error);
    }
  });
}

// Completions Methods
export async function getCompletedProjects() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(COMP_STORE, "readonly");
    const store = tx.objectStore(COMP_STORE);
    const request = store.getAll();
    request.onsuccess = () => {
      const items = request.result || [];
      items.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
      resolve(items);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function isProjectCompleted(projectId) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(COMP_STORE, "readonly");
    const store = tx.objectStore(COMP_STORE);
    const request = store.get(projectId);
    request.onsuccess = () => resolve(!!request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function markProjectCompleted(projectId, projectTitle, notes = "") {
  const db = await openDB();
  const completionRecord = {
    id: projectId,
    projectId,
    title: projectTitle,
    notes,
    completedAt: new Date().toISOString()
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(COMP_STORE, "readwrite");
    const store = tx.objectStore(COMP_STORE);
    const request = store.put(completionRecord);

    request.onsuccess = async () => {
      // Award 25 eco points for completing a DIY project
      await addEcoPoints(25);
      resolve(completionRecord);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function unmarkProjectCompleted(projectId) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(COMP_STORE, "readwrite");
    const store = tx.objectStore(COMP_STORE);
    const request = store.delete(projectId);
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
}
