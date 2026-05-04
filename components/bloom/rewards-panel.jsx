export default function RewardsPanel({ active, rewards, totalXP }) {
  return (
    <div className={`panel${active ? " active" : ""}`}>
      <div className="section-label">Milestones and unlocks</div>
      {rewards.map((reward) => {
        const earned = totalXP >= reward.xpNeeded;

        return (
          <section key={reward.day} className={`reward-card transition-all duration-300 hover:-translate-y-1 ${earned ? "unlocked" : "locked"}`}>
            <div className="reward-icon">{reward.icon}</div>
            <div>
              <div className="reward-day">Day {reward.day} unlock</div>
              <h3 className="reward-name">{reward.name}</h3>
              <p className="reward-desc">{reward.desc}</p>
            </div>
            <div className={`reward-badge ${earned ? "earned" : "locked-b"}`}>
              {earned ? "Unlocked" : `${reward.xpNeeded} XP`}
            </div>
          </section>
        );
      })}
    </div>
  );
}
