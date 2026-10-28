
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap, Bug, Code2, Trophy, Flame, Target, Terminal,
  ChevronRight, Search, Bell, Play, Sparkles, LockKeyhole,
  CircleCheck, Clock3, Cpu, ArrowUpRight, Menu
} from "lucide-react";
import "./App.css";

const quests = [
  { id: 1, type: "DEBUGGING", title: "Debug the Mess", desc: "Find the hidden bugs. Fix the chaos.", xp: 250, level: "EASY", icon: Bug, color: "purple" },
  { id: 2, type: "CODING", title: "Code Quest", desc: "Turn your logic into working code.", xp: 400, level: "MEDIUM", icon: Code2, color: "cyan" },
  { id: 3, type: "QUICKFIRE", title: "Brain Overclock", desc: "Answer fast. Think faster.", xp: 150, level: "EASY", icon: Zap, color: "orange" },
];

const activities = [
  { icon: Bug, title: "The Missing Semicolon", detail: "Debug the Mess · C++", xp: "+100 XP", color: "purple" },
  { icon: Code2, title: "Array Invasion", detail: "Code Quest · Arrays", xp: "+250 XP", color: "cyan" },
  { icon: Target, title: "Logic Checkpoint", detail: "Quickfire · Conditions", xp: "+150 XP", color: "orange" },
];

