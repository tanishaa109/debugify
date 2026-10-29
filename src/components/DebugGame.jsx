
import { useEffect, useState } from "react";
import debugChallenges from "../data/debugChallenges";

const STORAGE_KEY = "debugify-debug-progress-v1";

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const validIds = debugChallenges.map((item) => item.id);

    if (!saved || typeof saved !== "object") {
      return { completed: [], levelIndex: 0 };
    }

    const completed = Array.isArray(saved.completed)
      ? [...new Set(saved.completed.filter((id) => validIds.includes(id)))]
      : [];

    return {
      completed,
      levelIndex:
        Number.isInteger(saved.levelIndex) &&
        saved.levelIndex >= 0 &&
        saved.levelIndex < debugChallenges.length
          ? saved.levelIndex
          : 0,
    };
  } catch {
    return { completed: [], levelIndex: 0 };
  }
}

function DebugGame() {
  const [initialProgress] = useState(loadProgress);

  const [levelIndex, setLevelIndex] = useState(
    initialProgress.levelIndex
  );
  const [completed, setCompleted] = useState(
    initialProgress.completed
  );
  const [code, setCode] = useState(
    debugChallenges[initialProgress.levelIndex].starterCode
  );
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [result, setResult] = useState(null);

  const challenge = debugChallenges[levelIndex];

  const totalXP = debugChallenges.reduce(
    (total, item) =>
      total + (completed.includes(item.id) ? item.xp : 0),
    0
  );

  function isUnlocked(index, completedIds = completed) {
    if (index === 0) return true;

    return debugChallenges
      .slice(0, index)
      .every((item) => completedIds.includes(item.id));
  }

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ completed, levelIndex })
      );
    } catch {
      // The game can still work if browser storage is unavailable.
    }
  }, [completed, levelIndex]);

  function changeLevel(index) {
    if (
      index < 0 ||
      index >= debugChallenges.length ||
      !isUnlocked(index)
    ) {
      return;
    }

    setLevelIndex(index);
    setCode(debugChallenges[index].starterCode);
    setShowHint(false);
    setShowSolution(false);
    setResult(null);
  }

  function checkCode() {
    if (challenge.checkPattern.test(code)) {
      const alreadyCompleted = completed.includes(challenge.id);

      if (!alreadyCompleted) {
        setCompleted((previous) => [...previous, challenge.id]);
      }

      setResult({
        success: true,
        message: alreadyCompleted
          ? "Mission already completed! Your XP is safe."
          : `Mission completed! You earned ${challenge.xp} XP.`,
      });
    } else {
      setResult({
        success: false,
        message: "Not quite! Check your code and try again.",
      });
    }
  }

  function resetCode() {
    setCode(challenge.starterCode);
    setShowHint(false);
    setShowSolution(false);
    setResult(null);
  }

  function resetProgress() {
    const confirmed = window.confirm(
      "Reset all completed missions and XP? This cannot be undone."
    );

    if (!confirmed) return;

    setCompleted([]);
    setLevelIndex(0);
    setCode(debugChallenges[0].starterCode);
    setShowHint(false);
    setShowSolution(false);
    setResult(null);
  }

  const nextIndex = levelIndex + 1;
  const hasNextMission = nextIndex < debugChallenges.length;
  const nextUnlocked = hasNextMission && isUnlocked(nextIndex);

  return (
    <div className="debug-game">
      <div className="level-selector">
        <div className="level-selector-heading">
          <div>
            <p className="eyebrow">TRAINING SIMULATION</p>
            <h2>Debug the Mess</h2>
          </div>

          <div className="xp-display">
            <span>YOUR XP</span>
            <strong>{totalXP} XP</strong>
          </div>
        </div>

        <div className="level-selector-buttons">
          {debugChallenges.map((item, index) => {
            const unlocked = isUnlocked(index);
            const isComplete = completed.includes(item.id);

            return (
              <button
                key={item.id}
                type="button"
                disabled={!unlocked}
                title={
                  unlocked
                    ? item.title
                    : "Complete the previous mission to unlock this one."
                }
                className={`level-button ${
                  levelIndex === index ? "active" : ""
                } ${isComplete ? "completed" : ""} ${
                  !unlocked ? "locked" : ""
                }`}
                onClick={() => changeLevel(index)}
              >
                <span className="level-number">
                  {!unlocked
                    ? "🔒"
                    : isComplete
                    ? "✓"
                    : `0${index + 1}`}
                </span>
                <span>{item.title}</span>
                <small>
                  {!unlocked ? "Locked" : item.difficulty}
                </small>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mission-card">
        <div className="mission-header">
          <div>
            <p className="eyebrow">CURRENT MISSION</p>
            <h2>{challenge.title}</h2>
          </div>
          <span className="difficulty-badge">
            {challenge.difficulty}
          </span>
        </div>

        <p className="mission-description">{challenge.description}</p>

        <div className="mission-meta">
          <span>Language: {challenge.language}</span>
          <span>Reward: {challenge.xp} XP</span>
          <span>
            Status:{" "}
            {completed.includes(challenge.id)
              ? "Completed"
              : "In progress"}
          </span>
        </div>

        <label className="code-label" htmlFor="debug-code">
          YOUR CODE
        </label>

        <textarea
          id="debug-code"
          className="code-editor"
          value={code}
          onChange={(event) => {
            setCode(event.target.value);
            setResult(null);
          }}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
        />

        <div className="mission-actions">
          <button type="button" onClick={checkCode}>
            Check Solution
          </button>

          <button
            type="button"
            onClick={() => setShowHint((previous) => !previous)}
          >
            {showHint ? "Hide Hint" : "Get Hint"}
          </button>

          <button type="button" onClick={resetCode}>
            Reset Code
          </button>

          <button
            type="button"
            onClick={() => setShowSolution((previous) => !previous)}
          >
            {showSolution ? "Hide Solution" : "Show Solution"}
          </button>
        </div>

        {showHint && (
          <div className="hint-panel">
            <strong>Hint</strong>
            <p>{challenge.hint}</p>
          </div>
        )}

        {showSolution && (
          <div className="solution-panel">
            <strong>Solution</strong>
            <pre>{challenge.solution}</pre>
          </div>
        )}

        {result && (
          <div
            className={`result-panel ${
              result.success ? "success" : "error"
            }`}
            role="status"
          >
            {result.message}
          </div>
        )}

        {completed.length === debugChallenges.length && (
          <div className="result-panel success">
            All missions completed! You are a Debugify champion!
          </div>
        )}

        <div className="next-mission-row">
          <button
            type="button"
            disabled={levelIndex === 0}
            onClick={() => changeLevel(levelIndex - 1)}
          >
            Previous Mission
          </button>

          <button
            type="button"
            disabled={!nextUnlocked}
            onClick={() => changeLevel(nextIndex)}
          >
            {hasNextMission
              ? nextUnlocked
                ? "Next Mission →"
                : "Complete Mission to Unlock"
              : "All Missions Complete!"}
          </button>
        </div>

        <button
          type="button"
          className="reset-progress-button"
          onClick={resetProgress}
        >
          Reset All Progress
        </button>
      </div>
    </div>
  );
}

export default DebugGame;
