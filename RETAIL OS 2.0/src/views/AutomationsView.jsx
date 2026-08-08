import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { Zap, Plus, Play, CheckCircle2, Sliders, ArrowRight, Bot } from "lucide-react";

export const AutomationsView = () => {
  const { addToast } = useRetail();

  const [sops, setSops] = useState([
    {
      id: "sop-1",
      name: "Online Order Packing SOP",
      trigger: "WHEN Online order is paid",
      actions: ["Reserve inventory", "Create packing task", "Print thermal invoice", "Notify store staff"],
      status: "Active",
      executions: 142
    },
    {
      id: "sop-2",
      name: "Low Stock Reorder Alert SOP",
      trigger: "WHEN Stock falls below reorder threshold",
      actions: ["Evaluate historical sales velocity", "Draft PO for primary supplier", "Notify store owner"],
      status: "Active",
      executions: 38
    },
    {
      id: "sop-3",
      name: "Nightly Business Summary SOP",
      trigger: "WHEN Time is 9:00 PM daily",
      actions: ["Calculate daily net revenue & P&L", "Send WhatsApp summary report to owner"],
      status: "Active",
      executions: 89
    }
  ]);

  const [newTrigger, setNewTrigger] = useState("WHEN Online Order Paid");
  const [newAction, setNewAction] = useState("Create Packing Task & Reserve Stock");

  const handleCreateSop = (e) => {
    e.preventDefault();
    const entry = {
      id: `sop-${Date.now()}`,
      name: `Custom SOP Rule #${sops.length + 1}`,
      trigger: newTrigger,
      actions: [newAction],
      status: "Active",
      executions: 0
    };
    setSops([entry, ...sops]);
    addToast("New SOP Automation Rule activated!", "success");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Zap size={22} color="var(--ai-accent)" />
            <h1 className="h1-title">SOP Builder & Process Automation</h1>
          </div>
          <p className="body-text" style={{ fontSize: "13px", marginTop: "4px" }}>
            Convert repetitive manual shop routines into automated background SOP workflows
          </p>
        </div>
      </div>

      <div className="grid-12">
        
        {/* NEW SOP RULE CREATOR */}
        <div className="col-5 card-panel" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)" }}>Create New SOP Automation</div>
          
          <form onSubmit={handleCreateSop} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <label style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)" }}>WHEN (Trigger Event)</label>
              <select className="input-field" value={newTrigger} onChange={(e) => setNewTrigger(e.target.value)}>
                <option value="WHEN Online Order Paid">WHEN Online order is paid</option>
                <option value="WHEN Stock drops below 10 units">WHEN Stock drops below 10 units</option>
                <option value="WHEN Customer payment is net-30 overdue">WHEN Customer payment is net-30 overdue</option>
                <option value="WHEN Daily store closes at 9 PM">WHEN Daily store closes at 9 PM</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)" }}>THEN (Automated Action)</label>
              <select className="input-field" value={newAction} onChange={(e) => setNewAction(e.target.value)}>
                <option value="Create Packing Task & Reserve Stock">Create Packing Task & Reserve Stock</option>
                <option value="Draft Purchase Order for Supplier">Draft Purchase Order for Supplier</option>
                <option value="Send Overdue WhatsApp Reminder">Send Overdue WhatsApp Reminder</option>
                <option value="Generate Nightly Business P&L Summary">Generate Nightly Business P&L Summary</option>
              </select>
            </div>

            <button type="submit" className="btn btn-ai" style={{ gap: "6px", marginTop: "4px" }}>
              <Plus size={16} /> Activate SOP Automation
            </button>
          </form>
        </div>

        {/* ACTIVE SOPS LIST */}
        <div className="col-7 card-panel">
          <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)", marginBottom: "12px" }}>
            Active SOP Workflows ({sops.length} Active Rules)
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {sops.map((sop) => (
              <div
                key={sop.id}
                style={{
                  padding: "12px 14px",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: "var(--bg-elevated)",
                  border: "1px solid var(--border-color)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-main)" }}>{sop.name}</span>
                  <span className="status-badge badge-success">● {sop.status} ({sop.executions} runs)</span>
                </div>

                <div style={{ fontSize: "12px", color: "var(--primary)", fontWeight: "600" }}>{sop.trigger}</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {sop.actions.map((act, idx) => (
                    <span key={idx} className="status-badge badge-muted" style={{ fontSize: "10px" }}>
                      ➜ {act}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
