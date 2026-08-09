import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { GlobalNodeNetworkCanvas } from "../components/GlobalNodeNetworkCanvas";
import { OmniChannelWaterfall } from "../components/OmniChannelWaterfall";
import { ChannelLogo } from "../components/ChannelLogos";
import { SkeletonLoader } from "../components/SkeletonLoader";
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
  ArrowRight,
  Plus
} from "lucide-react";

export const ChannelCenterView = () => {
  const { products, addToast } = useRetail();

  const [isLoading, setIsLoading] = useState(false);

  const [channels, setChannels] = useState([
    { id: "store", name: "Kapda & Shoe POS", type: "Offline Retail Store", status: "Connected", syncHealth: 100, lastSync: "Live (0s ago)", errors: 0 },
    { id: "whatsapp", name: "WhatsApp AI Commerce", type: "AI Chat Order Bot", status: "Connected", syncHealth: 98, lastSync: "1 min ago", errors: 0 },
    { id: "website", name: "Kapda Mafia Web Store", type: "Brand Storefront", status: "Connected", syncHealth: 100, lastSync: "Live (0s ago)", errors: 0 },
    { id: "shopify", name: "Shopify Store", type: "Ecommerce Platform", status: "Connected", syncHealth: 94, lastSync: "2 mins ago", errors: 2 },
    { id: "amazon", name: "Amazon Marketplace", type: "Global Marketplace", status: "Connected", syncHealth: 96, lastSync: "3 mins ago", errors: 1 },
    { id: "flipkart", name: "Flipkart Marketplace", type: "Domestic Marketplace", status: "Connected", syncHealth: 95, lastSync: "4 mins ago", errors: 0 },
    { id: "meesho", name: "Meesho Reseller Hub", type: "Social Commerce", status: "Connected", syncHealth: 90, lastSync: "6 mins ago", errors: 0 },
    { id: "etsy", name: "Etsy Global Shop", type: "Handmade & Vintage", status: "Connected", syncHealth: 92, lastSync: "10 mins ago", errors: 0 },
    { id: "ebay", name: "eBay Store", type: "Global Auction", status: "Connected", syncHealth: 89, lastSync: "12 mins ago", errors: 0 },
    { id: "walmart", name: "Walmart Marketplace", type: "US Retail Network", status: "Connected", syncHealth: 91, lastSync: "15 mins ago", errors: 0 },
    { id: "woocommerce", name: "WooCommerce Site", type: "WordPress Store", status: "Connected", syncHealth: 88, lastSync: "18 mins ago", errors: 0 },
    { id: "instagram", name: "Instagram / Facebook Shop", type: "Social Storefront", status: "Connected", syncHealth: 93, lastSync: "5 mins ago", errors: 0 }
  ]);

  const [syncErrors, setSyncErrors] = useState([
    { id: "err-1", channel: "Shopify Store", productTitle: "Kapda Mafia Oversized Graphic Hoodie", reason: "Missing category mapping in Shopify", action: "Fix Category & Sync" },
    { id: "err-2", channel: "Amazon Marketplace", productTitle: "Shoe Mafia Retro Chunky Sneakers", reason: "ASIN barcode mapping pending confirmation", action: "Confirm ASIN" }
  ]);

  const [conflict, setConflict] = useState({
    productTitle: "Shoe Mafia Obsidian High-Top Kicks",
    storeStock: 12,
    shopifyStock: 15,
    recommendation: "Set All Channels = 12 (Master Inventory Truth)"
  });

  const handleSyncAll = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      addToast("Triggered omni-channel inventory synchronization across all 12 nodes!", "success");
    }, 600);
  };

  const handleFixError = (errId) => {
    setSyncErrors(syncErrors.filter((e) => e.id !== errId));
    addToast("Resolved channel sync error!", "success");
  };

  const handleResolveConflict = () => {
    setConflict(null);
    addToast("Stock conflict resolved! Master stock (12 units) synchronized across all channels.", "success");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="h1-title">Omni-Channel Sync & Centralized Inventory</h1>
          <p className="body-text" style={{ fontSize: "13px" }}>
            Synchronize 12 sales channels — POS, Shopify, Amazon, Flipkart, & WhatsApp — into one unified inventory truth
          </p>
        </div>

        <button type="button" onClick={handleSyncAll} disabled={isLoading} className="btn btn-secondary" style={{ gap: "6px" }}>
          <RefreshCw size={16} /> {isLoading ? "Synchronizing..." : "Sync All 12 Channels Now"}
        </button>
      </div>

      {/* PRIORITY LEVEL 1: SYNC CONFLICTS & ERRORS FIRST */}
      {conflict && (
        <div className="card-panel" style={{ borderLeft: "5px solid var(--warning)", backgroundColor: "var(--bg-elevated)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <AlertTriangle size={18} color="var(--warning)" />
                <span style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-main)" }}>
                  Sync Conflict: {conflict.productTitle}
                </span>
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>
                Store Stock: <b>{conflict.storeStock} units</b> vs Shopify Stock: <b>{conflict.shopifyStock} units</b>.
              </div>
            </div>

            <button type="button" onClick={handleResolveConflict} className="btn btn-primary btn-sm" style={{ gap: "4px" }}>
              <span>{conflict.recommendation}</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      )}

      {/* SYNC ERROR RESOLUTION CENTER */}
      <div className="card-panel">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
          <div>
            <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)" }}>Sync Action & Resolution Center</div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Operational items requiring verification prior to channel publishing</div>
          </div>
          <span className="status-badge badge-warning">{syncErrors.length} Errors</span>
        </div>

        {syncErrors.length === 0 ? (
          <div style={{ textAlign: "center", padding: "16px", color: "var(--success)", fontWeight: "700" }}>
            ✓ All channels synchronized cleanly with zero errors.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
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

      {/* PRIORITY LEVEL 2: STEP-BY-STEP WATERFALL INVENTORY TRUTH */}
      <OmniChannelWaterfall />

      {/* PRIORITY LEVEL 3: SLEEK MONOCHROMATIC NETWORK CANVAS */}
      <GlobalNodeNetworkCanvas />

      {/* PRIORITY LEVEL 4: 12-CHANNEL STATUS GRID */}
      {isLoading ? (
        <SkeletonLoader type="card" count={6} />
      ) : (
        <div className="grid-12">
          {channels.map((ch) => (
            <div key={ch.id} className="col-3 card-panel" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <ChannelLogo channelId={ch.id} size={20} />
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "800", color: "var(--text-main)", lineHeight: "1.2" }}>{ch.name}</div>
                    <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>{ch.type}</div>
                  </div>
                </div>
                <span className="status-badge badge-success" style={{ fontSize: "9px" }}>
                  ● Connected
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
                <span>Sync Health</span>
                <span style={{ fontWeight: "800", fontSize: "13px", color: "var(--primary)" }}>
                  {ch.syncHealth}%
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px", borderTop: "1px solid var(--border-color)", paddingTop: "6px" }}>
                <span style={{ fontSize: "9px", color: "var(--text-muted)" }}>Sync: {ch.lastSync}</span>
                <button
                  type="button"
                  onClick={() => addToast(`Opened settings for ${ch.name}`, "info")}
                  className="btn btn-ghost btn-sm"
                  style={{ fontSize: "10px", padding: "2px 6px" }}
                >
                  Configure
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
