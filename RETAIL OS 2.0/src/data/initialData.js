// RETAIL OS 2.0 INITIAL MOCK DATA MODEL

export const initialStores = [
  {
    id: "store-1",
    name: "Flagship Retail Lab",
    location: "Downtown Tech Hub, Floor 1",
    city: "San Francisco, CA",
    code: "SF-01",
    status: "Active",
    registerCount: 4,
    manager: "Alex Vance"
  },
  {
    id: "store-2",
    name: "Metro Commerce Express",
    location: "Market Street Galleria",
    city: "San Francisco, CA",
    code: "SF-02",
    status: "Active",
    registerCount: 2,
    manager: "Elena Rostova"
  },
  {
    id: "store-3",
    name: "North Bay Distribution Center",
    location: "Industrial Park Rd, Bldg 4",
    city: "Oakland, CA",
    code: "OAK-WMS",
    status: "Active",
    registerCount: 1,
    manager: "Marcus Brody"
  }
];

export const initialProducts = [
  {
    id: "prod-101",
    storeId: "store-1",
    title: "Quantum Sound Pro Headphones",
    brand: "AeroTech Audio",
    category: "Electronics",
    subCategory: "Wireless Audio",
    sku: "SKU-AT-QSP-BLK",
    barcode: "890123456701",
    qrCode: "QR-ROS-PROD-101",
    costPrice: 120.00,
    sellingPrice: 249.99,
    stockQty: 42,
    lowStockThreshold: 15,
    reorderQty: 50,
    gstRate: 18,
    manufacturer: "AeroTech Labs Inc.",
    model: "QSP-2026",
    color: "Midnight Black",
    size: "Standard",
    aiConfidence: {
      brand: 99,
      title: 98,
      category: 96,
      color: 95,
      price: 92,
      overall: 96
    },
    isVerified: true,
    productHealthScore: 98,
    dataCompleteness: 100,
    variants: [
      { size: "Standard", color: "Midnight Black", stock: 26, sku: "SKU-AT-QSP-BLK" },
      { size: "Standard", color: "Lunar Silver", stock: 16, sku: "SKU-AT-QSP-SLV" }
    ],
    timeline: [
      { date: "2026-08-01 09:30", type: "Received", note: "Shipment #PO-981 received (50 units)" },
      { date: "2026-08-01 10:15", type: "Created", note: "Product identity & barcode verified via AI Capture" },
      { date: "2026-08-01 11:00", type: "Stocked", note: "Assigned to Shelf E-4" },
      { date: "2026-08-07 14:22", type: "Sold", note: "8 units sold via POS Register #1" }
    ]
  },
  {
    id: "prod-102",
    storeId: "store-1",
    title: "ErgoDesk Smart Electric Frame",
    brand: "Kinetic Furniture",
    category: "Office & Home",
    subCategory: "Furniture",
    sku: "SKU-KF-EDS-WHT",
    barcode: "890123456702",
    qrCode: "QR-ROS-PROD-102",
    costPrice: 280.00,
    sellingPrice: 549.00,
    stockQty: 6,
    lowStockThreshold: 10,
    reorderQty: 20,
    gstRate: 18,
    manufacturer: "Kinetic Dynamics",
    model: "ED-PRO-3",
    color: "Alpine White",
    size: "Dual Motor",
    aiConfidence: {
      brand: 95,
      title: 94,
      category: 98,
      color: 99,
      price: 88,
      overall: 94
    },
    isVerified: true,
    productHealthScore: 72,
    dataCompleteness: 85,
    variants: [
      { size: "Dual Motor", color: "Alpine White", stock: 4, sku: "SKU-KF-EDS-WHT" },
      { size: "Dual Motor", color: "Matte Black", stock: 2, sku: "SKU-KF-EDS-BLK" }
    ],
    timeline: [
      { date: "2026-07-20 14:00", type: "Received", note: "Shipment #PO-844 received (15 units)" },
      { date: "2026-07-20 15:30", type: "Stocked", note: "Assigned to Floor Zone B" },
      { date: "2026-08-08 11:10", type: "Sold", note: "9 units sold across 3 weeks" }
    ]
  },
  {
    id: "prod-103",
    storeId: "store-1",
    title: "Titanium Tech Flask 1.0L",
    brand: "HydroVibe",
    category: "Accessories",
    subCategory: "Drinkware",
    sku: "SKU-HV-TTF-1L",
    barcode: "890123456703",
    qrCode: "QR-ROS-PROD-103",
    costPrice: 18.50,
    sellingPrice: 45.00,
    stockQty: 88,
    lowStockThreshold: 20,
    reorderQty: 100,
    gstRate: 12,
    manufacturer: "HydroVibe Outdoor Gear",
    model: "HV-1000",
    color: "Slate Gray",
    size: "1000ml",
    aiConfidence: {
      brand: 99,
      title: 97,
      category: 99,
      color: 96,
      price: 95,
      overall: 97
    },
    isVerified: true,
    productHealthScore: 100,
    dataCompleteness: 100,
    variants: [
      { size: "1000ml", color: "Slate Gray", stock: 50, sku: "SKU-HV-TTF-1L-GRY" },
      { size: "1000ml", color: "Ocean Blue", stock: 38, sku: "SKU-HV-TTF-1L-BLU" }
    ],
    timeline: [
      { date: "2026-08-02 08:00", type: "Received", note: "Shipment #PO-990 received (100 units)" },
      { date: "2026-08-02 09:00", type: "Stocked", note: "Assigned to Rack A-2" }
    ]
  },
  {
    id: "prod-104",
    storeId: "store-1",
    title: "VividColor 4K Studio Monitor 27\"",
    brand: "OptiDisplay",
    category: "Electronics",
    subCategory: "Displays",
    sku: "SKU-OD-VC4K-27",
    barcode: "890123456704",
    qrCode: "QR-ROS-PROD-104",
    costPrice: 310.00,
    sellingPrice: 599.99,
    stockQty: 3,
    lowStockThreshold: 5,
    reorderQty: 15,
    gstRate: 18,
    manufacturer: "OptiDisplay Corp",
    model: "VC27-4K",
    color: "Graphite",
    size: "27 Inch",
    aiConfidence: {
      brand: 92,
      title: 90,
      category: 95,
      color: 90,
      price: 85,
      overall: 90
    },
    isVerified: false,
    productHealthScore: 64,
    dataCompleteness: 78,
    variants: [
      { size: "27 Inch", color: "Graphite", stock: 3, sku: "SKU-OD-VC4K-27" }
    ],
    timeline: [
      { date: "2026-07-28 16:20", type: "Received", note: "Shipment #PO-870 received (10 units)" },
      { date: "2026-08-06 18:00", type: "Sold", note: "7 units sold" }
    ]
  },
  {
    id: "prod-105",
    storeId: "store-1",
    title: "Zenith Mechanical Keyboard RGB",
    brand: "KeyWorks",
    category: "Electronics",
    subCategory: "Peripherals",
    sku: "SKU-KW-ZMK-RGB",
    barcode: "890123456705",
    qrCode: "QR-ROS-PROD-105",
    costPrice: 45.00,
    sellingPrice: 119.00,
    stockQty: 64,
    lowStockThreshold: 12,
    reorderQty: 40,
    gstRate: 18,
    manufacturer: "KeyWorks Ltd.",
    model: "ZMK-87",
    color: "Charcoal RGB",
    size: "Tenkeyless",
    aiConfidence: {
      brand: 98,
      title: 98,
      category: 97,
      color: 94,
      price: 96,
      overall: 97
    },
    isVerified: true,
    productHealthScore: 95,
    dataCompleteness: 100,
    variants: [
      { size: "Tenkeyless", color: "Charcoal RGB", stock: 40, sku: "SKU-KW-ZMK-RGB-TKL" },
      { size: "Full Layout", color: "Charcoal RGB", stock: 24, sku: "SKU-KW-ZMK-RGB-FULL" }
    ],
    timeline: [
      { date: "2026-08-04 11:30", type: "Received", note: "Shipment #PO-1002 received (70 units)" }
    ]
  }
];

