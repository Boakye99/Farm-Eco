import { useState } from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  ChevronDown,
  Plus,
  Truck,
  Menu,
  X
} from "lucide-react";

const AdminLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isRentalsOpen, setIsRentalsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? "bg-green-700" : "";
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm z-10">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className="mr-2 p-2 rounded-md text-gray-700 lg:hidden"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden sm:flex items-center">
              <button 
                onClick={toggleSidebar} 
                className="p-2 rounded-md text-gray-700 mr-2"
              >
                <Menu size={20} />
              </button>
              <span className="text-xl font-semibold text-green-800">Farm Eco</span>
            </div>
            <span className="text-xl font-semibold text-green-800 sm:hidden">Farm Eco</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="flex items-center gap-2 text-gray-700 hover:text-green-700">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-semibold">
                  A
                </div>
                <span className="hidden md:block">Admin</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <aside 
          className={`bg-gray-900 text-white transition-all duration-300 ease-out fixed inset-y-0 left-0 z-20 w-64 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:relative lg:translate-x-0 ${isSidebarOpen ? "lg:w-64" : "lg:w-20"} overflow-y-auto`}
          style={{ top: '4rem' }}
        >
          <div className="p-4">
            <nav className="space-y-1">
              <Link 
                to="/admin" 
                className={`flex items-center px-4 py-3 text-sm rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin')}`}
              >
                <Home size={20} className="flex-shrink-0" />
                {isSidebarOpen && <span className="ml-3">Dashboard</span>}
              </Link>
              
              {/* Products Section */}
              <div>
                <button 
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center">
                    <Package size={20} className="flex-shrink-0" />
                    {isSidebarOpen && <span className="ml-3">Products</span>}
                  </div>
                  {isSidebarOpen && 
                    <ChevronDown 
                      size={16} 
                      className={`transform transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} 
                    />
                  }
                </button>
                
                {isProductsOpen && isSidebarOpen && (
                  <div className="ml-8 space-y-1 mt-1">
                    <Link 
                      to="/admin/products" 
                      className={`flex items-center px-4 py-2 text-sm rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin/products')}`}
                    >
                      <span>All Products</span>
                    </Link>
                    <Link 
                      to="/admin/add-product" 
                      className={`flex items-center px-4 py-2 text-sm rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin/add-product')}`}
                    >
                      <span>Add Product</span>
                    </Link>
                    <Link 
                      to="/admin/categories" 
                      className={`flex items-center px-4 py-2 text-sm rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin/categories')}`}
                    >
                      <span>Categories</span>
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Rentals Section */}
              <div>
                <button 
                  onClick={() => setIsRentalsOpen(!isRentalsOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center">
                    <Truck size={20} className="flex-shrink-0" />
                    {isSidebarOpen && <span className="ml-3">Rentals</span>}
                  </div>
                  {isSidebarOpen && 
                    <ChevronDown 
                      size={16} 
                      className={`transform transition-transform ${isRentalsOpen ? 'rotate-180' : ''}`} 
                    />
                  }
                </button>
                
                {isRentalsOpen && isSidebarOpen && (
                  <div className="ml-8 space-y-1 mt-1">
                    <Link 
                      to="/admin/rentals" 
                      className={`flex items-center px-4 py-2 text-sm rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin/rentals')}`}
                    >
                      <span>All Rentals</span>
                    </Link>
                    <Link 
                      to="/admin/add-rental" 
                      className={`flex items-center px-4 py-2 text-sm rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin/add-rental')}`}
                    >
                      <span>Add Rental</span>
                    </Link>
                    <Link 
                      to="/admin/rental-bookings" 
                      className={`flex items-center px-4 py-2 text-sm rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin/rental-bookings')}`}
                    >
                      <span>Bookings</span>
                    </Link>
                  </div>
                )}
              </div>

              <Link 
                to="/admin/orders" 
                className={`flex items-center px-4 py-3 text-sm rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin/orders')}`}
              >
                <ShoppingCart size={20} className="flex-shrink-0" />
                {isSidebarOpen && <span className="ml-3">Orders</span>}
              </Link>
              
              <Link 
                to="/admin/users" 
                className={`flex items-center px-4 py-3 text-sm rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin/users')}`}
              >
                <Users size={20} className="flex-shrink-0" />
                {isSidebarOpen && <span className="ml-3">Customers</span>}
              </Link>
              
              <Link 
                to="/admin/reports" 
                className={`flex items-center px-4 py-3 text-sm rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin/reports')}`}
              >
                <FileText size={20} className="flex-shrink-0" />
                {isSidebarOpen && <span className="ml-3">Reports</span>}
              </Link>
              
              <Link 
                to="/admin/settings" 
                className={`flex items-center px-4 py-3 text-sm rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin/settings')}`}
              >
                <Settings size={20} className="flex-shrink-0" />
                {isSidebarOpen && <span className="ml-3">Settings</span>}
              </Link>
              
              <div className="pt-4 mt-4 border-t border-gray-700">
                <button className="w-full flex items-center px-4 py-3 text-sm rounded-lg text-red-400 hover:bg-gray-800 transition-colors">
                  <LogOut size={20} className="flex-shrink-0" />
                  {isSidebarOpen && <span className="ml-3">Logout</span>}
                </button>
              </div>
            </nav>
          </div>
        </aside>
        
        {/* Mobile menu backdrop */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75 z-10 lg:hidden"
            onClick={toggleMobileMenu}
          />
        )}
        
        {/* Mobile menu */}
        <div 
          className={`fixed inset-y-0 left-0 flex flex-col w-64 bg-gray-900 text-white transform ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out z-20 lg:hidden`}
          style={{ top: '4rem' }}
        >
          <div className="p-4">
            <nav className="space-y-1">
              <Link 
                to="/admin" 
                className={`flex items-center px-4 py-3 text-sm rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin')}`}
                onClick={toggleMobileMenu}
              >
                <Home size={20} className="flex-shrink-0" />
                <span className="ml-3">Dashboard</span>
              </Link>
              
              {/* Products Section */}
              <div>
                <button 
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center">
                    <Package size={20} className="flex-shrink-0" />
                    <span className="ml-3">Products</span>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`transform transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {isProductsOpen && (
                  <div className="ml-8 space-y-1 mt-1">
                    <Link 
                      to="/admin/products" 
                      className={`flex items-center px-4 py-2 text-sm rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin/products')}`}
                      onClick={toggleMobileMenu}
                    >
                      <span>All Products</span>
                    </Link>
                    <Link 
                      to="/admin/add-product" 
                      className={`flex items-center px-4 py-2 text-sm rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin/add-product')}`}
                      onClick={toggleMobileMenu}
                    >
                      <span>Add Product</span>
                    </Link>
                    <Link 
                      to="/admin/categories" 
                      className={`flex items-center px-4 py-2 text-sm rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin/categories')}`}
                      onClick={toggleMobileMenu}
                    >
                      <span>Categories</span>
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Rentals Section */}
              <div>
                <button 
                  onClick={() => setIsRentalsOpen(!isRentalsOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center">
                    <Truck size={20} className="flex-shrink-0" />
                    <span className="ml-3">Rentals</span>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`transform transition-transform ${isRentalsOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {isRentalsOpen && (
                  <div className="ml-8 space-y-1 mt-1">
                    <Link 
                      to="/admin/rentals" 
                      className={`flex items-center px-4 py-2 text-sm rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin/rentals')}`}
                      onClick={toggleMobileMenu}
                    >
                      <span>All Rentals</span>
                    </Link>
                    <Link 
                      to="/admin/add-rental" 
                      className={`flex items-center px-4 py-2 text-sm rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin/add-rental')}`}
                      onClick={toggleMobileMenu}
                    >
                      <span>Add Rental</span>
                    </Link>
                    <Link 
                      to="/admin/rental-bookings" 
                      className={`flex items-center px-4 py-2 text-sm rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin/rental-bookings')}`}
                      onClick={toggleMobileMenu}
                    >
                      <span>Bookings</span>
                    </Link>
                  </div>
                )}
              </div>

              <Link 
                to="/admin/orders" 
                className={`flex items-center px-4 py-3 text-sm rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin/orders')}`}
                onClick={toggleMobileMenu}
              >
                <ShoppingCart size={20} className="flex-shrink-0" />
                <span className="ml-3">Orders</span>
              </Link>
              
              <Link 
                to="/admin/users" 
                className={`flex items-center px-4 py-3 text-sm rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin/users')}`}
                onClick={toggleMobileMenu}
              >
                <Users size={20} className="flex-shrink-0" />
                <span className="ml-3">Customers</span>
              </Link>
              
              <Link 
                to="/admin/reports" 
                className={`flex items-center px-4 py-3 text-sm rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin/reports')}`}
                onClick={toggleMobileMenu}
              >
                <FileText size={20} className="flex-shrink-0" />
                <span className="ml-3">Reports</span>
              </Link>
              
              <Link 
                to="/admin/settings" 
                className={`flex items-center px-4 py-3 text-sm rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin/settings')}`}
                onClick={toggleMobileMenu}
              >
                <Settings size={20} className="flex-shrink-0" />
                <span className="ml-3">Settings</span>
              </Link>
              
              <div className="pt-4 mt-4 border-t border-gray-700">
                <button className="w-full flex items-center px-4 py-3 text-sm rounded-lg text-red-400 hover:bg-gray-800 transition-colors">
                  <LogOut size={20} className="flex-shrink-0" />
                  <span className="ml-3">Logout</span>
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-x-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;