import React from "react";
import { NavLink } from "react-router-dom";
import { useRetail } from "../context/RetailContext";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Zap, 
  Store 
} from "lucide-react";

export const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const { currentStore, stores, setCurrentStoreId } = useRetail();

  const workspaces = [
    {
      id: "command-center",
      label: "Command Center",
      path: "/dashboard",
      icon: LayoutDashboard,
      badge: "Action UI"
    },
    {
      id: "commerce",
      label: "Commerce",
      path: "/commerce",
      icon: ShoppingBag,
      detail: "Sales, POS & Customers"
    },
    {
      id: "supply",
      label: "Supply & Stock",
      path: "/supply",
      icon: Package,
      detail: "Products, Inventory & POs"
    },
    {
      id: "intelligence",
      label: "Intelligence",
      path: "/intelligence",
      icon: BarChart3,
      detail: "Analytics & P&L"
    },
    {
      id: "settings",
      label: "Settings",
      path: "/settings",
      icon: Settings,
      detail: "Roles & Config"
    }
  ];

  return (
    <aside
      style={{
        width: isCollapsed ? "72px" : "240px",
        backgroundColor: "var(--bg-surface)",
        borderRight: "1px solid var(--border-color)",
        display: "flex",
        flexDirection: "column",
        transition: "width var(--motion-normal)",
        zIndex: 100,
        height: "100vh",
        position: "sticky",
        top: 0
      }}
    >
      {/* BRAND & LOGO HEADER */}
      <div
        style={{
          padding: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "space-between",
          borderBottom: "1px solid var(--border-color)"
        }}
      >
        {!isCollapsed && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "var(--radius-xs)",
                backgroundColor: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "900",
                color: "#FFFFFF",
                fontSize: "14px"
              }}
            >
              V
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-main)", letterSpacing: "-0.02em" }}>
                VYAPAARSAATHI
              </div>
              <div style={{ fontSize: "10px", color: "var(--primary)", fontWeight: "700" }}>BUSINESS OS 2.0</div>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="btn btn-ghost"
          style={{ padding: "4px", color: "var(--text-muted)" }}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* STORE SWITCHER DROPDOWN */}
      {!isCollapsed && (
        <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border-color)" }}>
          <div style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "4px" }}>
            Active Store Channel
          </div>
          <select
            value={currentStore.id}
            onChange={(e) => setCurrentStoreId(e.target.value)}
            className="input-field"
            style={{ padding: "4px 8px", fontSize: "12px", fontWeight: "600" }}
          >
            {stores.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.location})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* CORE WORKSPACES NAVIGATION */}
      <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: "4px" }}>
        {!isCollapsed && (
          <div style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)", padding: "4px 8px", marginBottom: "4px" }}>
            Core Intent Workspaces
          </div>
        )}

        {workspaces.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => `btn ${isActive ? "btn-primary" : "btn-ghost"}`}
              style={{
                justifyContent: isCollapsed ? "center" : "flex-start",
                padding: isCollapsed ? "10px" : "10px 12px",
                width: "100%",
                gap: "12px"
              }}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={18} />
              {!isCollapsed && (
                <div style={{ flex: 1, textAlign: "left" }}>
                  <div style={{ fontSize: "13px", fontWeight: "700", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{item.label}</span>
                    {item.badge && <span className="status-badge badge-ai" style={{ fontSize: "9px" }}>{item.badge}</span>}
                  </div>
                  {item.detail && <div style={{ fontSize: "10px", opacity: 0.8, fontWeight: "500" }}>{item.detail}</div>}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* FOOTER SYSTEM STATUS */}
      {!isCollapsed && (
        <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border-color)", display: "flex", alignItems: "center", gap: "8px" }}>
          <div className="system-pulse-dot" />
          <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)" }}>
            Saathi Engine Active
          </span>
        </div>
      )}
    </aside>
  );
};
