import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRetail } from "../context/RetailContext";
import { 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Camera, 
  MessageSquare, 
  Store, 
  Layers, 
  Truck, 
  ShieldCheck,
  RefreshCw
} from "lucide-react";

export const GoOnlineView = () => {
  const { products, addToast } = useRetail();
  const navigate = useNavigate();

  const [channels, setChannels] = useState({
    whatsapp: true,
    onlineStore: true,
    instagram: false,
    marketplace: false
  });

  const readinessScore = 82;

  const steps = [
    { title: "Tell us about your shop", status: "completed", detail: "VyapaarSaathi Flagship Store (Delhi)" },
    { title: "Capture your shelf products", status: "completed", detail: "AI Camera shelf scanning initialized" },
    { title: "Build digital catalogue", status: "completed", detail: `${products.length} Products registered with barcodes` },
    { title: "Connect customer contacts", status: "completed", detail: "240 Customer profiles imported" },
    { title: "Choose selling channels", status: "active", detail: "WhatsApp Commerce + Brand Storefront active" },
    { title: "Turn on inventory sync", status: "completed", detail: "Omni-channel reservation brain active" },
    { title: "Turn on fulfillment autopilot", status: "completed", detail: "Packing scan verification ready" },
    { title: "You're Online!", status: "completed", detail: "Live store URL: https://store.vyapaarsaathi.com/demo" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* HEADER & READINESS METER */}
      <div className="card-panel" style={{ borderLeft: "5px solid var(--primary)", background: "linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 100%)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Globe size={22} color="var(--primary)" />
              <h1 className="h1-title">Offline → Online Migration Launcher</h1>
            </div>
            <p className="body-text" style={{ fontSize: "13px", marginTop: "4px" }}>
              Transform your physical shop into a multi-channel digital business with automated inventory sync
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Online Readiness Score</div>
              <div style={{ fontSize: "24px", fontWeight: "800", color: "var(--success)" }}>{readinessScore}% Ready</div>
            </div>

            <div style={{ width: "54px", height: "54px", borderRadius: "50%", border: "4px solid var(--success)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "800", color: "var(--text-main)" }}>
              {readinessScore}%
            </div>
          </div>
        </div>
      </div>

      {/* READINESS CATEGORY BREAKDOWN */}
      <div className="grid-12">
        {[
          { label: "Catalogue", score: 92, status: "Ready" },
          { label: "Inventory Sync", score: 88, status: "Ready" },
          { label: "Payments", score: 100, status: "Active" },
          { label: "Fulfillment", score: 72, status: "Needs Review" },
          { label: "Customer Reach", score: 64, status: "Building" }
        ].map((item, idx) => (
          <div key={idx} className="col-2 card-panel" style={{ textAlign: "center", padding: "12px" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)" }}>{item.label}</span>
            <div style={{ fontSize: "18px", fontWeight: "800", color: item.score >= 80 ? "var(--success)" : "var(--warning)", marginTop: "4px" }}>
              {item.score}%
            </div>
            <span className={`status-badge ${item.score >= 80 ? "badge-success" : "badge-warning"}`} style={{ fontSize: "9px", marginTop: "4px" }}>
              {item.status}
            </span>
          </div>
        ))}
      </div>

      {/* 8-STEP MIGRATION CHECKLIST */}
      <div className="card-panel">
        <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)", marginBottom: "16px" }}>
          Offline-to-Online 8-Step Launch Execution
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {steps.map((st, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border-color)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "var(--primary-subtle)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "12px" }}>
                  {idx + 1}
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-main)" }}>{st.title}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{st.detail}</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span className="status-badge badge-success">✓ Verified</span>
                {idx === 2 && (
                  <button onClick={() => navigate("/products")} className="btn btn-secondary btn-sm" style={{ gap: "4px" }}>
                    <span>Catalog</span>
                    <ArrowRight size={12} />
                  </button>
                )}
                {idx === 4 && (
                  <button onClick={() => navigate("/whatsapp-commerce")} className="btn btn-primary btn-sm" style={{ gap: "4px" }}>
                    <span>WhatsApp AI</span>
                    <ArrowRight size={12} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SELLING CHANNELS SELECTION */}
      <div className="card-panel">
        <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)", marginBottom: "12px" }}>
          Active Omni-Channel Selling Nodes
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
          {[
            { id: "whatsapp", title: "WhatsApp Commerce", desc: "AI Chat Order Bot & WhatsApp Cart" },
            { id: "onlineStore", title: "Brand Online Store", desc: "Dedicated storefront catalog URL" },
            { id: "instagram", title: "Instagram / Social", desc: "Social commerce post links" },
            { id: "marketplace", title: "Marketplaces", desc: "Amazon / Flipkart inventory sync" }
          ].map((ch) => (
            <div
              key={ch.id}
              onClick={() => {
                setChannels({ ...channels, [ch.id]: !channels[ch.id] });
                addToast(`Toggled ${ch.title}`, "info");
              }}
              style={{
                padding: "14px",
                borderRadius: "var(--radius-sm)",
                backgroundColor: channels[ch.id] ? "var(--primary-subtle)" : "var(--bg-elevated)",
                border: channels[ch.id] ? "1px solid var(--primary)" : "1px solid var(--border-color)",
                cursor: "pointer"
              }}
            >
              <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>{ch.title}</div>
              <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "4px" }}>{ch.desc}</div>
              <span className={`status-badge ${channels[ch.id] ? "badge-success" : "badge-muted"}`} style={{ marginTop: "8px" }}>
                {channels[ch.id] ? "● Connected" : "○ Disconnected"}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
