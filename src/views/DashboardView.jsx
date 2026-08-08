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

  // Financial Metrics with Accurate Mathematical Baselines
  const todaysSales = orders.reduce((acc, o) => acc + o.total, 0);
  const totalOrdersCount = orders.length;
  const estimatedProfit = Math.round(todaysSales * 0.38);
  const lowStockItems = products.filter((p) => p.stockQty <= p.lowStockThreshold);
  const activeCustomersCount = customers ? customers.length : 182;

  // Mathematically Consistent Yesterday Comparison Baseline (+18.4%)
  const yesterdaySalesBaseline = Math.round(todaysSales / 1.184);

  const handleExecuteAIAction = () => {
    setExecutedAction(true);
    setTimeout(() => {
      setActiveView("comms");
    }, 900);
  };

  return (
    <div className="view-container" style={{ maxWidth: "1600px", margin: "0 auto", padding: "24px 32px" }}>
      
      {/* 1. EXECUTIVE HEADER (CLEAN BRANDING, SLEEK ACTION PILLS, ZERO OVERLAPPING TEXT) */}
      <div 
        style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          flexWrap: "wrap", 
          gap: "16px", 
          marginBottom: "28px" 
        }}
      >
        <div>
          <div className="micro-tag" style={{ color: "var(--primary)", marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
            <Zap size={14} /> <span>Enterprise Retail OS Telemetry</span>
          </div>
          <h2 style={{ fontSize: "24px", fontWeight: "800", letterSpacing: "-0.025em", margin: "0 0 4px 0", color: "#ffffff" }}>
            Executive Dashboard
          </h2>
          <p className="caption" style={{ fontSize: "14px", color: "#94A3B8", margin: 0, maxWidth: "680px" }}>
            Unified merchant telemetry for counter billing, multi-branch catalog sync, customer credit ledgers & AI co-pilot recommendations.
          </p>
        </div>

        {/* SLEEK INLINE ACTION PILLS (H-38 38PX, EXPLICIT ICON ALIGNMENT, NO BLOCKY HEAVINESS) */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button 
            onClick={() => setActiveView("pos")} 
            className="btn btn-primary"
            style={{ 
              height: "38px", 
              minHeight: "38px", 
              padding: "0 16px", 
              borderRadius: "9999px", 
              fontSize: "13px", 
              display: "flex", 
              alignItems: "center", 
              gap: "8px" 
            }}
          >
            <Zap size={15} />
            <span>+ New Bill</span>
          </button>
          <button 
            onClick={() => setActiveView("ai")} 
            className="btn btn-secondary"
            style={{ 
              height: "38px", 
              minHeight: "38px", 
              padding: "0 16px", 
              borderRadius: "9999px", 
              fontSize: "13px", 
              display: "flex", 
              alignItems: "center", 
              gap: "8px" 
            }}
          >
            <Sparkles size={15} color="var(--primary)" />
            <span>AI Copilot</span>
          </button>
        </div>
      </div>

      {/* 2. RESPONSIVE KPI GRID (SMOOTH 2-COLUMN / 4-COLUMN RESPONSIVE LAYOUT WITH VISUAL EDGE SCROLL MASK) */}
      <div 
        className="animate-cascade stagger-1"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
          marginBottom: "28px",
          maskImage: "linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)"
        }}
      >
        
        {/* KPI CARD 1: GROSS SALES */}
        <div 
          onClick={() => setActiveView("pos")}
          className="glass-card" 
          style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer", background: "rgba(15, 23, 42, 0.6)", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.08)" }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span className="caption" style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#94A3B8", letterSpacing: "0.05em" }}>Gross Sales</span>
              <span className="badge badge-success" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#34D399", border: "1px solid rgba(16, 185, 129, 0.25)", borderRadius: "9999px", padding: "2px 8px", fontSize: "11px", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "2px" }}>
                <ArrowUpRight size={12} /> +18.4%
              </span>
            </div>
            
            {/* ITEMS-BASELINE CURRENCY SYMBOL ALIGNMENT */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "3px", marginBottom: "4px" }}>
              <span style={{ fontSize: "20px", fontWeight: "600", color: "#94A3B8", lineHeight: "1" }}>₹</span>
              <span style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em", lineHeight: "1" }}>
                {todaysSales.toLocaleString("en-IN")}
              </span>
            </div>
            
            <div className="caption" style={{ fontSize: "12px", color: "#94A3B8", whiteSpace: "nowrap" }}>POS & Online counter billing</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", paddingTop: "10px", borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
            <span className="caption" style={{ fontSize: "11px", color: "#94A3B8", whiteSpace: "nowrap" }}>Vs yesterday: ₹{yesterdaySalesBaseline.toLocaleString("en-IN")}</span>
            <ChevronRight size={14} color="#94A3B8" />
          </div>
        </div>

        {/* KPI CARD 2: NET PROFIT */}
        <div 
          onClick={() => setActiveView("analytics")}
          className="glass-card" 
          style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer", background: "rgba(15, 23, 42, 0.6)", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.08)" }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span className="caption" style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#94A3B8", letterSpacing: "0.05em" }}>Net Profit</span>
              <span className="badge badge-success" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#34D399", border: "1px solid rgba(16, 185, 129, 0.25)", borderRadius: "9999px", padding: "2px 8px", fontSize: "11px", fontWeight: "600" }}>
                38% Margin
              </span>
            </div>

            {/* ITEMS-BASELINE CURRENCY SYMBOL ALIGNMENT */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "3px", marginBottom: "4px" }}>
              <span style={{ fontSize: "20px", fontWeight: "600", color: "#94A3B8", lineHeight: "1" }}>₹</span>
              <span style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em", lineHeight: "1" }}>
                {estimatedProfit.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="caption" style={{ fontSize: "12px", color: "#94A3B8", whiteSpace: "nowrap" }}>Net Margin after COGS</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", paddingTop: "10px", borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
            <span className="caption" style={{ fontSize: "11px", color: "#94A3B8", whiteSpace: "nowrap" }}>Reconciled Real-Time</span>
            <ChevronRight size={14} color="#94A3B8" />
          </div>
        </div>

        {/* KPI CARD 3: ORDERS */}
        <div 
          onClick={() => setActiveView("orders")}
          className="glass-card" 
          style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer", background: "rgba(15, 23, 42, 0.6)", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.08)" }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span className="caption" style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#94A3B8", letterSpacing: "0.05em" }}>Orders</span>
              <span className="badge badge-success" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#34D399", border: "1px solid rgba(16, 185, 129, 0.25)", borderRadius: "9999px", padding: "2px 8px", fontSize: "11px", fontWeight: "600" }}>100% Fulfilled</span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", marginBottom: "4px", letterSpacing: "-0.02em", lineHeight: "1" }}>
              {totalOrdersCount} Orders
            </div>
            <div className="caption" style={{ fontSize: "12px", color: "#94A3B8", whiteSpace: "nowrap" }}>Multi-channel fulfilled</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", paddingTop: "10px", borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
            <span className="caption" style={{ fontSize: "11px", color: "#94A3B8", whiteSpace: "nowrap" }}>Avg Value: ₹{(todaysSales / (totalOrdersCount || 1)).toFixed(0)}</span>
            <ChevronRight size={14} color="#94A3B8" />
          </div>
        </div>

        {/* KPI CARD 4: ACTIVE CUSTOMERS */}
        <div 
          onClick={() => setActiveView("comms")}
          className="glass-card" 
          style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer", background: "rgba(15, 23, 42, 0.6)", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.08)" }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span className="caption" style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#94A3B8", letterSpacing: "0.05em" }}>Customers</span>
              <span className="badge badge-info" style={{ background: "rgba(139, 92, 246, 0.1)", color: "#A78BFA", border: "1px solid rgba(139, 92, 246, 0.25)", borderRadius: "9999px", padding: "2px 8px", fontSize: "11px", fontWeight: "600" }}>+12 Today</span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", marginBottom: "4px", letterSpacing: "-0.02em", lineHeight: "1" }}>
              {activeCustomersCount} Active
            </div>
            <div className="caption" style={{ fontSize: "12px", color: "#94A3B8", whiteSpace: "nowrap" }}>78% repeat buyer rate</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", paddingTop: "10px", borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
            <span className="caption" style={{ fontSize: "11px", color: "#94A3B8", whiteSpace: "nowrap" }}>12 At Churn Risk</span>
            <ChevronRight size={14} color="#94A3B8" />
          </div>
        </div>

      </div>

      {/* 3. AI CEO BRIEF CARD (UNCLIPPED CTAS, FLEXIBLE METRIC COLUMNS, MUTED TINT BADGES) */}
      {!dismissedAiBrief && (
        <div 
          className="glass-panel animate-cascade stagger-2 neon-glow-purple" 
          style={{ 
            padding: "20px 24px", 
            marginBottom: "28px", 
            background: "linear-gradient(135deg, rgba(88, 28, 135, 0.35) 0%, rgba(15, 23, 42, 0.95) 100%)", 
            border: "1px solid rgba(168, 85, 247, 0.35)", 
            borderRadius: "20px",
            position: "relative"
          }}
        >
          {/* TOP ROW */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", gap: "12px", flexWrap: "wrap" }}>
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
                style={{ padding: "4px", minWidth: "36px", minHeight: "36px", width: "36px", height: "36px", color: "#94A3B8" }}
                aria-label="Dismiss Brief"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* BODY */}
          <div style={{ marginBottom: "16px" }}>
            <h4 style={{ fontSize: "15px", fontWeight: "600", color: "#ffffff", margin: "0 0 6px 0" }}>
              Win-Back Campaign Trigger
            </h4>
            <p style={{ fontSize: "13px", lineHeight: "1.55", color: "#CBD5E1", margin: 0 }}>
              12 VIP customers haven't ordered in 30 days. Sending a WhatsApp broadcast code <code className="sku-code" style={{ background: "rgba(139, 92, 246, 0.2)", color: "#C084FC", padding: "2px 6px", borderRadius: "4px", fontSize: "12px" }}>DIWALI10</code> will yield an estimated <strong>+₹48,000 ROI</strong>.
            </p>
          </div>

          {/* METRICS GRID WITH NO-TRUNCATION NO-WRAP SUBTEXT */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "12px", background: "rgba(2, 6, 23, 0.6)", padding: "14px 16px", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.08)", marginBottom: "16px" }}>
            <div>
              <div className="caption" style={{ fontSize: "11px", color: "#94A3B8", marginBottom: "2px", whiteSpace: "nowrap" }}>Est. ROI</div>
              <div style={{ color: "#34D399", fontSize: "15px", fontWeight: "700", whiteSpace: "nowrap" }}>+₹48,000</div>
            </div>
            <div>
              <div className="caption" style={{ fontSize: "11px", color: "#94A3B8", marginBottom: "2px", whiteSpace: "nowrap" }}>Time Req.</div>
              <div style={{ color: "#ffffff", fontSize: "15px", fontWeight: "700", whiteSpace: "nowrap" }}>2 mins</div>
            </div>
            <div>
              <div className="caption" style={{ fontSize: "11px", color: "#94A3B8", marginBottom: "2px", whiteSpace: "nowrap" }}>Risk Level</div>
              <div style={{ color: "#34D399", fontSize: "15px", fontWeight: "700", whiteSpace: "nowrap" }}>Low</div>
            </div>
          </div>

          {/* UNCLIPPED FOOTER ACTION BUTTON (MIN-HEIGHT 44PX TAP TARGET) */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button 
              onClick={handleExecuteAIAction} 
              className="btn btn-primary"
              style={{ 
                minHeight: "44px", 
                padding: "10px 24px", 
                borderRadius: "12px", 
                background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)", 
                fontWeight: "600", 
                fontSize: "13px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
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

      {/* 4. STRUCTURED INVENTORY RISK ALERT BANNER (2-PART HORIZONTAL FLEX, SOFT WARNING TINT, MIN-HEIGHT 44PX CTA) */}
      {lowStockItems.length > 0 && (
        <div 
          className="glass-panel animate-cascade stagger-3" 
          style={{ 
            padding: "16px 20px", 
            marginBottom: "28px", 
            background: "rgba(244, 63, 94, 0.1)", 
            border: "1px solid rgba(244, 63, 94, 0.25)", 
            borderRadius: "16px",
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px"
          }}
        >
          {/* LEFT PART: ICON + TEXT */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1, minWidth: "260px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "rgba(244, 63, 94, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <AlertTriangle size={22} color="#F43F5E" />
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: "700", color: "#ffffff" }}>
                Inventory Risk Alert: {lowStockItems.length} Products Low
              </div>
              <div className="caption" style={{ color: "#F87171", fontSize: "12px", marginTop: "2px" }}>
                Products below safety threshold (e.g. Wireless Bluetooth Earbuds Pro: 8 units remaining).
              </div>
            </div>
          </div>

          {/* RIGHT PART: ACTION CTA (STANDARD 44PX TAP TARGET) */}
          <button 
            onClick={() => setActiveView("inventory")} 
            className="btn btn-danger" 
            style={{ 
              minHeight: "44px", 
              padding: "10px 20px", 
              fontSize: "13px", 
              fontWeight: "700",
              borderRadius: "10px",
              whiteSpace: "nowrap"
            }}
          >
            <span>Restock Inventory →</span>
          </button>
        </div>
      )}

      {/* 5. OPERATIONS LEDGER & INVENTORY HEALTH (TWO-COLUMN RESPONSIVE GRID) */}
      <div className="grid-2 animate-cascade stagger-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px", marginBottom: "28px" }}>
        
        {/* OPERATIONS & ORDERS LEDGER */}
        <div className="glass-panel" style={{ padding: "22px", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(30, 41, 59, 0.8)", borderRadius: "16px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: "700", margin: 0, color: "#F8FAFC", letterSpacing: "-0.01em" }}>Operations & Orders Ledger</h3>
              <span 
                onClick={() => setActiveView("orders")}
                style={{ fontSize: "12px", fontWeight: "600", color: "#818CF8", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}
              >
                <span>View All Orders</span>
                <ChevronRight size={14} />
              </span>
            </div>

            {/* DESKTOP LEDGER TABLE */}
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
                      <td style={{ fontWeight: "600", fontFamily: "monospace", color: "#94A3B8" }}>#{ord.id}</td>
                      <td><span className="badge badge-info" style={{ background: "rgba(99, 102, 241, 0.1)", color: "#818CF8", border: "1px solid rgba(99, 102, 241, 0.25)" }}>{ord.channel}</span></td>
                      <td>
                        <div style={{ fontWeight: "600", color: "#F8FAFC" }}>{ord.customerName}</div>
                        <div className="caption" style={{ fontSize: "11px", color: "#94A3B8" }}>{ord.customerPhone}</div>
                      </td>
                      <td>{ord.itemsCount} items</td>
                      <td>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
                          <span style={{ fontSize: "12px", color: "#94A3B8", lineHeight: "1" }}>₹</span>
                          <span style={{ fontSize: "14px", fontWeight: "700", color: "#ffffff", lineHeight: "1" }}>{ord.total.toLocaleString("en-IN")}</span>
                        </div>
                      </td>
                      <td>
                        {/* MUTED LOW-OPACITY TINT BADGES */}
                        <span 
                          className="badge" 
                          style={{ 
                            background: ord.status === "Completed" || ord.status === "Fulfilled" ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)", 
                            color: ord.status === "Completed" || ord.status === "Fulfilled" ? "#34D399" : "#FBBF24", 
                            border: ord.status === "Completed" || ord.status === "Fulfilled" ? "1px solid rgba(16, 185, 129, 0.25)" : "1px solid rgba(245, 158, 11, 0.25)", 
                            borderRadius: "9999px", 
                            padding: "3px 10px", 
                            fontSize: "10px", 
                            fontWeight: "700", 
                            textTransform: "uppercase" 
                          }}
                        >
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
                <div key={ord.id} style={{ padding: "14px", background: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(30, 41, 59, 0.8)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "12px", fontWeight: "500", color: "#94A3B8", fontFamily: "monospace" }}>#{ord.id}</span>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#F8FAFC" }}>{ord.customerName}</span>
                    </div>
                    <div style={{ fontSize: "12px", color: "#94A3B8", marginTop: "2px" }}>{ord.channel} • {ord.itemsCount} items</div>
                  </div>
                  
                  <div style={{ textAlign: "right" }}>
                    <span 
                      className="badge" 
                      style={{ 
                        background: ord.status === "Completed" || ord.status === "Fulfilled" ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)", 
                        color: ord.status === "Completed" || ord.status === "Fulfilled" ? "#34D399" : "#FBBF24", 
                        border: ord.status === "Completed" || ord.status === "Fulfilled" ? "1px solid rgba(16, 185, 129, 0.25)" : "1px solid rgba(245, 158, 11, 0.25)", 
                        borderRadius: "9999px", 
                        padding: "2px 8px", 
                        fontSize: "10px", 
                        fontWeight: "700", 
                        textTransform: "uppercase" 
                      }}
                    >
                      {ord.status}
                    </span>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "flex-end", gap: "2px", marginTop: "4px" }}>
                      <span style={{ fontSize: "11px", color: "#94A3B8" }}>₹</span>
                      <span style={{ fontSize: "14px", fontWeight: "700", color: "#F8FAFC" }}>{ord.total.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* INVENTORY & WAREHOUSE CAPACITY WITH VISUAL STATUS PROGRESS BARS */}
        <div className="glass-panel" style={{ padding: "22px", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(30, 41, 59, 0.8)", borderRadius: "16px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: "700", margin: "0 0 2px 0", color: "#F8FAFC" }}>Inventory & Warehouse Capacity</h3>
                <div style={{ fontSize: "12px", color: "#94A3B8" }}>Real-time stock movement & low stock status</div>
              </div>
              <span 
                onClick={() => setActiveView("inventory")} 
                style={{ fontSize: "12px", fontWeight: "600", color: "#818CF8", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}
              >
                <span>View Full Inventory</span>
                <ChevronRight size={14} />
              </span>
            </div>

            {/* WAREHOUSE CAPACITY VISUAL PROGRESS TRACK */}
            <div style={{ padding: "14px", marginBottom: "16px", background: "rgba(2, 6, 23, 0.6)", border: "1px solid rgba(30, 41, 59, 0.8)", borderRadius: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "12px", fontWeight: "500", color: "#CBD5E1" }}>Central Warehouse Capacity</span>
                <span style={{ color: "#818CF8", fontSize: "12px", fontWeight: "700" }}>68% Utilized</span>
              </div>
              {/* VISUAL PROGRESS TRACK (H-1.5 / 6PX BG-SLATE-800 ROUNDED-FULL) */}
              <div style={{ width: "100%", height: "6px", borderRadius: "9999px", background: "rgba(30, 41, 59, 0.8)", overflow: "hidden" }}>
                <div style={{ width: "68%", height: "100%", borderRadius: "9999px", background: "linear-gradient(90deg, #6366F1 0%, #818CF8 100%)" }} />
              </div>
            </div>

            {/* LOW STOCK ITEMIZED PROGRESS TRACKS */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {products.slice(0, 3).map((prod) => {
                const isLow = prod.stockQty <= prod.lowStockThreshold;
                const percent = Math.min(100, Math.round((prod.stockQty / (prod.lowStockThreshold * 3)) * 100));
                return (
                  <div key={prod.id} style={{ padding: "12px 14px", background: "rgba(2, 6, 23, 0.5)", borderRadius: "12px", border: "1px solid rgba(30, 41, 59, 0.6)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <div>
                        <div style={{ fontWeight: "600", color: "#F8FAFC", fontSize: "12px" }}>{prod.title}</div>
                        <div style={{ color: "#94A3B8", fontSize: "11px", fontFamily: "monospace" }}>SKU: {prod.sku}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span 
                          className="badge" 
                          style={{ 
                            background: isLow ? "rgba(244, 63, 94, 0.1)" : "rgba(16, 185, 129, 0.1)", 
                            color: isLow ? "#F87171" : "#34D399", 
                            border: isLow ? "1px solid rgba(244, 63, 94, 0.25)" : "1px solid rgba(16, 185, 129, 0.25)", 
                            padding: "2px 8px", 
                            fontSize: "10px", 
                            fontWeight: "700", 
                            borderRadius: "9999px" 
                          }}
                        >
                          {prod.stockQty} LEFT
                        </span>
                      </div>
                    </div>
                    {/* VISUAL STOCK LEVEL PROGRESS TRACK */}
                    <div style={{ width: "100%", height: "6px", borderRadius: "9999px", background: "rgba(30, 41, 59, 0.8)", overflow: "hidden" }}>
                      <div style={{ width: `${percent}%`, height: "100%", borderRadius: "9999px", background: isLow ? "#F43F5E" : "#10B981" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(30, 41, 59, 0.8)", paddingTop: "14px", marginTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
            <span style={{ fontSize: "12px", color: "#94A3B8" }}>Supplier Lead Time: <strong style={{ color: "#F8FAFC" }}>24 Hours</strong></span>
            <button style={{ minHeight: "36px", padding: "0 14px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", color: "#6EE7B7", fontSize: "12px", fontWeight: "600", borderRadius: "8px", display: "inline-flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
              <span>Automated PO Ready</span>
            </button>
          </div>
        </div>

      </div>

      {/* 6. AUDIT LOGS & TAX COMPLIANCE FOOTER */}
      <div className="glass-panel animate-cascade stagger-5" style={{ padding: "20px", background: "rgba(15, 23, 42, 0.4)", border: "1px solid rgba(30, 41, 59, 0.6)", borderRadius: "16px" }}>
        <div 
          onClick={() => setExpandedSection(!expandedSection)}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
        >
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: "700", margin: 0, color: "#F8FAFC" }}>Executive Audit Logs & GST Tax Compliance</h3>
            <div style={{ fontSize: "12px", color: "#94A3B8", marginTop: "2px" }}>Real-time audit trail and GSTR-3B tax reconciliation</div>
          </div>
          <ChevronDown size={18} style={{ transform: expandedSection ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease", color: "#94A3B8" }} />
        </div>

        {expandedSection && (
          <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid rgba(30, 41, 59, 0.6)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
              
              <div style={{ padding: "12px", background: "rgba(2, 6, 23, 0.4)", border: "1px solid rgba(30, 41, 59, 0.5)", borderRadius: "12px" }}>
                <div style={{ fontSize: "11px", fontWeight: "500", color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>GSTR-3B Tax Liability</div>
                <div style={{ fontSize: "12px", fontWeight: "700", color: "#E2E8F0", marginBottom: "2px" }}>₹526 Collected</div>
                <div style={{ fontSize: "11px", color: "#94A3B8", fontFamily: "monospace" }}>CGST ₹263 + SGST ₹263</div>
              </div>

              <div style={{ padding: "12px", background: "rgba(2, 6, 23, 0.4)", border: "1px solid rgba(30, 41, 59, 0.5)", borderRadius: "12px" }}>
                <div style={{ fontSize: "11px", fontWeight: "500", color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Catalog Sync Status</div>
                <div style={{ fontSize: "12px", fontWeight: "700", color: "#34D399", marginBottom: "2px" }}>100% Synced</div>
                <div style={{ fontSize: "11px", color: "#94A3B8", fontFamily: "monospace" }}>5 Outlets Operational</div>
              </div>

              <div style={{ padding: "12px", background: "rgba(2, 6, 23, 0.4)", border: "1px solid rgba(30, 41, 59, 0.5)", borderRadius: "12px" }}>
                <div style={{ fontSize: "11px", fontWeight: "500", color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>System Security Audit</div>
                <div style={{ fontSize: "12px", fontWeight: "700", color: "#C084FC", marginBottom: "2px" }}>RBAC Active</div>
                <div style={{ fontSize: "11px", color: "#94A3B8", fontFamily: "monospace" }}>Audit Log #4920</div>
              </div>

            </div>
          </div>
        )}
      </div>

    </div>
  );
};
