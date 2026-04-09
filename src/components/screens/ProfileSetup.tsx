import { useState } from "react";
import { AVATARS, type Profile } from "@/hooks/useProfile";

interface Props {
  current: Profile;
  onSave: (updates: Partial<Profile>) => void;
  onClose?: () => void;
  isFirstTime?: boolean;
}

export function ProfileSetup({ current, onSave, onClose, isFirstTime = false }: Props) {
  const [name, setName] = useState(current.name);
  const [avatar, setAvatar] = useState(current.avatar);
  const [error, setError] = useState("");

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) { setError("Введи своё имя!"); return; }
    if (trimmed.length < 2) { setError("Имя слишком короткое"); return; }
    onSave({ name: trimmed, avatar });
    if (onClose) onClose();
  };

  return (
    <div className="min-h-screen font-nunito flex flex-col items-center justify-center px-6 py-10"
      style={{ background: "linear-gradient(160deg, #f5f0ff 0%, #fff0f8 50%, #f0f8ff 100%)" }}
    >
      {/* Decorations */}
      <div className="fixed top-10 left-4 text-4xl opacity-20 anim-float pointer-events-none">⭐</div>
      <div className="fixed top-28 right-6 text-3xl opacity-15 anim-float pointer-events-none" style={{ animationDelay: "1s" }}>🌟</div>

      <div className="w-full max-w-sm space-y-6 anim-slide-up">
        {/* Logo */}
        <div className="text-center">
          <div className="text-5xl mb-3 anim-bounce-slow">🦉</div>
          <div className="text-3xl font-black" style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            TW ✨
          </div>
          <div className="text-gray-400 font-semibold mt-1 text-sm">
            {isFirstTime ? "Добро пожаловать! Как тебя зовут?" : "Измени свой профиль"}
          </div>
        </div>

        {/* Avatar picker */}
        <div className="kid-card p-5">
          <div className="font-black text-gray-700 mb-3 text-center">Выбери аватар</div>
          <div className="grid grid-cols-6 gap-2">
            {AVATARS.map((a) => (
              <button
                key={a}
                onClick={() => setAvatar(a)}
                className={`w-10 h-10 rounded-2xl text-xl flex items-center justify-center transition-all active:scale-90 ${
                  avatar === a
                    ? "bg-purple-600 shadow-lg scale-110"
                    : "bg-gray-100 hover:bg-purple-100"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
          {/* Preview */}
          <div className="flex justify-center mt-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-4xl anim-bounce-slow"
              style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)", boxShadow: "0 8px 25px rgba(124,58,237,0.35)" }}
            >
              {avatar}
            </div>
          </div>
        </div>

        {/* Name input */}
        <div className="kid-card p-5">
          <div className="font-black text-gray-700 mb-3">Твоё имя</div>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            placeholder="Например: Маша"
            maxLength={20}
            className="w-full rounded-2xl border-2 border-purple-200 px-4 py-3 text-lg font-bold text-gray-800 focus:outline-none focus:border-purple-500 transition-all bg-purple-50 placeholder:text-gray-300"
          />
          {error && <div className="text-red-500 text-sm font-bold mt-2">{error}</div>}
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleSave}
            className="w-full kid-btn py-4 text-lg"
            style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}
          >
            {isFirstTime ? "Начать учиться! 🚀" : "Сохранить ✅"}
          </button>
          {!isFirstTime && onClose && (
            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl text-gray-400 font-bold text-sm hover:text-gray-600 transition-all"
            >
              Отмена
            </button>
          )}
        </div>
      </div>
    </div>
  );
}