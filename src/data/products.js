
export const products = [
  {
    id: "cc-001",
    name: "UNT Retro Tee",
    price: 32,
    category: "T-Shirts",
    collection: "Vintage",
    description: "Retro-inspired campus streetwear.",
    images: ["/assets/products/retro-tee.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Green", "Black"],
    featured: true,
  },
  {
    id: "cc-002",
    name: "Campus Hoodie",
    price: 65,
    category: "Hoodies",
    collection: "Campus Classics",
    description: "A comfortable everyday campus essential.",
    images: ["/assets/products/hoodie.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gray", "Black"],
    featured: true,
  },
  {
    id: "cc-003",
    name: "Varsity Jacket",
    price: 89,
    category: "Outerwear",
    collection: "Streetwear",
    description: "Classic varsity styling with a modern edge.",
    images: ["/assets/products/varsity.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Green", "Black"],
    featured: true,
  },
  {
    id: "cc-004",
    name: "Campus Cap",
    price: 28,
    category: "Accessories",
    collection: "Accessories",
    description: "A classic cap for everyday campus style.",
    images: ["/assets/products/cap.jpg"],
    sizes: ["One Size"],
    colors: ["Black", "Green"],
    featured: true,
  },
];

export const getProductById = (id) =>
  products.find((product) => product.id === id);
