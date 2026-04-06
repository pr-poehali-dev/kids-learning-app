import { useState } from "react";
import { ConfettiPiece } from "@/components/shared/MascotCharacter";

const ACHIEVEMENTS = [
  { id: 1, icon: "⭐", title: "Первый шаг", desc: "Пройти первый урок", color: "#EAB308", unlocked: true },
  { id: 2, icon: "🔥", title: "В огне!", desc: "3 дня подряд", color: "#F97316", unlocked: true },
  { id: 3, icon: "🎯", title: "Меткий стрелок", desc: "Ответить без ошибок", color: "#3B82F6", unlocked: true },
  { id: 4, icon: "🏆", title: "Чемпион", desc: "Набрать 100 очков", color: "#7C3AED", unlocked: false },
  { id: 5, icon: "🦉", title: "Умная сова", desc: "Пройти 5 уроков", color: "#EC4899", unlocked: false },
  { id: 6, icon: "🚀", title: "Космонавт", desc: "Открыть все игры", color: "#06B6D4", unlocked: false },
  { id: 7, icon: "💎", title: "Бриллиант", desc: "Набрать 500 очков", color: "#EC4899", unlocked: false },
  { id: 8, icon: "🌟", title: "Супер-звезда", desc: "Пройти все уровни", color: "#EAB308", unlocked: false },
];

const CONFETTI_COLORS = ["#7C3AED", "#EC4899", "#F97316", "#EAB308", "#22C55E", "#3B82F6"];
const CONFETTI_PIECES = Array.from({ length: 12 }, (_, i) => ({
  delay: i * 0.15,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  left: i * 8 + 5,
}));

export function TabAchievements() {
  const [celebrating, setCelebrating] = useState(false);

  return (
    <div className="space-y-5 relative">
      {celebrating && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {CONFETTI_PIECES.map((p, i) => (
            <ConfettiPiece key={i} {...p} />
          ))}
        </div>
      )}

      <div
        className="kid-card p-5 cursor-pointer"
        style={{ background: "linear-gradient(135deg, #EAB308, #F97316)" }}
        onClick={() => { setCelebrating(true); setTimeout(() => setCelebrating(false), 3000); }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-black text-xl">Мои трофеи</div>
            <div className="text-yellow-100 text-sm">3 из 8 получено</div>
          </div>
          <div className="text-5xl anim-bounce-slow">🏆</div>
        </div>
        <div className="flex gap-2 mt-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center text-lg">⭐</div>
          ))}
          {[4, 5].map(i => (
            <div key={i} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-lg opacity-40">⭐</div>
          ))}
        </div>
        <div className="text-white/70 text-xs mt-2">Нажми, чтобы отпраздновать! 🎉</div>
      </div>

      <div>
        <h3 className="text-lg font-black text-gray-800 mb-3">Все достижения</h3>
        <div className="space-y-3">
          {ACHIEVEMENTS.map((ach, idx) => (
            <div
              key={ach.id}
              className={`kid-card p-4 flex items-center gap-4 ${!ach.unlocked ? "achievement-locked" : ""}`}
              style={{ animationDelay: `${idx * 0.06}s` }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: ach.unlocked ? `${ach.color}22` : "#f3f4f6" }}
              >
                {ach.icon}
              </div>
              <div className="flex-1">
                <div className="font-black text-gray-800">{ach.title}</div>
                <div className="text-xs text-gray-400">{ach.desc}</div>
              </div>
              {ach.unlocked ? (
                <div className="text-green-500 text-xl">✅</div>
              ) : (
                <div className="text-gray-300 text-xl">🔒</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="kid-card p-5">
        <div className="font-black text-gray-800 mb-3">Система уровней</div>
        <div className="space-y-2">
          {[
            { name: "🌱 Росток", xp: "0–50 очков", done: true },
            { name: "🌻 Цветок", xp: "51–150 очков", done: true },
            { name: "🦋 Бабочка", xp: "151–300 очков", current: true },
            { name: "🦅 Орёл", xp: "301–500 очков", done: false },
            { name: "🚀 Ракета", xp: "500+ очков", done: false },
          ].map((lvl, i) => (
            <div key={i} className={`flex items-center justify-between p-3 rounded-2xl ${lvl.done ? "bg-green-50" : lvl.current ? "bg-purple-50" : "bg-gray-50"}`}>
              <div className={`font-bold text-sm ${lvl.done ? "text-green-700" : lvl.current ? "text-purple-700" : "text-gray-400"}`}>{lvl.name}</div>
              <div className={`text-xs ${lvl.done ? "text-green-500" : lvl.current ? "text-purple-500" : "text-gray-300"}`}>{lvl.xp}</div>
              {lvl.current && <div className="text-purple-600 text-xs font-bold ml-2">← Ты здесь</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
