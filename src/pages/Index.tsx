import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

type Tab = "learn" | "games" | "achievements" | "parents";

const MASCOT_MOODS = ["😊", "🤩", "😄", "🥳", "😎"];

const LESSONS = [
  { id: 1, icon: "📖", title: "Буква А", subtitle: "Азбука", color: "#7C3AED", bgColor: "#EDE9FE", progress: 100, level: 1 },
  { id: 2, icon: "📚", title: "Буква Б", subtitle: "Азбука", color: "#EC4899", bgColor: "#FCE7F3", progress: 75, level: 2 },
  { id: 3, icon: "🗣️", title: "Звук «МА»", subtitle: "Речь", color: "#F97316", bgColor: "#FFEDD5", progress: 40, level: 3 },
  { id: 4, icon: "✏️", title: "Пиши вместе", subtitle: "Письмо", color: "#3B82F6", bgColor: "#DBEAFE", progress: 0, level: 4 },
  { id: 5, icon: "🎵", title: "Стихи и ритм", subtitle: "Речь", color: "#22C55E", bgColor: "#DCFCE7", progress: 0, level: 5 },
  { id: 6, icon: "💬", title: "Первые слова", subtitle: "Слова", color: "#06B6D4", bgColor: "#CFFAFE", progress: 0, level: 6 },
];

const GAMES = [
  { id: 1, icon: "🎴", title: "Найди пару", desc: "Соедини одинаковые карточки", color: "#7C3AED", stars: 3 },
  { id: 2, icon: "🔤", title: "Собери слово", desc: "Перетащи буквы по порядку", color: "#EC4899", stars: 2 },
  { id: 3, icon: "🖼️", title: "Что на картинке?", desc: "Назови то, что видишь", color: "#F97316", stars: 1 },
  { id: 4, icon: "🌈", title: "Цвета и формы", desc: "Развиваем логику и память", color: "#3B82F6", stars: 0 },
  { id: 5, icon: "🧩", title: "Пазл-слово", desc: "Собери картинку из букв", color: "#22C55E", stars: 0 },
  { id: 6, icon: "🎙️", title: "Повтори звук", desc: "Тренируем произношение", color: "#06B6D4", stars: 0 },
];

const ACHIEVEMENTS = [
  { id: 1, icon: "⭐", title: "Первый шаг", desc: "Пройти первый урок", color: "#EAB308", unlocked: true },
  { id: 2, icon: "🔥", title: "В огне!", desc: "3 дня подряд", color: "#F97316", unlocked: true },
  { id: 3, icon: "🎯", title: "Меткий стрелок", desc: "Ответить без ошибок", color: "#3B82F6", unlocked: true },
  { id: 4, icon: "🏆", title: "Чемпион", desc: "Набрать 100 очков", color: "#7C3AED", unlocked: false },
  { id: 5, icon: "🦉", title: "Умная сова", desc: "Пройти 5 уроков", color: "#EC4899", unlocked: false },
  { id: 6, icon: "🚀", title: "Космонавт", desc: "Открыть все игры", color: "#06B6D4", unlocked: false },
  { id: 7, icon: "💎", title: "Бриллиант", desc: "Набрать 500 очков", color: "#EC4899", unlocked: false },
  { id: 8, icon: "🌟", title: "Супер-звезда", desc: "Пройти все уровни", color: "#EAB308", unlocked: false },
];

const CHILDREN = [
  { name: "Маша", age: 5, avatar: "👧", level: 3, stars: 47, streak: 3, weekDays: [true, true, true, false, false, false, false] },
  { name: "Петя", age: 6, avatar: "👦", level: 5, stars: 83, streak: 7, weekDays: [true, true, true, true, true, true, true] },
];

const WEEK_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function StarRating({ stars, max = 3 }: { stars: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={`text-lg transition-all ${i < stars ? "opacity-100 anim-sparkle" : "opacity-25"}`} style={{ animationDelay: `${i * 0.3}s` }}>⭐</span>
      ))}
    </div>
  );
}

function ConfettiPiece({ delay, color, left }: { delay: number; color: string; left: number }) {
  return (
    <div
      className="absolute w-2.5 h-2.5 rounded-sm pointer-events-none"
      style={{
        background: color,
        left: `${left}%`,
        top: "-20px",
        animation: `confetti-fall ${1.5 + Math.random()}s linear ${delay}s infinite`,
      }}
    />
  );
}

