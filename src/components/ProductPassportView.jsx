import React from "react";
import { useRetail } from "../context/RetailContext";
import { X, ShieldCheck, History, Package, Barcode, TrendingUp, Layers, CheckCircle2 } from "lucide-react";

export const ProductPassportView = () => {
  const { isPassportOpen, setIsPassportOpen, passportProduct, openProductIdentity } = useRetail();

  if (!isPassportOpen || !passportProduct) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        maxWidth: "480px",
        backgroundColor: "var(--bg-surface)",
        borderLeft: "1px solid var(--border-color)",
        boxShadow: "var(--shadow-lg)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto"
      }}
    >
      {/* HEADER */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <ShieldCheck size={20} color="var(--primary)" />
          <div>
            <div style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-main)" }}>Product Passport</div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Full Physical Product Lifecycle & Health</div>
          </div>
        </div>
        <button onClick={() => setIsPassportOpen(false)} className="btn btn-ghost" style={{ padding: "4px" }}>
          <X size={18} />
        </button>
      </div>

      {/* BODY */}
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
        
        {/* PRODUCT OVERVIEW HEADER CARD */}
        <div className="card-panel-elevated" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span className="status-badge badge-primary">{passportProduct.brand}</span>
              <div style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-main)", marginTop: "4px" }}>{passportProduct.title}</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>SKU: {passportProduct.sku}</div>
            </div>
            <button onClick={() => openProductIdentity(passportProduct)} className="btn btn-secondary btn-sm" style={{ gap: "4px" }}>
              <Barcode size={12} /> Barcode
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", paddingTop: "8px", borderTop: "1px solid var(--border-color)" }}>
            <div>
              <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Selling Price</div>
              <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-main)" }}>${passportProduct.sellingPrice.toFixed(2)}</div>
            </div>
            <div>
              <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Current Stock</div>
              <div style={{ fontSize: "14px", fontWeight: "700", color: passportProduct.stockQty <= passportProduct.lowStockThreshold ? "var(--warning)" : "var(--success)" }}>
                {passportProduct.stockQty} units
              </div>
            </div>
            <div>
              <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Margin</div>
              <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--primary)" }}>
                {(((passportProduct.sellingPrice - passportProduct.costPrice) / passportProduct.sellingPrice) * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCT HEALTH & COMPLETENESS */}
        <div className="card-panel" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>Product Identity Health Score</span>
            <span className="status-badge badge-success">{passportProduct.productHealthScore || 96}/100</span>
          </div>

          <div style={{ width: "100%", height: "6px", backgroundColor: "var(--bg-elevated)", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{ width: `${passportProduct.productHealthScore || 96}%`, height: "100%", backgroundColor: "var(--success)" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-muted)" }}>
            <span>Data Completeness: 100%</span>
            <span>AI Recognition Confidence: {passportProduct.aiConfidence?.overall || 96}%</span>
          </div>
        </div>

        {/* TIMELINE METRIC STEPS */}
        <div>
          <div style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "12px" }}>
            Lifecycle Event History
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", borderLeft: "2px solid var(--border-color)", paddingLeft: "16px", marginLeft: "6px" }}>
            {(passportProduct.timeline || []).map((evt, idx) => (
              <div key={idx} style={{ position: "relative" }}>
                {/* NODE DOT */}
                <div
                  style={{
                    position: "absolute",
                    left: "-22px",
                    top: "2px",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: evt.type === "Received" ? "var(--primary)" : evt.type === "Sold" ? "var(--success)" : "var(--ai-accent)"
                  }}
                />

                <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-main)" }}>{evt.type}</div>
                <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "2px" }}>{evt.note}</div>
                <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "2px" }}>{evt.date}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
