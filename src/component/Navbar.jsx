
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaBars, FaUserCircle, FaSignOutAlt, FaUserAlt, FaClipboardList } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import useCartStore from '../store/cartStore';
import { supabase } from '../lib/supabaseClient';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const totalItems = useCartStore((state) => state.totalItems());
  const dropdownRef = useRef(null);
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        
        // Get current session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking auth status:', error);
          return;
        }
        
        if (session) {
          setIsAuthenticated(true);
          setUser(session.user);
          
          // Fetch user profile if authenticated
          if (session.user) {
            fetchUserProfile(session.user.id);
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
          setUserProfile(null);
        }
      } catch (error) {
        console.error('Error in auth check:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setIsAuthenticated(true);
          setUser(session.user);
          fetchUserProfile(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false);
          setUser(null);
          setUserProfile(null);
        }
      }
    );
    
    return () => {
      // Clean up subscription when component unmounts
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);
  
  // Fetch user profile from user_profiles table
  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('first_name')
        .eq('uid', userId)
        .single();
        
      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }
      
      if (data) {
        setUserProfile(data);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Error signing out:', error);
        return;
      }
      
      setIsAuthenticated(false);
      setUser(null);
      setUserProfile(null);
      setAccountDropdownOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);
  
  // Handle click outside of dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAccountDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleAccountDropdown = () => setAccountDropdownOpen(!accountDropdownOpen);
  
  // NavLink component with active state
  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    
    return (
      <Link to={to} className="relative group px-1">
        <span className={`text-base font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-100 hover:text-white'}`}>
          {children}
        </span>
        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
      </Link>
    );
  };

  // Account dropdown items
  const AccountDropdownItems = () => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      {isAuthenticated ? (
        <>
          <Link 
            to="/account" 
            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
            onClick={() => setAccountDropdownOpen(false)}
          >
            <FaUserAlt className="mr-3 text-gray-500" />
            <span>My Account</span>
          </Link>
          <Link 
            to="/orders" 
            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
            onClick={() => setAccountDropdownOpen(false)}
          >
            <FaClipboardList className="mr-3 text-gray-500" />
            <span>My Orders</span>
          </Link>
          <div className="border-t border-gray-100"></div>
          <button 
            className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-150"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-3" />
            <span>Logout</span>
          </button>
        </>
      ) : (
        <>
          <Link 
            to="/login" 
            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
            onClick={() => setAccountDropdownOpen(false)}
          >
            <FaUserCircle className="mr-3 text-gray-500" />
            <span>Login</span>
          </Link>
          <Link 
            to="/register" 
            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
            onClick={() => setAccountDropdownOpen(false)}
          >
            <FaUserAlt className="mr-3 text-gray-500" />
            <span>Register</span>
          </Link>
        </>
      )}
    </motion.div>
  );

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#1CA9C9]/90 backdrop-blur-md py-3 shadow-lg' 
          : 'bg-[#1CA9C9] py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="flex items-center space-x-2"
            >
              <span className="text-2xl font-bold text-white tracking-wide">
                Farm<span className="text-emerald-300">Eco</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.div 
              className="flex space-x-8 items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <NavLink to="/">Home</NavLink>
              <NavLink to="/products">Products</NavLink>
              <NavLink to="/rentals">Rentals</NavLink>
              <NavLink to="/about">About Us</NavLink>
            </motion.div>
            
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Shopping Cart */}
              <Link
                to="/cart"
                className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
              >
                <FaShoppingCart className="text-white text-xl" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-emerald-300 text-emerald-900 text-xs font-semibold h-5 min-w-5 flex items-center justify-center rounded-full"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Link>
              
              {/* Account Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleAccountDropdown}
                  className="flex items-center space-x-1 text-white px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
                  aria-expanded={accountDropdownOpen}
                  aria-haspopup="true"
                >
                  <FaUserCircle className="text-lg" />
                  <span className="text-sm font-medium">
                    {loading ? 'Loading...' : (
                      isAuthenticated ? (
                        userProfile?.first_name ? `Hi, ${userProfile.first_name}` : 'Account'
                      ) : 'Sign in'
                    )}
                  </span>
                  <IoIosArrowDown className={`transition-transform duration-200 ${accountDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {accountDropdownOpen && <AccountDropdownItems />}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <IoClose className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <div className="bg-gradient-to-b from-[#1CA9C9] to-[#158ca8] px-4 pt-4 pb-6 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="block py-3 text-white font-medium border-b border-white/20"
              >
                <Link to="/" onClick={toggleMenu}>Home</Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="block py-3 text-white font-medium border-b border-white/20"
              >
                <Link to="/products" onClick={toggleMenu}>Products</Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="block py-3 text-white font-medium border-b border-white/20"
              >
                <Link to="/rentals" onClick={toggleMenu}>Rentals</Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="block py-3 text-white font-medium border-b border-white/20"
              >
                <Link to="/about" onClick={toggleMenu}>About Us</Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center py-3 text-white font-medium border-b border-white/20"
              >
                <Link 
                  to="/cart" 
                  onClick={toggleMenu}
                  className="flex items-center space-x-2"
                >
                  <FaShoppingCart />
                  <span>Cart</span>
                  {totalItems > 0 && (
                    <span className="ml-2 bg-emerald-300 text-emerald-900 text-xs font-semibold px-2 py-1 rounded-full">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </motion.div>
              
              {/* Account options in mobile menu */}
              {loading ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="block py-3 text-white font-medium border-b border-white/20"
                >
                  Loading...
                </motion.div>
              ) : isAuthenticated ? (
                <>
                  {userProfile?.first_name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="block py-3 text-white font-medium border-b border-white/20"
                    >
                      <div className="flex items-center space-x-2">
                        <FaUserCircle />
                        <span>Hi, {userProfile.first_name}</span>
                      </div>
                    </motion.div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="block py-3 text-white font-medium border-b border-white/20"
                  >
                    <Link to="/account" onClick={toggleMenu} className="flex items-center space-x-2">
                      <FaUserAlt />
                      <span>My Account</span>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="block py-3 text-white font-medium border-b border-white/20"
                  >
                    <Link to="/orders" onClick={toggleMenu} className="flex items-center space-x-2">
                      <FaClipboardList />
                      <span>My Orders</span>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="block py-3 text-white font-medium"
                  >
                    <button 
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="flex items-center space-x-2 text-red-100"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="block py-3 text-white font-medium"
                >
                  <Link to="/login" onClick={toggleMenu} className="flex items-center space-x-2">
                    <FaUserCircle />
                    <span>Login / Register</span>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;