// src/store/rentalStore.js
import { create } from 'zustand';

// Mock data for farm tools and equipment
const TOOLS_DATA = [
  {
    id: 1,
    name: "Tractor - Medium Duty",
    category: "Heavy Equipment",
    subcategory: "Tractors",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ913oJnKzkZMuu4s6Owy6NCLnXiJ2xi-_Mcg&s",
    rating: 4.5,
    reviewCount: 127,
    pricePerDay: 250,
    available: true,
    location: "Ahafo Farm Hub",
    description: "Medium-duty tractor ideal for small to medium farms. 75HP engine with multiple attachments available."
  },
  {
    id: 2,
    name: "Professional Seed Drill",
    category: "Planting Equipment",
    subcategory: "Seeders",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4aKz4Hm1u1PfILe9T345dTklaSVeqFq7SfJ-F-99QKqY0vsWsryNqmlW3Q8yaILXo1Uo&usqp=CAU",
    rating: 4.8,
    reviewCount: 84,
    pricePerDay: 120,
    available: true,
    location: "Eastern Field Valley",
    description: "Six-row seed drill with precise depth control and spacing adjustments for optimal planting results."
  },
  {
    id: 3,
    name: "Industrial Irrigation System",
    category: "Irrigation",
    subcategory: "Sprinklers",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ920FR2BbUYr724jJoHmwuUCyZqAnkf_rA-Q&s",
    rating: 4.2,
    reviewCount: 56,
    pricePerDay: 175,
    available: false,
    location: "Western Valley Depot",
    description: "Complete irrigation system with pump, pipes, and sprinklers. Covers up to 5 acres with adjustable spray patterns."
  },
  {
    id: 4,
    name: "Commercial Harvester",
    category: "Harvesting",
    subcategory: "Combines",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqI5oOWOAXPtqRVFvqHDLzIpdeNPP0gTcgKw&s",
    rating: 4.7,
    reviewCount: 93,
    pricePerDay: 300,
    available: true,
    location: "Southern Field Station",
    description: "Multi-crop harvester with adjustable settings for various grains and produce. 15-foot cutting width."
  },
  {
    id: 5,
    name: "Portable Wood Chipper",
    category: "Maintenance",
    subcategory: "Chippers",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0ELLVHBTdi24_6n-hmEFIQTfq_gR5AiDRrA&s",
    rating: 4.1,
    reviewCount: 62,
    pricePerDay: 85,
    available: true,
    location: "Western Farm Hub",
    description: "Gas-powered wood chipper capable of handling branches up to 4 inches in diameter."
  },
  {
    id: 6,
    name: "Heavy-Duty Post Hole Digger",
    category: "Construction",
    subcategory: "Diggers",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlwMwQzSHhCxrqvg9omuAXKQHUanjpH7sauQ&s",
    rating: 4.4,
    reviewCount: 41,
    pricePerDay: 65,
    available: true,
    location: "Northern Field Supply",
    description: "Hydraulic post hole digger with multiple auger sizes (6\", 9\", and 12\"). Tractor attachment."
  },
  {
    id: 7,
    name: "Livestock Trailer",
    category: "Transport",
    subcategory: "Trailers",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREQ84mynIF-6tzTx6kr73i5qU_RZrAD_b-YA&s",
    rating: 4.6,
    reviewCount: 78,
    pricePerDay: 110,
    available: false,
    location: "Cape Coast Field Station",
    description: "Dual-axle livestock trailer with dividers, capacity for up to 6 cattle or 12 small livestock."
  },
  {
    id: 8,
    name: "Commercial Sprayer System",
    category: "Crop Care",
    subcategory: "Sprayers",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNhcnLKeEcUCuQH61I6vuEk6nIoJzga0rJYg&s",
    rating: 4.3,
    reviewCount: 54,
    pricePerDay: 130,
    available: true,
    location: "Temale Field Station",
    description: "500-gallon tank sprayer with 40-foot boom. Includes precision nozzles and electronic controls."
  },
  {
    id: 9,
    name: "Industrial Fertilizer Spreader",
    category: "Crop Care",
    subcategory: "Spreaders",
    image: "https://agromechanical.com/wp-content/uploads/2017/09/agromaster__0000_2500L-3000L-Trailed-Fertilizer-Spreaders.jpg",
    rating: 4.5,
    reviewCount: 63,
    pricePerDay: 95,
    available: true,
    location: "Central Farm Hub",
    description: "3-ton capacity fertilizer spreader with adjustable spread pattern and rate control."
  },
  {
    id: 10,
    name: "Heavy-Duty Plow",
    category: "Tillage",
    subcategory: "Plows",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS42TxvYptFU9eiUR84iXhvjtPbRWal62feUA&s",
    rating: 4.4,
    reviewCount: 89,
    pricePerDay: 85,
    available: true,
    location: "Kumasi Valley Depot",
    description: "5-bottom moldboard plow for primary tillage operations. Adjustable depth control."
  },
  {
    id: 11,
    name: "Rotary Tiller",
    category: "Tillage",
    subcategory: "Tillers",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn_gJhs807fcXS6w94-hbLR-y5Xbj15JtSxA&s",
    rating: 4.2,
    reviewCount: 71,
    pricePerDay: 75,
    available: true,
    location: "Accra Field Supply",
    description: "8-foot rotary tiller for seedbed preparation. PTO-driven with adjustable tilling depth."
  },
  {
    id: 12,
    name: "Boom Lift",
    category: "Maintenance",
    subcategory: "Lifts",
    image: "https://img.linemedia.com/img/s/construction-equipment-articulated-boom-lift-LGMG-A-14-JE---1745659012432330657_common--25042612165071162100.jpg",
    rating: 4.7,
    reviewCount: 36,
    pricePerDay: 180,
    available: false,
    location: "Ho Farm Hub",
    description: "40-foot articulating boom lift for orchard maintenance, building repairs, and other elevated work."
  },
  {
    id: 13,
    name: "Mini Excavator",
    category: "Planting Equipment",
    subcategory: "Seeders",
    image: "https://image.made-in-china.com/2f0j00cnliCzTBYYrP/High-Efficiency-CE-Certificated-Small-Excavator-Price-for-Sale-in-Ghana.webp",
    rating: 4.8,
    reviewCount: 84,
    pricePerDay: 120,
    available: true,
    location: "Eastern Field Valley",
    description: "Six-row seed drill with precise depth control and spacing adjustments for optimal planting results."
  },
  {
    id: 14,
    name: "Farming tools",
    category: "Planting Equipment",
    subcategory: "Seeders",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCIvfDcRPDwhvJlTozZc_VOZVD5iepi2ZuEQ&s",
    rating: 5.0,
    reviewCount: 56,
    pricePerDay: 120,
    available: true,
    location: "Western Valley Depot",
    description: "Weeding makes easy with these tools."
  }
];

