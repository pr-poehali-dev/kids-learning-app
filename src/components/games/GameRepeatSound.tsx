import { useState } from "react";
import { getRandomSounds } from "@/data/gameData";

// Детский голос — медленно, высоко, без роботизации
function speakKid(text: string, onDone?: () => void) {
  if (!("speechSynthesis" in window)) { onDone?.(); return; }
  window.speechSynthesis.cancel();

  const doSpeak = () => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ru-RU";
    u.rate = 0.65;
    u.pitch = 1.6;
    u.volume = 1;

    const voices = window.speechSynthesis.getVoices();
    const ruVoice = voices.find(v =>
      v.lang.startsWith("ru") && (
        v.name.toLowerCase().includes("female") ||
        v.name.toLowerCase().includes("alena") ||
        v.name.toLowerCase().includes("katya") ||
        v.name.toLowerCase().includes("irina")
      )
    ) || voices.find(v => v.lang.startsWith("ru")) || null;

    if (ruVoice) u.voice = ruVoice;
    if (onDone) u.onend = onDone;
    window.speechSynthesis.speak(u);
  };

  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.addEventListener("voiceschanged", doSpeak, { once: true });
  } else {
    doSpeak();
  }
}

interface Props { onBack: () => void; }

export function GameRepeatSound({ onBack }: Props) {
  const [sounds] = useState(() => getRandomSounds(6));
  const [idx, setIdx] = useState(0);
  const [step, setStep] = useState<"listen" | "repeat" | "done">("listen");
  const [exIdx, setExIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const sound = sounds[idx];

  const playSound = (text: string, onDone?: () => void) => {
    setSpeaking(true);
    speakKid(text, () => {
      setSpeaking(false);
      onDone?.();
    });
    setTimeout(() => setSpeaking(false), 5000);
  };

  const handleListen = () => {
    playSound(sound.phrase, () => setTimeout(() => setStep("repeat"), 600));
  };

  const handleExample = (ex: string) => {
    playSound(ex, () => {
      setTimeout(() => {
        if (exIdx + 1 >= sound.example.length) {
          setStep("done");
        } else {
          setExIdx(i => i + 1);
        }
      }, 400);
    });
  };

  const handleDone = () => {
    setScore(s => s + 1);
    if (idx + 1 >= sounds.length) { setFinished(true); return; }
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
        <div className="text-blue-100 text-sm mt-2">Изучено {score} звуков из {sounds.length}</div>
        <div className="flex gap-3 mt-4 justify-center">
          <button
            onClick={() => { setIdx(0); setStep("listen"); setExIdx(0); setScore(0); setFinished(false); }}
            className="kid-btn py-2 px-5"
            style={{ background: "white", color: "#06B6D4" }}
          >Ещё раз!</button>
          <button onClick={onBack} className="py-2 px-4 rounded-2xl bg-white/20 text-white font-bold text-sm">Назад</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 anim-slide-up">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 font-bold active:scale-95">←</button>
        <div>
          <div className="font-black text-gray-800">Повтори звук</div>
          <div className="text-xs text-gray-400">Звук {idx + 1} из {sounds.length}</div>
        </div>
        <div className="ml-auto">
          <span className="text-xs bg-cyan-100 text-cyan-700 rounded-xl px-2 py-1 font-black">⭐ {score}</span>
        </div>
      </div>

      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(idx / sounds.length) * 100}%`, background: "linear-gradient(90deg,#06B6D4,#3B82F6)" }} />
      </div>

      <div className="kid-card p-6 text-center" style={{ background: "linear-gradient(135deg, #06B6D4, #3B82F6)" }}>
        <div className="text-8xl mb-2 anim-bounce-slow">{sound.emoji}</div>
        <div className="text-white font-black text-6xl mb-1">{sound.letter}</div>
        <div className="text-blue-100 font-semibold text-sm">{sound.phrase}</div>
      </div>

      {step === "listen" && (
        <div className="space-y-3">
          <div className="bg-blue-50 rounded-2xl p-4 text-center text-blue-700 font-semibold text-sm">
            👂 Нажми — послушай звук, потом повторяй вслух!
          </div>
          <button
            onClick={handleListen}
            disabled={speaking}
            className={`w-full kid-btn py-5 text-xl font-black transition-all ${speaking ? "opacity-70 scale-95" : ""}`}
            style={{ background: "linear-gradient(135deg, #06B6D4, #3B82F6)" }}
          >
            {speaking ? "🔊 Слушаем..." : "🔊 Послушать звук!"}
          </button>
        </div>
      )}

      {step === "repeat" && (
        <div className="space-y-3">
          <div className="bg-cyan-50 rounded-2xl p-4 text-center text-cyan-700 font-semibold text-sm">
            🗣️ Нажми на слово — послушай, потом скажи сам!
          </div>
          <div className="text-xs text-gray-400 font-bold uppercase tracking-wide text-center">
            Слово {exIdx + 1} из {sound.example.length}
          </div>
          <button
            onClick={() => !speaking && handleExample(sound.example[exIdx])}
            disabled={speaking}
            className={`w-full kid-btn py-6 text-3xl font-black tracking-widest transition-all ${speaking ? "opacity-70 scale-95" : ""}`}
            style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}
          >
            {speaking ? "🔊 ..." : sound.example[exIdx]}
          </button>
          <div className="flex gap-1.5 justify-center">
            {sound.example.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 flex-1 max-w-10 ${i < exIdx ? "bg-purple-500" : i === exIdx ? "bg-cyan-400" : "bg-gray-200"}`}
              />
            ))}
          </div>
        </div>
      )}

      {step === "done" && (
        <div className="space-y-3">
          <div className="kid-card p-5 text-center anim-pop-in" style={{ background: "linear-gradient(135deg, #22C55E, #16A34A)" }}>
            <div className="text-5xl mb-2 anim-wiggle">🎉</div>
            <div className="text-white font-black text-xl">Звук «{sound.letter}» изучен!</div>
            <div className="text-green-100 text-sm mt-1">Отличное произношение!</div>
          </div>
          <button
            onClick={handleDone}
            className="w-full kid-btn py-4 text-lg"
            style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}
          >
            {idx + 1 >= sounds.length ? "Завершить 🏁" : "Следующий звук →"}
          </button>
        </div>
      )}
    </div>
  );
}
