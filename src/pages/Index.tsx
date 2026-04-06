import { useState, useEffect } from "react";
import { type Tab, AppNav } from "@/components/shared/AppNav";
import { AppHeader } from "@/components/shared/AppHeader";
import { TabLearn } from "@/components/tabs/TabLearn";
import { TabGames } from "@/components/tabs/TabGames";
import { TabAchievements } from "@/components/tabs/TabAchievements";
import { ProfileSetup } from "@/components/screens/ProfileSetup";
import { ParentsDashboard } from "@/components/screens/ParentsDashboard";
import { useProfile } from "@/hooks/useProfile";

type Screen = "app" | "profile" | "parents";

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("learn");
  const [screen, setScreen] = useState<Screen>("app");
  const [mounted, setMounted] = useState(false);
  const { profile, updateProfile, isFirstTime } = useProfile();

  useEffect(() => {
    setMounted(true);
  }, []);

  // First-time setup
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

  if (screen === "parents") {
    return <ParentsDashboard profile={profile} onExit={() => setScreen("app")} />;
  }

  const renderTab = () => {
    switch (activeTab) {
      case "learn": return <TabLearn profile={profile} />;
      case "games": return <TabGames />;
      case "achievements": return <TabAchievements />;
      case "parents": return <ParentsDashboard profile={profile} onExit={() => setActiveTab("learn")} />;
    }
  };

  return (
    <div className="min-h-screen font-nunito" style={{ background: "linear-gradient(160deg, #f5f0ff 0%, #fff0f8 50%, #f0f8ff 100%)" }}>
      <div className="max-w-md mx-auto min-h-screen flex flex-col relative">
        <AppHeader profile={profile} onProfileClick={() => setScreen("profile")} />

        <main className={`flex-1 px-4 pb-6 overflow-y-auto transition-opacity duration-300 ${mounted ? "opacity-100" : "opacity-0"}`}>
          {renderTab()}
        </main>

        {activeTab !== "parents" && (
          <AppNav activeTab={activeTab} onTabChange={setActiveTab} />
        )}
      </div>
    </div>
  );
}
