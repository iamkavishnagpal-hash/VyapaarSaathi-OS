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
  PlusCircle, 
  Receipt, 
  Megaphone 
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
      {/* Top Banner Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#fff", margin: "0 0 4px 0" }}>
            {currentStore.name} {t("dashboard")}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", margin: 0 }}>
            Unified Real-Time Overview • GST Registered: <strong>{currentStore.GSTIN}</strong>
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setActiveView("pos")} className="btn btn-primary">
            <Receipt size={16} />
            <span>{t("newSale")}</span>
          </button>
          <button onClick={() => setActiveView("inventory")} className="btn btn-secondary">
            <PlusCircle size={16} />
            <span>{t("addProduct")}</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid-4" style={{ marginBottom: "24px" }}>
        {/* Today's Sales */}
        <div className="glass-panel" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: "600" }}>{t("todaysSales")}</span>
            <div style={{ background: "var(--primary-glow)", padding: "8px", borderRadius: "8px" }}>
              <IndianRupee size={20} color="var(--primary)" />
            </div>
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "#fff", marginBottom: "4px" }}>
            ₹{todaysSales.toLocaleString("en-IN")}
          </div>
          <div style={{ fontSize: "0.78rem", color: "#34d399", display: "flex", alignItems: "center", gap: "4px" }}>
            <ArrowUpRight size={14} />
            <span>+18.4% vs yesterday</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="glass-panel" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: "600" }}>{t("totalOrders")}</span>
            <div style={{ background: "rgba(16, 185, 129, 0.15)", padding: "8px", borderRadius: "8px" }}>
              <ShoppingBag size={20} color="#10b981" />
            </div>
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "#fff", marginBottom: "4px" }}>
            {totalOrdersCount}
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            Across POS & Storefront
          </div>
        </div>

        {/* Net Profit */}
        <div className="glass-panel" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: "600" }}>{t("netProfit")}</span>
            <div style={{ background: "rgba(245, 158, 11, 0.15)", padding: "8px", borderRadius: "8px" }}>
              <TrendingUp size={20} color="#f59e0b" />
            </div>
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "#fff", marginBottom: "4px" }}>
            ₹{estimatedProfit.toLocaleString("en-IN")}
          </div>
          <div style={{ fontSize: "0.78rem", color: "#fbbf24" }}>
            Est. margin ~38%
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="glass-panel" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: "600" }}>{t("lowStockAlerts")}</span>
            <div style={{ background: "rgba(239, 68, 68, 0.15)", padding: "8px", borderRadius: "8px" }}>
              <AlertTriangle size={20} color="#ef4444" />
            </div>
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "#fff", marginBottom: "4px" }}>
            {lowStockItems.length} Items
          </div>
          <div style={{ fontSize: "0.78rem", color: "#f87171" }}>
            Requires immediate reorder
          </div>
        </div>
      </div>

      {/* AI CEO Daily Brief & Live Audit Feed */}
      <div className="grid-2" style={{ marginBottom: "24px" }}>
        
        {/* AI CEO Briefing Card */}
        <div className="glass-panel" style={{ padding: "22px", background: "linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(168, 85, 247, 0.08) 100%)", borderColor: "rgba(99, 102, 241, 0.3)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <div style={{ background: "var(--primary)", padding: "8px", borderRadius: "10px" }}>
              <Sparkles size={20} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#fff", margin: 0 }}>
                {t("aiBriefTitle")}
              </h3>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Generated today at 09:00 AM</span>
            </div>
          </div>

          <div style={{ fontSize: "0.88rem", lineHeight: "1.6", color: "var(--text-main)", marginBottom: "16px" }}>
            <p style={{ margin: "0 0 10px 0" }}>
              🚀 <strong>Sales Trending Up:</strong> Apparel category is up 32% today led by <em>Cotton Printed Kurti Sets</em>.
            </p>
            <p style={{ margin: "0 0 10px 0" }}>
              ⚠️ <strong>Stock Action Needed:</strong> <em>Wireless Bluetooth Earbuds Pro</em> has only 8 units left. Reorder 20 units before weekend peak demand.
            </p>
            <p style={{ margin: 0 }}>
              💡 <strong>Marketing Opportunity:</strong> 12 VIP customers haven't purchased in 30 days. Send a WhatsApp 10% Diwali coupon now.
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => setActiveView("ai")} className="btn btn-primary" style={{ fontSize: "0.8rem" }}>
              Ask AI CEO Advisor
            </button>
            <button onClick={() => setActiveView("comms")} className="btn btn-secondary" style={{ fontSize: "0.8rem" }}>
              <Megaphone size={14} /> Send WhatsApp Offer
            </button>
          </div>
        </div>

        {/* Live Event Audit Log */}
        <div className="glass-panel" style={{ padding: "22px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Activity size={18} color="#10b981" />
              <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#fff", margin: 0 }}>
                {t("liveAuditFeed")}
              </h3>
            </div>
            <span className="badge badge-success" style={{ fontSize: "0.68rem" }}>Real-time Sync</span>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto", maxHeight: "240px", paddingRight: "4px" }}>
            {events.map((evt) => (
              <div key={evt.id} className="glass-card" style={{ padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "#fff" }}>
                    {evt.productTitle}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {evt.actor} • {evt.note}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span className={`badge ${evt.qtyChange > 0 ? "badge-success" : "badge-danger"}`}>
                    {evt.qtyChange > 0 ? `+${evt.qtyChange}` : evt.qtyChange}
                  </span>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "2px" }}>
                    {new Date(evt.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Quick POS Sales Recent Orders Table */}
      <div className="glass-panel" style={{ padding: "20px" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#fff", marginBottom: "14px" }}>
          Recent Transactions & Bills
        </h3>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Channel</th>
                <th>Customer</th>
                <th>Items</th>
                <th>GST Tax</th>
                <th>Total Bill</th>
                <th>Payment Mode</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((ord) => (
                <tr key={ord.id}>
                  <td style={{ fontWeight: "700", color: "var(--primary)" }}>{ord.id}</td>
                  <td>
                    <span className="badge badge-info">{ord.channel}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: "600" }}>{ord.customerName}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>{ord.customerPhone}</div>
                  </td>
                  <td>{ord.itemsCount} items</td>
                  <td>₹{ord.gstTotal}</td>
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
      </div>

    </div>
  );
};
