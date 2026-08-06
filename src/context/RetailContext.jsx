import React, { createContext, useContext, useState } from "react";
import { initialStores, initialProducts, initialCustomers, initialOrders, initialEvents, initialStorefront } from "../data/initialData";
import { translations } from "../data/translations";

const RetailContext = createContext();

export const RetailProvider = ({ children }) => {
  // Navigation & Preferences
  const [activeView, setActiveView] = useState("dashboard");
  const [lang, setLang] = useState("en");
  const [role, setRole] = useState("Owner");
  
  // Stores & Products
  const [stores, setStores] = useState(initialStores);
  const [currentStoreId, setCurrentStoreId] = useState("store-1");
  const [products, setProducts] = useState(initialProducts);
  const [customers, setCustomers] = useState(initialCustomers);
  const [orders, setOrders] = useState(initialOrders);
  const [events, setEvents] = useState(initialEvents);
  const [storefront, setStorefront] = useState(initialStorefront);

  // POS Cart State
  const [cart, setCart] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [cartDiscount, setCartDiscount] = useState(0);

  // Notifications / Toasts
  const [toasts, setToasts] = useState([]);

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
        stores,
        currentStore,
        currentStoreId,
        setCurrentStoreId,
        products,
        customers,
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
