import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { 
  Globe, 
  ShoppingBag, 
  MessageSquare, 
  Store, 
  Layers, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Sliders, 
  ArrowRight,
  Plus
} from "lucide-react";

export const ChannelCenterView = () => {
  const { products, addToast } = useRetail();

  const [channels, setChannels] = useState([
    { id: "store", name: "Physical Store POS", type: "Offline Store", status: "Connected", syncHealth: 100, lastSync: "Live (0s ago)", errors: 0 },
    { id: "whatsapp", name: "WhatsApp Commerce", type: "Chat Bot", status: "Connected", syncHealth: 98, lastSync: "1 min ago", errors: 0 },
    { id: "website", name: "Brand Storefront", type: "Web Store", status: "Connected", syncHealth: 100, lastSync: "Live (0s ago)", errors: 0 },
    { id: "shopify", name: "Shopify Store", type: "Ecommerce Platform", status: "Connected", syncHealth: 92, lastSync: "2 mins ago", errors: 4 },
    { id: "instagram", name: "Instagram Storefront", type: "Social Media", status: "Connected", syncHealth: 88, lastSync: "5 mins ago", errors: 1 },
    { id: "amazon", name: "Amazon Marketplace", type: "Marketplace", status: "Disconnected", syncHealth: 0, lastSync: "Never", errors: 0 }
  ]);

  const [syncErrors, setSyncErrors] = useState([
    { id: "err-1", channel: "Shopify Store", productTitle: "ErgoDesk Smart Frame", reason: "Missing category mapping in Shopify", action: "Fix Category & Sync" },
    { id: "err-2", channel: "Shopify Store", productTitle: "Quantum Sound Pro", reason: "Location inventory ID mismatch", action: "Re-map Location" },
    { id: "err-3", channel: "Instagram Storefront", productTitle: "Maggi 70g Instant Noodles", reason: "Image aspect ratio unsupported for Instagram Post", action: "Crop Image" }
  ]);

  const [conflict, setConflict] = useState({
    productTitle: "Sony WH-1000XM5 Headphones",
    storeStock: 7,
    shopifyStock: 10,
    recommendation: "Set All Channels = 7 (Master Inventory Truth)"
  });

  const handleFixError = (errId) => {
    setSyncErrors(syncErrors.filter((e) => e.id !== errId));
    addToast("Resolved channel sync error!", "success");
  };

  const handleResolveConflict = () => {
    setConflict(null);
    addToast("Stock conflict resolved! Master stock (7 units) synced across all channels.", "success");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="h1-title">Multi-Channel Center & Shopify Hub</h1>
          <p className="body-text" style={{ fontSize: "13px" }}>
            Connect physical stores, WhatsApp, Shopify, and online marketplaces with real-time stock sync
          </p>
        </div>

        <button type="button" onClick={() => addToast("Triggered global omni-channel inventory sync", "info")} className="btn btn-secondary" style={{ gap: "6px" }}>
          <RefreshCw size={16} /> Sync All Channels Now
        </button>
      </div>

      {/* CHANNELS GRID */}
      <div className="grid-12">
        {channels.map((ch) => (
          <div key={ch.id} className="col-4 card-panel" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-main)" }}>{ch.name}</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{ch.type}</div>
              </div>
              <span className={`status-badge ${ch.status === "Connected" ? "badge-success" : "badge-muted"}`}>
                {ch.status === "Connected" ? "● Connected" : "○ Disconnected"}
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", color: "var(--text-muted)" }}>
              <span>Sync Health</span>
              <span style={{ fontWeight: "700", color: ch.syncHealth >= 90 ? "var(--success)" : ch.syncHealth > 0 ? "var(--warning)" : "var(--text-muted)" }}>
                {ch.syncHealth}%
              </span>
            </div>

            {ch.errors > 0 && (
              <div style={{ fontSize: "11px", color: "var(--warning)", fontWeight: "700" }}>
                ⚠️ {ch.errors} Sync Errors Pending
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
              <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>Last sync: {ch.lastSync}</span>
              <button
                type="button"
                onClick={() => addToast(`Opened settings for ${ch.name}`, "info")}
                className="btn btn-ghost btn-sm"
              >
                Settings
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* STOCK CONFLICT RESOLUTION BOX */}
      {conflict && (
        <div className="card-panel" style={{ borderLeft: "5px solid var(--warning)", backgroundColor: "var(--bg-elevated)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <AlertTriangle size={18} color="var(--warning)" />
                <span style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-main)" }}>
                  Inventory Sync Conflict Detected: {conflict.productTitle}
                </span>
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>
                Master Store Stock: <b>{conflict.storeStock} units</b> vs Shopify Stock: <b>{conflict.shopifyStock} units</b>.
              </div>
            </div>

            <button type="button" onClick={handleResolveConflict} className="btn btn-primary btn-sm" style={{ gap: "4px" }}>
              <span>{conflict.recommendation}</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      )}

      {/* SYNC ERROR CENTER */}
      <div className="card-panel">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
          <div>
            <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)" }}>Sync Error Resolution Center</div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Items requiring manual verification or formatting fix before channel publishing</div>
          </div>
          <span className="status-badge badge-warning">{syncErrors.length} Errors</span>
        </div>

        {syncErrors.length === 0 ? (
          <div style={{ textAlign: "center", padding: "24px", color: "var(--success)", fontWeight: "700" }}>
            ✓ All channels synced cleanly with zero errors!
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {syncErrors.map((err) => (
              <div
                key={err.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: "var(--bg-elevated)",
                  border: "1px solid var(--border-color)"
                }}
              >
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>
                    {err.productTitle} — <span style={{ color: "var(--primary)" }}>{err.channel}</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--warning)" }}>Reason: {err.reason}</div>
                </div>

                <button
                  type="button"
                  onClick={() => handleFixError(err.id)}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: "4px" }}
                >
                  <span>{err.action}</span>
                  <CheckCircle2 size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
