import React from "react";
import { Store, MessageSquare, Globe, ShoppingBag, Layers, ShieldCheck } from "lucide-react";

export const ChannelLogo = ({ channelId, size = 20 }) => {
  switch (channelId) {
    case "shopify":
      return (
        <div style={{ width: `${size + 8}px`, height: `${size + 8}px`, borderRadius: "var(--radius-xs)", backgroundColor: "#95BF47", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontWeight: "800", fontSize: "11px" }}>
          S
        </div>
      );
    case "amazon":
      return (
        <div style={{ width: `${size + 8}px`, height: `${size + 8}px`, borderRadius: "var(--radius-xs)", backgroundColor: "#FF9900", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: "900", fontSize: "11px" }}>
          a
        </div>
      );
    case "flipkart":
      return (
        <div style={{ width: `${size + 8}px`, height: `${size + 8}px`, borderRadius: "var(--radius-xs)", backgroundColor: "#2874F0", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontWeight: "900", fontSize: "11px" }}>
          fk
        </div>
      );
    case "meesho":
      return (
        <div style={{ width: `${size + 8}px`, height: `${size + 8}px`, borderRadius: "var(--radius-xs)", backgroundColor: "#F43F5E", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontWeight: "800", fontSize: "11px" }}>
          m
        </div>
      );
    case "etsy":
      return (
        <div style={{ width: `${size + 8}px`, height: `${size + 8}px`, borderRadius: "var(--radius-xs)", backgroundColor: "#F1641E", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontWeight: "800", fontSize: "11px" }}>
          E
        </div>
      );
    case "ebay":
      return (
        <div style={{ width: `${size + 8}px`, height: `${size + 8}px`, borderRadius: "var(--radius-xs)", backgroundColor: "#E53238", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontWeight: "900", fontSize: "10px" }}>
          eb
        </div>
      );
    case "walmart":
      return (
        <div style={{ width: `${size + 8}px`, height: `${size + 8}px`, borderRadius: "var(--radius-xs)", backgroundColor: "#0071DC", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFC220", fontWeight: "900", fontSize: "12px" }}>
          ★
        </div>
      );
    case "woocommerce":
      return (
        <div style={{ width: `${size + 8}px`, height: `${size + 8}px`, borderRadius: "var(--radius-xs)", backgroundColor: "#7F54B3", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontWeight: "800", fontSize: "11px" }}>
          Woo
        </div>
      );
    case "whatsapp":
      return (
        <div style={{ width: `${size + 8}px`, height: `${size + 8}px`, borderRadius: "var(--radius-xs)", backgroundColor: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF" }}>
          <MessageSquare size={size - 4} />
        </div>
      );
    case "instagram":
      return (
        <div style={{ width: `${size + 8}px`, height: `${size + 8}px`, borderRadius: "var(--radius-xs)", background: "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontWeight: "800", fontSize: "11px" }}>
          IG
        </div>
      );
    case "website":
      return (
        <div style={{ width: `${size + 8}px`, height: `${size + 8}px`, borderRadius: "var(--radius-xs)", backgroundColor: "#3B82F6", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF" }}>
          <Globe size={size - 4} />
        </div>
      );
    default:
      return (
        <div style={{ width: `${size + 8}px`, height: `${size + 8}px`, borderRadius: "var(--radius-xs)", backgroundColor: "#10B981", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF" }}>
          <Store size={size - 4} />
        </div>
      );
  }
};
