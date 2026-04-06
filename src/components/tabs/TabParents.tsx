import { useState } from "react";

const CHILDREN = [
  { name: "Маша", age: 5, avatar: "👧", level: 3, stars: 47, streak: 3, weekDays: [true, true, true, false, false, false, false] },
  { name: "Петя", age: 6, avatar: "👦", level: 5, stars: 83, streak: 7, weekDays: [true, true, true, true, true, true, true] },
];

const WEEK_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export function TabParents() {
  const [activeChild, setActiveChild] = useState(0);
  const child = CHILDREN[activeChild];

  return (
    <div className="space-y-5">
      <div className="kid-card p-5" style={{ background: "linear-gradient(135deg, #1E1B4B, #312E81)" }}>
        <div className="text-white font-black text-xl mb-1">Панель родителей</div>
        <div className="text-indigo-300 text-sm">Следи за прогрессом ребёнка</div>
        <div className="flex gap-2 mt-4">
          {CHILDREN.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveChild(i)}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2 transition-all font-bold text-sm ${activeChild === i ? "bg-white text-indigo-800" : "bg-white/15 text-white"}`}
            >
              <span>{c.avatar}</span> {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: "🎯", label: "Уровень", value: child.level, color: "#7C3AED", bg: "#EDE9FE" },
          { icon: "⭐", label: "Звёзды", value: child.stars, color: "#EAB308", bg: "#FEF9C3" },
          { icon: "🔥", label: "Серия дней", value: child.streak, color: "#F97316", bg: "#FFEDD5" },
        ].map((stat, i) => (
          <div key={i} className="kid-card p-4 text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs text-gray-400 font-semibold mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="kid-card p-5">
        <div className="font-black text-gray-800 mb-3">Активность на этой неделе</div>
        <div className="flex gap-2 justify-between">
          {WEEK_DAYS.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center text-sm font-bold transition-all ${child.weekDays[i] ? "text-white shadow-md" : "bg-gray-100 text-gray-300"}`}
                style={child.weekDays[i] ? { background: "linear-gradient(135deg, #7C3AED, #EC4899)" } : {}}
              >
                {child.weekDays[i] ? "✓" : "–"}
              </div>
              <span className="text-xs text-gray-400 font-semibold">{day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="kid-card p-5">
        <div className="font-black text-gray-800 mb-3">Прогресс по разделам</div>
        <div className="space-y-4">
          {[
            { name: "Чтение", icon: "📖", progress: 75, color: "#7C3AED" },
            { name: "Речь", icon: "🗣️", progress: 50, color: "#EC4899" },
            { name: "Письмо", icon: "✏️", progress: 30, color: "#3B82F6" },
            { name: "Игры", icon: "🎮", progress: 60, color: "#F97316" },
          ].map((s, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <span>{s.icon}</span> {s.name}
                </span>
                <span className="text-xs font-bold" style={{ color: s.color }}>{s.progress}%</span>
              </div>
              <div className="progress-bar-wrap h-3">
                <div className="progress-fill" style={{ width: `${s.progress}%`, background: s.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="kid-card p-5">
        <div className="font-black text-gray-800 mb-3">Рекомендации</div>
        <div className="space-y-3">
          {[
            { icon: "💡", text: "Позанимайтесь речью — Маша делает успехи!", color: "#EAB308" },
            { icon: "⏰", text: "Лучшее время для уроков — 10:00–11:30", color: "#3B82F6" },
            { icon: "🎉", text: "Маша прошла 3 урока подряд — похвалите!", color: "#22C55E" },
          ].map((rec, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0 mt-0.5"
                style={{ background: `${rec.color}22` }}
              >
                {rec.icon}
              </div>
              <span className="text-sm text-gray-600 font-medium">{rec.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
