import React, { useState, useEffect } from "react";
import { useRetail } from "../context/RetailContext";
import { 
  Command, 
  ArrowRight, 
  X,
  Database
} from "lucide-react";

export const CommandPaletteModal = ({ isOpen, onClose }) => {
  const { setActiveView, saveWorkspaceSnapshot } = useRetail();
  const [query, setQuery] = useState("");

  const commands = [
    {
      id: "new-bill",
      title: "Create New Counter Bill",
      category: "POS Billing",
      shortcut: "⌘N",
      description: "Opens high-speed POS billing counter for instant barcode checkout.",
      systemEffect: "Deducts inventory stock, calculates CGST/SGST tax, prints receipt.",
      action: () => { setActiveView("pos"); onClose(); }
    },
    {
      id: "add-product",
      title: "Add Product via AI Vision Camera",
      category: "Inventory",
      shortcut: "⌘P",
      description: "Captures physical product image and auto-extracts attributes & barcode.",
      systemEffect: "Creates new item SKU, generates barcode, updates central catalog.",
      action: () => { setActiveView("inventory"); onClose(); }
    },
    {
      id: "ai-advisor",
      title: "Run AI Win-Back Campaign",
      category: "AI Core",
      shortcut: "⌘A",
      description: "Triggers WhatsApp broadcast code to 12 inactive VIP customers.",
      systemEffect: "Queries churn models, dispatches coupon payload, forecasts +₹48,000 ROI.",
      action: () => { setActiveView("ai"); onClose(); }
    },
    {
      id: "orders-ledger",
      title: "View Multi-Channel Orders Ledger",
      category: "Operations",
      shortcut: "⌘O",
      description: "Displays real-time transaction ledger across POS and Shopify web store.",
      systemEffect: "Queries live transactions table, shows fulfillment status.",
      action: () => { setActiveView("orders"); onClose(); }
    },
    {
      id: "analytics-tax",
      title: "Export GSTR-3B Tax Reconciliation",
      category: "Analytics",
      shortcut: "⌘T",
      description: "Generates GSTR-3B tax compliance schedule for CGST & SGST.",
      systemEffect: "Aggregates tax liability, prepares GSTR audit trail export.",
      action: () => { setActiveView("analytics"); onClose(); }
    },
    {
      id: "save-snapshot",
      title: "Save Workspace State Snapshot",
      category: "System",
      shortcut: "⌘S",
      description: "Serializes full application state into persistent last saver version.",
      systemEffect: "Writes JSON snapshot to localStorage under key ros_last_saver_version.",
      action: () => { saveWorkspaceSnapshot(); onClose(); }
    },
    {
      id: "migration-sync",
      title: "Open Localhost & Sourcehost Migration Tool",
      category: "Infrastructure",
      shortcut: "⌘M",
      description: "Connects http://localhost:8000 and Remote ERP API endpoints.",
      systemEffect: "Pings server latency, pulls legacy inventory tables.",
      action: () => { setActiveView("migration"); onClose(); }
    }
  ];

  const filteredCommands = commands.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase()) ||
    c.description.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled outside if controlled
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1200,
        background: "rgba(11, 15, 23, 0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "80px"
      }}
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "680px",
          maxWidth: "92vw",
          background: "var(--bg-surface)",
          border: "1px solid var(--border-color)",
          borderRadius: "20px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7)",
          overflow: "hidden",
          animation: "scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        {/* SEARCH INPUT BAR */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-color)", display: "flex", alignItems: "center", gap: "12px", background: "var(--bg-card)" }}>
          <Command size={20} color="var(--primary)" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command or search actions... (e.g. New Bill, AI Vision, Tax)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--text-main)",
              fontSize: "15px",
              fontWeight: "600"
            }}
          />
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: "4px", minWidth: "32px", minHeight: "32px", color: "var(--text-muted)" }}>
            <X size={16} />
          </button>
        </div>

        {/* COMMAND LIST */}
        <div style={{ maxHeight: "420px", overflowY: "auto", padding: "12px" }}>
          {filteredCommands.length === 0 ? (
            <div style={{ padding: "32px", textAlign: "center", color: "var(--text-muted)", fontSize: "14px" }}>
              No commands found matching "{query}"
            </div>
          ) : (
            filteredCommands.map((cmd) => (
              <div
                key={cmd.id}
                onClick={cmd.action}
                style={{
                  padding: "14px 16px",
                  borderRadius: "12px",
                  marginBottom: "8px",
                  background: "rgba(0, 0, 0, 0.04)",
                  border: "1px solid var(--border-color)",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "14px",
                  transition: "all 0.2s ease"
                }}
                className="command-item-hover"
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span className="badge badge-info" style={{ fontSize: "10px", padding: "2px 6px" }}>{cmd.category}</span>
                    <span style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-main)" }}>{cmd.title}</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "2px" }}>{cmd.description}</div>
                  <div style={{ fontSize: "11px", color: "var(--primary)", fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: "4px" }}>
                    <Database size={11} /> <span>System Effect: {cmd.systemEffect}</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "11px", fontWeight: "700", fontFamily: "var(--font-mono)", color: "var(--text-muted)", background: "rgba(255,255,255,0.06)", padding: "3px 8px", borderRadius: "6px", border: "1px solid var(--border-color)" }}>
                    {cmd.shortcut}
                  </span>
                  <ArrowRight size={16} color="var(--primary)" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div style={{ padding: "12px 20px", borderTop: "1px solid var(--border-color)", background: "rgba(0, 0, 0, 0.12)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11px", color: "var(--text-muted)" }}>
          <span>Navigation: Use mouse or ↑↓ keys</span>
          <span style={{ fontFamily: "var(--font-mono)" }}>⌘K Command Palette Active</span>
        </div>
      </div>
    </div>
  );
};
