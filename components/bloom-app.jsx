"use client";

import { useEffect, useMemo, useState } from "react";
import LandingScreen from "@/components/bloom/landing-screen";
import ProfilePanel from "@/components/bloom/profile-panel";
import JourneyPanel from "@/components/bloom/journey-panel";
import RewardsPanel from "@/components/bloom/rewards-panel";
import TodayPanel from "@/components/bloom/today-panel";
import Topbar from "@/components/bloom/topbar";
import {
  createDefaultDayProgress,
  createInitialState,
  DAY_DATA,
  LEVELS,
  PROFILE,
  REWARDS,
  STORAGE_KEY
} from "@/data/challenge";

function normalizeTasks(tasksDone, taskCount) {
  const base = Array.from({ length: taskCount }, () => false);
  if (!Array.isArray(tasksDone)) return base;
  return base.map((_, index) => Boolean(tasksDone[index]));
}

function hydrateState(candidate) {
  const base = createInitialState();

  if (!candidate || typeof candidate !== "object") {
    return base;
  }

  const merged = {
    ...base,
    ...candidate,
    profile: {
      ...PROFILE,
      ...(candidate.profile || {})
    },
    dayProgress: {}
  };

  for (let day = 1; day <= DAY_DATA.length; day += 1) {
    const taskCount = DAY_DATA[day - 1].tasks.length;
    const existing = candidate.dayProgress?.[day] || {};
    const tasksDone = normalizeTasks(existing.tasksDone, taskCount);
    merged.dayProgress[day] = {
      ...createDefaultDayProgress(taskCount),
      ...existing,
      tasksDone,
      completed: tasksDone.every(Boolean),
      stars: tasksDone.filter(Boolean).length
    };
  }

  merged.currentDay = Math.min(Math.max(Number(merged.currentDay) || 1, 1), DAY_DATA.length);
  merged.activeTab = ["today", "journey", "rewards", "profile"].includes(merged.activeTab)
    ? merged.activeTab
    : "today";

  return merged;
}

function getLevel(totalXP) {
  for (let index = LEVELS.length - 1; index >= 0; index -= 1) {
    if (totalXP >= LEVELS[index].minXP) {
      return LEVELS[index];
    }
  }

  return LEVELS[0];
}

function getDayRewardXP(dayInfo) {
  return dayInfo.boss ? 30 : 20;
}

function buildStats(dayProgress, currentDay) {
  let totalXP = 0;
  let completedDays = 0;
  let streak = 0;
  let streakActive = true;

  DAY_DATA.forEach((dayInfo, index) => {
    const day = index + 1;
    const progress = dayProgress[day] || createDefaultDayProgress(dayInfo.tasks.length);
    const tasksDone = normalizeTasks(progress.tasksDone, dayInfo.tasks.length);
    const completed = tasksDone.every(Boolean);
    const stars = tasksDone.filter(Boolean).length;

    dayInfo.tasks.forEach((task, taskIndex) => {
      if (tasksDone[taskIndex]) {
        totalXP += task.xp;
      }
    });

    if (completed) {
      totalXP += getDayRewardXP(dayInfo);
      completedDays += 1;

      if (day <= currentDay && streakActive) {
        streak += 1;
      }
    } else if (day <= currentDay) {
      streakActive = false;
    }

    progress.completed = completed;
    progress.stars = stars;
  });

  return {
    totalXP,
    completedDays,
    streak,
    percent: Math.round((completedDays / DAY_DATA.length) * 100)
  };
}

export default function BloomApp() {
  const [state, setState] = useState(() => createInitialState());
  const [isHydrated, setIsHydrated] = useState(false);
  const [toast, setToast] = useState("");
  const [confettiBurst, setConfettiBurst] = useState([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setState(hydrateState(JSON.parse(raw)));
      } else {
        const legacyRaw = window.localStorage.getItem("bloom_state");
        if (legacyRaw) {
          const legacy = JSON.parse(legacyRaw);
          const migrated = createInitialState();
          migrated.profile = { ...PROFILE, name: legacy.name || PROFILE.name };
          migrated.currentDay = Math.min(Math.max(legacy.currentDay || 1, 1), DAY_DATA.length);
          migrated.started = Boolean(legacy.started);

          DAY_DATA.forEach((dayInfo, index) => {
            const day = index + 1;
            if (legacy.completedDays?.includes(day)) {
              migrated.dayProgress[day] = {
                tasksDone: Array.from({ length: dayInfo.tasks.length }, () => true),
                completed: true,
                stars: dayInfo.tasks.length
              };
            }
          });

          if (Array.isArray(legacy.tasksDone)) {
            const taskCount = DAY_DATA[migrated.currentDay - 1].tasks.length;
            const tasksDone = normalizeTasks(legacy.tasksDone, taskCount);
            migrated.dayProgress[migrated.currentDay] = {
              tasksDone,
              completed: tasksDone.every(Boolean),
              stars: tasksDone.filter(Boolean).length
            };
          }

          setState(hydrateState(migrated));
        }
      }
    } catch {
      setState(createInitialState());
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [isHydrated, state]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeoutId = window.setTimeout(() => setToast(""), 1600);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  useEffect(() => {
    if (confettiBurst.length === 0) return undefined;
    const timeoutId = window.setTimeout(() => setConfettiBurst([]), 3200);
    return () => window.clearTimeout(timeoutId);
  }, [confettiBurst]);

  const stats = useMemo(
    () => buildStats(state.dayProgress, state.currentDay),
    [state.dayProgress, state.currentDay]
  );
  const level = useMemo(() => getLevel(stats.totalXP), [stats.totalXP]);
  const currentDayInfo = DAY_DATA[state.currentDay - 1];
  const currentDayProgress =
    state.dayProgress[state.currentDay] || createDefaultDayProgress(currentDayInfo.tasks.length);
  const progressWithinLevel = Math.max(
    0,
    Math.min(100, ((stats.totalXP - level.minXP) / (level.maxXP - level.minXP)) * 100)
  );
  const levelStars = Math.min(
    5,
    Math.max(0, Math.floor(((stats.totalXP - level.minXP) / (level.maxXP - level.minXP)) * 5))
  );

  function showToast(message) {
    setToast(message);
  }

  function launchConfetti() {
    const colors = ["#f69ab3", "#ffd1ab", "#bbefd8", "#d7c0ff", "#ffca58", "#e16a90"];
    const pieces = Array.from({ length: 30 }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      left: Math.random() * 100,
      size: 6 + Math.random() * 8,
      delay: Math.random() * 0.3,
      duration: 1.7 + Math.random() * 1.1,
      color: colors[index % colors.length]
    }));
    setConfettiBurst(pieces);
  }

  function startJourney() {
    setState((current) => ({
      ...current,
      started: true,
      profile: {
        ...current.profile,
        name: current.profile.name?.trim() || PROFILE.name
      }
    }));
  }

  function updateProfileName(name) {
    setState((current) => ({
      ...current,
      profile: {
        ...current.profile,
        name
      }
    }));
  }

  function switchTab(tab) {
    setState((current) => ({ ...current, activeTab: tab }));
  }

  function goToDay(day) {
    if (day > state.currentDay) return;
    setState((current) => ({ ...current, currentDay: day, activeTab: "today" }));
  }

  function goNextDay() {
    setState((current) => ({
      ...current,
      currentDay: Math.min(current.currentDay + 1, DAY_DATA.length),
      activeTab: "today"
    }));
  }

  function toggleTask(taskIndex) {
    setState((current) => {
      const day = current.currentDay;
      const dayInfo = DAY_DATA[day - 1];
      const progress = current.dayProgress[day] || createDefaultDayProgress(dayInfo.tasks.length);
      const nextTasksDone = normalizeTasks(progress.tasksDone, dayInfo.tasks.length);
      const wasCompleted = nextTasksDone.every(Boolean);

      nextTasksDone[taskIndex] = !nextTasksDone[taskIndex];
      const isCompleted = nextTasksDone.every(Boolean);
      const nextDayProgress = {
        ...current.dayProgress,
        [day]: {
          tasksDone: nextTasksDone,
          completed: isCompleted,
          stars: nextTasksDone.filter(Boolean).length
        }
      };

      const taskXP = dayInfo.tasks[taskIndex].xp;
      showToast(nextTasksDone[taskIndex] ? `+${taskXP} XP` : "Task unchecked");

      if (!wasCompleted && isCompleted) {
        showToast(`Level clear +${getDayRewardXP(dayInfo)} XP`);
        launchConfetti();
      }

      return {
        ...current,
        currentDay:
          !wasCompleted && isCompleted && day < DAY_DATA.length && current.currentDay === day
            ? day + 1
            : current.currentDay,
        dayProgress: nextDayProgress
      };
    });
  }

  if (!state.started) {
    return (
      <LandingScreen
        name={state.profile.name}
        onNameChange={updateProfileName}
        onStart={startJourney}
      />
    );
  }

  return (
    <main className="app-shell">
      <Topbar
        name={state.profile.name || PROFILE.name}
        age={PROFILE.age}
        goalWeight={PROFILE.goalWeight}
        streak={stats.streak}
        level={level}
        totalXP={stats.totalXP}
        progressWithinLevel={progressWithinLevel}
      />

      <div className="tab-pills fade-up-delay-1">
        {["today", "journey", "rewards", "profile"].map((tab) => (
          <button
            key={tab}
            className={`tab-pill transition-all duration-300 hover:-translate-y-0.5${state.activeTab === tab ? " active" : ""}`}
            onClick={() => switchTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <TodayPanel
        active={state.activeTab === "today"}
        currentDay={state.currentDay}
        dayInfo={currentDayInfo}
        dayProgress={currentDayProgress}
        stats={stats}
        onToggleTask={toggleTask}
        onNextDay={goNextDay}
      />

      <JourneyPanel
        active={state.activeTab === "journey"}
        currentDay={state.currentDay}
        stats={stats}
        level={level}
        levelStars={levelStars}
        dayProgress={state.dayProgress}
        onGoToDay={goToDay}
      />

      <RewardsPanel
        active={state.activeTab === "rewards"}
        rewards={REWARDS}
        totalXP={stats.totalXP}
      />

      <ProfilePanel
        active={state.activeTab === "profile"}
        age={PROFILE.age}
        goalWeight={PROFILE.goalWeight}
        streak={stats.streak}
        totalXP={stats.totalXP}
      />

      <nav className="bottom-nav">
        {[
          ["today", "🌸"],
          ["journey", "🍬"],
          ["rewards", "🎁"],
          ["profile", "👑"]
        ].map(([tab, icon]) => (
          <button
            key={tab}
            className={`nav-item${state.activeTab === tab ? " active" : ""}`}
            onClick={() => switchTab(tab)}
          >
            <span className="nav-icon">{icon}</span>
            <span className="nav-label">{tab}</span>
          </button>
        ))}
      </nav>

      <div className={`xp-toast${toast ? " show" : ""}`}>{toast}</div>

      {confettiBurst.map((piece) => (
        <div
          key={piece.id}
          className="confetti-p"
          style={{
            left: `${piece.left}vw`,
            top: "-10px",
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            background: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`
          }}
        />
      ))}
    </main>
  );
}