export const initialCustomers = [
  {
    id: "cust-1",
    name: "Sarah Jenkins",
    email: "sarah.j@apexdesign.io",
    phone: "+1 (415) 555-0192",
    totalPurchases: 4,
    totalSpent: 1348.97,
    tier: "VIP Executive",
    lastOrderDate: "2026-08-07"
  },
  {
    id: "cust-2",
    name: "Devon Miller",
    email: "devon@nexustech.com",
    phone: "+1 (415) 555-0344",
    totalPurchases: 2,
    totalSpent: 598.99,
    tier: "Standard Member",
    lastOrderDate: "2026-08-05"
  },
  {
    id: "cust-3",
    name: "Maya Patel",
    email: "maya.patel@horizon.org",
    phone: "+1 (415) 555-0811",
    totalPurchases: 7,
    totalSpent: 2890.50,
    tier: "Platinum Corporate",
    lastOrderDate: "2026-08-08"
  }
];

export const initialPurchases = [
  {
    id: "po-1001",
    supplier: "AeroTech Audio Global",
    storeId: "store-1",
    orderDate: "2026-08-01",
    expectedDelivery: "2026-08-10",
    status: "Received",
    totalAmount: 6000.00,
    itemCount: 50,
    items: [
      { productId: "prod-101", title: "Quantum Sound Pro Headphones", qty: 50, unitCost: 120.00 }
    ]
  },
  {
    id: "po-1002",
    supplier: "Kinetic Dynamics Corp",
    storeId: "store-1",
    orderDate: "2026-08-05",
    expectedDelivery: "2026-08-12",
    status: "In Transit",
    totalAmount: 5600.00,
    itemCount: 20,
    items: [
      { productId: "prod-102", title: "ErgoDesk Smart Electric Frame", qty: 20, unitCost: 280.00 }
    ]
  }
];

