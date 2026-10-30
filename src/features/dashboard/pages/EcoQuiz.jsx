import React, { useState, useEffect } from "react";
import {
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  History
} from "lucide-react";
import Button from "../../../shared/components/Button";
import Toast from "../../../shared/components/Toast";
import { quizQuestions } from "../../../data/quizQuestions";
import {
  getAllQuizResults,
  saveQuizResult
} from "../../../services/database/quizService";
import { formatDate } from "../../../utils/dateHelpers";

export default function EcoQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizHistory, setQuizHistory] = useState([]);
  const [toasts, setToasts] = useState([]);

  const loadHistory = async () => {
    try {
      const records = await getAllQuizResults();
      setQuizHistory(records);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const currentQ = quizQuestions[currentIndex];
  const totalQuestions = quizQuestions.length;

  const handleSelectOption = (optionIndex) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    quizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });
    return correctCount;
  };

  const handleSubmit = async () => {
    const score = calculateScore();
    const percentage = Math.round((score / totalQuestions) * 100);

    const answersDetail = quizQuestions.map((q) => ({
      questionId: q.id,
      selected: selectedAnswers[q.id] !== undefined ? selectedAnswers[q.id] : null,
      correct: q.correctAnswer,
      isCorrect: selectedAnswers[q.id] === q.correctAnswer
    }));

    try {
      const saved = await saveQuizResult({
        score,
        totalQuestions,
        percentage,
        answers: answersDetail
      });

      setIsSubmitted(true);
      showToast(`Quiz completed! You scored ${score}/${totalQuestions} (+${saved.earnedPoints} pts)`, "success");
      loadHistory();
    } catch (err) {
      console.error(err);
      showToast("Error saving quiz score", "error");
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const score = calculateScore();
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="eco-quiz-page">
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-primary-dark)", margin: 0 }}>
          Environmental Knowledge Quiz
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "0.25rem 0 0 0" }}>
          Test your understanding of waste segregation, recycling streams, composting, and upcycling.
        </p>
      </div>

      {!isSubmitted ? (
        /* Quiz Active Mode */
        <div className="quiz-card">
          {/* Progress Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-primary)" }}>
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                background: "var(--color-primary-subtle)",
                color: "var(--color-primary)",
                padding: "0.25rem 0.65rem",
                borderRadius: "var(--radius-full)"
              }}
            >
              {currentQ.category}
            </span>
          </div>

          {/* Progress Bar */}
          <div
            style={{
              height: "6px",
              background: "var(--bg-subtle)",
              borderRadius: "var(--radius-full)",
              overflow: "hidden",
              marginBottom: "2rem"
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
                background: "var(--color-primary)",
                transition: "width 0.3s ease"
              }}
            />
          </div>

          {/* Question Text */}
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: "1.75rem", lineHeight: 1.4 }}>
            {currentQ.question}
          </h2>

          {/* Options */}
          <div style={{ marginBottom: "2rem" }}>
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedAnswers[currentQ.id] === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  className={`quiz-option-btn ${isSelected ? "selected" : ""}`}
                  onClick={() => handleSelectOption(idx)}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      border: "1.5px solid var(--border-medium)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      background: isSelected ? "var(--color-primary)" : "#ffffff",
                      color: isSelected ? "#ffffff" : "var(--text-main)",
                      flexShrink: 0
                    }}
                  >
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "1.5rem", borderTop: "1px solid var(--border-light)" }}>
            <Button
              variant="outline"
              icon={ArrowLeft}
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              Previous
            </Button>

            {currentIndex < totalQuestions - 1 ? (
              <Button variant="primary" icon={ArrowRight} onClick={handleNext}>
                Next Question
              </Button>
            ) : (
              <Button
                variant="primary"
                icon={CheckCircle2}
                onClick={handleSubmit}
                style={{ background: "#2e7d32" }}
              >
                Submit Answers
              </Button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Results Mode */
        <div className="quiz-card">
          <div style={{ textAlign: "center", paddingBottom: "2rem", borderBottom: "1px solid var(--border-light)", marginBottom: "2rem" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: percentage >= 70 ? "#e8f5e9" : "#fff3e0",
                color: percentage >= 70 ? "#2e7d32" : "#f57c00",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem auto"
              }}
            >
              <Trophy size={32} />
            </div>

            <h2 style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--color-primary-dark)", margin: "0 0 0.5rem 0" }}>
              Quiz Completed!
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>
              You answered <strong>{score}</strong> out of <strong>{totalQuestions}</strong> questions correctly ({percentage}%).
            </p>

            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem", background: "var(--color-primary-subtle)", padding: "0.5rem 1.25rem", borderRadius: "var(--radius-full)", color: "var(--color-primary)", fontWeight: 700 }}>
              <Sparkles size={18} />
              <span>+{score * 5 + (percentage === 100 ? 20 : 0)} Eco Points Earned!</span>
            </div>
          </div>

          {/* Answer Key Review */}
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: "1.25rem" }}>
            Question Review & Educational Explanations
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
            {quizQuestions.map((q, qIndex) => {
              const userSelection = selectedAnswers[q.id];
              const isCorrect = userSelection === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  style={{
                    padding: "1.25rem",
                    borderRadius: "var(--radius-md)",
                    border: `1px solid ${isCorrect ? "#c8e6c9" : "#ffcdd2"}`,
                    background: isCorrect ? "#fafdfa" : "#fffbfa"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    {isCorrect ? (
                      <CheckCircle2 size={18} color="#2e7d32" style={{ flexShrink: 0, marginTop: "2px" }} />
                    ) : (
                      <XCircle size={18} color="#d32f2f" style={{ flexShrink: 0, marginTop: "2px" }} />
                    )}
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-primary-dark)", margin: 0 }}>
                      {qIndex + 1}. {q.question}
                    </h4>
                  </div>

                  <div style={{ fontSize: "0.85rem", margin: "0.5rem 0", color: "var(--text-main)" }}>
                    <div>
                      <strong>Your Answer:</strong>{" "}
                      <span style={{ color: isCorrect ? "#2e7d32" : "#d32f2f" }}>
                        {userSelection !== undefined ? q.options[userSelection] : "Not Answered"}
                      </span>
                    </div>
                    {!isCorrect && (
                      <div style={{ color: "#2e7d32", marginTop: "0.2rem" }}>
                        <strong>Correct Answer:</strong> {q.options[q.correctAnswer]}
                      </div>
                    )}
                  </div>

                  <p style={{ fontSize: "0.825rem", color: "var(--text-muted)", background: "rgba(0,0,0,0.02)", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-sm)", margin: 0 }}>
                    💡 <em>Explanation:</em> {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: "center" }}>
            <Button variant="primary" size="lg" icon={RotateCcw} onClick={handleRestart}>
              Retake Quiz
            </Button>
          </div>
        </div>
      )}

      {/* Past Quiz Attempts History */}
      {quizHistory.length > 0 && (
        <div className="card" style={{ maxWidth: "780px", margin: "2.5rem auto 0 auto", padding: "1.75rem" }}>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--color-primary-dark)", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <History size={18} /> Past Quiz Attempts
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {quizHistory.slice(0, 5).map((attempt) => (
              <div
                key={attempt.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem 1rem",
                  background: "var(--bg-subtle)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.9rem"
                }}
              >
                <div>
                  <strong style={{ color: "var(--color-primary-dark)" }}>
                    Score: {attempt.score} / {attempt.totalQuestions} ({attempt.percentage}%)
                  </strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>
                    {formatDate(attempt.date)}
                  </div>
                </div>
                <span className="badge badge-wet">+{attempt.earnedPoints || attempt.score * 5} Pts</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Toast toasts={toasts} onRemove={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
}
