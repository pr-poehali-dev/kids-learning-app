import { useState } from "react";

const SOUNDS = [
  { id: 1, letter: "А", word: "АРБУЗ", emoji: "🍉", phrase: "А как в слове АРБУЗ", example: ["А-рбуз", "А-пельсин", "А-ист"] },
  { id: 2, letter: "М", word: "МАМА", emoji: "👩", phrase: "М как в слове МАМА", example: ["М-ама", "М-яч", "М-едведь"] },
  { id: 3, letter: "С", word: "СОЛНЦЕ", emoji: "☀️", phrase: "С как в слове СОЛНЦЕ", example: ["С-олнце", "С-лон", "С-обака"] },
  { id: 4, letter: "Р", word: "РЫБА", emoji: "🐟", phrase: "Р как в слове РЫБА", example: ["Р-ыба", "Р-акета", "Р-озa"] },
  { id: 5, letter: "К", word: "КОТ", emoji: "🐱", phrase: "К как в слове КОТ", example: ["К-от", "К-нига", "К-уст"] },
];

function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ru-RU";
  u.rate = 0.75;
  u.pitch = 1.1;
  window.speechSynthesis.speak(u);
}

interface Props { onBack: () => void; }

export function GameRepeatSound({ onBack }: Props) {
  const [idx, setIdx] = useState(0);
  const [step, setStep] = useState<"listen" | "repeat" | "done">("listen");
  const [exIdx, setExIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const sound = SOUNDS[idx];

  const playSound = (text: string) => {
    setSpeaking(true);
    speak(text);
    setTimeout(() => setSpeaking(false), 2000);
  };

  const handleListen = () => {
    playSound(sound.phrase);
    setTimeout(() => setStep("repeat"), 2500);
  };

  const handleExample = (ex: string) => {
    playSound(ex);
    if (exIdx + 1 >= sound.example.length) {
      setTimeout(() => setStep("done"), 1500);
    } else {
      setExIdx(i => i + 1);
    }
  };

  const handleDone = () => {
    setScore(s => s + 1);
    if (idx + 1 >= SOUNDS.length) { setFinished(true); return; }
    setIdx(i => i + 1);
    setStep("listen");
    setExIdx(0);
  };

  if (finished) return (
    <div className="space-y-4 anim-slide-up">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 font-bold active:scale-95">←</button>
        <div className="font-black text-gray-800">Повтори звук</div>
      </div>
      <div className="kid-card p-8 text-center anim-pop-in" style={{ background: "linear-gradient(135deg, #06B6D4, #3B82F6)" }}>
        <div className="text-6xl mb-3">🎙️</div>
        <div className="text-white font-black text-2xl">Отличная работа!</div>
        <div className="text-blue-100 text-sm mt-2">Все звуки изучены</div>
        <button onClick={onBack} className="mt-4 kid-btn py-2 px-6" style={{ background: "white", color: "#06B6D4" }}>Назад</button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 anim-slide-up">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 font-bold active:scale-95">←</button>
        <div>
          <div className="font-black text-gray-800">Повтори звук</div>
          <div className="text-xs text-gray-400">Звук {idx + 1} из {SOUNDS.length}</div>
        </div>
      </div>

      {/* Sound card */}
      <div className="kid-card p-6 text-center" style={{ background: "linear-gradient(135deg, #06B6D4, #3B82F6)" }}>
        <div className="text-8xl mb-2">{sound.emoji}</div>
        <div className="text-white font-black text-5xl mb-1">{sound.letter}</div>
        <div className="text-blue-100 font-semibold text-sm">{sound.phrase}</div>
      </div>

      {step === "listen" && (
        <div className="space-y-3">
          <div className="bg-blue-50 rounded-2xl p-4 text-center text-blue-700 font-semibold text-sm">
            Нажми кнопку — послушай звук, потом повторяй!
          </div>
          <button
            onClick={handleListen}
            disabled={speaking}
            className={`w-full kid-btn py-4 text-lg transition-all ${speaking ? "opacity-70" : ""}`}
            style={{ background: "linear-gradient(135deg, #06B6D4, #3B82F6)" }}
          >
            {speaking ? "🔊 Слушаем..." : "🔊 Послушать звук"}
          </button>
        </div>
      )}

      {step === "repeat" && (
        <div className="space-y-3">
          <div className="bg-cyan-50 rounded-2xl p-4 text-center text-cyan-700 font-semibold text-sm">
            Нажми на слово — послушай как звучит, потом повтори вслух!
          </div>
          <div className="text-xs text-gray-400 font-bold uppercase tracking-wide text-center mb-1">
            Слово {exIdx + 1} из {sound.example.length}
          </div>
          <button
            onClick={() => handleExample(sound.example[exIdx])}
            disabled={speaking}
            className={`w-full kid-btn py-5 text-2xl font-black tracking-widest ${speaking ? "opacity-70" : ""}`}
            style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}
          >
            {speaking ? "🔊 ..." : sound.example[exIdx]}
          </button>
          <div className="flex gap-1 justify-center">
            {sound.example.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${i < exIdx ? "w-8 bg-purple-500" : i === exIdx ? "w-8 bg-cyan-500" : "w-8 bg-gray-200"}`} />
            ))}
          </div>
        </div>
      )}

      {step === "done" && (
        <div className="space-y-3">
          <div className="kid-card p-5 text-center anim-pop-in" style={{ background: "linear-gradient(135deg, #22C55E, #16A34A)" }}>
            <div className="text-4xl mb-2 anim-wiggle">🎉</div>
            <div className="text-white font-black text-lg">Звук «{sound.letter}» изучен!</div>
            <div className="text-green-100 text-sm mt-1">Молодец, продолжай!</div>
          </div>
          <button onClick={handleDone} className="w-full kid-btn py-3" style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}>
            {idx + 1 >= SOUNDS.length ? "Завершить 🏁" : "Следующий звук →"}
          </button>
        </div>
      )}
    </div>
  );
}
