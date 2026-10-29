
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

export default function DebugGame({ onBack }) {
  const [code, setCode] = useState(`#include <iostream>
using namespace std;

int main() {
    int sum = 0;

    for (int i = 1; i < 5; i++) {
        sum += i;
    }

    cout << "Sum: " << sum;
    return 0;
}`);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [result, setResult] = useState(null);

  const solution = `#include <iostream>
using namespace std;

int main() {
    int sum = 0;

    for (int i = 1; i <= 5; i++) {
        sum += i;
    }

    cout << "Sum: " << sum;
    return 0;
}`;

  function checkCode() {
    const fixed = /for\s*\(\s*int\s+i\s*=\s*1\s*;\s*i\s*<=\s*5\s*;\s*i\+\+\s*\)/.test(code);

    setResult(fixed ? "success" : "error");
  }

  function resetCode() {
    setCode(`#include <iostream>
using namespace std;

int main() {
    int sum = 0;

    for (int i = 1; i < 5; i++) {
        sum += i;
    }

    cout << "Sum: " << sum;
    return 0;
}`);
    setResult(null);
    setShowHint(false);
    setShowSolution(false);
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
          <p className="eyebrow">MISSION 001 / DEBUGGING PROTOCOL</p>
          <h1>The Missing Number</h1>
          <p className="game-subtitle">
            Find the bug. Fix the code. Earn your XP.
          </p>
        </div>
      </div>

      <div className="game-meta">
        <span><Zap size={15} /> EASY</span>
        <span><Terminal size={15} /> C++</span>
        <span><Trophy size={15} /> 250 XP</span>
      </div>

      <section className="mission-card">
        <div className="mission-card-top">
          <span className="eyebrow">MISSION BRIEFING</span>
          <span className="difficulty-label">ACTIVE</span>
        </div>
        <h2>Find the missing number</h2>
        <p>
          This program should calculate the sum of numbers from 1 to 5.
          The loop contains a bug. Inspect the code and correct it.
        </p>
        <div className="expected-output">
          <span>EXPECTED OUTPUT</span>
          <code>Sum: 15</code>
        </div>
      </section>

      <section className="editor-panel">
        <div className="editor-header">
          <div>
            <Terminal size={17} />
            <span>main.cpp</span>
          </div>
          <span className="language-tag">C++</span>
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
            onClick={() => setShowHint(!showHint)}
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
            <p>
              The loop stops before reaching 5. Check whether the condition
              should use less-than or less-than-or-equal.
            </p>
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
              {result === "success" ? "BUG ELIMINATED!" : "TRY AGAIN"}
            </strong>
            <p>
              {result === "success"
                ? "Correct loop condition! You fixed the bug. +250 XP"
                : "The loop condition is still incorrect. Inspect it and try again."}
            </p>
          </div>
        </motion.div>
      )}

      <div className="solution-section">
        <button
          className="solution-toggle"
          onClick={() => setShowSolution(!showSolution)}
        >
          {showSolution ? "Hide Solution" : "View Solution"}
        </button>

        {showSolution && (
          <pre className="solution-code">
            <code>{solution}</code>
          </pre>
        )}
      </div>

      <p className="game-disclaimer">
        Prototype: the checker verifies the loop condition; it does not
        compile or execute C++.
      </p>
    </motion.div>
  );
}
