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
  ShieldCheck,
  ChevronRight
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

  // Grouped Navigation Modules for Full-Screen Menu Overlay
  const navSections = [
    {
      title: "Core Operations",
      items: [
        { id: "dashboard", label: t("dashboard"), desc: "Sales summary, metrics & live KPIs", icon: LayoutDashboard, color: "#6366f1" },
        { id: "pos", label: t("posBilling"), desc: "Fast counter billing & instant digital invoices", icon: Receipt, color: "#10b981" },
        { id: "inventory", label: t("inventory"), desc: "Stock management & low stock tracking", icon: Package, badge: lowStockCount > 0 ? lowStockCount : null, color: "#f59e0b" },
        { id: "orders", label: t("orders"), desc: "Order fulfillment, history & customer returns", icon: ShoppingBag, color: "#ec4899" }
      ]
    },
    {
      title: "Growth & Digital Store",
      items: [
        { id: "storefront", label: t("storeBuilder"), desc: "No-code web store builder & theme editor", icon: Store, color: "#8b5cf6" },
        { id: "ai", label: t("aiCenter"), desc: "AI Copilot, voice commands & store recommendations", icon: Bot, isNew: true, color: "#06b6d4" },
        { id: "comms", label: t("commsHub"), desc: "WhatsApp broadcasts & customer messaging", icon: MessageSquare, color: "#22c55e" }
      ]
    },
    {
      title: "Analytics & System",
      items: [
        { id: "analytics", label: t("analytics"), desc: "Revenue trends & top performing inventory", icon: BarChart3, color: "#3b82f6" },
        { id: "migration", label: t("migration"), desc: "Import catalog from Shopify or Excel/CSV", icon: Upload, color: "#a855f7" },
        { id: "settings", label: t("settings"), desc: "RBAC permissions, branch config & profile", icon: Settings, color: "#64748b" }
      ]
    }
  ];

  return (
    <header className="glass-panel main-navbar" style={{ borderRadius: 0, borderTop: "none", borderLeft: "none", borderRight: "none", padding: "12px 20px", zIndex: 100 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
        
        {/* Left: Menu Trigger & App Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          
          {/* Mobile Full-Screen Menu Overlay Trigger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="btn btn-secondary mobile-hamburger-btn"
            style={{ padding: "8px 12px", gap: "8px" }}
            aria-label="Open Fullscreen Navigation"
          >
            <Menu size={20} />
            <span style={{ fontSize: "0.82rem", fontWeight: "700" }}>Menu</span>
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

      {/* FULL-SCREEN NAVIGATION OVERLAY (REPLACES HAMBURGER DRAWER) */}
      {isMobileMenuOpen && (
        <div className="mobile-fullscreen-overlay">
          
          {/* Overlay Top Header Bar */}
          <div className="mobile-fullscreen-header">
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(99, 102, 241, 0.6)"
              }}>
                <Sparkles size={22} color="#fff" />
              </div>
              <div>
                <h2 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#ffffff", margin: 0, letterSpacing: "-0.5px" }}>
                  Retail OS
                </h2>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  Full-Screen Navigation & Controls
                </div>
              </div>
            </div>

            {/* Circular Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="fullscreen-close-btn"
              aria-label="Close navigation overlay"
            >
              <X size={22} color="#ffffff" />
            </button>
          </div>

          {/* Quick Context Bar (Store Switcher & Role Selector Chips) */}
          <div className="mobile-fullscreen-context-bar">
            <div className="context-chip">
              <Building2 size={15} color="var(--primary)" />
              <select
                value={currentStoreId}
                onChange={(e) => setCurrentStoreId(e.target.value)}
                className="chip-select"
              >
                {stores.map((s) => (
                  <option key={s.id} value={s.id}>{s.name} ({s.city})</option>
                ))}
              </select>
            </div>

            <div className="context-chip">
              <UserCheck size={15} color="#10b981" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="chip-select"
              >
                {rolesList.map((r) => (
                  <option key={r.key} value={r.key}>{r.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Categorized Navigation Grid */}
          <div className="mobile-fullscreen-grid-container">
            {navSections.map((sec, sIdx) => (
              <div key={sIdx} style={{ marginBottom: "24px" }}>
                <div style={{ 
                  fontSize: "0.75rem", 
                  fontWeight: "800", 
                  color: "var(--primary)", 
                  textTransform: "uppercase", 
                  letterSpacing: "1.2px", 
                  marginBottom: "12px",
                  paddingLeft: "4px" 
                }}>
                  {sec.title}
                </div>

                <div className="fullscreen-nav-grid">
                  {sec.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;

                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          setActiveView(item.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`fullscreen-nav-card ${isActive ? "active" : ""}`}
                      >
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                          <div style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "12px",
                            background: isActive ? item.color : "rgba(255, 255, 255, 0.05)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            boxShadow: isActive ? `0 4px 16px ${item.color}66` : "none"
                          }}>
                            <Icon size={20} color={isActive ? "#ffffff" : item.color} />
                          </div>

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                              <h3 style={{ 
                                fontSize: "0.98rem", 
                                fontWeight: "700", 
                                color: isActive ? "#ffffff" : "var(--text-main)", 
                                margin: "0 0 2px 0" 
                              }}>
                                {item.label}
                              </h3>

                              {item.badge && (
                                <span className="badge badge-danger" style={{ fontSize: "0.68rem" }}>
                                  {item.badge} alert
                                </span>
                              )}

                              {item.isNew && !item.badge && (
                                <span className="badge badge-info" style={{ fontSize: "0.65rem" }}>
                                  AI Powered
                                </span>
                              )}
                            </div>
                            
                            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0, lineHeight: "1.3" }}>
                              {item.desc}
                            </p>
                          </div>

                          <ChevronRight size={18} color="var(--text-dim)" style={{ alignSelf: "center", flexShrink: 0 }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Fullscreen Overlay Bottom Action Bar */}
          <div className="mobile-fullscreen-footer">
            <button
              onClick={() => {
                toggleVoiceListening();
                setIsMobileMenuOpen(false);
              }}
              className={`btn ${isListening ? "mic-active" : "btn-secondary"}`}
              style={{ width: "100%", justifyContent: "center", padding: "12px", fontSize: "0.9rem" }}
            >
              <Mic size={18} />
              <span>{isListening ? "Listening to Voice Command..." : "Trigger Voice Copilot"}</span>
            </button>

            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              gap: "8px", 
              marginTop: "12px",
              color: "var(--text-dim)",
              fontSize: "0.75rem" 
            }}>
              <ShieldCheck size={16} color="#10b981" />
              <span>RBAC Protected • Active as {role}</span>
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
