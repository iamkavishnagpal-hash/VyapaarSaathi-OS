import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRetail } from "../context/RetailContext";
import { 
  X, 
  ShieldCheck, 
  Package, 
  Barcode, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  ArrowLeft, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  Building2, 
  DollarSign, 
  Activity 
} from "lucide-react";

export const ProductPassportHeroCard = ({ product }) => {
  const { openProductIdentity } = useRetail();
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'inventory' | 'sales' | 'supplier' | 'activity'

  if (!product) return null;

  return (
    <div className="passport-hero-card">
      {/* HERO HEADER */}
      <div className="passport-hero-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "20px", fontWeight: "800", color: "var(--text-main)", letterSpacing: "-0.01em" }}>
                {product.title}
              </span>
              <span className="status-badge badge-success">● Active Product</span>
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>
              {product.brand} • {product.category} • {product.subCategory || "General"}
            </div>
          </div>

          <button onClick={() => openProductIdentity(product)} className="btn btn-secondary btn-sm" style={{ gap: "6px" }}>
            <Barcode size={14} /> Identity Barcode
          </button>
        </div>

        {/* PRODUCT VISUAL IMAGE SHOWCASE CONTAINER */}
        <div className="passport-image-display">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <Package size={48} color="var(--primary)" />
            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "600" }}>
              {product.brand} Industrial Verification Photo
            </span>
          </div>
          <span style={{ position: "absolute", bottom: "10px", right: "12px", fontSize: "10px", color: "var(--text-muted)" }} className="mono-text">
            ID: {product.id}
          </span>
        </div>

        {/* STRUCTURED IDENTITY SPECS GRID */}
        <div className="passport-identity-specs-grid">
          <div>
            <div style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>SKU</div>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)", fontFamily: "var(--font-mono)" }}>{product.sku}</div>
          </div>

          <div>
            <div style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Barcode Code 128</div>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)", fontFamily: "var(--font-mono)" }}>{product.barcode}</div>
          </div>

          <div>
            <div style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Live Stock</div>
            <div style={{ fontSize: "14px", fontWeight: "800", color: product.stockQty <= product.lowStockThreshold ? "var(--warning)" : "var(--success)" }}>
              {product.stockQty} units
            </div>
          </div>

          <div>
            <div style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Selling Price</div>
            <div style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-main)" }}>${product.sellingPrice.toFixed(2)}</div>
          </div>
        </div>

        {/* HEALTH SCORE METER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", backgroundColor: "var(--bg-surface)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
          <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-main)" }}>Product Identity Health Score</span>
          <span className="status-badge badge-success" style={{ fontSize: "12px" }}>{product.productHealthScore || 92}/100</span>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="passport-tab-nav">
        {["overview", "inventory", "sales", "supplier", "activity"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`passport-tab-btn ${activeTab === tab ? "active" : ""}`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* TAB CONTENT & VERTICAL LIFECYCLE TIMELINE */}
      <div style={{ padding: "20px" }}>
        {activeTab === "overview" && (
          <div className="passport-timeline-container">
            <div className="passport-timeline-line" />

            {[
              { type: "Received", title: "Received from Supplier", date: "2026-08-01 09:30", note: "Shipment PO-981 verified" },
              { type: "Verified", title: "AI Computer Vision Label Verified", date: "2026-08-01 10:15", note: "96% AI confidence score" },
              { type: "Barcode Generated", title: "Code 128 & QR Identity Created", date: "2026-08-01 10:30", note: "Printed thermal label" },
              { type: "Stocked", title: "Assigned to Shelf Zone E-4", date: "2026-08-01 11:00", note: "Catalog initialized with 50 units" },
              { type: "Transferred", title: "Inter-Store Stock Movement", date: "2026-08-05 14:00", note: "Transferred 10 units to Metro Store" },
              { type: "Sold", title: "POS Billing Checkout Transaction", date: "2026-08-08 11:10", note: "Sold 8 units on Register #1" }
            ].map((evt, idx) => (
              <div key={idx} className="passport-timeline-item">
                <div className="passport-timeline-icon-box">
                  <CheckCircle2 size={16} color="var(--primary)" />
                </div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>{evt.title}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "2px" }}>{evt.note}</div>
                  <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "2px" }}>{evt.date}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "inventory" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>Stock Breakdown</div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Current Location: Flagship Store (Zone E-4)</div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Reorder Threshold: {product.lowStockThreshold} units</div>
          </div>
        )}

        {activeTab === "sales" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>Sales Velocity</div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Average 4.2 units sold / week</div>
          </div>
        )}

        {activeTab === "supplier" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>Supplier Specs</div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Manufacturer: {product.manufacturer || "AeroTech Labs"}</div>
          </div>
        )}

        {activeTab === "activity" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>Full Audit Log</div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>All inventory changes tracked with timestamp & actor ID</div>
          </div>
        )}
      </div>

    </div>
  );
};

// FULL PAGE ROUTE /products/:productId
export const ProductPassportHeroRoute = () => {
  const { productId } = useParams();
  const { products } = useRetail();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === productId || p.sku.toLowerCase() === productId?.toLowerCase()) || products[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button onClick={() => navigate("/products")} className="btn btn-secondary btn-sm" style={{ gap: "6px" }}>
          <ArrowLeft size={14} /> Back to Products
        </button>
        <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Physical Product Identity Deep-Link</span>
      </div>

      <ProductPassportHeroCard product={product} />
    </div>
  );
};

// SIDE DRAWER COMPONENT
export const ProductPassportView = () => {
  const { isPassportOpen, setIsPassportOpen, passportProduct } = useRetail();

  if (!isPassportOpen || !passportProduct) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        maxWidth: "540px",
        backgroundColor: "var(--bg-surface)",
        borderLeft: "1px solid var(--border-color)",
        boxShadow: "var(--shadow-lg)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto"
      }}
    >
      <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>Physical Device Passport</span>
        <button onClick={() => setIsPassportOpen(false)} className="btn btn-ghost" style={{ padding: "4px" }}>
          <X size={18} />
        </button>
      </div>

      <ProductPassportHeroCard product={passportProduct} />
    </div>
  );
};
