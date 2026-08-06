import React from "react";
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
      <Sidebar />
      <div className="main-content">
        <Navbar />
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
