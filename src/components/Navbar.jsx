import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { 
  Building2, 
  UserCheck, 
  Mic, 
  Globe, 
  Bell, 
  Sparkles,
  ChevronDown,
  Search,
  Settings,
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
  ChevronRight
  ,
  Menu
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
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    { key: "hinglish", label: "Hinglish" },
    { key: "es", label: "Español" },
    { key: "fr", label: "Français" },
    { key: "de", label: "Deutsch" },
    { key: "ar", label: "العربية (Arabic)" },
    { key: "ja", label: "日本語 (Japanese)" },
    { key: "zh", label: "中文 (Chinese)" }
  ];

  // Grouped Navigation Modules for Full-Screen Menu Overlay (Mobile)
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
    <>
      {/* EXECUTIVE DESKTOP HEADER (STRICT 72PX HEIGHT & ZERO CLUTTER) */}
      <header className="glass-panel main-navbar hide-on-mobile" style={{ height: "72px", borderRadius: 0, borderTop: "none", borderLeft: "none", borderRight: "none", padding: "0 32px", zIndex: 100, display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "1600px", margin: "0 auto" }}>
          
          {/* LEFT: BRAND LOGO & STORE SWITCHER */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            
            <div onClick={() => setActiveView("dashboard")} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(139, 92, 246, 0.45)",
                flexShrink: 0
              }}>
                <Sparkles size={22} color="#fff" />
              </div>
              <div>
                <h1 style={{ fontSize: "18px", fontWeight: "800", letterSpacing: "-0.02em", margin: 0, color: "#fff" }}>
                  {t("appTitle")}
                </h1>
                <span className="hide-on-mobile" style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "600", letterSpacing: "0.05em" }}>ENTERPRISE OS</span>
              </div>
            </div>

            {/* STORE BRANCH SWITCHER (DESKTOP) */}
            <div className="hide-on-mobile" style={{ position: "relative" }}>
              <button
                onClick={() => setShowStoreDropdown(!showStoreDropdown)}
                className="btn btn-secondary"
                style={{ fontSize: "13px", padding: "8px 14px", minHeight: "42px" }}
              >
                <Building2 size={16} color="var(--primary)" />
                <span style={{ fontWeight: "600" }}>{currentStore.name}</span>
                <ChevronDown size={14} />
              </button>

              {showStoreDropdown && (
                <div className="glass-panel" style={{
                  position: "absolute",
                  top: "115%",
                  left: 0,
                  width: "280px",
                  padding: "8px",
                  zIndex: 300
                }}>
                  <div className="caption" style={{ padding: "6px 10px", fontWeight: "700" }}>
                    Select Retail Branch
                  </div>
                  {stores.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => {
                        setCurrentStoreId(s.id);
                        setShowStoreDropdown(false);
                      }}
                      style={{
                        padding: "10px 12px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "14px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                        background: s.id === currentStoreId ? "rgba(139, 92, 246, 0.18)" : "transparent",
                        color: s.id === currentStoreId ? "var(--primary)" : "var(--text-main)"
                      }}
                    >
                      <span style={{ fontWeight: "700" }}>{s.name}</span>
                      <span className="caption" style={{ fontSize: "11px" }}>GSTIN: {s.GSTIN} • {s.city}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* MOBILE STORE SWITCHER CHIP (ONLY ON MOBILE) */}
            <button
              onClick={() => setShowStoreDropdown(!showStoreDropdown)}
              className="btn btn-secondary hide-on-desktop"
              style={{ fontSize: "12px", padding: "6px 10px", minHeight: "36px", height: "36px" }}
            >
              <Building2 size={14} color="var(--primary)" />
              <span style={{ fontWeight: "700", maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {currentStore.name}
              </span>
              <ChevronDown size={12} />
            </button>

          </div>

          {/* CENTER: GLOBAL SEARCH BAR (DESKTOP) */}
          <div className="hide-on-mobile" style={{ width: "360px", position: "relative" }}>
            <Search size={16} color="var(--text-dim)" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              className="input-field"
              style={{ paddingLeft: "40px", minHeight: "42px", fontSize: "13px" }}
              placeholder="Search products, SKU, orders, or customers (⌘K)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* RIGHT: NOTIFICATIONS & COMPACT EXECUTIVE PROFILE MENU */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            
            {/* NOTIFICATIONS BELL */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowNotifs(!showNotifs)}
                className="btn btn-secondary"
                style={{ padding: "10px", minWidth: "42px", minHeight: "42px", position: "relative" }}
                aria-label="Notifications"
              >
                <Bell size={18} />
                {toasts.length > 0 && (
                  <span style={{
                    position: "absolute",
                    top: "4px",
                    right: "4px",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--danger)"
                  }} />
                )}
              </button>

              {showNotifs && (
                <div className="glass-panel" style={{
                  position: "absolute",
                  top: "115%",
                  right: 0,
                  width: "320px",
                  padding: "16px",
                  zIndex: 300
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <h3 style={{ margin: 0, fontSize: "14px" }}>System Notifications</h3>
                    <span className="badge badge-info">{toasts.length} New</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "240px", overflowY: "auto" }}>
                    {toasts.length === 0 ? (
                      <div className="caption" style={{ padding: "12px 0", textAlign: "center" }}>All systems normal</div>
                    ) : (
                      toasts.map((t) => (
                        <div key={t.id} style={{ padding: "8px 12px", background: "rgba(255,255,255,0.03)", borderRadius: "8px", fontSize: "13px" }}>
                          {t.msg}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* EXECUTIVE PROFILE DROPDOWN MENU (CONTAINS ROLE, LANG, VOICE OS, SETTINGS) */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="btn btn-secondary"
                style={{ padding: "6px 12px", minHeight: "42px", display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "12px", color: "#fff" }}>
                  {role[0]}
                </div>
                <div className="hide-on-mobile" style={{ textAlign: "left" }}>
                  <div style={{ fontSize: "13px", fontWeight: "700", lineHeight: "1.2", color: "#fff" }}>{role}</div>
                  <div className="caption" style={{ fontSize: "10px" }}>Executive Privileges</div>
                </div>
                <ChevronDown size={14} color="var(--text-muted)" />
              </button>

              {showProfileMenu && (
                <div className="glass-panel" style={{
                  position: "absolute",
                  top: "115%",
                  right: 0,
                  width: "260px",
                  padding: "12px",
                  zIndex: 350
                }}>
                  {/* Role Picker */}
                  <div className="caption" style={{ fontSize: "11px", fontWeight: "700", marginBottom: "6px" }}>Select Role Persona</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "12px" }}>
                    {rolesList.map((r) => (
                      <button
                        key={r.key}
                        onClick={() => { setRole(r.key); setShowProfileMenu(false); }}
                        className={`btn ${role === r.key ? "btn-primary" : "btn-ghost"}`}
                        style={{ justifyContent: "flex-start", padding: "6px 10px", fontSize: "13px", minHeight: "36px" }}
                      >
                        <UserCheck size={14} />
                        <span>{r.label}</span>
                      </button>
                    ))}
                  </div>

                  <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "8px", marginTop: "4px" }}>
                    {/* Voice OS Toggle */}
                    <button
                      onClick={() => { toggleVoiceListening(); setShowProfileMenu(false); }}
                      className={`btn ${isListening ? "btn-danger" : "btn-ghost"}`}
                      style={{ width: "100%", justifyContent: "flex-start", padding: "8px 10px", fontSize: "13px", minHeight: "36px", marginBottom: "4px" }}
                    >
                      <Mic size={14} />
                      <span>{isListening ? "Voice Listening Active..." : "Trigger Voice AI Command"}</span>
                    </button>

                    {/* Language Selector */}
                    <div style={{ padding: "4px 10px", marginBottom: "8px" }}>
                      <div className="caption" style={{ fontSize: "11px", fontWeight: "700", marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                        <Globe size={13} />
                        <span>Global Language</span>
                      </div>
                      <select
                        className="input-field"
                        style={{ minHeight: "36px", padding: "4px 8px", fontSize: "13px" }}
                        value={lang}
                        onChange={(e) => { setLang(e.target.value); setShowProfileMenu(false); }}
                      >
                        {langsList.map((l) => (
                          <option key={l.key} value={l.key}>{l.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Advanced Settings */}
                    <button
                      onClick={() => { setActiveView("settings"); setShowProfileMenu(false); }}
                      className="btn btn-ghost"
                      style={{ width: "100%", justifyContent: "flex-start", padding: "8px 10px", fontSize: "13px", minHeight: "36px" }}
                    >
                      <Settings size={14} />
                      <span>Advanced Settings & RBAC</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* MOBILE HEADER: LOGO + LOCATION + NOTIFS + PROFILE + MENU */}
      <header className="glass-panel hide-on-desktop" style={{ borderRadius: 0, borderTop: "none", borderLeft: "none", borderRight: "none", padding: "12px 14px", zIndex: 100, display: "none", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", minWidth: 0 }}>
          <button
            onClick={() => setActiveView("dashboard")}
            className="btn btn-ghost"
            style={{ width: "auto", minWidth: "44px", minHeight: "44px", padding: "0 6px", flexShrink: 0 }}
            aria-label="Open home dashboard"
          >
            <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles size={18} color="#fff" />
            </div>
          </button>

          <button
            onClick={() => setShowStoreDropdown(!showStoreDropdown)}
            className="btn btn-secondary"
            style={{ minHeight: "44px", padding: "10px 12px", flex: 1, minWidth: 0, justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
              <Building2 size={14} color="var(--primary)" />
              <span style={{ fontSize: "12px", fontWeight: "700", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{currentStore.name}</span>
            </div>
            <ChevronDown size={12} />
          </button>

          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="btn btn-secondary"
            style={{ width: "44px", minHeight: "44px", minWidth: "44px", padding: 0, flexShrink: 0, position: "relative" }}
            aria-label="Notifications"
          >
            <Bell size={18} />
            {toasts.length > 0 && <span style={{ position: "absolute", top: "8px", right: "8px", width: "8px", height: "8px", borderRadius: "50%", background: "var(--danger)" }} />}
          </button>

          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="btn btn-secondary"
            style={{ width: "44px", minHeight: "44px", minWidth: "44px", padding: 0, flexShrink: 0 }}
            aria-label="Profile menu"
          >
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "12px", color: "#fff" }}>
              {role[0]}
            </div>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="btn btn-secondary"
            style={{ width: "44px", minHeight: "44px", minWidth: "44px", padding: 0, flexShrink: 0 }}
            aria-label="Open navigation menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* FULL-SCREEN NAVIGATION OVERLAY FOR MOBILE */}
      {isMobileMenuOpen && (
        <div className="mobile-fullscreen-overlay">
          <div className="mobile-fullscreen-header">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkles size={18} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontSize: "16px", margin: 0 }}>Retail OS Modules</h3>
                <div className="caption" style={{ fontSize: "11px" }}>{currentStore.name}</div>
              </div>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="fullscreen-close-btn">
              <X size={20} color="#fff" />
            </button>
          </div>

          <div className="mobile-fullscreen-grid-container">
            <div className="fullscreen-nav-grid">
              {navSections.map((sec) => (
                <div key={sec.title} style={{ marginBottom: "20px" }}>
                  <div className="caption" style={{ fontSize: "12px", fontWeight: "700", marginBottom: "10px" }}>{sec.title}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
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
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div style={{ padding: "8px", borderRadius: "10px", background: "rgba(255,255,255,0.06)" }}>
                              <Icon size={20} color={item.color} />
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: "700", fontSize: "15px", color: "#fff" }}>{item.label}</div>
                              <div className="caption" style={{ fontSize: "12px" }}>{item.desc}</div>
                            </div>
                            <ChevronRight size={16} color="var(--text-muted)" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
