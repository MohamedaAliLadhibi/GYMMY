export default function Topbar({ name, age, goalWeight, streak, level, totalXP, progressWithinLevel }) {
  return (
    <div className="topbar fade-up">
      <div className="topbar-inner glass">
        <div className="topbar-row">
          <div className="topbar-profile">
            <div className="topbar-avatar glow-slow ring-2 ring-white/50" aria-hidden="true" />
            <div className="topbar-text">
              <div className="topbar-kicker">Bloom Journey</div>
              <div className="topbar-name">{name}</div>
              <div className="topbar-meta">
                <span className="meta-pill">{age} years old</span>
                <span className="meta-pill">Goal {goalWeight}</span>
              </div>
            </div>
          </div>
          <div className="streak-chip">🔥 {streak} day streak</div>
        </div>
        <div>
          <div className="xp-row">
            <div className="xp-label">
              <strong>{level.name}</strong> mode
            </div>
            <div className="xp-label">{totalXP} XP</div>
          </div>
          <div className="xp-track">
            <div className="xp-fill" style={{ width: `${progressWithinLevel}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
