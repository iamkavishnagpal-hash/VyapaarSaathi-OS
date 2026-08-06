import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { 
  Smartphone, 
  Monitor, 
  Palette, 
  Save, 
  ShoppingBag
} from "lucide-react";

export const StoreBuilderView = () => {
  const { storefront, setStorefront, products, currentStore, t } = useRetail();

  const [bannerTitle, setBannerTitle] = useState(storefront.bannerTitle);
  const [bannerSubtitle, setBannerSubtitle] = useState(storefront.bannerSubtitle);
  const [announcementBar, setAnnouncementBar] = useState(storefront.announcementBar);
  const [primaryColor, setPrimaryColor] = useState(storefront.primaryColor);
  const [previewDevice, setPreviewDevice] = useState("mobile"); // "desktop" or "mobile"

  const handleSaveStorefront = () => {
    setStorefront((prev) => ({
      ...prev,
      bannerTitle,
      bannerSubtitle,
      announcementBar,
      primaryColor
    }));
    alert("Storefront theme & layout updated successfully!");
  };

  return (
    <div className="view-container">
      {/* View Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#fff", margin: "0 0 4px 0" }}>
            {t("storeBuilder")}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>
            No-code storefront designer for mobile & web shoppers
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setPreviewDevice("desktop")}
            className={`btn ${previewDevice === "desktop" ? "btn-primary" : "btn-secondary"}`}
            style={{ fontSize: "0.8rem" }}
          >
            <Monitor size={16} /> Desktop View
          </button>
          <button
            onClick={() => setPreviewDevice("mobile")}
            className={`btn ${previewDevice === "mobile" ? "btn-primary" : "btn-secondary"}`}
            style={{ fontSize: "0.8rem" }}
          >
            <Smartphone size={16} /> Mobile View
          </button>
          <button onClick={handleSaveStorefront} className="btn btn-success" style={{ fontSize: "0.8rem" }}>
            <Save size={16} /> Publish Changes
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
        
        {/* Left Form Editor */}
        <div className="glass-panel" style={{ width: "380px", padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#fff", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <Palette size={18} color="var(--primary)" /> Store Customizer
          </h3>

          <div>
            <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>
              Announcement Banner Bar
            </label>
            <input
              type="text"
              className="input-field"
              value={announcementBar}
              onChange={(e) => setAnnouncementBar(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>
              Hero Banner Title
            </label>
            <input
              type="text"
              className="input-field"
              value={bannerTitle}
              onChange={(e) => setBannerTitle(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>
              Hero Subtitle / Promo Code
            </label>
            <input
              type="text"
              className="input-field"
              value={bannerSubtitle}
              onChange={(e) => setBannerSubtitle(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>
              Brand Theme Color Accent
            </label>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                style={{ width: "40px", height: "40px", borderRadius: "8px", border: "none", cursor: "pointer", background: "none" }}
              />
              <span style={{ fontSize: "0.85rem", color: "#fff", fontWeight: "700" }}>{primaryColor}</span>
            </div>
          </div>

          <div style={{ padding: "12px", background: "rgba(99, 102, 241, 0.1)", borderRadius: "8px", border: "1px solid rgba(99, 102, 241, 0.2)", fontSize: "0.78rem" }}>
            <div style={{ fontWeight: "700", color: "#a5b4fc", marginBottom: "2px" }}>Auto-Sync Enabled</div>
            <div style={{ color: "var(--text-muted)" }}>
              Products added in Inventory appear live on your web storefront with zero coding needed.
            </div>
          </div>
        </div>

        {/* Right Live Device Preview */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: previewDevice === "mobile" ? "375px" : "100%",
              height: previewDevice === "mobile" ? "680px" : "680px",
              borderRadius: previewDevice === "mobile" ? "36px" : "12px",
              border: previewDevice === "mobile" ? "12px solid #1f293d" : "1px solid var(--border-color)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
              background: "#090d16",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              transition: "all 0.3s ease"
            }}
          >
            {/* Mobile Notch simulation */}
            {previewDevice === "mobile" && (
              <div style={{ width: "120px", height: "18px", background: "#1f293d", margin: "0 auto 8px auto", borderRadius: "0 0 10px 10px" }} />
            )}

            {/* Announcement bar */}
            <div style={{ background: primaryColor, color: "#fff", fontSize: "0.7rem", fontWeight: "700", textAlign: "center", padding: "6px 8px" }}>
              {announcementBar}
            </div>

            {/* Storefront Header */}
            <div style={{ padding: "12px 16px", background: "#111827", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1f2937" }}>
              <div>
                <div style={{ fontSize: "0.95rem", fontWeight: "800", color: "#fff" }}>{currentStore.name}</div>
                <div style={{ fontSize: "0.68rem", color: "#9ca3af" }}>Official Digital Store</div>
              </div>
              <ShoppingBag size={18} color="#fff" />
            </div>

            {/* Hero Section */}
            <div style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, #1e1b4b 100%)`, padding: "20px 16px", color: "#fff" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: "800", marginBottom: "4px" }}>{bannerTitle}</div>
              <div style={{ fontSize: "0.78rem", opacity: 0.9 }}>{bannerSubtitle}</div>
            </div>

            {/* Product Feed Preview */}
            <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: "700", color: "#fff", marginBottom: "10px" }}>Featured Catalog</div>
              
              <div style={{ display: "grid", gridTemplateColumns: previewDevice === "mobile" ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: "10px" }}>
                {products.map((p) => (
                  <div key={p.id} style={{ background: "#111827", borderRadius: "8px", padding: "8px", border: "1px solid #1f2937" }}>
                    {p.image && (
                      <img src={p.image} alt={p.title} style={{ width: "100%", height: "80px", objectFit: "cover", borderRadius: "6px", marginBottom: "6px" }} />
                    )}
                    <div style={{ fontSize: "0.75rem", fontWeight: "700", color: "#fff", lineHeight: "1.2" }}>{p.title}</div>
                    <div style={{ fontSize: "0.8rem", fontWeight: "800", color: primaryColor, marginTop: "4px" }}>₹{p.sellingPrice}</div>
                    <button style={{ width: "100%", marginTop: "6px", background: primaryColor, color: "#fff", border: "none", padding: "4px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "700" }}>
                      Buy Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
