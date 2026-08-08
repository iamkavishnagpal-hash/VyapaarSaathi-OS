// BUSINESS MEMORY LAYER
// Persists historical retail context, stock velocity trends, and business events

const MEMORY_KEY = "ros_business_memory_v2";

const defaultMemory = {
  historicalVelocity: {
    "prod-101": { avgWeeklySales: 8.5, peakDays: ["Friday", "Saturday"], trend: "UP (+34%)" },
    "prod-102": { avgWeeklySales: 3.0, peakDays: ["Monday"], trend: "STABLE" },
    "prod-103": { avgWeeklySales: 12.0, peakDays: ["Saturday", "Sunday"], trend: "UP (+12%)" },
    "prod-104": { avgWeeklySales: 2.3, peakDays: ["Wednesday"], trend: "SLOW" },
    "prod-105": { avgWeeklySales: 6.0, peakDays: ["Thursday"], trend: "STABLE" }
  },
  supplierReliability: {
    "AeroTech Audio Global": { leadTimeDays: 4, onTimeRate: 98, defectRate: 0.2 },
    "Kinetic Dynamics Corp": { leadTimeDays: 7, onTimeRate: 92, defectRate: 0.8 },
    "HydroVibe Outdoor Gear": { leadTimeDays: 3, onTimeRate: 99, defectRate: 0.1 }
  },
  auditInsightsHistory: []
};

export const getBusinessMemory = () => {
  try {
    const saved = localStorage.getItem(MEMORY_KEY);
    return saved ? JSON.parse(saved) : defaultMemory;
  } catch (err) {
    console.warn("Error reading business memory:", err);
    return defaultMemory;
  }
};

export const saveBusinessMemory = (memory) => {
  try {
    localStorage.setItem(MEMORY_KEY, JSON.stringify(memory));
  } catch (err) {
    console.warn("Error saving business memory:", err);
  }
};

export const recordInsightHistory = (insight) => {
  const memory = getBusinessMemory();
  const entry = {
    id: `mem-${Date.now()}`,
    timestamp: new Date().toISOString(),
    ...insight
  };
  memory.auditInsightsHistory = [entry, ...memory.auditInsightsHistory.slice(0, 49)];
  saveBusinessMemory(memory);
  return entry;
};

export const predictDemandForProduct = (product) => {
  const memory = getBusinessMemory();
  const vel = memory.historicalVelocity[product.id] || { avgWeeklySales: 4.0, trend: "STABLE" };
  const daysRemaining = vel.avgWeeklySales > 0 ? (product.stockQty / (vel.avgWeeklySales / 7)).toFixed(1) : "30+";
  return {
    productTitle: product.title,
    avgWeeklySales: vel.avgWeeklySales,
    daysRemaining: Number(daysRemaining),
    trend: vel.trend,
    recommendedReorderQty: Math.max(product.reorderQty || 25, Math.ceil(vel.avgWeeklySales * 3))
  };
};
