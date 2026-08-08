// OPERATIONAL AI RULE ENGINE FOR RETAIL OS
import { getBusinessMemory, predictDemandForProduct } from "./BusinessMemory";

export const evaluateRules = (products = [], stores = [], orders = []) => {
  const actions = [];

  // RULE 1: LOW STOCK REORDER ALERT
  products.forEach((prod) => {
    if (prod.stockQty <= prod.lowStockThreshold) {
      const pred = predictDemandForProduct(prod);
      actions.push({
        id: `rule-lowstock-${prod.id}`,
        ruleType: "LOW_STOCK",
        priority: "HIGH",
        severity: "warning",
        title: `${prod.title} is below reorder threshold`,
        description: `Current stock: ${prod.stockQty} units (Threshold: ${prod.lowStockThreshold}). Predicted stockout in ${pred.daysRemaining} days.`,
        targetProduct: prod,
        actionLabel: "Create PO",
        actionPath: "/purchases"
      });
    }
  });

  // RULE 2: UNVERIFIED PRODUCT IDENTITY
  products.forEach((prod) => {
    if (!prod.isVerified || (prod.dataCompleteness && prod.dataCompleteness < 90)) {
      actions.push({
        id: `rule-unverified-${prod.id}`,
        ruleType: "UNVERIFIED_DATA",
        priority: "HIGH",
        severity: "error",
        title: `Product "${prod.title}" requires identity verification`,
        description: `Barcode or manufacturer data incomplete (Score: ${prod.dataCompleteness || 78}%).`,
        targetProduct: prod,
        actionLabel: "Fix Verification",
        actionPath: "/products"
      });
    }
  });

  // RULE 3: MARGIN INTEGRITY CHECK
  products.forEach((prod) => {
    if (prod.sellingPrice > 0) {
      const marginPct = ((prod.sellingPrice - prod.costPrice) / prod.sellingPrice) * 100;
      if (marginPct < 25) {
        actions.push({
          id: `rule-margin-${prod.id}`,
          ruleType: "LOW_MARGIN",
          priority: "MEDIUM",
          severity: "info",
          title: `Low profit margin (${marginPct.toFixed(1)}%) on ${prod.title}`,
          description: `Cost price ($${prod.costPrice}) relative to selling price ($${prod.sellingPrice}).`,
          targetProduct: prod,
          actionLabel: "Adjust Pricing",
          actionPath: "/products"
        });
      }
    }
  });

  // RULE 4: MULTI-LOCATION STOCK REBALANCING
  if (stores.length > 1 && products.length > 0) {
    const flagshipItem = products[0];
    actions.push({
      id: `rule-rebalance-${flagshipItem.id}`,
      ruleType: "STORE_REBALANCE",
      priority: "MEDIUM",
      severity: "info",
      title: `Stock transfer suggested: ${flagshipItem.title}`,
      description: `Transfer 10 units from Warehouse to Metro Storefront to meet peak weekend traffic.`,
      targetProduct: flagshipItem,
      actionLabel: "Transfer Stock",
      actionPath: "/transfers"
    });
  }

  return actions.sort((a, b) => (a.priority === "HIGH" ? -1 : 1));
};

export const applyAutoHealing = (product, updateProductCallback) => {
  const healed = {
    ...product,
    isVerified: true,
    dataCompleteness: 100,
    productHealthScore: 98,
    aiConfidence: { brand: 99, title: 99, category: 98, color: 96, price: 95, overall: 98 }
  };
  if (updateProductCallback) {
    updateProductCallback(healed);
  }
  return healed;
};
