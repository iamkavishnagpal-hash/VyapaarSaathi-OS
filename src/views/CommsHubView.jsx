import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { sampleCommsTemplates } from "../data/initialData";
import { 
  MessageSquare, 
  Send, 
  CheckCheck, 
  Megaphone, 
  FileText 
} from "lucide-react";

export const CommsHubView = () => {
  const { customers, currentStore, t } = useRetail();

  const [selectedTemplate, setSelectedTemplate] = useState(sampleCommsTemplates[0]);
  const [selectedSegment, setSelectedSegment] = useState("ALL");
  const [customMessage, setCustomMessage] = useState(sampleCommsTemplates[0].message);
  const [isSending, setIsSending] = useState(false);
  const [campaignStats, setCampaignStats] = useState({
    sent: 142,
    delivered: 138,
    read: 94,
    converted: 18
  });

  const handleSelectTemplate = (tmpl) => {
    setSelectedTemplate(tmpl);
    setCustomMessage(tmpl.message);
  };

  const handleLaunchBroadcast = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      const newSent = campaignStats.sent + customers.length;
      setCampaignStats({
        sent: newSent,
        delivered: newSent - 2,
        read: Math.round(newSent * 0.7),
        converted: Math.round(newSent * 0.15)
      });
      alert(`WhatsApp campaign broadcasted successfully to ${customers.length} recipients!`);
    }, 1200);
  };

  return (
    <div className="view-container">
      {/* View Header */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#fff", margin: "0 0 4px 0" }}>
          {t("commsHub")}
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>
          Broadcast WhatsApp offers, automated stock reorder alerts & digital receipt notifications
        </p>
      </div>

      {/* Broadcast Performance Stats */}
      <div className="grid-4" style={{ marginBottom: "24px" }}>
        <div className="glass-panel" style={{ padding: "18px" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: "600" }}>Broadcasts Sent</div>
          <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#fff", marginTop: "4px" }}>{campaignStats.sent}</div>
        </div>
        <div className="glass-panel" style={{ padding: "18px" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: "600" }}>Delivered</div>
          <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#a5b4fc", marginTop: "4px" }}>{campaignStats.delivered}</div>
        </div>
        <div className="glass-panel" style={{ padding: "18px" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: "600" }}>Opened & Read</div>
          <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#34d399", marginTop: "4px" }}>{campaignStats.read}</div>
        </div>
        <div className="glass-panel" style={{ padding: "18px" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: "600" }}>Direct Conversions</div>
          <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#fbbf24", marginTop: "4px" }}>{campaignStats.converted}</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
        
        {/* Left Form Editor */}
        <div className="glass-panel" style={{ flex: 1, padding: "22px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#fff", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <Megaphone size={18} color="var(--primary)" /> Broadcast Campaign Creator
          </h3>

          <div>
            <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>
              Select Template
            </label>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {sampleCommsTemplates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleSelectTemplate(t)}
                  className={`btn ${selectedTemplate.id === t.id ? "btn-primary" : "btn-secondary"}`}
                  style={{ fontSize: "0.78rem", padding: "6px 12px" }}
                >
                  <FileText size={14} /> {t.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>
              Audience Segment
            </label>
            <select
              className="input-field"
              value={selectedSegment}
              onChange={(e) => setSelectedSegment(e.target.value)}
            >
              <option value="ALL">All Registered Customers ({customers.length})</option>
              <option value="VIP">VIP Customers (Spent &gt; ₹10,000)</option>
              <option value="INACTIVE">Inactive Customers (30+ Days)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>
              WhatsApp Message Body
            </label>
            <textarea
              className="input-field"
              rows={5}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
            />
          </div>

          <button onClick={handleLaunchBroadcast} disabled={isSending} className="btn btn-success" style={{ padding: "12px" }}>
            <Send size={18} />
            <span>{isSending ? "Broadcasting..." : `Send WhatsApp Campaign to ${customers.length} Recipients`}</span>
          </button>
        </div>

        {/* Right Phone Mockup Preview */}
        <div
          style={{
            width: "320px",
            background: "#075e54",
            borderRadius: "24px",
            padding: "16px",
            color: "#fff",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            border: "8px solid #111b21"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid #128c7e", paddingBottom: "10px", marginBottom: "12px" }}>
            <MessageSquare size={18} />
            <div style={{ fontSize: "0.88rem", fontWeight: "700" }}>{currentStore.name} WhatsApp</div>
          </div>

          <div
            style={{
              background: "#ece5dd",
              color: "#000",
              borderRadius: "12px",
              padding: "12px",
              fontSize: "0.82rem",
              lineHeight: "1.5",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              position: "relative"
            }}
          >
            {customMessage
              .replace("{{Customer_Name}}", "Rahul Sharma")
              .replace("{{Store_Name}}", currentStore.name)
              .replace("{{Store_Link}}", "retailos.app/store")
              .replace("{{Product_Title}}", "Wireless Earbuds Pro")
              .replace("{{Current_Stock}}", "8")
              .replace("{{PO_Number}}", "PO-9912")
              .replace("{{Invoice_No}}", "ORD-9821")
              .replace("{{Total_Amount}}", "3,497")
              .replace("{{PDF_Link}}", "retailos.app/pdf")}
            <div style={{ textAlign: "right", fontSize: "0.68rem", color: "#666", marginTop: "6px" }}>
              Just now <CheckCheck size={12} color="#4fc3f7" style={{ display: "inline", verticalAlign: "middle" }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
