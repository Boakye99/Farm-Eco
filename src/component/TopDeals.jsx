import { useState, useEffect, useRef } from "react";
import useFeaturedStore from "../store/featuredStore";
import useCartStore from "../store/cartStore";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShoppingCart, Eye } from "lucide-react";

const TopDeals = () => {
  const { featuredProducts } = useFeaturedStore();
  const { addToCart } = useCartStore();
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(null);
  const scrollContainerRef = useRef(null);

  // Scroll functionality
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = direction === "left" ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Add to cart with animation
  const handleAddToCart = (product) => {
    addToCart(product);
    
    // You could implement a cart animation here
    // For now, we'll just add the product
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header with animated underline */}
        <div className="mb-12 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 inline-block">
            Featured <span className="text-[#1CA9C9]">Products</span>
          </h2>
          <div className="h-1 w-24 bg-[#1CA9C9] mx-auto rounded-full transform transition-all duration-300 ease-in-out hover:w-32" />
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover our premium selection of agricultural tools and machinery at unbeatable prices.
          </p>
        </div>

        {/* Navigation controls */}
        <div className="flex justify-end mb-6 gap-2 pr-4">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-200"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-200"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Products carousel */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
        >
          {featuredProducts.map((item) => (
            <div
              key={item.id}
              className="min-w-[280px] max-w-[300px] snap-start bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-500 hover:shadow-xl"
              onMouseEnter={() => setIsHovering(item.id)}
              onMouseLeave={() => setIsHovering(null)}
            >
              {/* Product image with overlay on hover */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={item.image}
                  alt={item.name}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isHovering === item.id ? "scale-110" : "scale-100"
                  }`}
                />
                
                {/* Overlay with quick actions */}
                <div 
                  className={`absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center gap-4 transition-all duration-300 ${
                    isHovering === item.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="p-3 bg-white rounded-full text-[#1CA9C9] hover:bg-[#1CA9C9] hover:text-white transition-all duration-300 transform hover:scale-110"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart size={18} />
                  </button>
                  <button
                    onClick={() => navigate(`/products/${item.id}`)}
                    className="p-3 bg-white rounded-full text-[#1CA9C9] hover:bg-[#1CA9C9] hover:text-white transition-all duration-300 transform hover:scale-110"
                    aria-label="View details"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>
              
              {/* Product info */}
              <div className="p-5">
                <div className="mb-3">
                  <h3 className="font-medium text-lg text-gray-800 mb-1 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-[#1CA9C9] font-bold">{item.price}</p>
                </div>
                
                {/* Progress bar for limited stock items - you can customize this */}
                {item.stock < 20 && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Available: {item.stock}</span>
                      <span>{Math.round((item.stock / 50) * 100)}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-400 rounded-full" 
                        style={{ width: `${Math.round((item.stock / 50) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
                
                {/* Action button */}
                <Link
                  to={`/products/${item.id}`}
                  className="block w-full mt-2 bg-gray-100 hover:bg-[#1CA9C9] hover:text-white text-gray-800 text-center py-3 rounded-lg font-medium transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* "View All" button */}
        <div className="text-center mt-8">
          <Link
            to="/products"
            className="inline-block px-8 py-3 bg-transparent border-2 border-[#1CA9C9] text-[#1CA9C9] font-medium rounded-full hover:bg-[#1CA9C9] hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopDeals;