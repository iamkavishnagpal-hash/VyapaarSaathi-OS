import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { ShoppingBag, Search, Filter, Globe, MessageSquare, Store, CheckCircle2, ArrowRight } from "lucide-react";

export const OrderCenterView = () => {
  const { orders, addToast } = useRetail();

  const [activeChannelFilter, setActiveChannelFilter] = useState("All");
  const [activeStatusFilter, setActiveStatusFilter] = useState("All");

  const channelsList = ["All", "Walk-in POS", "WhatsApp Commerce", "Brand Online Store", "Shopify Store"];
  const statusList = ["All", "Completed", "Processing", "Packing", "Shipped"];

  const filteredOrders = orders.filter((o) => {
    const channelMatch = activeChannelFilter === "All" || o.paymentMethod.toLowerCase().includes(activeChannelFilter.toLowerCase());
    const statusMatch = activeStatusFilter === "All" || o.status === activeStatusFilter;
    return channelMatch && statusMatch;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="h1-title">Omni-Channel Order Center</h1>
          <p className="body-text" style={{ fontSize: "13px" }}>
            Universal order hub unifying POS sales, WhatsApp orders, Shopify transactions, and web store purchases
          </p>
        </div>
      </div>

      {/* CHANNEL & STATUS FILTERS */}
      <div className="card-panel" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", gap: "6px", overflowX: "auto" }}>
          {channelsList.map((ch) => (
            <button
              type="button"
              key={ch}
              onClick={() => setActiveChannelFilter(ch)}
              className={`btn btn-sm ${activeChannelFilter === ch ? "btn-primary" : "btn-secondary"}`}
            >
              {ch}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: "6px" }}>
          {statusList.map((st) => (
            <button
              type="button"
              key={st}
              onClick={() => setActiveStatusFilter(st)}
              className={`btn btn-sm ${activeStatusFilter === st ? "btn-primary" : "btn-secondary"}`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* ORDERS TABLE */}
      <div className="table-container">
        <table className="business-table">
          <thead>
            <tr>
              <th>Order ID & Date</th>
              <th>Customer</th>
              <th>Channel Source</th>
              <th>Items & Total</th>
              <th>Payment Status</th>
              <th>Fulfillment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((o) => (
              <tr key={o.id}>
                <td>
                  <div style={{ fontWeight: "800", color: "var(--text-main)" }}>{o.orderNumber}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{o.date}</div>
                </td>
                <td>
                  <div style={{ fontWeight: "700", color: "var(--text-main)" }}>{o.customerName}</div>
                </td>
                <td>
                  <span className="status-badge badge-primary">{o.paymentMethod || "POS"}</span>
                </td>
                <td>
                  <div style={{ fontWeight: "800", color: "var(--text-main)" }}>${o.totalAmount.toFixed(2)}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{o.itemCount} Items</div>
                </td>
                <td>
                  <span className="status-badge badge-success">✓ Paid</span>
                </td>
                <td>
                  <span className="status-badge badge-primary">{o.status}</span>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToast(`Opened order details for ${o.orderNumber}`, "info");
                    }}
                    className="btn btn-ghost btn-sm"
                  >
                    View Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
