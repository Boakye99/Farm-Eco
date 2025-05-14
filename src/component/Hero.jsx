import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLeaf, FaArrowRight, FaShoppingBasket, FaTools } from "react-icons/fa";
import farmToolsImg from "../assets/images/farm-tools.png";
import bgImage from "../assets/images/hero-bg.jpg";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Feature items
  const features = [
    { 
      icon: <FaLeaf />, 
      text: "Eco-friendly options",
      delay: 0.7
    },
    { 
      icon: <FaTools />, 
      text: "Premium quality", 
      delay: 0.9
    },
    { 
      icon: <FaShoppingBasket />, 
      text: "Flexible rentals", 
      delay: 1.1 
    }
  ];

  // Parallax effect for background
  const yBg = scrollY * 0.2;

  return (
    <section className="relative overflow-hidden">
      {/* Background with parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${bgImage})`,
          transform: `translateY(${yBg}px)`,
          height: "calc(100% + 100px)"
        }}
      />
      
      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/40" />
      
      {/* Content */}
      <div className="relative min-h-[90vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="grid md:grid-cols-2 gap-12 items-center py-16 md:py-24">
          {/* Left content */}
          <div className="text-center md:text-left space-y-8">
            {/* Highlight badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block"
            >
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center space-x-1 mb-4 w-fit mx-auto md:mx-0">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>New Season Collection Available</span>
              </span>
            </motion.div>
            
            {/* Main heading with text reveal animation */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              >
                Elevate Your <span className="text-[#1CA9C9]">Farming</span> Experience
              </motion.h1>
            </div>
            
            {/* Subtitle with staggered animation */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gray-200 text-lg md:text-xl max-w-lg mx-auto md:mx-0"
            >
              Premium tools and equipment for modern farmers. 
              Buy or rent what you need, when you need it.
            </motion.p>
            
            {/* CTA buttons with hover effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center md:justify-start gap-4"
            >
              <Link
                to="/products"
                className="group bg-[#1CA9C9] hover:bg-[#178BA8] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-[#1CA9C9]/20"
              >
                <span>Shop Now</span>
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/rentals"
                className="group bg-transparent border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Rent Equipment</span>
                <FaTools className="transition-transform duration-300 group-hover:rotate-12" />
              </Link>
            </motion.div>
            
            {/* Features list with staggered animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-6"
            >
              <div className="flex flex-wrap justify-center md:justify-start gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: feature.delay }}
                    className="flex items-center space-x-2 text-white/80"
                  >
                    <div className="text-[#1CA9C9] text-lg">{feature.icon}</div>
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Right image with floating animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex justify-center items-center"
          >
            <motion.div
              animate={{ 
                y: [0, -15, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 5,
                ease: "easeInOut" 
              }}
              className="relative z-10"
            >
              <img
                src={farmToolsImg}
                alt="Premium farm tools and equipment"
                className="w-full h-auto max-w-lg mx-auto drop-shadow-2xl rounded-lg"
              />
              
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.3 }}
                className="absolute -bottom-4 -right-4 md:right-10 bg-white rounded-lg shadow-xl p-3 md:p-4"
              >
                <div className="text-center">
                  <p className="text-gray-800 font-bold text-base md:text-lg">Save 25%</p>
                  <p className="text-[#1CA9C9] text-xs md:text-sm">Limited Offer</p>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full border-2 border-dashed border-[#1CA9C9]/20 animate-spin-slow"></div>
            <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-[#1CA9C9]/30 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-green-500/20 to-transparent rounded-full blur-3xl"></div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <p className="text-white/70 text-sm mb-2">Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-white/30"
          ></motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;