import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { RetailProvider } from "./context/RetailContext";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";

import { DashboardView } from "./views/DashboardView";
import { CommerceWorkspace } from "./views/CommerceWorkspace";
import { SupplyWorkspace } from "./views/SupplyWorkspace";
import { IntelligenceWorkspace } from "./views/IntelligenceWorkspace";
import { SettingsViews } from "./views/SettingsViews";
import { ProductPassportHeroRoute } from "./components/ProductPassportView";

import { CommandPaletteModal } from "./components/CommandPaletteModal";
import { ProductCaptureModal } from "./components/ProductCaptureModal";
import { ProductIdentityModal } from "./components/ProductIdentityModal";
import { UnifiedScannerModal } from "./components/UnifiedScannerModal";
import { SaathiFloatingBar } from "./components/SaathiFloatingBar";

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

      <div className="main-wrapper" style={{ paddingBottom: "90px" }}>
        {/* TOP BAR */}
        <Navbar />

        {/* MAIN VIEW CONTENT WITH ANIMATED ROUTE TRANSITIONS */}
        <main className="view-content">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<AnimatedPageWrapper><DashboardView /></AnimatedPageWrapper>} />
              <Route path="/commerce" element={<AnimatedPageWrapper><CommerceWorkspace /></AnimatedPageWrapper>} />
              <Route path="/supply" element={<AnimatedPageWrapper><SupplyWorkspace /></AnimatedPageWrapper>} />
              <Route path="/intelligence" element={<AnimatedPageWrapper><IntelligenceWorkspace /></AnimatedPageWrapper>} />
              <Route path="/settings" element={<AnimatedPageWrapper><SettingsViews view="preferences" /></AnimatedPageWrapper>} />
              
              {/* HERO PRODUCT PASSPORT ROUTE */}
              <Route path="/products/:productId" element={<AnimatedPageWrapper><ProductPassportHeroRoute /></AnimatedPageWrapper>} />

              {/* FORWARD LEGACY ROUTES TO CORRESPONDING CORE WORKSPACE */}
              <Route path="/products" element={<Navigate to="/supply" replace />} />
              <Route path="/inventory" element={<Navigate to="/supply" replace />} />
              <Route path="/purchases" element={<Navigate to="/supply" replace />} />
              <Route path="/transfers" element={<Navigate to="/supply" replace />} />
              <Route path="/suppliers" element={<Navigate to="/supply" replace />} />

              <Route path="/sales" element={<Navigate to="/commerce" replace />} />
              <Route path="/returns" element={<Navigate to="/commerce" replace />} />
              <Route path="/customers" element={<Navigate to="/commerce" replace />} />

              <Route path="/analytics" element={<Navigate to="/intelligence" replace />} />
              <Route path="/ai" element={<Navigate to="/intelligence" replace />} />

              <Route path="/roles" element={<Navigate to="/settings" replace />} />
              <Route path="/stores" element={<Navigate to="/settings" replace />} />
              <Route path="/integrations" element={<Navigate to="/settings" replace />} />
              <Route path="/billing" element={<Navigate to="/settings" replace />} />
              <Route path="/preferences" element={<Navigate to="/settings" replace />} />

              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>

      {/* GLOBAL SAATHI INTENT BAR ("Saathi, aaj kya important hai?") */}
      <SaathiFloatingBar />

      {/* GLOBAL OVERLAY MODALS */}
      <CommandPaletteModal />
      <ProductCaptureModal />
      <ProductIdentityModal />
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
