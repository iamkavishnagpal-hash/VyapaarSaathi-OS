// 12 Specialized AI Business Team & Router with Action Safety Engine

export const AGENT_TEAM = [
  { id: "saathi", name: "Saathi", role: "Host & Receptionist", desc: "Business navigator and app assistant", color: "#3B82F6", safety: "READ" },
  { id: "inventory", name: "Inventory Manager", role: "Stock Controller", desc: "Monitors stockouts, dead stock, and transfers", color: "#10B981", safety: "PREPARE" },
  { id: "sales", name: "Sales Assistant", role: "POS Lead", desc: "Assists with checkout, product search, and prices", color: "#8B5CF6", safety: "READ" },
  { id: "purchase", name: "Purchase Manager", role: "Procurement Officer", desc: "Supplier POs and reorders", color: "#F59E0B", safety: "EXECUTE" },
  { id: "finance", name: "Finance Assistant", role: "Chief Accountant", desc: "Revenue, expenses, and cash flow", color: "#EC4899", safety: "READ" },
  { id: "customer", name: "Customer Manager", role: "CRM Specialist", desc: "Customer 360 and repeat retention", color: "#06B6D4", safety: "SUGGEST" },
  { id: "analyst", name: "Business Analyst", role: "Data Scientist", desc: "WHY analysis, health score, and forecasting", color: "#6366F1", safety: "READ" },
  { id: "ecommerce", name: "Ecommerce Manager", role: "Multichannel Specialist", desc: "Shopify, WhatsApp catalog, and online listings", color: "#14B8A6", safety: "EXECUTE" },
  { id: "fulfillment", name: "Fulfillment Manager", role: "Packing Lead", desc: "Smart packing verification and shipping", color: "#F43F5E", safety: "PREPARE" },
  { id: "trainer", name: "App Trainer", role: "SOP Guide", desc: "Teaches workflows with 'Take Me There'", color: "#64748B", safety: "READ" },
  { id: "automation", name: "Automation Manager", role: "Autopilot Lead", desc: "SOP builder and background rules", color: "#A855F7", safety: "EXECUTE" },
  { id: "coach", name: "Business Coach", role: "Retail Advisor", desc: "Retail wisdom and growth strategies", color: "#D97706", safety: "READ" }
];

export const routeQueryToAgent = (query, context = {}) => {
  const q = query.toLowerCase();

  if (q.includes("shopify") || q.includes("listing") || q.includes("channel") || q.includes("online store")) {
    const ecomAgent = AGENT_TEAM.find((a) => a.id === "ecommerce");
    return {
      agent: ecomAgent,
      response: "Shopify channel sync is active (92% health). 4 products require category re-mapping before publishing.",
      ctas: [
        { label: "Open Shopify Listings", path: "/listings", type: "navigate" },
        { label: "View Channel Center", path: "/channels", type: "navigate" }
      ]
    };
  }

  if (q.includes("pack") || q.includes("ship") || q.includes("fulfillment") || q.includes("courier")) {
    const fulAgent = AGENT_TEAM.find((a) => a.id === "fulfillment");
    return {
      agent: fulAgent,
      response: "Fulfillment Autopilot has 3 pending packing tasks. Order #ORD-1042 packing verification is 50% complete.",
      ctas: [
        { label: "Open Smart Packing Scanner", path: "/fulfillment", type: "navigate" }
      ]
    };
  }

  if (q.includes("sop") || q.includes("automate") || q.includes("autopilot")) {
    const autoAgent = AGENT_TEAM.find((a) => a.id === "automation");
    return {
      agent: autoAgent,
      response: "3 Active SOP Workflows running in background. High-risk actions require explicit user confirmation.",
      ctas: [
        { label: "Open SOP Builder", path: "/automations", type: "navigate" }
      ]
    };
  }

  if (q.includes("stock") || q.includes("inventory") || q.includes("sku") || q.includes("kitna")) {
    const stockAgent = AGENT_TEAM.find((a) => a.id === "inventory");
    return {
      agent: stockAgent,
      response: `Checking real-time stock levels...\nTotal catalog products: ${context.products?.length || 12}. 4 products are approaching reorder threshold.`,
      ctas: [
        { label: "View Inventory Matrix", path: "/inventory", type: "navigate" },
        { label: "View Cash Locked in Stock", path: "/superpowers", type: "navigate" }
      ]
    };
  }

  // Default Saathi
  const saathi = AGENT_TEAM[0];
  return {
    agent: saathi,
    response: `Namaste! Main **Saathi** (Host). You asked: "${query}". I am routing your request to the specialized business team.`,
    ctas: [
      { label: "Take Me to My Day", path: "/superpowers", type: "navigate" },
      { label: "Open Channel Center", path: "/channels", type: "navigate" }
    ]
  };
};
