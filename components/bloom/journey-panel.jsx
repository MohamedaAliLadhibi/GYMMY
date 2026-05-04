import { DAY_DATA } from "@/data/challenge";

export default function JourneyPanel({ active, currentDay, stats, level, levelStars, dayProgress, onGoToDay }) {
  return (
    <div className={`panel${active ? " active" : ""}`}>
      <section className="journey-overview fade-up">
        <div className="level-strip card transition-transform duration-300 hover:-translate-y-1">
          <h2 className="level-name">{level.name}</h2>
          <p className="level-sub">{level.sub}</p>
          <div className="level-stars">
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={`level-star-${index + 1}`}
                className={`level-star${index < levelStars ? " filled" : ""}`}
              />
            ))}
          </div>
        </div>

        <div className="journey-score card transition-transform duration-300 hover:-translate-y-1">
          <div className="journey-score-label">Challenge score</div>
          <div className="journey-score-value">
            {stats.completedDays} / {DAY_DATA.length}
          </div>
          <div className="journey-score-note">
            {stats.completedDays === DAY_DATA.length
              ? "Every level is cleared. Crown earned."
              : `${DAY_DATA.length - stats.completedDays} levels left to finish the map.`}
          </div>
        </div>
      </section>

      <div className="section-label">Candy-style map</div>
      <section className="journey-map fade-up-delay-1">
        {DAY_DATA.map((dayInfo, index) => {
          const day = index + 1;
          const progress = dayProgress[day];
          const locked = day > currentDay;
          const side = day % 2 === 0 ? "right" : "left";
          const status = progress.completed
            ? "Cleared"
            : day === currentDay
              ? "Play now"
              : locked
                ? "Locked ahead"
                : "Replay open";

          return (
            <div key={day} className={`journey-node ${side}`}>
              <button
                className={`journey-card${progress.completed ? " done" : ""}${
                  day === currentDay ? " today" : ""
                }${locked ? " locked" : ""}${dayInfo.boss ? " boss" : ""}`}
                onClick={() => onGoToDay(day)}
                disabled={locked}
              >
                <div className={`journey-bubble ${!locked ? "map-drift" : ""}`}>
                  {dayInfo.boss ? "👑" : dayInfo.emoji}
                </div>
                <div className="journey-copy">
                  <div className="journey-day">Day {day}</div>
                  <div className="journey-title">{dayInfo.title}</div>
                  <div className="journey-status">{status}</div>
                  <div className="journey-status">{dayInfo.week.badge}: {dayInfo.week.focus}</div>
                  <div className="journey-stars">
                    {Array.from({ length: dayInfo.tasks.length }, (_, starIndex) => (
                      <span
                        key={`${day}-star-${starIndex + 1}`}
                        className={starIndex < progress.stars ? "filled" : ""}
                      />
                    ))}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </section>

      <section className="card msg-card fade-up-delay-2 transition-transform duration-300 hover:-translate-y-1">
        <div className="msg-sender">Message for Islem</div>
        <p className="msg-body">{DAY_DATA[currentDay - 1].message}</p>
      </section>
    </div>
  );
}
