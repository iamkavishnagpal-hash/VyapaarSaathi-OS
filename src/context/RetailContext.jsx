import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  initialStores, 
  initialProducts, 
  initialCustomers, 
  initialOrders, 
  initialEvents, 
  initialPurchases,
  initialTransfers,
  initialReturns 
} from "../data/initialData";
import { translations } from "../data/translations";

const RetailContext = createContext();

const loadSaved = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (err) {
    console.warn("loadSaved error", err);
    return fallback;
  }
};

export const RetailProvider = ({ children }) => {
  // Navigation & Preferences
  const [lang, setLang] = useState(() => loadSaved("ros_lang", "en"));
  const [role, setRole] = useState(() => loadSaved("ros_role", "Store Owner"));

  // Theme & Accessibility System
  const [themePreference, setThemePreference] = useState(() => loadSaved("ros_theme_pref", "dark"));
  const [themeMode, setThemeMode] = useState("dark");
  const [accessibilityMode, setAccessibilityMode] = useState(() => loadSaved("ros_access_mode", "standard"));
  const [reducedMotion, setReducedMotion] = useState(() => loadSaved("ros_reduced_motion", false));

  // Stores & Catalog
  const [stores, setStores] = useState(() => loadSaved("ros_stores", initialStores));
  const [currentStoreId, setCurrentStoreId] = useState(() => loadSaved("ros_current_store_id", "store-1"));
  
  // Products with Stock Reservation Engine
  const [products, setProducts] = useState(() => {
    const loaded = loadSaved("ros_products", initialProducts);
    return loaded.map((p) => ({
      ...p,
      reservedQty: p.reservedQty || 0,
      availableQty: Math.max(0, p.stockQty - (p.reservedQty || 0)),
      inTransitQty: p.inTransitQty || 0,
      damagedQty: p.damagedQty || 0
    }));
  });

  const [customers, setCustomers] = useState(() => loadSaved("ros_customers", initialCustomers));
  const [purchases, setPurchases] = useState(() => loadSaved("ros_purchases", initialPurchases));
  const [transfers, setTransfers] = useState(() => loadSaved("ros_transfers", initialTransfers));
  const [returns, setReturns] = useState(() => loadSaved("ros_returns", initialReturns));
  const [orders, setOrders] = useState(() => loadSaved("ros_orders", initialOrders));
  const [events, setEvents] = useState(() => loadSaved("ros_events", initialEvents));

  // POS Billing Cart State
  const [cart, setCart] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [cartDiscount, setCartDiscount] = useState(0);

  // Global UI Overlays & Modals
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isCaptureModalOpen, setIsCaptureModalOpen] = useState(false);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  const [scannerMode, setScannerMode] = useState("Sale");
  const [isIdentityModalOpen, setIsIdentityModalOpen] = useState(false);
  const [identityProduct, setIdentityProduct] = useState(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Search State
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");

  // Notifications / Toasts
  const [toasts, setToasts] = useState([]);

  // Theme Synchronizer Effect
  useEffect(() => {
    let resolvedTheme = themePreference;
    if (themePreference === "system") {
      resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    setThemeMode(resolvedTheme);
    document.documentElement.setAttribute("data-theme", resolvedTheme);
    document.documentElement.setAttribute("data-accessibility", accessibilityMode);
    document.documentElement.setAttribute("data-reduced-motion", reducedMotion ? "true" : "false");

    localStorage.setItem("ros_theme_pref", JSON.stringify(themePreference));
    localStorage.setItem("ros_access_mode", JSON.stringify(accessibilityMode));
    localStorage.setItem("ros_reduced_motion", JSON.stringify(reducedMotion));
  }, [themePreference, accessibilityMode, reducedMotion]);

  // Persist Catalog Changes
  useEffect(() => {
    try {
      localStorage.setItem("ros_products", JSON.stringify(products));
      localStorage.setItem("ros_orders", JSON.stringify(orders));
      localStorage.setItem("ros_customers", JSON.stringify(customers));
      localStorage.setItem("ros_purchases", JSON.stringify(purchases));
      localStorage.setItem("ros_transfers", JSON.stringify(transfers));
      localStorage.setItem("ros_returns", JSON.stringify(returns));
      localStorage.setItem("ros_events", JSON.stringify(events));
      localStorage.setItem("ros_stores", JSON.stringify(stores));
    } catch (err) {
      console.warn("Auto-save write error", err);
    }
  }, [products, orders, customers, purchases, transfers, returns, events, stores]);

  const currentStore = stores.find((s) => s.id === currentStoreId) || stores[0];

  const addToast = (message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const t = (key) => translations[lang]?.[key] || translations["en"]?.[key] || key;

  const logEvent = (type, productTitle, qtyChange, newQty, note = "") => {
    const newEvt = {
      id: `evt-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type,
      productTitle,
      qtyChange,
      newQty,
      actor: `${role} (${currentStore.name})`,
      channel: currentStore.name,
      note
    };
    setEvents((prev) => [newEvt, ...prev]);
  };

  // Stock Reservation Engine
  const reserveStock = (productId, qtyToReserve) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newReserved = (p.reservedQty || 0) + qtyToReserve;
          const newAvailable = Math.max(0, p.stockQty - newReserved);
          logEvent("STOCK_RESERVE", p.title, qtyToReserve, newAvailable, "Omni-channel reservation");
          return { ...p, reservedQty: newReserved, availableQty: newAvailable };
        }
        return p;
      })
    );
    addToast(`Reserved ${qtyToReserve} units for order`, "info");
  };

  const releaseStock = (productId, qtyToRelease) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newReserved = Math.max(0, (p.reservedQty || 0) - qtyToRelease);
          const newAvailable = Math.max(0, p.stockQty - newReserved);
          return { ...p, reservedQty: newReserved, availableQty: newAvailable };
        }
        return p;
      })
    );
  };

  // Product CRUD
  const addProduct = (prodData) => {
    const stockQtyVal = Number(prodData.stockQty) || 0;
    const newProd = {
      id: `prod-${Date.now()}`,
      storeId: currentStoreId,
      title: prodData.title || "Untitled Physical Product",
      brand: prodData.brand || "Unassigned Brand",
      category: prodData.category || "General",
      subCategory: prodData.subCategory || "Misc",
      sku: prodData.sku || `SKU-${Math.floor(100000 + Math.random() * 900000)}`,
      barcode: prodData.barcode || `8901${Math.floor(10000000 + Math.random() * 90000000)}`,
      qrCode: `QR-ROS-${Date.now()}`,
      costPrice: Number(prodData.costPrice) || 0,
      sellingPrice: Number(prodData.sellingPrice) || 0,
      stockQty: stockQtyVal,
      reservedQty: 0,
      availableQty: stockQtyVal,
      inTransitQty: 0,
      damagedQty: 0,
      lowStockThreshold: Number(prodData.lowStockThreshold) || 10,
      reorderQty: Number(prodData.reorderQty) || 25,
      gstRate: Number(prodData.gstRate) || 18,
      manufacturer: prodData.manufacturer || "General Manufacturer",
      model: prodData.model || "Standard Model",
      color: prodData.color || "Default",
      size: prodData.size || "Standard",
      aiConfidence: prodData.aiConfidence || { brand: 99, title: 98, category: 96, color: 95, price: 92, overall: 96 },
      isVerified: true,
      productHealthScore: 96,
      dataCompleteness: 100,
      variants: prodData.variants || [{ size: "Standard", color: "Default", stock: stockQtyVal }],
      timeline: [
        { date: new Date().toLocaleString(), type: "Received", note: "Initial stock created" },
        { date: new Date().toLocaleString(), type: "Created", note: "Product identity verified via AI recognition" },
        { date: new Date().toLocaleString(), type: "Stocked", note: `Stock initialized to ${stockQtyVal} units` }
      ]
    };

    setProducts((prev) => [newProd, ...prev]);
    logEvent("ADD_PRODUCT", newProd.title, newProd.stockQty, newProd.stockQty, "Added to active catalog");
    addToast(`Successfully registered "${newProd.title}"`, "success");
    return newProd;
  };

  const adjustStock = (productId, deltaQty, reason = "Manual Adjustment") => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedStock = Math.max(0, p.stockQty + deltaQty);
          const updatedAvailable = Math.max(0, updatedStock - (p.reservedQty || 0));
          logEvent(
            deltaQty > 0 ? "STOCK_IN" : "STOCK_OUT",
            p.title,
            deltaQty,
            updatedStock,
            reason
          );
          return {
            ...p,
            stockQty: updatedStock,
            availableQty: updatedAvailable,
            timeline: [
              { date: new Date().toLocaleString(), type: deltaQty > 0 ? "Received" : "Adjusted", note: `${reason} (${deltaQty > 0 ? "+" : ""}${deltaQty})` },
              ...p.timeline
            ]
          };
        }
        return p;
      })
    );
    addToast(`Stock quantity updated (${deltaQty > 0 ? "+" : ""}${deltaQty})`, "info");
  };

  // Cart Management
  const addToCart = (product) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.product.id === product.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].qty += 1;
        return updated;
      }
      return [...prev, { product, qty: 1, unitPrice: product.sellingPrice }];
    });
    addToast(`Added "${product.title}" to cart`, "info");
  };

  const updateCartQty = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, qty } : item))
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setSelectedCustomer(null);
    setCartDiscount(0);
  };

  // POS Checkout
  const completeCheckout = (paymentMethod = "Cash") => {
    if (cart.length === 0) return;

    const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
    const discountAmt = (subtotal * cartDiscount) / 100;
    const finalTotal = subtotal - discountAmt;

    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: `ROS-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: selectedCustomer ? selectedCustomer.name : "Walk-in Customer",
      storeId: currentStoreId,
      date: new Date().toLocaleString(),
      totalAmount: finalTotal,
      paymentMethod,
      status: "Completed",
      itemCount: cart.reduce((acc, item) => acc + item.qty, 0),
      items: cart.map((i) => ({ productId: i.product.id, title: i.product.title, qty: i.qty, unitPrice: i.unitPrice }))
    };

    // Deduct stock
    cart.forEach((item) => {
      adjustStock(item.product.id, -item.qty, `POS Order ${newOrder.orderNumber}`);
    });

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    addToast(`Order ${newOrder.orderNumber} successfully processed!`, "success");
    return newOrder;
  };

  const openProductIdentity = (product) => {
    setIdentityProduct(product);
    setIsIdentityModalOpen(true);
  };

  const openScanner = (mode = "Sale") => {
    setScannerMode(mode);
    setIsScannerModalOpen(true);
  };

  return (
    <RetailContext.Provider
      value={{
        lang,
        setLang,
        role,
        setRole,
        themePreference,
        setThemePreference,
        themeMode,
        accessibilityMode,
        setAccessibilityMode,
        reducedMotion,
        setReducedMotion,
        stores,
        currentStoreId,
        setCurrentStoreId,
        currentStore,
        products,
        addProduct,
        adjustStock,
        reserveStock,
        releaseStock,
        customers,
        purchases,
        transfers,
        returns,
        orders,
        events,
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        selectedCustomer,
        setSelectedCustomer,
        cartDiscount,
        setCartDiscount,
        completeCheckout,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isCaptureModalOpen,
        setIsCaptureModalOpen,
        isScannerModalOpen,
        setIsScannerModalOpen,
        scannerMode,
        openScanner,
        isIdentityModalOpen,
        setIsIdentityModalOpen,
        identityProduct,
        openProductIdentity,
        isVoiceModalOpen,
        setIsVoiceModalOpen,
        globalSearchQuery,
        setGlobalSearchQuery,
        toasts,
        addToast,
        t,
        logEvent
      }}
    >
      {children}
    </RetailContext.Provider>
  );
};

export const useRetail = () => {
  const context = useContext(RetailContext);
  if (!context) {
    throw new Error("useRetail must be used within a RetailProvider");
  }
  return context;
};
