import { useState } from "react";

const WORDS = [
  { word: "КОТ", emoji: "🐱", hint: "Животное, которое мурчит" },
  { word: "ДОМ", emoji: "🏠", hint: "Где живёт семья" },
  { word: "МАК", emoji: "🌺", hint: "Красный цветок" },
  { word: "СОН", emoji: "😴", hint: "Когда ты спишь" },
];

interface Props { onBack: () => void; }

export function GameBuildWord({ onBack }: Props) {
  const [wordIdx, setWordIdx] = useState(0);
  const [placed, setPlaced] = useState<(string | null)[]>([]);
  const [shuffled, setShuffled] = useState<string[]>(() => {
    const w = WORDS[0].word.split("");
    return [...w].sort(() => Math.random() - 0.5);
  });
  const [done, setDone] = useState(false);
  const [wrong, setWrong] = useState(false);

  const current = WORDS[wordIdx];
  const letters = current.word.split("");

  const initWord = (idx: number) => {
    const w = WORDS[idx].word.split("");
    setShuffled([...w].sort(() => Math.random() - 0.5));
    setPlaced(new Array(w.length).fill(null));
    setDone(false);
    setWrong(false);
  };

  const placeLetter = (letter: string, fromIdx: number) => {
    const emptySlot = placed.findIndex((s) => s === null);
    if (emptySlot === -1) return;
    const newPlaced = [...placed];
    newPlaced[emptySlot] = letter;
    const newShuffled = [...shuffled];
    newShuffled.splice(fromIdx, 1);
    setShuffled(newShuffled);
    setPlaced(newPlaced);

    if (newShuffled.length === 0) {
      const result = newPlaced.join("");
      if (result === current.word) {
        setDone(true);
      } else {
        setWrong(true);
        setTimeout(() => {
          initWord(wordIdx);
        }, 1200);
      }
    }
  };

  const removeFromSlot = (slotIdx: number) => {
    const letter = placed[slotIdx];
    if (!letter) return;
    const newPlaced = [...placed];
    newPlaced[slotIdx] = null;
    setShuffled((prev) => [...prev, letter]);
    setPlaced(newPlaced);
    setWrong(false);
  };

  const nextWord = () => {
    const next = (wordIdx + 1) % WORDS.length;
    setWordIdx(next);
    initWord(next);
  };

  return (
    <div className="space-y-4 anim-slide-up">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 font-bold active:scale-95 transition-all">←</button>
        <div>
          <div className="font-black text-gray-800">Собери слово</div>
          <div className="text-xs text-gray-400">Слово {wordIdx + 1} из {WORDS.length}</div>
        </div>
      </div>

      <div className="kid-card p-5 text-center">
        <div className="text-6xl mb-2">{current.emoji}</div>
        <div className="text-sm text-gray-400 font-semibold">{current.hint}</div>
      </div>

      {/* Slots */}
      <div className="flex gap-2 justify-center">
        {letters.map((_, i) => {
          const letter = placed[i];
          return (
            <button
              key={i}
              onClick={() => letter && removeFromSlot(i)}
              className={`w-12 h-12 rounded-2xl border-2 border-dashed flex items-center justify-center font-black text-lg transition-all ${
                done
                  ? "bg-green-100 border-green-400 text-green-700"
                  : wrong
                  ? "bg-red-100 border-red-400 text-red-600"
                  : letter
                  ? "bg-purple-100 border-purple-400 text-purple-700"
                  : "bg-gray-50 border-gray-300 text-gray-300"
              }`}
            >
              {letter ?? "?"}
            </button>
          );
        })}
      </div>

      {done ? (
        <div className="kid-card p-4 text-center anim-pop-in" style={{ background: "linear-gradient(135deg, #22C55E, #16A34A)" }}>
          <div className="text-3xl mb-1 anim-wiggle">🎉</div>
          <div className="text-white font-black">Правильно! {current.word}</div>
          <button onClick={nextWord} className="mt-3 kid-btn py-2 px-5 text-sm" style={{ background: "white", color: "#16A34A" }}>
            Следующее слово →
          </button>
        </div>
      ) : wrong ? (
        <div className="bg-red-50 rounded-2xl p-3 text-center text-red-500 font-bold text-sm">
          Попробуй снова! 💪
        </div>
      ) : null}

      {/* Letter tiles */}
      <div>
        <div className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-2">Буквы — нажми, чтобы поставить</div>
        <div className="flex flex-wrap gap-2 justify-center">
          {shuffled.map((letter, i) => (
            <button
              key={i}
              onClick={() => placeLetter(letter, i)}
              className="w-12 h-12 rounded-2xl bg-white border-2 border-purple-200 font-black text-purple-700 text-lg transition-all active:scale-90 hover:border-purple-400 hover:bg-purple-50"
              style={{ boxShadow: "0 4px 0 #c4b5fd" }}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
