import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useCategoryStore from "../store/categoryStore";
import { FaShoppingBag, FaRegCalendarAlt, FaChevronRight, FaFilter } from "react-icons/fa";

const BrowseByCategory = () => {
  const { categories } = useCategoryStore();
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [filterActive, setFilterActive] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // This function could be expanded with actual filtering logic
  const toggleFilter = () => {
    setFilterActive(!filterActive);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231CA9C9' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: "60px 60px"
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={headingVariants}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-[#1CA9C9] bg-[#1CA9C9]/10 px-4 py-1.5 rounded-full mb-4">
            Explore Categories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Browse by <span className="text-[#1CA9C9]">Category</span>
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Shop or rent from our wide range of modern agricultural tools and machinery,
            designed for efficiency and sustainability.
          </motion.p>
        </motion.div>

        {/* Filter bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-between items-center mb-8 px-4"
        >
          <p className="text-gray-600 text-sm">
            Showing all <span className="font-medium">{categories.length}</span> categories
          </p>
          
          <button 
            onClick={toggleFilter}
            className={`flex items-center gap-2 text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300 ${
              filterActive 
                ? "bg-[#1CA9C9] text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FaFilter className={`${filterActive ? "animate-pulse" : ""}`} />
            <span>Filter</span>
          </button>
        </motion.div>

        {/* Category grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="group relative"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl transform group-hover:-translate-y-1">
                {/* Category image with overlay */}
                <div className="relative aspect-w-16 aspect-h-10 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-80"></div>
                  
                  {/* Category badges */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    {category.isNew && (
                      <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        NEW
                      </span>
                    )}
                    {category.trending && (
                      <span className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        TRENDING
                      </span>
                    )}
                  </div>

                  {/* Category name on image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-sm mt-1">
                      {category.itemCount || Math.floor(Math.random() * 20) + 5} items
                    </p>
                  </div>
                </div>

                {/* Category details */}
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-5">
                    {category.description}
                  </p>

                  {/* Action buttons */}
                  <div className="flex justify-between gap-2">
                    <Link
                      to={`/products?category=${category.name}&type=buy`}
                      className="flex items-center justify-center gap-2 text-sm font-medium bg-[#1CA9C9] text-white px-4 py-2.5 rounded-lg hover:bg-[#178BA8] transition-colors duration-300 flex-1"
                    >
                      <FaShoppingBag className="text-white/90" />
                      <span>Buy</span>
                    </Link>
                    <Link
                      to={`/products?category=${category.name}&type=rent`}
                      className="flex items-center justify-center gap-2 text-sm font-medium border border-[#1CA9C9] text-[#1CA9C9] px-4 py-2.5 rounded-lg hover:bg-[#1CA9C9] hover:text-white transition-colors duration-300 flex-1"
                    >
                      <FaRegCalendarAlt className="text-[#1CA9C9] group-hover:text-white" />
                      <span>Rent</span>
                    </Link>
                  </div>
                </div>

                {/* Hover animation */}
                {hoveredCategory === category.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-0 right-0 m-4 z-10 bg-white rounded-full p-2.5 shadow-lg"
                  >
                    <Link
                      to={`/products?category=${category.name}`}
                      className="flex items-center justify-center text-[#1CA9C9] hover:text-[#178BA8] transition-colors"
                    >
                      <FaChevronRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* "View all" button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-6 py-3 rounded-lg transition-colors shadow-sm"
          >
            <span>View All Products</span>
            <FaChevronRight className="w-3 h-3" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BrowseByCategory;