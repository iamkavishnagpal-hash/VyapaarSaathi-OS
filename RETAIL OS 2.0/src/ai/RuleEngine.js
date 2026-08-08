// VYAPAARSAATHI OS — AUTOPILOT RULE ENGINE

export class RuleEngine {
  static evaluateCatalog(products) {
    const alerts = [];

    products.forEach((product) => {
      // RULE 1: Stock <= Low Stock Threshold
      if (product.stockQty <= product.lowStockThreshold) {
        alerts.push({
          id: `rule-low-stock-${product.id}`,
          ruleName: "LOW_STOCK_REORDER_DRAFT",
          productId: product.id,
          productTitle: product.title,
          severity: product.stockQty <= 5 ? "error" : "warning",
          message: `${product.title} stock is ${product.stockQty} units (below threshold ${product.lowStockThreshold}).`,
          suggestedAction: "Draft Purchase Order",
          actionType: "CREATE_PO_DRAFT",
          reorderQty: product.reorderQty || 25
        });
      }

      // RULE 2: Data Quality & Health Score Check
      if ((product.productHealthScore || 100) < 80 || !product.isVerified) {
        alerts.push({
          id: `rule-health-${product.id}`,
          ruleName: "IDENTITY_VERIFICATION_NEEDED",
          productId: product.id,
          productTitle: product.title,
          severity: "warning",
          message: `${product.title} needs data verification (Health Score: ${product.productHealthScore || 70}%).`,
          suggestedAction: "Verify Identity Specs",
          actionType: "VERIFY_PRODUCT_IDENTITY"
        });
      }
    });

    return alerts;
  }
}
