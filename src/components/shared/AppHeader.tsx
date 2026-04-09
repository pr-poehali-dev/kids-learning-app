import { type Profile } from "@/hooks/useProfile";
import { type XPState, LEVELS } from "@/hooks/useXP";

interface LevelInfo {
  level: number;
  name: string;
  min: number;
  max: number;
  color: string;
}

interface Props {
  profile: Profile;
  xpState: XPState;
  levelInfo: LevelInfo;
  onProfileClick: () => void;
}

export function AppHeader({ profile, xpState, levelInfo, onProfileClick }: Props) {
  const nextLevel = LEVELS.find(l => l.level === xpState.level + 1);
  const xpInLevel = xpState.xp - levelInfo.min;
  const xpNeeded = nextLevel ? nextLevel.min - levelInfo.min : 1;
  const pct = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));

  return (
    <>
      <div className="fixed top-10 left-4 text-4xl opacity-20 anim-float pointer-events-none" style={{ animationDelay: "0s" }}>⭐</div>
      <div className="fixed top-28 right-6 text-3xl opacity-15 anim-float pointer-events-none" style={{ animationDelay: "1s" }}>🌟</div>
      <div className="fixed top-56 left-8 text-2xl opacity-10 anim-float pointer-events-none" style={{ animationDelay: "2s" }}>✨</div>

      <header className="px-5 pt-6 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div
              className="text-2xl font-black"
              style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              ЗнайКа ✨
            </div>
            <div className="text-xs text-gray-400 font-semibold">Учимся играя!</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-yellow-100 rounded-2xl px-3 py-1.5 flex items-center gap-1">
              <span className="text-base">⭐</span>
              <span className="font-black text-yellow-700 text-sm">{xpState.xp} XP</span>
            </div>
            <button
              onClick={onProfileClick}
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl transition-all active:scale-90"
              style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)", boxShadow: "0 3px 8px rgba(124,58,237,0.3)" }}
              title="Изменить профиль"
            >
              {profile.avatar}
            </button>
          </div>
        </div>

        {/* Level bar */}
        <div className="bg-white/70 rounded-2xl px-3 py-2 flex items-center gap-3 backdrop-blur-sm border border-white/80">
          <div className="text-base">{levelInfo.name.split(" ")[0]}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black" style={{ color: levelInfo.color }}>{levelInfo.name}</span>
              <span className="text-xs text-gray-400 font-semibold">{pct}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pct}%`, background: levelInfo.color }}
              />
            </div>
          </div>
          {nextLevel && (
            <div className="text-base opacity-40">{nextLevel.name.split(" ")[0]}</div>
          )}
        </div>
      </header>
    </>
  );
}
