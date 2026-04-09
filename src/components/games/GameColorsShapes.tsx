import { useState } from "react";
import { getRandomColorRounds } from "@/data/gameData";

interface Props { onBack: () => void; }

export function GameColorsShapes({ onBack }: Props) {
  const [rounds] = useState(() => getRandomColorRounds(6));
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const round = rounds[idx];

  const pick = (color: string) => {
    if (picked) return;
    setPicked(color);
    if (color === round.target) setScore(s => s + 1);
  };

  const next = () => {
    if (idx + 1 >= rounds.length) { setFinished(true); return; }
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
        <div className="text-blue-100 text-lg mt-2">{score} из {rounds.length} правильно</div>
        <div className="flex gap-3 mt-4 justify-center">
          <button onClick={() => { setIdx(0); setPicked(null); setScore(0); setFinished(false); }} className="kid-btn py-2 px-5" style={{ background: "white", color: "#3B82F6" }}>Ещё раз!</button>
          <button onClick={onBack} className="py-2 px-4 rounded-2xl bg-white/20 text-white font-bold text-sm">Назад</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 anim-slide-up">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 font-bold active:scale-95 transition-all">←</button>
        <div>
          <div className="font-black text-gray-800">Цвета и формы</div>
          <div className="text-xs text-gray-400">Вопрос {idx + 1} из {rounds.length} · ⭐ {score}</div>
        </div>
      </div>

      {/* Progress */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(idx / rounds.length) * 100}%`, background: "linear-gradient(90deg,#3B82F6,#7C3AED)" }} />
      </div>

      <div className="kid-card p-6 text-center">
        <div className="text-7xl mb-3 anim-bounce-slow">{round.emoji}</div>
        <div className="font-black text-xl text-gray-800">{round.question}</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {round.options.map((opt) => {
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
          {idx + 1 >= rounds.length ? "Завершить 🏁" : "Следующий →"}
        </button>
      )}
    </div>
  );
}
