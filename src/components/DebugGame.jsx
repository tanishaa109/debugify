
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bug,
  Zap,
  Lightbulb,
  RotateCcw,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Terminal,
  Trophy,
} from "lucide-react";

import debugChallenges from "../data/debugChallenges";

export default function DebugGame({ onBack }) {
  const [levelIndex, setLevelIndex] = useState(0);
  const [code, setCode] = useState(debugChallenges[0].starterCode);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [result, setResult] = useState(null);
  const [completed, setCompleted] = useState([]);

  const challenge = debugChallenges[levelIndex];
  const isCompleted = completed.includes(challenge.id);
  const totalXP = completed.reduce((total, id) => {
    const item = debugChallenges.find((item) => item.id === id);
    return total + (item?.xp ?? 0);
  }, 0);

  function selectLevel(index) {
    setLevelIndex(index);
    setCode(debugChallenges[index].starterCode);
    setShowHint(false);
    setShowSolution(false);
    setResult(null);
  }

  function resetCode() {
    setCode(challenge.starterCode);
    setShowHint(false);
    setShowSolution(false);
    setResult(null);
  }

  function checkCode() {
    if (challenge.checkPattern.test(code)) {
      setResult("success");

      setCompleted((previous) =>
        previous.includes(challenge.id)
          ? previous
          : [...previous, challenge.id]
      );
    } else {
      setResult("error");
    }
  }

  return (
    <motion.div
      className="debug-game"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button className="game-back" onClick={onBack}>
        <ArrowLeft size={17} />
        Back to Dashboard
      </button>

      <div className="game-heading">
        <div className="game-heading-icon">
          <Bug size={28} />
        </div>

        <div>
          <p className="eyebrow">DEBUGGING PROTOCOL / MISSION {String(challenge.id).padStart(3, "0")}</p>
          <h1>{challenge.title}</h1>
          <p className="game-subtitle">
            Find the bug. Fix the code. Earn XP.
          </p>
        </div>
      </div>

      <div className="game-meta">
        <span><Zap size={15} /> {challenge.difficulty.toUpperCase()}</span>
        <span><Terminal size={15} /> {challenge.language}</span>
        <span><Trophy size={15} /> {totalXP} XP EARNED</span>
      </div>

      <div className="level-selector">
        <div className="level-selector-heading">
          <span>SELECT MISSION</span>
          <span>{completed.length}/{debugChallenges.length} COMPLETE</span>
        </div>

        <div className="level-selector-buttons">
          {debugChallenges.map((item, index) => (
            <button
              key={item.id}
              className={`level-button ${
                index === levelIndex ? "active" : ""
              } ${completed.includes(item.id) ? "completed" : ""}`}
              onClick={() => selectLevel(index)}
              aria-pressed={index === levelIndex}
            >
              {completed.includes(item.id) ? (
                <CheckCircle2 size={15} />
              ) : (
                <span className="level-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
              <span>{item.difficulty}</span>
            </button>
          ))}
        </div>
      </div>

      <section className="mission-card">
        <div className="mission-card-top">
          <span className="eyebrow">MISSION BRIEFING</span>
          <span className="difficulty-label">
            {isCompleted ? "COMPLETED" : "ACTIVE MISSION"}
          </span>
        </div>

        <h2>{challenge.title}</h2>
        <p>{challenge.description}</p>

        <div className="expected-output">
          <span>EXPECTED OUTPUT</span>
          <code>{challenge.expectedOutput}</code>
        </div>
      </section>

      <section className="editor-panel">
        <div className="editor-header">
          <div>
            <Terminal size={17} />
            <span>main.cpp</span>
          </div>
          <span className="language-tag">{challenge.language}</span>
        </div>

        <textarea
          className="code-editor"
          value={code}
          onChange={(event) => {
            setCode(event.target.value);
            setResult(null);
          }}
          spellCheck={false}
          autoComplete="off"
          aria-label="C++ code editor"
        />

        <div className="game-actions">
          <button className="reset-button" onClick={resetCode}>
            <RotateCcw size={16} /> Reset
          </button>

          <button
            className="hint-button"
            onClick={() => setShowHint((value) => !value)}
          >
            <Lightbulb size={16} />
            {showHint ? "Hide Hint" : "Get Hint"}
          </button>

          <button className="check-button" onClick={checkCode}>
            <Zap size={16} /> Check Code
          </button>
        </div>
      </section>

      {showHint && (
        <motion.div
          className="hint-card"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Lightbulb size={19} />
          <div>
            <strong>HINT UNLOCKED</strong>
            <p>{challenge.hint}</p>
          </div>
        </motion.div>
      )}

      {result && (
        <motion.div
          className={`game-result ${result}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {result === "success" ? (
            <CheckCircle2 size={22} />
          ) : (
            <XCircle size={22} />
          )}

          <div>
            <strong>
              {result === "success" ? "BUG ELIMINATED!" : "BUG STILL ACTIVE"}
            </strong>
            <p>
              {result === "success"
                ? isCompleted
                  ? "Mission complete! Your XP has already been counted."
                  : `Correct fix detected! You earned ${challenge.xp} XP.`
                : "The bug is still there. Review the hint and try again."}
            </p>
          </div>
        </motion.div>
      )}

      <div className="solution-section">
        <button
          className="solution-toggle"
          onClick={() => setShowSolution((value) => !value)}
        >
          {showSolution ? "Hide Solution" : "View Solution"}
        </button>

        {showSolution && (
          <pre className="solution-code">
            <code>{challenge.solution}</code>
          </pre>
        )}
      </div>

      {result === "success" && levelIndex < debugChallenges.length - 1 && (
        <div className="next-mission-row">
          <button
            className="check-button"
            onClick={() => selectLevel(levelIndex + 1)}
          >
            Next Mission →
          </button>
        </div>
      )}

      {completed.length === debugChallenges.length && (
        <div className="game-result success">
          <Trophy size={22} />
          <div>
            <strong>ALL MISSIONS COMPLETE!</strong>
            <p>You completed every debugging challenge. Total: {totalXP} XP.</p>
          </div>
        </div>
      )}

      <p className="game-disclaimer">
        Prototype mode: solutions are checked using code patterns. The app
        does not compile or execute C++.
      </p>
    </motion.div>
  );
}
