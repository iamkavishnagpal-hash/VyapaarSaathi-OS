import React from "react";
import { useRetail } from "../context/RetailContext";
import { 
  LayoutDashboard, 
  Package, 
  Receipt, 
  ShoppingBag, 
  Store, 
  Bot, 
  MessageSquare, 
  BarChart3, 
  Upload, 
  Settings,
  ShieldCheck
} from "lucide-react";

export const Sidebar = () => {
  const { activeView, setActiveView, t, role, products } = useRetail();

  const lowStockCount = products.filter((p) => p.stockQty <= p.lowStockThreshold).length;

  const navItems = [
    { id: "dashboard", label: t("dashboard"), icon: LayoutDashboard },
    { id: "inventory", label: t("inventory"), icon: Package, badge: lowStockCount > 0 ? lowStockCount : null },
    { id: "pos", label: t("posBilling"), icon: Receipt },
    { id: "orders", label: t("orders"), icon: ShoppingBag },
    { id: "storefront", label: t("storeBuilder"), icon: Store },
    { id: "ai", label: t("aiCenter"), icon: Bot, isNew: true },
    { id: "comms", label: t("commsHub"), icon: MessageSquare },
    { id: "analytics", label: t("analytics"), icon: BarChart3 },
    { id: "migration", label: t("migration"), icon: Upload },
    { id: "settings", label: t("settings"), icon: Settings },
  ];

  return (
    <aside
      className="glass-panel"
      style={{
        width: "260px",
        borderRadius: 0,
        borderTop: "none",
        borderBottom: "none",
        borderLeft: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "16px 12px",
        zIndex: 90
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ padding: "0 12px 12px 12px", fontSize: "0.75rem", fontWeight: "700", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "1px" }}>
          Core Operations
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 14px",
                borderRadius: "var(--radius-sm)",
                border: "none",
                background: isActive
                  ? "linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(79, 70, 229, 0.15) 100%)"
                  : "transparent",
                color: isActive ? "#ffffff" : "var(--text-muted)",
                fontWeight: isActive ? "700" : "500",
                fontSize: "0.88rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                borderLeft: isActive ? "3px solid var(--primary)" : "3px solid transparent"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Icon size={18} color={isActive ? "var(--primary)" : "var(--text-muted)"} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className="badge badge-danger" style={{ fontSize: "0.68rem", padding: "2px 6px" }}>
                  {item.badge}
                </span>
              )}

              {item.isNew && !item.badge && (
                <span className="badge badge-info" style={{ fontSize: "0.65rem", padding: "2px 6px" }}>
                  AI OS
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Role Security Status */}
      <div
        style={{
          padding: "12px",
          background: "rgba(15, 23, 42, 0.6)",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--border-color)",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}
      >
        <ShieldCheck size={20} color="#10b981" />
        <div style={{ fontSize: "0.78rem" }}>
          <div style={{ fontWeight: "700", color: "var(--text-main)" }}>RBAC Protection</div>
          <div style={{ color: "var(--text-dim)", fontSize: "0.72rem" }}>Active as {role}</div>
        </div>
      </div>
    </aside>
  );
};
