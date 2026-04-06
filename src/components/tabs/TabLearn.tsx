import { useState } from "react";
import { MascotCharacter } from "@/components/shared/MascotCharacter";

const LESSONS = [
  { id: 1, icon: "📖", title: "Буква А", subtitle: "Азбука", color: "#7C3AED", bgColor: "#EDE9FE", progress: 100, level: 1 },
  { id: 2, icon: "📚", title: "Буква Б", subtitle: "Азбука", color: "#EC4899", bgColor: "#FCE7F3", progress: 75, level: 2 },
  { id: 3, icon: "🗣️", title: "Звук «МА»", subtitle: "Речь", color: "#F97316", bgColor: "#FFEDD5", progress: 40, level: 3 },
  { id: 4, icon: "✏️", title: "Пиши вместе", subtitle: "Письмо", color: "#3B82F6", bgColor: "#DBEAFE", progress: 0, level: 4 },
  { id: 5, icon: "🎵", title: "Стихи и ритм", subtitle: "Речь", color: "#22C55E", bgColor: "#DCFCE7", progress: 0, level: 5 },
  { id: 6, icon: "💬", title: "Первые слова", subtitle: "Слова", color: "#06B6D4", bgColor: "#CFFAFE", progress: 0, level: 6 },
];

export function TabLearn() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <MascotCharacter />
        <div>
          <h2 className="text-2xl font-black text-purple-800">Привет, Маша! 👋</h2>
          <p className="text-purple-500 font-semibold">Продолжай учиться!</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-orange-500 font-bold text-sm">🔥 3 дня подряд!</span>
            <span className="bg-yellow-100 text-yellow-700 rounded-full px-2 py-0.5 text-xs font-bold">⭐ 47 звёзд</span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-bold text-purple-600">Уровень 3 из 6</span>
          <span className="text-xs text-gray-400">75%</span>
        </div>
        <div className="progress-bar-wrap">
          <div className="progress-fill" style={{ width: "75%" }} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-black text-gray-800 mb-3">Уроки</h3>
        <div className="grid grid-cols-2 gap-3">
          {LESSONS.map((lesson, idx) => {
            const isLocked = lesson.progress === 0 && idx > 2;
            return (
              <div
                key={lesson.id}
                className={`kid-card p-4 ${isLocked ? "opacity-50" : ""}`}
                style={{ animationDelay: `${idx * 0.08}s` }}
                onClick={() => !isLocked && setSelected(lesson.id)}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-2"
                  style={{ background: lesson.bgColor }}
                >
                  {lesson.icon}
                </div>
                <div className="font-black text-gray-800 text-sm">{lesson.title}</div>
                <div className="text-xs text-gray-400 mb-2">{lesson.subtitle}</div>
                {lesson.progress > 0 && (
                  <div className="progress-bar-wrap h-2">
                    <div className="progress-fill h-full" style={{ width: `${lesson.progress}%`, background: lesson.color }} />
                  </div>
                )}
                {isLocked && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-gray-400 text-xs">🔒 Закрыто</span>
                  </div>
                )}
                {lesson.progress === 100 && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-green-500 text-xs font-bold">✅ Готово!</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-black text-gray-800 mb-3">Путь героя</h3>
        <div className="kid-card p-5">
          <div className="flex items-center justify-between">
            {LESSONS.map((l, i) => (
              <div key={l.id} className="flex items-center">
                <div className={`level-dot ${l.progress === 100 ? "done" : l.progress > 0 ? "current" : "locked"}`}>
                  {l.progress === 100 ? "✓" : l.level}
                </div>
                {i < LESSONS.length - 1 && (
                  <div className={`h-1 w-6 mx-1 rounded-full ${l.progress === 100 ? "bg-green-400" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
