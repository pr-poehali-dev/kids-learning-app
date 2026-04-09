import { useState } from "react";
import { ConfettiPiece } from "@/components/shared/MascotCharacter";
import { BADGES, LEVELS, type XPState } from "@/hooks/useXP";

const CONFETTI_COLORS = ["#7C3AED", "#EC4899", "#F97316", "#EAB308", "#22C55E", "#3B82F6"];
const CONFETTI_PIECES = Array.from({ length: 14 }, (_, i) => ({
  delay: i * 0.12,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  left: i * 7 + 2,
}));

interface Props {
  xpState: XPState;
}

export function TabAchievements({ xpState }: Props) {
  const [celebrating, setCelebrating] = useState(false);

  const currentLevel = LEVELS.find(l => l.level === xpState.level) ?? LEVELS[0];
  const nextLevel = LEVELS.find(l => l.level === xpState.level + 1);
  const xpInLevel = xpState.xp - currentLevel.min;
  const xpNeeded = nextLevel ? nextLevel.min - currentLevel.min : 1;
  const pct = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));

  const unlockedBadges = BADGES.filter(b => xpState.badges.includes(b.id));
  const lockedBadges = BADGES.filter(b => !xpState.badges.includes(b.id));

  return (
    <div className="space-y-5 relative">
      {celebrating && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {CONFETTI_PIECES.map((p, i) => <ConfettiPiece key={i} {...p} />)}
        </div>
      )}

      {/* XP & Level card */}
      <div
        className="kid-card p-5 cursor-pointer"
        style={{ background: `linear-gradient(135deg, ${currentLevel.color}, ${currentLevel.color}cc)` }}
        onClick={() => { setCelebrating(true); setTimeout(() => setCelebrating(false), 3000); }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-white font-black text-2xl">{currentLevel.name}</div>
            <div className="text-white/80 text-sm">{xpState.xp} XP заработано</div>
          </div>
          <div className="text-5xl anim-bounce-slow">🏆</div>
        </div>

        {/* XP bar */}
        <div className="bg-white/20 rounded-full h-4 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 bg-white"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-white/70 text-xs font-bold">{xpState.xp} XP</span>
          {nextLevel ? (
            <span className="text-white/70 text-xs font-bold">до {nextLevel.name}: {nextLevel.min - xpState.xp} XP</span>
          ) : (
            <span className="text-white/70 text-xs font-bold">Максимальный уровень! 👑</span>
          )}
        </div>

        <div className="text-white/60 text-xs mt-2">Нажми, чтобы отпраздновать! 🎉</div>
      </div>

      {/* All levels */}
      <div className="kid-card p-4">
        <div className="font-black text-gray-800 mb-3">Путь уровней</div>
        <div className="space-y-2">
          {LEVELS.map((lvl) => {
            const isDone = xpState.level > lvl.level;
            const isCurrent = xpState.level === lvl.level;
            return (
              <div
                key={lvl.level}
                className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                  isDone ? "bg-green-50" : isCurrent ? "bg-purple-50 border-2 border-purple-300" : "bg-gray-50"
                }`}
              >
                <div className={`font-bold text-sm ${isDone ? "text-green-700" : isCurrent ? "text-purple-700" : "text-gray-400"}`}>
                  {lvl.name}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${isDone ? "text-green-500" : isCurrent ? "text-purple-500" : "text-gray-300"}`}>
                    {lvl.min}–{lvl.max === 9999 ? "∞" : lvl.max} XP
                  </span>
                  {isDone && <span className="text-green-500">✅</span>}
                  {isCurrent && <span className="text-purple-600 text-xs font-black">← ты здесь</span>}
                  {!isDone && !isCurrent && <span className="text-gray-300">🔒</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Unlocked badges */}
      {unlockedBadges.length > 0 && (
        <div>
          <h3 className="text-lg font-black text-gray-800 mb-3">
            🏅 Мои значки <span className="text-sm text-gray-400 font-semibold">({unlockedBadges.length} из {BADGES.length})</span>
          </h3>
          <div className="space-y-2">
            {unlockedBadges.map((b) => (
              <div key={b.id} className="kid-card p-4 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 bg-yellow-50">
                  {b.icon}
                </div>
                <div className="flex-1">
                  <div className="font-black text-gray-800">{b.title}</div>
                  <div className="text-xs text-gray-400">{b.desc}</div>
                </div>
                <div className="text-right">
                  <div className="text-green-500 text-xl">✅</div>
                  {b.xp > 0 && <div className="text-xs text-yellow-600 font-bold">+{b.xp} XP</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked badges */}
      {lockedBadges.length > 0 && (
        <div>
          <h3 className="text-lg font-black text-gray-800 mb-3">🔒 Ещё можно получить</h3>
          <div className="space-y-2">
            {lockedBadges.map((b) => (
              <div key={b.id} className="kid-card p-4 flex items-center gap-4 opacity-50">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 bg-gray-100">
                  {b.icon}
                </div>
                <div className="flex-1">
                  <div className="font-black text-gray-600">{b.title}</div>
                  <div className="text-xs text-gray-400">{b.desc}</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-300 text-xl">🔒</div>
                  {b.xp > 0 && <div className="text-xs text-gray-300 font-bold">+{b.xp} XP</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="kid-card p-5">
        <div className="font-black text-gray-800 mb-3">📊 Моя статистика</div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: "🎮", label: "Игр", value: xpState.totalGames, color: "#7C3AED", bg: "#EDE9FE" },
            { icon: "📖", label: "Уроков", value: xpState.totalLessons, color: "#EC4899", bg: "#FCE7F3" },
            { icon: "⚡", label: "Серия", value: xpState.correctStreak, color: "#F97316", bg: "#FFEDD5" },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl p-3 text-center" style={{ background: s.bg }}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs font-semibold" style={{ color: s.color }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
