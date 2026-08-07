import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { 
  Search, 
  RotateCcw, 
  Eye, 
  X,
  Plus
} from "lucide-react";

export const OrdersView = () => {
  const { orders, processReturn, t, setActiveView } = useRetail();

  const [searchOrder, setSearchOrder] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filteredOrders = orders.filter((o) => {
    return (
      o.id.toLowerCase().includes(searchOrder.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchOrder.toLowerCase()) ||
      o.channel.toLowerCase().includes(searchOrder.toLowerCase())
    );
  });

  const handleReturnClick = (order) => {
    if (confirm(`Process return and refund for Order ${order.id}? Items will be restocked.`)) {
      if (order.items && order.items[0]) {
        processReturn(order.id, order.items[0].productId, order.items[0].qty || 1);
      }
    }
  };

  return (
    <div className="view-container">
      {/* LEVEL 1 HEADER & SINGLE PRIMARY CTA */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h2>{t("orders")}</h2>
          <p className="caption" style={{ margin: "4px 0 0 0" }}>
            Multi-channel order fulfillment & customer returns
          </p>
        </div>

        {/* SINGLE PRIMARY CTA PER SCREEN SPECIFICATION */}
        <button onClick={() => setActiveView("pos")} className="btn btn-primary">
          <Plus size={18} />
          <span>Create New Order</span>
        </button>
      </div>

      {/* FILTER SEARCH BAR */}
      <div className="glass-panel" style={{ padding: "16px", marginBottom: "24px" }}>
        <div style={{ position: "relative" }}>
          <Search size={18} color="var(--text-dim)" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: "42px" }}
            placeholder="Search by Order ID, Customer Name or Channel..."
            value={searchOrder}
            onChange={(e) => setSearchOrder(e.target.value)}
          />
        </div>
      </div>

      {/* DESKTOP DATA TABLE */}
      <div className="glass-panel hide-on-mobile" style={{ padding: "20px" }}>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Channel</th>
                <th>Customer</th>
                <th>Items Count</th>
                <th>Total Value</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((ord) => (
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
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => {
                          setSelectedOrder(ord);
                          setShowDetailModal(true);
                        }}
                        className="btn btn-secondary"
                        style={{ fontSize: "14px", padding: "6px 10px", minHeight: "36px" }}
                      >
                        <Eye size={14} />
                      </button>

                      {ord.status === "Completed" && (
                        <button
                          onClick={() => handleReturnClick(ord)}
                          className="btn btn-danger"
                          style={{ fontSize: "14px", padding: "6px 10px", minHeight: "36px" }}
                        >
                          <RotateCcw size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE REFLOW CARD LIST (ZERO HORIZONTAL SCROLL GUARANTEE) */}
      <div className="hide-on-desktop" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filteredOrders.map((ord) => (
          <div key={ord.id} className="glass-card" style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontWeight: "700", color: "var(--primary)", fontSize: "18px" }}>{ord.id}</span>
              <span className={`badge ${ord.status === "Completed" ? "badge-success" : "badge-warning"}`}>
                {ord.status}
              </span>
            </div>

            <div style={{ fontSize: "18px", fontWeight: "700", color: "#fff", marginBottom: "4px" }}>
              {ord.customerName}
            </div>
            <div className="caption" style={{ marginBottom: "12px" }}>
              {ord.channel} • {ord.paymentMethod}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px solid var(--border-color)" }}>
              <div>
                <div className="caption">Total Amount</div>
                <div style={{ fontSize: "22px", fontWeight: "800", color: "#fff" }}>
                  ₹{ord.total.toLocaleString("en-IN")}
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => {
                    setSelectedOrder(ord);
                    setShowDetailModal(true);
                  }}
                  className="btn btn-secondary"
                >
                  <Eye size={16} />
                  <span>Details</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ORDER DETAILS MODAL (MOBILE BOTTOM SHEET / DESKTOP MODAL) */}
      {showDetailModal && selectedOrder && (
        <div className="mobile-bottom-sheet-overlay" onClick={() => setShowDetailModal(false)}>
          <div className="mobile-bottom-sheet glass-panel" onClick={(e) => e.stopPropagation()} style={{ width: "520px", padding: "20px" }}>
            <div className="bottom-sheet-handle hide-on-desktop" />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <h3 style={{ margin: 0 }}>Order Details — {selectedOrder.id}</h3>
              <button onClick={() => setShowDetailModal(false)} className="btn btn-ghost" style={{ padding: "8px" }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ padding: "16px", background: "rgba(255,255,255,0.03)", borderRadius: "12px" }}>
                <div style={{ fontSize: "16px", fontWeight: "700", color: "#fff" }}>{selectedOrder.customerName}</div>
                <div className="caption">{selectedOrder.customerPhone}</div>
                <div className="caption" style={{ marginTop: "4px" }}>Channel: {selectedOrder.channel} • Payment: {selectedOrder.paymentMethod}</div>
              </div>

              <div>
                <h4 style={{ fontSize: "16px", margin: "0 0 10px 0" }}>Order Items</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {selectedOrder.items && selectedOrder.items.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", padding: "10px 12px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
                      <span>{item.title} x {item.qty}</span>
                      <span style={{ fontWeight: "700" }}>₹{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px solid var(--border-color)" }}>
                <span style={{ fontSize: "18px", fontWeight: "700" }}>Total Paid</span>
                <span style={{ fontSize: "24px", fontWeight: "800", color: "var(--primary)" }}>₹{selectedOrder.total}</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
