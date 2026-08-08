import React from "react";
import { useRetail } from "../context/RetailContext";
import { Share2, CreditCard, Sliders, CheckCircle2, ShieldCheck } from "lucide-react";

export const SettingsViews = () => {
  const { activeView, themePreference, setThemePreference, accessibilityMode, setAccessibilityMode, addToast } = useRetail();

  if (activeView === "integrations") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <h1 className="h1-title">System Integrations & API Bridges</h1>
          <p className="body-text" style={{ fontSize: "13px" }}>Connect barcode thermal printers, SQLite local offline bridge, and legacy ERP</p>
        </div>

        <div className="grid-12">
          {[
            { name: "POS Thermal Printer Driver", desc: "Local thermal receipt printing via 80mm USB driver", status: "Connected" },
            { name: "Offline SQLite Database Bridge", desc: "Local offline cache for zero-latency transactions", status: "Connected" },
            { name: "Legacy ERP Ingestion Endpoint", desc: "Sourcehost ERP sync over HTTPS/REST", status: "Connected" },
            { name: "Cloud Vision AI Pipeline", desc: "Computer vision label extraction API", status: "Connected" }
          ].map((item, idx) => (
            <div key={idx} className="col-6 card-panel" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-main)" }}>{item.name}</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>{item.desc}</div>
              </div>
              <span className="status-badge badge-success">{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeView === "billing") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <h1 className="h1-title">SaaS Plan & Billing</h1>
          <p className="body-text" style={{ fontSize: "13px" }}>Business OS Enterprise Tier subscription and usage metrics</p>
        </div>

        <div className="card-panel-elevated" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span className="status-badge badge-primary">Enterprise Business OS</span>
            <div style={{ fontSize: "20px", fontWeight: "800", color: "var(--text-main)", marginTop: "6px" }}>
              Unlimited Stores & AI Recognition Engine
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>Renews on Sept 1, 2026 • 24/7 Priority SLA</div>
          </div>
          <button onClick={() => addToast("Subscription active", "info")} className="btn btn-secondary">
            Manage Subscription
          </button>
        </div>
      </div>
    );
  }

  // PREFERENCES VIEW
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h1 className="h1-title">System Preferences & Visual Language</h1>
        <p className="body-text" style={{ fontSize: "13px" }}>Theme selection, accessibility density, and system defaults</p>
      </div>

      <div className="card-panel" style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "600px" }}>
        <div>
          <label style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
            Visual Color Theme
          </label>
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { id: "dark", label: "Dark Mode (#080B10)" },
              { id: "light", label: "Light Mode (#F7F8FA)" },
              { id: "system", label: "System Default" }
            ].map((thm) => (
              <button
                key={thm.id}
                onClick={() => setThemePreference(thm.id)}
                className={`btn ${themePreference === thm.id ? "btn-primary" : "btn-secondary"}`}
              >
                {thm.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "12px" }}>
          <label style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)", display: "block", marginBottom: "6px" }}>
            Accessibility Density Mode
          </label>
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { id: "standard", label: "Standard Density" },
              { id: "comfort", label: "Comfort Layout" },
              { id: "high-contrast", label: "High Contrast" }
            ].map((acc) => (
              <button
                key={acc.id}
                onClick={() => setAccessibilityMode(acc.id)}
                className={`btn ${accessibilityMode === acc.id ? "btn-primary" : "btn-secondary"}`}
              >
                {acc.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
