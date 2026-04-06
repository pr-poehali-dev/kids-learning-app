import { useState } from "react";

const ROUNDS = [
  { question: "Найди КРАСНЫЙ", emoji: "🔴", target: "red", options: [
    { emoji: "🔵", color: "blue", label: "Синий" },
    { emoji: "🟡", color: "yellow", label: "Жёлтый" },
    { emoji: "🔴", color: "red", label: "Красный" },
    { emoji: "🟢", color: "green", label: "Зелёный" },
  ]},
  { question: "Найди КРУГ", emoji: "⭕", target: "circle", options: [
    { emoji: "🔺", color: "triangle", label: "Треугольник" },
    { emoji: "⬛", color: "square", label: "Квадрат" },
    { emoji: "⭕", color: "circle", label: "Круг" },
    { emoji: "💠", color: "diamond", label: "Ромб" },
  ]},
  { question: "Найди ЖЁЛТЫЙ", emoji: "🟡", target: "yellow", options: [
    { emoji: "🟡", color: "yellow", label: "Жёлтый" },
    { emoji: "🟣", color: "purple", label: "Фиолетовый" },
    { emoji: "🟤", color: "brown", label: "Коричневый" },
    { emoji: "⚫", color: "black", label: "Чёрный" },
  ]},
  { question: "Найди БОЛЬШОЙ", emoji: "🐘", target: "big", options: [
    { emoji: "🐭", color: "small", label: "Маленький" },
    { emoji: "🐘", color: "big", label: "Большой" },
    { emoji: "🐝", color: "tiny", label: "Крошечный" },
    { emoji: "🐇", color: "medium", label: "Средний" },
  ]},
  { question: "Найди СИНИЙ", emoji: "🔵", target: "blue", options: [
    { emoji: "🟠", color: "orange", label: "Оранжевый" },
    { emoji: "🔵", color: "blue", label: "Синий" },
    { emoji: "🟢", color: "green", label: "Зелёный" },
    { emoji: "⚪", color: "white", label: "Белый" },
  ]},
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

interface Props { onBack: () => void; }

export function GameColorsShapes({ onBack }: Props) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [shuffledOptions] = useState(() => ROUNDS.map(r => shuffle(r.options)));

  const round = ROUNDS[idx];

  const pick = (color: string) => {
    if (picked) return;
    setPicked(color);
    if (color === round.target) setScore(s => s + 1);
  };

  const next = () => {
    if (idx + 1 >= ROUNDS.length) { setFinished(true); return; }
    setIdx(i => i + 1);
    setPicked(null);
  };

  if (finished) return (
    <div className="space-y-4 anim-slide-up">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 font-bold active:scale-95 transition-all">←</button>
        <div className="font-black text-gray-800">Цвета и формы</div>
      </div>
      <div className="kid-card p-8 text-center anim-pop-in" style={{ background: "linear-gradient(135deg, #3B82F6, #7C3AED)" }}>
        <div className="text-6xl mb-3">🌈</div>
        <div className="text-white font-black text-2xl">Молодец!</div>
        <div className="text-blue-100 text-lg mt-2">{score} из {ROUNDS.length} правильно</div>
        <button onClick={onBack} className="mt-4 kid-btn py-2 px-6" style={{ background: "white", color: "#3B82F6" }}>Назад</button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 anim-slide-up">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 font-bold active:scale-95 transition-all">←</button>
        <div>
          <div className="font-black text-gray-800">Цвета и формы</div>
          <div className="text-xs text-gray-400">Вопрос {idx + 1} из {ROUNDS.length} · ⭐ {score}</div>
        </div>
      </div>

      <div className="kid-card p-6 text-center">
        <div className="text-7xl mb-3">{round.emoji}</div>
        <div className="font-black text-xl text-gray-800">{round.question}</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {shuffledOptions[idx].map((opt) => {
          const isTarget = opt.color === round.target;
          const isPicked = opt.color === picked;
          return (
            <button
              key={opt.color}
              onClick={() => pick(opt.color)}
              className={`p-5 rounded-3xl flex flex-col items-center gap-2 font-black text-sm transition-all active:scale-95 border-2 ${
                !picked ? "bg-white border-gray-100 hover:border-blue-300 hover:bg-blue-50"
                : isPicked && isTarget ? "bg-green-100 border-green-500 text-green-700"
                : isPicked && !isTarget ? "bg-red-100 border-red-400 text-red-600"
                : isTarget ? "bg-green-50 border-green-300 text-green-600"
                : "bg-gray-50 border-gray-200 text-gray-400"
              }`}
            >
              <span className="text-4xl">{opt.emoji}</span>
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>

      {picked && (
        <button onClick={next} className="w-full kid-btn py-3 anim-pop-in"
          style={{ background: picked === round.target ? "#22C55E" : "#7C3AED" }}>
          {idx + 1 >= ROUNDS.length ? "Завершить 🏁" : "Следующий →"}
        </button>
      )}
    </div>
  );
}
