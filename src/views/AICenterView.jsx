import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { Bot, Send, Sparkles, CheckCircle2, ShieldCheck, Cpu, RefreshCw } from "lucide-react";

export const AICenterView = () => {
  const { addToast } = useRetail();

  const [inputPrompt, setInputPrompt] = useState("");
  const [activeAgent, setActiveAgent] = useState("saathi-main");
  const [messages, setMessages] = useState([
    {
      id: "msg-1",
      sender: "ai",
      agentName: "Saathi OS Brain",
      text: "VyapaarSaathi AI Command Center active. Operating under strict safety protocols (READ, SUGGEST, PREPARE, EXECUTE). How can I assist with your retail operations today?",
      timestamp: "09:00 AM"
    }
  ]);

  const quickPrompts = [
    "Analyze Q3 inventory turnover for Kapda Mafia",
    "Show me the sync error logs for Shopify",
    "Generate purchase order for low-stock Shoe Mafia sneakers",
    "Calculate total net margin across 12 channels"
  ];

  const handleSend = (textToSend) => {
    const prompt = textToSend || inputPrompt;
    if (!prompt.trim()) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt("");

    setTimeout(() => {
      let aiResponseText = `Analysis complete for: "${prompt}". Operations ledger verified. 12 channels in active sync.`;
      
      if (prompt.includes("Kapda Mafia")) {
        aiResponseText = "Kapda Mafia Q3 turnover is +24.2% YoY. Hoodies & Cargo Pants lead velocity with a 14-day stockout projection.";
      } else if (prompt.includes("Shopify")) {
        aiResponseText = "Shopify Sync Audit: 2 SKU category mapping errors detected. Instant resolution prepared.";
      } else if (prompt.includes("Shoe Mafia")) {
        aiResponseText = "Prepared Purchase Order #PO-9821 for 30 pairs of Shoe Mafia Retro Chunky Sneakers from Footwear Corp. Safety Level: PREPARE.";
      }

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        agentName: "Saathi OS Brain",
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", height: "calc(100vh - 120px)" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="h1-title">Enterprise AI Intelligence & Agent Router</h1>
          <p className="body-text" style={{ fontSize: "13px" }}>
            Operational AI assistant for inventory turnover, channel sync audits, & automated PO generation
          </p>
        </div>

        <span className="status-badge badge-ai" style={{ fontSize: "10px" }}>
          ● 12 Specialized Agents Ready
        </span>
      </div>

      {/* CHAT MESSAGES AREA */}
      <div className="card-panel" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "16px", overflow: "hidden" }}>
        
        {/* MESSAGES SCROLL */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px", paddingRight: "8px" }}>
          {messages.map((m) => {
            const isUser = m.sender === "user";

            return (
              <div
                key={m.id}
                style={{
                  alignSelf: isUser ? "flex-end" : "flex-start",
                  maxWidth: "75%",
                  padding: "12px 16px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: isUser ? "var(--primary)" : "var(--bg-elevated)",
                  color: isUser ? "#FFF" : "var(--text-main)",
                  border: isUser ? "none" : "1px solid var(--border-color)"
                }}
              >
                {!isUser && (
                  <div style={{ fontSize: "10px", fontWeight: "700", color: "var(--ai-accent)", textTransform: "uppercase", marginBottom: "4px" }}>
                    {m.agentName}
                  </div>
                )}
                <div style={{ fontSize: "13px", lineHeight: "1.4" }}>{m.text}</div>
                <div style={{ fontSize: "9px", opacity: 0.7, textAlign: "right", marginTop: "4px" }}>{m.timestamp}</div>
              </div>
            );
          })}
        </div>

        {/* OPERATIONAL QUICK PROMPTS */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", margin: "12px 0" }}>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(qp)}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: "11px", backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-color)", padding: "4px 10px" }}
            >
              ⚡ {qp}
            </button>
          ))}
        </div>

        {/* INPUT PROMPT BAR */}
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask AI assistant regarding inventory, channel sync logs, PO generation, or margins..."
            className="input-field"
            style={{ flex: 1 }}
          />

          <button type="button" onClick={() => handleSend()} className="btn btn-ai" style={{ gap: "6px" }}>
            <Send size={16} /> Send Command
          </button>
        </div>

      </div>

    </div>
  );
};
