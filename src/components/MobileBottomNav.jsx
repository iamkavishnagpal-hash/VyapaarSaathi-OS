import React from "react";
import { useRetail } from "../context/RetailContext";
import { 
  LayoutDashboard, 
  Package, 
  Receipt, 
  ShoppingBag, 
  Grid 
} from "lucide-react";

export const MobileBottomNav = ({ onOpenMobileMenu }) => {
  const { activeView, setActiveView, t, products } = useRetail();

  const lowStockCount = products.filter((p) => p.stockQty <= p.lowStockThreshold).length;

  const tabs = [
    { id: "dashboard", label: t("dashboard"), icon: LayoutDashboard },
    { id: "inventory", label: t("inventory"), icon: Package, badge: lowStockCount > 0 ? lowStockCount : null },
    { id: "pos", label: t("posBilling"), icon: Receipt },
    { id: "orders", label: t("orders"), icon: ShoppingBag }
  ];

  return (
    <nav className="mobile-bottom-nav">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeView === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id)}
            className={`mobile-nav-item ${isActive ? "active" : ""}`}
          >
            <div style={{ position: "relative" }}>
              <Icon size={20} />
              {tab.badge && (
                <span className="mobile-badge">{tab.badge}</span>
              )}
            </div>
            <span>{tab.label}</span>
          </button>
        );
      })}

      {/* Prominent Full-Screen Overlay Launcher Button */}
      <button
        onClick={onOpenMobileMenu}
        className="mobile-nav-item mobile-menu-launcher"
      >
        <Grid size={22} color="#ffffff" />
        <span>Menu</span>
      </button>
    </nav>
  );
};
