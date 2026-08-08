import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useRetail } from "../context/RetailContext";
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  BarChart3, 
  Bot, 
  Users, 
  Building2, 
  ShieldCheck, 
  Store, 
  Share2, 
  CreditCard, 
  Sliders, 
  PanelLeftClose, 
  PanelLeft,
  ScanLine
} from "lucide-react";

export const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const { role, products } = useRetail();
  const location = useLocation();

  const lowStockCount = products.filter((p) => p.stockQty <= p.lowStockThreshold).length;

  const sections = [
    {
      title: "Navigation",
      items: [
        { path: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { path: "/products", label: "Products", icon: Package },
        { path: "/inventory", label: "Inventory", icon: Layers, badge: lowStockCount > 0 ? lowStockCount : null },
        { path: "/sales", label: "Sales / POS", icon: ScanLine },
        { path: "/purchases", label: "Purchases", icon: ShoppingBag },
        { path: "/transfers", label: "Transfers", icon: Truck },
        { path: "/returns", label: "Returns", icon: RotateCcw },
        { path: "/analytics", label: "Analytics", icon: BarChart3 },
        { path: "/ai", label: "AI Assistant", icon: Bot, isNew: true }
      ]
    },
    {
      title: "Management",
      items: [
        { path: "/customers", label: "Customers", icon: Users },
        { path: "/suppliers", label: "Suppliers", icon: Building2 },
        { path: "/roles", label: "Users & Roles", icon: ShieldCheck },
        { path: "/stores", label: "Stores", icon: Store }
      ]
    },
    {
      title: "Settings",
      items: [
        { path: "/integrations", label: "Integrations", icon: Share2 },
        { path: "/billing", label: "Billing", icon: CreditCard },
        { path: "/preferences", label: "Preferences", icon: Sliders }
      ]
    }
  ];

  return (
    <aside
      className="main-sidebar hide-on-mobile"
      style={{
        width: isCollapsed ? "72px" : "240px",
        minWidth: isCollapsed ? "72px" : "240px",
        backgroundColor: "var(--bg-surface)",
        borderRight: "1px solid var(--border-color)",
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
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        
        {/* HEADER BRAND & TOGGLE */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: isCollapsed ? "center" : "space-between", padding: isCollapsed ? "0" : "0 4px" }}>
          {!isCollapsed && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div 
                style={{ 
                  width: "28px", 
                  height: "28px", 
                  borderRadius: "var(--radius-sm)", 
                  background: "linear-gradient(135deg, var(--primary) 0%, var(--ai-accent) 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontWeight: "800",
                  fontSize: "14px"
                }}
              >
                R
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-main)", letterSpacing: "-0.01em" }}>RETAIL OS</div>
                <div style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: "600", textTransform: "uppercase" }}>Business OS 2.0</div>
              </div>
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="btn btn-ghost"
            style={{ padding: "6px", minWidth: "32px", minHeight: "32px" }}
            title={isCollapsed ? "Expand Sidebar (⌘B)" : "Collapse Sidebar (⌘B)"}
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? <PanelLeft size={18} color="var(--primary)" /> : <PanelLeftClose size={18} color="var(--text-muted)" />}
          </button>
        </div>

        {/* SECTIONS */}
        {sections.map((sec, secIdx) => (
          <div key={sec.title || secIdx} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {!isCollapsed && (
              <div style={{ padding: "0 8px 4px 8px", fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.05em" }}>
                {sec.title}
              </div>
            )}

            {sec.items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  title={isCollapsed ? item.label : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isCollapsed ? "center" : "space-between",
                    minHeight: "36px",
                    padding: isCollapsed ? "8px 0" : "8px 10px",
                    borderRadius: "var(--radius-sm)",
                    textDecoration: "none",
                    background: isActive ? "var(--bg-elevated)" : "transparent",
                    color: isActive ? "var(--text-main)" : "var(--text-secondary)",
                    fontWeight: isActive ? "700" : "500",
                    fontSize: "13px",
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
                    <span className="status-badge badge-warning" style={{ fontSize: "10px", padding: "1px 6px" }}>{item.badge}</span>
                  )}

                  {!isCollapsed && item.isNew && (
                    <span className="status-badge badge-ai" style={{ fontSize: "9px", padding: "1px 5px" }}>AI</span>
                  )}

                  {/* ACTIVE INDICATOR BAR */}
                  {isActive && (
                    <div 
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "6px",
                        bottom: "6px",
                        width: "3px",
                        borderRadius: "0 3px 3px 0",
                        background: "var(--primary)"
                      }}
                    />
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* RBAC USER STATUS */}
      {!isCollapsed && (
        <div 
          style={{
            padding: "10px 12px",
            borderRadius: "var(--radius-sm)",
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--border-color)",
            marginTop: "16px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >
          <div className="system-pulse-dot" />
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-main)", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{role}</div>
            <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Full System Access</div>
          </div>
        </div>
      )}
    </aside>
  );
};
