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
  Globe, 
  MessageSquare, 
  Users, 
  Sliders, 
  ChevronLeft, 
  ChevronRight,
  Upload
} from "lucide-react";

export const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const { lang, setLang, role, setRole, t } = useRetail();

  const pillarNavGroups = [
    {
      pillarTitle: "01 COMMAND CENTER",
      items: [
        { path: "/dashboard", label: "Business Pulse", icon: LayoutDashboard, roles: ["Store Owner", "Admin", "Manager"] },
        { path: "/superpowers", label: "My Day & Superpowers", icon: Zap, roles: ["Store Owner", "Admin", "Manager"] }
      ]
    },
    {
      pillarTitle: "02 GROW & GO ONLINE",
      items: [
        { path: "/go-online", label: "Go Online Launcher", icon: Globe, roles: ["Store Owner", "Admin", "Manager"] },
        { path: "/listings", label: "Master Product Listings", icon: Upload, roles: ["Store Owner", "Admin", "Manager"] },
        { path: "/channels", label: "Channel Center & Shopify", icon: Layers, roles: ["Store Owner", "Admin", "Manager"] },
        { path: "/whatsapp-commerce", label: "WhatsApp AI Commerce", icon: MessageSquare, roles: ["Store Owner", "Admin", "Manager", "Salesman"] },
        { path: "/customers", label: "Customer 360 CRM", icon: Users, roles: ["Store Owner", "Admin", "Manager", "Salesman"] }
      ]
    },
    {
      pillarTitle: "03 OPERATE",
      items: [
        { path: "/products", label: "Products Catalog", icon: Package, roles: ["Store Owner", "Admin", "Manager", "Salesman", "Warehouse Worker"] },
        { path: "/inventory", label: "Inventory Matrix", icon: Layers, roles: ["Store Owner", "Admin", "Manager", "Warehouse Worker"] },
        { path: "/sales", label: "POS Sales & Billing", icon: Zap, roles: ["Store Owner", "Admin", "Manager", "Salesman"] },
        { path: "/purchases", label: "Purchases & Orders", icon: ShoppingBag, roles: ["Store Owner", "Admin", "Manager"] },
        { path: "/transfers", label: "Stock Transfers", icon: Truck, roles: ["Store Owner", "Admin", "Manager", "Warehouse Worker"] },
        { path: "/returns", label: "Customer Returns", icon: RotateCcw, roles: ["Store Owner", "Admin", "Manager", "Salesman"] },
        { path: "/fulfillment", label: "Fulfillment Autopilot", icon: Truck, roles: ["Store Owner", "Admin", "Manager", "Warehouse Worker"] }
      ]
    },
    {
      pillarTitle: "04 UNDERSTAND & FINANCE",
      items: [
        { path: "/analytics", label: "Analytics & Forecasts", icon: BarChart3, roles: ["Store Owner", "Admin", "Manager"] },
        { path: "/finance", label: "Finance & Cash Flow", icon: DollarSign, roles: ["Store Owner", "Admin", "Accountant"] }
      ]
    },
    {
      pillarTitle: "05 AUTOMATE & LEARN",
      items: [
        { path: "/ai", label: "Saathi 12-AI Team", icon: Bot, roles: ["Store Owner", "Admin", "Manager", "Salesman", "Warehouse Worker", "Accountant"] },
        { path: "/automations", label: "SOP Automations", icon: Sliders, roles: ["Store Owner", "Admin", "Manager"] },
        { path: "/help", label: "Help & Learn Center", icon: HelpCircle, roles: ["Store Owner", "Admin", "Manager", "Salesman", "Warehouse Worker", "Accountant"] }
      ]
    }
  ];

  return (
    <aside
      style={{
        width: isCollapsed ? "72px" : "250px",
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
      <div>
        {/* BRAND HEADER & COLLAPSE TOGGLE */}
        <div
          style={{
            padding: isCollapsed ? "16px 8px" : "16px 18px",
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
                VyapaarSaathi OS
              </span>
            </div>
          )}

          <button
            type="button"
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
          <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: "6px" }}>
            <div>
              <label style={{ fontSize: "9px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Active Role</label>
              <select
                className="input-field"
                style={{ padding: "3px 6px", fontSize: "11px", marginTop: "2px" }}
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
              <label style={{ fontSize: "9px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Language</label>
              <select
                className="input-field"
                style={{ padding: "3px 6px", fontSize: "11px", marginTop: "2px" }}
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

        {/* NAVIGATION PILLARS */}
        <nav style={{ padding: "10px 8px", display: "flex", flexDirection: "column", gap: "12px", maxHeight: "calc(100vh - 180px)", overflowY: "auto" }}>
          {pillarNavGroups.map((group, gIdx) => {
            const visibleItems = group.items.filter((item) => item.roles.includes(role));
            if (visibleItems.length === 0) return null;

            return (
              <div key={gIdx} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                {!isCollapsed && (
                  <div style={{ fontSize: "9px", fontWeight: "800", color: "var(--text-muted)", letterSpacing: "0.05em", padding: "4px 8px" }}>
                    {group.pillarTitle}
                  </div>
                )}
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) => `btn btn-ghost ${isActive ? "active-nav-link" : ""}`}
                      style={({ isActive }) => ({
                        justifyContent: isCollapsed ? "center" : "flex-start",
                        gap: "10px",
                        padding: "8px 10px",
                        fontSize: "12px",
                        fontWeight: isActive ? "700" : "500",
                        backgroundColor: isActive ? "var(--primary-subtle)" : "transparent",
                        color: isActive ? "var(--primary)" : "var(--text-secondary)",
                        borderRadius: "var(--radius-sm)"
                      })}
                      title={item.label}
                    >
                      <Icon size={16} />
                      {!isCollapsed && <span>{item.label}</span>}
                    </NavLink>
                  );
                })}
              </div>
            );
          })}
        </nav>
      </div>

      {!isCollapsed && (
        <div style={{ padding: "10px 14px", borderTop: "1px solid var(--border-color)", fontSize: "11px", color: "var(--text-muted)" }}>
          <NavLink to="/onboarding" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
            ⚙️ Setup Wizard
          </NavLink>
        </div>
      )}
    </aside>
  );
};
