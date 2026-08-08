import React from "react";

export const IdentityRing = ({ 
  percentage = 92, 
  size = 44, 
  strokeWidth = 4, 
  color = "var(--primary)", 
  label = null 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
      <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          {/* BACKGROUND TRACK */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="var(--border-color)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* ANIMATED PROGRESS RING */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}
          />
        </svg>

        <div 
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: `${Math.max(10, size * 0.28)}px`,
            fontWeight: "800",
            fontFamily: "var(--font-mono)",
            color: "var(--text-main)"
          }}
        >
          {percentage}%
        </div>
      </div>

      {label && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-main)" }}>{label}</span>
          <span className="caption" style={{ fontSize: "11px" }}>Verification Score</span>
        </div>
      )}
    </div>
  );
};
