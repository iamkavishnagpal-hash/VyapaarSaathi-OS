import React, { useState } from "react";
import { 
  Package, 
  Barcode, 
  X, 
  Printer
} from "lucide-react";
import { IdentityRing } from "./IdentityRing";

export const ProductPassportView = ({ product, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'inventory' | 'sales' | 'supplier' | 'activity'

  if (!product) return null;

  const healthScore = 92;
  const dataCompleteness = 82;

  const lifecycleSteps = [
    { label: "Received", date: "2026-08-01", status: "completed" },
    { label: "Barcode Generated", date: "2026-08-01", status: "completed" },
    { label: "Inventory Added", date: "2026-08-02", status: "completed" },
    { label: "Transferred to POS", date: "2026-08-04", status: "completed" },
    { label: "Sold (Counter #1)", date: "2026-08-06", status: "completed" },
    { label: "Returned", date: "N/A", status: "pending" }
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(8px)",
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: "100%",
          maxWidth: "880px",
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "16px",
          padding: "28px",
          background: "var(--bg-surface)",
          border: "1px solid var(--border-color)",
          boxShadow: "0 25px 50px rgba(0,0,0,0.5)"
        }}
      >
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "12px",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-color)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Package size={32} color="var(--primary)" />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "800", color: "var(--text-main)", margin: 0 }}>
                  {product.title}
                </h2>
                <span className="badge badge-info">{product.category}</span>
              </div>
              <div className="caption" style={{ marginTop: "4px", fontSize: "12px" }}>
                SKU: <strong className="num-tabular">{product.sku}</strong> • Product ID: <strong className="num-tabular">{product.id}</strong>
              </div>
            </div>
          </div>

          <button onClick={onClose} className="btn btn-ghost" style={{ padding: "8px", borderRadius: "50%" }}>
            <X size={20} color="var(--text-muted)" />
          </button>
        </div>

        {/* TOP SCORES ROW */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          <div style={{ padding: "16px", borderRadius: "12px", background: "var(--bg-elevated)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div className="caption">Product Health</div>
              <div style={{ fontSize: "22px", fontWeight: "800", color: "var(--success)" }}>{healthScore} / 100</div>
            </div>
            <IdentityRing percentage={healthScore} size={40} color="var(--success)" />
          </div>

          <div style={{ padding: "16px", borderRadius: "12px", background: "var(--bg-elevated)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div className="caption">Data Completeness</div>
              <div style={{ fontSize: "22px", fontWeight: "800", color: "var(--primary)" }}>{dataCompleteness}%</div>
            </div>
            <IdentityRing percentage={dataCompleteness} size={40} color="var(--primary)" />
          </div>

          <div style={{ padding: "16px", borderRadius: "12px", background: "var(--bg-elevated)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div className="caption">Stock Level</div>
              <div style={{ fontSize: "22px", fontWeight: "800", color: "var(--text-main)" }}>{product.stockQty} Units</div>
            </div>
            <span className="badge badge-success">In Stock</span>
          </div>
        </div>

        {/* TABS HEADER */}
        <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", marginBottom: "20px" }}>
          {[
            { id: "overview", label: "Overview" },
            { id: "inventory", label: "Inventory" },
            { id: "sales", label: "Sales" },
            { id: "supplier", label: "Supplier" },
            { id: "activity", label: "Activity" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`btn ${activeTab === tab.id ? "btn-primary" : "btn-ghost"}`}
              style={{ padding: "6px 16px", minHeight: "36px", fontSize: "13px" }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* BARCODE STICKER PREVIEW */}
            <div style={{ padding: "20px", borderRadius: "12px", background: "var(--bg-elevated)", border: "1px dashed var(--border-color)", textAlign: "center" }}>
              <Barcode size={48} color="var(--text-main)" style={{ margin: "0 auto 8px auto" }} />
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "16px", fontWeight: "700", letterSpacing: "3px" }}>
                {product.barcode || "8901234567890"}
              </div>
              <div className="caption" style={{ marginTop: "4px" }}>Code128 Format Sticker • 18% GST Included</div>
            </div>

            {/* LIFECYCLE TIMELINE */}
            <div>
              <h4 style={{ fontSize: "14px", fontWeight: "800", marginBottom: "12px", color: "var(--text-main)" }}>
                Product Lifecycle Timeline
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "10px" }}>
                {lifecycleSteps.map((step, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      background: step.status === "completed" ? "rgba(40, 183, 123, 0.08)" : "var(--bg-elevated)",
                      border: step.status === "completed" ? "1px solid rgba(40, 183, 123, 0.25)" : "1px solid var(--border-color)"
                    }}
                  >
                    <div style={{ fontSize: "11px", color: step.status === "completed" ? "var(--success)" : "var(--text-muted)", fontWeight: "700" }}>
                      Step {idx + 1}
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)", marginTop: "2px" }}>
                      {step.label}
                    </div>
                    <div className="caption" style={{ fontSize: "10px", marginTop: "2px" }}>{step.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FOOTER ACTIONS */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--border-color)" }}>
          <button onClick={() => window.print()} className="btn btn-secondary" style={{ padding: "0 16px" }}>
            <Printer size={16} />
            <span>Print Label</span>
          </button>
          <button onClick={onClose} className="btn btn-primary" style={{ padding: "0 20px" }}>
            Close Passport
          </button>
        </div>

      </div>
    </div>
  );
};
