import { useState, useCallback, useRef } from "react";

interface WordCard {
  id: number;
  word: string;
  emoji: string;
  color: string;
  bgColor: string;
}

interface PhraseSet {
  id: number;
  title: string;
  slots: string[]; // роли слотов: "кто", "делает", "что"
  words: WordCard[];
}

const PHRASE_SETS: PhraseSet[] = [
  {
    id: 1,
    title: "Кто что делает?",
    slots: ["Кто?", "Что делает?", "Что?"],
    words: [
      { id: 1, word: "КОТ", emoji: "🐱", color: "#7C3AED", bgColor: "#EDE9FE" },
      { id: 2, word: "СОБАКА", emoji: "🐶", color: "#EC4899", bgColor: "#FCE7F3" },
      { id: 3, word: "ЕСТ", emoji: "🍽️", color: "#F97316", bgColor: "#FFEDD5" },
      { id: 4, word: "ПЬЁТ", emoji: "🥛", color: "#3B82F6", bgColor: "#DBEAFE" },
      { id: 5, word: "РЫБУ", emoji: "🐟", color: "#22C55E", bgColor: "#DCFCE7" },
      { id: 6, word: "МОЛОКО", emoji: "🥛", color: "#06B6D4", bgColor: "#CFFAFE" },
    ],
  },
  {
    id: 2,
    title: "Где живёт?",
    slots: ["Кто?", "Живёт", "Где?"],
    words: [
      { id: 7, word: "ПТИЦА", emoji: "🐦", color: "#7C3AED", bgColor: "#EDE9FE" },
      { id: 8, word: "РЫБА", emoji: "🐠", color: "#3B82F6", bgColor: "#DBEAFE" },
      { id: 9, word: "ЖИВЁТ", emoji: "🏠", color: "#F97316", bgColor: "#FFEDD5" },
      { id: 10, word: "В ГНЕЗДЕ", emoji: "🪹", color: "#22C55E", bgColor: "#DCFCE7" },
      { id: 11, word: "В ВОДЕ", emoji: "💧", color: "#06B6D4", bgColor: "#CFFAFE" },
      { id: 12, word: "МЕДВЕДЬ", emoji: "🐻", color: "#EC4899", bgColor: "#FCE7F3" },
    ],
  },
  {
    id: 3,
    title: "Какой? Что?",
    slots: ["Какой?", "Предмет"],
    words: [
      { id: 13, word: "БОЛЬШОЙ", emoji: "🔵", color: "#3B82F6", bgColor: "#DBEAFE" },
      { id: 14, word: "МАЛЕНЬКИЙ", emoji: "🔴", color: "#EC4899", bgColor: "#FCE7F3" },
      { id: 15, word: "МЯЧ", emoji: "⚽", color: "#22C55E", bgColor: "#DCFCE7" },
      { id: 16, word: "ДОМ", emoji: "🏠", color: "#F97316", bgColor: "#FFEDD5" },
      { id: 17, word: "КРАСИВЫЙ", emoji: "🌸", color: "#7C3AED", bgColor: "#EDE9FE" },
      { id: 18, word: "ЦВЕТОК", emoji: "🌻", color: "#EAB308", bgColor: "#FEF9C3" },
    ],
  },
];

const SLOT_ORDINALS = ["первое", "второе", "третье", "четвёртое"];

function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();

  const doSpeak = () => {
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = "ru-RU";
    utt.rate = 0.65;
    utt.pitch = 1.6;
    utt.volume = 1;

    const voices = window.speechSynthesis.getVoices();
    const ruVoice = voices.find(v =>
      v.lang.startsWith("ru") && (
        v.name.toLowerCase().includes("female") ||
        v.name.toLowerCase().includes("alena") ||
        v.name.toLowerCase().includes("katya") ||
        v.name.toLowerCase().includes("irina")
      )
    ) || voices.find(v => v.lang.startsWith("ru")) || null;
    if (ruVoice) utt.voice = ruVoice;

    window.speechSynthesis.speak(utt);
  };

  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.addEventListener("voiceschanged", doSpeak, { once: true });
  } else {
    doSpeak();
  }
}

