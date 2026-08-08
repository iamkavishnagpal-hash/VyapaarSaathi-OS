import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { ShoppingBag, Plus, Building2, CheckCircle2, Clock, Truck } from "lucide-react";

export const PurchasesView = () => {
  const { purchases, addToast } = useRetail();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="h1-title">Purchases & Supplier Replenishment</h1>
          <p className="body-text" style={{ fontSize: "13px" }}>
            Purchase order creation, receiving verification, and supplier invoice tracking
          </p>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary" style={{ gap: "6px" }}>
          <Plus size={16} /> Create Purchase Order
        </button>
      </div>

      {/* PO METRIC CARDS */}
      <div className="grid-12">
        <div className="col-4 card-panel">
          <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Active Purchase Orders</span>
          <div className="kpi-text" style={{ marginTop: "4px" }}>{purchases.length} Orders</div>
        </div>
        <div className="col-4 card-panel">
          <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>In Transit Value</span>
          <div className="kpi-text" style={{ marginTop: "4px", color: "var(--warning)" }}>$5,600.00</div>
        </div>
        <div className="col-4 card-panel">
          <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Received This Month</span>
          <div className="kpi-text" style={{ marginTop: "4px", color: "var(--success)" }}>$6,000.00</div>
        </div>
      </div>

      {/* PURCHASE ORDERS TABLE */}
      <div className="table-container">
        <table className="business-table">
          <thead>
            <tr>
              <th>PO Number</th>
              <th>Supplier Name</th>
              <th>Order Date</th>
              <th>Expected Delivery</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((po) => (
              <tr key={po.id}>
                <td style={{ fontFamily: "var(--font-mono)", fontWeight: "700" }}>{po.id.toUpperCase()}</td>
                <td style={{ fontWeight: "700", color: "var(--text-main)" }}>{po.supplier}</td>
                <td>{po.orderDate}</td>
                <td>{po.expectedDelivery}</td>
                <td>{po.itemCount} units</td>
                <td style={{ fontWeight: "700" }}>${po.totalAmount.toFixed(2)}</td>
                <td>
                  <span className={`status-badge ${po.status === "Received" ? "badge-success" : "badge-warning"}`}>
                    {po.status}
                  </span>
                </td>
                <td>
                  <button onClick={() => addToast(`Verifying shipment for ${po.id}`, "info")} className="btn btn-secondary btn-sm">
                    {po.status === "Received" ? "View Goods Note" : "Receive Shipment"}
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
