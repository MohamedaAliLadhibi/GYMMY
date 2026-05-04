export default function ProfilePanel({ active, age, goalWeight, streak, totalXP }) {
  return (
    <div className={`panel${active ? " active" : ""}`}>
      <section className="card fade-up transition-transform duration-300 hover:-translate-y-1">
        <div className="profile-hero">
          <div className="profile-photo glow-slow ring-4 ring-white/45" aria-hidden="true" />
          <div>
            <h2 className="profile-title">Islem&apos;s Profile</h2>
            <p className="profile-sub">
              A Tunisian-style 30-day meal system with repeatable structure, local food ideas,
              and smoother code organization behind the scenes.
            </p>
          </div>
        </div>

        <div className="profile-grid">
          <div className="profile-metric">
            <div className="profile-label">Age</div>
            <div className="profile-value">{age}</div>
          </div>
          <div className="profile-metric">
            <div className="profile-label">Goal weight</div>
            <div className="profile-value">{goalWeight}</div>
          </div>
          <div className="profile-metric">
            <div className="profile-label">Current streak</div>
            <div className="profile-value">
              {streak} {streak === 1 ? "day" : "days"}
            </div>
          </div>
          <div className="profile-metric">
            <div className="profile-label">XP earned</div>
            <div className="profile-value">{totalXP}</div>
          </div>
        </div>

        <p className="profile-note">
          The app now runs with smaller UI components instead of one giant screen file, which makes
          updates smoother and easier to extend.
        </p>

        <div className="mini-list">
          <div className="mini-item">
            <strong>Daily structure:</strong> breakfast, lunch, snack, dinner, and one important smoothie bonus.
          </div>
          <div className="mini-item">
            <strong>Food style:</strong> baguette, bsissa, couscous, lablabi, ojja, tuna, eggs, olive oil, and other simple Tunisian staples.
          </div>
          <div className="mini-item">
            <strong>Progression:</strong> week 1 regular meals, week 2 snacks and smoothie, week 3 slightly bigger portions, week 4 gym prep and more protein.
          </div>
        </div>
      </section>
    </div>
  );
}
