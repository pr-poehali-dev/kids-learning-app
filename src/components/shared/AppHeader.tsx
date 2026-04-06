import { type Profile } from "@/hooks/useProfile";

interface Props {
  profile: Profile;
  onProfileClick: () => void;
}

export function AppHeader({ profile, onProfileClick }: Props) {
  return (
    <>
      <div className="fixed top-10 left-4 text-4xl opacity-20 anim-float pointer-events-none" style={{ animationDelay: "0s" }}>⭐</div>
      <div className="fixed top-28 right-6 text-3xl opacity-15 anim-float pointer-events-none" style={{ animationDelay: "1s" }}>🌟</div>
      <div className="fixed top-56 left-8 text-2xl opacity-10 anim-float pointer-events-none" style={{ animationDelay: "2s" }}>✨</div>

      <header className="px-5 pt-6 pb-4 flex items-center justify-between">
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
            <span className="font-black text-yellow-700 text-sm">{profile.stars}</span>
          </div>
          <div className="bg-orange-100 rounded-2xl px-3 py-1.5 flex items-center gap-1">
            <span className="text-base">🔥</span>
            <span className="font-black text-orange-600 text-sm">{profile.streak}</span>
          </div>
          <button
            onClick={onProfileClick}
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl transition-all active:scale-90 hover:shadow-md"
            style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)", boxShadow: "0 3px 8px rgba(124,58,237,0.3)" }}
            title="Изменить профиль"
          >
            {profile.avatar}
          </button>
        </div>
      </header>
    </>
  );
}