// Extract unique categories and subcategories
const ALL_CATEGORIES = [...new Set(TOOLS_DATA.map(tool => tool.category))];
const ALL_SUBCATEGORIES = [...new Set(TOOLS_DATA.map(tool => tool.subcategory))];
const ALL_LOCATIONS = [...new Set(TOOLS_DATA.map(tool => tool.location))];

const useRentalStore = create((set, get) => ({
  // Data
  tools: TOOLS_DATA,
  categories: ALL_CATEGORIES,
  subcategories: ALL_SUBCATEGORIES,
  locations: ALL_LOCATIONS,
  
  // UI state
  searchTerm: '',
  selectedCategory: '',
  selectedSubcategory: '',
  selectedLocation: '',
  availableOnly: false,
  sortBy: 'recommended',
  viewMode: 'grid',
  currentPage: 1,
  expandedFilters: {
    categories: true,
    subcategories: true,
    locations: true,
    availability: true,
  },
  
  // Navigation state
  selectedToolId: null,
  isViewingDetails: false,
  
  // Action: Update search term
  setSearchTerm: (term) => set({ 
    searchTerm: term,
    currentPage: 1 
  }),
  
  // Action: Update selected category
  setSelectedCategory: (category) => set({ 
    selectedCategory: category,
    currentPage: 1 
  }),
  
  // Action: Update selected subcategory
  setSelectedSubcategory: (subcategory) => set({ 
    selectedSubcategory: subcategory,
    currentPage: 1 
  }),
  
  // Action: Update selected location
  setSelectedLocation: (location) => set({ 
    selectedLocation: location,
    currentPage: 1 
  }),
  
  // Action: Toggle available only
  toggleAvailableOnly: () => set(state => ({ 
    availableOnly: !state.availableOnly,
    currentPage: 1 
  })),
  
  // Action: Set available only
  setAvailableOnly: (value) => set({ 
    availableOnly: value,
    currentPage: 1 
  }),
  
  // Action: Update sort by
  setSortBy: (sortBy) => set({ 
    sortBy,
    currentPage: 1 
  }),
  
  // Action: Update view mode
  setViewMode: (viewMode) => set({ viewMode }),
  
  // Action: Update current page
  setCurrentPage: (page) => set({ currentPage: page }),
  
  // Action: Toggle filter section
  toggleFilterSection: (section) => set(state => ({
    expandedFilters: {
      ...state.expandedFilters,
      [section]: !state.expandedFilters[section]
    }
  })),
  
  // Action: Clear all filters
  clearAllFilters: () => set({
    searchTerm: '',
    selectedCategory: '',
    selectedSubcategory: '',
    selectedLocation: '',
    availableOnly: false,
    currentPage: 1
  }),
  
  // Action: View tool details
  viewToolDetails: (id) => set({
    selectedToolId: id,
    isViewingDetails: true
  }),
  
  // Action: Go back to listings
  backToListings: () => set({
    isViewingDetails: false
  }),
  
  // Getter: Get filtered tools
  getFilteredTools: () => {
    const state = get();
    
    return state.tools.filter(tool => {
      const matchesSearch = state.searchTerm === '' || 
        tool.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(state.searchTerm.toLowerCase());
        
      const matchesCategory = state.selectedCategory === '' || tool.category === state.selectedCategory;
      const matchesSubcategory = state.selectedSubcategory === '' || tool.subcategory === state.selectedSubcategory;
      const matchesLocation = state.selectedLocation === '' || tool.location === state.selectedLocation;
      const matchesAvailability = !state.availableOnly || tool.available;
      
      return matchesSearch && matchesCategory && matchesSubcategory && matchesLocation && matchesAvailability;
    });
  },
  
  // Getter: Get sorted tools
  getSortedTools: () => {
    const state = get();
    const filteredTools = state.getFilteredTools();
    
    return [...filteredTools].sort((a, b) => {
      switch(state.sortBy) {
        case 'price-low':
          return a.pricePerDay - b.pricePerDay;
        case 'price-high':
          return b.pricePerDay - a.pricePerDay;
        case 'rating':
          return b.rating - a.rating;
        default: // recommended
          return b.reviewCount - a.reviewCount;
      }
    });
  },
  
  // Getter: Get paginated tools
  getPaginatedTools: () => {
    const state = get();
    const sortedTools = state.getSortedTools();
    const itemsPerPage = 6;
    
    const startIndex = (state.currentPage - 1) * itemsPerPage;
    return sortedTools.slice(startIndex, startIndex + itemsPerPage);
  },
  
  // Getter: Get total pages
  getTotalPages: () => {
    const state = get();
    const itemsPerPage = 6;
    return Math.ceil(state.getSortedTools().length / itemsPerPage);
  },
  
  // Getter: Get selected tool
  getSelectedTool: () => {
    const state = get();
    return state.tools.find(tool => tool.id === state.selectedToolId);
  }
}));

export default useRentalStore;