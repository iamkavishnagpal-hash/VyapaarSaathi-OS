import React from "react";

export const IdentityRing = ({ status = "verified", size = 12 }) => {
  let colorClass = "verified";
  let label = "Verified Identity";

  if (status === "pending" || status === false) {
    colorClass = "pending";
    label = "Pending Verification";
  } else if (status === "ai-approved") {
    colorClass = "ai-approved";
    label = "AI Approved Identity";
  }

  return (
    <span
      className={`identity-ring ${colorClass}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      title={label}
    />
  );
};
