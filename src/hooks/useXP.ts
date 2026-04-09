import { useState } from "react";

export interface XPState {
  xp: number;
  level: number;
  badges: string[];
  totalGames: number;
  totalLessons: number;
  correctStreak: number;
}

export const LEVELS = [
  { level: 1, name: "🌱 Росток",     min: 0,    max: 99,   color: "#22C55E" },
  { level: 2, name: "🌻 Цветок",     min: 100,  max: 249,  color: "#EAB308" },
  { level: 3, name: "🦋 Бабочка",    min: 250,  max: 499,  color: "#06B6D4" },
  { level: 4, name: "🦅 Орёл",       min: 500,  max: 899,  color: "#F97316" },
  { level: 5, name: "🚀 Ракета",     min: 900,  max: 1499, color: "#7C3AED" },
  { level: 6, name: "🌟 Звезда",     min: 1500, max: 2499, color: "#EC4899" },
  { level: 7, name: "💎 Бриллиант",  min: 2500, max: 9999, color: "#3B82F6" },
];

export const BADGES = [
  { id: "first_lesson",   icon: "📖", title: "Первый урок",       desc: "Пройти первый урок",            xp: 10  },
  { id: "first_game",     icon: "🎮", title: "Первая игра",       desc: "Сыграть первую игру",           xp: 10  },
  { id: "streak_3",       icon: "🔥", title: "В огне!",           desc: "3 правильных ответа подряд",   xp: 20  },
  { id: "streak_5",       icon: "⚡", title: "Молния!",           desc: "5 правильных ответа подряд",   xp: 30  },
  { id: "streak_10",      icon: "💥", title: "Взрыв!",            desc: "10 правильных подряд",          xp: 50  },
  { id: "games_5",        icon: "🎯", title: "Любитель игр",      desc: "Сыграть 5 игр",                xp: 25  },
  { id: "games_20",       icon: "🏅", title: "Профи",             desc: "Сыграть 20 игр",               xp: 50  },
  { id: "lessons_3",      icon: "🦉", title: "Умная сова",        desc: "Пройти 3 урока",               xp: 30  },
  { id: "lessons_6",      icon: "🎓", title: "Выпускник",         desc: "Пройти все 6 уроков",          xp: 100 },
  { id: "level_2",        icon: "🌻", title: "Расцвёл!",          desc: "Достичь 2 уровня",             xp: 0   },
  { id: "level_3",        icon: "🦋", title: "Бабочка!",          desc: "Достичь 3 уровня",             xp: 0   },
  { id: "level_5",        icon: "🚀", title: "Взлёт!",            desc: "Достичь 5 уровня",             xp: 0   },
  { id: "perfect_game",   icon: "💯", title: "Идеально!",         desc: "Пройти игру без ошибок",       xp: 40  },
  { id: "xp_100",         icon: "⭐", title: "100 очков",         desc: "Набрать 100 XP",               xp: 0   },
  { id: "xp_500",         icon: "🌠", title: "500 очков",         desc: "Набрать 500 XP",               xp: 0   },
  { id: "xp_1000",        icon: "🏆", title: "1000 очков",        desc: "Набрать 1000 XP",              xp: 0   },
];

const KEY = "znaika_xp";

function calcLevel(xp: number): number {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].min) return LEVELS[i].level;
  }
  return 1;
}

function loadXP(): XPState {
  try {
    const s = localStorage.getItem(KEY);
    if (s) return JSON.parse(s);
  } catch (_e) { /* ignore */ }
  return { xp: 47, level: 1, badges: ["first_lesson", "first_game"], totalGames: 3, totalLessons: 1, correctStreak: 0 };
}

function saveXP(s: XPState) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (_e) { /* ignore */ }
}

export function useXP() {
  const [state, setState] = useState<XPState>(loadXP);

  const addXP = (amount: number, context?: { game?: boolean; lesson?: boolean; perfect?: boolean; correct?: boolean }) => {
    setState(prev => {
      const newXP = prev.xp + amount;
      const newLevel = calcLevel(newXP);
      const newBadges = [...prev.badges];
      const newGames = prev.totalGames + (context?.game ? 1 : 0);
      const newLessons = prev.totalLessons + (context?.lesson ? 1 : 0);
      const newStreak = context?.correct === false ? 0 : context?.correct ? prev.correctStreak + 1 : prev.correctStreak;

      const tryBadge = (id: string) => { if (!newBadges.includes(id)) newBadges.push(id); };

      if (context?.lesson && newLessons === 1) tryBadge("first_lesson");
      if (context?.game && newGames === 1) tryBadge("first_game");
      if (context?.game && newGames >= 5) tryBadge("games_5");
      if (context?.game && newGames >= 20) tryBadge("games_20");
      if (context?.lesson && newLessons >= 3) tryBadge("lessons_3");
      if (context?.lesson && newLessons >= 6) tryBadge("lessons_6");
      if (newStreak >= 3) tryBadge("streak_3");
      if (newStreak >= 5) tryBadge("streak_5");
      if (newStreak >= 10) tryBadge("streak_10");
      if (newLevel >= 2) tryBadge("level_2");
      if (newLevel >= 3) tryBadge("level_3");
      if (newLevel >= 5) tryBadge("level_5");
      if (context?.perfect) tryBadge("perfect_game");
      if (newXP >= 100) tryBadge("xp_100");
      if (newXP >= 500) tryBadge("xp_500");
      if (newXP >= 1000) tryBadge("xp_1000");

      const next: XPState = { xp: newXP, level: newLevel, badges: newBadges, totalGames: newGames, totalLessons: newLessons, correctStreak: newStreak };
      saveXP(next);
      return next;
    });
  };

  const getLevelInfo = () => LEVELS.find(l => l.level === state.level) ?? LEVELS[0];
  const getNextLevel = () => LEVELS.find(l => l.level === state.level + 1);

  return { state, addXP, getLevelInfo, getNextLevel };
}
