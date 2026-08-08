import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { ScanLine, X, Search, Check, AlertCircle, ShoppingBag, Truck, RotateCcw } from "lucide-react";

export const UnifiedScannerModal = () => {
  const {
    isScannerModalOpen,
    setIsScannerModalOpen,
    scannerMode,
    products,
    addToCart,
    adjustStock,
    openProductPassport,
    addToast
  } = useRetail();

  const [scanInput, setScanInput] = useState("");
  const [activeMode, setActiveMode] = useState(scannerMode || "Sale");

  if (!isScannerModalOpen) return null;

  const handleScanSubmit = (e) => {
    e.preventDefault();
    if (!scanInput.trim()) return;

    const matched = products.find(
      (p) =>
        p.barcode === scanInput.trim() ||
        p.sku.toLowerCase() === scanInput.trim().toLowerCase() ||
        p.id === scanInput.trim()
    );

    if (matched) {
      if (activeMode === "Sale") {
        addToCart(matched);
        addToast(`Scanned & added "${matched.title}" to POS cart`, "success");
      } else if (activeMode === "Receive") {
        adjustStock(matched.id, 10, "Scanner Stock Receive");
        addToast(`Received +10 units of "${matched.title}" into inventory`, "success");
      } else if (activeMode === "Stock Count" || activeMode === "Audit") {
        openProductPassport(matched);
        addToast(`Audited identity passport for "${matched.title}"`, "info");
      }
      setScanInput("");
    } else {
      addToast(`No product barcode matched "${scanInput}"`, "error");
    }
  };

  const modes = [
    { id: "Sale", label: "Sale / POS Billing", icon: ScanLine },
    { id: "Receive", label: "Receive Stock", icon: ShoppingBag },
    { id: "Stock Count", label: "Stock Audit", icon: Search },
    { id: "Transfer", label: "Transfer Stock", icon: Truck },
    { id: "Return", label: "Process Return", icon: RotateCcw }
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(8, 11, 16, 0.85)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        zIndex: 1000
      }}
      onClick={() => setIsScannerModalOpen(false)}
    >
      <div
        className="card-panel-elevated"
        style={{
          width: "100%",
          maxWidth: "560px",
          padding: 0,
          overflow: "hidden",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-lg)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: "1px solid var(--border-color)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ScanLine size={18} color="var(--primary)" />
            <span style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-main)" }}>Unified Barcode & QR Scanner Engine</span>
          </div>
          <button onClick={() => setIsScannerModalOpen(false)} className="btn btn-ghost" style={{ padding: "4px" }}>
            <X size={16} />
          </button>
        </div>

        {/* MODE SELECTOR TABS */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--bg-surface)", overflowX: "auto" }}>
          {modes.map((m) => {
            const Icon = m.icon;
            const isActive = activeMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveMode(m.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 14px",
                  border: "none",
                  background: "transparent",
                  color: isActive ? "var(--primary)" : "var(--text-muted)",
                  borderBottom: isActive ? "2px solid var(--primary)" : "2px solid transparent",
                  fontSize: "12px",
                  fontWeight: isActive ? "700" : "500",
                  cursor: "pointer",
                  whiteSpace: "nowrap"
                }}
              >
                <Icon size={14} />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* BODY SCANNER SIMULATION */}
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
          
          <form onSubmit={handleScanSubmit} style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              className="input-field"
              placeholder="Scan Code 128 / EAN / SKU or type barcode..."
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              autoFocus
              style={{ fontSize: "14px", fontFamily: "var(--font-mono)" }}
            />
            <button type="submit" className="btn btn-primary" style={{ gap: "6px" }}>
              <Check size={16} /> Scan
            </button>
          </form>

          {/* SIMULATED BARCODE SCANNER GUIDELINE */}
          <div
            style={{
              padding: "24px",
              backgroundColor: "var(--bg-surface)",
              borderRadius: "var(--radius-sm)",
              border: "1px dashed var(--primary)",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <ScanLine size={32} color="var(--primary)" />
            <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>
              Active Mode: {activeMode.toUpperCase()}
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
              Ready for physical laser scanner input or manually enter barcode digits above.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
