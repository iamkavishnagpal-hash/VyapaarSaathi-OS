import React, { useState } from "react";
import { RetailProvider, useRetail } from "./context/RetailContext";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";

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
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isRefreshing, setIsRefreshing] = useState(false);

  React.useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const triggerPullRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

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
        {/* STICKY OFFLINE STATUS TOAST BANNER */}
        {isOffline && (
          <div className="offline-banner">
            <span>Working Offline — Catalog & Draft Bills Saved Locally. Auto-sync when online.</span>
          </div>
        )}

        <Navbar 
          isMobileMenuOpen={isMobileMenuOpen} 
          setIsMobileMenuOpen={setIsMobileMenuOpen} 
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
        />

        {isRefreshing && (
          <div className="pull-refresh-indicator">
            <span>Refreshing Retail OS Live Data...</span>
          </div>
        )}

        {renderActiveView()}
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
