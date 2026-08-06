import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { 
  IndianRupee, 
  ShoppingBag, 
  AlertTriangle, 
  Sparkles, 
  ArrowUpRight, 
  Receipt, 
  ChevronRight,
  ShieldCheck,
  ChevronDown,
  Zap,
  Check
} from "lucide-react";

export const DashboardView = () => {
  const { orders, products, t, setActiveView, currentStore } = useRetail();

  const [expandedSection, setExpandedSection] = useState("all");
  const [executedAction, setExecutedAction] = useState(false);

  // Priority 1 Metrics
  const todaysSales = orders.reduce((acc, o) => acc + o.total, 0);
  const totalOrdersCount = orders.length;
  const estimatedProfit = Math.round(todaysSales * 0.38);
  const lowStockItems = products.filter((p) => p.stockQty <= p.lowStockThreshold);

  // Business Health Score Calculation
  const healthScore = Math.max(70, 100 - lowStockItems.length * 5);

  const handleExecuteAIAction = () => {
    setExecutedAction(true);
    setTimeout(() => {
      setActiveView("comms");
    }, 800);
  };

  return (
    <div className="view-container">
      
      {/* ABOVE THE FOLD — STICKY TOP BUSINESS HEALTH & SUMMARY */}
      <div className="glass-panel" style={{ padding: "16px 20px", marginBottom: "24px", background: "linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(18, 24, 38, 0.95) 100%)", borderColor: "rgba(139, 92, 246, 0.3)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ShieldCheck size={22} color="#10B981" />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h2 style={{ fontSize: "20px", margin: 0 }}>{currentStore.name}</h2>
                <span className="badge badge-success">{healthScore}/100 Health</span>
              </div>
              <div className="caption">Unified Operating System • GSTIN: {currentStore.GSTIN}</div>
            </div>
          </div>

          {/* LEVEL 2: SINGLE PRIMARY CTA ABOVE THE FOLD */}
          <button 
            onClick={() => setActiveView("pos")} 
            className="btn btn-primary"
            style={{ width: "auto" }}
          >
            <Receipt size={18} />
            <span>{t("newSale")}</span>
          </button>
        </div>
      </div>

      {/* PRIORITY 1: REVENUE, ALERTS & ACTIONABLE AI CEO CO-PILOT CARD */}
      <div className="grid-2" style={{ marginBottom: "24px" }}>
        
        {/* PRIORITY 1 HERO CARD: TODAY'S REVENUE & CASH POSITION */}
        <div className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <div>
                <h3 style={{ fontSize: "16px", margin: "0 0 2px 0" }}>Today's Revenue</h3>
                <div className="caption">Gross sales across POS & online storefront</div>
              </div>
              <div style={{ background: "rgba(139, 92, 246, 0.15)", padding: "10px", borderRadius: "12px" }}>
                <IndianRupee size={22} color="var(--primary)" />
              </div>
            </div>

            {/* Primary KPI */}
            <div className="num-tabular" style={{ fontSize: "32px", fontWeight: "800", color: "#ffffff", margin: "12px 0 6px 0" }}>
              ₹{todaysSales.toLocaleString("en-IN")}
            </div>

            {/* Trend Indicator & Context */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "13px", color: "#34D399", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                <ArrowUpRight size={16} /> +18.4% vs yesterday
              </span>
              <span className="caption">• Net Profit: ₹{estimatedProfit.toLocaleString("en-IN")} (38%)</span>
            </div>
          </div>

          <div style={{ marginTop: "20px", paddingTop: "14px", borderTop: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="caption">Active Cash Position: <strong>₹{todaysSales.toLocaleString("en-IN")}</strong></span>
            <button onClick={() => setActiveView("pos")} className="btn btn-secondary" style={{ minHeight: "40px", padding: "6px 12px", fontSize: "13px" }}>
              <span>View POS Ledger</span>
            </button>
          </div>
        </div>

        {/* PRIORITY 1 AI CEO CO-PILOT CARD (EXACT ACTIONABLE SAAS SPEC) */}
        <div className="glass-card" style={{ padding: "24px", background: "linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(18, 24, 38, 0.95) 100%)", borderColor: "rgba(139, 92, 246, 0.35)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "10px" }}>
                <Sparkles size={18} color="#ffffff" />
              </div>
              <div>
                <h3 style={{ fontSize: "16px", margin: 0 }}>Next Best Action</h3>
                <div className="caption">AI CEO Co-Pilot Recommendation</div>
              </div>
            </div>
            <span className="badge badge-info">92% Confidence</span>
          </div>

          <p style={{ fontSize: "14px", color: "var(--text-main)", margin: "0 0 16px 0", lineHeight: "1.5" }}>
            <strong>Increase WhatsApp Campaign:</strong> 12 VIP customers haven't purchased in 30 days. Trigger personalized discount broadcast now.
          </p>

          {/* STRUCTURED METRICS: ROI, CONFIDENCE, TIME, RISK */}
          <div className="grid-4" style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", padding: "12px", background: "rgba(0,0,0,0.3)", borderRadius: "12px", marginBottom: "16px" }}>
            <div>
              <div className="caption" style={{ fontSize: "11px" }}>Expected ROI</div>
              <div className="num-tabular" style={{ color: "#34D399", fontSize: "14px" }}>+₹48,000</div>
            </div>

            <div>
              <div className="caption" style={{ fontSize: "11px" }}>Confidence</div>
              <div className="num-tabular" style={{ color: "#A78BFA", fontSize: "14px" }}>92%</div>
            </div>

            <div>
              <div className="caption" style={{ fontSize: "11px" }}>Time Req.</div>
              <div className="num-tabular" style={{ color: "#ffffff", fontSize: "14px" }}>2 mins</div>
            </div>

            <div>
              <div className="caption" style={{ fontSize: "11px" }}>Risk Level</div>
              <div className="num-tabular" style={{ color: "#34D399", fontSize: "14px" }}>Low</div>
            </div>
          </div>

          {/* SINGLE-CLICK EXECUTE BUTTON */}
          <button 
            onClick={handleExecuteAIAction} 
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
          >
            {executedAction ? (
              <>
                <Check size={18} />
                <span>Campaign Executed!</span>
              </>
            ) : (
              <>
                <Zap size={18} />
                <span>Execute Recommendation</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* PRIORITY 2: ORDERS & INVENTORY STATUS CARDS */}
      <div className="grid-2" style={{ marginBottom: "24px" }}>
        
        {/* PRIORITY 2 CARD: ORDERS OVERVIEW */}
        <div className="glass-card" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <div>
              <h3 style={{ fontSize: "16px", margin: "0 0 2px 0" }}>Orders & Fulfillment</h3>
              <div className="caption">Total orders processed today</div>
            </div>
            <div style={{ background: "rgba(16, 185, 129, 0.15)", padding: "8px", borderRadius: "10px" }}>
              <ShoppingBag size={20} color="#10B981" />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "12px" }}>
            <div className="num-tabular" style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff" }}>
              {totalOrdersCount} Orders
            </div>
            <span className="badge badge-success">100% Fulfilled</span>
          </div>

          <button onClick={() => setActiveView("orders")} className="btn btn-secondary" style={{ width: "100%", justifyContent: "space-between", minHeight: "42px" }}>
            <span>Manage All Orders</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* PRIORITY 2 CARD: INVENTORY HEALTH & CRITICAL ALERTS */}
        <div className="glass-card" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <div>
              <h3 style={{ fontSize: "16px", margin: "0 0 2px 0" }}>Inventory Critical Alerts</h3>
              <div className="caption">Items below safety reorder threshold</div>
            </div>
            <div style={{ background: "rgba(244, 63, 94, 0.15)", padding: "8px", borderRadius: "10px" }}>
              <AlertTriangle size={20} color="#F43F5E" />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "12px" }}>
            <div className="num-tabular" style={{ fontSize: "28px", fontWeight: "800", color: lowStockItems.length > 0 ? "#F87171" : "#34D399" }}>
              {lowStockItems.length} Low Stock
            </div>
            <span className={`badge ${lowStockItems.length > 0 ? "badge-danger" : "badge-success"}`}>
              {lowStockItems.length > 0 ? "Action Required" : "Optimal"}
            </span>
          </div>

          <button onClick={() => setActiveView("inventory")} className="btn btn-secondary" style={{ width: "100%", justifyContent: "space-between", minHeight: "42px" }}>
            <span>Restock Inventory</span>
            <ChevronRight size={16} />
          </button>
        </div>

      </div>

      {/* PRIORITY 3 & 4: PROGRESSIVE DISCLOSURE EXPANDABLE AUDIT & TRANSACTIONS */}
      <div className="glass-panel" style={{ padding: "20px" }}>
        <div 
          onClick={() => setExpandedSection(expandedSection === "all" ? "none" : "all")}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
        >
          <div>
            <h3 style={{ fontSize: "16px", margin: 0 }}>Priority 3 & 4 — Recent Transactions & Real-Time Audit Log</h3>
            <div className="caption">Click to expand or collapse detailed ledger</div>
          </div>
          <ChevronDown size={20} style={{ transform: expandedSection === "all" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }} />
        </div>

        {expandedSection === "all" && (
          <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--border-color)" }}>
            {/* Desktop Table View */}
            <div className="table-responsive hide-on-mobile">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Channel</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total Bill</th>
                    <th>Payment</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((ord) => (
                    <tr key={ord.id}>
                      <td style={{ fontWeight: "700", color: "var(--primary)" }}>{ord.id}</td>
                      <td><span className="badge badge-info">{ord.channel}</span></td>
                      <td>
                        <div style={{ fontWeight: "600" }}>{ord.customerName}</div>
                        <div className="caption">{ord.customerPhone}</div>
                      </td>
                      <td>{ord.itemsCount} items</td>
                      <td className="num-tabular" style={{ color: "#fff" }}>₹{ord.total.toLocaleString("en-IN")}</td>
                      <td>{ord.paymentMethod}</td>
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

            {/* Mobile Card View */}
            <div className="hide-on-desktop" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {orders.slice(0, 5).map((ord) => (
                <div key={ord.id} className="glass-card" style={{ padding: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ fontWeight: "700", color: "var(--primary)" }}>{ord.id}</span>
                    <span className={`badge ${ord.status === "Completed" ? "badge-success" : "badge-warning"}`}>
                      {ord.status}
                    </span>
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#fff", marginBottom: "4px" }}>
                    {ord.customerName}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="caption">{ord.itemsCount} items • {ord.paymentMethod}</span>
                    <span className="num-tabular" style={{ fontSize: "16px", color: "#fff" }}>
                      ₹{ord.total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
