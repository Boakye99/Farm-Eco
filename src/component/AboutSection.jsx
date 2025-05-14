import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaStar,
  FaMapMarkerAlt,
  FaTractor,
  FaLeaf,
  FaHeadset,
  FaTruck,
  FaShieldAlt,
  FaUsers
} from "react-icons/fa";

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("why");
  
  const features = [
    {
      title: "High-Quality Equipment",
      icon: <FaTractor />,
      description: "Premium agricultural tools built to last and perform"
    },
    {
      title: "Eco-Friendly Products",
      icon: <FaLeaf />,
      description: "Sustainable solutions that protect our environment"
    },
    {
      title: "24/7 Support",
      icon: <FaHeadset />,
      description: "Our team is always available to assist you"
    },
    {
      title: "Fast Delivery",
      icon: <FaTruck />,
      description: "Quick and reliable shipping across Ghana"
    },
    {
      title: "Affordable Pricing",
      icon: <FaShieldAlt />,
      description: "Competitive prices without compromising quality"
    },
    {
      title: "Trusted by Farmers",
      icon: <FaUsers />,
      description: "Serving thousands of satisfied farmers nationwide"
    }
  ];

  const testimonials = [
    {
      name: "Kwame A.",
      role: "Rice Farmer",
      review: "Farm Eco helped me upgrade my tools at a great price. Their quality and service exceeded my expectations.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=150&q=60"
    },
    {
      name: "Adwoa M.",
      role: "Vegetable Grower",
      review: "Renting a tractor was so easy and fast. The equipment was in perfect condition and the process was seamless.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=150&q=60"
    },
    {
      name: "Daniel T.",
      role: "Poultry Farmer",
      review: "Amazing customer support and top-notch farm gear. Their team went above and beyond to help with my specific needs.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=150&q=60"
    }
  ];

  const regions = [
    {
      name: "Accra",
      count: 52
    },
    {
      name: "Kumasi",
      count: 37
    },
    {
      name: "Tamale",
      count: 28
    },
    {
      name: "Takoradi",
      count: 23
    },
    {
      name: "Sunyani",
      count: 19
    },
    {
      name: "Ho",
      count: 15
    },
    {
      name: "Cape Coast",
      count: 21
    },
    {
      name: "Wa",
      count: 12
    }
  ];

  const tabVariants = {
    active: { 
      color: "#1CA9C9",
      borderBottom: "3px solid #1CA9C9",
      fontWeight: 600
    },
    inactive: { 
      color: "#6B7280",
      borderBottom: "3px solid transparent",
      fontWeight: 400
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-24 px-4 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-[#E6F7FB] text-[#1CA9C9] font-medium rounded-full text-sm mb-3">
            ABOUT FARM ECO
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Empowering <span className="text-[#1CA9C9]">Agriculture</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We are committed to transforming agriculture through innovation, quality, and sustainable practices.
          </p>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-12 border-b border-gray-200">
          <motion.button
            className="px-6 py-3 text-lg"
            variants={tabVariants}
            animate={activeTab === "why" ? "active" : "inactive"}
            onClick={() => setActiveTab("why")}
          >
            Why Choose Us
          </motion.button>
          <motion.button
            className="px-6 py-3 text-lg"
            variants={tabVariants}
            animate={activeTab === "testimonials" ? "active" : "inactive"}
            onClick={() => setActiveTab("testimonials")}
          >
            Testimonials
          </motion.button>
          <motion.button
            className="px-6 py-3 text-lg"
            variants={tabVariants}
            animate={activeTab === "regions" ? "active" : "inactive"}
            onClick={() => setActiveTab("regions")}
          >
            Service Areas
          </motion.button>
        </div>
        
        {/* Tab Content */}
        <div className="min-h-[500px]">
          {/* WHY CHOOSE US */}
          {activeTab === "why" && (
            <motion.div
              className="grid md:grid-cols-3 gap-6"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group"
                  variants={itemVariants}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-[#E6F7FB] text-[#1CA9C9] rounded-xl group-hover:bg-[#1CA9C9] group-hover:text-white transition-all duration-300 text-xl">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-lg text-gray-800">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 pl-12">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          {/* TESTIMONIALS */}
          {activeTab === "testimonials" && (
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                    variants={itemVariants}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#E6F7FB] rounded-bl-full -z-10" />
                    
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-[#1CA9C9]"
                      />
                      <div>
                        <h4 className="font-semibold text-lg text-gray-800">{testimonial.name}</h4>
                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4 flex">
                      {Array(testimonial.rating).fill(0).map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" />
                      ))}
                    </div>
                    
                    <p className="text-gray-600 italic mb-4">"{testimonial.review}"</p>
                    
                    <div className="h-1 w-12 bg-[#1CA9C9] rounded-full" />
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <button className="px-6 py-3 border-2 border-[#1CA9C9] text-[#1CA9C9] rounded-full font-medium hover:bg-[#1CA9C9] hover:text-white transition-all duration-300">
                  View All Reviews
                </button>
              </div>
            </motion.div>
          )}
          
          {/* SERVICE AREAS */}
          {activeTab === "regions" && (
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto"
            >
              <div className="mb-10">
                <div className="relative h-[300px] md:h-[400px] bg-gray-200 rounded-2xl overflow-hidden">
                  <img 
                    src="/api/placeholder/800/400" 
                    alt="Map of Ghana service areas"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="text-white text-center">
                      <h3 className="text-2xl font-bold mb-2">Growing Nationwide</h3>
                      <p className="text-lg">Serving all major regions in Ghana</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                variants={contentVariants}
              >
                {regions.map((region, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all group hover:bg-[#1CA9C9] cursor-pointer"
                    variants={itemVariants}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-[#1CA9C9] group-hover:text-white transition-all" />
                        <span className="font-medium text-gray-800 group-hover:text-white transition-all">{region.name}</span>
                      </div>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full group-hover:bg-white group-hover:text-[#1CA9C9] transition-all">
                        {region.count}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="text-center mt-12">
                <button className="px-6 py-3 bg-[#1CA9C9] text-white rounded-full font-medium hover:bg-[#178BA8] transition-all duration-300 shadow-lg shadow-[#1CA9C9]/20">
                  Check Service Availability
                </button>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Bottom Stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-200 pt-12">
          {[
            { number: "5000+", label: "Farmers Served" },
            { number: "98%", label: "Satisfaction Rate" },
            { number: "12+", label: "Years Experience" },
            { number: "24/7", label: "Customer Support" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-[#1CA9C9] mb-2">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;