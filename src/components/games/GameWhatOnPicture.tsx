import { useState } from "react";

const QUESTIONS = [
  { emoji: "🐱", answer: "КОТ", options: ["КОТ", "СОБАКА", "ПТИЦА", "РЫБА"] },
  { emoji: "🌳", answer: "ДЕРЕВО", options: ["ЦВЕТОК", "ДЕРЕВО", "ГРИБ", "ТРАВА"] },
  { emoji: "🚗", answer: "МАШИНА", options: ["САМОЛЁТ", "КОРАБЛЬ", "МАШИНА", "ПОЕЗД"] },
  { emoji: "🍎", answer: "ЯБЛОКО", options: ["ГРУША", "БАНАН", "ЯБЛОКО", "АПЕЛЬСИН"] },
  { emoji: "🏠", answer: "ДОМ", options: ["ДОМ", "ШКОЛА", "МАГАЗИН", "БОЛЬНИЦА"] },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

interface Props { onBack: () => void; }

export function GameWhatOnPicture({ onBack }: Props) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [options] = useState(() => QUESTIONS.map((q) => shuffle(q.options)));

  const q = QUESTIONS[idx];
  const isCorrect = picked === q.answer;

  const pick = (opt: string) => {
    if (picked) return;
    setPicked(opt);
    if (opt === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= QUESTIONS.length) {
      setFinished(true);
    } else {
      setIdx((i) => i + 1);
      setPicked(null);
    }
  };

  if (finished) {
    return (
      <div className="space-y-4 anim-slide-up">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-9 h-9 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 font-bold active:scale-95 transition-all">←</button>
          <div className="font-black text-gray-800">Что на картинке?</div>
        </div>
        <div className="kid-card p-8 text-center anim-pop-in" style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}>
          <div className="text-6xl mb-3">🏆</div>
          <div className="text-white font-black text-2xl">Игра окончена!</div>
          <div className="text-purple-200 text-lg mt-2">{score} из {QUESTIONS.length} правильно</div>
          <div className="flex gap-2 mt-4 justify-center">
            <button onClick={onBack} className="kid-btn py-2 px-5 text-sm" style={{ background: "white", color: "#7C3AED" }}>
              Назад
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 anim-slide-up">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 font-bold active:scale-95 transition-all">←</button>
        <div>
          <div className="font-black text-gray-800">Что на картинке?</div>
          <div className="text-xs text-gray-400">Вопрос {idx + 1} из {QUESTIONS.length} • ⭐ {score}</div>
        </div>
      </div>

      <div className="kid-card p-8 text-center">
        <div className="text-8xl">{q.emoji}</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {options[idx].map((opt) => {
          const isThis = opt === q.answer;
          const isPicked = opt === picked;
          return (
            <button
              key={opt}
              onClick={() => pick(opt)}
              className={`p-4 rounded-2xl font-black text-sm transition-all active:scale-95 border-2 ${
                !picked
                  ? "bg-white border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50"
                  : isPicked && isThis
                  ? "bg-green-100 border-green-500 text-green-700"
                  : isPicked && !isThis
                  ? "bg-red-100 border-red-400 text-red-600"
                  : isThis
                  ? "bg-green-50 border-green-400 text-green-600"
                  : "bg-gray-50 border-gray-200 text-gray-400"
              }`}
            >
              {isPicked && isThis && "✅ "}
              {isPicked && !isThis && "❌ "}
              {opt}
            </button>
          );
        })}
      </div>

      {picked && (
        <div className="anim-pop-in">
          <button
            onClick={next}
            className="w-full kid-btn py-3"
            style={{ background: isCorrect ? "#22C55E" : "#7C3AED" }}
          >
            {idx + 1 >= QUESTIONS.length ? "Завершить 🏁" : "Следующий →"}
          </button>
        </div>
      )}
    </div>
  );
}
