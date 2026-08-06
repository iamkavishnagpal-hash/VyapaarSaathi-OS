import React from "react";
import { useRetail } from "../context/RetailContext";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Bot, 
  Grid,
  Sparkles
} from "lucide-react";

export const MobileBottomNav = ({ onOpenMobileMenu }) => {
  const { activeView, setActiveView, t, products, toggleVoiceListening, isListening } = useRetail();

  const lowStockCount = products.filter((p) => p.stockQty <= p.lowStockThreshold).length;

  const tabs = [
    { id: "dashboard", label: t("dashboard"), icon: LayoutDashboard },
    { id: "orders", label: t("orders"), icon: ShoppingBag },
    { id: "inventory", label: t("inventory"), icon: Package, badge: lowStockCount > 0 ? lowStockCount : null },
    { id: "ai", label: t("aiCenter"), icon: Bot },
  ];

  return (
    <>
      {/* FLOATING MOBILE AI ASSISTANT FAB SPECIFICATION */}
      <button
        onClick={toggleVoiceListening}
        className={`mobile-ai-fab ${isListening ? "mic-active" : ""}`}
        aria-label="Floating AI Voice Assistant"
        title="Floating AI Co-Pilot"
      >
        <Sparkles size={22} color="#ffffff" />
      </button>

      {/* 5-TAB MOBILE DOCK */}
      <nav className="mobile-bottom-nav">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeView === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className={`mobile-nav-item ${isActive ? "active" : ""}`}
              aria-label={tab.label}
            >
              <div style={{ position: "relative" }}>
                <Icon size={22} />
                {tab.badge && (
                  <span className="mobile-badge">{tab.badge}</span>
                )}
              </div>
              <span>{tab.label}</span>
            </button>
          );
        })}

        <button
          onClick={onOpenMobileMenu}
          className="mobile-nav-item"
          aria-label="More Destinations"
        >
          <Grid size={22} />
          <span>More</span>
        </button>
      </nav>
    </>
  );
};
