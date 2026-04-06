import { useState } from "react";

export interface Profile {
  name: string;
  avatar: string;
  stars: number;
  streak: number;
  level: number;
}

export const AVATARS = ["🦊", "🐱", "🐶", "🐸", "🐼", "🐨", "🦁", "🐯", "🐺", "🦝", "🐻", "🐮"];

const DEFAULT_PROFILE: Profile = {
  name: "",
  avatar: "🦊",
  stars: 47,
  streak: 3,
  level: 3,
};

const KEY = "znaika_profile";

function load(): Profile {
  try {
    const saved = localStorage.getItem(KEY);
    return saved ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) } : DEFAULT_PROFILE;
  } catch (_e) {
    return DEFAULT_PROFILE;
  }
}

function persist(p: Profile) {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch (_e) { /* ignore */ }
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(load);

  const updateProfile = (updates: Partial<Profile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      persist(next);
      return next;
    });
  };

  const isFirstTime = !profile.name;

  return { profile, updateProfile, isFirstTime };
}
