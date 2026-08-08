import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRetail } from "../context/RetailContext";
import { 
  Search, 
  Plus, 
  Bell, 
  Sun, 
  Moon, 
  Camera, 
  ScanLine, 
  ShoppingBag, 
  Globe, 
  Mic, 
  Zap, 
  Store 
} from "lucide-react";

export const Navbar = () => {
  const {
    stores,
    currentStoreId,
    setCurrentStoreId,
    themePreference,
    setThemePreference,
    setIsCommandPaletteOpen,
    setIsCaptureModalOpen,
    openScanner,
    setIsVoiceModalOpen,
    t
  } = useRetail();

  const navigate = useNavigate();

  return (
    <header
      style={{
        height: "64px",
        backgroundColor: "var(--bg-surface)",
        borderBottom: "1px solid var(--border-color)",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        zIndex: 90
      }}
    >
      {/* SEARCH COMMAND PALETTE TRIGGER */}
      <div
        onClick={() => setIsCommandPaletteOpen(true)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "var(--bg-app)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--radius-sm)",
          padding: "6px 14px",
          width: "360px",
          cursor: "pointer",
          color: "var(--text-muted)",
          fontSize: "13px"
        }}
      >
        <Search size={16} color="var(--primary)" />
        <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {t("searchPlaceholder")}
        </span>
        <span style={{ fontSize: "10px", fontWeight: "700", padding: "2px 6px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-color)" }}>
          ⌘K
        </span>
      </div>

      {/* RIGHT SIDE ACTIONS */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        
        {/* VOICE OS MICROPHONE BUTTON */}
        <button
          onClick={() => setIsVoiceModalOpen(true)}
          className="btn btn-secondary btn-sm"
          style={{ gap: "6px", color: "var(--primary)" }}
          title="Voice Business OS Microphone"
        >
          <Mic size={16} />
          <span>Voice OS</span>
        </button>

        {/* GO ONLINE WIZARD SHORTCUT */}
        <button
          onClick={() => navigate("/go-online")}
          className="btn btn-secondary btn-sm"
          style={{ gap: "6px" }}
          title="Offline-to-Online Migration Launcher"
        >
          <Globe size={16} color="var(--primary)" />
          <span>Go Online</span>
        </button>

        {/* STORE LOCATION SELECTOR */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "var(--bg-elevated)", padding: "4px 10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
          <Store size={14} color="var(--text-muted)" />
          <select
            value={currentStoreId}
            onChange={(e) => setCurrentStoreId(e.target.value)}
            style={{ background: "transparent", border: "none", outline: "none", color: "var(--text-main)", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}
          >
            {stores.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.type})
              </option>
            ))}
          </select>
        </div>

        {/* FAST CREATE ACTION */}
        <button onClick={() => setIsCaptureModalOpen(true)} className="btn btn-ai btn-sm" style={{ gap: "6px" }}>
          <Camera size={14} />
          <span>Analysis</span>
        </button>

        {/* THEME TOGGLE */}
        <button
          onClick={() => setThemePreference(themePreference === "dark" ? "light" : "dark")}
          className="btn btn-ghost"
          style={{ padding: "6px" }}
          title="Toggle Dark / Light Theme"
        >
          {themePreference === "dark" ? <Sun size={18} color="var(--warning)" /> : <Moon size={18} />}
        </button>

      </div>
    </header>
  );
};
