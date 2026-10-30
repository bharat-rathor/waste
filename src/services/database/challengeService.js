import { openDB } from "./db.js";
import { addEcoPoints } from "./profileService.js";

const STORE_NAME = "challengeProgress";

export async function getAllChallengeProgress() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

export async function startChallenge(challengeId, challengeTitle) {
  const db = await openDB();
  const record = {
    id: challengeId,
    challengeId,
    title: challengeTitle,
    status: "in-progress", // in-progress, completed
    startedAt: new Date().toISOString()
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(record);
    request.onsuccess = () => resolve(record);
    request.onerror = () => reject(request.error);
  });
}

export async function completeChallenge(challengeId, challengeTitle, points = 50) {
  const db = await openDB();
  const record = {
    id: challengeId,
    challengeId,
    title: challengeTitle,
    status: "completed",
    completedAt: new Date().toISOString(),
    pointsAwarded: points
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(record);
    request.onsuccess = async () => {
      await addEcoPoints(points);
      resolve(record);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function resetChallenge(challengeId) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(challengeId);
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
}