export const initialTransfers = [
  {
    id: "tr-501",
    sourceStore: "North Bay Distribution Center",
    destStore: "Flagship Retail Lab",
    transferDate: "2026-08-06",
    status: "Completed",
    itemCount: 15,
    items: [
      { productId: "prod-103", title: "Titanium Tech Flask 1.0L", qty: 15 }
    ]
  },
  {
    id: "tr-502",
    sourceStore: "Flagship Retail Lab",
    destStore: "Metro Commerce Express",
    transferDate: "2026-08-08",
    status: "In Transit",
    itemCount: 5,
    items: [
      { productId: "prod-101", title: "Quantum Sound Pro Headphones", qty: 5 }
    ]
  }
];

export const initialReturns = [
  {
    id: "ret-301",
    orderId: "ord-8812",
    customerName: "Devon Miller",
    date: "2026-08-07",
    productTitle: "VividColor 4K Studio Monitor 27\"",
    qty: 1,
    refundAmount: 599.99,
    reason: "Unopened - Customer ordered wrong size",
    status: "Processed & Restocked"
  }
];

export const initialOrders = [
  {
    id: "ord-9001",
    orderNumber: "ROS-9001",
    customerName: "Sarah Jenkins",
    storeId: "store-1",
    date: "2026-08-07 14:22",
    totalAmount: 499.98,
    paymentMethod: "Credit Card (Visa)",
    status: "Completed",
    itemCount: 2,
    items: [
      { productId: "prod-101", title: "Quantum Sound Pro Headphones", qty: 2, unitPrice: 249.99 }
    ]
  },
  {
    id: "ord-9002",
    orderNumber: "ROS-9002",
    customerName: "Maya Patel",
    storeId: "store-1",
    date: "2026-08-08 11:05",
    totalAmount: 119.00,
    paymentMethod: "Apple Pay",
    status: "Completed",
    itemCount: 1,
    items: [
      { productId: "prod-105", title: "Zenith Mechanical Keyboard RGB", qty: 1, unitPrice: 119.00 }
    ]
  }
];

export const initialEvents = [
  {
    id: "evt-1",
    timestamp: "2026-08-08T11:10:00Z",
    type: "SALE",
    productTitle: "Zenith Mechanical Keyboard RGB",
    qtyChange: -1,
    newQty: 64,
    actor: "Register #1 (Alex Vance)",
    channel: "Flagship Retail Lab",
    note: "POS Transaction ROS-9002"
  },
  {
    id: "evt-2",
    timestamp: "2026-08-08T09:30:00Z",
    type: "AI_IDENTIFY",
    productTitle: "Quantum Sound Pro Headphones",
    qtyChange: 0,
    newQty: 42,
    actor: "AI Vision Pipeline v2.4",
    channel: "Product Capture",
    note: "Verified identity (96% confidence score)"
  },
  {
    id: "evt-3",
    timestamp: "2026-08-07T16:45:00Z",
    type: "STOCK_TRANSFER",
    productTitle: "Titanium Tech Flask 1.0L",
    qtyChange: 15,
    newQty: 88,
    actor: "Inventory System",
    channel: "Distribution -> Flagship",
    note: "Transfer TR-501 completed"
  }
];
