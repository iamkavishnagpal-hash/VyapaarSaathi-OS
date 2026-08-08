import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, HelpCircle, ArrowRight, BookOpen, CheckCircle2, AlertTriangle, PlayCircle, Bot } from "lucide-react";

export const HelpCenterView = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const helpTopics = [
    {
      id: "help-barcode",
      category: "products",
      title: "How to Generate & Print Barcodes",
      what: "A unique machine-readable Code 128 identity assigned to every physical product in your catalog.",
      why: "Enables instant 1-second POS billing checkout and eliminates manual inventory data-entry errors.",
      how: ["Open Products catalog", "Click the 'Identity Barcode' button", "Choose thermal label template", "Click Print Thermal Label"],
      mistakes: "Using non-unique barcode values or printing on uncalibrated paper.",
      actionPath: "/products",
      actionLabel: "Try Barcode Generator"
    },
    {
      id: "help-capture",
      category: "ai",
      title: "AI Camera Product Analysis Pipeline",
      what: "Computer vision camera recognition that reads physical product packaging, labels, and barcodes.",
      why: "Automatically extracts Brand, Model, SKU, Color, and MRP in 3 seconds without typing.",
      how: ["Click '+ Add Product' -> 'Product Analysis'", "Position product box inside target frame", "Review confidence scores per attribute", "Confirm & Generate Identity Card"],
      mistakes: "Covering the barcode or photographing in low-light environments.",
      actionPath: "/products",
      actionLabel: "Try Camera Capture"
    },
    {
      id: "help-pos",
      category: "sales",
      title: "Fast POS Billing Checkout",
      what: "High-speed retail billing register for cash, card, & UPI transactions.",
      why: "Reduces customer waiting time and automatically updates stock levels across store locations.",
      how: ["Open Sales / POS view", "Scan item barcode or search catalog", "Assign customer account (optional)", "Select payment method & complete checkout"],
      mistakes: "Forgetting to apply discounts before completing payment.",
      actionPath: "/sales",
      actionLabel: "Open POS Register"
    },
    {
      id: "help-transfer",
      category: "inventory",
      title: "Inter-Store Stock Transfers",
      what: "Move physical inventory from main Warehouse to storefront locations.",
      why: "Balances stock velocity and prevents stockouts at high-traffic retail locations.",
      how: ["Open Transfers view", "Click 'Create Transfer Request'", "Select Source Store, Target Store, & Quantity", "Approve transfer to update live stock"],
      mistakes: "Transferring more units than available in source store.",
      actionPath: "/transfers",
      actionLabel: "Try Stock Transfer"
    },
    {
      id: "help-autopilot",
      category: "superpowers",
      title: "Business Autopilot & My Day Workday",
      what: "AI-guided daily execution list and autonomous low-risk reorder automation.",
      why: "Provides a structured workday so business owners never miss critical tasks.",
      how: ["Open Superpowers view", "Select Autopilot Mode (Suggest, Approve, or Auto)", "Click 'Start Guided Workday'"],
      mistakes: "Ignoring high-priority low-stock warnings.",
      actionPath: "/superpowers",
      actionLabel: "Explore Superpowers"
    }
  ];

  const filteredTopics = helpTopics.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.what.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === "all" || t.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="h1-title">VyapaarSaathi Help & Learn Center</h1>
          <p className="body-text" style={{ fontSize: "13px" }}>
            Searchable user manual, step-by-step feature walkthroughs, and 'Take Me There' deep links
          </p>
        </div>
      </div>

      {/* SEARCH BAR & CATEGORIES */}
      <div className="card-panel" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Search size={18} color="var(--primary)" />
          <input
            type="text"
            className="input-field"
            placeholder="Search help topics (e.g. barcode, POS, stock transfer, AI)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", gap: "8px", overflowX: "auto" }}>
          {["all", "products", "inventory", "sales", "ai", "superpowers"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn btn-sm ${activeCategory === cat ? "btn-primary" : "btn-secondary"}`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* HELP TOPICS LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filteredTopics.map((topic) => (
          <div key={topic.id} className="card-panel" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <BookOpen size={20} color="var(--primary)" />
                <span style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-main)" }}>{topic.title}</span>
              </div>
              <span className="status-badge badge-muted">{topic.category}</span>
            </div>

            <div className="grid-12" style={{ gap: "12px" }}>
              <div className="col-6" style={{ backgroundColor: "var(--bg-elevated)", padding: "10px", borderRadius: "var(--radius-xs)", border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)" }}>WHAT IS THIS?</div>
                <div style={{ fontSize: "12px", color: "var(--text-main)", marginTop: "4px" }}>{topic.what}</div>
              </div>

              <div className="col-6" style={{ backgroundColor: "var(--bg-elevated)", padding: "10px", borderRadius: "var(--radius-xs)", border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)" }}>WHY USE IT?</div>
                <div style={{ fontSize: "12px", color: "var(--text-main)", marginTop: "4px" }}>{topic.why}</div>
              </div>
            </div>

            {/* HOW TO USE STEPS */}
            <div style={{ padding: "10px", borderRadius: "var(--radius-xs)", backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-color)" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)", marginBottom: "6px" }}>HOW TO USE STEP-BY-STEP:</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "6px" }}>
                {topic.how.map((step, idx) => (
                  <div key={idx} style={{ fontSize: "12px", color: "var(--text-main)", display: "flex", alignItems: "center", gap: "6px" }}>
                    <CheckCircle2 size={14} color="var(--success)" />
                    <span>{idx + 1}. {step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTION FOOTER */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
              <div style={{ fontSize: "11px", color: "var(--warning)", display: "flex", alignItems: "center", gap: "4px" }}>
                <AlertTriangle size={14} /> Avoid: {topic.mistakes}
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => navigate("/ai")} className="btn btn-ghost btn-sm" style={{ gap: "4px" }}>
                  <Bot size={14} /> Ask Saathi
                </button>

                <button onClick={() => navigate(topic.actionPath)} className="btn btn-primary btn-sm" style={{ gap: "6px" }}>
                  <span>{topic.actionLabel}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
