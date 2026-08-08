import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { Truck, Package, CheckCircle2, AlertTriangle, ScanLine, Printer, ArrowRight } from "lucide-react";

export const FulfillmentView = () => {
  const { products, orders, addToast } = useRetail();

  const [activeTab, setActiveTab] = useState("packing"); // 'packing' | 'shipping' | 'completed'

  const [packingScanIndex, setPackingScanIndex] = useState(2);
  const totalItemsInTask = 4;

  const handleScanItem = () => {
    if (packingScanIndex < totalItemsInTask) {
      setPackingScanIndex(packingScanIndex + 1);
      addToast(`Scanned item ${packingScanIndex + 1}/${totalItemsInTask} - Verified ✓`, "success");
    } else {
      addToast("Order #ORD-1042 packing verification 100% complete!", "success");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="h1-title">Fulfillment Autopilot & Smart Packing</h1>
          <p className="body-text" style={{ fontSize: "13px" }}>
            Automated order packing verification, barcode error prevention, and courier shipping labels
          </p>
        </div>
      </div>

      {/* TABS */}
      <div className="card-panel" style={{ display: "flex", gap: "8px" }}>
        <button onClick={() => setActiveTab("packing")} className={`btn btn-sm ${activeTab === "packing" ? "btn-primary" : "btn-secondary"}`}>
          Pending Packing Tasks (3)
        </button>
        <button onClick={() => setActiveTab("shipping")} className={`btn btn-sm ${activeTab === "shipping" ? "btn-primary" : "btn-secondary"}`}>
          Ready for Shipping (2)
        </button>
        <button onClick={() => setActiveTab("completed")} className={`btn btn-sm ${activeTab === "completed" ? "btn-primary" : "btn-secondary"}`}>
          Dispatched Orders (48)
        </button>
      </div>

      {/* ACTIVE SMART PACKING VERIFICATION SCANNER */}
      <div className="grid-12">
        <div className="col-7 card-panel" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-main)" }}>Pack Order #ORD-1042</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Customer: Ramesh Sharma • WhatsApp Order</div>
            </div>
            <span className="status-badge badge-warning">Verification in progress</span>
          </div>

          {/* VERIFICATION PROGRESS BAR */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "700", color: "var(--text-main)", marginBottom: "4px" }}>
              <span>Packing Progress</span>
              <span style={{ color: "var(--primary)" }}>{packingScanIndex} of {totalItemsInTask} Items Verified</span>
            </div>
            <div style={{ width: "100%", height: "8px", backgroundColor: "var(--bg-elevated)", borderRadius: "var(--radius-pill)", overflow: "hidden" }}>
              <div
                style={{
                  width: `${(packingScanIndex / totalItemsInTask) * 100}%`,
                  height: "100%",
                  backgroundColor: "var(--primary)",
                  transition: "width 0.3s ease"
                }}
              />
            </div>
          </div>

          {/* ITEM CHECKLIST */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { title: "Sony WH-1000XM5 Headphones", sku: "SKU-981204", scanned: true },
              { title: "Maggi 70g Instant Noodles", sku: "SKU-102938", scanned: true },
              { title: "ErgoDesk Electric Smart Frame", sku: "SKU-482910", scanned: packingScanIndex >= 3 },
              { title: "Quantum Sound Pro Headphones", sku: "SKU-772910", scanned: packingScanIndex >= 4 }
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                  borderRadius: "var(--radius-xs)",
                  backgroundColor: "var(--bg-elevated)",
                  border: item.scanned ? "1px solid var(--success)" : "1px solid var(--border-color)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {item.scanned ? (
                    <CheckCircle2 size={18} color="var(--success)" />
                  ) : (
                    <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: "1px solid var(--border-color)" }} />
                  )}
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>{item.title}</div>
                    <div style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{item.sku}</div>
                  </div>
                </div>

                <span className={`status-badge ${item.scanned ? "badge-success" : "badge-muted"}`}>
                  {item.scanned ? "✓ Verified" : "Pending Scan"}
                </span>
              </div>
            ))}
          </div>

          {/* ACTION BUTTONS */}
          <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
            <button onClick={handleScanItem} className="btn btn-primary" style={{ flex: 1, gap: "6px" }}>
              <ScanLine size={16} /> Scan Next Product Barcode
            </button>
            <button onClick={() => addToast("Printed Thermal Shipping Label for #ORD-1042", "info")} className="btn btn-secondary" style={{ gap: "6px" }}>
              <Printer size={16} /> Shipping Label
            </button>
          </div>
        </div>

        {/* FULFILLMENT AUTOPILOT STEPS */}
        <div className="col-5 card-panel" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)" }}>
            Autopilot Fulfillment Pipeline
          </div>

          {[
            { step: "Order Received", status: "● Active", desc: "WhatsApp Order #ORD-1042 synced" },
            { step: "Payment Verified", status: "✓ Verified", desc: "UPI Payment $5.20 received" },
            { step: "Stock Reservation", status: "✓ Reserved", desc: "Omni-channel stock brain locked 4 units" },
            { step: "Smart Packing Scan", status: "In Progress", desc: "Staff scanning items to prevent errors" },
            { step: "Courier Pickup", status: "Pending", desc: "Shiprocket / Local Courier request ready" }
          ].map((sp, idx) => (
            <div key={idx} style={{ padding: "10px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-color)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>{idx + 1}. {sp.step}</span>
                <span className="status-badge badge-primary">{sp.status}</span>
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>{sp.desc}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
