import React from "react";
import { ShieldCheck, Lock, CheckCircle2, FileText, Award } from "lucide-react";

export const TrustComplianceBanner = () => {
  return (
    <div 
      className="card-panel" 
      style={{ 
        background: "linear-gradient(135deg, rgba(16, 22, 34, 0.95) 0%, rgba(24, 32, 48, 0.9) 100%)",
        border: "1px solid rgba(59, 130, 246, 0.3)",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
        padding: "14px 20px"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        
        {/* GSTIN VERIFIED BADGE */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ padding: "8px", borderRadius: "var(--radius-sm)", backgroundColor: "rgba(16, 185, 129, 0.15)", color: "var(--success)" }}>
            <ShieldCheck size={18} />
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.04em" }}>
              Enterprise Compliance
            </div>
            <div style={{ fontSize: "13px", fontWeight: "800", color: "var(--text-main)" }}>
              GSTIN: 07AAAFK9812K1Z5 <span style={{ color: "var(--success)", fontSize: "11px", fontWeight: "700" }}>✓ Active & Verified</span>
            </div>
          </div>
        </div>

        {/* BANK-GRADE ENCRYPTION BADGE */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ padding: "8px", borderRadius: "var(--radius-sm)", backgroundColor: "rgba(59, 130, 246, 0.15)", color: "var(--primary)" }}>
            <Lock size={18} />
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.04em" }}>
              Bank-Grade Data Security
            </div>
            <div style={{ fontSize: "13px", fontWeight: "800", color: "var(--text-main)" }}>
              256-Bit SSL Encrypted • ISO 27001 Certified
            </div>
          </div>
        </div>

        {/* IMMUTABLE AUDIT LOG */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ padding: "8px", borderRadius: "var(--radius-sm)", backgroundColor: "rgba(139, 92, 246, 0.15)", color: "var(--ai-accent)" }}>
            <FileText size={18} />
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.04em" }}>
              Audit Trail Ledger
            </div>
            <div style={{ fontSize: "13px", fontWeight: "800", color: "var(--text-main)" }}>
              Real-Time Automated Ledger Sync
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
