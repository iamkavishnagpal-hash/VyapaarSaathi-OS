import React from "react";
import { useRetail } from "../context/RetailContext";
import { QrCode, Printer, Download, Copy, X, Check, ShieldCheck, Tag } from "lucide-react";

export const ProductIdentityModal = () => {
  const { isIdentityModalOpen, setIsIdentityModalOpen, identityProduct, addToast } = useRetail();
  const [copiedField, setCopiedField] = React.useState(null);

  if (!isIdentityModalOpen || !identityProduct) return null;

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    addToast(`Copied ${fieldName} (${text}) to clipboard`, "info");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handlePrint = () => {
    window.print();
    addToast(`Sent barcode label for "${identityProduct.title}" to thermal printer`, "success");
  };

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
      onClick={() => setIsIdentityModalOpen(false)}
    >
      <div
        className="card-panel-elevated"
        style={{
          width: "100%",
          maxWidth: "520px",
          padding: 0,
          overflow: "hidden",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-lg)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--bg-surface)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShieldCheck size={18} color="var(--success)" />
            <span style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-main)" }}>Product Passport & Identity Card</span>
          </div>
          <button onClick={() => setIsIdentityModalOpen(false)} className="btn btn-ghost" style={{ padding: "4px" }}>
            <X size={16} />
          </button>
        </div>

        {/* INDUSTRIAL IDENTITY CARD CONTENT */}
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
          
          {/* PRODUCT META */}
          <div style={{ textAlign: "center" }}>
            <span className="status-badge badge-success" style={{ marginBottom: "6px" }}>Identity Verified ✓</span>
            <div style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-main)", letterSpacing: "-0.01em" }}>{identityProduct.title}</div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
              {identityProduct.brand} • {identityProduct.category} • ${identityProduct.sellingPrice.toFixed(2)}
            </div>
          </div>

          {/* BARCODE CODE 128 VISUALIZATION */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "20px 16px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-color)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px"
            }}
          >
            {/* SIMULATED CODE 128 BARS */}
            <div style={{ display: "flex", height: "54px", gap: "2px", alignItems: "stretch", width: "80%", justifyContent: "center" }}>
              {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 3, 1, 4, 2, 1, 3, 2, 1, 4, 1, 3, 2].map((w, idx) => (
                <div
                  key={idx}
                  style={{
                    width: `${w * 2}px`,
                    backgroundColor: idx % 2 === 0 ? "#000000" : "transparent"
                  }}
                />
              ))}
            </div>

            <div style={{ fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: "700", color: "#000000", letterSpacing: "3px" }}>
              {identityProduct.barcode}
            </div>
          </div>

          {/* SKU & QR METADATA GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <div style={{ padding: "10px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--bg-surface)", border: "1px solid var(--border-color)" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Stock Keeping Unit (SKU)</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "4px" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "700", color: "var(--text-main)" }}>{identityProduct.sku}</span>
                <button onClick={() => handleCopy(identityProduct.sku, "SKU")} className="btn btn-ghost" style={{ padding: "2px" }}>
                  {copiedField === "SKU" ? <Check size={12} color="var(--success)" /> : <Copy size={12} />}
                </button>
              </div>
            </div>

            <div style={{ padding: "10px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--bg-surface)", border: "1px solid var(--border-color)" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>QR Code Identifier</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "4px" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "700", color: "var(--text-main)" }}>{identityProduct.qrCode}</span>
                <button onClick={() => handleCopy(identityProduct.qrCode, "QR Code")} className="btn btn-ghost" style={{ padding: "2px" }}>
                  {copiedField === "QR Code" ? <Check size={12} color="var(--success)" /> : <Copy size={12} />}
                </button>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
            <button onClick={handlePrint} className="btn btn-primary" style={{ flex: 1, gap: "6px" }}>
              <Printer size={14} />
              <span>Print Barcode Label</span>
            </button>
            <button onClick={() => addToast("Exported SVG barcode graphic", "info")} className="btn btn-secondary" style={{ gap: "6px" }}>
              <Download size={14} />
              <span>Export SVG</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
