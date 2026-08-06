import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { 
  Search, 
  RotateCcw, 
  Eye, 
  X 
} from "lucide-react";

export const OrdersView = () => {
  const { orders, processReturn, t } = useRetail();

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
      {/* View Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#fff", margin: "0 0 4px 0" }}>
            {t("orders")}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>
            Unified multi-channel order management, fulfillment & return processing
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel" style={{ padding: "16px", marginBottom: "20px", display: "flex", gap: "14px" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <Search size={16} color="var(--text-dim)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: "36px" }}
            placeholder="Search by Order ID, Customer Name or Channel..."
            value={searchOrder}
            onChange={(e) => setSearchOrder(e.target.value)}
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass-panel" style={{ padding: "16px" }}>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Channel</th>
                <th>Customer</th>
                <th>Date & Time</th>
                <th>GST Tax</th>
                <th>Total Bill</th>
                <th>Payment Mode</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((ord) => (
                <tr key={ord.id}>
                  <td style={{ fontWeight: "800", color: "var(--primary)" }}>{ord.id}</td>
                  <td>
                    <span className="badge badge-info">{ord.channel}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: "700" }}>{ord.customerName}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>{ord.customerPhone}</div>
                  </td>
                  <td style={{ fontSize: "0.8rem" }}>
                    {new Date(ord.timestamp).toLocaleString([], { dateStyle: "short", timeStyle: "short" })}
                  </td>
                  <td>₹{ord.gstTotal}</td>
                  <td style={{ fontWeight: "800", color: "#fff" }}>₹{ord.total.toLocaleString("en-IN")}</td>
                  <td>{ord.paymentMethod}</td>
                  <td>
                    <span className={`badge ${ord.status === "Completed" || ord.status === "Fulfilled" ? "badge-success" : "badge-danger"}`}>
                      {ord.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button
                        onClick={() => {
                          setSelectedOrder(ord);
                          setShowDetailModal(true);
                        }}
                        className="btn btn-secondary"
                        style={{ fontSize: "0.75rem", padding: "4px 8px" }}
                      >
                        <Eye size={14} />
                      </button>

                      {ord.status !== "Returned / Refunded" && (
                        <button
                          onClick={() => handleReturnClick(ord)}
                          className="btn btn-danger"
                          style={{ fontSize: "0.75rem", padding: "4px 8px" }}
                          title="Process Return & Restock"
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

      {/* Order Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, backdropFilter: "blur(4px)" }}>
          <div className="glass-panel" style={{ width: "480px", padding: "24px", maxWidth: "90%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#fff", margin: 0 }}>
                Order Details: {selectedOrder.id}
              </h3>
              <button onClick={() => setShowDetailModal(false)} className="btn btn-secondary" style={{ padding: "4px 8px" }}>
                <X size={16} />
              </button>
            </div>

            <div style={{ fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
              <div><strong>Customer:</strong> {selectedOrder.customerName} ({selectedOrder.customerPhone})</div>
              <div><strong>Channel:</strong> {selectedOrder.channel}</div>
              <div><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</div>
              <div><strong>Status:</strong> {selectedOrder.status}</div>
            </div>

            <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "12px" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>Line Items</div>
              {selectedOrder.items?.map((it, idx) => (
                <div key={idx} className="glass-card" style={{ padding: "8px 12px", display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "#fff" }}>{it.title}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Qty: {it.qty} • Rate: ₹{it.price}</div>
                  </div>
                  <div style={{ fontWeight: "700", color: "#fff" }}>₹{it.price * it.qty}</div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "12px", marginTop: "12px", display: "flex", justifyContent: "space-between", fontWeight: "800", fontSize: "1.1rem", color: "#34d399" }}>
              <span>Total Amount:</span>
              <span>₹{selectedOrder.total}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
