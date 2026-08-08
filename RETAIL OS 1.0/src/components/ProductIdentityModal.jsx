import React, { useState } from "react";
import { 
  Camera, 
  Barcode, 
  X, 
  Cpu
} from "lucide-react";

export const ProductIdentityModal = ({ isOpen, onClose, product }) => {
  const [activeStep, setActiveStep] = useState(1); // 1: AI Vision, 2: Identity & SKU, 3: Barcode Stream, 4: Lifecycle Map
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !product) return null;

  const handleRunAiVisionScan = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setActiveStep(2);
    }, 1200);
  };

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
        alignItems: "center",
        justifyContent: "center"
      }}
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "760px",
          maxWidth: "92vw",
          background: "var(--bg-surface)",
          border: "1px solid var(--border-color)",
          borderRadius: "20px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7)",
          overflow: "hidden",
          animation: "scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        {/* HEADER */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg-card)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "rgba(37, 99, 235, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Cpu size={20} color="var(--primary)" />
            </div>
            <div>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--primary)", textTransform: "uppercase" }}>
                AI Vision Identity Engine
              </div>
              <h3 style={{ fontSize: "17px", fontWeight: "800", color: "var(--text-main)", margin: 0 }}>
                {product.title}
              </h3>
            </div>
          </div>

          <button onClick={onClose} className="btn btn-ghost" style={{ padding: "4px", minWidth: "36px", minHeight: "36px", color: "var(--text-muted)" }}>
            <X size={18} />
          </button>
        </div>

        {/* STEPPER TABS */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--border-color)", background: "rgba(0, 0, 0, 0.12)" }}>
          {[
            { id: 1, label: "1. AI Vision Camera" },
            { id: 2, label: "2. SKU & Identity" },
            { id: 3, label: "3. Barcode System" },
            { id: 4, label: "4. Full Lifecycle Map" }
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveStep(s.id)}
              style={{
                flex: 1,
                padding: "12px",
                border: "none",
                borderBottom: activeStep === s.id ? "2px solid var(--primary)" : "2px solid transparent",
                background: activeStep === s.id ? "rgba(37, 99, 235, 0.1)" : "transparent",
                color: activeStep === s.id ? "var(--text-main)" : "var(--text-muted)",
                fontWeight: "700",
                fontSize: "12px",
                cursor: "pointer"
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* BODY */}
        <div style={{ padding: "24px", maxHeight: "480px", overflowY: "auto" }}>
          
          {/* STEP 1: AI VISION SCAN */}
          {activeStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", textAlign: "center" }}>
              <div style={{ padding: "32px", border: "2px dashed var(--border-color)", borderRadius: "16px", background: "rgba(0, 0, 0, 0.12)", position: "relative" }}>
                <Camera size={48} color="var(--primary)" style={{ marginBottom: "12px" }} />
                <h4 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-main)", margin: "0 0 6px 0" }}>
                  AI Camera Vision Capture Simulation
                </h4>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", maxWidth: "480px", margin: "0 auto 16px auto" }}>
                  Place physical retail product in camera viewport. AI extracts brand, category, barcode, and cost pricing automatically.
                </p>

                <button
                  onClick={handleRunAiVisionScan}
                  disabled={isProcessing}
                  className="btn btn-primary"
                  style={{ minHeight: "44px", padding: "0 24px", borderRadius: "9999px", fontWeight: "800" }}
                >
                  {isProcessing ? "Scanning Product Image..." : "👉 Simulate AI Vision Capture"}
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", textAlign: "left" }}>
                <div style={{ padding: "12px", background: "var(--bg-card)", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Confidence Score</div>
                  <div style={{ fontSize: "16px", fontWeight: "800", color: "#10B981" }}>98.4% Match</div>
                </div>
                <div style={{ padding: "12px", background: "var(--bg-card)", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Object Classification</div>
                  <div style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-main)" }}>{product.category}</div>
                </div>
                <div style={{ padding: "12px", background: "var(--bg-card)", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Suggested Price</div>
                  <div style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-main)", fontFamily: "var(--font-mono)" }}>₹{product.sellingPrice}</div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SKU & IDENTITY */}
          {activeStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ padding: "16px", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "14px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px" }}>
                  <div>
                    <label style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "700" }}>System SKU</label>
                    <div style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-main)", fontFamily: "var(--font-mono)" }}>{product.sku}</div>
                  </div>
                  <div>
                    <label style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "700" }}>Selling Price</label>
                    <div style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-main)", fontFamily: "var(--font-mono)" }}>₹{product.sellingPrice}</div>
                  </div>
                  <div>
                    <label style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "700" }}>Cost Price</label>
                    <div style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>₹{product.costPrice}</div>
                  </div>
                  <div>
                    <label style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "700" }}>GST Tax Rate</label>
                    <div style={{ fontSize: "16px", fontWeight: "800", color: "#10B981", fontFamily: "var(--font-mono)" }}>{product.gstRate}% GST</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: BARCODE SYSTEM */}
          {activeStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", textAlign: "center" }}>
              <div style={{ padding: "24px", background: "#ffffff", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
                <Barcode size={64} color="#000000" style={{ margin: "0 auto 8px auto" }} />
                <div style={{ fontSize: "18px", fontWeight: "800", color: "#000000", fontFamily: "var(--font-mono)" }}>
                  {product.barcode || `BAR-${product.sku}`}
                </div>
                <div style={{ fontSize: "12px", color: "#64748B", marginTop: "4px" }}>
                  Code128 High-Density Retail POS Barcode
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: LIFECYCLE MAP */}
          {activeStep === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { title: "1. Physical Product Capture", sub: "AI Vision scanned item attributes & price" },
                { title: "2. SKU & Barcode Generation", sub: `Linked to SKU ${product.sku}` },
                { title: "3. Inventory System Ingestion", sub: `Stock added: ${product.stockQty} units available` },
                { title: "4. Multi-Channel Retail Sync", sub: "POS Counter & Shopify store catalog active" },
                { title: "5. Sales & GST Settlement", sub: "Auto-reconciled in GSTR-3B tax ledger" }
              ].map((step, idx) => (
                <div key={idx} style={{ padding: "12px 16px", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "10px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--primary)", color: "#ffffff", fontWeight: "800", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {idx + 1}
                  </span>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>{step.title}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{step.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* FOOTER */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid var(--border-color)", background: "var(--bg-card)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            Digital Identity Verified • SKU {product.sku}
          </span>
          <button onClick={onClose} className="btn btn-secondary" style={{ minHeight: "38px", padding: "0 18px" }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
