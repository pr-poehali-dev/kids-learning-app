import { useState } from "react";
import { type Profile } from "@/hooks/useProfile";

const WEEK_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

interface Props {
  profile: Profile;
  onExit: () => void;
}

const DEMO_CHILDREN = [
  { name: "Маша", avatar: "🦊", level: 3, stars: 47, streak: 3, weekDays: [true, true, true, false, false, false, false], accuracy: 85, sessions: 12 },
  { name: "Петя", avatar: "🐶", level: 5, stars: 83, streak: 7, weekDays: [true, true, true, true, true, true, true], accuracy: 92, sessions: 21 },
];

const SECTIONS = [
  { name: "Чтение", icon: "📖", progress: 75, color: "#7C3AED" },
  { name: "Речь", icon: "🗣️", progress: 50, color: "#EC4899" },
  { name: "Письмо", icon: "✏️", progress: 30, color: "#3B82F6" },
  { name: "Игры", icon: "🎮", progress: 60, color: "#F97316" },
];

export function ParentsDashboard({ profile, onExit }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const child = DEMO_CHILDREN[activeIdx];

  return (
    <div className="min-h-screen font-nunito" style={{ background: "linear-gradient(160deg, #1E1B4B 0%, #312E81 40%, #1e3a5f 100%)" }}>
      <div className="max-w-md mx-auto min-h-screen flex flex-col">

        {/* Header */}
        <header className="px-5 pt-8 pb-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-1">Панель родителей</div>
              <div className="text-white font-black text-2xl">TW 📊</div>
            </div>
            <button
              onClick={onExit}
              className="bg-white/15 hover:bg-white/25 transition-all rounded-2xl px-4 py-2 text-white font-bold text-sm active:scale-95"
            >
              ← Выйти
            </button>
          </div>

          {/* Child selector */}
          <div className="flex gap-2 mt-5">
            {DEMO_CHILDREN.map((c, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 font-bold text-sm transition-all active:scale-95 ${
                  activeIdx === i ? "bg-white text-indigo-800" : "bg-white/15 text-white"
                }`}
              >
                <span className="text-lg">{c.avatar}</span> {c.name}
              </button>
            ))}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-4 pb-8 space-y-4 overflow-y-auto">

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: "🎯", label: "Уровень", value: child.level, color: "#a78bfa" },
              { icon: "⭐", label: "Звёзды", value: child.stars, color: "#fbbf24" },
              { icon: "🔥", label: "Дней подряд", value: child.streak, color: "#fb923c" },
            ].map((s, i) => (
              <div key={i} className="rounded-3xl p-4 text-center" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
                <div className="text-indigo-300 text-xs font-semibold mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Accuracy + sessions */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-3xl p-4 text-center" style={{ background: "rgba(255,255,255,0.08)" }}>
              <div className="text-3xl font-black text-green-400">{child.accuracy}%</div>
              <div className="text-indigo-300 text-xs font-semibold mt-1">Точность ответов</div>
            </div>
            <div className="rounded-3xl p-4 text-center" style={{ background: "rgba(255,255,255,0.08)" }}>
              <div className="text-3xl font-black text-blue-300">{child.sessions}</div>
              <div className="text-indigo-300 text-xs font-semibold mt-1">Всего сессий</div>
            </div>
          </div>

          {/* Weekly activity */}
          <div className="rounded-3xl p-5" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div className="text-white font-black mb-4">Активность на неделе</div>
            <div className="flex justify-between">
              {WEEK_DAYS.map((day, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center text-sm font-bold transition-all ${
                      child.weekDays[i] ? "text-white" : "text-white/20"
                    }`}
                    style={child.weekDays[i] ? { background: "linear-gradient(135deg, #7C3AED, #EC4899)" } : { background: "rgba(255,255,255,0.07)" }}
                  >
                    {child.weekDays[i] ? "✓" : "–"}
                  </div>
                  <span className="text-xs text-indigo-400 font-semibold">{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress by section */}
          <div className="rounded-3xl p-5" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div className="text-white font-black mb-4">Прогресс по разделам</div>
            <div className="space-y-4">
              {SECTIONS.map((s, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="flex items-center gap-2 text-sm font-bold text-white/80">
                      <span>{s.icon}</span>{s.name}
                    </span>
                    <span className="text-xs font-bold" style={{ color: s.color }}>{s.progress}%</span>
                  </div>
                  <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${s.progress}%`, background: s.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="rounded-3xl p-5" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div className="text-white font-black mb-4">💡 Рекомендации</div>
            <div className="space-y-3">
              {[
                { icon: "🗣️", text: `Поработайте над разделом «Речь» — у ${child.name} хороший потенциал!`, color: "#EC4899" },
                { icon: "⏰", text: "Лучшее время для занятий — утро 10:00–11:30", color: "#3B82F6" },
                { icon: "🎉", text: `${child.name} занимается ${child.streak} дней подряд — похвалите!`, color: "#22C55E" },
              ].map((r, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0 mt-0.5"
                    style={{ background: `${r.color}33` }}
                  >
                    {r.icon}
                  </div>
                  <span className="text-sm text-white/70 font-medium">{r.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Levels system */}
          <div className="rounded-3xl p-5" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div className="text-white font-black mb-4">🏆 Система уровней</div>
            <div className="space-y-2">
              {[
                { name: "🌱 Росток", xp: "0–50 очков", done: true },
                { name: "🌻 Цветок", xp: "51–150 очков", done: true },
                { name: "🦋 Бабочка", xp: "151–300 очков", current: true },
                { name: "🦅 Орёл", xp: "301–500 очков", done: false },
                { name: "🚀 Ракета", xp: "500+ очков", done: false },
              ].map((lvl, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-3 rounded-2xl ${
                    lvl.done ? "bg-green-900/30" : lvl.current ? "bg-purple-900/40" : "bg-white/5"
                  }`}
                >
                  <div className={`font-bold text-sm ${lvl.done ? "text-green-400" : lvl.current ? "text-purple-300" : "text-white/30"}`}>
                    {lvl.name}
                  </div>
                  <div className={`text-xs ${lvl.done ? "text-green-500" : lvl.current ? "text-purple-400" : "text-white/20"}`}>
                    {lvl.xp}
                  </div>
                  {lvl.current && <div className="text-purple-400 text-xs font-bold ml-2">← здесь</div>}
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}