function App() {
  const [active, setActive] = useState("Overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [completed, setCompleted] = useState([]);
  const [search, setSearch] = useState("");

  const navItems = [
    { label: "Overview", icon: Terminal },
    { label: "Debug the Mess", icon: Bug },
    { label: "Code Quest", icon: Code2 },
    { label: "Quickfire", icon: Zap },
    { label: "Leaderboard", icon: Trophy },
  ];

  function chooseMode(label) {
    setActive(label);
    setMenuOpen(false);
    if (label !== "Overview") {
      setNotice(`${label} selected — your next mission awaits!`);
    } else {
      setNotice("");
    }
  }

  const visibleQuests = quests.filter((q) =>
    `${q.title} ${q.desc} ${q.type}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <button className="brand" onClick={() => chooseMode("Overview")}>
          <span className="brand-mark"><Bug size={25} /></span>
          <span className="brand-name">debugify<span>.</span><small>THE CODING UNIVERSE</small></span>
        </button>

        <div className="sidebar-label">YOUR PLAYGROUND</div>
        <nav className="nav-list">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-item ${active === label ? "nav-active" : ""}`}
              onClick={() => chooseMode(label)}
            >
              <Icon size={19} />
              <span>{label}</span>
              {label === "Debug the Mess" && <span className="nav-dot" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-label world-label">YOUR PROGRESSION</div>
        <div className="world-card">
          <div className="world-top"><Sparkles size={17} /> WORLD 01</div>
          <h3>The Neon District</h3>
          <p>Your coding journey starts here.</p>
          <div className="progress-track"><span style={{ width: "28%" }} /></div>
          <div className="progress-caption"><span>Progress</span><span>28%</span></div>
          <div className="world-next"><LockKeyhole size={14} /> Next world unlocks at Level 5</div>
        </div>

        <div className="sidebar-bottom">
          <div className="online-indicator" />
          <span>ALL SYSTEMS ONLINE</span>
          <span className="version">v0.1.0</span>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <Menu size={21} />
          </button>
          <div className="breadcrumb">UNIVERSE <ChevronRight size={14} /> <span>{active.toUpperCase()}</span></div>
          <div className="top-actions">
            <label className="search-box">
              <Search size={17} />
              <input
                placeholder="Find your next quest..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="shortcut">/</span>
            </label>
            <button className="icon-button notification-button" aria-label="Notifications" onClick={() => setNotice("You're all caught up. No new notifications.")}>
              <Bell size={19} /><i />
            </button>
            <div className="profile-avatar">T<span /></div>
          </div>
        </header>

        <div className="page-content">
          {notice && (
            <motion.div className="notice-banner" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
              <Sparkles size={16} /> {notice}
              <button onClick={() => setNotice("")}>×</button>
            </motion.div>
          )}

          <section className="welcome-row">
            <div>
              <div className="eyebrow"><span className="live-dot" /> YOUR NEXT LEVEL STARTS HERE</div>
              <h1>Ready to break<br />some <span className="gradient-text">code?</span></h1>
              <p className="welcome-copy">Every bug is a boss. Every problem is a quest.<br className="desktop-break" /> Welcome to your coding universe.</p>
              <button className="primary-button" onClick={() => chooseMode("Debug the Mess")}>
                <Play size={17} fill="currentColor" /> Enter the arena <ArrowUpRight size={17} />
              </button>
            </div>
            <div className="hero-art" aria-label="Debugify level illustration">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="hero-code code-one">{"{ }"}</div>
              <div className="hero-code code-two">{"</>"}</div>
              <div className="hero-code code-three">{"01"}</div>
              <motion.div
                className="hero-core"
                animate={{ y: [0, -9, 0], rotate: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="core-inner"><Bug size={67} strokeWidth={1.5} /></div>
                <Sparkles className="core-spark" size={25} />
              </motion.div>
              <div className="floating-chip chip-top"><Zap size={14} /> +250 XP</div>
              <div className="floating-chip chip-bottom"><CircleCheck size={14} /> SYSTEM READY</div>
            </div>
          </section>

          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon purple-icon"><Zap size={20} /></div>
              <div className="stat-label">TOTAL EXPERIENCE</div>
              <div className="stat-value">1,250 <span>XP</span></div>
              <div className="stat-foot"><span className="positive">↑ 18%</span> from last week</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon orange-icon"><Flame size={20} /></div>
              <div className="stat-label">CURRENT STREAK</div>
              <div className="stat-value">07 <span>DAYS</span></div>
              <div className="stat-foot">You're on fire. Keep going!</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon cyan-icon"><Target size={20} /></div>
              <div className="stat-label">QUESTS CLEARED</div>
              <div className="stat-value">{12 + completed.length} <span>/ 50</span></div>
              <div className="stat-foot">One challenge at a time.</div>
            </div>
            <div className="stat-card level-stat">
              <div className="stat-icon pink-icon"><Trophy size={20} /></div>
              <div className="stat-label">CURRENT RANK</div>
              <div className="stat-value">LVL 03</div>
              <div className="level-progress"><span /></div>
              <div className="stat-foot">750 XP to Level 04</div>
            </div>
          </section>

          <section className="section-block">
            <div className="section-heading">
              <div><div className="section-kicker">CHOOSE YOUR CHALLENGE</div><h2>Pick your next quest<span>.</span></h2></div>
              <span className="quest-count">{visibleQuests.length} MISSIONS AVAILABLE</span>
            </div>
            <div className="quest-grid">
              {visibleQuests.map((quest, i) => {
                const Icon = quest.icon;
                const isDone = completed.includes(quest.id);
                return (
                  <motion.article
                    key={quest.id}
                    className={`quest-card ${quest.color}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.09 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="quest-card-top">
                      <div className="quest-icon"><Icon size={23} /></div>
                      <span className={`difficulty ${quest.level.toLowerCase()}`}>{quest.level}</span>
                    </div>
                    <div className="quest-type">{quest.type} / 0{quest.id}</div>
                    <h3>{quest.title}</h3>
                    <p>{quest.desc}</p>
                    <div className="quest-card-footer">
                      <span className="xp-reward"><Zap size={14} /> {isDone ? "COMPLETED" : `${quest.xp} XP`}</span>
                      <button
                        className="quest-play"
                        aria-label={`Start ${quest.title}`}
                        onClick={() => {
                          if (!isDone) setCompleted([...completed, quest.id]);
                          setNotice(isDone ? `${quest.title} already completed in this demo.` : `${quest.title} demo started! Your mission is ready to build.`);
                          setActive(quest.title);
                        }}
                      >
                        {isDone ? <CircleCheck size={18} /> : <ChevronRight size={20} />}
                      </button>
                    </div>
                  </motion.article>
                );
              })}
              {visibleQuests.length === 0 && <div className="empty-state">No quests found. Try another search.</div>}
            </div>
          </section>

          <section className="lower-grid">
            <div className="activity-panel">
              <div className="section-heading compact-heading">
                <div><div className="section-kicker">YOUR JOURNEY</div><h2>Recent activity<span>.</span></h2></div>
                <button className="text-button" onClick={() => setNotice("Your full activity history will be available in a future update.")}>View all <ChevronRight size={15} /></button>
              </div>
              <div className="activity-list">
                {activities.map(({ icon: Icon, title, detail, xp, color }) => (
                  <div className="activity-row" key={title}>
                    <div className={`activity-icon ${color}`}><Icon size={18} /></div>
                    <div className="activity-info"><strong>{title}</strong><span>{detail}</span></div>
                    <span className="activity-xp">{xp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="daily-panel">
              <div className="daily-badge"><Clock3 size={14} /> DAILY MISSION</div>
              <div className="daily-art"><Cpu size={43} strokeWidth={1.2} /><Sparkles size={19} /></div>
              <h3>Train your logic.</h3>
              <p>Complete 3 challenges today and earn a bonus reward.</p>
              <div className="daily-progress-row"><span>Daily progress</span><strong>{completed.length}/3</strong></div>
              <div className="progress-track daily-track"><span style={{ width: `${Math.min(completed.length / 3 * 100, 100)}%` }} /></div>
              <button className="daily-button" onClick={() => chooseMode("Quickfire")}>Continue mission <ChevronRight size={17} /></button>
            </div>
          </section>

          <footer className="footer">
            <span><span className="footer-dot" /> BUILT FOR THE CURIOUS MINDS</span>
            <span>DEBUGIFY © 2026 <span className="footer-separator">/</span> LEVEL UP YOUR LOGIC</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
