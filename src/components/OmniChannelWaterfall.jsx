import React from "react";
import { ArrowDownRight, CheckCircle2, ShieldCheck } from "lucide-react";

export const OmniChannelWaterfall = () => {
  const steps = [
    { label: "Base Master Inventory", value: "42 units", change: null, type: "base" },
    { label: "POS Store Walk-in Sale", value: "38 units", change: "-4 units", channel: "POS Store", type: "deduction" },
    { label: "Amazon Order #8912", value: "36 units", change: "-2 units", channel: "Amazon", type: "deduction" },
    { label: "Flipkart Order #4120", value: "35 units", change: "-1 unit", channel: "Flipkart", type: "deduction" },
    { label: "Available Net Master Stock", value: "35 units", change: "Broadcasting Live", type: "result" }
  ];

  return (
    <div className="card-panel" style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div>
          <div style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-main)" }}>
            Real-Time Inventory Deduction Waterfall
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
            Live step-by-step master stock deduction ledger for Kapda Mafia Hoodie (SKU: KM-HD-001)
          </div>
        </div>
        <span className="status-badge badge-success" style={{ fontSize: "10px" }}>● Live Calculation</span>
      </div>

      {/* STEP-BY-STEP WATERFALL GRID */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {steps.map((s, idx) => {
          const isResult = s.type === "result";
          const isBase = s.type === "base";

          return (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 14px",
                borderRadius: "var(--radius-sm)",
                backgroundColor: isResult ? "rgba(16, 185, 129, 0.1)" : (isBase ? "var(--bg-elevated)" : "var(--bg-surface)"),
                border: isResult ? "1px solid var(--success)" : "1px solid var(--border-color)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {!isBase && <ArrowDownRight size={14} color={isResult ? "var(--success)" : "var(--text-muted)"} />}
                <div>
                  <div style={{ fontSize: "13px", fontWeight: isResult ? "800" : "700", color: isResult ? "var(--success)" : "var(--text-main)" }}>
                    {s.label}
                  </div>
                  {s.channel && (
                    <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Source Channel: {s.channel}</div>
                  )}
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "14px", fontWeight: "800", color: isResult ? "var(--success)" : "var(--text-main)" }}>
                  {s.value}
                </div>
                {s.change && (
                  <div style={{ fontSize: "10px", fontWeight: "700", color: isResult ? "var(--success)" : "var(--error)" }}>
                    {s.change}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
