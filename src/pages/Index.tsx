import { useState, useEffect } from "react";
import { type Tab, AppNav } from "@/components/shared/AppNav";
import { AppHeader } from "@/components/shared/AppHeader";
import { TabLearn } from "@/components/tabs/TabLearn";
import { TabGames } from "@/components/tabs/TabGames";
import { TabAchievements } from "@/components/tabs/TabAchievements";
import { ProfileSetup } from "@/components/screens/ProfileSetup";
import { useProfile } from "@/hooks/useProfile";
import { useXP } from "@/hooks/useXP";

type Screen = "app" | "profile";

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("learn");
  const [screen, setScreen] = useState<Screen>("app");
  const [mounted, setMounted] = useState(false);
  const { profile, updateProfile, isFirstTime } = useProfile();
  const { state: xpState, addXP, getLevelInfo } = useXP();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isFirstTime || screen === "profile") {
    return (
      <ProfileSetup
        current={profile}
        onSave={updateProfile}
        onClose={isFirstTime ? undefined : () => setScreen("app")}
        isFirstTime={isFirstTime}
      />
    );
  }

  const levelInfo = getLevelInfo();

  const renderTab = () => {
    switch (activeTab) {
      case "learn": return <TabLearn profile={profile} xpState={xpState} addXP={addXP} />;
      case "games": return <TabGames xpState={xpState} addXP={addXP} />;
      case "achievements": return <TabAchievements xpState={xpState} />;
    }
  };

  return (
    <div className="min-h-screen font-nunito" style={{ background: "linear-gradient(160deg, #f5f0ff 0%, #fff0f8 50%, #f0f8ff 100%)" }}>
      <div className="max-w-md mx-auto min-h-screen flex flex-col relative">
        <AppHeader profile={profile} xpState={xpState} levelInfo={levelInfo} onProfileClick={() => setScreen("profile")} />

        <main className={`flex-1 px-4 pb-6 overflow-y-auto transition-opacity duration-300 ${mounted ? "opacity-100" : "opacity-0"}`}>
          {renderTab()}
        </main>

        <AppNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}
