import React, { memo } from "react";
import { useRetail } from "../context/RetailContext";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Sparkles, 
  Grid 
} from "lucide-react";

export const MobileBottomNav = memo(({ onOpenMobileMenu }) => {
  const { activeView, setActiveView, products, toggleVoiceListening, isListening } = useRetail();

  const lowStockCount = products.filter((p) => p.stockQty <= p.lowStockThreshold).length;

  return (
    <nav className="mobile-floating-dock-wrapper" aria-label="Mobile Navigation Dock">
      <div className="mobile-glass-dock">
        
        {/* 1. HOME TAB */}
        <button
          onClick={() => setActiveView("dashboard")}
          className={`dock-item ${activeView === "dashboard" ? "active" : ""}`}
          aria-selected={activeView === "dashboard"}
          aria-label="Home Dashboard"
        >
          <div className="dock-icon-wrapper">
            <LayoutDashboard size={activeView === "dashboard" ? 24 : 22} strokeWidth={1.75} />
          </div>
          <span className="dock-label">Home</span>
        </button>

        {/* 2. ORDERS TAB */}
        <button
          onClick={() => setActiveView("orders")}
          className={`dock-item ${activeView === "orders" ? "active" : ""}`}
          aria-selected={activeView === "orders"}
          aria-label="Orders"
        >
          <div className="dock-icon-wrapper">
            <ShoppingBag size={activeView === "orders" ? 24 : 22} strokeWidth={1.75} />
          </div>
          <span className="dock-label">Orders</span>
        </button>

        {/* 3. AI PRIMARY ACTION BUTTON (CENTER ELEVATED FLOATING ACTION) */}
        <button
          onClick={() => {
            setActiveView("ai");
            toggleVoiceListening();
          }}
          className={`dock-ai-center-btn ${isListening ? "listening" : ""}`}
          aria-label="AI Co-Pilot Assistant"
          title="AI Co-Pilot Assistant"
        >
          <div className="ai-btn-inner">
            <Sparkles size={24} strokeWidth={1.75} color="#ffffff" />
          </div>
          <span className="dock-label ai-label">AI</span>
        </button>

        {/* 4. STOCK TAB (WITH AUTO-SIZING RED BADGE) */}
        <button
          onClick={() => setActiveView("inventory")}
          className={`dock-item ${activeView === "inventory" ? "active" : ""}`}
          aria-selected={activeView === "inventory"}
          aria-label="Stock Inventory"
        >
          <div className="dock-icon-wrapper" style={{ position: "relative" }}>
            <Package size={activeView === "inventory" ? 24 : 22} strokeWidth={1.75} />
            {lowStockCount > 0 && (
              <span className="dock-badge-pill" aria-label={`${lowStockCount} alerts`}>
                {lowStockCount}
              </span>
            )}
          </div>
          <span className="dock-label">Stock</span>
        </button>

        {/* 5. MORE TAB (LAUNCHES FULL-SCREEN OVERLAY) */}
        <button
          onClick={onOpenMobileMenu}
          className="dock-item"
          aria-label="More Navigation Options"
        >
          <div className="dock-icon-wrapper">
            <Grid size={22} strokeWidth={1.75} />
          </div>
          <span className="dock-label">More</span>
        </button>

      </div>
    </nav>
  );
});
