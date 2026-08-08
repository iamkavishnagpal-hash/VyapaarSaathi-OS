import React from "react";
import { useRetail } from "../context/RetailContext";
import { BarChart3, TrendingUp, DollarSign, Package, ShoppingBag, ArrowUpRight } from "lucide-react";

export const AnalyticsView = () => {
  const { products, orders } = useRetail();

  const totalRev = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalUnits = orders.reduce((sum, o) => sum + o.itemCount, 0);

  const categoryBreakdown = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + p.stockQty * p.sellingPrice;
    return acc;
  }, {});

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="h1-title">Commercial Analytics & Financial Intelligence</h1>
          <p className="body-text" style={{ fontSize: "13px" }}>
            Operational metrics, inventory velocity, revenue breakdown, and AI demand forecasting
          </p>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid-12">
        <div className="col-3 card-panel">
          <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Gross Sales Value</span>
          <div className="kpi-text" style={{ marginTop: "4px" }}>${totalRev.toLocaleString("en-US", { minimumFractionDigits: 2 })}</div>
          <span style={{ fontSize: "11px", color: "var(--success)" }}>+18.4% vs last period</span>
        </div>

        <div className="col-3 card-panel">
          <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Average Order Value (AOV)</span>
          <div className="kpi-text" style={{ marginTop: "4px" }}>${orders.length ? (totalRev / orders.length).toFixed(2) : "0.00"}</div>
          <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Across {orders.length} transactions</span>
        </div>

        <div className="col-3 card-panel">
          <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Units Turnover Rate</span>
          <div className="kpi-text" style={{ marginTop: "4px" }}>4.2x / mo</div>
          <span style={{ fontSize: "11px", color: "var(--success)" }}>Optimal turnover</span>
        </div>

        <div className="col-3 card-panel">
          <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Inventory Margin Average</span>
          <div className="kpi-text" style={{ marginTop: "4px" }}>52.8%</div>
          <span style={{ fontSize: "11px", color: "var(--primary)" }}>Target: &gt; 45%</span>
        </div>
      </div>

      {/* CATEGORY VALUE SHARE & FORECASTING */}
      <div className="grid-12">
        
        <div className="col-6 card-panel">
          <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-main)", marginBottom: "12px" }}>
            Category Inventory Value Distribution
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {Object.entries(categoryBreakdown).map(([cat, val]) => {
              const totalVal = Object.values(categoryBreakdown).reduce((a, b) => a + b, 1);
              const pct = ((val / totalVal) * 100).toFixed(1);
              return (
                <div key={cat} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                    <span style={{ fontWeight: "600", color: "var(--text-main)" }}>{cat}</span>
                    <span style={{ color: "var(--text-muted)" }}>${val.toLocaleString("en-US", { minimumFractionDigits: 2 })} ({pct}%)</span>
                  </div>
                  <div style={{ width: "100%", height: "6px", backgroundColor: "var(--bg-elevated)", borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", backgroundColor: "var(--primary)" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-6 card-panel">
          <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-main)", marginBottom: "12px" }}>
            AI Demand Forecast & Stockout Risk Prediction
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ padding: "10px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-color)" }}>
              <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-main)" }}>Quantum Sound Pro Headphones</div>
              <div style={{ fontSize: "11px", color: "var(--warning)", marginTop: "2px" }}>Predicted stockout in 4.5 days due to elevated regional demand</div>
              <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "4px" }}>Recommended reorder: +50 units from AeroTech Audio</div>
            </div>

            <div style={{ padding: "10px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-color)" }}>
              <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-main)" }}>ErgoDesk Smart Electric Frame</div>
              <div style={{ fontSize: "11px", color: "var(--warning)", marginTop: "2px" }}>Predicted stockout in 2.1 days (6 units remaining)</div>
              <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "4px" }}>Recommended reorder: +20 units from Kinetic Dynamics</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
