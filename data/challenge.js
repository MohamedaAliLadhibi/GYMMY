export const STORAGE_KEY = "bloom_state_v3";

export const PROFILE = {
  name: "Islem",
  age: 22,
  goalWeight: "65 kg"
};

export const LEVELS = [
  {
    num: 1,
    name: "Week 1 Glow",
    sub: "Just eat regularly, even in small portions.",
    minXP: 0,
    maxXP: 420
  },
  {
    num: 2,
    name: "Week 2 Flow",
    sub: "Add snacks and make the smoothie a daily ritual.",
    minXP: 420,
    maxXP: 860
  },
  {
    num: 3,
    name: "Week 3 Power",
    sub: "Increase portions gently and keep the rhythm stable.",
    minXP: 860,
    maxXP: 1320
  },
  {
    num: 4,
    name: "Week 4 Gym Prep",
    sub: "More protein, better structure, and stronger energy.",
    minXP: 1320,
    maxXP: 1820
  }
];

export const DAILY_STRUCTURE = [
  { key: "breakfast", label: "Breakfast", emoji: "🍳" },
  { key: "lunch", label: "Lunch", emoji: "🍛" },
  { key: "snack", label: "Snack", emoji: "🍞" },
  { key: "dinner", label: "Dinner", emoji: "🍲" },
  { key: "smoothie", label: "Smoothie", emoji: "🥤" }
];

export const MEAL_LIBRARY = {
  breakfast: [
    "Baguette + olive oil + eggs",
    "Milk + bsissa + honey",
    "Bread + peanut butter + banana",
    "Omelette + cheese + bread",
    "Milk + dates + oats"
  ],
  lunch: [
    "Couscous with chicken or meat",
    "Lablabi + bread + tuna + egg",
    "Pasta + sauce + meat or tuna",
    "Rice + chicken + vegetables",
    "Ojja with merguez or eggs"
  ],
  snack: [
    "Banana + yogurt",
    "Tuna sandwich",
    "Peanuts or almonds",
    "Chocolate + milk",
    "Cheese + bread"
  ],
  dinner: [
    "Eggs + bread",
    "Chorba",
    "Sandwich with cheese, turkey, or tuna",
    "Leftover pasta or rice",
    "Potatoes + eggs"
  ],
  smoothie: [
    "Milk + banana + peanut butter + oats + honey"
  ]
};

export const WEEK_SYSTEM = [
  {
    week: 1,
    title: "Regular Meals First",
    badge: "Week 1",
    focus: "Just eat regularly, even small portions.",
    guidance: "No pressure on big portions yet. The win this week is simply showing up to each meal window.",
    accent: "🌱"
  },
  {
    week: 2,
    title: "Snack + Smoothie Week",
    badge: "Week 2",
    focus: "Add snacks and smoothie.",
    guidance: "This is where appetite starts warming up. Small extras matter more than perfect meals.",
    accent: "🥤"
  },
  {
    week: 3,
    title: "Portion Upgrade",
    badge: "Week 3",
    focus: "Increase portions slightly.",
    guidance: "Keep the same structure, just nudge one meal or one side a little bigger than usual.",
    accent: "🍽️"
  },
  {
    week: 4,
    title: "Gym Preparation",
    badge: "Week 4",
    focus: "Prepare for gym with more protein.",
    guidance: "Keep rhythm strong, add protein more intentionally, and make the energy feel athletic.",
    accent: "💪"
  }
];

export const REWARDS = [
  {
    day: 3,
    icon: "💌",
    name: "Secret Letter",
    desc: "A little note of encouragement after the first few meal wins.",
    xpNeeded: 120
  },
  {
    day: 7,
    icon: "🎵",
    name: "Glow Playlist",
    desc: "A soft playlist for breakfast or smoothie time.",
    xpNeeded: 300
  },
  {
    day: 10,
    icon: "🍽️",
    name: "Treat Meal",
    desc: "A celebratory Tunisian comfort meal unlock.",
    xpNeeded: 470
  },
  {
    day: 15,
    icon: "✨",
    name: "Halfway Surprise",
    desc: "A cute reward for surviving the first half of the system.",
    xpNeeded: 700
  },
  {
    day: 21,
    icon: "🏋️",
    name: "Gym Mood Pack",
    desc: "A stronger-energy unlock for the final push.",
    xpNeeded: 1020
  },
  {
    day: 30,
    icon: "👑",
    name: "Crown Reward",
    desc: "The full-finish reward for clearing all 30 food levels.",
    xpNeeded: 1500
  }
];

