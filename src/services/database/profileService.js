import { openDB } from "./db.js";

const STORE_NAME = "profiles";
const DEFAULT_PROFILE_ID = "current_user";

const INITIAL_PROFILE = {
  id: DEFAULT_PROFILE_ID,
  name: "Green Practitioner",
  userType: "Student", // Student, Household, Other
  avatar: "avatar-1",
  ecoPoints: 0,
  joinedDate: new Date().toISOString(),
  bio: "Committed to turning everyday waste into worth and building sustainable habits."
};

export async function getUserProfile() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(DEFAULT_PROFILE_ID);

    request.onsuccess = async () => {
      if (request.result) {
        resolve(request.result);
      } else {
        // Initialize default profile
        const newProfile = await saveUserProfile(INITIAL_PROFILE);
        resolve(newProfile);
      }
    };
    request.onerror = () => reject(request.error);
  });
}

export async function saveUserProfile(profileData) {
  const db = await openDB();
  const data = {
    ...INITIAL_PROFILE,
    ...profileData,
    id: DEFAULT_PROFILE_ID,
    updatedAt: new Date().toISOString()
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(data);

    request.onsuccess = () => resolve(data);
    request.onerror = () => reject(request.error);
  });
}

export async function addEcoPoints(points) {
  const current = await getUserProfile();
  const updatedPoints = Math.max(0, (current.ecoPoints || 0) + points);
  return saveUserProfile({ ...current, ecoPoints: updatedPoints });
}
