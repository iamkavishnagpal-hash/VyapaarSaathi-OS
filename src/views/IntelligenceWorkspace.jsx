import React, { useState } from "react";
import { AnalyticsView } from "./AnalyticsView";
import { AICenterView } from "./AICenterView";
import { BarChart3, Sparkles, Activity } from "lucide-react";

export const IntelligenceWorkspace = () => {
  const [activeSubTab, setActiveSubTab] = useState("analytics"); // 'analytics' | 'ai-insights'

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* WORKSPACE SUB-NAVIGATION TABS */}
      <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
        <button
          onClick={() => setActiveSubTab("analytics")}
          className={`btn ${activeSubTab === "analytics" ? "btn-primary" : "btn-secondary"}`}
          style={{ gap: "6px" }}
        >
          <BarChart3 size={16} /> Commercial Analytics & P&L
        </button>

        <button
          onClick={() => setActiveSubTab("ai-insights")}
          className={`btn ${activeSubTab === "ai-insights" ? "btn-primary" : "btn-secondary"}`}
          style={{ gap: "6px" }}
        >
          <Sparkles size={16} color="var(--ai-accent)" /> Cross-Domain Intelligence & Audit
        </button>
      </div>

      {/* RENDER ACTIVE INTELLIGENCE SUB-TAB */}
      {activeSubTab === "analytics" && <AnalyticsView />}
      {activeSubTab === "ai-insights" && <AICenterView />}
    </div>
  );
};
