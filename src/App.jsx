import React, { useState } from "react";
import { RetailProvider, useRetail } from "./context/RetailContext";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { MobileBottomNav } from "./components/MobileBottomNav";

import { DashboardView } from "./views/DashboardView";
import { InventoryView } from "./views/InventoryView";
import { BillingPOSView } from "./views/BillingPOSView";
import { OrdersView } from "./views/OrdersView";
import { StoreBuilderView } from "./views/StoreBuilderView";
import { MigrationView } from "./views/MigrationView";
import { AICenterView } from "./views/AICenterView";
import { CommsHubView } from "./views/CommsHubView";
import { AnalyticsView } from "./views/AnalyticsView";
import { SettingsView } from "./views/SettingsView";

const MainContent = () => {
  const { activeView } = useRetail();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true); // Collapsed State (Default: 72px)

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView />;
      case "inventory":
        return <InventoryView />;
      case "pos":
        return <BillingPOSView />;
      case "orders":
        return <OrdersView />;
      case "storefront":
        return <StoreBuilderView />;
      case "migration":
        return <MigrationView />;
      case "ai":
        return <AICenterView />;
      case "comms":
        return <CommsHubView />;
      case "analytics":
        return <AnalyticsView />;
      case "settings":
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="app-container">
      {/* COLLAPSIBLE SIDEBAR WITH PUSH CONTENT TRANSITION */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed} 
      />

      <div className="main-content" style={{ flex: 1, minWidth: 0, transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        <Navbar 
          isMobileMenuOpen={isMobileMenuOpen} 
          setIsMobileMenuOpen={setIsMobileMenuOpen} 
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
        />
        {renderActiveView()}
        
        {/* STRICTLY MOBILE-ONLY FLOATING DOCK (HIDDEN ON DESKTOP VIA MEDIA QUERY) */}
        <MobileBottomNav 
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)} 
        />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <RetailProvider>
      <MainContent />
    </RetailProvider>
  );
}
