import { useState } from "react";
import { StarRating } from "@/components/shared/MascotCharacter";

const GAMES = [
  { id: 1, icon: "🎴", title: "Найди пару", desc: "Соедини одинаковые карточки", color: "#7C3AED", stars: 3 },
  { id: 2, icon: "🔤", title: "Собери слово", desc: "Перетащи буквы по порядку", color: "#EC4899", stars: 2 },
  { id: 3, icon: "🖼️", title: "Что на картинке?", desc: "Назови то, что видишь", color: "#F97316", stars: 1 },
  { id: 4, icon: "🌈", title: "Цвета и формы", desc: "Развиваем логику и память", color: "#3B82F6", stars: 0 },
  { id: 5, icon: "🧩", title: "Пазл-слово", desc: "Собери картинку из букв", color: "#22C55E", stars: 0 },
  { id: 6, icon: "🎙️", title: "Повтори звук", desc: "Тренируем произношение", color: "#06B6D4", stars: 0 },
];

export function TabGames() {
  const [flipped, setFlipped] = useState<number | null>(null);
  const [played, setPlayed] = useState<number[]>([1, 2, 3]);

  return (
    <div className="space-y-5">
      <div className="kid-card p-5" style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-black text-xl">Игровая комната</div>
            <div className="text-purple-200 text-sm mt-1">6 игр доступно</div>
          </div>
          <div className="tex-5xl anim-wiggle">🎮</div>
        </div>
        <div className="flex gap-2 mt-4">
          <div className="bg-white/20 rounded-2xl px-3 py-1 text-white text-xs font-bold">🧠 Память</div>
          <div className="bg-white/20 rounded-2xl px-3 py-1 text-white text-xs font-bold">🗣 Речь</div>
          <div className="bg-white/20 rounded-2xl px-3 py-1 text-white text-xs font-bold">🔤 Буквы</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {GAMES.map((game, idx) => {
          const isPlayed = played.includes(game.id);
          return (
            <div
              key={game.id}
              className="kid-card p-4 relative overflow-hidden"
              style={{ animationDelay: `${idx * 0.1}s` }}
              onClick={() => setFlipped(flipped === game.id ? null : game.id)}
            >
              <div
                className="absolute top-0 right-0 w-16 h-16 rounded-full opacity-10 -translate-y-4 translate-x-4"
                style={{ background: game.color }}
              />
              <div className="text-3xl mb-2">{game.icon}</div>
              <div className="font-black text-gray-800 text-sm">{game.title}</div>
              <div className="text-xs text-gray-400 mt-0.5 mb-2">{game.desc}</div>
              {isPlayed ? (
                <StarRating stars={game.stars} />
              ) : (
                <div
                  className="kid-btn text-xs py-1.5 px-3 inline-block mt-1"
                  style={{ background: game.color }}
                >
                  Играть
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="kid-card p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-3xl anim-float">🧠</div>
          <div>
            <div className="font-black text-gray-800">Адаптивный режим</div>
            <div className="text-xs text-gray-400">Подстраивается под твой темп</div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 rounded-2xl p-3 text-center" style={{ background: "#EDE9FE" }}>
            <div className="text-2xl font-black text-purple-700">85%</div>
            <div className="text-xs text-purple-500 font-semibold">Точность</div>
          </div>
          <div className="flex-1 rounded-2xl p-3 text-center" style={{ background: "#FCE7F3" }}>
            <div className="text-2xl font-black text-pink-600">12</div>
            <div className="text-xs text-pink-400 font-semibold">Сессии</div>
          </div>
          <div className="flex-1 rounded-2xl p-3 text-center" style={{ background: "#DCFCE7" }}>
            <div className="text-2xl font-black text-green-600">Лёгкий</div>
            <div className="text-xs text-green-500 font-semibold">Уровень</div>
          </div>
        </div>
      </div>
    </div>
  );
}
