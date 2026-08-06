import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { 
  AlertTriangle, 
  Sparkles, 
  ArrowUpRight, 
  ChevronRight,
  Zap,
  Check,
  X
} from "lucide-react";

export const DashboardView = () => {
  const { orders, products, customers, setActiveView, currency } = useRetail();

  const [dismissedAiBrief, setDismissedAiBrief] = useState(false);
  const [executedAction, setExecutedAction] = useState(false);

  // Financial Metrics
  const todaysSales = orders.reduce((acc, o) => acc + o.total, 0);
  const totalOrdersCount = orders.length;
  const estimatedProfit = Math.round(todaysSales * 0.38);
  const lowStockItems = products.filter((p) => p.stockQty <= p.lowStockThreshold);
  const activeCustomersCount = customers ? customers.length : 182;
  const healthScore = Math.max(70, 100 - lowStockItems.length * 5);

  const currencySymbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : currency === "AED" ? "د.إ" : "₹";

  const handleExecuteAIAction = () => {
    setExecutedAction(true);
    setTimeout(() => {
      setActiveView("comms");
    }, 900);
  };

  return (
    <div className="view-container" style={{ maxWidth: "1600px", margin: "0 auto", padding: "32px" }}>
      
      {/* 1. EXECUTIVE KPI ROW (STAGGERED ANIMATION & RULE OF 3 TYPOGRAPHY) */}
      <div className="grid-4" style={{ gridTemplateColumns: "repeat(5, 1fr)", gap: "20px", marginBottom: "32px" }}>
        
        {/* KPI CARD 1: REVENUE */}
        <div 
          onClick={() => setActiveView("pos")}
          className="glass-card animate-stagger-1" 
          style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span className="caption" style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>Gross Sales</span>
              <span style={{ fontSize: "12px", color: "#34D399", fontWeight: "600", display: "flex", alignItems: "center", gap: "2px" }}>
                <ArrowUpRight size={14} /> +18.4%
              </span>
            </div>
            {/* RULE OF 3: MACRO NUMBERS ARE THE LARGEST & BOLDEST (32PX) */}
            <div className="num-tabular" style={{ fontSize: "32px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.03em", marginBottom: "4px" }}>
              {currencySymbol}{todaysSales.toLocaleString("en-IN")}
            </div>
            <div className="caption" style={{ fontSize: "12px", color: "var(--text-muted)" }}>POS & Storefront Billing</div>
          </div>
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "10px", marginTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="caption" style={{ fontSize: "11px", color: "var(--text-dim)" }}>Vs yesterday: {currencySymbol}89,100</span>
            <ChevronRight size={14} color="var(--text-muted)" />
          </div>
        </div>

        {/* KPI CARD 2: NET PROFIT */}
        <div 
          onClick={() => setActiveView("analytics")}
          className="glass-card animate-stagger-2" 
          style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span className="caption" style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>Net Profit</span>
              <span style={{ fontSize: "12px", color: "#34D399", fontWeight: "600", display: "flex", alignItems: "center", gap: "2px" }}>
                <ArrowUpRight size={14} /> 38% Margin
              </span>
            </div>
            <div className="num-tabular" style={{ fontSize: "32px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.03em", marginBottom: "4px" }}>
              {currencySymbol}{estimatedProfit.toLocaleString("en-IN")}
            </div>
            <div className="caption" style={{ fontSize: "12px", color: "var(--text-muted)" }}>Net Margin after COGS</div>
          </div>
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "10px", marginTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="caption" style={{ fontSize: "11px", color: "var(--text-dim)" }}>Reconciled Real-Time</span>
            <ChevronRight size={14} color="var(--text-muted)" />
          </div>
        </div>

        {/* KPI CARD 3: ORDERS */}
        <div 
          onClick={() => setActiveView("orders")}
          className="glass-card animate-stagger-3" 
          style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span className="caption" style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>Orders Today</span>
              <span className="badge badge-success">100% Fulfilled</span>
            </div>
            <div className="num-tabular" style={{ fontSize: "32px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.03em", marginBottom: "4px" }}>
              {totalOrdersCount}
            </div>
            <div className="caption" style={{ fontSize: "12px", color: "var(--text-muted)" }}>Multi-channel fulfilled</div>
          </div>
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "10px", marginTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="caption" style={{ fontSize: "11px", color: "var(--text-dim)" }}>Avg Value: {currencySymbol}{(todaysSales / (totalOrdersCount || 1)).toFixed(0)}</span>
            <ChevronRight size={14} color="var(--text-muted)" />
          </div>
        </div>

        {/* KPI CARD 4: ACTIVE CUSTOMERS */}
        <div 
          onClick={() => setActiveView("comms")}
          className="glass-card animate-stagger-4" 
          style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span className="caption" style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>Active Buyers</span>
              <span style={{ fontSize: "12px", color: "#A78BFA", fontWeight: "600", display: "flex", alignItems: "center", gap: "2px" }}>
                +12 Today
              </span>
            </div>
            <div className="num-tabular" style={{ fontSize: "32px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.03em", marginBottom: "4px" }}>
              {activeCustomersCount}
            </div>
            <div className="caption" style={{ fontSize: "12px", color: "var(--text-muted)" }}>78% repeat buyer rate</div>
          </div>
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "10px", marginTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="caption" style={{ fontSize: "11px", color: "var(--text-dim)" }}>12 At Churn Risk</span>
            <ChevronRight size={14} color="var(--text-muted)" />
          </div>
        </div>

        {/* KPI CARD 5: CASH POSITION */}
        <div 
          onClick={() => setActiveView("pos")}
          className="glass-card animate-stagger-5" 
          style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span className="caption" style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>Cash Position</span>
              <span className="badge badge-info">{healthScore}/100 Health</span>
            </div>
            <div className="num-tabular" style={{ fontSize: "32px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.03em", marginBottom: "4px" }}>
              {currencySymbol}{todaysSales.toLocaleString("en-IN")}
            </div>
            <div className="caption" style={{ fontSize: "12px", color: "var(--text-muted)" }}>Liquid Cash & Bank</div>
          </div>
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "10px", marginTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="caption" style={{ fontSize: "11px", color: "var(--text-dim)" }}>Instant UPI & Cash</span>
            <ChevronRight size={14} color="var(--text-muted)" />
          </div>
        </div>

      </div>

      {/* 2. AI CEO BRIEF (NEON GLOW & RESERVED PURPLE ACCENT) */}
      {!dismissedAiBrief && (
        <div 
          className="glass-card-ai animate-stagger-1" 
          style={{ padding: "20px 24px", marginBottom: "32px", borderRadius: "20px" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1, minWidth: "300px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "14px", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(139, 92, 246, 0.6)", flexShrink: 0 }}>
                <Sparkles size={22} color="#ffffff" />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <h3 style={{ fontSize: "16px", margin: 0, color: "#fff" }}>AI CEO Brief — Win-Back Campaign Trigger</h3>
                  <span className="badge badge-info">92% Confidence</span>
                </div>
                <div className="caption" style={{ marginTop: "2px", color: "var(--text-muted)" }}>
                  12 VIP customers haven't ordered in 30 days. Sending a WhatsApp broadcast code <code className="sku-code">DIWALI10</code> will yield estimated <strong>+{currencySymbol}48,000 ROI</strong>.
                </div>
              </div>
            </div>

            {/* ACTION METRICS & PRIMARY PURPLE CTA BUTTON */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              
              <div style={{ display: "flex", gap: "16px", paddingRight: "16px", borderRight: "1px solid var(--border-color)" }}>
                <div>
                  <div className="caption" style={{ fontSize: "11px", color: "var(--text-dim)" }}>Est. ROI</div>
                  <div className="num-tabular" style={{ color: "#34D399", fontSize: "14px", fontWeight: "700" }}>+{currencySymbol}48,000</div>
                </div>
                <div>
                  <div className="caption" style={{ fontSize: "11px", color: "var(--text-dim)" }}>Time Req.</div>
                  <div className="num-tabular" style={{ color: "#ffffff", fontSize: "14px", fontWeight: "700" }}>2 mins</div>
                </div>
                <div>
                  <div className="caption" style={{ fontSize: "11px", color: "var(--text-dim)" }}>Risk</div>
                  <div className="num-tabular" style={{ color: "#34D399", fontSize: "14px", fontWeight: "700" }}>Low</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {/* PRIMARY VIOLET ACCENT BUTTON RESERVED ONLY FOR HIGH PRIORITY AI ACTION */}
                <button 
                  onClick={handleExecuteAIAction} 
                  className="btn btn-primary"
                  style={{ minHeight: "42px", padding: "8px 18px", boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)" }}
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
        <div className="glass-panel animate-stagger-2" style={{ padding: "14px 20px", marginBottom: "32px", background: "rgba(244, 63, 94, 0.12)", borderColor: "rgba(244, 63, 94, 0.3)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <AlertTriangle size={20} color="#F43F5E" />
            <div>
              <span style={{ fontSize: "14px", fontWeight: "700", color: "#ffffff" }}>Inventory Risk Alert: </span>
              <span className="caption" style={{ color: "#F87171" }}>
                {lowStockItems.length} products below safety reorder threshold (e.g. Wireless Earbuds Pro: 8 units left).
              </span>
            </div>
          </div>
          {/* PRIMARY RED DANGER BUTTON FOR CRITICAL INVENTORY ALERT */}
          <button onClick={() => setActiveView("inventory")} className="btn btn-danger" style={{ minHeight: "38px", padding: "6px 14px", fontSize: "13px" }}>
            <span>Restock Inventory</span>
          </button>
        </div>
      )}

      {/* 4. OPERATIONS (TWO-COLUMN DESKTOP GRID) */}
      <div className="grid-2 animate-stagger-3" style={{ gridTemplateColumns: "1.2fr 1fr", gap: "32px", marginBottom: "32px" }}>
        
        {/* LEFT COLUMN: ORDERS & OPERATIONS LEDGER */}
        <div className="glass-panel" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h3 style={{ fontSize: "18px", margin: "0 0 2px 0", color: "#fff" }}>Operations & Orders Ledger</h3>
              <div className="caption" style={{ color: "var(--text-muted)" }}>Live fulfillment status & customer transactions</div>
            </div>
            {/* SUBTLE SECONDARY BUTTON (NO COMPETING PRIMARY ACCENT) */}
            <button onClick={() => setActiveView("orders")} className="btn btn-secondary" style={{ minHeight: "38px", fontSize: "13px" }}>
              <span>View All Orders</span>
            </button>
          </div>

          <div className="table-responsive">
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
                      <div style={{ fontWeight: "700", color: "#fff" }}>{ord.customerName}</div>
                      <div className="caption" style={{ fontSize: "11px", color: "var(--text-dim)" }}>{ord.customerPhone}</div>
                    </td>
                    <td>{ord.itemsCount} items</td>
                    <td className="num-tabular" style={{ color: "#fff", fontWeight: "700" }}>{currencySymbol}{ord.total.toLocaleString("en-IN")}</td>
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
        </div>

        {/* RIGHT COLUMN: INVENTORY HEALTH & WAREHOUSE CAPACITY */}
        <div className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <h3 style={{ fontSize: "18px", margin: "0 0 2px 0", color: "#fff" }}>Inventory & Warehouse Capacity</h3>
                <div className="caption" style={{ color: "var(--text-muted)" }}>Real-time stock movement & low stock status</div>
              </div>
              {/* SUBTLE TEXT LINK (NO DUPLICATE ACTION BUTTON) */}
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
                <span className="caption" style={{ fontWeight: "700", color: "var(--text-muted)" }}>Central Warehouse Capacity</span>
                <span className="num-tabular" style={{ color: "#34D399", fontSize: "14px", fontWeight: "700" }}>68% Utilized</span>
              </div>
              <div style={{ width: "100%", height: "8px", borderRadius: "4px", background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                <div style={{ width: "68%", height: "100%", borderRadius: "4px", background: "linear-gradient(90deg, #10B981, #3B82F6)" }} />
              </div>
            </div>

            {/* LOW STOCK ITEMIZED LIST */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {lowStockItems.slice(0, 3).map((item) => (
                <div key={item.id} className="glass-card" style={{ padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "#fff" }}>{item.title}</div>
                    <div className="caption" style={{ fontSize: "11px", color: "var(--text-dim)" }}>SKU: {item.sku} • Cost: {currencySymbol}{item.costPrice}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span className="badge badge-danger">{item.stockQty} left</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
