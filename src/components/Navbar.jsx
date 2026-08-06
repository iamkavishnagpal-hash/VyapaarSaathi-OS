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
  Info
} from "lucide-react";

export const Navbar = () => {
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

  return (
    <header className="glass-panel" style={{ borderRadius: 0, borderTop: "none", borderLeft: "none", borderRight: "none", padding: "12px 24px", zIndex: 100 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
        
        {/* Left: Brand logo & Store Switcher */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)"
            }}>
              <Sparkles size={20} color="#fff" />
            </div>
            <div>
              <h1 style={{ fontSize: "1.15rem", fontWeight: "800", letterSpacing: "-0.5px", margin: 0, color: "#fff" }}>
                {t("appTitle")}
              </h1>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>v0.1 TRD Edition</span>
            </div>
          </div>

          {/* Store Branch Switcher */}
          <div style={{ position: "relative" }}>
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
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          
          {/* Role Switcher */}
          <div style={{ position: "relative" }}>
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
            style={{ padding: "8px 14px" }}
          >
            <Mic size={16} />
            <span style={{ fontSize: "0.8rem" }}>{isListening ? "Listening..." : "Voice OS"}</span>
          </button>

          {/* Language Switcher */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="btn btn-secondary"
              style={{ fontSize: "0.8rem", padding: "6px 12px" }}
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
            className="btn btn-primary"
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
                width: "300px",
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
