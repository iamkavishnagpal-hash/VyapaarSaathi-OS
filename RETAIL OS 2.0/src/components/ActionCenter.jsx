import React from "react";
import { useNavigate } from "react-router-dom";
import { useRetail } from "../context/RetailContext";
import { evaluateRules } from "../ai/RuleEngine";
import { AlertTriangle, ShieldAlert, Truck, Sparkles, ArrowRight, DollarSign } from "lucide-react";

export const ActionCenter = () => {
  const { products, stores, orders } = useRetail();
  const navigate = useNavigate();

  const ruleActions = evaluateRules(products, stores, orders);

  return (
    <div className="card-panel" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-main)" }}>Operational Action Center</div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Evaluated in real-time by AI Rule Engine</div>
        </div>
        <span className="status-badge badge-warning">{ruleActions.length} Pending Actions</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {ruleActions.map((item) => {
          let Icon = AlertTriangle;
          let badgeClass = "badge-muted";

          if (item.ruleType === "LOW_STOCK") {
            Icon = AlertTriangle;
            badgeClass = "badge-warning";
          } else if (item.ruleType === "UNVERIFIED_DATA") {
            Icon = ShieldAlert;
            badgeClass = "badge-error";
          } else if (item.ruleType === "LOW_MARGIN") {
            Icon = DollarSign;
            badgeClass = "badge-primary";
          } else if (item.ruleType === "STORE_REBALANCE") {
            Icon = Truck;
            badgeClass = "badge-ai";
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
                  <Icon size={16} color={item.severity === "error" ? "var(--error)" : item.severity === "warning" ? "var(--warning)" : "var(--primary)"} />
                </div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>{item.title}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{item.description}</div>
                </div>
              </div>

              <button
                onClick={() => navigate(item.actionPath)}
                className="btn btn-secondary btn-sm"
                style={{ gap: "4px", whiteSpace: "nowrap" }}
              >
                <span>{item.actionLabel}</span>
                <ArrowRight size={12} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
