import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { 
  Bot, 
  Sparkles, 
  Mic, 
  BrainCircuit, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export const AICenterView = () => {
  const { products, orders, isListening, toggleVoiceListening, t, setActiveView } = useRetail();

  const [activeAgent, setActiveAgent] = useState("CEO"); // "CEO", "Inventory", "Marketing", "Finance"
  
  const lowStockCount = products.filter((p) => p.stockQty <= p.lowStockThreshold).length;
  const totalSales = orders.reduce((acc, o) => acc + o.total, 0);

  const aiInsights = [
    {
      id: 1,
      title: "Low Stock Inventory Reorder Trigger",
      category: "Inventory AI",
      desc: `Detected ${lowStockCount} items below safety threshold (e.g. Wireless Earbuds Pro: 8 left). Automated PO purchase draft ready for supplier.`,
      actionText: "Review & Reorder Stock",
      action: () => setActiveView("inventory"),
      color: "#f59e0b"
    },
    {
      id: 2,
      title: "Win-Back Customer WhatsApp Campaign",
      category: "Marketing AI",
      desc: "12 VIP customers haven't purchased in over 30 days. Send personalized 10% discount broadcast via WhatsApp.",
      actionText: "Launch WhatsApp Campaign",
      action: () => setActiveView("comms"),
      color: "#10b981"
    },
    {
      id: 3,
      title: "Margin & Pricing Optimization",
      category: "Finance AI",
      desc: `Today's gross revenue is ₹${totalSales.toLocaleString("en-IN")}. Increasing Cotton Printed Kurti price by ₹50 will yield +₹4,500 monthly net profit.`,
      actionText: "Optimize Product Prices",
      action: () => setActiveView("inventory"),
      color: "#6366f1"
    }
  ];

  return (
    <div className="view-container">
      {/* LEVEL 1 HEADER & SINGLE PRIMARY CTA */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h2>{t("aiCenter")}</h2>
          <p className="caption" style={{ margin: "4px 0 0 0" }}>
            Autonomous Retail Copilot • Predictive recommendations & stock forecasting
          </p>
        </div>

        {/* SINGLE PRIMARY CTA PER SCREEN SPECIFICATION */}
        <button 
          onClick={toggleVoiceListening} 
          className={`btn ${isListening ? "mic-active" : "btn-primary"}`}
        >
          <Mic size={18} />
          <span>{isListening ? "Listening to Voice..." : "Trigger Voice AI Command"}</span>
        </button>
      </div>

      {/* AI ASSISTANT HERO RECOMMENDATIONS */}
      <div className="grid-3" style={{ marginBottom: "32px" }}>
        {aiInsights.map((ins) => (
          <div key={ins.id} className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", borderColor: `${ins.color}40` }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span className="badge badge-info" style={{ fontSize: "12px" }}>{ins.category}</span>
                <Sparkles size={18} color={ins.color} />
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: "700", margin: "0 0 8px 0" }}>{ins.title}</h3>
              <p className="caption" style={{ color: "var(--text-main)", margin: "0 0 16px 0", lineHeight: "1.5" }}>
                {ins.desc}
              </p>
            </div>

            <button
              onClick={ins.action}
              className="btn btn-secondary"
              style={{ width: "100%", justifyContent: "space-between", borderColor: `${ins.color}60` }}
            >
              <span>{ins.actionText}</span>
              <ArrowRight size={16} color={ins.color} />
            </button>
          </div>
        ))}
      </div>

      {/* INTERACTIVE AI AGENT ADVISOR CONSOLE */}
      <div className="glass-panel" style={{ padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Bot size={24} color="var(--primary)" />
            <h3 style={{ margin: 0 }}>AI Agent Specialist Network</h3>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            {["CEO", "Inventory", "Marketing", "Finance"].map((agent) => (
              <button
                key={agent}
                onClick={() => setActiveAgent(agent)}
                className={`btn ${activeAgent === agent ? "btn-primary" : "btn-secondary"}`}
                style={{ fontSize: "14px", padding: "8px 14px", minHeight: "40px" }}
              >
                {agent} Advisor
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: "20px", background: "rgba(255,255,255,0.03)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <BrainCircuit size={22} color="var(--primary)" />
            <div style={{ fontSize: "18px", fontWeight: "700", color: "#fff" }}>
              {activeAgent} Agent Status Report
            </div>
            <span className="badge badge-success">Active Sync</span>
          </div>

          <p style={{ fontSize: "16px", lineHeight: "1.6", color: "var(--text-main)", margin: "0 0 16px 0" }}>
            {activeAgent === "CEO" && "📊 Executive Overview: Total revenue today is ₹" + totalSales.toLocaleString("en-IN") + " across 5 transactions. All POS counters operational."}
            {activeAgent === "Inventory" && "📦 Inventory Health: " + lowStockCount + " items require reordering. Safety stock buffer is holding at 94% efficiency."}
            {activeAgent === "Marketing" && "💬 Marketing Growth: Broadcast engagement is up 24%. 12 churn-risk customers identified for WhatsApp offers."}
            {activeAgent === "Finance" && "🧾 Financial Audit: Net profit margin estimated at 38%. Output GST collected is fully reconciled."}
          </p>

          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={() => setActiveView("dashboard")} className="btn btn-secondary">
              <CheckCircle2 size={16} />
              <span>Apply All Agent Suggestions</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