const DAY_NAMES = [
  "Soft Start",
  "Bread & Energy",
  "Smoothie Spark",
  "Full Plate Day",
  "Appetite Warm-Up",
  "Boss Table",
  "Snack Builder",
  "Routine Magic",
  "Color Plate",
  "Nourish Glow",
  "Lunch Power",
  "Keep Eating",
  "Protein Lift",
  "Calorie Boost",
  "Hydration + Food",
  "Boss Rhythm",
  "Halfway Heart",
  "Snack Momentum",
  "Bigger Plate",
  "Cozy Refuel",
  "Protein Week",
  "Soft Strength",
  "Healthy Fats",
  "Boss Fuel",
  "Final Stretch",
  "Portion Confidence",
  "Energy Max",
  "Gym Mood",
  "One More Push",
  "Crown Day"
];

function getWeekIndex(day) {
  if (day <= 7) return 0;
  if (day <= 14) return 1;
  if (day <= 21) return 2;
  return 3;
}

function mealAt(key, day, shift = 0) {
  const list = MEAL_LIBRARY[key];
  return list[(day - 1 + shift) % list.length];
}

function taskXpFor(day, key) {
  const week = getWeekIndex(day) + 1;
  const base = {
    breakfast: 10,
    lunch: 10,
    snack: 10,
    dinner: 10,
    smoothie: 20
  };

  if (key === "smoothie" && week >= 2) return 22;
  if ((key === "lunch" || key === "dinner") && week >= 3) return 12;
  if ((key === "breakfast" || key === "snack") && week >= 4) return 11;
  return base[key];
}

function buildTask(day, key, title, detail) {
  const entry = DAILY_STRUCTURE.find((item) => item.key === key);
  return {
    key,
    title,
    detail,
    emoji: entry.emoji,
    xp: taskXpFor(day, key),
    bonus: key === "smoothie"
  };
}

function buildDailyPlan(day) {
  const weekIndex = getWeekIndex(day);
  const week = WEEK_SYSTEM[weekIndex];
  const boss = day === 7 || day === 15 || day === 24 || day === 30;
  const breakfast = mealAt("breakfast", day);
  const lunch = mealAt("lunch", day, 1);
  const snack = mealAt("snack", day, 2);
  const dinner = mealAt("dinner", day, 3);
  const smoothie = MEAL_LIBRARY.smoothie[0];

  return {
    day,
    title: DAY_NAMES[day - 1],
    emoji: boss ? "👑" : week.accent,
    boss,
    week,
    theme: week.focus,
    message: boss
      ? `Boss day energy. Keep the full structure, hit the smoothie, and let the rhythm carry you.`
      : `Today is about ${week.focus.toLowerCase()} Tunisian-style meals that are simple, cheap, and realistic.`,
    menu: {
      breakfast,
      lunch,
      snack,
      dinner,
      smoothie
    },
    tasks: [
      buildTask(day, "breakfast", "Eat breakfast", `Try: ${breakfast}`),
      buildTask(day, "lunch", "Eat lunch", `Try: ${lunch}. Add olive oil and bread on the side.`),
      buildTask(day, "snack", "Eat a snack", `Try: ${snack}. Small but frequent helps appetite.`),
      buildTask(day, "dinner", "Eat dinner", `Try: ${dinner}. Keep it lighter but still calorie-friendly.`),
      buildTask(day, "smoothie", "Drink the weight gain smoothie", `Blend ${smoothie} for an easy 500+ calorie boost.`)
    ]
  };
}

export const DAY_DATA = Array.from({ length: 30 }, (_, index) => buildDailyPlan(index + 1));

export function createDefaultDayProgress(taskCount = 5) {
  return {
    tasksDone: Array.from({ length: taskCount }, () => false),
    completed: false,
    stars: 0
  };
}

export function createInitialState() {
  const dayProgress = {};

  for (let day = 1; day <= DAY_DATA.length; day += 1) {
    dayProgress[day] = createDefaultDayProgress(DAY_DATA[day - 1].tasks.length);
  }

  return {
    profile: PROFILE,
    currentDay: 1,
    started: false,
    activeTab: "today",
    dayProgress
  };
}
