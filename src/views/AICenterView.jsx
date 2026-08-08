import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRetail } from "../context/RetailContext";
import { AGENT_TEAM, routeQueryToAgent } from "../ai/SaathiAgentRouter";
import { 
  Bot, 
  Send, 
  Sparkles, 
  Package, 
  ShoppingBag, 
  Zap, 
  DollarSign, 
  Users, 
  BarChart3, 
  HelpCircle, 
  ShieldCheck, 
  ArrowRight,
  RefreshCw 
} from "lucide-react";

export const AICenterView = () => {
  const { products, orders, stores } = useRetail();
  const navigate = useNavigate();

  const [activeAgentId, setActiveAgentId] = useState("saathi");
  const [inputQuery, setInputQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "msg-init",
      sender: "agent",
      agent: AGENT_TEAM[0],
      text: "Namaste! Main **Saathi** hoon — aapka AI Business Partner. What would you like to check or execute today?",
      ctas: [
        { label: "Open My Day Workday", path: "/superpowers", type: "action" },
        { label: "Check Stock Levels", path: "/inventory", type: "navigate" }
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputQuery.trim()) return;

    const userMsg = {
      id: `msg-user-${Date.now()}`,
      sender: "user",
      text: inputQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const routed = routeQueryToAgent(inputQuery, { products, orders, stores });
    
    const agentMsg = {
      id: `msg-agent-${Date.now()}`,
      sender: "agent",
      agent: routed.agent,
      text: routed.response,
      ctas: routed.ctas,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg, agentMsg]);
    setInputQuery("");
  };

  const handleAgentSelect = (agent) => {
    setActiveAgentId(agent.id);
    const greetingMsg = {
      id: `msg-agent-switch-${Date.now()}`,
      sender: "agent",
      agent: agent,
      text: `Hello! I am your **${agent.name}** (${agent.role}). Ask me anything regarding ${agent.desc.toLowerCase()}.`,
      ctas: [],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setMessages((prev) => [...prev, greetingMsg]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="h1-title">Saathi AI Agent Team & Router</h1>
          <p className="body-text" style={{ fontSize: "13px" }}>
            10 Coordinated specialized business agents translating natural language into direct operational execution
          </p>
        </div>
      </div>

      {/* 10 SPECIALIZED AGENT SELECTION TABS */}
      <div className="card-panel" style={{ display: "flex", gap: "8px", overflowX: "auto", padding: "12px" }}>
        {AGENT_TEAM.map((agent) => (
          <button
            key={agent.id}
            onClick={() => handleAgentSelect(agent)}
            className={`btn btn-sm ${activeAgentId === agent.id ? "btn-primary" : "btn-secondary"}`}
            style={{ gap: "6px", whiteSpace: "nowrap" }}
          >
            <Bot size={14} color={activeAgentId === agent.id ? "#FFFFFF" : agent.color} />
            <span>{agent.name}</span>
          </button>
        ))}
      </div>

      {/* CHAT MESSAGES WINDOW */}
      <div
        className="card-panel"
        style={{
          minHeight: "440px",
          maxHeight: "560px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "20px"
        }}
      >
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: isUser ? "flex-end" : "flex-start",
                gap: "6px"
              }}
            >
              {!isUser && msg.agent && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: "700", color: msg.agent.color }}>
                  <Bot size={14} />
                  <span>{msg.agent.name} • {msg.agent.role}</span>
                </div>
              )}

              <div
                style={{
                  maxWidth: "80%",
                  padding: "12px 16px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: isUser ? "var(--primary)" : "var(--bg-elevated)",
                  color: isUser ? "#FFFFFF" : "var(--text-main)",
                  border: isUser ? "none" : "1px solid var(--border-color)",
                  whiteSpace: "pre-line",
                  fontSize: "13px",
                  lineHeight: "1.6"
                }}
              >
                {msg.text}
              </div>

              {/* INTERACTIVE DEEP LINK CTAs */}
              {!isUser && msg.ctas && msg.ctas.length > 0 && (
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "4px" }}>
                  {msg.ctas.map((cta, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigate(cta.path)}
                      className="btn btn-secondary btn-sm"
                      style={{ gap: "4px" }}
                    >
                      <span>{cta.label}</span>
                      <ArrowRight size={12} />
                    </button>
                  ))}
                </div>
              )}

              <span style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "2px" }}>
                {msg.timestamp}
              </span>
            </div>
          );
        })}
      </div>

      {/* INPUT BAR */}
      <form onSubmit={handleSendMessage} className="card-panel" style={{ display: "flex", gap: "10px", alignItems: "center", padding: "10px 14px" }}>
        <input
          type="text"
          className="input-field"
          placeholder="Ask Saathi anything: 'Kitna stock hai?', 'Barcode kaise banaye?', 'Profit why down?'..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-ai" style={{ gap: "6px" }}>
          <span>Send</span>
          <Send size={14} />
        </button>
      </form>

    </div>
  );
};
