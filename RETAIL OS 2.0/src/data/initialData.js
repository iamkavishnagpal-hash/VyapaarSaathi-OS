// Initial Mock Data for VyapaarSaathi OS
// Featuring Real Business Brands: Kapda Mafia (Gen-Z Menswear) & Shoe Mafia (Shoes)

export const initialStores = [
  {
    id: "store-1",
    name: "Kapda Mafia",
    type: "Gen-Z Menswear Flagship",
    location: "Connaught Place, Delhi",
    code: "KM-DEL",
    contact: "+91 98100 12345",
    isWarehouse: false
  },
  {
    id: "store-2",
    name: "Shoe Mafia",
    type: "Premium Footwear Outlet",
    location: "Indiranagar, Bengaluru",
    code: "SM-BLR",
    contact: "+91 98200 67890",
    isWarehouse: false
  },
  {
    id: "wh-1",
    name: "Central Logistics Hub",
    type: "Master Warehouse",
    location: "Bhiwandi, Mumbai",
    code: "WH-BHI",
    contact: "+91 98300 11223",
    isWarehouse: true
  }
];

export const initialProducts = [
  {
    id: "prod-101",
    storeId: "store-1",
    title: "Kapda Mafia Oversized Graphic Hoodie",
    brand: "Kapda Mafia",
    category: "Gen-Z Menswear",
    subCategory: "Hoodies & Sweatshirts",
    sku: "KM-HD-001",
    barcode: "890100100101",
    qrCode: "QR-KM-HD-001",
    costPrice: 28.00,
    sellingPrice: 59.99,
    stockQty: 42,
    reservedQty: 3,
    availableQty: 39,
    inTransitQty: 10,
    damagedQty: 0,
    lowStockThreshold: 10,
    reorderQty: 30,
    gstRate: 12,
    manufacturer: "Kapda Mafia Apparel Works",
    model: "2026 Streetwear Line",
    color: "Washed Charcoal",
    size: "XL",
    aiConfidence: { brand: 99, title: 98, category: 97, color: 96, price: 95, overall: 97 },
    isVerified: true,
    productHealthScore: 98,
    dataCompleteness: 100,
    variants: [
      { size: "M", color: "Washed Charcoal", stock: 12 },
      { size: "L", color: "Washed Charcoal", stock: 15 },
      { size: "XL", color: "Washed Charcoal", stock: 15 }
    ],
    timeline: [
      { date: "2026-08-08 10:00 AM", type: "Received", note: "Batch KM-H2026 received from Bhiwandi WH" },
      { date: "2026-08-08 02:30 PM", type: "Sold", note: "2 units sold via Walk-in POS" }
    ]
  },
  {
    id: "prod-102",
    storeId: "store-1",
    title: "Kapda Mafia Acid-Wash Cargo Pants",
    brand: "Kapda Mafia",
    category: "Gen-Z Menswear",
    subCategory: "Bottomwear",
    sku: "KM-CG-002",
    barcode: "890100100102",
    qrCode: "QR-KM-CG-002",
    costPrice: 24.50,
    sellingPrice: 49.99,
    stockQty: 28,
    reservedQty: 2,
    availableQty: 26,
    inTransitQty: 5,
    damagedQty: 0,
    lowStockThreshold: 8,
    reorderQty: 25,
    gstRate: 12,
    manufacturer: "Kapda Mafia Apparel Works",
    model: "Utility Cargo v2",
    color: "Vintage Khaki",
    size: "32",
    aiConfidence: { brand: 99, title: 97, category: 96, color: 95, price: 94, overall: 96 },
    isVerified: true,
    productHealthScore: 95,
    dataCompleteness: 98,
    variants: [
      { size: "30", color: "Vintage Khaki", stock: 8 },
      { size: "32", color: "Vintage Khaki", stock: 12 },
      { size: "34", color: "Vintage Khaki", stock: 8 }
    ],
    timeline: [
      { date: "2026-08-07 11:15 AM", type: "Received", note: "Stock verified & catalogued" }
    ]
  },
  {
    id: "prod-103",
    storeId: "store-1",
    title: "Kapda Mafia Drop-Shoulder Streetwear Tee",
    brand: "Kapda Mafia",
    category: "Gen-Z Menswear",
    subCategory: "T-Shirts",
    sku: "KM-TS-003",
    barcode: "890100100103",
    qrCode: "QR-KM-TS-003",
    costPrice: 12.00,
    sellingPrice: 29.99,
    stockQty: 65,
    reservedQty: 5,
    availableQty: 60,
    inTransitQty: 15,
    damagedQty: 0,
    lowStockThreshold: 15,
    reorderQty: 50,
    gstRate: 12,
    manufacturer: "Kapda Mafia Apparel Works",
    model: "Heavy Cotton Drop Tee",
    color: "Off-White",
    size: "L",
    aiConfidence: { brand: 99, title: 98, category: 98, color: 97, price: 96, overall: 98 },
    isVerified: true,
    productHealthScore: 99,
    dataCompleteness: 100,
    variants: [
      { size: "S", color: "Off-White", stock: 15 },
      { size: "M", color: "Off-White", stock: 20 },
      { size: "L", color: "Off-White", stock: 30 }
    ],
    timeline: [
      { date: "2026-08-08 09:00 AM", type: "Received", note: "Initial catalog entry" }
    ]
  },
  {
    id: "prod-104",
    storeId: "store-2",
    title: "Shoe Mafia Retro Chunky Sneakers",
    brand: "Shoe Mafia",
    category: "Shoes & Footwear",
    subCategory: "Sneakers",
    sku: "SM-SN-101",
    barcode: "890200200101",
    qrCode: "QR-SM-SN-101",
    costPrice: 42.00,
    sellingPrice: 89.99,
    stockQty: 18,
    reservedQty: 3,
    availableQty: 15,
    inTransitQty: 8,
    damagedQty: 0,
    lowStockThreshold: 5,
    reorderQty: 20,
    gstRate: 18,
    manufacturer: "Shoe Mafia Footwear Corp",
    model: "Chunky Retros v4",
    color: "Cyber White / Cobalt",
    size: "UK 9",
    aiConfidence: { brand: 99, title: 98, category: 99, color: 96, price: 95, overall: 97 },
    isVerified: true,
    productHealthScore: 97,
    dataCompleteness: 100,
    variants: [
      { size: "UK 8", color: "Cyber White", stock: 6 },
      { size: "UK 9", color: "Cyber White", stock: 8 },
      { size: "UK 10", color: "Cyber White", stock: 4 }
    ],
    timeline: [
      { date: "2026-08-08 01:00 PM", type: "Received", note: "Imported 18 pairs to Shoe Mafia Bengaluru" }
    ]
  },
  {
    id: "prod-105",
    storeId: "store-2",
    title: "Shoe Mafia Obsidian High-Top Kicks",
    brand: "Shoe Mafia",
    category: "Shoes & Footwear",
    subCategory: "High-Tops",
    sku: "SM-HT-102",
    barcode: "890200200102",
    qrCode: "QR-SM-HT-102",
    costPrice: 48.00,
    sellingPrice: 99.99,
    stockQty: 12,
    reservedQty: 2,
    availableQty: 10,
    inTransitQty: 4,
    damagedQty: 0,
    lowStockThreshold: 4,
    reorderQty: 15,
    gstRate: 18,
    manufacturer: "Shoe Mafia Footwear Corp",
    model: "Obsidian High Series",
    color: "Matte Black",
    size: "UK 10",
    aiConfidence: { brand: 99, title: 97, category: 98, color: 96, price: 94, overall: 96 },
    isVerified: true,
    productHealthScore: 96,
    dataCompleteness: 98,
    variants: [
      { size: "UK 9", color: "Matte Black", stock: 5 },
      { size: "UK 10", color: "Matte Black", stock: 7 }
    ],
    timeline: [
      { date: "2026-08-07 04:20 PM", type: "Received", note: "Dispatched from central hub" }
    ]
  },
  {
    id: "prod-106",
    storeId: "store-2",
    title: "Shoe Mafia Breathable Knit Runners",
    brand: "Shoe Mafia",
    category: "Shoes & Footwear",
    subCategory: "Running & Performance",
    sku: "SM-RN-103",
    barcode: "890200200103",
    qrCode: "QR-SM-RN-103",
    costPrice: 35.00,
    sellingPrice: 74.99,
    stockQty: 25,
    reservedQty: 1,
    availableQty: 24,
    inTransitQty: 6,
    damagedQty: 0,
    lowStockThreshold: 6,
    reorderQty: 25,
    gstRate: 18,
    manufacturer: "Shoe Mafia Footwear Corp",
    model: "Knit Matrix 2026",
    color: "Neon Lime / Steel",
    size: "UK 8",
    aiConfidence: { brand: 99, title: 98, category: 99, color: 97, price: 95, overall: 98 },
    isVerified: true,
    productHealthScore: 98,
    dataCompleteness: 100,
    variants: [
      { size: "UK 7", color: "Neon Lime", stock: 8 },
      { size: "UK 8", color: "Neon Lime", stock: 10 },
      { size: "UK 9", color: "Neon Lime", stock: 7 }
    ],
    timeline: [
      { date: "2026-08-08 08:30 AM", type: "Received", note: "Stock initialized" }
    ]
  }
];

