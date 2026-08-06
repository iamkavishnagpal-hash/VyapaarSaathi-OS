import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { 
  Bot, 
  Sparkles, 
  Send, 
  Mic, 
  BrainCircuit, 
  TrendingUp, 
  Package, 
  Megaphone, 
  Lightbulb
} from "lucide-react";

export const AICenterView = () => {
  const { products, orders, isListening, voiceTranscript, toggleVoiceListening, t } = useRetail();

  const [activeAgent, setActiveAgent] = useState("CEO"); // "CEO", "Inventory", "Marketing", "Finance"
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "AI CEO Advisor",
      text: "Namaste! I'm your Retail OS AI Business Advisor. I monitor your inventory sync, daily sales, profit margins, and GST compliance in real time. How can I assist your business today?",
      timestamp: "Just now"
    }
  ]);
  const [inputQuery, setInputQuery] = useState("");

  const handleSendMessage = (queryText = null) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "User",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery("");

    // Simulate AI response based on active agent
    setTimeout(() => {
      let aiResponseText = "";
      const q = textToSend.toLowerCase();

      if (q.includes("top selling") || q.includes("popular") || q.includes("best")) {
        aiResponseText = "📊 Based on today's POS ledger, your top selling item is **Cotton Printed Kurti Set** (15 units sold, ₹19,485 revenue). Reorder recommended before Friday.";
      } else if (q.includes("reorder") || q.includes("stock") || q.includes("low")) {
        const lowStock = products.filter((p) => p.stockQty <= p.lowStockThreshold);
        aiResponseText = `⚠️ Stock Alert: You currently have **${lowStock.length} low stock items**:\n1. Wireless Earbuds Pro (8 units left)\n2. Designer Leather Wallet (3 units left)\nI suggest generating a PO for ₹14,500 total cost.`;
      } else if (q.includes("whatsapp") || q.includes("offer") || q.includes("campaign")) {
        aiResponseText = "💬 Marketing Advice: I found 12 customers who haven't ordered in 30 days. Sending a WhatsApp broadcast with code `DIWALI10` could recover ~₹18,000 in sales. Go to WhatsApp Comms to trigger.";
      } else if (q.includes("gst") || q.includes("tax") || q.includes("finance")) {
        aiResponseText = "🧾 GST Tax Breakdown for Today:\n• Total Output GST Collected: ₹526 (CGST ₹263 + SGST ₹263)\n• Net Tax Liability is up to date and ready for GSTR-3B filing.";
      } else {
        aiResponseText = `💡 AI Advisor Insight: I have analyzed your request ("${textToSend}"). All retail store systems are operating at peak efficiency with ₹${orders.reduce((acc, o) => acc + o.total, 0)} total sales recorded today.`;
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: `${activeAgent} Advisor`,
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="view-container" style={{ display: "flex", gap: "20px", height: "calc(100vh - 110px)", overflow: "hidden" }}>
      
      {/* Left Agent Selector & Suggested Actions */}
      <div style={{ width: "320px", display: "flex", flexDirection: "column", gap: "16px" }}>
        
        {/* Agent Persona Tabs */}
        <div className="glass-panel" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#fff", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <BrainCircuit size={18} color="var(--primary)" /> AI Agent Team
          </h3>

          {[
            { id: "CEO", title: "AI CEO Advisor", desc: "Overall business health & profit", icon: Sparkles, color: "var(--primary)" },
            { id: "Inventory", title: "AI Inventory Manager", desc: "Reorder levels & dead stock", icon: Package, color: "#10b981" },
            { id: "Marketing", title: "AI Marketing Manager", desc: "WhatsApp offers & repeat sales", icon: Megaphone, color: "#f59e0b" },
            { id: "Finance", title: "AI Finance Manager", desc: "GST tax compliance & margins", icon: TrendingUp, color: "#a855f7" }
          ].map((agent) => {
            const Icon = agent.icon;
            const isSelected = activeAgent === agent.id;

            return (
              <div
                key={agent.id}
                onClick={() => setActiveAgent(agent.id)}
                className="glass-card"
                style={{
                  padding: "10px 12px",
                  cursor: "pointer",
                  background: isSelected ? "rgba(99, 102, 241, 0.2)" : "transparent",
                  border: isSelected ? `1px solid ${agent.color}` : "1px solid var(--border-color)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                <div style={{ background: "rgba(0,0,0,0.3)", padding: "8px", borderRadius: "8px" }}>
                  <Icon size={18} color={agent.color} />
                </div>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "#fff" }}>{agent.title}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>{agent.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Voice OS Status HUD */}
        <div className="glass-panel" style={{ padding: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "#fff", display: "flex", alignItems: "center", gap: "6px" }}>
              <Mic size={16} color={isListening ? "#ef4444" : "var(--primary)"} />
              Voice OS Control
            </div>
            <button
              onClick={toggleVoiceListening}
              className={`btn ${isListening ? "mic-active" : "btn-secondary"}`}
              style={{ fontSize: "0.72rem", padding: "4px 8px" }}
            >
              {isListening ? "Listening" : "Speak"}
            </button>
          </div>

          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontStyle: "italic" }}>
            {voiceTranscript ? `"${voiceTranscript}"` : t("voiceHelp")}
          </div>
        </div>

        {/* Quick Question Chips */}
        <div className="glass-panel" style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ fontSize: "0.8rem", fontWeight: "700", color: "#fff", display: "flex", alignItems: "center", gap: "6px" }}>
            <Lightbulb size={16} color="#fbbf24" /> Quick AI Prompts
          </div>

          {[
            "What's my top selling item today?",
            "Generate reorder plan for low stock",
            "Draft WhatsApp campaign for inactive customers",
            "Explain GST tax liability for this month"
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="btn btn-secondary"
              style={{ fontSize: "0.78rem", justifyContent: "flex-start", textAlign: "left", padding: "8px 10px" }}
            >
              {prompt}
            </button>
          ))}
        </div>

      </div>

      {/* Right Chat Conversation Workspace */}
      <div className="glass-panel" style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px", overflow: "hidden" }}>
        
        {/* Workspace Header */}
        <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", marginBottom: "14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ background: "var(--primary-glow)", padding: "8px", borderRadius: "10px" }}>
              <Bot size={22} color="var(--primary)" />
            </div>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#fff", margin: 0 }}>
                {activeAgent} Assistant
              </h3>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Connected to real-time inventory & POS data</span>
            </div>
          </div>
          <span className="badge badge-success">Online & Listening</span>
        </div>

        {/* Messages Stream */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "14px", paddingRight: "6px", marginBottom: "14px" }}>
          {messages.map((m) => {
            const isUser = m.sender === "User";

            return (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isUser ? "flex-end" : "flex-start"
                }}
              >
                <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginBottom: "4px", padding: "0 4px" }}>
                  {m.sender} • {m.timestamp}
                </div>

                <div
                  style={{
                    maxWidth: "80%",
                    padding: "12px 16px",
                    borderRadius: "14px",
                    background: isUser ? "linear-gradient(135deg, var(--primary) 0%, #4338ca 100%)" : "rgba(23, 30, 48, 0.9)",
                    border: isUser ? "none" : "1px solid var(--border-color)",
                    color: "#fff",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                    whiteSpace: "pre-line"
                  }}
                >
                  {m.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat Input Field */}
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            className="input-field"
            placeholder={t("askAIPlaceholder")}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            <Send size={16} />
            <span>{t("send")}</span>
          </button>
        </form>

      </div>

    </div>
  );
};
