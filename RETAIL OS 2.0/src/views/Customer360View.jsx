import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { Users, MessageSquare, ShoppingBag, Store, Calendar, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export const Customer360View = () => {
  const { customers, addToast } = useRetail();

  const [selectedCustId, setSelectedCustId] = useState(customers[0]?.id || "cust-1");

  const activeCust = customers.find((c) => c.id === selectedCustId) || customers[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="h1-title">Customer 360 CRM & Retention Engine</h1>
          <p className="body-text" style={{ fontSize: "13px" }}>
            Unified customer profiles connecting offline store billing, WhatsApp chat history, and online orders
          </p>
        </div>
      </div>

      <div className="grid-12">
        
        {/* CUSTOMERS LIST */}
        <div className="col-4 card-panel" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-main)" }}>Customer Roster</div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "560px", overflowY: "auto" }}>
            {customers.map((c) => {
              const isSel = c.id === selectedCustId;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCustId(c.id)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "var(--radius-xs)",
                    backgroundColor: isSel ? "var(--primary-subtle)" : "var(--bg-elevated)",
                    border: isSel ? "1px solid var(--primary)" : "1px solid var(--border-color)",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>{c.name}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{c.phone} • {c.totalOrders} Orders</div>
                  </div>
                  <span className={`status-badge ${c.tier === "VIP" ? "badge-primary" : "badge-muted"}`}>
                    {c.tier}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CUSTOMER 360 DETAILS & RETENTION */}
        <div className="col-8 card-panel" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          
          {/* PROFILE HEADER */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
            <div>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-main)" }}>{activeCust?.name}</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Phone: {activeCust?.phone} • Email: {activeCust?.email}</div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)" }}>Lifetime Spend</div>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "var(--primary)" }}>${activeCust?.totalSpend?.toFixed(2) || "1,240.00"}</div>
            </div>
          </div>

          {/* AI RETENTION ENGINE SUGGESTION */}
          <div className="card-panel" style={{ borderLeft: "5px solid var(--ai-accent)", backgroundColor: "var(--bg-elevated)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Sparkles size={16} color="var(--ai-accent)" />
                  <span style={{ fontSize: "13px", fontWeight: "800", color: "var(--text-main)" }}>AI Customer Retention Insight</span>
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
                  Customer usually reorders Maggi 70g & Sugar every ~28 days. Last purchase was 26 days ago.
                </div>
              </div>

              <button
                type="button"
                onClick={() => addToast(`Sent personalized WhatsApp reorder reminder to ${activeCust?.name}`, "success")}
                className="btn btn-ai btn-sm"
                style={{ gap: "4px" }}
              >
                <span>Send WhatsApp Reorder</span>
                <MessageSquare size={12} />
              </button>
            </div>
          </div>

          {/* MULTI-CHANNEL TIMELINE */}
          <div>
            <div style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-main)", marginBottom: "10px" }}>
              Multi-Channel Interaction History
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { date: "Yesterday, 4:15 PM", channel: "WhatsApp Commerce", desc: "Inquired stock for Sony WH-1000XM5 and confirmed order #WA-9821 ($5.20)" },
                { date: "Aug 2, 2026", channel: "Physical Store POS", desc: "Walk-in store purchase. Paid $142.50 via UPI. Invoice #ROS-4819" },
                { date: "Jul 14, 2026", channel: "Brand Online Store", desc: "Online web order #ORD-3019 ($89.00). Shipped via BlueDart" }
              ].map((ev, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "var(--radius-xs)",
                    backgroundColor: "var(--bg-elevated)",
                    border: "1px solid var(--border-color)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-main)" }}>{ev.desc}</div>
                    <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "2px" }}>{ev.date}</div>
                  </div>
                  <span className="status-badge badge-primary">{ev.channel}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
