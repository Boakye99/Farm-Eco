import { create } from 'zustand';

// Mock product data
const PRODUCTS = [
  {
    id: 1,
    name: "Premium Organic Fertilizer",
    price: 29.99,
    category: "fertilizers",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb-hgnyUoH1_aYSL_QvyNQeTUOp9vVkgy9ow&s",
    description: "High-quality organic fertilizer for maximum crop yield.",
    inStock: true,
    details: {
      manufacturer: "GreenGrow Solutions",
      weight: "5 kg",
      composition: "Organic plant matter, worm castings, bone meal",
      usage: "Apply 50g per square meter of soil every 4-6 weeks during growing season.",
      benefits: [
        "Improves soil structure",
        "Enhances nutrient retention",
        "Promotes beneficial microbial activity",
        "100% organic with no synthetic chemicals"
      ],
      rating: 4.8,
      reviews: 124
    }
  },
  {
    id: 2,
    name: "Garden Tiller",
    price: 149.99,
    category: "tools",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeCfMCjI1tdqgDXygUn9Yad8ZVgIX4TwPuvA&s",
    description: "Powerful garden tiller for efficient soil preparation.",
    inStock: true,
    details: {
      manufacturer: "FarmTech Pro",
      weight: "8.5 kg",
      power: "Electric, 1200W",
      tillWidth: "40 cm",
      tillDepth: "Up to 22 cm",
      features: [
        "Adjustable tilling depth",
        "Foldable handles for easy storage",
        "Safety start mechanism",
        "Hardened steel blades"
      ],
      rating: 4.6,
      reviews: 89
    }
  },
  {
    id: 3,
    name: "Irrigation System",
    price: 89.99,
    category: "equipment",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd5uux9Q8H8hrPjT5eIZIB46cGyMehIILIdw&s",
    description: "Complete irrigation system for efficient water distribution.",
    inStock: false,
    details: {
      manufacturer: "AquaFarm Systems",
      coverage: "Up to 500 sq meters",
      components: "Sprinklers, drip lines, controllers, valves, connectors",
      waterSaving: "Up to 40% compared to traditional watering",
      features: [
        "Programmable timer",
        "Rain sensor included",
        "Smartphone compatible",
        "Easy installation with color-coded parts"
      ],
      rating: 4.5,
      reviews: 76
    }
  },
  {
    id: 4,
    name: "Pesticide Sprayer",
    price: 59.99,
    category: "equipment",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShyC44GsR1Q-WL2DTPBFNTq16yCLTPOvL_KA&s",
    description: "Professional pesticide sprayer with adjustable nozzle.",
    inStock: true,
    details: {
      manufacturer: "SprayMaster",
      capacity: "5 liters",
      material: "Heavy-duty plastic with brass components",
      pressure: "Up to 3 bar",
      sprayDistance: "Up to 6 meters horizontal",
      features: [
        "Adjustable spray pattern",
        "Pressure relief valve",
        "Ergonomic handle with lock",
        "Compatible with most liquid formulations"
      ],
      rating: 4.3,
      reviews: 92
    }
  },
  {
    id: 5,
    name: "NPK Fertilizer",
    price: 19.99,
    category: "fertilizers",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyI6sWmwFNehovwZMYErpCQUWy92RE7qFIiA&s",
    description: "Balanced NPK fertilizer for general purpose use.",
    inStock: true,
    details: {
      manufacturer: "GrowWell Nutrients",
      weight: "2 kg",
      composition: "Nitrogen (N) 14%, Phosphorus (P) 14%, Potassium (K) 14%",
      usage: "Apply 25g per square meter monthly during growing season",
      suitable: "All garden plants, vegetables, and ornamentals",
      features: [
        "Balanced formula for all-around plant health",
        "Slow-release granules",
        "Enhanced with trace minerals",
        "Low odor formula"
      ],
      rating: 4.7,
      reviews: 156
    }
  },
  {
    id: 6,
    name: "Garden Shovel",
    price: 24.99,
    category: "tools",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbJ_lWt1KUUoSJJmihA-y3i-cdZ0b04tuwAA&s",
    description: "Durable garden shovel with ergonomic handle.",
    inStock: true,
    details: {
      manufacturer: "DigRight Tools",
      length: "100 cm",
      weight: "1.8 kg",
      material: "Hardened steel blade with ash wood handle",
      features: [
        "Reinforced steel collar",
        "Ergonomic D-grip handle",
        "Foot placement edge for extra digging power",
        "Rust-resistant coating"
      ],
      warranty: "10 years",
      rating: 4.9,
      reviews: 203
    }
  },
  {
    id: 7,
    name: "Plant Growth Stimulator",
    price: 12.99,
    category: "fertilizers",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3MS2rlHZDNrtlJwAkgs02BNH_eDn94Ve24g&s",
    description: "Enhances plant growth and improves crop quality.",
    inStock: true,
    details: {
      manufacturer: "BioStim Laboratories",
      volume: "500 ml",
      composition: "Seaweed extract, humic acids, amino acids, plant hormones",
      usage: "Dilute 5ml per liter of water, apply weekly",
      benefits: [
        "Increases fruiting and flowering",
        "Reduces transplant shock",
        "Improves resistance to environmental stress",
        "Enhances nutrient uptake"
      ],
      organic: "Yes, OMRI listed",
      rating: 4.4,
      reviews: 87
    }
  },
  {
    id: 8,
    name: "Heavy-Duty Pruning Shears",
    price: 34.99,
    category: "tools",
    image: "https://m.media-amazon.com/images/I/9162qY-ZGML._AC_UF350,350_QL80_.jpg",
    description: "Sharp and durable pruning shears for precise cuts.",
    inStock: true,
    details: {
      manufacturer: "GardenPro Tools",
      length: "21 cm",
      weight: "280g",
      material: "High-carbon SK5 steel blades, aluminum handles with rubber grip",
      maxCutDiameter: "25mm",
      features: [
        "Sap groove design prevents sticking",
        "Safety lock mechanism",
        "Shock-absorbing bumper",
        "Adjustable blade tension"
      ],
      warranty: "Lifetime",
      rating: 4.8,
      reviews: 167
    }
  },
  {
    id: 9,
    name: "Greenhouse Kit",
    price: 299.99,
    category: "equipment",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhKlgI-0ifbc-kFT76doUXjT9DWs4bb7AauA&s",
    description: "Complete greenhouse kit for year-round growing.",
    inStock: false,
    details: {
      manufacturer: "GrowZone",
      dimensions: "3m x 2m x 2.1m (LxWxH)",
      material: "Powder-coated aluminum frame with 6mm twin-wall polycarbonate panels",
      coverage: "6 square meters",
      includes: "Frame, panels, roof vent, sliding door, assembly hardware, foundation anchors",
      features: [
        "UV protected panels (blocks 99.9% of harmful rays)",
        "Snow load capacity: 75kg/sq meter",
        "Wind resistance: up to 90km/h",
        "Integrated rain gutters"
      ],
      warranty: "5 years on frame, 2 years on panels",
      rating: 4.6,
      reviews: 52
    }
  },
  {
    id: 10,
    name: "Soil pH Tester",
    price: 15.99,
    category: "tools",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeCkMHuGRp1dk9g32e2HPU1hqPWAiIhvrSGA&s",
    description: "Accurate soil pH tester for optimal growing conditions.",
    inStock: true,
    details: {
      manufacturer: "SoilSense",
      range: "pH 3.5 to 9.0",
      accuracy: "±0.2 pH",
      batteryRequired: "No, mechanical operation",
      depth: "Measures at 15cm depth",
      features: [
        "No batteries or electricity needed",
        "Dual-needle sensing technology",
        "Instant readings",
        "Compact and portable design"
      ],
      includes: "pH meter, storage case, user manual",
      rating: 4.2,
      reviews: 118
    }
  },
  {
    id: 11,
    name: "Automatic Seeder",
    price: 79.99,
    category: "equipment",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRabbLLaI7OZ9fuWKGxYQi3sGEGxJTmBcDILA&s",
    description: "Efficient automatic seeder for precise seed placement.",
    inStock: true,
    details: {
      manufacturer: "SeedTech Pro",
      material: "ABS plastic with stainless steel components",
      weight: "1.2 kg",
      seedCapacity: "Up to 500g depending on seed size",
      adjustable: "6 seed size settings from fine to large",
      features: [
        "Adjustable row spacing guide",
        "Seed flow control dial",
        "Transparent seed hopper",
        "Ergonomic handle design"
      ],
      suitableFor: "Most vegetable and flower seeds",
      rating: 4.4,
      reviews: 73
    }
  },
  {
    id: 12,
    name: "Compost Bin",
    price: 49.99,
    category: "equipment",
    image: "https://images-na.ssl-images-amazon.com/images/I/61CdQuWDqaL._SS400_.jpg",
    description: "Large capacity compost bin for organic waste recycling.",
    inStock: true,
    details: {
      manufacturer: "EcoGarden",
      capacity: "300 liters",
      dimensions: "80cm x 80cm x 82cm",
      material: "Recycled UV-resistant plastic",
      color: "Black (heat absorption for faster composting)",
      features: [
        "Sliding bottom door for compost removal",
        "Adjustable ventilation system",
        "Lockable top lid",
        "Rodent resistant design"
      ],
      assembly: "No tools required",
      rating: 4.5,
      reviews: 94
    }
  }
];

