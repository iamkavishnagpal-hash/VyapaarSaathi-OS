import React, { useState, useEffect } from "react";
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

import { PrototypeIntelligencePanel } from "./components/PrototypeIntelligencePanel";
import { CommandPaletteModal } from "./components/CommandPaletteModal";
import { SystemBootModal } from "./components/SystemBootModal";
import { ProductCaptureModal } from "./components/ProductCaptureModal";
import { UnifiedScannerModal } from "./components/UnifiedScannerModal";
import { StockTransferModal } from "./components/StockTransferModal";
import { ErrorBoundary } from "./components/ErrorBoundary";

const MainContent = () => {
  const { activeView } = useRetail();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Prototype OS & Workflow Modals
  const [isPrototypePanelOpen, setIsPrototypePanelOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSystemBootOpen, setIsSystemBootOpen] = useState(false);
  const [isCaptureModalOpen, setIsCaptureModalOpen] = useState(false);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setIsSidebarCollapsed((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("keydown", handleKeyDown);
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
      {/* PERSISTENT SIDEBAR */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed} 
      />

      <div className="main-content">
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
          onRefresh={triggerPullRefresh}
          onOpenPrototypePanel={() => setIsPrototypePanelOpen(!isPrototypePanelOpen)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenSystemBoot={() => setIsSystemBootOpen(true)}
        />

        {isRefreshing && (
          <div className="pull-refresh-indicator">
            <span>Refreshing Retail OS Live Data...</span>
          </div>
        )}

        <main className="view-container">
          {renderActiveView()}
        </main>

        {/* PROTOTYPE INTELLIGENCE LAYER OVERLAYS & WORKFLOW MODALS */}
        <PrototypeIntelligencePanel 
          isOpen={isPrototypePanelOpen}
          onClose={() => setIsPrototypePanelOpen(false)}
          activeFeatureId={activeView}
        />

        <CommandPaletteModal
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
        />

        <SystemBootModal
          isOpen={isSystemBootOpen}
          onClose={() => setIsSystemBootOpen(false)}
        />

        <ProductCaptureModal
          isOpen={isCaptureModalOpen}
          onClose={() => setIsCaptureModalOpen(false)}
        />

        <UnifiedScannerModal
          isOpen={isScannerModalOpen}
          onClose={() => setIsScannerModalOpen(false)}
        />

        <StockTransferModal
          isOpen={isTransferModalOpen}
          onClose={() => setIsTransferModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <RetailProvider>
        <MainContent />
      </RetailProvider>
    </ErrorBoundary>
  );
}
