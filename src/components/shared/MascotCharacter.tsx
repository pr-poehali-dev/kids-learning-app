export function StarRating({ stars, max = 3 }: { stars: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={`text-lg transition-all ${i < stars ? "opacity-100 anim-sparkle" : "opacity-25"}`} style={{ animationDelay: `${i * 0.3}s` }}>⭐</span>
      ))}
    </div>
  );
}

export function ConfettiPiece({ delay, color, left }: { delay: number; color: string; left: number }) {
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

export function MascotCharacter({ mood = 0 }: { mood?: number }) {
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
        TW
      </div>
    </div>
  );
}