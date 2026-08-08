import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRetail } from "../context/RetailContext";
import { 
  Layers, 
  Globe, 
  MessageSquare, 
  ShoppingBag, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Upload, 
  Copy, 
  Search,
  Image as ImageIcon
} from "lucide-react";

export const ProductListingsView = () => {
  const { products, addToast } = useRetail();
  const navigate = useNavigate();

  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || "prod-101");
  const [activeChannelTab, setActiveChannelTab] = useState("shopify"); // 'shopify' | 'whatsapp' | 'website' | 'marketplace' | 'instagram'
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [qualityScore, setQualityScore] = useState(91);

  const activeProduct = products.find((p) => p.id === selectedProductId) || products[0];

  const [listingCopies, setListingCopies] = useState({
    shopify: {
      title: `${activeProduct?.title || "Product"} — Official Store Edition`,
      description: `Experience supreme quality with ${activeProduct?.title}. Engineered for everyday performance and unmatched durability. Guaranteed authentic with express delivery.`,
      tags: "footwear, premium, official-store, best-seller",
      seoTitle: `${activeProduct?.title} | Buy Online at Best Price`,
      seoMeta: `Shop ${activeProduct?.title} online. Fast shipping, easy returns, and 100% authentic products.`
    },
    whatsapp: {
      message: `🔥 *${activeProduct?.title}*\n\nPrice: $${activeProduct?.sellingPrice}\nStock: Available (${activeProduct?.stockQty} left)\n\nReply *BUY* or click link below to order instantly:\nhttps://pay.vyapaarsaathi.com/wa-${activeProduct?.id}`
    },
    marketplace: {
      bullet1: "Authentic premium build quality",
      bullet2: "Factory tested with official manufacturer warranty",
      bullet3: "Fast dispatch within 24 hours"
    },
    instagram: {
      caption: `Level up your lifestyle with ${activeProduct?.title}! ✨ Tap link in bio to shop now. 🛍️ #RetailOS #Exclusive #${activeProduct?.category?.replace(/\s+/g, '')}`
    }
  });

  const handleImproveWithAi = () => {
    setIsAiGenerating(true);
    setTimeout(() => {
      setIsAiGenerating(false);
      setQualityScore(98);
      setListingCopies((prev) => ({
        ...prev,
        shopify: {
          ...prev.shopify,
          description: `🔥 PREMIUM CHOICE: ${activeProduct?.title}. Meticulously crafted for maximum comfort and style. Includes 1-year warranty and free nationwide express shipping!`
        }
      }));
      addToast("AI regenerated listing content with 98% quality score!", "success");
    }, 1000);
  };

  const handlePublishListing = (channelName) => {
    addToast(`Published "${activeProduct?.title}" to ${channelName} successfully!`, "success");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="h1-title">Master Product Listings & AI Generator</h1>
          <p className="body-text" style={{ fontSize: "13px" }}>
            Separate master catalog identity from channel-specific titles, SEO metadata, and AI descriptions
          </p>
        </div>

        <button type="button" onClick={() => addToast("Bulk published 12 products across Shopify & WhatsApp", "success")} className="btn btn-primary" style={{ gap: "6px" }}>
          <Upload size={16} /> Bulk Publish (12 Selected)
        </button>
      </div>

      <div className="grid-12">
        
        {/* LEFT: MASTER PRODUCT SELECTOR */}
        <div className="col-4 card-panel" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-main)" }}>Master Catalogue SKUs</div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "560px", overflowY: "auto" }}>
            {products.map((p) => {
              const isSelected = p.id === selectedProductId;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProductId(p.id)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "var(--radius-xs)",
                    backgroundColor: isSelected ? "var(--primary-subtle)" : "var(--bg-elevated)",
                    border: isSelected ? "1px solid var(--primary)" : "1px solid var(--border-color)",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>{p.title}</div>
                    <div style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{p.sku} • ${p.sellingPrice}</div>
                  </div>
                  <span className={`status-badge ${isSelected ? "badge-primary" : "badge-muted"}`}>
                    {isSelected ? "Active" : "Select"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: CHANNEL LISTING EDITOR & AI COPYWRITER */}
        <div className="col-8 card-panel" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          
          {/* PRODUCT & QUALITY SCORE BAR */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
            <div>
              <div style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-main)" }}>{activeProduct?.title}</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Master SKU: {activeProduct?.sku} • Stock: {activeProduct?.stockQty} units</div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Listing Quality</div>
                <div style={{ fontSize: "16px", fontWeight: "800", color: qualityScore >= 90 ? "var(--success)" : "var(--warning)" }}>
                  {qualityScore}% Quality
                </div>
              </div>

              <button type="button" onClick={handleImproveWithAi} disabled={isAiGenerating} className="btn btn-ai btn-sm" style={{ gap: "4px" }}>
                <Sparkles size={14} />
                <span>{isAiGenerating ? "Generating..." : "Improve with AI"}</span>
              </button>
            </div>
          </div>

          {/* CHANNEL TABS */}
          <div style={{ display: "flex", gap: "6px", overflowX: "auto" }}>
            {[
              { id: "shopify", label: "Shopify Store", icon: ShoppingBag },
              { id: "whatsapp", label: "WhatsApp Catalog", icon: MessageSquare },
              { id: "website", label: "Online Storefront", icon: Globe },
              { id: "marketplace", label: "Marketplace Copy", icon: Layers },
              { id: "instagram", label: "Social Instagram", icon: Sparkles }
            ].map((ch) => {
              const Icon = ch.icon;
              const isAct = activeChannelTab === ch.id;
              return (
                <button
                  type="button"
                  key={ch.id}
                  onClick={() => setActiveChannelTab(ch.id)}
                  className={`btn btn-sm ${isAct ? "btn-primary" : "btn-secondary"}`}
                  style={{ gap: "6px", whiteSpace: "nowrap" }}
                >
                  <Icon size={14} />
                  <span>{ch.label}</span>
                </button>
              );
            })}
          </div>

          {/* CHANNEL CONTENT EDITOR */}
          {activeChannelTab === "shopify" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)" }}>Shopify Listing Title</label>
                <input
                  type="text"
                  className="input-field"
                  value={listingCopies.shopify.title}
                  onChange={(e) => setListingCopies({ ...listingCopies, shopify: { ...listingCopies.shopify, title: e.target.value } })}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)" }}>Shopify Product Description (AI Generated)</label>
                <textarea
                  className="input-field"
                  rows={4}
                  value={listingCopies.shopify.description}
                  onChange={(e) => setListingCopies({ ...listingCopies, shopify: { ...listingCopies.shopify, description: e.target.value } })}
                />
              </div>

              <div className="grid-12">
                <div className="col-6">
                  <label style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)" }}>SEO Title</label>
                  <input type="text" className="input-field" value={listingCopies.shopify.seoTitle} readOnly />
                </div>
                <div className="col-6">
                  <label style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)" }}>Product Tags</label>
                  <input type="text" className="input-field" value={listingCopies.shopify.tags} readOnly />
                </div>
              </div>

              <button type="button" onClick={() => handlePublishListing("Shopify Store")} className="btn btn-primary" style={{ gap: "6px", marginTop: "8px" }}>
                <Globe size={16} /> Publish to Shopify Channel
              </button>
            </div>
          )}

          {activeChannelTab === "whatsapp" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <label style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)" }}>WhatsApp Product Broadcast Message</label>
              <textarea
                className="input-field"
                rows={6}
                value={listingCopies.whatsapp.message}
                onChange={(e) => setListingCopies({ ...listingCopies, whatsapp: { message: e.target.value } })}
              />
              <button type="button" onClick={() => handlePublishListing("WhatsApp Commerce")} className="btn btn-primary" style={{ gap: "6px" }}>
                <MessageSquare size={16} /> Broadcast to WhatsApp Catalog
              </button>
            </div>
          )}

          {activeChannelTab === "marketplace" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)" }}>Marketplace Key Bullet Points</label>
              <input type="text" className="input-field" value={listingCopies.marketplace.bullet1} />
              <input type="text" className="input-field" value={listingCopies.marketplace.bullet2} />
              <input type="text" className="input-field" value={listingCopies.marketplace.bullet3} />
              <button type="button" onClick={() => handlePublishListing("Amazon / Flipkart Marketplace")} className="btn btn-primary" style={{ gap: "6px", marginTop: "8px" }}>
                <Layers size={16} /> Push to Marketplace Channels
              </button>
            </div>
          )}

          {activeChannelTab === "instagram" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <label style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)" }}>Social Media Caption & Hashtags</label>
              <textarea className="input-field" rows={5} value={listingCopies.instagram.caption} />
              <button type="button" onClick={() => handlePublishListing("Instagram Social Store")} className="btn btn-primary" style={{ gap: "6px" }}>
                <Sparkles size={16} /> Share to Social Channels
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
