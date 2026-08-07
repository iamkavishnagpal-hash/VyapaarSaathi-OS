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
      
      {/* 1. EXECUTIVE KPI ROW (HORIZONTAL SWIPE CAROUSEL ON MOBILE, EQUAL GRID ON DESKTOP) */}
      <div className="mobile-kpi-carousel hide-on-desktop animate-cascade stagger-1">
        {/* KPI CARD 1: REVENUE */}
        <div onClick={() => setActiveView("pos")} className="glass-card mobile-kpi-card" style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span className="caption" style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Gross Sales</span>
              <span style={{ fontSize: "12px", color: "#34D399", fontWeight: "600", display: "flex", alignItems: "center", gap: "2px" }}>
                <ArrowUpRight size={14} /> +18.4%
              </span>
            </div>
            <div className="num-tabular" style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", marginBottom: "4px" }}>
              ₹{todaysSales.toLocaleString("en-IN")}
            </div>
            <div className="caption" style={{ fontSize: "12px", color: "var(--text-dim)" }}>POS & Online counter billing</div>
          </div>
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "10px", marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="caption" style={{ fontSize: "11px" }}>Vs yesterday: ₹89,100</span>
            <ChevronRight size={14} color="var(--text-muted)" />
          </div>
        </div>

        {/* KPI CARD 2: NET PROFIT */}
        <div onClick={() => setActiveView("analytics")} className="glass-card mobile-kpi-card" style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span className="caption" style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Net Profit</span>
              <span style={{ fontSize: "12px", color: "#34D399", fontWeight: "600", display: "flex", alignItems: "center", gap: "2px" }}>
                <ArrowUpRight size={14} /> 38% Margin
              </span>
            </div>
            <div className="num-tabular" style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", marginBottom: "4px" }}>
              ₹{estimatedProfit.toLocaleString("en-IN")}
            </div>
            <div className="caption" style={{ fontSize: "12px", color: "var(--text-dim)" }}>Net Margin after COGS</div>
          </div>
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "10px", marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="caption" style={{ fontSize: "11px" }}>Reconciled Real-Time</span>
            <ChevronRight size={14} color="var(--text-muted)" />
          </div>
        </div>

        {/* KPI CARD 3: ORDERS */}
        <div onClick={() => setActiveView("orders")} className="glass-card mobile-kpi-card" style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span className="caption" style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Orders</span>
              <span className="badge badge-success">100% Fulfilled</span>
            </div>
            <div className="num-tabular" style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", marginBottom: "4px" }}>
              {totalOrdersCount} Orders
            </div>
            <div className="caption" style={{ fontSize: "12px", color: "var(--text-dim)" }}>Multi-channel fulfilled</div>
          </div>
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "10px", marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="caption" style={{ fontSize: "11px" }}>Avg Value: ₹{(todaysSales / (totalOrdersCount || 1)).toFixed(0)}</span>
            <ChevronRight size={14} color="var(--text-muted)" />
          </div>
        </div>

        {/* KPI CARD 4: ACTIVE CUSTOMERS */}
        <div onClick={() => setActiveView("comms")} className="glass-card mobile-kpi-card" style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span className="caption" style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Customers</span>
              <span style={{ fontSize: "12px", color: "#A78BFA", fontWeight: "600", display: "flex", alignItems: "center", gap: "2px" }}>
                +12 Today
              </span>
            </div>
            <div className="num-tabular" style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", marginBottom: "4px" }}>
              {activeCustomersCount} Active
            </div>
            <div className="caption" style={{ fontSize: "12px", color: "var(--text-dim)" }}>78% repeat buyer rate</div>
          </div>
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "10px", marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="caption" style={{ fontSize: "11px" }}>12 At Churn Risk</span>
            <ChevronRight size={14} color="var(--text-muted)" />
          </div>
        </div>

        {/* KPI CARD 5: CASH POSITION */}
        <div onClick={() => setActiveView("pos")} className="glass-card mobile-kpi-card" style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span className="caption" style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Cash Position</span>
              <span className="badge badge-info">{healthScore}/100 Health</span>
            </div>
            <div className="num-tabular" style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", marginBottom: "4px" }}>
              ₹{todaysSales.toLocaleString("en-IN")}
            </div>
            <div className="caption" style={{ fontSize: "12px", color: "var(--text-dim)" }}>POS & Bank Settlement</div>
          </div>
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "10px", marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="caption" style={{ fontSize: "11px" }}>Instant UPI & Cash</span>
            <ChevronRight size={14} color="var(--text-muted)" />
          </div>
        </div>
      </div>

      {/* DESKTOP KPI ROW (STRICTLY PRESERVED UNCHANGED) */}
      <div className="grid-4 hide-on-mobile animate-cascade stagger-1" style={{ gridTemplateColumns: "repeat(5, 1fr)", gap: "20px", marginBottom: "32px" }}>
        
        {/* KPI CARD 1: REVENUE */}
        <div 
          onClick={() => setActiveView("pos")}
          className="glass-card" 
          style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span className="caption" style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Gross Sales</span>
              <span style={{ fontSize: "12px", color: "#34D399", fontWeight: "600", display: "flex", alignItems: "center", gap: "2px" }}>
                <ArrowUpRight size={14} /> +18.4%
              </span>
            </div>
            {/* MACRO NUMBER (RULE OF 3: LARGEST & BOLDEST ELEMENT) */}
            <div className="num-tabular" style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", marginBottom: "4px" }}>
              ₹{todaysSales.toLocaleString("en-IN")}
            </div>
            <div className="caption" style={{ fontSize: "12px", color: "var(--text-dim)" }}>POS & Online counter billing</div>
          </div>
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "10px", marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="caption" style={{ fontSize: "11px" }}>Vs yesterday: ₹89,100</span>
            <ChevronRight size={14} color="var(--text-muted)" />
          </div>
        </div>

        {/* KPI CARD 2: NET PROFIT */}
        <div 
          onClick={() => setActiveView("analytics")}
          className="glass-card" 
          style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span className="caption" style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Net Profit</span>
              <span style={{ fontSize: "12px", color: "#34D399", fontWeight: "600", display: "flex", alignItems: "center", gap: "2px" }}>
                <ArrowUpRight size={14} /> 38% Margin
              </span>
            </div>
            {/* MACRO NUMBER */}
            <div className="num-tabular" style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", marginBottom: "4px" }}>
              ₹{estimatedProfit.toLocaleString("en-IN")}
            </div>
            <div className="caption" style={{ fontSize: "12px", color: "var(--text-dim)" }}>Net Margin after COGS</div>
          </div>
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "10px", marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="caption" style={{ fontSize: "11px" }}>Reconciled Real-Time</span>
            <ChevronRight size={14} color="var(--text-muted)" />
          </div>
        </div>

        {/* KPI CARD 3: ORDERS */}
        <div 
          onClick={() => setActiveView("orders")}
          className="glass-card" 
          style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span className="caption" style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Orders</span>
              <span className="badge badge-success">100% Fulfilled</span>
            </div>
            {/* MACRO NUMBER */}
            <div className="num-tabular" style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", marginBottom: "4px" }}>
              {totalOrdersCount} Orders
            </div>
            <div className="caption" style={{ fontSize: "12px", color: "var(--text-dim)" }}>Multi-channel fulfilled</div>
          </div>
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "10px", marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="caption" style={{ fontSize: "11px" }}>Avg Value: ₹{(todaysSales / (totalOrdersCount || 1)).toFixed(0)}</span>
            <ChevronRight size={14} color="var(--text-muted)" />
          </div>
        </div>

        {/* KPI CARD 4: ACTIVE CUSTOMERS */}
        <div 
          onClick={() => setActiveView("comms")}
          className="glass-card" 
          style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span className="caption" style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Customers</span>
              <span style={{ fontSize: "12px", color: "#A78BFA", fontWeight: "600", display: "flex", alignItems: "center", gap: "2px" }}>
                +12 Today
              </span>
            </div>
            {/* MACRO NUMBER */}
            <div className="num-tabular" style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", marginBottom: "4px" }}>
              {activeCustomersCount} Active
            </div>
            <div className="caption" style={{ fontSize: "12px", color: "var(--text-dim)" }}>78% repeat buyer rate</div>
          </div>
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "10px", marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="caption" style={{ fontSize: "11px" }}>12 At Churn Risk</span>
            <ChevronRight size={14} color="var(--text-muted)" />
          </div>
        </div>

        {/* KPI CARD 5: CASH POSITION */}
        <div 
          onClick={() => setActiveView("pos")}
          className="glass-card" 
          style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span className="caption" style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Cash Position</span>
              <span className="badge badge-info">{healthScore}/100 Health</span>
            </div>
            {/* MACRO NUMBER */}
            <div className="num-tabular" style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", marginBottom: "4px" }}>
              ₹{todaysSales.toLocaleString("en-IN")}
            </div>
            <div className="caption" style={{ fontSize: "12px", color: "var(--text-dim)" }}>POS & Bank Settlement</div>
          </div>
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "10px", marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="caption" style={{ fontSize: "11px" }}>Instant UPI & Cash</span>
            <ChevronRight size={14} color="var(--text-muted)" />
          </div>
        </div>

      </div>

      {/* 2. AI CEO BRIEF (NEON GLOW HOVER CARD WITH PRIMARY PURPLE CTA ACCENT ONLY) */}
      {!dismissedAiBrief && (
        <div className="glass-panel animate-cascade stagger-2 neon-glow-purple" style={{ padding: "20px 24px", marginBottom: "32px", background: "linear-gradient(135deg, rgba(139, 92, 246, 0.14) 0%, rgba(18, 24, 38, 0.95) 100%)", borderColor: "rgba(139, 92, 246, 0.35)", borderRadius: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1, minWidth: "300px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "14px", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)", flexShrink: 0 }}>
                <Sparkles size={22} color="#ffffff" />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <h3 style={{ fontSize: "16px", margin: 0 }}>AI CEO Brief — Win-Back Campaign Trigger</h3>
                  <span className="badge badge-info">92% Confidence</span>
                </div>
                <div className="caption" style={{ marginTop: "2px" }}>
                  12 VIP customers haven't ordered in 30 days. Sending a WhatsApp broadcast code <code className="sku-code">DIWALI10</code> will yield estimated <strong>+₹48,000 ROI</strong>.
                </div>
              </div>
            </div>

            {/* ACTION METRICS & PRIMARY PURPLE ACCENT BUTTON */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              
              <div style={{ display: "flex", gap: "16px", paddingRight: "16px", borderRight: "1px solid var(--border-color)" }}>
                <div>
                  <div className="caption" style={{ fontSize: "11px" }}>Est. ROI</div>
                  <div className="num-tabular" style={{ color: "#34D399", fontSize: "14px" }}>+₹48,000</div>
                </div>
                <div>
                  <div className="caption" style={{ fontSize: "11px" }}>Time Req.</div>
                  <div className="num-tabular" style={{ color: "#ffffff", fontSize: "14px" }}>2 mins</div>
                </div>
                <div>
                  <div className="caption" style={{ fontSize: "11px" }}>Risk</div>
                  <div className="num-tabular" style={{ color: "#34D399", fontSize: "14px" }}>Low</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {/* PRIMARY ACCENT PURPLE BUTTON (RESERVED ONLY FOR HIGH PRIORITY AI ACTION) */}
                <button 
                  onClick={handleExecuteAIAction} 
                  className="btn btn-primary"
                  style={{ minHeight: "42px", padding: "8px 16px" }}
                >
                  {executedAction ? (
                    <>
                      <Check size={16} />
                      <span>Campaign Triggered!</span>
                    </>
                  ) : (
                    <>
                      <Zap size={16} />
                      <span>Execute Action</span>
                    </>
                  )}
                </button>

                <button 
                  onClick={() => setDismissedAiBrief(true)} 
                  className="btn btn-ghost"
                  style={{ padding: "8px", minWidth: "36px", minHeight: "36px" }}
                  aria-label="Dismiss Brief"
                >
                  <X size={18} />
                </button>
              </div>

            </div>

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
        <div className="glass-panel" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h3 style={{ fontSize: "18px", margin: "0 0 2px 0" }}>Operations & Orders Ledger</h3>
              <div className="caption">Live fulfillment status & customer transactions</div>
            </div>
            <button onClick={() => setActiveView("orders")} className="btn btn-secondary" style={{ minHeight: "38px", fontSize: "13px" }}>
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
                    <td className="num-tabular" style={{ color: "#fff" }}>₹{ord.total.toLocaleString("en-IN")}</td>
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
          <div className="hide-on-desktop" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {orders.slice(0, 5).map((ord) => (
              <div key={ord.id} className="glass-card" style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: "700", color: "var(--primary)", fontSize: "15px" }}>{ord.id}</span>
                  <span className={`badge ${ord.status === "Completed" ? "badge-success" : "badge-warning"}`}>
                    {ord.status}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div>
                    <div style={{ fontWeight: "700", color: "#fff", fontSize: "15px" }}>{ord.customerName}</div>
                    <div className="caption" style={{ fontSize: "12px" }}>{ord.channel} • {ord.itemsCount} items</div>
                  </div>
                  <div className="num-tabular" style={{ fontSize: "18px", color: "#fff" }}>
                    ₹{ord.total.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: INVENTORY HEALTH & WAREHOUSE CAPACITY */}
        <div className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <h3 style={{ fontSize: "18px", margin: "0 0 2px 0" }}>Inventory & Warehouse Capacity</h3>
                <div className="caption">Real-time stock movement & low stock status</div>
              </div>
              {/* SUBTLE TEXT LINK (REPLACED DUPLICATE MANAGE STOCK BUTTON) */}
              <span 
                onClick={() => setActiveView("inventory")} 
                style={{ fontSize: "13px", fontWeight: "600", color: "var(--primary)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}
              >
                <span>View Full Inventory</span>
                <ChevronRight size={14} />
              </span>
            </div>

            {/* WAREHOUSE CAPACITY PROGRESS INDICATOR */}
            <div className="glass-card" style={{ padding: "16px", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span className="caption" style={{ fontWeight: "700" }}>Central Warehouse Capacity</span>
                <span className="num-tabular" style={{ color: "#34D399", fontSize: "14px" }}>68% Utilized</span>
              </div>
              <div style={{ width: "100%", height: "8px", borderRadius: "4px", background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                <div style={{ width: "68%", height: "100%", borderRadius: "4px", background: "linear-gradient(90deg, #10B981, #3B82F6)" }} />
              </div>
            </div>

            {/* LOW STOCK ITEMIZED LIST */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {products.slice(0, 3).map((prod) => (
                <div key={prod.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "rgba(255,255,255,0.03)", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
                  <div>
                    <div style={{ fontWeight: "700", color: "#fff" }}>{prod.title}</div>
                    <div className="sku-code" style={{ color: "var(--text-muted)" }}>SKU: {prod.sku} • {prod.category}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="num-tabular" style={{ color: prod.stockQty <= prod.lowStockThreshold ? "#F87171" : "#34D399" }}>
                      {prod.stockQty} left
                    </div>
                    <div className="caption" style={{ fontSize: "11px" }}>Threshold: {prod.lowStockThreshold}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "14px", marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="caption">Supplier Lead Time: <strong>24 Hours</strong></span>
            <span className="badge badge-success">Automated PO Ready</span>
          </div>
        </div>

      </div>

      {/* 5. AUDIT ACTIVITY & REPORTS (PROGRESSIVE DISCLOSURE) */}
      <div className="glass-panel animate-cascade stagger-5" style={{ padding: "20px 24px" }}>
        <div 
          onClick={() => setExpandedSection(!expandedSection)}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
        >
          <div>
            <h3 style={{ fontSize: "16px", margin: 0 }}>Executive Audit Logs & GST Tax Compliance</h3>
            <div className="caption">Click to inspect real-time audit trail and GSTR-3B tax reconciliation</div>
          </div>
          <ChevronDown size={20} style={{ transform: expandedSection ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }} />
        </div>

        {expandedSection && (
          <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--border-color)" }}>
            <div className="grid-3" style={{ gap: "20px" }}>
              
              <div className="glass-card" style={{ padding: "16px" }}>
                <div className="caption" style={{ fontWeight: "700", marginBottom: "6px" }}>GSTR-3B Tax Liability</div>
                <div className="num-tabular" style={{ fontSize: "20px", color: "#ffffff", marginBottom: "4px" }}>₹526 Collected</div>
                <div className="caption">CGST ₹263 + SGST ₹263</div>
              </div>

              <div className="glass-card" style={{ padding: "16px" }}>
                <div className="caption" style={{ fontWeight: "700", marginBottom: "6px" }}>Catalog Sync Status</div>
                <div className="num-tabular" style={{ fontSize: "20px", color: "#34D399", marginBottom: "4px" }}>100% Synced</div>
                <div className="caption">5 Branch Outlets Operational</div>
              </div>

              <div className="glass-card" style={{ padding: "16px" }}>
                <div className="caption" style={{ fontWeight: "700", marginBottom: "6px" }}>System Security Audit</div>
                <div className="num-tabular" style={{ fontSize: "20px", color: "#A78BFA", marginBottom: "4px" }}>RBAC Active</div>
                <div className="caption">Owner Authorization Logged</div>
              </div>

            </div>
          </div>
        )}
      </div>

    </div>
  );
};
