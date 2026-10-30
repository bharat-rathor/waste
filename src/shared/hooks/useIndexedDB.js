import { useState, useEffect, useCallback } from "react";
import { getAllWasteRecords } from "../../services/database/wasteService";
import { getUserProfile } from "../../services/database/profileService";
import { getFavorites, getCompletedProjects } from "../../services/database/projectService";
import { getAllChallengeProgress } from "../../services/database/challengeService";
import { getAllQuizResults } from "../../services/database/quizService";

export function useIndexedDB() {
  const [wasteRecords, setWasteRecords] = useState([]);
  const [profile, setProfile] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshAll = useCallback(async () => {
    try {
      const [wRecords, uProfile, favs, comps, chals, quizzes] = await Promise.all([
        getAllWasteRecords(),
        getUserProfile(),
        getFavorites(),
        getCompletedProjects(),
        getAllChallengeProgress(),
        getAllQuizResults()
      ]);

      setWasteRecords(wRecords);
      setProfile(uProfile);
      setFavorites(favs);
      setCompletedProjects(comps);
      setChallenges(chals);
      setQuizResults(quizzes);
    } catch (err) {
      console.error("Failed to load IndexedDB data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  return {
    wasteRecords,
    profile,
    favorites,
    completedProjects,
    challenges,
    quizResults,
    loading,
    refreshAll
  };
}
