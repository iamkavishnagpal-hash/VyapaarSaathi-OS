import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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
import { ProductPassportHeroRoute } from "./components/ProductPassportView";

import { CommandPaletteModal } from "./components/CommandPaletteModal";
import { ProductCaptureModal } from "./components/ProductCaptureModal";
import { ProductIdentityModal } from "./components/ProductIdentityModal";
import { ProductPassportView } from "./components/ProductPassportView";
import { UnifiedScannerModal } from "./components/UnifiedScannerModal";

const AnimatedPageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

const MainLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="app-layout">
      {/* PERSISTENT SIDEBAR */}
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

      <div className="main-wrapper">
        {/* TOP BAR */}
        <Navbar />

        {/* MAIN VIEW CONTENT WITH ANIMATED ROUTE TRANSITIONS */}
        <main className="view-content">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<AnimatedPageWrapper><DashboardView /></AnimatedPageWrapper>} />
              <Route path="/products" element={<AnimatedPageWrapper><ProductsView /></AnimatedPageWrapper>} />
              <Route path="/products/:productId" element={<AnimatedPageWrapper><ProductPassportHeroRoute /></AnimatedPageWrapper>} />
              <Route path="/inventory" element={<AnimatedPageWrapper><InventoryView /></AnimatedPageWrapper>} />
              <Route path="/sales" element={<AnimatedPageWrapper><SalesView /></AnimatedPageWrapper>} />
              <Route path="/purchases" element={<AnimatedPageWrapper><PurchasesView /></AnimatedPageWrapper>} />
              <Route path="/transfers" element={<AnimatedPageWrapper><TransfersView /></AnimatedPageWrapper>} />
              <Route path="/returns" element={<AnimatedPageWrapper><ReturnsView /></AnimatedPageWrapper>} />
              <Route path="/analytics" element={<AnimatedPageWrapper><AnalyticsView /></AnimatedPageWrapper>} />
              <Route path="/ai" element={<AnimatedPageWrapper><AICenterView /></AnimatedPageWrapper>} />
              <Route path="/customers" element={<AnimatedPageWrapper><ManagementViews view="customers" /></AnimatedPageWrapper>} />
              <Route path="/suppliers" element={<AnimatedPageWrapper><ManagementViews view="suppliers" /></AnimatedPageWrapper>} />
              <Route path="/roles" element={<AnimatedPageWrapper><ManagementViews view="roles" /></AnimatedPageWrapper>} />
              <Route path="/stores" element={<AnimatedPageWrapper><ManagementViews view="stores" /></AnimatedPageWrapper>} />
              <Route path="/integrations" element={<AnimatedPageWrapper><SettingsViews view="integrations" /></AnimatedPageWrapper>} />
              <Route path="/billing" element={<AnimatedPageWrapper><SettingsViews view="billing" /></AnimatedPageWrapper>} />
              <Route path="/preferences" element={<AnimatedPageWrapper><SettingsViews view="preferences" /></AnimatedPageWrapper>} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>

      {/* GLOBAL OVERLAY MODALS & DRAWERS */}
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
    <BrowserRouter>
      <RetailProvider>
        <MainLayout />
      </RetailProvider>
    </BrowserRouter>
  );
}
