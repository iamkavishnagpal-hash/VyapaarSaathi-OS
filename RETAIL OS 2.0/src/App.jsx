import React, { useState } from "react";
import { RetailProvider, useRetail } from "./context/RetailContext";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";

import { DashboardView } from "./views/DashboardView";
import { ProductsView } from "./views/ProductsView";
import { InventoryView } from "./views/InventoryView";
import { SalesView } from "./views/SalesView";
import { PurchasesView } from "./views/PurchasesView";
import { TransfersView } from "./views/TransfersView";
import { ReturnsView } from "./views/ReturnsView";
import { AnalyticsView } from "./views/AnalyticsView";
import { AICenterView } from "./views/AICenterView";
import { ManagementViews } from "./views/ManagementViews";
import { SettingsViews } from "./views/SettingsViews";

import { CommandPaletteModal } from "./components/CommandPaletteModal";
import { ProductCaptureModal } from "./components/ProductCaptureModal";
import { ProductIdentityModal } from "./components/ProductIdentityModal";
import { ProductPassportView } from "./components/ProductPassportView";
import { UnifiedScannerModal } from "./components/UnifiedScannerModal";

const MainLayout = () => {
  const { activeView } = useRetail();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView />;
      case "products":
        return <ProductsView />;
      case "inventory":
        return <InventoryView />;
      case "sales":
        return <SalesView />;
      case "purchases":
        return <PurchasesView />;
      case "transfers":
        return <TransfersView />;
      case "returns":
        return <ReturnsView />;
      case "analytics":
        return <AnalyticsView />;
      case "ai":
        return <AICenterView />;
      case "customers":
      case "suppliers":
      case "roles":
      case "stores":
        return <ManagementViews />;
      case "integrations":
      case "billing":
      case "preferences":
        return <SettingsViews />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="app-layout">
      {/* PERSISTENT SIDEBAR */}
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

      <div className="main-wrapper">
        {/* TOP BAR */}
        <Navbar />

        {/* MAIN VIEW CONTENT */}
        <main className="view-content">
          {renderActiveView()}
        </main>
      </div>

      {/* OVERLAY MODALS & DRAWERS */}
      <CommandPaletteModal />
      <ProductCaptureModal />
      <ProductIdentityModal />
      <ProductPassportView />
      <UnifiedScannerModal />
    </div>
  );
};

export default function App() {
  return (
    <RetailProvider>
      <MainLayout />
    </RetailProvider>
  );
}
