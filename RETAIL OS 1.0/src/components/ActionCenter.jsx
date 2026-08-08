import React from "react";
import { AlertTriangle, ArrowRight, ShieldCheck, Sparkles, Truck, Package, Zap } from "lucide-react";
import { useRetail } from "../context/RetailContext";

export const ActionCenter = () => {
  const { products, setActiveView } = useRetail();

  const lowStockCount = products.filter((p) => p.stockQty <= p.lowStockThreshold).length;

  const actionItems = [
    {
      id: "low-stock",
      type: "warning",
      icon: AlertTriangle,
      title: `${lowStockCount || 3} products may run out in 5 days`,
      reason: "Calculated based on 30-day velocity sales run rate",
      cta: "Review Products",
      action: () => setActiveView("inventory")
    },
    {
      id: "po-reorder",
      type: "primary",
      icon: Truck,
      title: "AI recommends automated PO reorder",
      reason: "Earbuds & Leather Boots inventory below safety threshold",
      cta: "Create Purchase Order",
      action: () => setActiveView("inventory")
    },
    {
      id: "win-back",
      type: "ai",
      icon: Sparkles,
      title: "12 VIP customers inactive > 30 days",
      reason: "WhatsApp win-back campaign estimated +₹48,000 ROI",
      cta: "Execute Campaign",
      action: () => setActiveView("ai")
    }
  ];

  return (
    <div className="glass-panel" style={{ padding: "20px", marginBottom: "28px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div>
          <h3 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-main)", margin: "0 0 2px 0", display: "flex", alignItems: "center", gap: "8px" }}>
            <Zap size={18} color="var(--primary)" /> Operational Action Center
          </h3>
          <div className="caption">Priority tasks requiring immediate business decisions</div>
        </div>
        <span className="badge badge-info">{actionItems.length} Pending Actions</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {actionItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              style={{
                padding: "16px",
                borderRadius: "12px",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-color)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "14px"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1, minWidth: "260px" }}>
                <div 
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: item.type === "warning" ? "rgba(231, 168, 59, 0.15)" : "rgba(91, 140, 255, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  <Icon size={18} color={item.type === "warning" ? "var(--warning)" : "var(--primary)"} />
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-main)" }}>{item.title}</div>
                  <div className="caption" style={{ fontSize: "12px", marginTop: "2px" }}>{item.reason}</div>
                </div>
              </div>

              <button
                onClick={item.action}
                className="btn btn-secondary"
                style={{
                  minHeight: "40px",
                  padding: "0 16px",
                  fontSize: "13px",
                  fontWeight: "700",
                  borderRadius: "8px",
                  whiteSpace: "nowrap"
                }}
              >
                <span>{item.cta}</span>
                <ArrowRight size={14} color="var(--primary)" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
