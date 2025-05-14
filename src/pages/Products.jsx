import { useState, useEffect } from "react";
import { Search, ShoppingCart, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import useProductStore from "../store/productStore";

// Hero Banner Component
const HeroBanner = () => {
  return (
    <div className="relative mb-8 bg-gradient-to-r from-green-700 to-green-600 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="md:w-2/3">
          <span className="mb-2 inline-block rounded-full bg-white bg-opacity-20 px-3 py-1 text-sm font-medium">Spring Sale • Up to 40% Off</span>
          <h1 className="mb-3 text-4xl font-bold md:text-5xl">Grow Better With Quality Farm Tools</h1>
          <p className="mb-8 text-lg opacity-90">Premium agricultural equipment and products for maximum crop yield and sustainable farming practices</p>
          <div className="flex flex-wrap gap-4">
            <button className="rounded-md bg-white px-6 py-3 font-medium text-green-700 shadow-lg transition-all hover:bg-opacity-90">Browse Products</button>
            <button className="rounded-md border border-white px-6 py-3 font-medium text-white transition-all hover:bg-white hover:bg-opacity-10">Seasonal Offers</button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 hidden h-full w-1/3 md:block">
        <div className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-white bg-opacity-10 lg:h-40 lg:w-40"></div>
        <div className="absolute bottom-20 right-24 h-16 w-16 rounded-full bg-white bg-opacity-10 lg:h-24 lg:w-24"></div>
        <div className="absolute bottom-12 right-40 h-12 w-12 rounded-full bg-white bg-opacity-10 lg:h-16 lg:w-16"></div>
      </div>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();
  const navigate = useNavigate();
  
  const handleProductClick = () => {
    navigate(`${product.id}`);
  };
  
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigation when adding to cart
    addToCart(product);
  };

  return (
    <div 
      className="group cursor-pointer overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md"
      onClick={handleProductClick}
    >
      <div className="relative h-56">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="rounded bg-red-500 px-3 py-1 text-sm font-medium text-white">Out of Stock</span>
          </div>
        )}
        {product.inStock && (
          <button 
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 flex items-center rounded-full bg-green-600 p-2 text-white opacity-0 shadow-lg transition-opacity duration-300 hover:bg-green-700 group-hover:opacity-100"
          >
            <ShoppingCart size={18} />
          </button>
        )}
      </div>
      <div className="p-4">
        <span className="text-xs uppercase text-green-700">{product.category}</span>
        <h3 className="mb-1 text-lg font-medium">{product.name}</h3>
        <p className="mb-3 text-sm text-gray-600 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-green-600">${product.price.toFixed(2)}</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (product.inStock) handleAddToCart(e);
            }}
            disabled={!product.inStock}
            className={`flex items-center rounded-md px-3 py-1 text-sm ${
              product.inStock 
                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                : 'cursor-not-allowed bg-gray-100 text-gray-400'
            }`}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Filter Sidebar Component
const FilterSidebar = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-bold">Categories</h2>
        <ul className="space-y-2">
          <li>
            <button 
              onClick={() => onSelectCategory(null)}
              className={`w-full rounded-md px-3 py-2 text-left ${
                selectedCategory === null 
                  ? 'bg-green-100 font-medium text-green-700' 
                  : 'hover:bg-gray-100'
              }`}
            >
              All Products
            </button>
          </li>
          {categories.map((category) => (
            <li key={category}>
              <button 
                onClick={() => onSelectCategory(category)}
                className={`w-full rounded-md px-3 py-2 text-left capitalize ${
                  selectedCategory === category 
                    ? 'bg-green-100 font-medium text-green-700' 
                    : 'hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-bold">Price Range</h2>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="checkbox" id="price-under-20" className="mr-2" />
            <label htmlFor="price-under-20">Under $20</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="price-20-50" className="mr-2" />
            <label htmlFor="price-20-50">$20 - $50</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="price-50-100" className="mr-2" />
            <label htmlFor="price-50-100">$50 - $100</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="price-over-100" className="mr-2" />
            <label htmlFor="price-over-100">Over $100</label>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-bold">Availability</h2>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="checkbox" id="in-stock" className="mr-2" checked readOnly />
            <label htmlFor="in-stock">In Stock</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="out-of-stock" className="mr-2" />
            <label htmlFor="out-of-stock">Out of Stock</label>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Products Component
const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const { totalItems } = useCartStore();
  
  // Use our product store instead of hardcoded PRODUCTS
  const { getAllProducts, getProductsByCategory, searchProducts } = useProductStore();
  const allProducts = getAllProducts();
  
  const productsPerPage = 6;
  
  // Get unique categories
  const categories = [...new Set(allProducts.map(product => product.category))];
  
  // Filter products based on search and category
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === null || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Toggle filters on mobile
  const toggleFilters = () => {
    setShowFilters(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <HeroBanner />
      
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Search and Filter Bar */}
        <div className="mb-8 rounded-lg bg-white p-4 shadow-sm">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="relative flex-1 md:max-w-xl">
              <input
                type="text"
                placeholder="Search for products, tools, fertilizers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-10 py-3 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={toggleFilters}
                className="flex items-center rounded-md border border-gray-300 px-4 py-2 md:hidden"
              >
                <Filter size={16} className="mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>
        
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Agricultural Products</h2>
          <p className="text-gray-600">
            Showing {Math.min(filteredProducts.length, 1 + indexOfFirstProduct)}-
            {Math.min(filteredProducts.length, indexOfLastProduct)} of {filteredProducts.length} results
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <FilterSidebar 
              categories={categories} 
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
          
          {/* Product Grid */}
          <div className="lg:col-span-3">
            {currentProducts.length === 0 ? (
              <div className="flex h-64 items-center justify-center rounded-lg border bg-white">
                <p className="text-gray-500">No products found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-1">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="rounded-md px-3 py-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`rounded-md px-3 py-2 ${
                        page === currentPage
                          ? 'bg-green-600 text-white'
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="rounded-md px-3 py-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;