import { openDB } from "./db.js";
import { addEcoPoints } from "./profileService.js";

const STORE_NAME = "quizResults";

export async function getAllQuizResults() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const results = request.result || [];
      results.sort((a, b) => new Date(b.date) - new Date(a.date));
      resolve(results);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function saveQuizResult({ score, totalQuestions, percentage, answers = [] }) {
  const db = await openDB();
  const record = {
    id: `quiz-${Date.now()}`,
    score,
    totalQuestions,
    percentage,
    answers,
    date: new Date().toISOString()
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.add(record);

    request.onsuccess = async () => {
      // Award eco points: 5 points per correct answer + 20 bonus points for 100%
      const earnedPoints = score * 5 + (percentage === 100 ? 20 : 0);
      if (earnedPoints > 0) {
        await addEcoPoints(earnedPoints);
      }
      resolve({ ...record, earnedPoints });
    };
    request.onerror = () => reject(request.error);
  });
}
