import React, { useState } from "react";
import { useRetail } from "../context/RetailContext";
import { SaathiCore } from "../ai/SaathiCore";
import { Sparkles, Send, Bot, CheckCircle2, ArrowRight, Zap } from "lucide-react";

export const AICenterView = () => {
  const retailContext = useRetail();
  const saathi = new SaathiCore(retailContext);

  const [query, setQuery] = useState("");
  const [activeResponse, setActiveResponse] = useState(null);

  const contextPrompts = [
    { title: "Supplier Defect & Return Analysis", text: "Kaunse supplier ka maal sabse zyada return ho raha hai?" },
    { title: "Nike Stock & Shipment Tracker", text: "Bhai, Nike ke kitne joote bache hain, aur naye kab mangwane hain?" },
    { title: "Reorder Draft Execution", text: "Draft a PO for items running out this week" },
    { title: "Today's Top Sales Velocity", text: "Top 5 selling products today?" }
  ];

  const handleAsk = (promptText) => {
    const q = promptText || query;
    if (!q.trim()) return;
    const res = saathi.processIntent(q);
    setActiveResponse(res);
    if (!promptText) setQuery("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="h1-title">Cross-Domain Business Intelligence</h1>
          <p className="body-text" style={{ fontSize: "13px" }}>
            Query inventory velocity, supplier defect ratios, and predictive demand reasoning
          </p>
        </div>
      </div>

      {/* CONTEXT-AWARE PROMPTS GRID */}
      <div className="grid-12">
        {contextPrompts.map((cp, idx) => (
          <button
            key={idx}
            onClick={() => handleAsk(cp.text)}
            className="col-6 card-panel card-hoverable"
            style={{ textAlign: "left", cursor: "pointer", borderLeft: "4px solid var(--ai-accent)" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <Zap size={14} color="var(--ai-accent)" />
              <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>{cp.title}</span>
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>"{cp.text}"</div>
          </button>
        ))}
      </div>

      {/* ACTIVE INTENT RESPONSE CARD */}
      {activeResponse && (
        <div className="card-panel-elevated" style={{ padding: "20px", border: "1px solid var(--border-focus)", backgroundColor: "var(--bg-surface)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <Sparkles size={16} color="var(--ai-accent)" />
            <span style={{ fontSize: "13px", fontWeight: "800", color: "var(--ai-accent)" }}>
              {activeResponse.agentName}
            </span>
          </div>

          <div style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-main)", marginBottom: "6px" }}>
            {activeResponse.directAnswer}
          </div>

          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "16px" }}>
            {activeResponse.context}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            {activeResponse.actions?.map((act, idx) => (
              <a key={idx} href={act.route || "#"} className="btn btn-secondary btn-sm" style={{ gap: "6px" }}>
                <span>{act.label}</span>
                <ArrowRight size={12} />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* INPUT FORM */}
      <form onSubmit={(e) => { e.preventDefault(); handleAsk(); }} className="card-panel" style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <input
          type="text"
          className="input-field"
          placeholder='Ask cross-domain question: "Kaunse supplier ka maal sabse zyada return ho raha hai?"...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-ai" style={{ gap: "6px" }}>
          <Send size={14} /> Ask Saathi
        </button>
      </form>

    </div>
  );
};
