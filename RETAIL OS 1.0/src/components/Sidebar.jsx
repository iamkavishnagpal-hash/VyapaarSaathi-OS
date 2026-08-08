import React from "react";
import { useRetail } from "../context/RetailContext";
import { 
  LayoutDashboard, 
  Package, 
  Receipt, 
  ShoppingBag, 
  Store, 
  Bot, 
  BarChart3, 
  ShieldCheck,
  PanelLeftClose,
  PanelLeft,
  Truck,
  RotateCcw,
  Users,
  Building2,
  Sliders,
  CreditCard,
  Share2
} from "lucide-react";

export const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const { activeView, setActiveView, role, products } = useRetail();

  const lowStockCount = products.filter((p) => p.stockQty <= p.lowStockThreshold).length;

  const sections = [
    {
      title: "Navigation",
      items: [
        { id: "dashboard", label: "Overview", icon: LayoutDashboard },
        { id: "inventory", label: "Products", icon: Package },
        { id: "inventory", label: "Inventory", icon: Package, badge: lowStockCount > 0 ? lowStockCount : null },
        { id: "pos", label: "Sales", icon: Receipt },
        { id: "orders", label: "Purchases", icon: ShoppingBag },
        { id: "migration", label: "Transfers", icon: Truck },
        { id: "orders", label: "Returns", icon: RotateCcw },
        { id: "analytics", label: "Analytics", icon: BarChart3 },
        { id: "ai", label: "AI Assistant", icon: Bot, isNew: true }
      ]
    },
    {
      title: "Management",
      items: [
        { id: "comms", label: "Customers", icon: Users },
        { id: "migration", label: "Suppliers", icon: Building2 },
        { id: "settings", label: "Users & Roles", icon: ShieldCheck },
        { id: "storefront", label: "Stores", icon: Store }
      ]
    },
    {
      title: "Settings",
      items: [
        { id: "settings", label: "Integrations", icon: Share2 },
        { id: "settings", label: "Billing", icon: CreditCard },
        { id: "settings", label: "Preferences", icon: Sliders }
      ]
    }
  ];

  return (
    <aside
      className="glass-panel main-sidebar hide-on-mobile"
      style={{
        width: isCollapsed ? "72px" : "240px",
        minWidth: isCollapsed ? "72px" : "240px",
        borderRadius: 0,
        borderTop: "none",
        borderBottom: "none",
        borderLeft: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: isCollapsed ? "16px 8px" : "16px 12px",
        zIndex: 90,
        transition: "width var(--motion-normal), padding var(--motion-normal)",
        overflowY: "auto",
        overflowX: "hidden"
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        
        {/* SIDEBAR EXPAND/COLLAPSE TOGGLE BAR */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: isCollapsed ? "center" : "space-between", padding: isCollapsed ? "0 0 4px 0" : "0 8px 4px 8px" }}>
          {!isCollapsed && (
            <div style={{ fontSize: "11px", fontWeight: "800", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>
              Business OS
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="btn btn-ghost"
            style={{ padding: "6px", minWidth: "36px", minHeight: "36px" }}
            title={isCollapsed ? "Expand Sidebar (⌘B)" : "Collapse Sidebar (⌘B)"}
            aria-label="Toggle Sidebar Navigation"
          >
            {isCollapsed ? <PanelLeft size={18} color="var(--primary)" /> : <PanelLeftClose size={18} color="var(--text-muted)" />}
          </button>
        </div>

        {/* SECTIONS */}
        {sections.map((sec, secIdx) => (
          <div key={sec.title || secIdx} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {!isCollapsed && (
              <div className="caption" style={{ padding: "0 10px 4px 10px", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-dim)" }}>
                {sec.title}
              </div>
            )}

            {sec.items.map((item, itemIdx) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={`${item.id}-${itemIdx}`}
                  onClick={() => setActiveView(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isCollapsed ? "center" : "space-between",
                    minHeight: "40px",
                    padding: isCollapsed ? "8px 0" : "8px 12px",
                    borderRadius: "var(--radius-sm)",
                    border: "none",
                    background: isActive ? "var(--bg-elevated)" : "transparent",
                    color: isActive ? "var(--text-main)" : "var(--text-secondary)",
                    fontWeight: isActive ? "700" : "500",
                    fontSize: "13px",
                    cursor: "pointer",
                    transition: "all var(--motion-micro)",
                    position: "relative"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Icon 
                      size={18} 
                      color={isActive ? "var(--primary)" : "var(--text-muted)"} 
                    />
                    {!isCollapsed && <span>{item.label}</span>}
                  </div>

                  {!isCollapsed && item.badge && (
                    <span className="badge badge-warning">{item.badge}</span>
                  )}

                  {!isCollapsed && item.isNew && (
                    <span className="badge badge-info" style={{ fontSize: "9px" }}>AI</span>
                  )}

                  {/* ACTIVE INDICATOR LINE */}
                  {isActive && (
                    <div 
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "6px",
                        bottom: "6px",
                        width: "3px",
                        borderRadius: "0 4px 4px 0",
                        background: "var(--primary)"
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        ))}

      </div>

      {/* RBAC FOOTER */}
      {!isCollapsed && (
        <div 
          style={{
            padding: "12px",
            borderRadius: "var(--radius-sm)",
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-color)",
            marginTop: "16px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >
          <ShieldCheck size={18} color="var(--success)" />
          <div>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-main)" }}>{role} Role</div>
            <div className="caption" style={{ fontSize: "10px" }}>Full Access Privileges</div>
          </div>
        </div>
      )}
    </aside>
  );
};
