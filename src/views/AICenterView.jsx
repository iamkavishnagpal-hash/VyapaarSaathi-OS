import React from "react";
import { useRetail } from "../context/RetailContext";
import { Bot, Sparkles, ShieldCheck, RefreshCw, ArrowRight, CheckCircle2 } from "lucide-react";

export const AICenterView = () => {
  const { products, setActiveView, addToast } = useRetail();

  const aiInsights = [
    {
      id: "insight-1",
      title: "Reorder Opportunity: Quantum Sound Pro Headphones",
      insight: "Demand velocity increased by +34% over the last 7 days.",
      reason: "High sales volume on Register #1 combined with low stock threshold proximity.",
      actionText: "Draft Purchase Order",
      onAction: () => setActiveView("purchases")
    },
    {
      id: "insight-2",
      title: "Data Quality Auto-Healing: 1 Unverified Product",
      insight: "VividColor 4K Studio Monitor is missing supplier warranty field.",
      reason: "Manual entry without camera capture caused lower data completeness score (78%).",
      actionText: "Enrich Product Data",
      onAction: () => setActiveView("products")
    },
    {
      id: "insight-3",
      title: "Cross-Store Stock Rebalancing",
      insight: "Transfer 5 units of Titanium Flask to Metro Express Storefront.",
      reason: "Metro Store experiencing high walk-in traffic while Flagship holds surplus stock.",
      actionText: "Initiate Transfer",
      onAction: () => setActiveView("transfers")
    }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="h1-title">AI Business Intelligence Hub</h1>
          <p className="body-text" style={{ fontSize: "13px" }}>
            Operational insights, data auto-cleansing, and AI demand optimization engine
          </p>
        </div>

        <button onClick={() => addToast("Ran full catalog AI audit scan", "success")} className="btn btn-ai" style={{ gap: "6px" }}>
          <Sparkles size={16} /> Run Full System AI Audit
        </button>
      </div>

      {/* AI INSIGHTS LIST (INSIGHT + REASON + ACTION FORMAT) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {aiInsights.map((item) => (
          <div
            key={item.id}
            className="card-panel-elevated"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderLeft: "4px solid var(--ai-accent)",
              gap: "20px"
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
              <div style={{ padding: "8px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--ai-subtle)", color: "var(--ai-accent)" }}>
                <Bot size={20} />
              </div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-main)" }}>{item.title}</div>
                <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                  <strong>Insight:</strong> {item.insight}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                  <strong>Reason:</strong> {item.reason}
                </div>
              </div>
            </div>

            <button onClick={item.onAction} className="btn btn-primary btn-sm" style={{ gap: "6px", whiteSpace: "nowrap" }}>
              <span>{item.actionText}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* AUTOMATED DATA CLEANING & DUPLICATE CHECKER */}
      <div className="card-panel">
        <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-main)", marginBottom: "12px" }}>
          AI Catalog Auto-Cleansing & Duplicate Protection
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
          <div style={{ padding: "12px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--bg-elevated)" }}>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-main)" }}>Barcode Integrity</div>
            <div style={{ fontSize: "11px", color: "var(--success)", marginTop: "4px" }}>100% Valid Code 128 / EAN</div>
          </div>
          <div style={{ padding: "12px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--bg-elevated)" }}>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-main)" }}>Duplicate SKU Scanning</div>
            <div style={{ fontSize: "11px", color: "var(--success)", marginTop: "4px" }}>0 Duplicates Detected</div>
          </div>
          <div style={{ padding: "12px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--bg-elevated)" }}>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-main)" }}>Attribute Completeness</div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>97.2% Average Score</div>
          </div>
        </div>
      </div>

    </div>
  );
};