function MascotCharacter({ mood = 0 }: { mood?: number }) {
  return (
    <div className="relative inline-block">
      <div className="relative">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl anim-bounce-slow select-none"
          style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)", boxShadow: "0 8px 25px rgba(124,58,237,0.4)" }}
        >
          🦉
        </div>
        <div className="absolute -top-1 -right-1 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center text-sm anim-star-spin shadow-md">
          ✨
        </div>
      </div>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-full px-2 py-0.5 text-xs font-bold text-purple-700 shadow-sm whitespace-nowrap border border-purple-100">
        ЗнайКа
      </div>
    </div>
  );
}

function TabLearn() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <MascotCharacter />
        <div>
          <h2 className="text-2xl font-black text-purple-800">Привет, Маша! 👋</h2>
          <p className="text-purple-500 font-semibold">Продолжай учиться!</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-orange-500 font-bold text-sm">🔥 3 дня подряд!</span>
            <span className="bg-yellow-100 text-yellow-700 rounded-full px-2 py-0.5 text-xs font-bold">⭐ 47 звёзд</span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-bold text-purple-600">Уровень 3 из 6</span>
          <span className="text-xs text-gray-400">75%</span>
        </div>
        <div className="progress-bar-wrap">
          <div className="progress-fill" style={{ width: "75%" }} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-black text-gray-800 mb-3">Уроки</h3>
        <div className="grid grid-cols-2 gap-3">
          {LESSONS.map((lesson, idx) => {
            const isLocked = lesson.progress === 0 && idx > 2;
            return (
              <div
                key={lesson.id}
                className={`kid-card p-4 ${isLocked ? "opacity-50" : ""}`}
                style={{ animationDelay: `${idx * 0.08}s` }}
                onClick={() => !isLocked && setSelected(lesson.id)}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-2"
                  style={{ background: lesson.bgColor }}
                >
                  {lesson.icon}
                </div>
                <div className="font-black text-gray-800 text-sm">{lesson.title}</div>
                <div className="text-xs text-gray-400 mb-2">{lesson.subtitle}</div>
                {lesson.progress > 0 && (
                  <div className="progress-bar-wrap h-2">
                    <div className="progress-fill h-full" style={{ width: `${lesson.progress}%`, background: lesson.color }} />
                  </div>
                )}
                {isLocked && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-gray-400 text-xs">🔒 Закрыто</span>
                  </div>
                )}
                {lesson.progress === 100 && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-green-500 text-xs font-bold">✅ Готово!</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-black text-gray-800 mb-3">Путь героя</h3>
        <div className="kid-card p-5">
          <div className="flex items-center justify-between">
            {LESSONS.map((l, i) => (
              <div key={l.id} className="flex items-center">
                <div className={`level-dot ${l.progress === 100 ? "done" : l.progress > 0 ? "current" : "locked"}`}>
                  {l.progress === 100 ? "✓" : l.level}
                </div>
                {i < LESSONS.length - 1 && (
                  <div className={`h-1 w-6 mx-1 rounded-full ${l.progress === 100 ? "bg-green-400" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabGames() {
  const [flipped, setFlipped] = useState<number | null>(null);
  const [played, setPlayed] = useState<number[]>([1, 2, 3]);

  return (
    <div className="space-y-5">
      <div className="kid-card p-5" style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-black text-xl">Игровая комната</div>
            <div className="text-purple-200 text-sm mt-1">6 игр доступно</div>
          </div>
          <div className="text-5xl anim-wiggle">🎮</div>
        </div>
        <div className="flex gap-2 mt-4">
          <div className="bg-white/20 rounded-2xl px-3 py-1 text-white text-xs font-bold">🧠 Память</div>
          <div className="bg-white/20 rounded-2xl px-3 py-1 text-white text-xs font-bold">🗣 Речь</div>
          <div className="bg-white/20 rounded-2xl px-3 py-1 text-white text-xs font-bold">🔤 Буквы</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {GAMES.map((game, idx) => {
          const isPlayed = played.includes(game.id);
          return (
            <div
              key={game.id}
              className="kid-card p-4 relative overflow-hidden"
              style={{ animationDelay: `${idx * 0.1}s` }}
              onClick={() => setFlipped(flipped === game.id ? null : game.id)}
            >
              <div
                className="absolute top-0 right-0 w-16 h-16 rounded-full opacity-10 -translate-y-4 translate-x-4"
                style={{ background: game.color }}
              />
              <div className="text-3xl mb-2">{game.icon}</div>
              <div className="font-black text-gray-800 text-sm">{game.title}</div>
              <div className="text-xs text-gray-400 mt-0.5 mb-2">{game.desc}</div>
              {isPlayed ? (
                <StarRating stars={game.stars} />
              ) : (
                <div
                  className="kid-btn text-xs py-1.5 px-3 inline-block mt-1"
                  style={{ background: game.color }}
                >
                  Играть
                </div>
              )}
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

function TabAchievements() {
  const [celebrating, setCelebrating] = useState(false);
  const confettiColors = ["#7C3AED", "#EC4899", "#F97316", "#EAB308", "#22C55E", "#3B82F6"];
  const confettiPieces = Array.from({ length: 12 }, (_, i) => ({
    delay: i * 0.15,
    color: confettiColors[i % confettiColors.length],
    left: (i * 8) + 5,
  }));

  return (
    <div className="space-y-5 relative">
      {celebrating && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {confettiPieces.map((p, i) => (
            <ConfettiPiece key={i} {...p} />
          ))}
        </div>
      )}

      <div
        className="kid-card p-5 cursor-pointer"
        style={{ background: "linear-gradient(135deg, #EAB308, #F97316)" }}
        onClick={() => { setCelebrating(true); setTimeout(() => setCelebrating(false), 3000); }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-black text-xl">Мои трофеи</div>
            <div className="text-yellow-100 text-sm">3 из 8 получено</div>
          </div>
          <div className="text-5xl anim-bounce-slow">🏆</div>
        </div>
        <div className="flex gap-2 mt-3">
          {[1,2,3].map(i => (
            <div key={i} className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center text-lg">⭐</div>
          ))}
          {[4,5].map(i => (
            <div key={i} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-lg opacity-40">⭐</div>
          ))}
        </div>
        <div className="text-white/70 text-xs mt-2">Нажми, чтобы отпраздновать! 🎉</div>
      </div>

      <div>
        <h3 className="text-lg font-black text-gray-800 mb-3">Все достижения</h3>
        <div className="space-y-3">
          {ACHIEVEMENTS.map((ach, idx) => (
            <div
              key={ach.id}
              className={`kid-card p-4 flex items-center gap-4 ${!ach.unlocked ? "achievement-locked" : ""}`}
              style={{ animationDelay: `${idx * 0.06}s` }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: ach.unlocked ? `${ach.color}22` : "#f3f4f6" }}
              >
                {ach.icon}
              </div>
              <div className="flex-1">
                <div className="font-black text-gray-800">{ach.title}</div>
                <div className="text-xs text-gray-400">{ach.desc}</div>
              </div>
              {ach.unlocked ? (
                <div className="text-green-500 text-xl">✅</div>
              ) : (
                <div className="text-gray-300 text-xl">🔒</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="kid-card p-5">
        <div className="font-black text-gray-800 mb-3">Система уровней</div>
        <div className="space-y-2">
          {[
            { name: "🌱 Росток", xp: "0–50 очков", done: true },
            { name: "🌻 Цветок", xp: "51–150 очков", done: true },
            { name: "🦋 Бабочка", xp: "151–300 очков", current: true },
            { name: "🦅 Орёл", xp: "301–500 очков", done: false },
            { name: "🚀 Ракета", xp: "500+ очков", done: false },
          ].map((lvl, i) => (
            <div key={i} className={`flex items-center justify-between p-3 rounded-2xl ${lvl.done ? "bg-green-50" : lvl.current ? "bg-purple-50" : "bg-gray-50"}`}>
              <div className={`font-bold text-sm ${lvl.done ? "text-green-700" : lvl.current ? "text-purple-700" : "text-gray-400"}`}>{lvl.name}</div>
              <div className={`text-xs ${lvl.done ? "text-green-500" : lvl.current ? "text-purple-500" : "text-gray-300"}`}>{lvl.xp}</div>
              {lvl.current && <div className="text-purple-600 text-xs font-bold ml-2">← Ты здесь</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabParents() {
  const [activeChild, setActiveChild] = useState(0);
  const child = CHILDREN[activeChild];

  return (
    <div className="space-y-5">
      <div className="kid-card p-5" style={{ background: "linear-gradient(135deg, #1E1B4B, #312E81)" }}>
        <div className="text-white font-black text-xl mb-1">Панель родителей</div>
        <div className="text-indigo-300 text-sm">Следи за прогрессом ребёнка</div>
        <div className="flex gap-2 mt-4">
          {CHILDREN.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveChild(i)}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2 transition-all font-bold text-sm ${activeChild === i ? "bg-white text-indigo-800" : "bg-white/15 text-white"}`}
            >
              <span>{c.avatar}</span> {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: "🎯", label: "Уровень", value: child.level, color: "#7C3AED", bg: "#EDE9FE" },
          { icon: "⭐", label: "Звёзды", value: child.stars, color: "#EAB308", bg: "#FEF9C3" },
          { icon: "🔥", label: "Серия дней", value: child.streak, color: "#F97316", bg: "#FFEDD5" },
        ].map((stat, i) => (
          <div key={i} className="kid-card p-4 text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs text-gray-400 font-semibold mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="kid-card p-5">
        <div className="font-black text-gray-800 mb-3">Активность на этой неделе</div>
        <div className="flex gap-2 justify-between">
          {WEEK_DAYS.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center text-sm font-bold transition-all ${child.weekDays[i] ? "text-white shadow-md" : "bg-gray-100 text-gray-300"}`}
                style={child.weekDays[i] ? { background: "linear-gradient(135deg, #7C3AED, #EC4899)" } : {}}
              >
                {child.weekDays[i] ? "✓" : "–"}
              </div>
              <span className="text-xs text-gray-400 font-semibold">{day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="kid-card p-5">
        <div className="font-black text-gray-800 mb-3">Прогресс по разделам</div>
        <div className="space-y-4">
          {[
            { name: "Чтение", icon: "📖", progress: 75, color: "#7C3AED" },
            { name: "Речь", icon: "🗣️", progress: 50, color: "#EC4899" },
            { name: "Письмо", icon: "✏️", progress: 30, color: "#3B82F6" },
            { name: "Игры", icon: "🎮", progress: 60, color: "#F97316" },
          ].map((s, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <span>{s.icon}</span> {s.name}
                </span>
                <span className="text-xs font-bold" style={{ color: s.color }}>{s.progress}%</span>
              </div>
              <div className="progress-bar-wrap h-3">
                <div
                  className="progress-fill"
                  style={{ width: `${s.progress}%`, background: s.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="kid-card p-5">
        <div className="font-black text-gray-800 mb-3">Рекомендации</div>
        <div className="space-y-3">
          {[
            { icon: "💡", text: "Позанимайтесь речью — Маша делает успехи!", color: "#EAB308" },
            { icon: "⏰", text: "Лучшее время для уроков — 10:00–11:30", color: "#3B82F6" },
            { icon: "🎉", text: "Маша прошла 3 урока подряд — похвалите!", color: "#22C55E" },
          ].map((rec, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0 mt-0.5"
                style={{ background: `${rec.color}22` }}
              >
                {rec.icon}
              </div>
              <span className="text-sm text-gray-600 font-medium">{rec.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const TABS: { id: Tab; icon: string; label: string }[] = [
  { id: "learn", icon: "📖", label: "Учёба" },
  { id: "games", icon: "🎮", label: "Игры" },
  { id: "achievements", icon: "🏆", label: "Трофеи" },
  { id: "parents", icon: "👨‍👩‍👧", label: "Родители" },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("learn");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case "learn": return <TabLearn />;
      case "games": return <TabGames />;
      case "achievements": return <TabAchievements />;
      case "parents": return <TabParents />;
    }
  };

  return (
    <div className="min-h-screen font-nunito" style={{ background: "linear-gradient(160deg, #f5f0ff 0%, #fff0f8 50%, #f0f8ff 100%)" }}>
      <div className="max-w-md mx-auto min-h-screen flex flex-col relative">
        
        {/* Decorative bg blobs */}
        <div className="fixed top-10 left-4 text-4xl opacity-20 anim-float pointer-events-none" style={{ animationDelay: "0s" }}>⭐</div>
        <div className="fixed top-28 right-6 text-3xl opacity-15 anim-float pointer-events-none" style={{ animationDelay: "1s" }}>🌟</div>
        <div className="fixed top-56 left-8 text-2xl opacity-10 anim-float pointer-events-none" style={{ animationDelay: "2s" }}>✨</div>

        {/* Header */}
        <header className="px-5 pt-6 pb-4 flex items-center justify-between">
          <div>
            <div className="text-2xl font-black" style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              ЗнайКа ✨
            </div>
            <div className="text-xs text-gray-400 font-semibold">Учимся играя!</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-yellow-100 rounded-2xl px-3 py-1.5 flex items-center gap-1">
              <span className="text-base">⭐</span>
              <span className="font-black text-yellow-700 text-sm">47</span>
            </div>
            <div className="bg-orange-100 rounded-2xl px-3 py-1.5 flex items-center gap-1">
              <span className="text-base">🔥</span>
              <span className="font-black text-orange-600 text-sm">3</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className={`flex-1 px-4 pb-6 overflow-y-auto transition-opacity duration-300 ${mounted ? "opacity-100" : "opacity-0"}`}>
          {renderTab()}
        </main>

        {/* Bottom Nav */}
        <nav className="sticky bottom-0 bg-white/90 backdrop-blur-xl border-t border-purple-100 px-4 py-3">
          <div className="flex justify-around">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`nav-tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="text-xl">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
