import React from "react";
import { useRetail } from "../context/RetailContext";
import { 
  IndianRupee, 
  ShoppingBag, 
  TrendingUp, 
  AlertTriangle, 
  Sparkles, 
  Activity, 
  ArrowUpRight, 
  Receipt, 
  Megaphone,
  ChevronRight
} from "lucide-react";

export const DashboardView = () => {
  const { orders, products, events, t, setActiveView, currentStore } = useRetail();

  // Metrics calculations
  const todaysSales = orders.reduce((acc, o) => acc + o.total, 0);
  const totalOrdersCount = orders.length;
  const estimatedProfit = Math.round(todaysSales * 0.38); // estimated 38% margin
  const lowStockItems = products.filter((p) => p.stockQty <= p.lowStockThreshold);

  return (
    <div className="view-container">
      
      {/* LEVEL 1 & LEVEL 2: HERO HEADER & SINGLE PRIMARY CTA */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div className="caption" style={{ textTransform: "uppercase", letterSpacing: "1px", color: "var(--primary)", fontWeight: "700" }}>
              {currentStore.name} Overview
            </div>
            <h2>{t("dashboard")}</h2>
            <p className="caption" style={{ margin: "4px 0 0 0" }}>
              GSTIN: {currentStore.GSTIN} • {currentStore.city}
            </p>
          </div>

          {/* SINGLE PRIMARY CTA PER SCREEN SPECIFICATION */}
          <button 
            onClick={() => setActiveView("pos")} 
            className="btn btn-primary"
            style={{ width: "auto", minWidth: "160px" }}
          >
            <Receipt size={18} />
            <span>{t("newSale")}</span>
          </button>
        </div>
      </div>

      {/* LEVEL 1 & LEVEL 3 KPI CARDS */}
      <div className="grid-4" style={{ marginBottom: "32px" }}>
        
        {/* LEVEL 1: HERO PRIMARY KPI - TODAY'S SALES */}
        <div className="glass-panel" style={{ padding: "24px", borderColor: "rgba(99, 102, 241, 0.4)", background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(18, 24, 38, 0.9) 100%)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span className="caption" style={{ fontWeight: "700", color: "var(--primary)" }}>LEVEL 1 • {t("todaysSales")}</span>
            <div style={{ background: "var(--primary-glow)", padding: "10px", borderRadius: "12px" }}>
              <IndianRupee size={22} color="var(--primary)" />
            </div>
          </div>
          <div style={{ fontSize: "32px", fontWeight: "800", color: "#fff", marginBottom: "6px" }}>
            ₹{todaysSales.toLocaleString("en-IN")}
          </div>
          <div style={{ fontSize: "14px", color: "#34d399", display: "flex", alignItems: "center", gap: "4px", fontWeight: "600" }}>
            <ArrowUpRight size={16} />
            <span>+18.4% vs yesterday</span>
          </div>
        </div>

        {/* LEVEL 3: SECONDARY KPI - ORDERS */}
        <div className="glass-panel" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span className="caption" style={{ fontWeight: "600" }}>{t("totalOrders")}</span>
            <div style={{ background: "rgba(16, 185, 129, 0.15)", padding: "10px", borderRadius: "12px" }}>
              <ShoppingBag size={22} color="#10b981" />
            </div>
          </div>
          <div style={{ fontSize: "28px", fontWeight: "800", color: "#fff", marginBottom: "6px" }}>
            {totalOrdersCount}
          </div>
          <div className="caption">POS & Storefront Combined</div>
        </div>

        {/* LEVEL 3: SECONDARY KPI - PROFIT */}
        <div className="glass-panel" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span className="caption" style={{ fontWeight: "600" }}>{t("netProfit")}</span>
            <div style={{ background: "rgba(245, 158, 11, 0.15)", padding: "10px", borderRadius: "12px" }}>
              <TrendingUp size={22} color="#f59e0b" />
            </div>
          </div>
          <div style={{ fontSize: "28px", fontWeight: "800", color: "#fff", marginBottom: "6px" }}>
            ₹{estimatedProfit.toLocaleString("en-IN")}
          </div>
          <div className="caption" style={{ color: "#fbbf24" }}>Est. margin ~38%</div>
        </div>

        {/* LEVEL 3: SECONDARY KPI - LOW STOCK */}
        <div className="glass-panel" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span className="caption" style={{ fontWeight: "600" }}>{t("lowStockAlerts")}</span>
            <div style={{ background: "rgba(239, 68, 68, 0.15)", padding: "10px", borderRadius: "12px" }}>
              <AlertTriangle size={22} color="#ef4444" />
            </div>
          </div>
          <div style={{ fontSize: "28px", fontWeight: "800", color: "#fff", marginBottom: "6px" }}>
            {lowStockItems.length} Items
          </div>
          <div className="caption" style={{ color: "#f87171" }}>Action required</div>
        </div>

      </div>

      {/* AI ASSISTANT RECOMMENDATIONS & LIVE AUDIT */}
      <div className="grid-2" style={{ marginBottom: "32px" }}>
        
        {/* AI INSIGHT CARD (ASSISTANT NOT CHATBOT SPECIFICATION) */}
        <div className="glass-panel" style={{ padding: "24px", background: "linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(168, 85, 247, 0.06) 100%)", borderColor: "rgba(99, 102, 241, 0.3)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ background: "var(--primary)", padding: "10px", borderRadius: "12px" }}>
              <Sparkles size={22} color="#fff" />
            </div>
            <div>
              <h3 style={{ margin: 0 }}>{t("aiBriefTitle")}</h3>
              <span className="caption">Daily Store Recommendations</span>
            </div>
          </div>

          <div style={{ fontSize: "16px", lineHeight: "1.6", color: "var(--text-main)", marginBottom: "20px" }}>
            <p style={{ margin: "0 0 12px 0" }}>
              🚀 <strong>Apparel Surge:</strong> Sales up 32% today led by <em>Cotton Printed Kurti Sets</em>.
            </p>
            <p style={{ margin: "0 0 12px 0" }}>
              ⚠️ <strong>Low Stock Alert:</strong> <em>Wireless Bluetooth Earbuds Pro</em> has 8 units left.
            </p>
            <p style={{ margin: 0 }}>
              💡 <strong>Retention Trigger:</strong> 12 VIP customers haven't ordered in 30 days.
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={() => setActiveView("ai")} className="btn btn-secondary" style={{ flex: 1 }}>
              Open AI Center
            </button>
            <button onClick={() => setActiveView("comms")} className="btn btn-secondary" style={{ flex: 1 }}>
              <Megaphone size={16} /> Broadcast Offer
            </button>
          </div>
        </div>

        {/* REAL-TIME AUDIT LOG */}
        <div className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Activity size={20} color="#10b981" />
              <h3 style={{ margin: 0 }}>{t("liveAuditFeed")}</h3>
            </div>
            <span className="badge badge-success">Real-Time</span>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px", overflowY: "auto", maxHeight: "240px" }}>
            {events.map((evt) => (
              <div key={evt.id} className="glass-card" style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: "700", color: "#fff" }}>
                    {evt.productTitle}
                  </div>
                  <div className="caption">
                    {evt.actor} • {evt.note}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span className={`badge ${evt.qtyChange > 0 ? "badge-success" : "badge-danger"}`}>
                    {evt.qtyChange > 0 ? `+${evt.qtyChange}` : evt.qtyChange}
                  </span>
                  <div className="caption" style={{ fontSize: "12px", marginTop: "2px" }}>
                    {new Date(evt.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RECENT TRANSACTIONS (DESKTOP TABLE / MOBILE RESPONSIVE CARDS) */}
      <div className="glass-panel" style={{ padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ margin: 0 }}>Recent Transactions</h3>
          <button onClick={() => setActiveView("orders")} className="btn btn-ghost" style={{ padding: "8px 12px" }}>
            <span>View All</span>
            <ChevronRight size={16} />
          </button>
        </div>

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
                    <div className="caption" style={{ fontSize: "12px" }}>{ord.customerPhone}</div>
                  </td>
                  <td>{ord.itemsCount} items</td>
                  <td style={{ fontWeight: "800", color: "#fff" }}>₹{ord.total.toLocaleString("en-IN")}</td>
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

        {/* Mobile Reflow Card List (Zero Horizontal Scroll Guarantee) */}
        <div className="hide-on-desktop" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {orders.slice(0, 5).map((ord) => (
            <div key={ord.id} className="glass-card" style={{ padding: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontWeight: "700", color: "var(--primary)" }}>{ord.id}</span>
                <span className={`badge ${ord.status === "Completed" ? "badge-success" : "badge-warning"}`}>
                  {ord.status}
                </span>
              </div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#fff", marginBottom: "4px" }}>
                {ord.customerName}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="caption">{ord.itemsCount} items • {ord.paymentMethod}</span>
                <span style={{ fontSize: "18px", fontWeight: "800", color: "#fff" }}>
                  ₹{ord.total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
