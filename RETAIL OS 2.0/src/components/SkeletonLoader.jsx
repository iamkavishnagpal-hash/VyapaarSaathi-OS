import React from "react";

export const SkeletonLoader = ({ type = "card", count = 3 }) => {
  if (type === "kpi") {
    return (
      <div className="grid-12">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="col-3 card-panel" style={{ opacity: 0.6, animation: "pulse 1.5s infinite" }}>
            <div style={{ width: "60%", height: "12px", backgroundColor: "var(--border-color)", borderRadius: "var(--radius-xs)", marginBottom: "8px" }} />
            <div style={{ width: "40%", height: "24px", backgroundColor: "var(--border-color)", borderRadius: "var(--radius-xs)" }} />
          </div>
        ))}
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className="table-container" style={{ opacity: 0.6, animation: "pulse 1.5s infinite" }}>
        <div style={{ height: "40px", backgroundColor: "var(--bg-elevated)", borderBottom: "1px solid var(--border-color)", marginBottom: "8px" }} />
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{ display: "flex", gap: "16px", padding: "12px", borderBottom: "1px solid var(--border-color)" }}>
            <div style={{ width: "30%", height: "16px", backgroundColor: "var(--border-color)", borderRadius: "var(--radius-xs)" }} />
            <div style={{ width: "20%", height: "16px", backgroundColor: "var(--border-color)", borderRadius: "var(--radius-xs)" }} />
            <div style={{ width: "20%", height: "16px", backgroundColor: "var(--border-color)", borderRadius: "var(--radius-xs)" }} />
            <div style={{ width: "20%", height: "16px", backgroundColor: "var(--border-color)", borderRadius: "var(--radius-xs)" }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid-12">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="col-4 card-panel" style={{ opacity: 0.6, animation: "pulse 1.5s infinite", padding: "16px" }}>
          <div style={{ width: "50%", height: "16px", backgroundColor: "var(--border-color)", borderRadius: "var(--radius-xs)", marginBottom: "12px" }} />
          <div style={{ width: "100%", height: "12px", backgroundColor: "var(--border-color)", borderRadius: "var(--radius-xs)", marginBottom: "8px" }} />
          <div style={{ width: "80%", height: "12px", backgroundColor: "var(--border-color)", borderRadius: "var(--radius-xs)" }} />
        </div>
      ))}
    </div>
  );
};
