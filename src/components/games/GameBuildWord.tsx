import { useState, useCallback } from "react";
import { getRandomWords } from "@/data/gameData";

interface Props { onBack: () => void; }

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function GameBuildWord({ onBack }: Props) {
  const [words] = useState(() => getRandomWords(8));
  const [wordIdx, setWordIdx] = useState(0);
  const [placed, setPlaced] = useState<(string | null)[]>(() => new Array(getRandomWords(8)[0]?.word.length || 3).fill(null));
  const [shuffled, setShuffled] = useState<string[]>(() => {
    const ws = getRandomWords(8);
    return shuffle(ws[0].word.split(""));
  });
  const [done, setDone] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const current = words[wordIdx];

  const initWord = useCallback((idx: number) => {
    const w = words[idx].word.split("");
    setShuffled(shuffle(w));
    setPlaced(new Array(w.length).fill(null));
    setDone(false);
    setWrong(false);
  }, [words]);

  const placeLetter = (letter: string, fromIdx: number) => {
    if (done || wrong) return;
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
        setScore(s => s + 1);
        setDone(true);
      } else {
        setAttempts(a => a + 1);
        setWrong(true);
        setTimeout(() => initWord(wordIdx), 1200);
      }
    }
  };

  const removeFromSlot = (slotIdx: number) => {
    const letter = placed[slotIdx];
    if (!letter || done) return;
    const newPlaced = [...placed];
    newPlaced[slotIdx] = null;
    setShuffled((prev) => [...prev, letter]);
    setPlaced(newPlaced);
    setWrong(false);
  };

  const nextWord = () => {
    if (wordIdx + 1 >= words.length) {
      onBack();
      return;
    }
    const next = wordIdx + 1;
    setWordIdx(next);
    initWord(next);
  };

  const letters = current.word.split("");

  return (
    <div className="space-y-4 anim-slide-up">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 font-bold active:scale-95 transition-all">←</button>
        <div>
          <div className="font-black text-gray-800">Собери слово</div>
          <div className="text-xs text-gray-400">Слово {wordIdx + 1} из {words.length}</div>
        </div>
        <div className="ml-auto">
          <span className="text-xs bg-yellow-100 text-yellow-700 rounded-xl px-2 py-1 font-black">⭐ {score}</span>
        </div>
      </div>

      <div className="kid-card p-5 text-center">
        <div className="text-6xl mb-2 anim-bounce-slow">{current.emoji}</div>
        <div className="text-sm text-gray-400 font-semibold">{current.hint}</div>
        <div className="text-xs text-gray-300 mt-1">{letters.length} букв</div>
      </div>

      {/* Slots */}
      <div className="flex gap-2 justify-center flex-wrap">
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
            {wordIdx + 1 >= words.length ? "Завершить 🏁" : "Следующее слово →"}
          </button>
        </div>
      ) : wrong ? (
        <div className="bg-red-50 rounded-2xl p-3 text-center text-red-500 font-bold text-sm">
          Не то! Попробуй снова 💪 (попытка {attempts})
        </div>
      ) : null}

      {/* Letter tiles */}
      {!done && (
        <div>
          <div className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-2">Нажми на букву чтобы поставить</div>
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
      )}
    </div>
  );
}
