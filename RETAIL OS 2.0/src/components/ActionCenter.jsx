import React from "react";
import { useRetail } from "../context/RetailContext";
import { AlertTriangle, ShieldAlert, Truck, Sparkles, ArrowRight } from "lucide-react";

export const ActionCenter = () => {
  const { products, setActiveView, setIsCaptureModalOpen, openScanner } = useRetail();

  const lowStockProducts = products.filter((p) => p.stockQty <= p.lowStockThreshold);
  const unverifiedProducts = products.filter((p) => !p.isVerified);

  const actionItems = [];

  if (lowStockProducts.length > 0) {
    actionItems.push({
      id: "act-low-stock",
      type: "warning",
      title: `${lowStockProducts.length} product${lowStockProducts.length > 1 ? "s" : ""} may run out in 5 days`,
      description: `${lowStockProducts.map((p) => p.title).join(", ")} below threshold.`,
      icon: AlertTriangle,
      actionText: "Review Stock",
      onAction: () => setActiveView("inventory")
    });
  }

  if (unverifiedProducts.length > 0) {
    actionItems.push({
      id: "act-unverified",
      type: "error",
      title: `${unverifiedProducts.length} product${unverifiedProducts.length > 1 ? "s" : ""} need barcode verification`,
      description: "Data completeness incomplete for scanned item.",
      icon: ShieldAlert,
      actionText: "Fix Verification",
      onAction: () => setActiveView("products")
    });
  }

  actionItems.push({
    id: "act-ai-reorder",
    type: "ai",
    title: "AI recommends restocking Quantum Sound Pro Headphones",
    description: "Predicted demand spike +34% for coming weekend.",
    icon: Sparkles,
    actionText: "Create PO",
    onAction: () => setActiveView("purchases")
  });

  actionItems.push({
    id: "act-transfer",
    type: "info",
    title: "Shipment #TR-502 received at Metro Store",
    description: "5 units awaiting inventory confirmation.",
    icon: Truck,
    actionText: "Verify Receiving",
    onAction: () => openScanner("Receive")
  });

  return (
    <div className="card-panel" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-main)" }}>Operational Action Center</div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Prioritized system alerts requiring manager intervention</div>
        </div>
        <span className="status-badge badge-primary">{actionItems.length} Pending Actions</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {actionItems.map((item) => {
          const Icon = item.icon;
          let badgeClass = "badge-muted";
          let iconColor = "var(--text-muted)";

          if (item.type === "warning") {
            badgeClass = "badge-warning";
            iconColor = "var(--warning)";
          } else if (item.type === "error") {
            badgeClass = "badge-error";
            iconColor = "var(--error)";
          } else if (item.type === "ai") {
            badgeClass = "badge-ai";
            iconColor = "var(--ai-accent)";
          } else if (item.type === "info") {
            badgeClass = "badge-primary";
            iconColor = "var(--primary)";
          }

          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 12px",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border-color)",
                gap: "12px"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "var(--radius-xs)",
                    backgroundColor: "var(--bg-surface)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Icon size={16} color={iconColor} />
                </div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-main)" }}>{item.title}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{item.description}</div>
                </div>
              </div>

              <button
                onClick={item.onAction}
                className="btn btn-secondary btn-sm"
                style={{ gap: "4px" }}
              >
                <span>{item.actionText}</span>
                <ArrowRight size={12} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