const useProductStore = create((set, get) => ({
  products: PRODUCTS,
  selectedProduct: null,
  
  // Get all products
  getAllProducts: () => get().products,
  
  // Get product by ID
  getProductById: (id) => get().products.find(product => product.id === Number(id)),
  
  // Get products by category
  getProductsByCategory: (category) => 
    category 
      ? get().products.filter(product => product.category === category)
      : get().products,
  
  // Get products that match a search query
  searchProducts: (query) => {
    const searchTerm = query.toLowerCase();
    return get().products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) || 
      product.description.toLowerCase().includes(searchTerm)
    );
  },
  
  // Set selected product
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  
  // Filter products by multiple criteria
  filterProducts: ({ category = null, inStock = null, priceRange = null, searchTerm = '' }) => {
    return get().products.filter(product => {
      // Check category
      const matchesCategory = category === null || product.category === category;
      
      // Check in-stock status
      const matchesStock = inStock === null || product.inStock === inStock;
      
      // Check price range
      let matchesPrice = true;
      if (priceRange) {
        const { min, max } = priceRange;
        matchesPrice = 
          (min === null || product.price >= min) && 
          (max === null || product.price <= max);
      }
      
      // Check search term
      const term = searchTerm.toLowerCase();
      const matchesSearch = term === '' || 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term);
      
      return matchesCategory && matchesStock && matchesPrice && matchesSearch;
    });
  }
}));

export default useProductStore;