import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useRetail } from "../context/RetailContext";
import { Mic, MicOff, X, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export const VoiceOSModal = () => {
  const { isVoiceModalOpen, setIsVoiceModalOpen, products, orders, addToast } = useRetail();
  const navigate = useNavigate();

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [voiceResult, setVoiceResult] = useState(null);

  useEffect(() => {
    if (isVoiceModalOpen) {
      setIsListening(true);
      setTranscript("Listening...");
      const timer = setTimeout(() => {
        setIsListening(false);
        setTranscript("Maggi ka stock kitna hai?");
        setVoiceResult({
          intent: "STOCK_QUERY",
          reply: "Maggi 70g Instant Noodles ke 42 packets available hain (Shelf Zone E-4).",
          actionLabel: "View Product Passport",
          actionPath: `/products/${products[0]?.id || "prod-101"}`
        });
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [isVoiceModalOpen]);

  if (!isVoiceModalOpen) return null;

  const handleSimulateVoice = (sampleText) => {
    setIsListening(true);
    setTranscript(`"${sampleText}"`);
    setTimeout(() => {
      setIsListening(false);
      if (sampleText.includes("sale")) {
        const totalRev = orders.reduce((sum, o) => sum + o.totalAmount, 0);
        setVoiceResult({
          intent: "SALES_QUERY",
          reply: `Aaj total **$${totalRev.toLocaleString()}** ki sales hui hain from ${orders.length} orders.`,
          actionLabel: "Open Sales POS",
          actionPath: "/sales"
        });
      } else if (sampleText.includes("transfer")) {
        setVoiceResult({
          intent: "TRANSFER_ACTION",
          reply: "Warehouse B se Flagship Store mein 20 packets transfer karne ka order draft kar diya hai. Confirm transfer?",
          actionLabel: "Confirm Stock Transfer",
          actionPath: "/transfers"
        });
      } else {
        setVoiceResult({
          intent: "GENERAL",
          reply: "Product **Quantum Sound Pro Headphones** currently has 12 units available.",
          actionLabel: "View Products",
          actionPath: "/products"
        });
      }
    }, 1200);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(8, 11, 16, 0.85)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        zIndex: 1000
      }}
      onClick={() => setIsVoiceModalOpen(false)}
    >
      <motion.div
        className="card-panel-elevated"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.2 }}
        style={{
          width: "100%",
          maxWidth: "520px",
          padding: "24px",
          textAlign: "center",
          border: "1px solid var(--border-color)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Mic size={18} color="var(--primary)" />
            <span style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-main)" }}>Voice Business OS</span>
          </div>
          <button onClick={() => setIsVoiceModalOpen(false)} className="btn btn-ghost" style={{ padding: "4px" }}>
            <X size={18} />
          </button>
        </div>

        {/* MICROPHONE ANIMATION PULSE */}
        <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: isListening ? "var(--primary-subtle)" : "var(--bg-surface)",
              border: isListening ? "2px solid var(--primary)" : "1px solid var(--border-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: isListening ? "0 0 24px var(--primary)" : "none",
              transition: "all 0.3s ease"
            }}
          >
            <Mic size={36} color={isListening ? "var(--primary)" : "var(--text-muted)"} />
          </div>
        </div>

        <div style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-main)", marginBottom: "6px" }}>
          {transcript}
        </div>
        <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "16px" }}>
          Speak naturally in Hindi, Hinglish, English, or your preferred local language
        </div>

        {/* SAMPLE VOICE PROMPTS */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center", marginBottom: "16px" }}>
          <button onClick={() => handleSimulateVoice("Aaj kitni sale hui?")} className="btn btn-secondary btn-sm">
            "Aaj kitni sale hui?"
          </button>
          <button onClick={() => handleSimulateVoice("Maggi ka stock kitna hai?")} className="btn btn-secondary btn-sm">
            "Maggi stock kitna hai?"
          </button>
          <button onClick={() => handleSimulateVoice("20 packet warehouse se transfer karo")} className="btn btn-secondary btn-sm">
            "20 packet transfer karo"
          </button>
        </div>

        {/* VOICE AI RESULT DISPLAY */}
        {voiceResult && (
          <div style={{ padding: "14px", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-color)", textAlign: "left" }}>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-main)" }}>
              {voiceResult.reply}
            </div>
            <button
              onClick={() => {
                setIsVoiceModalOpen(false);
                navigate(voiceResult.actionPath);
              }}
              className="btn btn-primary btn-sm"
              style={{ marginTop: "10px", gap: "4px" }}
            >
              <span>{voiceResult.actionLabel}</span>
              <ArrowRight size={12} />
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
};
