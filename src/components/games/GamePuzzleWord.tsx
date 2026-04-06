import { useState } from "react";

const PUZZLES = [
  { word: "МАМА", emoji: "👩", clue: "Самый близкий человек" },
  { word: "ПАПА", emoji: "👨", clue: "Глава семьи" },
  { word: "ЛУНА", emoji: "🌙", clue: "Светит ночью" },
  { word: "РЕКА", emoji: "🏞️", clue: "Течёт между берегов" },
  { word: "ГРИБ", emoji: "🍄", clue: "Растёт в лесу" },
];

interface Props { onBack: () => void; }

export function GamePuzzleWord({ onBack }: Props) {
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const puzzle = PUZZLES[puzzleIdx];
  const masked = puzzle.word.split("").map((ch, i) => (i === 0 || i === puzzle.word.length - 1 ? ch : "_")).join(" ");

  const check = () => {
    const ans = input.trim().toUpperCase();
    if (ans === puzzle.word) {
      setStatus("correct");
      setScore(s => s + 1);
    } else {
      setStatus("wrong");
      setTimeout(() => { setStatus("idle"); setInput(""); }, 1000);
    }
  };

  const next = () => {
    if (puzzleIdx + 1 >= PUZZLES.length) { setFinished(true); return; }
    setPuzzleIdx(i => i + 1);
    setInput("");
    setStatus("idle");
    setShowHint(false);
  };

  if (finished) return (
    <div className="space-y-4 anim-slide-up">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 font-bold active:scale-95">←</button>
        <div className="font-black text-gray-800">Пазл-слово</div>
      </div>
      <div className="kid-card p-8 text-center anim-pop-in" style={{ background: "linear-gradient(135deg, #22C55E, #16A34A)" }}>
        <div className="text-6xl mb-3">🧩</div>
        <div className="text-white font-black text-2xl">Все слова найдены!</div>
        <div className="text-green-100 text-lg mt-2">{score} из {PUZZLES.length} с первой попытки</div>
        <button onClick={onBack} className="mt-4 kid-btn py-2 px-6" style={{ background: "white", color: "#16A34A" }}>Назад</button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 anim-slide-up">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 font-bold active:scale-95">←</button>
        <div>
          <div className="font-black text-gray-800">Пазл-слово</div>
          <div className="text-xs text-gray-400">Слово {puzzleIdx + 1} из {PUZZLES.length} · ⭐ {score}</div>
        </div>
      </div>

      <div className="kid-card p-6 text-center">
        <div className="text-7xl mb-3">{puzzle.emoji}</div>
        <div className="text-3xl font-black text-purple-700 tracking-widest mb-2">{masked}</div>
        <div className="text-sm text-gray-400 font-semibold">{puzzle.word.length} букв</div>
      </div>

      {showHint && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-3 text-sm text-yellow-700 font-semibold anim-pop-in">
          💡 Подсказка: {puzzle.clue}
        </div>
      )}

      {status === "correct" ? (
        <div className="kid-card p-4 text-center anim-pop-in" style={{ background: "linear-gradient(135deg, #22C55E, #16A34A)" }}>
          <div className="text-3xl mb-1">🎉</div>
          <div className="text-white font-black">Правильно! Слово: {puzzle.word}</div>
          <button onClick={next} className="mt-3 kid-btn py-2 px-5 text-sm" style={{ background: "white", color: "#16A34A" }}>
            {puzzleIdx + 1 >= PUZZLES.length ? "Завершить 🏁" : "Следующее →"}
          </button>
        </div>
      ) : (
        <>
          <div className={`kid-card p-4 ${status === "wrong" ? "border-2 border-red-300" : ""}`}>
            <input
              type="text"
              value={input}
              onChange={e => { setInput(e.target.value.toUpperCase()); setStatus("idle"); }}
              onKeyDown={e => e.key === "Enter" && check()}
              placeholder="Введи слово..."
              maxLength={puzzle.word.length + 2}
              className="w-full rounded-2xl border-2 border-purple-200 px-4 py-3 text-xl font-black text-gray-800 focus:outline-none focus:border-purple-500 transition-all bg-purple-50 placeholder:text-gray-300 text-center tracking-widest uppercase"
            />
            {status === "wrong" && (
              <div className="text-red-500 text-sm font-bold text-center mt-2">Не то! Попробуй ещё 💪</div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowHint(true)}
              className="flex-1 py-3 rounded-2xl bg-yellow-100 text-yellow-700 font-bold text-sm active:scale-95 transition-all"
            >
              💡 Подсказка
            </button>
            <button
              onClick={check}
              className="flex-1 kid-btn py-3"
              style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}
            >
              Проверить ✓
            </button>
          </div>
        </>
      )}
    </div>
  );
}
