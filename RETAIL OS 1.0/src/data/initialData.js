export const initialStores = [
  { id: "store-1", name: "Main Flagship Store - Connaught Place", city: "New Delhi", GSTIN: "07AAAAA0000A1Z5", isDefault: true },
  { id: "store-2", name: "Cyber Hub Branch - Sector 24", city: "Gurugram", GSTIN: "06AAAAA0000A1Z2", isDefault: false },
  { id: "store-3", name: "Central Warehouse - Manesar", city: "Gurugram", GSTIN: "06AAAAA0000A1Z2", isDefault: false }
];

export const initialProducts = [
  {
    id: "prod-101",
    title: "Cotton Printed Kurti Set",
    category: "Apparel",
    brand: "EthnicVibe",
    sku: "APP-KUR-001",
    barcode: "8901234567891",
    gstRate: 5,
    costPrice: 650,
    sellingPrice: 1299,
    stockQty: 42,
    lowStockThreshold: 10,
    storeId: "store-1",
    variants: [
      { size: "M", color: "Navy Blue", stock: 15 },
      { size: "L", color: "Navy Blue", stock: 17 },
      { size: "XL", color: "Maroon", stock: 10 }
    ],
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "prod-102",
    title: "Wireless Bluetooth Earbuds Pro",
    category: "Electronics",
    brand: "SoundBeats",
    sku: "ELE-EAR-002",
    barcode: "8901234567892",
    gstRate: 18,
    costPrice: 850,
    sellingPrice: 1999,
    stockQty: 8,
    lowStockThreshold: 12,
    storeId: "store-1",
    variants: [
      { size: "Standard", color: "Matte Black", stock: 5 },
      { size: "Standard", color: "Pearl White", stock: 3 }
    ],
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "prod-103",
    title: "Organic Whole Wheat Atta 10kg",
    category: "Grocery",
    brand: "PureGrains",
    sku: "GRO-ATT-003",
    barcode: "8901234567893",
    gstRate: 0,
    costPrice: 380,
    sellingPrice: 460,
    stockQty: 85,
    lowStockThreshold: 15,
    storeId: "store-1",
    variants: [{ size: "10kg Pack", color: "N/A", stock: 85 }],
    image: "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "prod-104",
    title: "Designer Men Leather Wallet",
    category: "Accessories",
    brand: "UrbanKraft",
    sku: "ACC-WAL-004",
    barcode: "8901234567894",
    gstRate: 18,
    costPrice: 290,
    sellingPrice: 799,
    stockQty: 3,
    lowStockThreshold: 5,
    storeId: "store-1",
    variants: [
      { size: "Standard", color: "Vintage Brown", stock: 2 },
      { size: "Standard", color: "Jet Black", stock: 1 }
    ],
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "prod-105",
    title: "Smart LED Desk Lamp (Tuya App)",
    category: "Home & Lighting",
    brand: "GlowTech",
    sku: "HOM-LAM-005",
    barcode: "8901234567895",
    gstRate: 18,
    costPrice: 750,
    sellingPrice: 1499,
    stockQty: 24,
    lowStockThreshold: 8,
    storeId: "store-1",
    variants: [{ size: "Standard", color: "White", stock: 24 }],
    image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "prod-106",
    title: "Slim Fit Stretch Denim Jeans",
    category: "Apparel",
    brand: "DenimCraft",
    sku: "APP-JEA-006",
    barcode: "8901234567896",
    gstRate: 12,
    costPrice: 900,
    sellingPrice: 1899,
    stockQty: 19,
    lowStockThreshold: 10,
    storeId: "store-1",
    variants: [
      { size: "32", color: "Dark Wash Blue", stock: 10 },
      { size: "34", color: "Dark Wash Blue", stock: 9 }
    ],
    image: "https://images.unsplash.com/photo-1542272604-780c96856552?auto=format&fit=crop&w=400&q=80"
  }
];

export const initialCustomers = [
  { id: "cust-1", name: "Rahul Sharma", phone: "+91 98765 43210", email: "rahul.s@example.com", totalSpent: 8450, city: "Delhi" },
  { id: "cust-2", name: "Priya Verma", phone: "+91 98112 23344", email: "priya.v@example.com", totalSpent: 14200, city: "Gurugram" },
  { id: "cust-3", name: "Amit Patel", phone: "+91 97223 34455", email: "amit.patel@example.com", totalSpent: 3990, city: "Noida" },
  { id: "cust-4", name: "Sneha Gupta", phone: "+91 99554 43322", email: "sneha.g@example.com", totalSpent: 21500, city: "Delhi" }
];

