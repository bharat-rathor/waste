const DB_NAME = "WasteOutBestDB";
const DB_VERSION = 1;

let dbInstance = null;

export function openDB() {
  if (dbInstance) {
    return Promise.resolve(dbInstance);
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // 1. profiles store
      if (!db.objectStoreNames.contains("profiles")) {
        db.createObjectStore("profiles", { keyPath: "id" });
      }

      // 2. wasteRecords store
      if (!db.objectStoreNames.contains("wasteRecords")) {
        const wasteStore = db.createObjectStore("wasteRecords", { keyPath: "id" });
        wasteStore.createIndex("date", "date", { unique: false });
        wasteStore.createIndex("category", "category", { unique: false });
        wasteStore.createIndex("action", "action", { unique: false });
        wasteStore.createIndex("createdAt", "createdAt", { unique: false });
      }

      // 3. diyCompletions store
      if (!db.objectStoreNames.contains("diyCompletions")) {
        const diyStore = db.createObjectStore("diyCompletions", { keyPath: "id" });
        diyStore.createIndex("projectId", "projectId", { unique: false });
        diyStore.createIndex("completedAt", "completedAt", { unique: false });
      }

      // 4. favorites store
      if (!db.objectStoreNames.contains("favorites")) {
        const favStore = db.createObjectStore("favorites", { keyPath: "id" });
        favStore.createIndex("projectId", "projectId", { unique: true });
        favStore.createIndex("savedAt", "savedAt", { unique: false });
      }

      // 5. challengeProgress store
      if (!db.objectStoreNames.contains("challengeProgress")) {
        const chalStore = db.createObjectStore("challengeProgress", { keyPath: "id" });
        chalStore.createIndex("challengeId", "challengeId", { unique: true });
        chalStore.createIndex("status", "status", { unique: false });
      }

      // 6. quizResults store
      if (!db.objectStoreNames.contains("quizResults")) {
        const quizStore = db.createObjectStore("quizResults", { keyPath: "id" });
        quizStore.createIndex("date", "date", { unique: false });
        quizStore.createIndex("score", "score", { unique: false });
      }

      // 7. appSettings store
      if (!db.objectStoreNames.contains("appSettings")) {
        db.createObjectStore("appSettings", { keyPath: "key" });
      }
    };

    request.onsuccess = (event) => {
      dbInstance = event.target.result;
      resolve(dbInstance);
    };

    request.onerror = (event) => {
      console.error("IndexedDB open error:", event.target.error);
      reject(event.target.error);
    };
  });
}

/**
 * Generic helper to execute a transaction
 */
export async function performTransaction(storeName, mode, callback) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, mode);
    const store = tx.objectStore(storeName);

    let result;
    try {
      result = callback(store);
    } catch (err) {
      reject(err);
      return;
    }

    tx.oncomplete = () => resolve(result);
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(new Error("Transaction was aborted"));
  });
}

/**
 * Reset all user data in the database
 */
export async function clearAllUserData() {
  const db = await openDB();
  const storeNames = [
    "profiles",
    "wasteRecords",
    "diyCompletions",
    "favorites",
    "challengeProgress",
    "quizResults"
  ];

  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeNames, "readwrite");
    storeNames.forEach((name) => {
      tx.objectStore(name).clear();
    });

    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}
