function mealEntries(menu) {
  return [
    ["Breakfast", "🍳", menu.breakfast],
    ["Lunch", "🍛", menu.lunch],
    ["Snack", "🍞", menu.snack],
    ["Dinner", "🍲", menu.dinner],
    ["Bonus", "🥤", menu.smoothie]
  ];
}

export default function TodayPanel({
  active,
  currentDay,
  dayInfo,
  dayProgress,
  stats,
  onToggleTask,
  onNextDay
}) {
  const totalXP = dayInfo.tasks.reduce((sum, task) => sum + task.xp, 0) + (dayInfo.boss ? 30 : 20);

  return (
    <div className={`panel${active ? " active" : ""}`}>
      <section className="hero-card fade-up">
        <div className="hero-top">
          <div className="hero-avatar float-soft ring-4 ring-white/45" aria-hidden="true" />
          <div>
            <div className="hero-daynum">Day {currentDay} of 30</div>
            <h2 className="hero-title">
              {dayInfo.boss ? `Boss Day: ${dayInfo.title}` : dayInfo.title}
            </h2>
            <p className="hero-msg">{dayInfo.message}</p>
          </div>
        </div>

        <div className="hero-badges">
          <div className="hero-badge">⚡ {totalXP} XP available</div>
          <div className="hero-badge">🎯 Goal: 65 kg</div>
          <div className="hero-badge">{dayProgress.completed ? "⭐ Level cleared" : dayInfo.theme}</div>
        </div>
      </section>

      <section className="focus-grid fade-up-delay-1">
        <div className="focus-card transition-transform duration-300 hover:-translate-y-1">
          <div className="focus-value">{currentDay}</div>
          <div className="focus-label">Current Day</div>
        </div>
        <div className="focus-card transition-transform duration-300 hover:-translate-y-1">
          <div className="focus-value">{stats.completedDays}</div>
          <div className="focus-label">Cleared Levels</div>
        </div>
        <div className="focus-card transition-transform duration-300 hover:-translate-y-1">
          <div className="focus-value">{stats.percent}%</div>
          <div className="focus-label">Journey Done</div>
        </div>
      </section>

      <section className="card fade-up-delay-1 meal-plan-card">
        <div className="section-label">Meal suggestion card</div>
        <div className="meal-grid">
          {mealEntries(dayInfo.menu).map(([label, emoji, value]) => (
            <div key={label} className="meal-item transition-transform duration-300 hover:-translate-y-1">
              <div className="meal-kicker">
                <span>{emoji}</span>
                <span>{label}</span>
              </div>
              <div className="meal-value">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="card fade-up-delay-2 week-card">
        <div className="section-label">Smart progression</div>
        <div className="week-badge">{dayInfo.week.badge}</div>
        <div className="week-title">{dayInfo.week.title}</div>
        <p className="week-copy">{dayInfo.week.guidance}</p>
      </section>

      <div className="section-label">Daily missions</div>
      <section>
        {dayInfo.tasks.map((task, taskIndex) => {
          const done = dayProgress.tasksDone[taskIndex];

          return (
            <button
              key={task.title}
              className={`task-card${done ? " done" : ""}`}
              onClick={() => onToggleTask(taskIndex)}
            >
              <div className="task-check">
                <span className="check-icon">✓</span>
              </div>
              <div className="task-body">
                <div className="task-title">{task.title}</div>
                <div className="task-sub">{task.detail}</div>
                <div className="task-xp">
                  +{task.xp} XP {task.bonus ? "• bonus mission" : ""}
                </div>
              </div>
              <div className="task-emoji">{task.emoji}</div>
            </button>
          );
        })}
      </section>

      <section className={`day-complete${dayProgress.completed ? " show" : ""}`}>
        <span className="day-complete-emoji">🎉</span>
        <h3 className="day-complete-title">Daily menu cleared</h3>
        <p className="day-complete-sub">
          Breakfast, lunch, snack, dinner, and smoothie all landed. This is exactly how appetite gets built.
        </p>
        <button className="next-day-btn" onClick={onNextDay}>
          {currentDay >= 30 ? "Journey finished" : "Next level"}
        </button>
      </section>
    </div>
  );
}
