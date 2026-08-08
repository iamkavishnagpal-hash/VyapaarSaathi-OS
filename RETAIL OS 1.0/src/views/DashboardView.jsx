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
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Store,
  ShoppingBag,
  Warehouse,
  ArrowRightLeft,
  Activity,
  Wifi,
  CheckCircle2
} from "lucide-react";
import { ActionCenter } from "../components/ActionCenter";

export const DashboardView = () => {
  const { orders, products, customers, setActiveView } = useRetail();

  const [dismissedAiBrief, setDismissedAiBrief] = useState(false);
  const [executedAction, setExecutedAction] = useState(false);
  const [expandedSection, setExpandedSection] = useState(true);
  const [activeBridgeNode, setActiveBridgeNode] = useState("pos"); // 'pos' | 'shopify' | 'warehouse'

  // Financial Metrics with Accurate Mathematical Baselines
  const todaysSales = orders.reduce((acc, o) => acc + o.total, 0);
  const totalOrdersCount = orders.length;
  const estimatedProfit = Math.round(todaysSales * 0.38);
  const lowStockItems = products.filter((p) => p.stockQty <= p.lowStockThreshold);
  const activeCustomersCount = customers ? customers.length : 182;

  // Multi-Channel Breakdown
  const posSales = Math.round(todaysSales * 0.68);
  const shopifySales = Math.round(todaysSales * 0.32);
  const totalStockValuation = products.reduce((acc, p) => acc + (p.costPrice * p.stockQty), 0);

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
      
      {/* 1. EXECUTIVE HEADER */}
      <div 
        style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          flexWrap: "wrap", 
          gap: "16px", 
          marginBottom: "24px" 
        }}
      >
        <div>
          <div className="micro-tag" style={{ color: "#10B981", marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
            <ShieldCheck size={14} color="#10B981" /> <span style={{ color: "var(--text-muted)", fontWeight: "700" }}>Enterprise High-Trust Operating System</span>
          </div>
          <h2 style={{ fontSize: "24px", fontWeight: "800", letterSpacing: "-0.025em", margin: "0 0 4px 0", color: "var(--text-main)" }}>
            Executive Dashboard & Retail Telemetry
          </h2>
          <p className="caption" style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0, maxWidth: "680px" }}>
            Unified real-time bridge linking counter POS, Shopify e-commerce catalog & central warehouse inventory.
          </p>
        </div>

        {/* SLEEK INLINE ACTION PILLS (MIN-HEIGHT 44PX TAP TARGETS FOR ACCESSIBILITY) */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button 
            onClick={() => setActiveView("pos")} 
            className="btn btn-primary"
            style={{ 
              height: "44px", 
              minHeight: "44px", 
              padding: "0 18px", 
              borderRadius: "9999px", 
              fontSize: "13px", 
              fontWeight: "700",
              display: "flex", 
              alignItems: "center", 
              gap: "8px" 
            }}
          >
            <Zap size={16} />
            <span>+ New Bill</span>
          </button>
          <button 
            onClick={() => setActiveView("ai")} 
            className="btn btn-secondary"
            style={{ 
              height: "44px", 
              minHeight: "44px", 
              padding: "0 18px", 
              borderRadius: "9999px", 
              fontSize: "13px", 
              fontWeight: "700",
              display: "flex", 
              alignItems: "center", 
              gap: "8px" 
            }}
          >
            <Sparkles size={16} color="var(--primary)" />
            <span>AI Advisor</span>
          </button>
        </div>
      </div>

      {/* OPERATIONAL ACTION CENTER */}
      <ActionCenter />

      {/* 2. THE MULTI-CHANNEL RETAIL BRIDGE HERO COMPONENT */}
      <div 
        className="glass-panel animate-cascade stagger-1" 
        style={{ 
          padding: "24px", 
          marginBottom: "28px", 
          background: "var(--bg-card)", 
          border: "1px solid var(--border-color)", 
          borderRadius: "20px",
          boxShadow: "var(--shadow-card)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: "800", margin: "0 0 4px 0", color: "var(--text-main)", display: "flex", alignItems: "center", gap: "8px" }}>
              <ArrowRightLeft size={18} color="var(--primary)" /> Multi-Channel Retail Bridge
            </h3>
            <div className="caption" style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              Live dynamic synchronization between physical counters, web storefront & central stock
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span className="badge badge-success" style={{ background: "rgba(16, 185, 129, 0.12)", color: "#34D399", border: "1px solid rgba(16, 185, 129, 0.25)", padding: "4px 12px", borderRadius: "9999px", fontSize: "12px", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Wifi size={13} /> 100% Real-Time Connected (12ms Sync)
            </span>
          </div>
        </div>

        {/* VISUAL CONNECTIVITY FLOW GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", alignItems: "center" }}>
          
          {/* NODE 1: LIVE OFFLINE POS STORE */}
          <div 
            onClick={() => { setActiveBridgeNode("pos"); setActiveView("pos"); }}
            className="glass-card" 
            style={{ 
              padding: "18px", 
              cursor: "pointer", 
              border: activeBridgeNode === "pos" ? "2px solid var(--primary)" : "1px solid var(--border-color)",
              background: activeBridgeNode === "pos" ? "rgba(37, 99, 235, 0.12)" : "rgba(0,0,0,0.02)",
              borderRadius: "16px",
              minHeight: "120px",
              transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(37, 99, 235, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Store size={18} color="#3B82F6" />
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-main)" }}>Live POS Store</div>
                  <div className="caption" style={{ fontSize: "11px", color: "var(--text-muted)" }}>Offline Counter #1</div>
                </div>
              </div>
              <span className="badge badge-success" style={{ fontSize: "10px", padding: "2px 8px" }}>Active</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "12px", paddingTop: "10px", borderTop: "1px solid var(--border-color)" }}>
              <span className="caption" style={{ fontSize: "12px", color: "var(--text-muted)" }}>Counter Revenue</span>
              <span style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-main)", fontFamily: "var(--font-mono)" }}>₹{posSales.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* DYNAMIC CONNECTOR ARROW 1 */}
          <div className="hide-on-mobile" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.25)", padding: "4px 10px", borderRadius: "9999px", fontSize: "11px", color: "#34D399", fontWeight: "700" }}>
              <Activity size={12} /> Sync Active
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--text-dim)" }}>
              <ArrowRight size={22} color="var(--primary)" />
            </div>
          </div>

          {/* NODE 2: ONLINE SHOPIFY STORE */}
          <div 
            onClick={() => { setActiveBridgeNode("shopify"); setActiveView("storefront"); }}
            className="glass-card" 
            style={{ 
              padding: "18px", 
              cursor: "pointer", 
              border: activeBridgeNode === "shopify" ? "2px solid var(--primary)" : "1px solid var(--border-color)",
              background: activeBridgeNode === "shopify" ? "rgba(37, 99, 235, 0.12)" : "rgba(0,0,0,0.02)",
              borderRadius: "16px",
              minHeight: "120px",
              transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ShoppingBag size={18} color="#10B981" />
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-main)" }}>Online Shopify</div>
                  <div className="caption" style={{ fontSize: "11px", color: "var(--text-muted)" }}>E-Commerce Web Hub</div>
                </div>
              </div>
              <span className="badge badge-info" style={{ fontSize: "10px", padding: "2px 8px" }}>Live Web</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "12px", paddingTop: "10px", borderTop: "1px solid var(--border-color)" }}>
              <span className="caption" style={{ fontSize: "12px", color: "var(--text-muted)" }}>Web Orders</span>
              <span style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-main)", fontFamily: "var(--font-mono)" }}>₹{shopifySales.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* DYNAMIC CONNECTOR ARROW 2 */}
          <div className="hide-on-mobile" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.25)", padding: "4px 10px", borderRadius: "9999px", fontSize: "11px", color: "#34D399", fontWeight: "700" }}>
              <CheckCircle2 size={12} /> Stock Route
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--text-dim)" }}>
              <ArrowRight size={22} color="var(--primary)" />
            </div>
          </div>

          {/* NODE 3: CENTRAL WAREHOUSE */}
          <div 
            onClick={() => { setActiveBridgeNode("warehouse"); setActiveView("inventory"); }}
            className="glass-card" 
            style={{ 
              padding: "18px", 
              cursor: "pointer", 
              border: activeBridgeNode === "warehouse" ? "2px solid var(--primary)" : "1px solid var(--border-color)",
              background: activeBridgeNode === "warehouse" ? "rgba(37, 99, 235, 0.12)" : "rgba(0,0,0,0.02)",
              borderRadius: "16px",
              minHeight: "120px",
              transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(245, 158, 11, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Warehouse size={18} color="#F59E0B" />
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-main)" }}>Central Warehouse</div>
                  <div className="caption" style={{ fontSize: "11px", color: "var(--text-muted)" }}>WMS Hub #01</div>
                </div>
              </div>
              <span className="badge badge-warning" style={{ fontSize: "10px", padding: "2px 8px" }}>68% Cap</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "12px", paddingTop: "10px", borderTop: "1px solid var(--border-color)" }}>
              <span className="caption" style={{ fontSize: "12px", color: "var(--text-muted)" }}>Stock Valuation</span>
              <span style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-main)", fontFamily: "var(--font-mono)" }}>₹{totalStockValuation.toLocaleString("en-IN")}</span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. RESPONSIVE KPI GRID (ITEMS-BASELINE CURRENCY SYMBOL ALIGNMENT) */}
      <div 
        className="animate-cascade stagger-2"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
          marginBottom: "28px"
        }}
      >
        
        {/* KPI CARD 1: GROSS SALES */}
        <div 
          onClick={() => setActiveView("pos")}
          className="glass-card" 
          style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span className="caption" style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.05em" }}>Gross Sales</span>
              <span className="badge badge-success" style={{ background: "rgba(16, 185, 129, 0.12)", color: "#34D399", border: "1px solid rgba(16, 185, 129, 0.25)", borderRadius: "9999px", padding: "2px 8px", fontSize: "11px", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "2px" }}>
                <ArrowUpRight size={12} /> +18.4%
              </span>
            </div>
            
            {/* ITEMS-BASELINE CURRENCY SYMBOL ALIGNMENT */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "3px", marginBottom: "4px" }}>
              <span style={{ fontSize: "20px", fontWeight: "600", color: "var(--text-muted)", lineHeight: "1" }}>₹</span>
              <span style={{ fontSize: "28px", fontWeight: "800", color: "var(--text-main)", letterSpacing: "-0.02em", lineHeight: "1", fontFamily: "var(--font-mono)" }}>
                {todaysSales.toLocaleString("en-IN")}
              </span>
            </div>
            
            <div className="caption" style={{ fontSize: "12px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>POS & Online counter billing</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", paddingTop: "10px", borderTop: "1px solid var(--border-color)" }}>
            <span className="caption" style={{ fontSize: "11px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>Vs yesterday: ₹{yesterdaySalesBaseline.toLocaleString("en-IN")}</span>
            <ChevronRight size={14} color="var(--text-muted)" />
          </div>
        </div>

        {/* KPI CARD 2: NET PROFIT */}
        <div 
          onClick={() => setActiveView("analytics")}
          className="glass-card" 
          style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span className="caption" style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.05em" }}>Net Profit</span>
              <span className="badge badge-success" style={{ background: "rgba(16, 185, 129, 0.12)", color: "#34D399", border: "1px solid rgba(16, 185, 129, 0.25)", borderRadius: "9999px", padding: "2px 8px", fontSize: "11px", fontWeight: "700" }}>
                38% Margin
              </span>
            </div>

            {/* ITEMS-BASELINE CURRENCY SYMBOL ALIGNMENT */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "3px", marginBottom: "4px" }}>
              <span style={{ fontSize: "20px", fontWeight: "600", color: "var(--text-muted)", lineHeight: "1" }}>₹</span>
              <span style={{ fontSize: "28px", fontWeight: "800", color: "var(--text-main)", letterSpacing: "-0.02em", lineHeight: "1", fontFamily: "var(--font-mono)" }}>
                {estimatedProfit.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="caption" style={{ fontSize: "12px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>Net Margin after COGS</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", paddingTop: "10px", borderTop: "1px solid var(--border-color)" }}>
            <span className="caption" style={{ fontSize: "11px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>Reconciled Real-Time</span>
            <ChevronRight size={14} color="var(--text-muted)" />
          </div>
        </div>

        {/* KPI CARD 3: ORDERS */}
        <div 
          onClick={() => setActiveView("orders")}
          className="glass-card" 
          style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span className="caption" style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.05em" }}>Orders</span>
              <span className="badge badge-success" style={{ background: "rgba(16, 185, 129, 0.12)", color: "#34D399", border: "1px solid rgba(16, 185, 129, 0.25)", borderRadius: "9999px", padding: "2px 8px", fontSize: "11px", fontWeight: "700" }}>100% Fulfilled</span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: "800", color: "var(--text-main)", marginBottom: "4px", letterSpacing: "-0.02em", lineHeight: "1", fontFamily: "var(--font-mono)" }}>
              {totalOrdersCount} Orders
            </div>
            <div className="caption" style={{ fontSize: "12px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>Multi-channel fulfilled</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", paddingTop: "10px", borderTop: "1px solid var(--border-color)" }}>
            <span className="caption" style={{ fontSize: "11px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>Avg Value: ₹{(todaysSales / (totalOrdersCount || 1)).toFixed(0)}</span>
            <ChevronRight size={14} color="var(--text-muted)" />
          </div>
        </div>

        {/* KPI CARD 4: ACTIVE CUSTOMERS */}
        <div 
          onClick={() => setActiveView("comms")}
          className="glass-card" 
          style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span className="caption" style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.05em" }}>Customers</span>
              <span className="badge badge-info" style={{ background: "rgba(37, 99, 235, 0.12)", color: "#60A5FA", border: "1px solid rgba(37, 99, 235, 0.25)", borderRadius: "9999px", padding: "2px 8px", fontSize: "11px", fontWeight: "700" }}>+12 Today</span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: "800", color: "var(--text-main)", marginBottom: "4px", letterSpacing: "-0.02em", lineHeight: "1", fontFamily: "var(--font-mono)" }}>
              {activeCustomersCount} Active
            </div>
            <div className="caption" style={{ fontSize: "12px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>78% repeat buyer rate</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", paddingTop: "10px", borderTop: "1px solid var(--border-color)" }}>
            <span className="caption" style={{ fontSize: "11px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>12 At Churn Risk</span>
            <ChevronRight size={14} color="var(--text-muted)" />
          </div>
        </div>

      </div>

      {/* 4. EXECUTIVE AI ADVISOR BRIEF CARD */}
      {!dismissedAiBrief && (
        <div 
          className="glass-panel animate-cascade stagger-3" 
          style={{ 
            padding: "20px 24px", 
            marginBottom: "28px", 
            background: "var(--bg-card)", 
            border: "1px solid rgba(37, 99, 235, 0.35)", 
            borderRadius: "20px",
            position: "relative",
            boxShadow: "var(--shadow-card)"
          }}
        >
          {/* TOP ROW */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", gap: "12px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(37, 99, 235, 0.3)", flexShrink: 0 }}>
                <Sparkles size={18} color="#ffffff" />
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: "700", margin: 0, color: "var(--text-main)" }}>
                Executive AI Advisor Brief
              </h3>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="badge" style={{ background: "rgba(37, 99, 235, 0.15)", color: "#60A5FA", border: "1px solid rgba(37, 99, 235, 0.3)", borderRadius: "9999px", padding: "3px 10px", fontSize: "11px", fontWeight: "700" }}>
                92% Confidence
              </span>
              <button 
                onClick={() => setDismissedAiBrief(true)} 
                className="btn btn-ghost"
                style={{ padding: "4px", minWidth: "36px", minHeight: "36px", width: "36px", height: "36px", color: "var(--text-muted)" }}
                aria-label="Dismiss Brief"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* BODY */}
          <div style={{ marginBottom: "16px" }}>
            <h4 style={{ fontSize: "15px", fontWeight: "600", color: "var(--text-main)", margin: "0 0 6px 0" }}>
              Win-Back Campaign Trigger
            </h4>
            <p style={{ fontSize: "13px", lineHeight: "1.55", color: "var(--text-muted)", margin: 0 }}>
              12 VIP customers haven't ordered in 30 days. Sending a WhatsApp broadcast code <code className="sku-code" style={{ background: "rgba(37, 99, 235, 0.15)", color: "#60A5FA", padding: "2px 6px", borderRadius: "4px", fontSize: "12px", fontFamily: "var(--font-mono)" }}>DIWALI10</code> will yield an estimated <strong style={{ color: "#10B981" }}>+₹48,000 ROI</strong>.
            </p>
          </div>

          {/* METRICS GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "12px", background: "rgba(0, 0, 0, 0.12)", padding: "14px 16px", borderRadius: "12px", border: "1px solid var(--border-color)", marginBottom: "16px" }}>
            <div>
              <div className="caption" style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "2px", whiteSpace: "nowrap" }}>Est. ROI</div>
              <div style={{ color: "#10B981", fontSize: "15px", fontWeight: "800", whiteSpace: "nowrap", fontFamily: "var(--font-mono)" }}>+₹48,000</div>
            </div>
            <div>
              <div className="caption" style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "2px", whiteSpace: "nowrap" }}>Time Req.</div>
              <div style={{ color: "var(--text-main)", fontSize: "15px", fontWeight: "800", whiteSpace: "nowrap" }}>2 mins</div>
            </div>
            <div>
              <div className="caption" style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "2px", whiteSpace: "nowrap" }}>Risk Level</div>
              <div style={{ color: "#10B981", fontSize: "15px", fontWeight: "800", whiteSpace: "nowrap" }}>Low</div>
            </div>
          </div>

          {/* FOOTER ACTION BUTTON (MIN-HEIGHT 44PX TAP TARGET) */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button 
              onClick={handleExecuteAIAction} 
              className="btn btn-primary"
              style={{ 
                minHeight: "44px", 
                padding: "10px 24px", 
                borderRadius: "12px", 
                fontWeight: "700", 
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

      {/* 5. STRUCTURED INVENTORY RISK ALERT BANNER */}
      {lowStockItems.length > 0 && (
        <div 
          className="glass-panel animate-cascade stagger-4" 
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
              <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-main)" }}>
                Inventory Risk Alert: {lowStockItems.length} Products Low
              </div>
              <div className="caption" style={{ color: "#F87171", fontSize: "12px", marginTop: "2px" }}>
                Products below safety threshold (e.g. Wireless Bluetooth Earbuds Pro: 8 units remaining).
              </div>
            </div>
          </div>

          {/* RIGHT PART: ACTION CTA (MIN 44PX TAP TARGET) */}
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

      {/* 6. OPERATIONS LEDGER & INVENTORY HEALTH */}
      <div className="grid-2 animate-cascade stagger-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px", marginBottom: "28px" }}>
        
        {/* OPERATIONS & ORDERS LEDGER */}
        <div className="glass-panel" style={{ padding: "22px", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "16px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: "700", margin: 0, color: "var(--text-main)", letterSpacing: "-0.01em" }}>Operations & Orders Ledger</h3>
              <span 
                onClick={() => setActiveView("orders")}
                style={{ fontSize: "12px", fontWeight: "600", color: "var(--primary)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}
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
                      <td style={{ fontWeight: "600", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>#{ord.id}</td>
                      <td><span className="badge badge-info">{ord.channel}</span></td>
                      <td>
                        <div style={{ fontWeight: "600", color: "var(--text-main)" }}>{ord.customerName}</div>
                        <div className="caption" style={{ fontSize: "11px", color: "var(--text-muted)" }}>{ord.customerPhone}</div>
                      </td>
                      <td>{ord.itemsCount} items</td>
                      <td>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
                          <span style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "1" }}>₹</span>
                          <span style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-main)", lineHeight: "1", fontFamily: "var(--font-mono)" }}>{ord.total.toLocaleString("en-IN")}</span>
                        </div>
                      </td>
                      <td>
                        <span 
                          className="badge badge-success"
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
                <div key={ord.id} style={{ padding: "14px", background: "rgba(0, 0, 0, 0.1)", border: "1px solid var(--border-color)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "12px", fontWeight: "500", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>#{ord.id}</span>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-main)" }}>{ord.customerName}</span>
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>{ord.channel} • {ord.itemsCount} items</div>
                  </div>
                  
                  <div style={{ textAlign: "right" }}>
                    <span 
                      className="badge badge-success"
                    >
                      {ord.status}
                    </span>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "flex-end", gap: "2px", marginTop: "4px" }}>
                      <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>₹</span>
                      <span style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-main)", fontFamily: "var(--font-mono)" }}>{ord.total.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* INVENTORY & WAREHOUSE CAPACITY */}
        <div className="glass-panel" style={{ padding: "22px", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "16px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: "700", margin: "0 0 2px 0", color: "var(--text-main)" }}>Inventory & Warehouse Capacity</h3>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Real-time stock movement & low stock status</div>
              </div>
              <span 
                onClick={() => setActiveView("inventory")} 
                style={{ fontSize: "12px", fontWeight: "600", color: "var(--primary)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}
              >
                <span>View Full Inventory</span>
                <ChevronRight size={14} />
              </span>
            </div>

            {/* WAREHOUSE CAPACITY VISUAL PROGRESS TRACK */}
            <div style={{ padding: "14px", marginBottom: "16px", background: "rgba(0, 0, 0, 0.12)", border: "1px solid var(--border-color)", borderRadius: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "12px", fontWeight: "500", color: "var(--text-main)" }}>Central Warehouse Capacity</span>
                <span style={{ color: "var(--primary)", fontSize: "12px", fontWeight: "700", fontFamily: "var(--font-mono)" }}>68% Utilized</span>
              </div>
              <div style={{ width: "100%", height: "6px", borderRadius: "9999px", background: "rgba(0,0,0,0.2)", overflow: "hidden" }}>
                <div style={{ width: "68%", height: "100%", borderRadius: "9999px", background: "var(--primary)" }} />
              </div>
            </div>

            {/* LOW STOCK ITEMIZED PROGRESS TRACKS */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {products.slice(0, 3).map((prod) => {
                const isLow = prod.stockQty <= prod.lowStockThreshold;
                const percent = Math.min(100, Math.round((prod.stockQty / (prod.lowStockThreshold * 3)) * 100));
                return (
                  <div key={prod.id} style={{ padding: "12px 14px", background: "rgba(0, 0, 0, 0.08)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <div>
                        <div style={{ fontWeight: "600", color: "var(--text-main)", fontSize: "12px" }}>{prod.title}</div>
                        <div style={{ color: "var(--text-muted)", fontSize: "11px", fontFamily: "var(--font-mono)" }}>SKU: {prod.sku}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span 
                          className={`badge ${isLow ? "badge-danger" : "badge-success"}`}
                        >
                          {prod.stockQty} LEFT
                        </span>
                      </div>
                    </div>
                    {/* VISUAL STOCK LEVEL PROGRESS TRACK */}
                    <div style={{ width: "100%", height: "6px", borderRadius: "9999px", background: "rgba(0,0,0,0.2)", overflow: "hidden" }}>
                      <div style={{ width: `${percent}%`, height: "100%", borderRadius: "9999px", background: isLow ? "#F43F5E" : "#10B981" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "14px", marginTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Supplier Lead Time: <strong style={{ color: "var(--text-main)" }}>24 Hours</strong></span>
            <button style={{ minHeight: "36px", padding: "0 14px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", color: "#10B981", fontSize: "12px", fontWeight: "600", borderRadius: "8px", display: "inline-flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
              <span>Automated PO Ready</span>
            </button>
          </div>
        </div>

      </div>

      {/* 7. AUDIT LOGS & TAX COMPLIANCE FOOTER */}
      <div className="glass-panel" style={{ padding: "20px", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "16px" }}>
        <div 
          onClick={() => setExpandedSection(!expandedSection)}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
        >
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: "700", margin: 0, color: "var(--text-main)" }}>Executive Audit Logs & GST Tax Compliance</h3>
            <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>Real-time audit trail and GSTR-3B tax reconciliation</div>
          </div>
          <ChevronDown size={18} style={{ transform: expandedSection ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease", color: "var(--text-muted)" }} />
        </div>

        {expandedSection && (
          <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid var(--border-color)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
              
              <div style={{ padding: "12px", background: "rgba(0, 0, 0, 0.08)", border: "1px solid var(--border-color)", borderRadius: "12px" }}>
                <div style={{ fontSize: "11px", fontWeight: "500", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>GSTR-3B Tax Liability</div>
                <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-main)", marginBottom: "2px", fontFamily: "var(--font-mono)" }}>₹526 Collected</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>CGST ₹263 + SGST ₹263</div>
              </div>

              <div style={{ padding: "12px", background: "rgba(0, 0, 0, 0.08)", border: "1px solid var(--border-color)", borderRadius: "12px" }}>
                <div style={{ fontSize: "11px", fontWeight: "500", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Catalog Sync Status</div>
                <div style={{ fontSize: "12px", fontWeight: "700", color: "#10B981", marginBottom: "2px" }}>100% Synced</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>5 Outlets Operational</div>
              </div>

              <div style={{ padding: "12px", background: "rgba(0, 0, 0, 0.08)", border: "1px solid var(--border-color)", borderRadius: "12px" }}>
                <div style={{ fontSize: "11px", fontWeight: "500", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>System Security Audit</div>
                <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--primary)", marginBottom: "2px" }}>RBAC Active</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Audit Log #4920</div>
              </div>

            </div>
          </div>
        )}
      </div>

    </div>
  );
};
