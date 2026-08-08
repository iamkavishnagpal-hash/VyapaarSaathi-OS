import React, { createContext, useContext, useState } from "react";
import { initialStores, initialProducts, initialCustomers, initialOrders, initialEvents, initialStorefront } from "../data/initialData";
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

const defaultHostConfig = {
  localhost: {
    url: "http://localhost:8000",
    port: 8000,
    accessGranted: true,
    status: "Active (200 OK)",
    pingMs: 12,
    apiKey: "loc_key_8849102",
    services: ["Local Barcode Proxy", "POS Thermal Printer", "Offline SQLite Bridge", "Cash Drawer Trigger"]
  },
  sourcehost: {
    url: "https://sourcehost.retailos.internal",
    ip: "192.168.1.150",
    accessGranted: true,
    status: "Authorized (200 OK)",
    pingMs: 28,
    authToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    services: ["Legacy ERP Database", "Cloud Inventory Sync", "Warehouse WMS Endpoint", "Customer Credit Ledger"]
  },
  corsOrigins: [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:8000",
    "https://sourcehost.retailos.internal"
  ],
  autoSyncInterval: 15
};

export const RetailProvider = ({ children }) => {
  // Navigation & Preferences
  const [activeView, setActiveView] = useState("dashboard");
  const [lang, setLang] = useState(() => loadSaved("ros_lang", "en"));
  const [role, setRole] = useState(() => loadSaved("ros_role", "Owner"));
  
  // Stores & Products & Industry Vertical Template
  const [industryTemplate, setIndustryTemplate] = useState(() => loadSaved("ros_industry_template", "Retail"));
  const [currency, setCurrency] = useState(() => loadSaved("ros_currency", "INR"));
  const [stores, setStores] = useState(() => loadSaved("ros_stores", initialStores));
  const [currentStoreId, setCurrentStoreId] = useState(() => loadSaved("ros_current_store_id", "store-1"));
  const [products, setProducts] = useState(() => loadSaved("ros_products", initialProducts));
  const [customers, setCustomers] = useState(() => loadSaved("ros_customers", initialCustomers));
  const [orders, setOrders] = useState(() => loadSaved("ros_orders", initialOrders));
  const [events, setEvents] = useState(() => loadSaved("ros_events", initialEvents));
  const [storefront, setStorefront] = useState(() => loadSaved("ros_storefront", initialStorefront));

  // Host Access & Connection Configurations (Localhost & Sourcehost)
  const [hostConfig, setHostConfig] = useState(() => loadSaved("ros_host_config", defaultHostConfig));

  // Last Saved Version Timestamp State
  const [lastSavedTime, setLastSavedTime] = useState(() => loadSaved("ros_last_saved_time", "Auto-Saved"));

  // POS Cart State
  const [cart, setCart] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [cartDiscount, setCartDiscount] = useState(0);

  // Notifications / Toasts
  const [toasts, setToasts] = useState([]);

  // Auto-Save Effect: Persist state changes to Local Storage
  React.useEffect(() => {
    try {
      localStorage.setItem("ros_products", JSON.stringify(products));
      localStorage.setItem("ros_orders", JSON.stringify(orders));
      localStorage.setItem("ros_customers", JSON.stringify(customers));
      localStorage.setItem("ros_events", JSON.stringify(events));
      localStorage.setItem("ros_stores", JSON.stringify(stores));
      localStorage.setItem("ros_storefront", JSON.stringify(storefront));
      localStorage.setItem("ros_host_config", JSON.stringify(hostConfig));
      localStorage.setItem("ros_industry_template", JSON.stringify(industryTemplate));
      localStorage.setItem("ros_currency", JSON.stringify(currency));
      localStorage.setItem("ros_role", JSON.stringify(role));
      localStorage.setItem("ros_lang", JSON.stringify(lang));
    } catch (e) {
      console.warn("Auto-save failed to write to localStorage", e);
    }
  }, [products, orders, customers, events, stores, storefront, hostConfig, industryTemplate, currency, role, lang]);

  // Voice Assistant State
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");

  const addToast = (message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Translation helper
  const t = (key) => {
    return translations[lang]?.[key] || translations["en"]?.[key] || key;
  };

  const currentStore = stores.find((s) => s.id === currentStoreId) || stores[0];

  // Audit trail logger
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

  // Product Operations
  const addProduct = (prodData) => {
    const newProd = {
      ...prodData,
      id: `prod-${Date.now()}`,
      storeId: currentStoreId,
      stockQty: Number(prodData.stockQty) || 0,
      lowStockThreshold: Number(prodData.lowStockThreshold) || 10,
      costPrice: Number(prodData.costPrice) || 0,
      sellingPrice: Number(prodData.sellingPrice) || 0,
      gstRate: Number(prodData.gstRate) || 0,
      variants: prodData.variants || [{ size: "Standard", color: "Default", stock: Number(prodData.stockQty) || 0 }]
    };
    setProducts((prev) => [newProd, ...prev]);
    logEvent("ADD_PRODUCT", newProd.title, newProd.stockQty, newProd.stockQty, "Added new product to catalog");
    addToast(`Added "${newProd.title}" to catalog`, "success");
  };

  const adjustStock = (productId, deltaQty, reason = "Manual Adjustment") => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedStock = Math.max(0, p.stockQty + deltaQty);
          logEvent(
            deltaQty > 0 ? "STOCK_IN" : "STOCK_OUT",
            p.title,
            deltaQty,
            updatedStock,
            reason
          );
          return { ...p, stockQty: updatedStock };
        }
        return p;
      })
    );
    addToast(`Adjusted stock quantity (${deltaQty > 0 ? "+" : ""}${deltaQty})`, "info");
  };

  // Cart Operations
  const addToCart = (product, variant = null) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.variant?.size === variant?.size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].qty += 1;
        return updated;
      }
      return [...prev, { product, variant, qty: 1 }];
    });
    addToast(`Added "${product.title}" to bill cart`, "success");
  };

  const updateCartQty = (index, qty) => {
    if (qty <= 0) {
      removeFromCart(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index].qty = qty;
      return updated;
    });
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
    setSelectedCustomer(null);
    setCartDiscount(0);
  };

  // Checkout & POS Invoice Processing
  const processCheckout = (paymentMethod = "Cash") => {
    if (cart.length === 0) return null;

    let subtotal = 0;
    let totalGst = 0;

    const lineItems = cart.map((item) => {
      const itemSubtotal = item.product.sellingPrice * item.qty;
      const gstAmount = (itemSubtotal * (item.product.gstRate / 100));
      subtotal += itemSubtotal;
      totalGst += gstAmount;

      // Automatically reduce inventory
      adjustStock(item.product.id, -item.qty, `POS Sale Order #${Date.now().toString().slice(-4)}`);

      return {
        productId: item.product.id,
        title: item.product.title,
        qty: item.qty,
        price: item.product.sellingPrice,
        gstRate: item.product.gstRate,
        variant: item.variant
      };
    });

    const finalDiscount = Number(cartDiscount) || 0;
    const grandTotal = Math.max(0, Math.round(subtotal + totalGst - finalDiscount));

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      storeId: currentStoreId,
      channel: "POS Storefront",
      customerName: selectedCustomer ? selectedCustomer.name : "Walk-in Customer",
      customerPhone: selectedCustomer ? selectedCustomer.phone : "N/A",
      itemsCount: cart.reduce((acc, i) => acc + i.qty, 0),
      subtotal,
      gstTotal: Math.round(totalGst),
      discount: finalDiscount,
      total: grandTotal,
      paymentMethod,
      status: "Completed",
      timestamp: new Date().toISOString(),
      items: lineItems
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    addToast(`Order #${newOrder.id} completed successfully!`, "success");
    return newOrder;
  };

  // Return & Refund Execution
  const processReturn = (orderId, productId, returnQty) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return { ...ord, status: "Returned / Refunded" };
        }
        return ord;
      })
    );
    adjustStock(productId, returnQty, `Customer Return for Order #${orderId}`);
    addToast(`Refund processed & ${returnQty} item restocked`, "info");
  };

  // Migration Importer
  const importShopifyData = (shopifyJson) => {
    if (!shopifyJson || !shopifyJson.products) return;
    const importedProds = shopifyJson.products.map((sp, idx) => ({
      id: `prod-shp-${Date.now()}-${idx}`,
      title: sp.title,
      category: sp.product_type || "Imported",
      brand: sp.vendor || "Generic",
      sku: sp.variants?.[0]?.sku || `SKU-SHP-${idx}`,
      barcode: `89090${Date.now().toString().slice(-6)}${idx}`,
      gstRate: 18,
      costPrice: Math.round((Number(sp.variants?.[0]?.price) || 500) * 0.6),
      sellingPrice: Number(sp.variants?.[0]?.price) || 500,
      stockQty: Number(sp.variants?.[0]?.inventory_quantity) || 20,
      lowStockThreshold: 5,
      storeId: currentStoreId,
      variants: [{ size: "Standard", color: "Default", stock: Number(sp.variants?.[0]?.inventory_quantity) || 20 }],
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80"
    }));

    setProducts((prev) => [...importedProds, ...prev]);
    logEvent("SHOPIFY_IMPORT", `${importedProds.length} Products`, importedProds.reduce((acc, p) => acc + p.stockQty, 0), 0, "Imported from Shopify connector");
    addToast(`Successfully imported ${importedProds.length} products from Shopify!`, "success");
  };

  // Host Access Handlers (Localhost & Sourcehost)
  const toggleHostAccess = (hostKey) => {
    setHostConfig((prev) => {
      const current = prev[hostKey];
      const newStatus = !current.accessGranted;
      addToast(
        `${newStatus ? "Granted" : "Revoked"} access permissions for ${hostKey.toUpperCase()} (${current.url})`,
        newStatus ? "success" : "warning"
      );
      logEvent(
        "HOST_ACCESS_CHANGE",
        `${hostKey.toUpperCase()} Access`,
        0,
        0,
        `Set accessGranted to ${newStatus} for ${current.url}`
      );
      return {
        ...prev,
        [hostKey]: {
          ...current,
          accessGranted: newStatus,
          status: newStatus ? "Active (200 OK)" : "Access Denied (403)"
        }
      };
    });
  };

  const testHostPing = (hostKey) => {
    const target = hostConfig[hostKey];
    if (!target.accessGranted) {
      addToast(`Cannot ping ${hostKey.toUpperCase()} — Access is currently revoked!`, "warning");
      return;
    }
    const simulatedPing = Math.floor(8 + Math.random() * 20);
    setHostConfig((prev) => ({
      ...prev,
      [hostKey]: {
        ...prev[hostKey],
        pingMs: simulatedPing,
        status: "Active (200 OK)"
      }
    }));
    addToast(`Host Ping Response from ${target.url}: 200 OK (${simulatedPing}ms)`, "success");
  };

  const updateHostUrl = (hostKey, newUrl) => {
    setHostConfig((prev) => ({
      ...prev,
      [hostKey]: {
        ...prev[hostKey],
        url: newUrl
      }
    }));
    addToast(`Updated ${hostKey.toUpperCase()} URL to ${newUrl}`, "info");
  };

  const importHostData = (hostKey, customProds = null) => {
    const host = hostConfig[hostKey];
    if (!host.accessGranted) {
      addToast(`Host import failed: ${hostKey.toUpperCase()} access is disabled`, "danger");
      return;
    }

    const payload = customProds || [
      { title: `${hostKey.toUpperCase()} Premium Cotton Shirt`, category: "Apparel", sku: `${hostKey.slice(0,3).toUpperCase()}-SHI-01`, price: 1499, qty: 35 },
      { title: `${hostKey.toUpperCase()} Smart Wireless Headphones`, category: "Electronics", sku: `${hostKey.slice(0,3).toUpperCase()}-HEA-02`, price: 2999, qty: 15 },
      { title: `${hostKey.toUpperCase()} Organic Green Tea 250g`, category: "Grocery", sku: `${hostKey.slice(0,3).toUpperCase()}-TEA-03`, price: 349, qty: 100 }
    ];

    const importedProds = payload.map((p, idx) => ({
      id: `prod-${hostKey}-${Date.now()}-${idx}`,
      title: p.title,
      category: p.category || "Host Sync",
      brand: `${hostKey.toUpperCase()} Direct`,
      sku: p.sku || `SKU-${hostKey.slice(0,3).toUpperCase()}-${idx}`,
      barcode: `89090${Date.now().toString().slice(-6)}${idx}`,
      gstRate: 18,
      costPrice: Math.round((Number(p.price) || 500) * 0.6),
      sellingPrice: Number(p.price) || 500,
      stockQty: Number(p.qty) || 20,
      lowStockThreshold: 5,
      storeId: currentStoreId,
      variants: [{ size: "Standard", color: "Default", stock: Number(p.qty) || 20 }],
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80"
    }));

    setProducts((prev) => [...importedProds, ...prev]);
    logEvent(
      "HOST_SYNC",
      `${importedProds.length} Products from ${hostKey.toUpperCase()}`,
      importedProds.reduce((acc, p) => acc + p.stockQty, 0),
      0,
      `Direct ingestion from ${host.url}`
    );
    addToast(`Directly ingested ${importedProds.length} items from ${host.url}!`, "success");
  };

  // Last Saver Version & Snapshot Management Handlers
  const saveWorkspaceSnapshot = () => {
    const timestamp = new Date().toLocaleString();
    const snapshot = {
      products,
      orders,
      customers,
      events,
      stores,
      storefront,
      hostConfig,
      industryTemplate,
      currency,
      role,
      lang,
      timestamp
    };
    try {
      localStorage.setItem("ros_last_saver_version", JSON.stringify(snapshot));
      localStorage.setItem("ros_last_saved_time", timestamp);
      setLastSavedTime(timestamp);
      logEvent("SAVER_SNAPSHOT", "Workspace Backup Saved", 0, 0, `Saved snapshot at ${timestamp}`);
      addToast(`Saved current workspace state! (Last Saver Version: ${timestamp})`, "success");
    } catch (err) {
      console.error("Save snapshot error:", err);
      addToast("Failed to save snapshot to local storage", "danger");
    }
  };

  const restoreLastSavedVersion = () => {
    try {
      const savedRaw = localStorage.getItem("ros_last_saver_version");
      if (!savedRaw) {
        addToast("No saved version snapshot found in local storage!", "warning");
        return;
      }
      const snapshot = JSON.parse(savedRaw);
      if (snapshot.products) setProducts(snapshot.products);
      if (snapshot.orders) setOrders(snapshot.orders);
      if (snapshot.customers) setCustomers(snapshot.customers);
      if (snapshot.events) setEvents(snapshot.events);
      if (snapshot.stores) setStores(snapshot.stores);
      if (snapshot.storefront) setStorefront(snapshot.storefront);
      if (snapshot.hostConfig) setHostConfig(snapshot.hostConfig);
      if (snapshot.industryTemplate) setIndustryTemplate(snapshot.industryTemplate);
      if (snapshot.currency) setCurrency(snapshot.currency);
      if (snapshot.role) setRole(snapshot.role);
      if (snapshot.lang) setLang(snapshot.lang);
      if (snapshot.timestamp) setLastSavedTime(snapshot.timestamp);

      logEvent("RESTORE_SAVER_VERSION", "Workspace Restored", 0, 0, `Restored to ${snapshot.timestamp || "last saved version"}`);
      addToast(`Restored Retail OS to Last Saver Version (${snapshot.timestamp || "Previous"})!`, "success");
    } catch (err) {
      console.error("Restore snapshot error:", err);
      addToast("Error restoring last saved version snapshot", "danger");
    }
  };

  const resetToDemoData = () => {
    localStorage.clear();
    setProducts(initialProducts);
    setOrders(initialOrders);
    setCustomers(initialCustomers);
    setEvents(initialEvents);
    setStores(initialStores);
    setStorefront(initialStorefront);
    setHostConfig(defaultHostConfig);
    setIndustryTemplate("Retail");
    setCurrency("INR");
    setRole("Owner");
    setLang("en");
    setLastSavedTime("Default Demo Data");
    addToast("Reset workspace back to initial factory demo data", "info");
  };

  // Voice Command Dispatcher
  const processVoiceCommand = (commandText) => {
    const cmd = commandText.toLowerCase();
    setVoiceTranscript(commandText);

    if (cmd.includes("pos") || cmd.includes("billing") || cmd.includes("bill")) {
      setActiveView("pos");
      addToast("Voice Command: Switched to POS & Billing", "info");
    } else if (cmd.includes("inventory") || cmd.includes("stock") || cmd.includes("item")) {
      setActiveView("inventory");
      addToast("Voice Command: Switched to Inventory", "info");
    } else if (cmd.includes("dashboard") || cmd.includes("home")) {
      setActiveView("dashboard");
      addToast("Voice Command: Switched to Dashboard", "info");
    } else if (cmd.includes("ai") || cmd.includes("assistant") || cmd.includes("help")) {
      setActiveView("ai");
      addToast("Voice Command: Switched to AI Center", "info");
    } else if (cmd.includes("store") || cmd.includes("builder") || cmd.includes("website")) {
      setActiveView("storefront");
      addToast("Voice Command: Switched to Store Builder", "info");
    } else if (cmd.includes("whatsapp") || cmd.includes("campaign") || cmd.includes("message")) {
      setActiveView("comms");
      addToast("Voice Command: Switched to WhatsApp Comms", "info");
    } else if (cmd.includes("import") || cmd.includes("shopify") || cmd.includes("csv")) {
      setActiveView("migration");
      addToast("Voice Command: Switched to Migration Wizard", "info");
    } else {
      addToast(`Voice Recognized: "${commandText}"`, "info");
    }
  };

  const toggleVoiceListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      addToast("Browser Web Speech API not supported. Using simulation mode.", "warning");
      const simulatedCommands = ["Open Billing POS", "Show low stock in Inventory", "Open AI Assistant", "Go to Store Builder"];
      const randomCmd = simulatedCommands[Math.floor(Math.random() * simulatedCommands.length)];
      processVoiceCommand(randomCmd);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = lang === "hi" ? "hi-IN" : "en-US";
    recognition.interimResults = false;

    if (!isListening) {
      setIsListening(true);
      recognition.start();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        processVoiceCommand(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => {
        setIsListening(false);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
    } else {
      setIsListening(false);
    }
  };

  return (
    <RetailContext.Provider
      value={{
        activeView,
        setActiveView,
        lang,
        setLang,
        role,
        setRole,
        industryTemplate,
        setIndustryTemplate,
        currency,
        setCurrency,
        stores,
        setStores,
        currentStore,
        currentStoreId,
        setCurrentStoreId,
        products,
        customers,
        setCustomers,
        orders,
        events,
        storefront,
        setStorefront,
        cart,
        selectedCustomer,
        setSelectedCustomer,
        cartDiscount,
        setCartDiscount,
        toasts,
        addToast,
        t,
        logEvent,
        addProduct,
        adjustStock,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        processCheckout,
        processReturn,
        importShopifyData,
        hostConfig,
        setHostConfig,
        toggleHostAccess,
        testHostPing,
        updateHostUrl,
        importHostData,
        lastSavedTime,
        saveWorkspaceSnapshot,
        restoreLastSavedVersion,
        resetToDemoData,
        isListening,
        voiceTranscript,
        toggleVoiceListening,
        processVoiceCommand
      }}
    >
      {children}
    </RetailContext.Provider>
  );
};

export const useRetail = () => useContext(RetailContext);
