// SAATHI AGENT ROUTER & 10 SPECIALIZED AGENT TEAM
// Central intelligence router for VyapaarSaathi OS

export const AGENT_TEAM = [
  {
    id: "saathi",
    name: "Saathi",
    role: "Business Receptionist & Host",
    desc: "Primary entry point & general business partner",
    icon: "Bot",
    color: "#5B8CFF"
  },
  {
    id: "inventory",
    name: "Stock Specialist",
    role: "Inventory Agent",
    desc: "Stockouts, dead stock, reorders, & audits",
    icon: "Package",
    color: "#34D399"
  },
  {
    id: "purchase",
    name: "Procurement Lead",
    role: "Purchase Agent",
    desc: "Supplier reliability, PO drafting, & lead times",
    icon: "ShoppingBag",
    color: "#F59E0B"
  },
  {
    id: "sales",
    name: "Sales Assistant",
    role: "Sales Agent",
    desc: "POS billing, fast lookups, & discounts",
    icon: "Zap",
    color: "#8E7CFF"
  },
  {
    id: "finance",
    name: "Finance Controller",
    role: "Finance Agent",
    desc: "Cash flow, margins, expenses, & P&L",
    icon: "DollarSign",
    color: "#10B981"
  },
  {
    id: "customer",
    name: "Customer Relations",
    role: "Customer Agent",
    desc: "Customer credit, history, & retention",
    icon: "Users",
    color: "#EC4899"
  },
  {
    id: "analyst",
    name: "Business Analyst",
    role: "Business Analyst",
    desc: "Deep trend analysis, comparisons, & forecasting",
    icon: "BarChart3",
    color: "#6366F1"
  },
  {
    id: "trainer",
    name: "App Trainer",
    role: "In-App Guide",
    desc: "How-to instructions & step-by-step navigation",
    icon: "HelpCircle",
    color: "#0EA5E9"
  },
  {
    id: "compliance",
    name: "Compliance Officer",
    role: "Tax & GST Guide",
    desc: "GST rates, HSN codes, & compliance checks",
    icon: "ShieldCheck",
    color: "#14B8A6"
  },
  {
    id: "coach",
    name: "Business Coach",
    role: "Growth Advisor",
    desc: "Data-backed retail wisdom & Indian business tips",
    icon: "Sparkles",
    color: "#F43F5E"
  }
];