export function PhraseBuilder() {
  const [setIdx, setSetIdx] = useState(0);
  const [slots, setSlots] = useState<(WordCard | null)[]>([null, null, null]);
  const [dragWord, setDragWord] = useState<WordCard | null>(null);
  const [highlightSlot, setHighlightSlot] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const dragOverSlot = useRef<number | null>(null);

  const phraseSet = PHRASE_SETS[setIdx];
  const slotCount = phraseSet.slots.length;
  const currentSlots = slots.slice(0, slotCount);

  const usedIds = currentSlots.filter(Boolean).map((w) => w!.id);
  const availableWords = phraseSet.words.filter((w) => !usedIds.includes(w.id));

  const placeWord = useCallback(
    (word: WordCard, slotIndex: number) => {
      setSlots((prev) => {
        const next = [...prev];
        // если слово уже стоит в другом слоте — очистить его
        const oldSlot = next.findIndex((s) => s?.id === word.id);
        if (oldSlot !== -1) next[oldSlot] = null;
        const displaced = next[slotIndex];
        next[slotIndex] = word;
        return next;
      });

      const slotLabel = phraseSet.slots[slotIndex];
      speak(`Слово ${word.word} — на ${SLOT_ORDINALS[slotIndex]} место. ${slotLabel}!`);

      // проверить заполненность
      setTimeout(() => {
        setSlots((prev) => {
          const filled = prev.slice(0, slotCount).every(Boolean);
          if (filled) {
            const phrase = prev
              .slice(0, slotCount)
              .map((w) => w!.word)
              .join(" ");
            setTimeout(() => {
              speak(`Отлично! Ты составил фразу: ${phrase}`);
              setDone(true);
              setCelebrating(true);
              setTimeout(() => setCelebrating(false), 3000);
            }, 800);
          }
          return prev;
        });
      }, 100);
    },
    [phraseSet, slotCount],
  );

  const removeFromSlot = (slotIndex: number) => {
    const word = currentSlots[slotIndex];
    if (!word) return;
    setSlots((prev) => {
      const next = [...prev];
      next[slotIndex] = null;
      return next;
    });
    setDone(false);
    speak(`Слово ${word.word} убрано`);
  };

  const reset = () => {
    setSlots([null, null, null]);
    setDone(false);
    speak("Начинаем сначала!");
  };

  const nextSet = () => {
    const next = (setIdx + 1) % PHRASE_SETS.length;
    setSetIdx(next);
    setSlots([null, null, null]);
    setDone(false);
    speak(`Новое задание: ${PHRASE_SETS[next].title}`);
  };

  const speakPhrase = () => {
    const words = currentSlots.filter(Boolean).map((w) => w!.word);
    if (words.length === 0) {
      speak("Поставь карточки на места!");
      return;
    }
    speak(words.join(" "));
  };

  // Drag & Drop
  const onDragStart = (word: WordCard) => setDragWord(word);
  const onDragEnd = () => {
    setDragWord(null);
    setHighlightSlot(null);
  };
  const onDragOverSlot = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    dragOverSlot.current = idx;
    setHighlightSlot(idx);
  };
  const onDropSlot = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (dragWord) placeWord(dragWord, idx);
    setHighlightSlot(null);
    dragOverSlot.current = null;
  };

  // Touch drag
  const touchWord = useRef<WordCard | null>(null);
  const onTouchStart = (word: WordCard) => { touchWord.current = word; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchWord.current) return;
    const touch = e.changedTouches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const slotEl = el?.closest("[data-slot]");
    if (slotEl) {
      const idx = Number(slotEl.getAttribute("data-slot"));
      placeWord(touchWord.current, idx);
    }
    touchWord.current = null;
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div
        className="kid-card p-5 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #06B6D4, #3B82F6)" }}
      >
        {celebrating && (
          <>
            {["⭐","🌟","✨","🎉","🎊"].map((e, i) => (
              <span
                key={i}
                className="absolute text-2xl pointer-events-none"
                style={{
                  left: `${10 + i * 18}%`,
                  top: "-10px",
                  animation: `confetti-fall ${1 + i * 0.3}s linear ${i * 0.2}s forwards`,
                }}
              >
                {e}
              </span>
            ))}
          </>
        )}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-black text-xl">Фразовый конструктор</div>
            <div className="text-blue-100 text-sm mt-0.5">Логопедические карточки</div>
          </div>
          <div className="text-4xl anim-bounce-slow">🗣️</div>
        </div>

        {/* Set selector */}
        <div className="flex gap-2 mt-4">
          {PHRASE_SETS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { setSetIdx(i); setSlots([null, null, null]); setDone(false); }}
              className={`rounded-2xl px-3 py-1 text-xs font-bold transition-all ${setIdx === i ? "bg-white text-blue-700" : "bg-white/20 text-white"}`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Slots */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-black text-gray-800">Составь фразу</h3>
          <button
            onClick={speakPhrase}
            className="flex items-center gap-1 bg-blue-100 text-blue-700 rounded-2xl px-3 py-1.5 text-sm font-bold active:scale-95 transition-all"
          >
            🔊 Прочитать
          </button>
        </div>

        <div className={`flex gap-2 ${slotCount === 2 ? "justify-center" : ""}`}>
          {phraseSet.slots.map((label, idx) => {
            const placed = currentSlots[idx];
            const isHighlit = highlightSlot === idx;
            return (
              <div
                key={idx}
                data-slot={idx}
                className="flex-1 min-h-[90px] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-all duration-200 relative"
                style={{
                  borderColor: isHighlit ? "#3B82F6" : placed ? placed.color : "#D1D5DB",
                  background: isHighlit
                    ? "#EFF6FF"
                    : placed
                    ? placed.bgColor
                    : "#F9FAFB",
                }}
                onDragOver={(e) => onDragOverSlot(e, idx)}
                onDrop={(e) => onDropSlot(e, idx)}
                onDragLeave={() => setHighlightSlot(null)}
              >
                {placed ? (
                  <div className="flex flex-col items-center gap-1 p-2">
                    <span className="text-3xl">{placed.emoji}</span>
                    <span className="font-black text-xs text-center" style={{ color: placed.color }}>
                      {placed.word}
                    </span>
                    <button
                      onClick={() => removeFromSlot(idx)}
                      className="absolute top-1 right-1 w-5 h-5 bg-gray-200 rounded-full text-gray-500 text-xs flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition-all"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1 opacity-40">
                    <span className="text-2xl">＋</span>
                    <span className="text-xs font-bold text-gray-400 text-center px-1">{label}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Done banner */}
        {done && (
          <div
            className="mt-3 rounded-3xl p-4 flex items-center gap-3 anim-pop-in"
            style={{ background: "linear-gradient(135deg, #22C55E, #16A34A)" }}
          >
            <span className="text-3xl anim-wiggle">🎉</span>
            <div>
              <div className="text-white font-black">Отлично!</div>
              <div className="text-green-100 text-xs">
                {currentSlots.filter(Boolean).map((w) => w!.word).join(" ")}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Word cards */}
      <div>
        <h3 className="text-sm font-black text-gray-500 uppercase tracking-wide mb-3">
          Карточки — тяни на место ⬆️
        </h3>
        <div className="flex flex-wrap gap-2">
          {availableWords.map((word) => (
            <div
              key={word.id}
              draggable
              onDragStart={() => onDragStart(word)}
              onDragEnd={onDragEnd}
              onTouchStart={() => onTouchStart(word)}
              onTouchEnd={onTouchEnd}
              onClick={() => {
                // найти первый пустой слот
                const emptyIdx = currentSlots.findIndex((s) => s === null);
                if (emptyIdx !== -1) placeWord(word, emptyIdx);
              }}
              className="flex items-center gap-2 rounded-2xl px-4 py-2.5 font-black text-sm cursor-grab active:cursor-grabbing select-none transition-all active:scale-95 shadow-md"
              style={{
                background: word.bgColor,
                color: word.color,
                boxShadow: `0 4px 0 ${word.color}44`,
                border: `2px solid ${word.color}33`,
              }}
            >
              <span className="text-xl">{word.emoji}</span>
              {word.word}
            </div>
          ))}
          {availableWords.length === 0 && !done && (
            <div className="text-gray-400 text-sm font-semibold py-2">
              Все карточки расставлены 👆
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="flex-1 kid-btn text-sm py-3"
          style={{ background: "#6B7280" }}
        >
          🔄 Сначала
        </button>
        <button
          onClick={nextSet}
          className="flex-1 kid-btn text-sm py-3"
          style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}
        >
          Следующее ➡️
        </button>
      </div>

      {/* Hint */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-3 flex gap-3">
        <span className="text-xl flex-shrink-0">💡</span>
        <p className="text-xs text-yellow-700 font-semibold">
          Нажми на карточку — она встанет на первое свободное место. Или перетащи пальцем прямо в нужный слот. Голос расскажет, куда встало слово!
        </p>
      </div>
    </div>
  );
}