export type Tab = "learn" | "games" | "achievements" | "parents";

const TABS: { id: Tab; icon: string; label: string }[] = [
  { id: "learn", icon: "📖", label: "Учёба" },
  { id: "games", icon: "🎮", label: "Игры" },
  { id: "achievements", icon: "🏆", label: "Трофеи" },
  { id: "parents", icon: "👨‍👩‍👧", label: "Родители" },
];

interface AppNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function AppNav({ activeTab, onTabChange }: AppNavProps) {
  return (
    <nav className="sticky bottom-0 bg-white/90 backdrop-blur-xl border-t border-purple-100 px-4 py-3">
      <div className="flex justify-around">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="text-xl">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
