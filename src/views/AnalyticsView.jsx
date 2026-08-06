import React from "react";
import { useRetail } from "../context/RetailContext";
import { 
  BarChart3, 
  ShoppingBag, 
  ArrowUpRight 
} from "lucide-react";

export const AnalyticsView = () => {
  const { orders, products, t } = useRetail();

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="view-container">
      {/* View Header */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#fff", margin: "0 0 4px 0" }}>
          {t("analytics")}
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>
          Plain-language business performance reporting & profit breakdown
        </p>
      </div>

      {/* Metric Highlights */}
      <div className="grid-3" style={{ marginBottom: "24px" }}>
        <div className="glass-panel" style={{ padding: "20px" }}>
          <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: "600" }}>Total Gross Revenue</div>
          <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "#fff", marginTop: "4px" }}>₹{totalSales.toLocaleString("en-IN")}</div>
          <div style={{ fontSize: "0.78rem", color: "#34d399", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
            <ArrowUpRight size={14} /> +24% growth vs last month
          </div>
        </div>

        <div className="glass-panel" style={{ padding: "20px" }}>
          <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: "600" }}>Customer Repeat Rate</div>
          <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "#fff", marginTop: "4px" }}>68.4%</div>
          <div style={{ fontSize: "0.78rem", color: "#a5b4fc", marginTop: "4px" }}>High loyalty driven by WhatsApp receipts</div>
        </div>

        <div className="glass-panel" style={{ padding: "20px" }}>
          <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: "600" }}>Average Order Value (AOV)</div>
          <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "#fff", marginTop: "4px" }}>₹2,447</div>
          <div style={{ fontSize: "0.78rem", color: "#fbbf24", marginTop: "4px" }}>+₹350 higher than industry benchmark</div>
        </div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid-2" style={{ marginBottom: "24px" }}>
        
        {/* Sales by Channel Visual Progress Bar */}
        <div className="glass-panel" style={{ padding: "22px" }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#fff", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <BarChart3 size={18} color="var(--primary)" /> Revenue Share by Sales Channel
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "4px" }}>
                <span>POS In-Store Counter</span>
                <span style={{ fontWeight: "700" }}>62% (₹4,547)</span>
              </div>
              <div style={{ width: "100%", height: "10px", background: "rgba(255,255,255,0.08)", borderRadius: "6px", overflow: "hidden" }}>
                <div style={{ width: "62%", height: "100%", background: "linear-gradient(90deg, #6366f1, #a855f7)" }} />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "4px" }}>
                <span>Online Web Storefront</span>
                <span style={{ fontWeight: "700" }}>26% (₹2,126)</span>
              </div>
              <div style={{ width: "100%", height: "10px", background: "rgba(255,255,255,0.08)", borderRadius: "6px", overflow: "hidden" }}>
                <div style={{ width: "26%", height: "100%", background: "linear-gradient(90deg, #10b981, #059669)" }} />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "4px" }}>
                <span>Shopify Sync & Marketplaces</span>
                <span style={{ fontWeight: "700" }}>12% (₹1,718)</span>
              </div>
              <div style={{ width: "100%", height: "10px", background: "rgba(255,255,255,0.08)", borderRadius: "6px", overflow: "hidden" }}>
                <div style={{ width: "12%", height: "100%", background: "linear-gradient(90deg, #f59e0b, #d97706)" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Top Product Performers */}
        <div className="glass-panel" style={{ padding: "22px" }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#fff", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <ShoppingBag size={18} color="#10b981" /> Top Category Sales Breakdown
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="glass-card" style={{ padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "0.88rem", fontWeight: "700", color: "#fff" }}>{p.title}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{p.category} • SKU: {p.sku}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.95rem", fontWeight: "800", color: "#34d399" }}>₹{p.sellingPrice}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>Margin ~45%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
