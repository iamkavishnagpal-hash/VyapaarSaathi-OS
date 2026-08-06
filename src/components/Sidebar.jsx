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
  ShieldCheck,
  PanelLeftClose,
  PanelLeft
} from "lucide-react";

export const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
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
      className="glass-panel main-sidebar"
      style={{
        width: isCollapsed ? "72px" : "260px",
        minWidth: isCollapsed ? "72px" : "260px",
        borderRadius: 0,
        borderTop: "none",
        borderBottom: "none",
        borderLeft: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: isCollapsed ? "16px 8px" : "16px 12px",
        zIndex: 90,
        transition: "width 0.25s cubic-bezier(0.16, 1, 0.3, 1), padding 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        overflowX: "hidden"
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        
        {/* SIDEBAR EXPAND/COLLAPSE TOGGLE BAR */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: isCollapsed ? "center" : "space-between", padding: isCollapsed ? "0 0 12px 0" : "0 8px 12px 8px" }}>
          {!isCollapsed && (
            <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "1px" }}>
              Core Operations
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="btn btn-ghost"
            style={{ padding: "6px", minWidth: "32px", minHeight: "32px" }}
            title={isCollapsed ? "Expand Sidebar (⌘B)" : "Collapse Sidebar (⌘B)"}
            aria-label="Toggle Sidebar Navigation"
          >
            {isCollapsed ? <PanelLeft size={18} color="var(--primary)" /> : <PanelLeftClose size={18} color="var(--text-muted)" />}
          </button>
        </div>

        {/* NAVIGATION ITEMS LIST */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              title={isCollapsed ? item.label : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: isCollapsed ? "center" : "space-between",
                padding: isCollapsed ? "12px 0" : "10px 14px",
                borderRadius: "var(--radius-sm)",
                border: "none",
                background: isActive
                  ? "linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(109, 40, 217, 0.2) 100%)"
                  : "transparent",
                color: isActive ? "#ffffff" : "var(--text-muted)",
                fontWeight: isActive ? "700" : "500",
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                borderLeft: isActive ? "3px solid var(--primary)" : "3px solid transparent",
                position: "relative"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "center" }}>
                <Icon size={20} color={isActive ? "var(--primary)" : "var(--text-muted)"} />
                {!isCollapsed && <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>}
              </div>

              {/* BADGES */}
              {!isCollapsed && item.badge && (
                <span className="badge badge-danger" style={{ fontSize: "10px", padding: "2px 6px" }}>
                  {item.badge}
                </span>
              )}

              {/* COLLAPSED BADGE DOT */}
              {isCollapsed && item.badge && (
                <span style={{
                  position: "absolute",
                  top: "6px",
                  right: "12px",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--danger)"
                }} />
              )}

              {!isCollapsed && item.isNew && !item.badge && (
                <span className="badge badge-info" style={{ fontSize: "10px", padding: "2px 6px" }}>
                  AI OS
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* FOOTER RBAC SECURITY STATUS */}
      <div
        style={{
          padding: isCollapsed ? "12px 4px" : "12px",
          background: "rgba(15, 23, 42, 0.6)",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--border-color)",
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "flex-start",
          gap: "10px"
        }}
        title={isCollapsed ? `RBAC Protected: ${role}` : undefined}
      >
        <ShieldCheck size={20} color="#10B981" />
        {!isCollapsed && (
          <div style={{ fontSize: "12px", overflow: "hidden" }}>
            <div style={{ fontWeight: "700", color: "var(--text-main)", whiteSpace: "nowrap" }}>RBAC Protected</div>
            <div style={{ color: "var(--text-dim)", fontSize: "11px", whiteSpace: "nowrap" }}>Active as {role}</div>
          </div>
        )}
      </div>
    </aside>
  );
};
