import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useRetail } from "../context/RetailContext";
import { 
  Search, 
  Package, 
  Camera, 
  ScanLine, 
  ShoppingBag, 
  Truck, 
  BarChart3, 
  Bot, 
  X, 
  ArrowRight 
} from "lucide-react";

export const CommandPaletteModal = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    products,
    setIsCaptureModalOpen,
    openScanner
  } = useRetail();

  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.sku.toLowerCase().includes(query.toLowerCase()) ||
      p.barcode.includes(query) ||
      p.brand.toLowerCase().includes(query.toLowerCase())
  );

  const quickActions = [
    {
      id: "action-capture",
      label: "AI Camera Product Analysis",
      detail: "Add physical product using computer vision",
      icon: Camera,
      action: () => {
        setIsCommandPaletteOpen(false);
        setIsCaptureModalOpen(true);
      }
    },
    {
      id: "action-scan",
      label: "Open Barcode Scanner Engine",
      detail: "Scan barcodes for sale, stock count, or receiving",
      icon: ScanLine,
      action: () => {
        setIsCommandPaletteOpen(false);
        openScanner("Sale");
      }
    },
    {
      id: "action-sale",
      label: "New POS Billing Transaction",
      detail: "Open checkout register",
      icon: ScanLine,
      action: () => {
        setIsCommandPaletteOpen(false);
        navigate("/sales");
      }
    },
    {
      id: "action-po",
      label: "Create Purchase Order",
      detail: "Draft supplier replenishment PO",
      icon: ShoppingBag,
      action: () => {
        setIsCommandPaletteOpen(false);
        navigate("/purchases");
      }
    },
    {
      id: "action-transfer",
      label: "Transfer Stock to Store Location",
      detail: "Initiate store-to-store transfer",
      icon: Truck,
      action: () => {
        setIsCommandPaletteOpen(false);
        navigate("/transfers");
      }
    },
    {
      id: "action-analytics",
      label: "Open Performance Analytics",
      detail: "View revenue and inventory health",
      icon: BarChart3,
      action: () => {
        setIsCommandPaletteOpen(false);
        navigate("/analytics");
      }
    },
    {
      id: "action-ai",
      label: "Ask AI Assistant Intelligence",
      detail: "Get contextual business recommendations",
      icon: Bot,
      action: () => {
        setIsCommandPaletteOpen(false);
        navigate("/ai");
      }
    }
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(8, 11, 16, 0.75)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "10vh",
        zIndex: 1000
      }}
      onClick={() => setIsCommandPaletteOpen(false)}
    >
      <motion.div
        className="card-panel-elevated"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.16 }}
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: 0,
          overflow: "hidden",
          boxShadow: "var(--shadow-lg)",
          border: "1px solid var(--border-color)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* SEARCH HEADER */}
        <div style={{ display: "flex", alignItems: "center", padding: "14px 16px", borderBottom: "1px solid var(--border-color)", gap: "12px" }}>
          <Search size={18} color="var(--primary)" />
          <input
            type="text"
            placeholder="Type a command or search product catalog..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--text-main)",
              fontSize: "14px",
              fontFamily: "var(--font-sans)"
            }}
          />
          <button onClick={() => setIsCommandPaletteOpen(false)} className="btn btn-ghost" style={{ padding: "4px" }}>
            <X size={16} />
          </button>
        </div>

        {/* RESULTS BODY */}
        <div style={{ maxHeight: "400px", overflowY: "auto", padding: "12px" }}>
          
          {/* MATCHING PRODUCTS */}
          {query.trim() !== "" && (
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "8px", paddingLeft: "8px" }}>
                Matching Products ({filteredProducts.length})
              </div>
              {filteredProducts.length === 0 ? (
                <div style={{ fontSize: "12px", color: "var(--text-muted)", padding: "8px" }}>No products matched your search.</div>
              ) : (
                filteredProducts.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setIsCommandPaletteOpen(false);
                      navigate(`/products/${p.id}`);
                    }}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      borderRadius: "var(--radius-xs)",
                      border: "none",
                      background: "transparent",
                      color: "var(--text-main)",
                      cursor: "pointer",
                      marginBottom: "4px",
                      textAlign: "left"
                    }}
                    className="card-hoverable"
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Package size={16} color="var(--primary)" />
                      <div>
                        <div style={{ fontWeight: "600", fontSize: "13px" }}>{p.title}</div>
                        <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>SKU: {p.sku} • Stock: {p.stockQty} units • ${p.sellingPrice.toFixed(2)}</div>
                      </div>
                    </div>
                    <ArrowRight size={14} color="var(--text-muted)" />
                  </button>
                ))
              )}
            </div>
          )}

          {/* QUICK COMMAND ACTIONS */}
          <div>
            <div style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "8px", paddingLeft: "8px" }}>
              Fast Commands & Operations
            </div>
            {quickActions.map((qa) => {
              const Icon = qa.icon;
              return (
                <button
                  key={qa.id}
                  onClick={qa.action}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px",
                    borderRadius: "var(--radius-xs)",
                    border: "none",
                    background: "transparent",
                    color: "var(--text-main)",
                    cursor: "pointer",
                    marginBottom: "4px",
                    textAlign: "left"
                  }}
                  className="card-hoverable"
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <Icon size={16} color="var(--primary)" />
                    <div>
                      <div style={{ fontWeight: "600", fontSize: "13px" }}>{qa.label}</div>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{qa.detail}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Execute</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* FOOTER SHORTCUT HINT */}
        <div style={{ padding: "10px 16px", backgroundColor: "var(--bg-surface)", borderTop: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-muted)" }}>
          <span>Press <strong>Esc</strong> to close</span>
          <span><strong>⌘K</strong> to toggle command palette</span>
        </div>

      </motion.div>
    </div>
  );
};
