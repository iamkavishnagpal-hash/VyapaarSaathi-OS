import React from "react";
import { NavLink } from "react-router-dom";
import { useRetail } from "../context/RetailContext";
import { languagesList } from "../data/translations";
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  BarChart3, 
  Bot, 
  Zap, 
  DollarSign, 
  HelpCircle, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Store, 
  ShieldCheck, 
  Users, 
  Globe 
} from "lucide-react";

export const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const { lang, setLang, role, setRole, t } = useRetail();

  const navItems = [
    { path: "/dashboard", label: t("dashboard") || "Business Pulse", icon: LayoutDashboard, roles: ["Store Owner", "Admin", "Manager"] },
    { path: "/superpowers", label: t("superpowers") || "Superpowers", icon: Zap, roles: ["Store Owner", "Admin", "Manager"] },
    { path: "/products", label: t("products") || "Products", icon: Package, roles: ["Store Owner", "Admin", "Manager", "Salesman", "Warehouse Worker"] },
    { path: "/inventory", label: t("inventory") || "Inventory", icon: Layers, roles: ["Store Owner", "Admin", "Manager", "Warehouse Worker"] },
    { path: "/sales", label: t("sales") || "Sales / POS", icon: Zap, roles: ["Store Owner", "Admin", "Manager", "Salesman"] },
    { path: "/purchases", label: t("purchases") || "Purchases", icon: ShoppingBag, roles: ["Store Owner", "Admin", "Manager"] },
    { path: "/transfers", label: t("transfers") || "Transfers", icon: Truck, roles: ["Store Owner", "Admin", "Manager", "Warehouse Worker"] },
    { path: "/returns", label: t("returns") || "Returns", icon: RotateCcw, roles: ["Store Owner", "Admin", "Manager", "Salesman"] },
    { path: "/finance", label: t("finance") || "Finance & Cash Flow", icon: DollarSign, roles: ["Store Owner", "Admin", "Accountant"] },
    { path: "/analytics", label: t("analytics") || "Analytics", icon: BarChart3, roles: ["Store Owner", "Admin", "Manager"] },
    { path: "/ai", label: t("aiAssistant") || "Saathi AI Team", icon: Bot, roles: ["Store Owner", "Admin", "Manager", "Salesman", "Warehouse Worker", "Accountant"] },
    { path: "/help", label: t("helpCenter") || "Help & Learn", icon: HelpCircle, roles: ["Store Owner", "Admin", "Manager", "Salesman", "Warehouse Worker", "Accountant"] }
  ];

  // Filter navigation links based on user's active role
  const visibleNavItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <aside
      style={{
        width: isCollapsed ? "72px" : "240px",
        backgroundColor: "var(--bg-surface)",
        borderRight: "1px solid var(--border-color)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "width 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        zIndex: 100,
        userSelect: "none"
      }}
    >
      {/* BRAND & TOGGLE */}
      <div>
        <div
          style={{
            padding: isCollapsed ? "16px 8px" : "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: isCollapsed ? "center" : "space-between",
            borderBottom: "1px solid var(--border-color)"
          }}
        >
          {!isCollapsed && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontWeight: "800", fontSize: "12px" }}>
                V
              </div>
              <span style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)", letterSpacing: "-0.01em" }}>
                {t("appTitle")}
              </span>
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="btn btn-ghost"
            style={{ padding: "4px" }}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* ROLE & LANGUAGE SELECTORS */}
        {!isCollapsed && (
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div>
              <label style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Active Role</label>
              <select
                className="input-field"
                style={{ padding: "4px 8px", fontSize: "11px", marginTop: "2px" }}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Store Owner">Store Owner</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Salesman">Salesman</option>
                <option value="Warehouse Worker">Warehouse Worker</option>
                <option value="Accountant">Accountant</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                <Globe size={10} /> Language
              </label>
              <select
                className="input-field"
                style={{ padding: "4px 8px", fontSize: "11px", marginTop: "2px" }}
                value={lang}
                onChange={(e) => {
                  const selectedLang = e.target.value;
                  setLang(selectedLang);
                  const langObj = languagesList.find((l) => l.code === selectedLang);
                  if (langObj) {
                    document.documentElement.setAttribute("dir", langObj.dir || "ltr");
                  }
                }}
              >
                {languagesList.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.native} ({l.label})
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* NAVIGATION LINKS */}
        <nav style={{ padding: "12px 8px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `btn btn-ghost ${isActive ? "active-nav-link" : ""}`}
                style={({ isActive }) => ({
                  justifyContent: isCollapsed ? "center" : "flex-start",
                  gap: "12px",
                  padding: "10px 12px",
                  fontSize: "13px",
                  fontWeight: isActive ? "700" : "500",
                  backgroundColor: isActive ? "var(--primary-subtle)" : "transparent",
                  color: isActive ? "var(--primary)" : "var(--text-secondary)",
                  borderRadius: "var(--radius-sm)"
                })}
                title={item.label}
              >
                <Icon size={18} />
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* FOOTER */}
      {!isCollapsed && (
        <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border-color)", fontSize: "11px", color: "var(--text-muted)" }}>
          <NavLink to="/onboarding" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
            ⚙️ Setup Wizard
          </NavLink>
        </div>
      )}
    </aside>
  );
};
