import { useState } from "react";
import { getRandomPairs } from "@/data/gameData";

interface Card {
  uid: string;
  id: number;
  emoji: string;
  label: string;
  isEmoji: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildDeck(pairCount: number = 4): Card[] {
  const pairs = getRandomPairs(pairCount);
  const cards: Card[] = [];
  pairs.forEach((p) => {
    cards.push({ uid: `e-${p.id}`, id: p.id, emoji: p.emoji, label: p.label, isEmoji: true });
    cards.push({ uid: `l-${p.id}`, id: p.id, emoji: p.emoji, label: p.label, isEmoji: false });
  });
  return shuffle(cards);
}

interface Props { onBack: () => void; }

export function GameMatchPairs({ onBack }: Props) {
  const [round, setRound] = useState(1);
  const [pairCount] = useState(4);
  const [deck, setDeck] = useState<Card[]>(() => buildDeck(4));
  const [selected, setSelected] = useState<string[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [wrong, setWrong] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const handlePick = (card: Card) => {
    if (matched.includes(card.id)) return;
    if (selected.includes(card.uid)) return;
    if (selected.length === 2) return;

    const next = [...selected, card.uid];
    setSelected(next);

    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next.map((uid) => deck.find((c) => c.uid === uid)!);
      if (a.id === b.id) {
        const newMatched = [...matched, a.id];
        setMatched(newMatched);
        setSelected([]);
        if (newMatched.length === pairCount) {
          const bonus = Math.max(0, 10 - moves);
          setTotalScore(s => s + 10 + bonus);
          setWon(true);
        }
      } else {
        setWrong(next);
        setTimeout(() => { setSelected([]); setWrong([]); }, 900);
      }
    }
  };

  const nextRound = () => {
    const newDeck = buildDeck(Math.min(4 + Math.floor(round / 3), 6));
    setDeck(newDeck);
    setSelected([]);
    setMatched([]);
    setWrong([]);
    setMoves(0);
    setWon(false);
    setRound(r => r + 1);
  };

  return (
    <div className="space-y-4 anim-slide-up">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 font-bold active:scale-95 transition-all">←</button>
        <div>
          <div className="font-black text-gray-800">Найди пару</div>
          <div className="text-xs text-gray-400">Раунд {round} · Ходов: {moves}</div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm font-black text-purple-600">{matched.length}/{pairCount}</span>
          <span className="text-xs bg-yellow-100 text-yellow-700 rounded-xl px-2 py-0.5 font-bold">⭐{totalScore}</span>
        </div>
      </div>

      {won ? (
        <div className="kid-card p-8 text-center anim-pop-in" style={{ background: "linear-gradient(135deg, #22C55E, #16A34A)" }}>
          <div className="text-6xl mb-3 anim-wiggle">🎉</div>
          <div className="text-white font-black text-2xl">Молодец!</div>
          <div className="text-green-100 text-sm mt-1">Все пары за {moves} ходов! +{totalScore} ⭐</div>
          <div className="flex gap-3 mt-4 justify-center">
            <button onClick={nextRound} className="kid-btn py-2 px-6" style={{ background: "white", color: "#16A34A" }}>
              Ещё раунд! →
            </button>
            <button onClick={onBack} className="py-2 px-4 rounded-2xl bg-white/20 text-white font-bold text-sm">
              Назад
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {deck.map((card) => {
            const isMatched = matched.includes(card.id);
            const isSelected = selected.includes(card.uid);
            const isWrong = wrong.includes(card.uid);
            return (
              <button
                key={card.uid}
                onClick={() => handlePick(card)}
                className={`h-16 rounded-2xl flex items-center justify-center font-black text-sm transition-all active:scale-95 border-2 ${
                  isMatched
                    ? "bg-green-100 border-green-400 text-green-700"
                    : isWrong
                    ? "bg-red-100 border-red-400 text-red-600 anim-shake"
                    : isSelected
                    ? "bg-purple-100 border-purple-500 text-purple-700"
                    : "bg-white border-gray-200 text-gray-700 hover:border-purple-300"
                }`}
                style={{ boxShadow: isSelected && !isWrong ? "0 4px 0 #7C3AED44" : undefined }}
              >
                {card.isEmoji ? (
                  <span className="text-2xl">{card.emoji}</span>
                ) : (
                  <span className="text-xs leading-tight text-center px-1">{card.label}</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      <div className="bg-blue-50 rounded-2xl p-3 text-xs text-blue-600 font-semibold">
        💡 Соедини картинку с названием — каждый раунд новые пары!
      </div>
    </div>
  );
}