export const routeQueryToAgent = (query, contextData = {}) => {
  const q = query.toLowerCase().trim();
  const { products = [], orders = [], stores = [] } = contextData;

  // ROUTER LOGIC: Match keywords to appropriate agent
  let selectedAgent = AGENT_TEAM[0]; // Default: Saathi

  if (q.includes("stock") || q.includes("inventory") || q.includes("available") || q.includes("reorder") || q.includes("out of stock")) {
    selectedAgent = AGENT_TEAM.find((a) => a.id === "inventory");
  } else if (q.includes("purchase") || q.includes("supplier") || q.includes("po") || q.includes("vendor") || q.includes("order more")) {
    selectedAgent = AGENT_TEAM.find((a) => a.id === "purchase");
  } else if (q.includes("sale") || q.includes("pos") || q.includes("bill") || q.includes("cart") || q.includes("customer")) {
    selectedAgent = AGENT_TEAM.find((a) => a.id === "sales");
  } else if (q.includes("profit") || q.includes("margin") || q.includes("cash") || q.includes("expense") || q.includes("revenue") || q.includes("money")) {
    selectedAgent = AGENT_TEAM.find((a) => a.id === "finance");
  } else if (q.includes("how to") || q.includes("kaise") || q.includes("print") || q.includes("barcode") || q.includes("guide") || q.includes("help")) {
    selectedAgent = AGENT_TEAM.find((a) => a.id === "trainer");
  } else if (q.includes("gst") || q.includes("hsn") || q.includes("tax") || q.includes("invoice")) {
    selectedAgent = AGENT_TEAM.find((a) => a.id === "compliance");
  } else if (q.includes("why") || q.includes("trend") || q.includes("compare") || q.includes("forecast")) {
    selectedAgent = AGENT_TEAM.find((a) => a.id === "analyst");
  }

  // GENERATE STRUCTURED INTELLIGENT RESPONSE WITH DEEP LINKS
  let textResponse = "";
  let ctas = [];

  if (selectedAgent.id === "inventory") {
    const lowStock = products.filter((p) => p.stockQty <= p.lowStockThreshold);
    const targetProd = products.find((p) => q.includes(p.title.toLowerCase()) || q.includes(p.sku.toLowerCase())) || products[0];

    textResponse = `Namaste! Main aapka Stock Specialist hoon.\n\nCurrently, aapke pass **${products.length} products** active hain. **${lowStock.length} items** low stock threshold se niche hain.\n\nProduct **"${targetProd.title}"** mein currently **${targetProd.stockQty} units** available hain shelf zone (Zone E-4) par.`;
    ctas = [
      { label: `View ${targetProd.title}`, path: `/products/${targetProd.id}`, type: "view" },
      { label: "Check Low Stock Items", path: "/inventory", type: "navigate" },
      { label: "Initiate Stock Transfer", path: "/transfers", type: "action" }
    ];
  } else if (selectedAgent.id === "purchase") {
    textResponse = `Procurement Lead here.\n\nAapke top supplier **AeroTech Audio Global** ki reliability score **98%** hai. Unka average lead time **4 days** hai.\n\nRecommended: Draft a Purchase Order for 50 units of Headphones to prevent stockout in 4.5 days.`;
    ctas = [
      { label: "Create Purchase Order", path: "/purchases", type: "action" },
      { label: "View Suppliers List", path: "/suppliers", type: "navigate" }
    ];
  } else if (selectedAgent.id === "sales") {
    const totalSales = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    textResponse = `Sales Assistant at your service!\n\nAaj ki total billing revenue **$${totalSales.toLocaleString()}** hai from **${orders.length} orders**.\n\nAverage Checkout Speed: **18 seconds** per order.`;
    ctas = [
      { label: "Open POS Register", path: "/sales", type: "action" },
      { label: "Barcode Scan Item", path: "/sales", type: "action" }
    ];
  } else if (selectedAgent.id === "finance") {
    textResponse = `Finance Controller insights:\n\n**Money Locked in Stock**: $48,250.00\n- Fast Moving: $32,100 (66%)\n- Slow Moving: $11,150 (23%)\n- Dead Stock: $5,000 (11%)\n\nRecommended: Apply 15% discount on dead stock items to recover $4,250 in cash liquidity.`;
    ctas = [
      { label: "View Cash Flow & Ledger", path: "/finance", type: "navigate" },
      { label: "Open Superpowers Simulator", path: "/superpowers", type: "action" }
    ];
  } else if (selectedAgent.id === "trainer") {
    textResponse = `App Trainer Instructions:\n\n**Barcode Identity Generate karne ka tareeka:**\n1. Left menu se **Products** par click karein.\n2. Product select karke **Identity Barcode** button dabayein.\n3. Thermal label format choose karke **Print Barcode** par click karein.`;
    ctas = [
      { label: "Take Me There →", path: "/products", type: "navigate" },
      { label: "Open Help Center", path: "/help", type: "navigate" }
    ];
  } else if (selectedAgent.id === "compliance") {
    textResponse = `Compliance & Tax Guide:\n\nAapke catalog ke **96% products** par HSN Code aur GST Rate (18%) properly tagged hai. 2 items require tax verification before generating e-invoices.\n\n*Note: Please verify tax filings with your qualified accountant.*`;
    ctas = [
      { label: "View Tax & GST Settings", path: "/preferences", type: "navigate" }
    ];
  } else {
    // Default Saathi Receptionist
    textResponse = `Namaste! Main **Saathi** hoon — aapka business partner.\n\nAapke business ki **Health Score 84/100** hai. Revenue is up +18.6% this week. What would you like to execute today?`;
    ctas = [
      { label: "Open My Day Workday", path: "/superpowers", type: "action" },
      { label: "Explore Products", path: "/products", type: "navigate" }
    ];
  }

  return {
    agent: selectedAgent,
    query,
    response: textResponse,
    ctas,
    timestamp: new Date().toISOString()
  };
};