export const initialCustomers = [
  { id: "cust-1", name: "Aarav Sharma", phone: "+91 98111 22334", email: "aarav@kapdamafia.com", tier: "VIP", totalSpend: 340.50, totalOrders: 6 },
  { id: "cust-2", name: "Rohan Kapoor", phone: "+91 98222 33445", email: "rohan@shoemafia.com", tier: "Regular", totalSpend: 189.99, totalOrders: 3 },
  { id: "cust-3", name: "Priya Malhotra", phone: "+91 98333 44556", email: "priya@gmail.com", tier: "VIP", totalSpend: 520.00, totalOrders: 8 }
];

export const initialOrders = [
  {
    id: "ord-1001",
    orderNumber: "ROS-9812",
    customerName: "Aarav Sharma",
    storeId: "store-1",
    date: "2026-08-08 03:15 PM",
    totalAmount: 109.98,
    paymentMethod: "UPI / Paytm",
    status: "Completed",
    itemCount: 2,
    items: [
      { productId: "prod-101", title: "Kapda Mafia Oversized Graphic Hoodie", qty: 1, unitPrice: 59.99 },
      { productId: "prod-102", title: "Kapda Mafia Acid-Wash Cargo Pants", qty: 1, unitPrice: 49.99 }
    ]
  },
  {
    id: "ord-1002",
    orderNumber: "ROS-9813",
    customerName: "Rohan Kapoor",
    storeId: "store-2",
    date: "2026-08-08 04:30 PM",
    totalAmount: 89.99,
    paymentMethod: "Credit Card",
    status: "Completed",
    itemCount: 1,
    items: [
      { productId: "prod-104", title: "Shoe Mafia Retro Chunky Sneakers", qty: 1, unitPrice: 89.99 }
    ]
  }
];

export const initialEvents = [];
export const initialPurchases = [];
export const initialTransfers = [];
export const initialReturns = [];
