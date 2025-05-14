import { useState, useEffect } from "react";
import { Search, Filter, Plus, Edit, Trash2, ChevronDown, ChevronUp, Check, X } from "lucide-react";

const ProductsList = () => {
  // Sample product data - this would typically come from an API
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Premium Tractor",
      category: "Heavy Machinery",
      price: 45000,
      stock: 5,
      image: "/api/placeholder/120/80",
      featured: true,
    },
    {
      id: 2,
      name: "Irrigation System",
      category: "Irrigation",
      price: 2500,
      stock: 15,
      image: "/api/placeholder/120/80",
      featured: false,
    },
    {
      id: 3,
      name: "Harvest Combine",
      category: "Heavy Machinery",
      price: 38000,
      stock: 3,
      image: "/api/placeholder/120/80",
      featured: true,
    },
    {
      id: 4,
      name: "Soil Tester Kit",
      category: "Hand Tools",
      price: 120,
      stock: 50,
      image: "/api/placeholder/120/80",
      featured: false,
    },
    {
      id: 5,
      name: "Sprinkler System",
      category: "Irrigation",
      price: 750,
      stock: 20,
      image: "/api/placeholder/120/80",
      featured: false,
    },
    {
      id: 6,
      name: "Harvesting Sickle",
      category: "Hand Tools",
      price: 35,
      stock: 100,
      image: "/api/placeholder/120/80",
      featured: false,
    },
    {
      id: 7,
      name: "Fertilizer Spreader",
      category: "Implements",
      price: 1200,
      stock: 8,
      image: "/api/placeholder/120/80",
      featured: true,
    },
  ]);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  
  // Filtered and sorted products
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Get unique categories for filter dropdown
  const categories = ["All", ...new Set(products.map(product => product.category))];
  
  useEffect(() => {
    // Filter products based on search term and category
    let filtered = [...products];
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterCategory !== "All") {
      filtered = filtered.filter(product => product.category === filterCategory);
    }
    
    // Sort products
    filtered.sort((a, b) => {
      let comparison = 0;
      
      if (sortField === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === "price") {
        comparison = a.price - b.price;
      } else if (sortField === "stock") {
        comparison = a.stock - b.stock;
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });
    
    setFilteredProducts(filtered);
  }, [products, searchTerm, filterCategory, sortField, sortDirection]);
  
  // Handle sort request
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  // Toggle product featured status
  const toggleFeatured = (id) => {
    setProducts(products.map(product => 
      product.id === id ? {...product, featured: !product.featured} : product
    ));
  };
  
  // Delete product
  const deleteProduct = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center">
            <Plus size={18} className="mr-1" /> Add Product
          </button>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats overview */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <div className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Products</dt>
                    <dd className="text-xl font-semibold text-gray-900">{products.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <div className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Featured Products</dt>
                    <dd className="text-xl font-semibold text-gray-900">
                      {products.filter(p => p.featured).length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                  <div className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Low Stock Items</dt>
                    <dd className="text-xl font-semibold text-gray-900">
                      {products.filter(p => p.stock < 5).length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Search and filters */}
        <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="relative mb-4 md:mb-0 md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-4">
              <div className="relative">
                <button
                  className="flex items-center bg-white border border-gray-300 rounded-md px-4 py-2 text-sm"
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                >
                  <Filter size={18} className="mr-2 text-gray-500" />
                  Filter
                  {showFilterMenu ? (
                    <ChevronUp size={16} className="ml-2" />
                  ) : (
                    <ChevronDown size={16} className="ml-2" />
                  )}
                </button>
                
                {showFilterMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-700 font-medium">Category</div>
                      {categories.map((category) => (
                        <button
                          key={category}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-between"
                          onClick={() => {
                            setFilterCategory(category);
                            setShowFilterMenu(false);
                          }}
                        >
                          {category}
                          {filterCategory === category && <Check size={16} className="text-green-500" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Products table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center group" 
                      onClick={() => handleSort("name")}
                    >
                      Product
                      {sortField === "name" && (
                        sortDirection === "asc" ? 
                        <ChevronUp size={16} className="ml-1 text-gray-400" /> : 
                        <ChevronDown size={16} className="ml-1 text-gray-400" />
                      )}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center group" 
                      onClick={() => handleSort("price")}
                    >
                      Price
                      {sortField === "price" && (
                        sortDirection === "asc" ? 
                        <ChevronUp size={16} className="ml-1 text-gray-400" /> : 
                        <ChevronDown size={16} className="ml-1 text-gray-400" />
                      )}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center group" 
                      onClick={() => handleSort("stock")}
                    >
                      Stock
                      {sortField === "stock" && (
                        sortDirection === "asc" ? 
                        <ChevronUp size={16} className="ml-1 text-gray-400" /> : 
                        <ChevronDown size={16} className="ml-1 text-gray-400" />
                      )}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Featured
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            className="h-10 w-10 rounded-md object-cover" 
                            src={product.image} 
                            alt={product.name} 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">ID: {product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.stock < 5 
                          ? 'bg-red-100 text-red-800' 
                          : product.stock < 10 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        onClick={() => toggleFeatured(product.id)}
                        className={`p-1 rounded-full ${
                          product.featured 
                            ? 'bg-green-100 text-green-500 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        {product.featured ? <Check size={18} /> : <X size={18} />}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <Edit size={18} />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => deleteProduct(product.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
          
          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredProducts.length}</span> of{" "}
                  <span className="font-medium">{filteredProducts.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronDown className="h-5 w-5 rotate-90" aria-hidden="true" />
                  </a>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronDown className="h-5 w-5 -rotate-90" aria-hidden="true" />
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductsList;