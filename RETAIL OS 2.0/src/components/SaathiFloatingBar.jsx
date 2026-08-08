import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useRetail } from "../context/RetailContext";
import { SaathiCore } from "../ai/SaathiCore";
import { 
  Sparkles, 
  Send, 
  X, 
  ArrowRight, 
  Mic, 
  Zap, 
  PackageCheck, 
  TrendingUp, 
  RotateCcw,
  Package
} from "lucide-react";

export const SaathiFloatingBar = () => {
  const retailContext = useRetail();
  const { setIsCaptureModalOpen } = retailContext;
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [activeResponse, setActiveResponse] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const saathi = new SaathiCore(retailContext);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!query.trim()) return;

    const response = saathi.processIntent(query);
    setActiveResponse(response);
    setQuery("");

    if (response.route) {
      navigate(response.route);
    }
  };

  const handleQuickPrompt = (promptText) => {
    setQuery(promptText);
    const response = saathi.processIntent(promptText);
    setActiveResponse(response);

    if (response.route) {
      navigate(response.route);
    }
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      handleQuickPrompt("Bhai, Nike ke kitne joote bache hain, aur naye kab mangwane hain?");
    }, 1500);
  };

  const contextPrompts = [
    { label: "Draft PO for items running out", query: "Draft a PO for items running out this week" },
    { label: "Nike stock & reorder status", query: "Bhai, Nike ke kitne joote bache hain, aur naye kab mangwane hain?" },
    { label: "Top 5 selling products today?", query: "Top 5 selling products today?" },
    { label: "Highest supplier return rate?", query: "Kaunse supplier ka maal sabse zyada return ho raha hai?" }
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "92%",
        maxWidth: "760px",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        gap: "8px"
      }}
    >
      {/* ACTIVE INTENT RESPONSE CARD */}
      <AnimatePresence>
        {activeResponse && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            className="card-panel-elevated"
            style={{
              padding: "16px",
              boxShadow: "var(--shadow-lg)",
              border: "1px solid var(--border-focus)",
              backgroundColor: "var(--bg-surface)",
              position: "relative"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--ai-subtle)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Sparkles size={14} color="var(--ai-accent)" />
                </div>
                <span style={{ fontSize: "12px", fontWeight: "800", color: "var(--ai-accent)" }}>
                  {activeResponse.agentName}
                </span>
              </div>

              <button onClick={() => setActiveResponse(null)} className="btn btn-ghost" style={{ padding: "2px" }}>
                <X size={14} />
              </button>
            </div>

            <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-main)", marginBottom: "4px" }}>
              {activeResponse.directAnswer}
            </div>

            <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "12px" }}>
              {activeResponse.context}
            </div>

            {/* 1-CLICK ACTION CHIPS */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {activeResponse.actions?.map((act, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (act.modalTrigger === "CAPTURE") {
                      setIsCaptureModalOpen(true);
                    } else if (act.route) {
                      navigate(act.route);
                    }
                    setActiveResponse(null);
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: "6px", fontSize: "11px" }}
                >
                  <span>{act.label}</span>
                  <ArrowRight size={12} />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTEXT-AWARE SUGGESTION CHIPS */}
      <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "2px" }}>
        {contextPrompts.map((cp, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleQuickPrompt(cp.query)}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: "11px", whiteSpace: "nowrap", borderRadius: "var(--radius-pill)", gap: "4px" }}
          >
            <Zap size={11} color="var(--primary)" />
            <span>{cp.label}</span>
          </button>
        ))}
      </div>

      {/* INTENT INPUT BAR */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "8px 16px",
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--radius-pill)",
          boxShadow: "var(--shadow-lg)",
          backdropFilter: "blur(8px)"
        }}
      >
        <Sparkles size={18} color="var(--ai-accent)" />

        <input
          type="text"
          placeholder='Ask Saathi Intent: "Draft a PO for items running out", "Bhai Nike ke kitne joote bache hain?"...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--text-main)",
            fontSize: "13px",
            fontFamily: "var(--font-sans)",
            fontWeight: "500"
          }}
        />

        {/* VOICE INTENT INPUT BUTTON */}
        <button
          type="button"
          onClick={handleVoiceInput}
          className="btn btn-ghost btn-sm"
          style={{ color: isListening ? "var(--warning)" : "var(--text-muted)", padding: "6px" }}
          title="Voice Intent Input"
        >
          <Mic size={16} />
        </button>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="btn btn-ai btn-sm"
          style={{ borderRadius: "var(--radius-pill)", padding: "6px 14px" }}
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
};
