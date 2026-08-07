import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { 
  AlertTriangle, 
  Sparkles, 
  ArrowUpRight, 
  ChevronRight,
  Zap,
  Check,
  X,
  ChevronDown
} from "lucide-react";

export const DashboardView = () => {
  const { orders, products, customers, setActiveView } = useRetail();

  const [dismissedAiBrief, setDismissedAiBrief] = useState(false);
  const [executedAction, setExecutedAction] = useState(false);
  const [expandedSection, setExpandedSection] = useState(true);

  // Financial Metrics
  const todaysSales = orders.reduce((acc, o) => acc + o.total, 0);
  const totalOrdersCount = orders.length;
  const estimatedProfit = Math.round(todaysSales * 0.38);
  const lowStockItems = products.filter((p) => p.stockQty <= p.lowStockThreshold);
  const activeCustomersCount = customers ? customers.length : 182;
  const healthScore = Math.max(70, 100 - lowStockItems.length * 5);

  const handleExecuteAIAction = () => {
    setExecutedAction(true);
    setTimeout(() => {
      setActiveView("comms");
    }, 900);
  };

  return (
    <div className="view-container" style={{ maxWidth: "1600px", margin: "0 auto", padding: "32px" }}>
      
      {/* 4-STEP EXECUTIVE FIRST-SCREEN VISUAL HIERARCHY HERO */}
      <div className="mobile-hero-header">
        <div>
          <div className="micro-tag hide-subtitle-mobile" style={{ color: "var(--primary)", marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
            <Zap size={14} /> <span>Enterprise Retail OS Telemetry</span>
          </div>
          <h2 style={{ fontSize: "24px", fontWeight: "800", letterSpacing: "-0.025em", margin: "0 0 4px 0", color: "#ffffff" }}>
            Executive Dashboard
          </h2>
          <p className="caption hide-subtitle-mobile" style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0, maxWidth: "680px" }}>
            Unified merchant telemetry for counter billing, multi-branch catalog sync, customer credit ledgers & AI co-pilot recommendations.
          </p>
        </div>

        {/* SINGLE-ROW SEGMENTED ACTION PILLS (H-9 36PX, ZERO VERTICAL WASTE) */}
        <div className="mobile-action-pills">
          <button onClick={() => setActiveView("pos")} className="btn btn-primary">
            <Zap size={16} />
            <span>+ New Bill</span>
          </button>
          <button onClick={() => setActiveView("ai")} className="btn btn-secondary">
            <Sparkles size={16} color="var(--primary)" />
            <span>AI Copilot</span>
          </button>
        </div>
      </div>

      {/* SINGLE-SOURCE RESPONSIVE KPI ROW (0 DUPLICATE HTML) */}
      <div className="responsive-kpi-container animate-cascade stagger-1">
        
        {/* KPI CARD 1: REVENUE */}
        <div 
          onClick={() => setActiveView("pos")}
          className="glass-card" 
          style={{ padding: "18px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer", background: "rgba(15, 23, 42, 0.6)", borderRadius: "16px" }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span className="caption" style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#94A3B8", letterSpacing: "0.05em" }}>Gross Sales</span>
              <span className="badge badge-success" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#34D399", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "9999px", padding: "2px 8px", fontSize: "11px", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "2px" }}>
                <ArrowUpRight size={12} /> +18.4%
              </span>
            </div>
            <div className="kpi-optical-number">
              <span className="currency-symbol" style={{ fontSize: "20px", color: "#94A3B8" }}>₹</span>
              <span className="num-tabular" style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em" }}>
                {todaysSales.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="caption" style={{ fontSize: "12px", color: "#94A3B8" }}>POS & Online counter billing</div>
          </div>
          <div className="tappable-row">
            <span className="caption" style={{ fontSize: "11px", color: "#94A3B8" }}>Vs yesterday: ₹89,100</span>
            <ChevronRight size={14} color="#94A3B8" />
          </div>
        </div>

        {/* KPI CARD 2: NET PROFIT */}
        <div 
          onClick={() => setActiveView("analytics")}
          className="glass-card" 
          style={{ padding: "18px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer", background: "rgba(15, 23, 42, 0.6)", borderRadius: "16px" }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span className="caption" style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#94A3B8", letterSpacing: "0.05em" }}>Net Profit</span>
              <span className="badge badge-success" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#34D399", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "9999px", padding: "2px 8px", fontSize: "11px", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "2px" }}>
                <ArrowUpRight size={12} /> 38% Margin
              </span>
            </div>
            <div className="kpi-optical-number">
              <span className="currency-symbol" style={{ fontSize: "20px", color: "#94A3B8" }}>₹</span>
              <span className="num-tabular" style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em" }}>
                {estimatedProfit.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="caption" style={{ fontSize: "12px", color: "#94A3B8" }}>Net Margin after COGS</div>
          </div>
          <div className="tappable-row">
            <span className="caption" style={{ fontSize: "11px", color: "#94A3B8" }}>Reconciled Real-Time</span>
            <ChevronRight size={14} color="#94A3B8" />
          </div>
        </div>

        {/* KPI CARD 3: ORDERS */}
        <div 
          onClick={() => setActiveView("orders")}
          className="glass-card" 
          style={{ padding: "18px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer", background: "rgba(15, 23, 42, 0.6)", borderRadius: "16px" }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span className="caption" style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#94A3B8", letterSpacing: "0.05em" }}>Orders</span>
              <span className="badge badge-success" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#34D399", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "9999px", padding: "2px 8px", fontSize: "11px", fontWeight: "600" }}>100% Fulfilled</span>
            </div>
            <div className="num-tabular" style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", marginBottom: "4px", letterSpacing: "-0.02em" }}>
              {totalOrdersCount} Orders
            </div>
            <div className="caption" style={{ fontSize: "12px", color: "#94A3B8" }}>Multi-channel fulfilled</div>
          </div>
          <div className="tappable-row">
            <span className="caption" style={{ fontSize: "11px", color: "#94A3B8" }}>Avg Value: ₹{(todaysSales / (totalOrdersCount || 1)).toFixed(0)}</span>
            <ChevronRight size={14} color="#94A3B8" />
          </div>
        </div>

        {/* KPI CARD 4: ACTIVE CUSTOMERS */}
        <div 
          onClick={() => setActiveView("comms")}
          className="glass-card" 
          style={{ padding: "18px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer", background: "rgba(15, 23, 42, 0.6)", borderRadius: "16px" }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span className="caption" style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#94A3B8", letterSpacing: "0.05em" }}>Customers</span>
              <span className="badge badge-info" style={{ background: "rgba(139, 92, 246, 0.1)", color: "#A78BFA", border: "1px solid rgba(139, 92, 246, 0.2)", borderRadius: "9999px", padding: "2px 8px", fontSize: "11px", fontWeight: "600" }}>+12 Today</span>
            </div>
            <div className="num-tabular" style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", marginBottom: "4px", letterSpacing: "-0.02em" }}>
              {activeCustomersCount} Active
            </div>
            <div className="caption" style={{ fontSize: "12px", color: "#94A3B8" }}>78% repeat buyer rate</div>
          </div>
          <div className="tappable-row">
            <span className="caption" style={{ fontSize: "11px", color: "#94A3B8" }}>12 At Churn Risk</span>
            <ChevronRight size={14} color="#94A3B8" />
          </div>
        </div>

        {/* KPI CARD 5: CASH POSITION */}
        <div 
          onClick={() => setActiveView("pos")}
          className="glass-card" 
          style={{ padding: "18px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer", background: "rgba(15, 23, 42, 0.6)", borderRadius: "16px" }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span className="caption" style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#94A3B8", letterSpacing: "0.05em" }}>Cash Position</span>
              <span className="badge badge-info" style={{ background: "rgba(99, 102, 241, 0.1)", color: "#818CF8", border: "1px solid rgba(99, 102, 241, 0.2)", borderRadius: "9999px", padding: "2px 8px", fontSize: "11px", fontWeight: "600" }}>{healthScore}/100 Health</span>
            </div>
            <div className="kpi-optical-number">
              <span className="currency-symbol" style={{ fontSize: "20px", color: "#94A3B8" }}>₹</span>
              <span className="num-tabular" style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em" }}>
                {todaysSales.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="caption" style={{ fontSize: "12px", color: "#94A3B8" }}>POS & Bank Settlement</div>
          </div>
          <div className="tappable-row">
            <span className="caption" style={{ fontSize: "11px", color: "#94A3B8" }}>Instant UPI & Cash</span>
            <ChevronRight size={14} color="#94A3B8" />
          </div>
        </div>

      </div>

      {/* MOBILE CAROUSEL DOT INDICATORS */}
      <div className="mobile-carousel-dots" aria-hidden="true">
        <div className="mobile-carousel-dot active" />
        <div className="mobile-carousel-dot" />
        <div className="mobile-carousel-dot" />
        <div className="mobile-carousel-dot" />
        <div className="mobile-carousel-dot" />
      </div>

      {/* 2. STEP 3: AI CEO BRIEF CARD / BANNER (LINEAR / OPENAI STYLE) */}
      {!dismissedAiBrief && (
        <div 
          className="glass-panel animate-cascade stagger-2 neon-glow-purple" 
          style={{ 
            padding: "20px", 
            marginBottom: "28px", 
            background: "linear-gradient(135deg, rgba(88, 28, 135, 0.35) 0%, rgba(15, 23, 42, 0.95) 100%)", 
            border: "1px solid rgba(168, 85, 247, 0.35)", 
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* TOP ROW: ICON + TITLE & CONFIDENCE BADGE */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 16px rgba(139, 92, 246, 0.4)", flexShrink: 0 }}>
                <Sparkles size={18} color="#ffffff" />
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: "700", margin: 0, color: "#ffffff" }}>
                AI CEO Brief
              </h3>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="badge" style={{ background: "rgba(168, 85, 247, 0.15)", color: "#D8B4FE", border: "1px solid rgba(168, 85, 247, 0.3)", borderRadius: "9999px", padding: "3px 10px", fontSize: "11px", fontWeight: "600" }}>
                92% Confidence
              </span>
              <button 
                onClick={() => setDismissedAiBrief(true)} 
                className="btn btn-ghost"
                style={{ padding: "4px", minWidth: "32px", minHeight: "32px", width: "32px", height: "32px", color: "#94A3B8" }}
                aria-label="Dismiss Brief"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* BODY TITLE & DESCRIPTION */}
          <div style={{ marginBottom: "14px" }}>
            <h4 style={{ fontSize: "15px", fontWeight: "600", color: "#ffffff", margin: "0 0 4px 0" }}>
              Win-Back Campaign Trigger
            </h4>
            <p style={{ fontSize: "13px", lineHeight: "1.5", color: "#CBD5E1", margin: 0, wordBreak: "break-word" }}>
              12 VIP customers haven't ordered in 30 days. Sending a WhatsApp broadcast code <code className="sku-code" style={{ background: "rgba(139, 92, 246, 0.2)", color: "#C084FC", padding: "2px 6px", borderRadius: "4px", fontSize: "12px" }}>DIWALI10</code> will yield an estimated <strong>+₹48,000 ROI</strong>.
            </p>
          </div>

          {/* 3-COLUMN METRICS GRID (EST ROI, TIME, RISK) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", background: "rgba(2, 6, 23, 0.6)", padding: "12px", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.08)", marginBottom: "16px" }}>
            <div>
              <div className="caption" style={{ fontSize: "11px", color: "#94A3B8", marginBottom: "2px" }}>Est. ROI</div>
              <div className="num-tabular" style={{ color: "#34D399", fontSize: "15px", fontWeight: "700" }}>+₹48,000</div>
            </div>
            <div>
              <div className="caption" style={{ fontSize: "11px", color: "#94A3B8", marginBottom: "2px" }}>Time Req.</div>
              <div className="num-tabular" style={{ color: "#ffffff", fontSize: "15px", fontWeight: "700" }}>2 mins</div>
            </div>
            <div>
              <div className="caption" style={{ fontSize: "11px", color: "#94A3B8", marginBottom: "2px" }}>Risk</div>
              <div className="num-tabular" style={{ color: "#34D399", fontSize: "15px", fontWeight: "700" }}>Low</div>
            </div>
          </div>

          {/* FOOTER ACTION BUTTON */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button 
              onClick={handleExecuteAIAction} 
              className="btn btn-primary"
              style={{ width: "100%", smWidth: "auto", minHeight: "44px", padding: "10px 20px", borderRadius: "12px", background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)", fontWeight: "600", fontSize: "13px" }}
            >
              {executedAction ? (
                <>
                  <Check size={16} />
                  <span>Campaign Triggered!</span>
                </>
              ) : (
                <>
                  <Zap size={16} />
                  <span>Execute Action →</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* 3. CRITICAL ALERTS BAR */}
      {lowStockItems.length > 0 && (
        <div className="glass-panel animate-cascade stagger-3" style={{ padding: "14px 20px", marginBottom: "32px", background: "rgba(244, 63, 94, 0.12)", borderColor: "rgba(244, 63, 94, 0.3)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <AlertTriangle size={20} color="#F43F5E" />
            <div>
              <span style={{ fontSize: "14px", fontWeight: "700", color: "#ffffff" }}>Inventory Risk Alert: </span>
              <span className="caption" style={{ color: "#F87171" }}>
                {lowStockItems.length} products below safety reorder threshold (e.g. Wireless Earbuds Pro: 8 units left).
              </span>
            </div>
          </div>
          {/* PRIMARY CRITICAL ALERT RED BUTTON */}
          <button onClick={() => setActiveView("inventory")} className="btn btn-danger" style={{ minHeight: "38px", padding: "6px 14px", fontSize: "13px" }}>
            <span>Restock Inventory</span>
          </button>
        </div>
      )}

      {/* 4. OPERATIONS (TWO-COLUMN DESKTOP GRID) */}
      <div className="grid-2 animate-cascade stagger-4" style={{ gridTemplateColumns: "1.2fr 1fr", gap: "32px", marginBottom: "32px" }}>
        
        {/* LEFT COLUMN: ORDERS, FULFILLMENT & RETURNS */}
        <div className="glass-panel" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 2px 0", color: "#ffffff" }}>Operations & Orders Ledger</h3>
              <div className="caption" style={{ color: "#94A3B8" }}>Live fulfillment status & customer transactions</div>
            </div>
            <button onClick={() => setActiveView("orders")} className="btn btn-secondary" style={{ minHeight: "36px", height: "36px", fontSize: "12px", padding: "6px 12px" }}>
              <span>View All Orders</span>
            </button>
          </div>

          {/* DESKTOP TABLE */}
          <div className="table-responsive hide-on-mobile">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Channel</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total Bill</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((ord) => (
                  <tr key={ord.id}>
                    <td style={{ fontWeight: "700", color: "var(--primary)" }}>{ord.id}</td>
                    <td><span className="badge badge-info">{ord.channel}</span></td>
                    <td>
                      <div style={{ fontWeight: "700" }}>{ord.customerName}</div>
                      <div className="caption" style={{ fontSize: "11px" }}>{ord.customerPhone}</div>
                    </td>
                    <td>{ord.itemsCount} items</td>
                    <td className="num-tabular" style={{ color: "#fff" }}>
                      <span className="kpi-optical-number" style={{ marginBottom: 0 }}>
                        <span className="currency-symbol" style={{ fontSize: "13px" }}>₹</span>
                        <span style={{ fontSize: "14px" }}>{ord.total.toLocaleString("en-IN")}</span>
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${ord.status === "Completed" ? "badge-success" : "badge-warning"}`}>
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE STACKED CARDS */}
          <div className="hide-on-desktop" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {orders.slice(0, 5).map((ord) => (
              <div key={ord.id} className="glass-card" style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: "10px", background: "rgba(15, 23, 42, 0.6)", borderRadius: "14px" }}>
                {/* TOP LINE: FONT-MONO ORDER ID & STATUS PILL */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="font-mono" style={{ fontSize: "12px", fontWeight: "600", color: "#94A3B8", fontFamily: "monospace" }}>#{ord.id}</span>
                  <span className="badge" style={{ background: ord.status === "Completed" ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)", color: ord.status === "Completed" ? "#34D399" : "#FBBF24", border: ord.status === "Completed" ? "1px solid rgba(16, 185, 129, 0.2)" : "1px solid rgba(245, 158, 11, 0.2)", borderRadius: "6px", padding: "2px 8px", fontSize: "10px", fontWeight: "600", textTransform: "uppercase" }}>
                    {ord.status}
                  </span>
                </div>

                {/* MIDDLE LINE: CUSTOMER NAME + CHANNEL BADGE */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div>
                    <div style={{ fontWeight: "600", color: "#ffffff", fontSize: "14px" }}>{ord.customerName}</div>
                    <div style={{ fontSize: "12px", color: "#94A3B8", marginTop: "2px" }}>{ord.channel} • {ord.itemsCount} items</div>
                  </div>
                  
                  {/* RIGHT/BOTTOM BOLD PRICE WITH BASELINE ALIGNMENT */}
                  <div className="kpi-optical-number" style={{ marginBottom: 0 }}>
                    <span className="currency-symbol" style={{ fontSize: "14px", color: "#94A3B8" }}>₹</span>
                    <span className="num-tabular" style={{ fontSize: "16px", fontWeight: "700", color: "#ffffff" }}>
                      {ord.total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: INVENTORY HEALTH & WAREHOUSE CAPACITY */}
        <div className="glass-panel" style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 2px 0", color: "#ffffff" }}>Inventory & Warehouse Capacity</h3>
                <div className="caption" style={{ color: "#94A3B8" }}>Real-time stock movement & low stock status</div>
              </div>
              <span 
                onClick={() => setActiveView("inventory")} 
                style={{ fontSize: "13px", fontWeight: "600", color: "var(--primary)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}
              >
                <span>View Full Inventory</span>
                <ChevronRight size={14} />
              </span>
            </div>

            {/* WAREHOUSE CAPACITY PROGRESS INDICATOR */}
            <div className="glass-card" style={{ padding: "16px", marginBottom: "16px", background: "rgba(15, 23, 42, 0.6)", borderRadius: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span className="caption" style={{ fontWeight: "600", color: "#E2E8F0" }}>Central Warehouse Capacity</span>
                <span className="num-tabular" style={{ color: "#34D399", fontSize: "13px", fontWeight: "700" }}>68% Utilized</span>
              </div>
              <div style={{ width: "100%", height: "8px", borderRadius: "9999px", background: "rgba(30, 41, 59, 0.8)", overflow: "hidden" }}>
                <div style={{ width: "68%", height: "100%", borderRadius: "9999px", background: "linear-gradient(90deg, #10B981, #3B82F6)" }} />
              </div>
            </div>

            {/* LOW STOCK ITEMIZED PROGRESS METER LIST */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {products.slice(0, 3).map((prod) => {
                const isLow = prod.stockQty <= prod.lowStockThreshold;
                const percent = Math.min(100, Math.round((prod.stockQty / (prod.lowStockThreshold * 3)) * 100));
                return (
                  <div key={prod.id} style={{ padding: "12px 14px", background: isLow ? "rgba(244, 63, 94, 0.08)" : "rgba(15, 23, 42, 0.5)", borderRadius: "12px", border: isLow ? "1px solid rgba(244, 63, 94, 0.25)" : "1px solid rgba(255, 255, 255, 0.08)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <div>
                        <div style={{ fontWeight: "600", color: "#ffffff", fontSize: "13px" }}>{prod.title}</div>
                        <div className="sku-code" style={{ color: "#94A3B8", fontSize: "11px" }}>SKU: {prod.sku}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span className="badge" style={{ background: isLow ? "rgba(244, 63, 94, 0.15)" : "rgba(16, 185, 129, 0.15)", color: isLow ? "#F87171" : "#34D399", border: isLow ? "1px solid rgba(244, 63, 94, 0.3)" : "1px solid rgba(16, 185, 129, 0.3)", padding: "2px 8px", fontSize: "11px", fontWeight: "700" }}>
                          {prod.stockQty} left
                        </span>
                      </div>
                    </div>
                    {/* STOCK LEVEL PROGRESS METER BAR */}
                    <div style={{ width: "100%", height: "6px", borderRadius: "9999px", background: "rgba(30, 41, 59, 0.8)", overflow: "hidden" }}>
                      <div style={{ width: `${percent}%`, height: "100%", borderRadius: "9999px", background: isLow ? "#F43F5E" : "#10B981" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "14px", marginTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="caption" style={{ color: "#94A3B8" }}>Supplier Lead Time: <strong style={{ color: "#ffffff" }}>24 Hours</strong></span>
            <span className="badge badge-success">Automated PO Ready</span>
          </div>
        </div>

      </div>

      {/* 5. AUDIT ACTIVITY & REPORTS (NEAT 2-COLUMN KEY-VALUE GRID) */}
      <div className="glass-panel animate-cascade stagger-5" style={{ padding: "20px" }}>
        <div 
          onClick={() => setExpandedSection(!expandedSection)}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
        >
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: "600", margin: 0, color: "#ffffff" }}>Executive Audit Logs & GST Tax Compliance</h3>
            <div className="caption" style={{ color: "#94A3B8", marginTop: "2px" }}>Real-time audit trail and GSTR-3B tax reconciliation</div>
          </div>
          <ChevronDown size={20} style={{ transform: expandedSection ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease", color: "#94A3B8" }} />
        </div>

        {expandedSection && (
          <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
              
              <div className="glass-card" style={{ padding: "14px 16px", background: "rgba(15, 23, 42, 0.6)", borderRadius: "12px" }}>
                <div className="caption" style={{ fontWeight: "600", color: "#94A3B8", marginBottom: "4px" }}>GSTR-3B Tax Liability</div>
                <div className="num-tabular" style={{ fontSize: "18px", fontWeight: "700", color: "#ffffff", marginBottom: "2px" }}>₹526 Collected</div>
                <div className="caption" style={{ fontSize: "11px", color: "#64748B" }}>CGST ₹263 + SGST ₹263</div>
              </div>

              <div className="glass-card" style={{ padding: "14px 16px", background: "rgba(15, 23, 42, 0.6)", borderRadius: "12px" }}>
                <div className="caption" style={{ fontWeight: "600", color: "#94A3B8", marginBottom: "4px" }}>Catalog Sync Status</div>
                <div className="num-tabular" style={{ fontSize: "18px", fontWeight: "700", color: "#34D399", marginBottom: "2px" }}>100% Synced</div>
                <div className="caption" style={{ fontSize: "11px", color: "#64748B" }}>5 Branch Outlets Operational</div>
              </div>

              <div className="glass-card" style={{ padding: "14px 16px", background: "rgba(15, 23, 42, 0.6)", borderRadius: "12px" }}>
                <div className="caption" style={{ fontWeight: "600", color: "#94A3B8", marginBottom: "4px" }}>System Security Audit</div>
                <div className="num-tabular" style={{ fontSize: "18px", fontWeight: "700", color: "#A78BFA", marginBottom: "2px" }}>RBAC Active</div>
                <div className="caption" style={{ fontSize: "11px", color: "#64748B" }}>2FA Enforced • Audit Log #4920</div>
              </div>            </div>
          </div>
        )}
      </div>

    </div>
  );
};
