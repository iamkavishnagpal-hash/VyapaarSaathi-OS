import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { 
  Building2, 
  UserCheck, 
  Mic, 
  Globe, 
  ShoppingCart, 
  Bell, 
  Sparkles,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Info,
  Menu,
  X,
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

export const Navbar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const {
    stores,
    currentStore,
    currentStoreId,
    setCurrentStoreId,
    role,
    setRole,
    lang,
    setLang,
    t,
    activeView,
    setActiveView,
    isListening,
    toggleVoiceListening,
    toasts,
    products
  } = useRetail();

  const [showStoreDropdown, setShowStoreDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

  const lowStockCount = products.filter((p) => p.stockQty <= p.lowStockThreshold).length;

  const rolesList = [
    { key: "Owner", label: t("roleOwner") },
    { key: "Admin", label: t("roleAdmin") },
    { key: "Manager", label: t("roleManager") },
    { key: "Salesman", label: t("roleSalesman") },
    { key: "Warehouse", label: t("roleWarehouse") }
  ];

  const langsList = [
    { key: "en", label: "English" },
    { key: "hi", label: "हिंदी (Hindi)" },
    { key: "hinglish", label: "Hinglish" }
  ];

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
    <header className="glass-panel main-navbar" style={{ borderRadius: 0, borderTop: "none", borderLeft: "none", borderRight: "none", padding: "12px 20px", zIndex: 100 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
        
        {/* Left: Hamburger & Brand logo & Store Switcher */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          
          {/* Hamburger Mobile Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="btn btn-secondary mobile-hamburger-btn"
            style={{ padding: "8px 10px" }}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
              flexShrink: 0
            }}>
              <Sparkles size={20} color="#fff" />
            </div>
            <div>
              <h1 style={{ fontSize: "1.1rem", fontWeight: "800", letterSpacing: "-0.5px", margin: 0, color: "#fff" }}>
                {t("appTitle")}
              </h1>
              <span className="hide-on-mobile" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>v0.1 TRD Edition</span>
            </div>
          </div>

          {/* Store Branch Switcher (Desktop) */}
          <div className="hide-on-mobile" style={{ position: "relative" }}>
            <button
              onClick={() => setShowStoreDropdown(!showStoreDropdown)}
              className="btn btn-secondary"
              style={{ fontSize: "0.82rem", padding: "6px 12px" }}
            >
              <Building2 size={15} color="var(--primary)" />
              <span>{currentStore.name}</span>
              <ChevronDown size={14} />
            </button>

            {showStoreDropdown && (
              <div className="glass-panel" style={{
                position: "absolute",
                top: "110%",
                left: 0,
                width: "280px",
                padding: "8px",
                zIndex: 200
              }}>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", padding: "4px 8px", fontWeight: "700" }}>
                  {t("store")}
                </div>
                {stores.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setCurrentStoreId(s.id);
                      setShowStoreDropdown(false);
                    }}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                      background: s.id === currentStoreId ? "rgba(99, 102, 241, 0.15)" : "transparent",
                      color: s.id === currentStoreId ? "var(--primary)" : "var(--text-main)"
                    }}
                  >
                    <span style={{ fontWeight: "600" }}>{s.name}</span>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>GSTIN: {s.GSTIN} • {s.city}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Controls: Role, Mic, Language, POS shortcut, Notifications */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          
          {/* Role Switcher */}
          <div className="hide-on-mobile" style={{ position: "relative" }}>
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="btn btn-secondary"
              style={{ fontSize: "0.8rem", padding: "6px 12px" }}
            >
              <UserCheck size={15} color="#10b981" />
              <span>{role}</span>
              <ChevronDown size={14} />
            </button>

            {showRoleDropdown && (
              <div className="glass-panel" style={{
                position: "absolute",
                top: "110%",
                right: 0,
                width: "220px",
                padding: "8px",
                zIndex: 200
              }}>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", padding: "4px 8px", fontWeight: "700" }}>
                  {t("role")}
                </div>
                {rolesList.map((r) => (
                  <div
                    key={r.key}
                    onClick={() => {
                      setRole(r.key);
                      setShowRoleDropdown(false);
                    }}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      background: r.key === role ? "rgba(16, 185, 129, 0.15)" : "transparent",
                      color: r.key === role ? "#10b981" : "var(--text-main)"
                    }}
                  >
                    {r.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Voice Command Mic */}
          <button
            onClick={toggleVoiceListening}
            className={`btn ${isListening ? "mic-active" : "btn-secondary"}`}
            title="Voice OS Command"
            style={{ padding: "6px 10px", fontSize: "0.8rem" }}
          >
            <Mic size={16} />
            <span className="hide-on-mobile">{isListening ? "Listening..." : "Voice OS"}</span>
          </button>

          {/* Language Switcher */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="btn btn-secondary"
              style={{ fontSize: "0.8rem", padding: "6px 10px" }}
            >
              <Globe size={15} color="#f59e0b" />
              <span style={{ textTransform: "uppercase" }}>{lang}</span>
              <ChevronDown size={14} />
            </button>

            {showLangDropdown && (
              <div className="glass-panel" style={{
                position: "absolute",
                top: "110%",
                right: 0,
                width: "160px",
                padding: "6px",
                zIndex: 200
              }}>
                {langsList.map((l) => (
                  <div
                    key={l.key}
                    onClick={() => {
                      setLang(l.key);
                      setShowLangDropdown(false);
                    }}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      background: l.key === lang ? "rgba(245, 158, 11, 0.15)" : "transparent",
                      color: l.key === lang ? "#f59e0b" : "var(--text-main)"
                    }}
                  >
                    {l.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* POS Quick Button */}
          <button
            onClick={() => setActiveView("pos")}
            className="btn btn-primary hide-on-mobile"
            style={{ fontSize: "0.82rem", padding: "8px 14px" }}
          >
            <ShoppingCart size={16} />
            <span>{t("newSale")}</span>
          </button>

          {/* Notifications Bell */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="btn btn-secondary"
              style={{ padding: "8px 10px", position: "relative" }}
            >
              <Bell size={16} />
              {lowStockCount > 0 && (
                <span style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  background: "var(--danger)",
                  color: "#fff",
                  fontSize: "0.68rem",
                  fontWeight: "800",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {lowStockCount}
                </span>
              )}
            </button>

            {showNotifs && (
              <div className="glass-panel" style={{
                position: "absolute",
                top: "110%",
                right: 0,
                width: "290px",
                padding: "12px",
                zIndex: 200
              }}>
                <h4 style={{ fontSize: "0.85rem", margin: "0 0 10px 0", color: "#fff", display: "flex", justifyContent: "space-between" }}>
                  <span>Notifications</span>
                  <span className="badge badge-warning">{lowStockCount} Alerts</span>
                </h4>
                {lowStockCount === 0 ? (
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center", padding: "10px" }}>
                    All stocks look healthy!
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {products.filter((p) => p.stockQty <= p.lowStockThreshold).map((p) => (
                      <div key={p.id} style={{ fontSize: "0.8rem", padding: "8px", background: "rgba(239, 68, 68, 0.1)", borderRadius: "6px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
                        <div style={{ fontWeight: "700", color: "#f87171" }}>{p.title}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Stock remaining: <strong>{p.stockQty}</strong> (Threshold: {p.lowStockThreshold})</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Responsive Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            
            {/* Mobile Drawer Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", paddingBottom: "12px", borderBottom: "1px solid var(--border-color)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Sparkles size={18} color="#fff" />
                </div>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: "800", color: "#fff", margin: 0 }}>Retail OS</h3>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Mobile Quick Nav</div>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn btn-secondary"
                style={{ padding: "6px 10px" }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Store & Role Picker inside Mobile Drawer */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "18px" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: "700" }}>
                Store & Role Config
              </div>
              
              {/* Mobile Store Selector */}
              <div style={{ display: "flex", gap: "8px" }}>
                <select
                  value={currentStoreId}
                  onChange={(e) => setCurrentStoreId(e.target.value)}
                  className="input-field"
                  style={{ fontSize: "0.82rem", padding: "8px" }}
                >
                  {stores.map((s) => (
                    <option key={s.id} value={s.id}>{s.name} ({s.city})</option>
                  ))}
                </select>

                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="input-field"
                  style={{ fontSize: "0.82rem", padding: "8px" }}
                >
                  {rolesList.map((r) => (
                    <option key={r.key} value={r.key}>{r.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile Navigation List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "20px" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: "700", marginBottom: "4px" }}>
                Navigation Modules
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveView(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 14px",
                      borderRadius: "var(--radius-sm)",
                      border: "none",
                      background: isActive
                        ? "linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(79, 70, 229, 0.15) 100%)"
                        : "rgba(255, 255, 255, 0.03)",
                      color: isActive ? "#ffffff" : "var(--text-muted)",
                      fontWeight: isActive ? "700" : "500",
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      textAlign: "left"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <Icon size={18} color={isActive ? "var(--primary)" : "var(--text-muted)"} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className="badge badge-danger" style={{ fontSize: "0.68rem" }}>
                        {item.badge}
                      </span>
                    )}

                    {item.isNew && !item.badge && (
                      <span className="badge badge-info" style={{ fontSize: "0.65rem" }}>
                        AI OS
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Security Footer */}
            <div
              style={{
                padding: "12px",
                background: "rgba(15, 23, 42, 0.6)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-color)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "auto"
              }}
            >
              <ShieldCheck size={20} color="#10b981" />
              <div style={{ fontSize: "0.78rem" }}>
                <div style={{ fontWeight: "700", color: "var(--text-main)" }}>RBAC Protection</div>
                <div style={{ color: "var(--text-dim)", fontSize: "0.72rem" }}>Active as {role}</div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Floating Toast Notification Container */}
      <div style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        zIndex: 1000
      }}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="glass-panel"
            style={{
              padding: "12px 18px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "0.88rem",
              background: toast.type === "success" ? "rgba(16, 185, 129, 0.2)" : toast.type === "warning" ? "rgba(245, 158, 11, 0.2)" : "rgba(99, 102, 241, 0.2)",
              borderColor: toast.type === "success" ? "rgba(16, 185, 129, 0.5)" : toast.type === "warning" ? "rgba(245, 158, 11, 0.5)" : "rgba(99, 102, 241, 0.5)",
              color: "#fff",
              boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
            }}
          >
            {toast.type === "success" && <CheckCircle2 size={18} color="#34d399" />}
            {toast.type === "warning" && <AlertTriangle size={18} color="#fbbf24" />}
            {toast.type === "info" && <Info size={18} color="#818cf8" />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </header>
  );
};
