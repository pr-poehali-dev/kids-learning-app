import { useState } from "react";
import { StarRating } from "@/components/shared/MascotCharacter";
import { PhraseBuilder } from "@/components/tabs/PhraseBuilder";
import { GameMatchPairs } from "@/components/games/GameMatchPairs";
import { GameBuildWord } from "@/components/games/GameBuildWord";
import { GameWhatOnPicture } from "@/components/games/GameWhatOnPicture";
import { GameColorsShapes } from "@/components/games/GameColorsShapes";
import { GamePuzzleWord } from "@/components/games/GamePuzzleWord";
import { GameRepeatSound } from "@/components/games/GameRepeatSound";

const GAMES = [
  { id: 1, icon: "🎴", title: "Найди пару", desc: "Соедини одинаковые карточки", color: "#7C3AED", stars: 3 },
  { id: 2, icon: "🔤", title: "Собери слово", desc: "Перетащи буквы по порядку", color: "#EC4899", stars: 2 },
  { id: 3, icon: "🖼️", title: "Что на картинке?", desc: "Назови то, что видишь", color: "#F97316", stars: 1 },
  { id: 4, icon: "🌈", title: "Цвета и формы", desc: "Развиваем логику и память", color: "#3B82F6", stars: 0 },
  { id: 5, icon: "🧩", title: "Пазл-слово", desc: "Угадай слово по подсказке", color: "#22C55E", stars: 0 },
  { id: 6, icon: "🎙️", title: "Повтори звук", desc: "Тренируем произношение", color: "#06B6D4", stars: 0 },
];

type ActiveGame = "matchpairs" | "buildword" | "whatonpicture" | "colorsshapes" | "puzzleword" | "repeatsound" | "phrasebuilder" | null;

const GAME_ID_MAP: Record<number, ActiveGame> = {
  1: "matchpairs",
  2: "buildword",
  3: "whatonpicture",
  4: "colorsshapes",
  5: "puzzleword",
  6: "repeatsound",
};

export function TabGames() {
  const [activeGame, setActiveGame] = useState<ActiveGame>(null);
  const [played] = useState<number[]>([1, 2, 3]);

  const handlePlay = (gameId: number) => {
    const game = GAME_ID_MAP[gameId];
    if (game) setActiveGame(game);
  };

  const handleBack = () => setActiveGame(null);

  if (activeGame === "matchpairs") return <GameMatchPairs onBack={handleBack} />;
  if (activeGame === "buildword") return <GameBuildWord onBack={handleBack} />;
  if (activeGame === "whatonpicture") return <GameWhatOnPicture onBack={handleBack} />;
  if (activeGame === "colorsshapes") return <GameColorsShapes onBack={handleBack} />;
  if (activeGame === "puzzleword") return <GamePuzzleWord onBack={handleBack} />;
  if (activeGame === "repeatsound") return <GameRepeatSound onBack={handleBack} />;
  if (activeGame === "phrasebuilder") return (
    <div className="space-y-3">
      <button onClick={handleBack} className="flex items-center gap-2 text-gray-500 font-bold text-sm active:scale-95 transition-all">
        ← Назад к играм
      </button>
      <PhraseBuilder />
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="kid-card p-5" style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-black text-xl">Игровая комната</div>
            <div className="text-purple-200 text-sm mt-1">7 игр доступно</div>
          </div>
          <div className="text-5xl anim-wiggle">🎮</div>
        </div>
        <div className="flex gap-2 mt-4">
          <div className="bg-white/20 rounded-2xl px-3 py-1 text-white text-xs font-bold">🧠 Память</div>
          <div className="bg-white/20 rounded-2xl px-3 py-1 text-white text-xs font-bold">🗣 Речь</div>
          <div className="bg-white/20 rounded-2xl px-3 py-1 text-white text-xs font-bold">🔤 Буквы</div>
        </div>
      </div>

      {/* Phrase Builder */}
      <div
        className="kid-card p-4 flex items-center gap-4 cursor-pointer"
        style={{ border: "2px solid #06B6D4" }}
        onClick={() => setActiveGame("phrasebuilder")}
      >
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: "#CFFAFE" }}>
          🗣️
        </div>
        <div className="flex-1">
          <div className="font-black text-gray-800">Фразовый конструктор</div>
          <div className="text-xs text-gray-400">Логопедические карточки • Голос</div>
        </div>
        <div className="text-cyan-500 font-bold text-lg">▶</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {GAMES.map((game, idx) => {
          const isPlayed = played.includes(game.id);
          return (
            <div
              key={game.id}
              className="kid-card p-4 relative overflow-hidden"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div
                className="absolute top-0 right-0 w-16 h-16 rounded-full opacity-10 -translate-y-4 translate-x-4"
                style={{ background: game.color }}
              />
              <div className="text-3xl mb-2">{game.icon}</div>
              <div className="font-black text-gray-800 text-sm">{game.title}</div>
              <div className="text-xs text-gray-400 mt-0.5 mb-2">{game.desc}</div>
              {isPlayed && <StarRating stars={game.stars} />}
              <button
                className="kid-btn text-xs py-1.5 px-3 mt-2 block"
                style={{ background: game.color }}
                onClick={() => handlePlay(game.id)}
              >
                {isPlayed ? "Играть снова" : "Играть"}
              </button>
            </div>
          );
        })}
      </div>

      <div className="kid-card p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-3xl anim-float">🧠</div>
          <div>
            <div className="font-black text-gray-800">Адаптивный режим</div>
            <div className="text-xs text-gray-400">Подстраивается под твой темп</div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 rounded-2xl p-3 text-center" style={{ background: "#EDE9FE" }}>
            <div className="text-2xl font-black text-purple-700">85%</div>
            <div className="text-xs text-purple-500 font-semibold">Точность</div>
          </div>
          <div className="flex-1 rounded-2xl p-3 text-center" style={{ background: "#FCE7F3" }}>
            <div className="text-2xl font-black text-pink-600">12</div>
            <div className="text-xs text-pink-400 font-semibold">Сессии</div>
          </div>
          <div className="flex-1 rounded-2xl p-3 text-center" style={{ background: "#DCFCE7" }}>
            <div className="text-2xl font-black text-green-600">Лёгкий</div>
            <div className="text-xs text-green-500 font-semibold">Уровень</div>
          </div>
        </div>
      </div>
    </div>
  );
}
