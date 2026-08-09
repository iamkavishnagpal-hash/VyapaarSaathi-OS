import React from "react";
import { Store, MessageSquare, Globe, ShoppingBag, Layers, ShieldCheck } from "lucide-react";

export const ChannelLogo = ({ channelId, size = 20 }) => {
  // Desaturated Monochrome Enterprise Badges
  const badgeStyle = {
    width: `${size + 10}px`,
    height: `${size + 10}px`,
    borderRadius: "var(--radius-xs)",
    backgroundColor: "var(--bg-elevated)",
    border: "1px solid var(--border-color)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--text-main)",
    fontWeight: "800",
    fontSize: "11px"
  };

  switch (channelId) {
    case "shopify":
      return <div style={badgeStyle}>S</div>;
    case "amazon":
      return <div style={badgeStyle}>AMZ</div>;
    case "flipkart":
      return <div style={badgeStyle}>FK</div>;
    case "meesho":
      return <div style={badgeStyle}>MSH</div>;
    case "etsy":
      return <div style={badgeStyle}>ETSY</div>;
    case "ebay":
      return <div style={badgeStyle}>EBAY</div>;
    case "walmart":
      return <div style={badgeStyle}>WMT</div>;
    case "woocommerce":
      return <div style={badgeStyle}>WOO</div>;
    case "whatsapp":
      return (
        <div style={badgeStyle}>
          <MessageSquare size={size - 4} color="var(--primary)" />
        </div>
      );
    case "instagram":
      return <div style={badgeStyle}>IG</div>;
    case "website":
      return (
        <div style={badgeStyle}>
          <Globe size={size - 4} color="var(--primary)" />
        </div>
      );
    default:
      return (
        <div style={badgeStyle}>
          <Store size={size - 4} color="var(--primary)" />
        </div>
      );
  }
};
