import { useState, useEffect } from "react";
import { type Tab, AppNav } from "@/components/shared/AppNav";
import { AppHeader } from "@/components/shared/AppHeader";
import { TabLearn } from "@/components/tabs/TabLearn";
import { TabGames } from "@/components/tabs/TabGames";
import { TabAchievements } from "@/components/tabs/TabAchievements";
import { TabParents } from "@/components/tabs/TabParents";

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
        <AppHeader />

        <main className={`flex-1 px-4 pb-6 overflow-y-auto transition-opacity duration-300 ${mounted ? "opacity-100" : "opacity-0"}`}>
          {renderTab()}
        </main>

        <AppNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}
