import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { 
  Search, 
  Command, 
  Bell, 
  Sun, 
  Moon, 
  Monitor, 
  Store, 
  Plus, 
  Camera, 
  ScanLine, 
  ShoppingBag, 
  Check, 
  Eye, 
  User 
} from "lucide-react";

export const Navbar = () => {
  const {
    themePreference,
    setThemePreference,
    accessibilityMode,
    setAccessibilityMode,
    stores,
    currentStoreId,
    setCurrentStoreId,
    currentStore,
    setIsCommandPaletteOpen,
    setIsCaptureModalOpen,
    openScanner,
    setActiveView,
    toasts
  } = useRetail();

  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isStoreMenuOpen, setIsStoreMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <header
      style={{
        height: "60px",
        backgroundColor: "var(--bg-surface)",
        borderBottom: "1px solid var(--border-color)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 var(--space-5)",
        zIndex: 80,
        position: "sticky",
        top: 0
      }}
    >
      {/* LEFT: GLOBAL SEARCH & COMMAND SHORTCUT */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1, maxWidth: "480px" }}>
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "8px 12px",
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-sm)",
            color: "var(--text-muted)",
            fontSize: "13px",
            cursor: "pointer",
            textAlign: "left"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Search size={16} color="var(--text-muted)" />
            <span>Search catalog, orders, SKUs (⌘K)...</span>
          </div>
          <span style={{ fontSize: "11px", border: "1px solid var(--border-color)", padding: "2px 6px", borderRadius: "4px", backgroundColor: "var(--bg-surface)", fontFamily: "var(--font-mono)" }}>
            ⌘K
          </span>
        </button>
      </div>

      {/* RIGHT: STORE SELECTOR, THEME, NOTIFS, ADD NEW CTA */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        
        {/* STORE SELECTOR DROPDOWN */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setIsStoreMenuOpen(!isStoreMenuOpen)}
            className="btn btn-secondary btn-sm"
            style={{ gap: "6px" }}
          >
            <Store size={14} color="var(--primary)" />
            <span style={{ fontWeight: "700" }}>{currentStore?.name || "Select Store"}</span>
          </button>

          {isStoreMenuOpen && (
            <div
              className="card-panel-elevated"
              style={{
                position: "absolute",
                top: "40px",
                right: 0,
                width: "240px",
                padding: "8px",
                zIndex: 100,
                boxShadow: "var(--shadow-md)"
              }}
            >
              <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)", padding: "4px 8px" }}>
                Select Active Location
              </div>
              {stores.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setCurrentStoreId(s.id);
                    setIsStoreMenuOpen(false);
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px",
                    borderRadius: "var(--radius-xs)",
                    border: "none",
                    background: s.id === currentStoreId ? "var(--bg-hover)" : "transparent",
                    color: "var(--text-main)",
                    cursor: "pointer",
                    fontSize: "12px"
                  }}
                >
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: "600" }}>{s.name}</div>
                    <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>{s.code} • {s.city}</div>
                  </div>
                  {s.id === currentStoreId && <Check size={14} color="var(--success)" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* THEME SELECTOR DROPDOWN */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
            className="btn btn-ghost"
            style={{ padding: "8px" }}
            title="Theme Preferences"
          >
            {themePreference === "dark" ? <Moon size={16} /> : themePreference === "light" ? <Sun size={16} /> : <Monitor size={16} />}
          </button>

          {isThemeMenuOpen && (
            <div
              className="card-panel-elevated"
              style={{
                position: "absolute",
                top: "40px",
                right: 0,
                width: "200px",
                padding: "8px",
                zIndex: 100,
                boxShadow: "var(--shadow-md)"
              }}
            >
              <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)", padding: "4px 8px" }}>
                Theme Mode
              </div>
              {[
                { id: "dark", label: "Dark Mode", icon: Moon },
                { id: "light", label: "Light Mode", icon: Sun },
                { id: "system", label: "System Auto", icon: Monitor }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setThemePreference(item.id);
                      setIsThemeMenuOpen(false);
                    }}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px",
                      borderRadius: "var(--radius-xs)",
                      border: "none",
                      background: themePreference === item.id ? "var(--bg-hover)" : "transparent",
                      color: "var(--text-main)",
                      cursor: "pointer",
                      fontSize: "12px"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Icon size={14} />
                      <span>{item.label}</span>
                    </div>
                    {themePreference === item.id && <Check size={14} color="var(--primary)" />}
                  </button>
                );
              })}

              <div style={{ borderTop: "1px solid var(--border-color)", margin: "6px 0" }} />

              <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)", padding: "4px 8px" }}>
                Accessibility Mode
              </div>
              {[
                { id: "standard", label: "Standard Density" },
                { id: "comfort", label: "Comfort Layout" },
                { id: "high-contrast", label: "High Contrast" }
              ].map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => {
                    setAccessibilityMode(acc.id);
                    setIsThemeMenuOpen(false);
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "6px 8px",
                    borderRadius: "var(--radius-xs)",
                    border: "none",
                    background: accessibilityMode === acc.id ? "var(--bg-hover)" : "transparent",
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                    fontSize: "12px"
                  }}
                >
                  <span>{acc.label}</span>
                  {accessibilityMode === acc.id && <Check size={14} color="var(--success)" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* NOTIFICATIONS BELL */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="btn btn-ghost"
            style={{ padding: "8px", position: "relative" }}
            title="System Activity & Notifications"
          >
            <Bell size={16} />
            {toasts.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "6px",
                  right: "6px",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "var(--primary)"
                }}
              />
            )}
          </button>

          {isNotifOpen && (
            <div
              className="card-panel-elevated"
              style={{
                position: "absolute",
                top: "40px",
                right: 0,
                width: "300px",
                padding: "12px",
                zIndex: 100,
                boxShadow: "var(--shadow-md)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-main)" }}>Notifications</span>
                <span className="status-badge badge-primary">{toasts.length} Live</span>
              </div>
              {toasts.length === 0 ? (
                <div style={{ fontSize: "12px", color: "var(--text-muted)", padding: "12px 0", textAlign: "center" }}>
                  All systems operational. No unread alerts.
                </div>
              ) : (
                toasts.map((t) => (
                  <div key={t.id} style={{ padding: "8px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--bg-surface)", marginBottom: "6px", fontSize: "12px" }}>
                    <div style={{ fontWeight: "600", color: "var(--text-main)" }}>{t.message}</div>
                    <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>{t.type.toUpperCase()} • Just now</div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* PRIMARY + ADD NEW CTA DROPDOWN */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
            className="btn btn-primary"
            style={{ gap: "6px" }}
          >
            <Plus size={16} />
            <span style={{ fontWeight: "700" }}>Add New</span>
          </button>

          {isAddMenuOpen && (
            <div
              className="card-panel-elevated"
              style={{
                position: "absolute",
                top: "40px",
                right: 0,
                width: "220px",
                padding: "8px",
                zIndex: 100,
                boxShadow: "var(--shadow-md)"
              }}
            >
              <button
                onClick={() => {
                  setIsCaptureModalOpen(true);
                  setIsAddMenuOpen(false);
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 10px",
                  borderRadius: "var(--radius-xs)",
                  border: "none",
                  backgroundColor: "transparent",
                  color: "var(--text-main)",
                  cursor: "pointer",
                  fontSize: "13px"
                }}
              >
                <Camera size={16} color="var(--ai-accent)" />
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontWeight: "600" }}>AI Camera Capture</div>
                  <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Scan physical product label</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setActiveView("sales");
                  setIsAddMenuOpen(false);
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 10px",
                  borderRadius: "var(--radius-xs)",
                  border: "none",
                  backgroundColor: "transparent",
                  color: "var(--text-main)",
                  cursor: "pointer",
                  fontSize: "13px"
                }}
              >
                <ScanLine size={16} color="var(--primary)" />
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontWeight: "600" }}>New POS Sale</div>
                  <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Start checkout billing</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setActiveView("purchases");
                  setIsAddMenuOpen(false);
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 10px",
                  borderRadius: "var(--radius-xs)",
                  border: "none",
                  backgroundColor: "transparent",
                  color: "var(--text-main)",
                  cursor: "pointer",
                  fontSize: "13px"
                }}
              >
                <ShoppingBag size={16} color="var(--success)" />
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontWeight: "600" }}>Create Purchase Order</div>
                  <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Order stock from supplier</div>
                </div>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