export const initialOrders = [
  {
    id: "ORD-9821",
    storeId: "store-1",
    channel: "POS Storefront",
    customerName: "Rahul Sharma",
    customerPhone: "+91 98765 43210",
    itemsCount: 2,
    subtotal: 3298,
    gstTotal: 299,
    discount: 100,
    total: 3497,
    paymentMethod: "UPI",
    status: "Completed",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    items: [
      { productId: "prod-101", title: "Cotton Printed Kurti Set", qty: 1, price: 1299, gstRate: 5 },
      { productId: "prod-102", title: "Wireless Bluetooth Earbuds Pro", qty: 1, price: 1999, gstRate: 18 }
    ]
  },
  {
    id: "ORD-9820",
    storeId: "store-1",
    channel: "Online Storefront",
    customerName: "Priya Verma",
    customerPhone: "+91 98112 23344",
    itemsCount: 1,
    subtotal: 1899,
    gstTotal: 227,
    discount: 0,
    total: 2126,
    paymentMethod: "Card",
    status: "Completed",
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    items: [
      { productId: "prod-106", title: "Slim Fit Stretch Denim Jeans", qty: 1, price: 1899, gstRate: 12 }
    ]
  },
  {
    id: "ORD-9819",
    storeId: "store-1",
    channel: "Shopify Sync",
    customerName: "Amit Patel",
    customerPhone: "+91 97223 34455",
    itemsCount: 1,
    subtotal: 1499,
    gstTotal: 269,
    discount: 50,
    total: 1718,
    paymentMethod: "Prepaid",
    status: "Fulfilled",
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    items: [
      { productId: "prod-105", title: "Smart LED Desk Lamp (Tuya App)", qty: 1, price: 1499, gstRate: 18 }
    ]
  }
];

export const initialEvents = [
  {
    id: "evt-1",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    type: "SALE",
    productTitle: "Wireless Bluetooth Earbuds Pro",
    qtyChange: -1,
    newQty: 8,
    actor: "Salesperson (POS)",
    channel: "Connaught Place Branch",
    note: "Completed POS Order #ORD-9821"
  },
  {
    id: "evt-2",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    type: "STOCK_IN",
    productTitle: "Organic Whole Wheat Atta 10kg",
    qtyChange: +50,
    newQty: 85,
    actor: "Store Manager",
    channel: "Main Warehouse",
    note: "Purchase order PO-4491 received"
  },
  {
    id: "evt-3",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    type: "SYNC",
    productTitle: "Smart LED Desk Lamp",
    qtyChange: -1,
    newQty: 24,
    actor: "Shopify Connector",
    channel: "Online Store",
    note: "Auto-synced inventory reduction from Web order"
  }
];

export const initialStorefront = {
  bannerTitle: "Diwali Fest Special Sale - Up to 40% Off!",
  bannerSubtitle: "Free Home Delivery across NCR on Orders above ₹999",
  primaryColor: "#6366f1",
  secondaryColor: "#10b981",
  announcementBar: "⚡ Flat 10% Extra Discount on UPI Payments. Use Code: UPI10",
  featuredCategories: ["Apparel", "Electronics", "Grocery"],
  themeMode: "dark"
};

export const sampleShopifyData = {
  shop_name: "ethnic-fashion-delhi.myshopify.com",
  products: [
    { id: 98110, title: "Silk Saree Festival Edition", vendor: "EthnicVibe", product_type: "Apparel", variants: [{ sku: "SHO-SAR-01", price: "3499.00", inventory_quantity: 14 }] },
    { id: 98111, title: "Pure Brass Table Diya (Set of 4)", vendor: "GlowTech", product_type: "Home", variants: [{ sku: "SHO-DIY-02", price: "899.00", inventory_quantity: 35 }] },
    { id: 98112, title: "Organic Basmati Rice 5kg", vendor: "PureGrains", product_type: "Grocery", variants: [{ sku: "SHO-RIC-03", price: "750.00", inventory_quantity: 60 }] }
  ]
};

export const sampleCommsTemplates = [
  { id: "tmpl-1", name: "Festive Flash Discount", channel: "WhatsApp", message: "🎉 Hi {{Customer_Name}}! Diwali special discount at {{Store_Name}}. Get 20% off on Kurti sets & Accessories. Shop now: {{Store_Link}}" },
  { id: "tmpl-2", name: "Low Stock Vendor Reorder", channel: "WhatsApp", message: "⚠️ Low Stock Alert: Product {{Product_Title}} has reached {{Current_Stock}} units. Please dispatch PO {{PO_Number}}." },
  { id: "tmpl-3", name: "Digital Invoice Receipt", channel: "WhatsApp", message: "🧾 Thank you for shopping at {{Store_Name}}! Your invoice #{{Invoice_No}} for ₹{{Total_Amount}} is ready. Download PDF: {{PDF_Link}}" }
];
