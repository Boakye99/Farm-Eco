import { useState, useEffect } from 'react';
import { Search, Sliders, ChevronDown, ChevronRight, Star, Grid3x3, List, ChevronLeft, ChevronRight as ChevronRightIcon, ArrowLeft } from 'lucide-react';
import useRentalStore from '../store/rentalStore';

export default function Rental() {
  // Use the rental store
  const { 
    searchTerm, setSearchTerm,
    selectedCategory, setSelectedCategory,
    selectedSubcategory, setSelectedSubcategory,
    selectedLocation, setSelectedLocation,
    availableOnly, toggleAvailableOnly,
    sortBy, setSortBy,
    viewMode, setViewMode,
    currentPage, setCurrentPage,
    expandedFilters, toggleFilterSection,
    clearAllFilters,
    categories, subcategories, locations,
    getFilteredTools, getSortedTools, getPaginatedTools, getTotalPages,
    selectedToolId, isViewingDetails, viewToolDetails, backToListings,
    getSelectedTool
  } = useRentalStore();
  
  // Get tools for display
  const paginatedTools = getPaginatedTools();
  const totalPages = getTotalPages();
  const filteredToolsCount = getFilteredTools().length;
  
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Selected tool for details view
  const selectedTool = getSelectedTool();

  return (
    <div className="bg-gray-50 min-h-screen">
      {!isViewingDetails ? (
        <>
          {/* Hero Section */}
          <div className="bg-green-700 text-white">
            <div className="container mx-auto px-4 py-16">
              <h1 className="text-4xl font-bold mb-4">Rent Farm Equipment</h1>
              <p className="text-xl mb-8">Access top-quality agricultural tools and equipment without the high investment</p>
              
              {/* Main Search Bar */}
              <div className="flex bg-white rounded-lg overflow-hidden p-1 max-w-3xl">
                <input
                  type="text"
                  placeholder="Search for equipment..."
                  className="flex-grow px-4 py-3 text-gray-800 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="bg-green-600 text-white px-6 py-3 flex items-center rounded-md">
                  <Search size={20} className="mr-2" />
                  Search
                </button>
              </div>
              
              <div className="mt-6 text-sm flex flex-wrap gap-4">
                <span>Popular Searches:</span>
                <button className="hover:underline" onClick={() => setSearchTerm("Tractor")}>Tractors</button>
                <button className="hover:underline" onClick={() => setSearchTerm("Irrigation")}>Irrigation Systems</button>
                <button className="hover:underline" onClick={() => setSearchTerm("Harvester")}>Harvesters</button>
                <button className="hover:underline" onClick={() => setSearchTerm("Seed")}>Seeders</button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="container mx-auto px-4 py-8">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <div className="text-gray-700">
                <span className="font-semibold">{filteredToolsCount}</span> items found
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <label className="mr-2 text-gray-700">Sort by:</label>
                  <select 
                    className="border rounded-md px-3 py-2 bg-white"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
                <div className="flex border rounded-md overflow-hidden">
                  <button 
                    className={`p-2 ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-white'}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3x3 size={20} />
                  </button>
                  <button 
                    className={`p-2 ${viewMode === 'list' ? 'bg-gray-200' : 'bg-white'}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Main Content Grid */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Filters Sidebar */}
              <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-xl">Filters</h2>
                  <button 
                    className="text-green-600 text-sm hover:underline"
                    onClick={clearAllFilters}
                  >
                    Clear All
                  </button>
                </div>
                
                {/* Categories */}
                <div className="mb-4 border-b pb-4">
                  <button 
                    className="flex items-center justify-between w-full text-left font-medium mb-2"
                    onClick={() => toggleFilterSection('categories')}
                  >
                    <span>Equipment Category</span>
                    {expandedFilters.categories ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>
                  
                  {expandedFilters.categories && (
                    <div className="pl-2 space-y-2">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="cat-all" 
                          name="category"
                          checked={selectedCategory === ''}
                          onChange={() => setSelectedCategory('')}
                          className="mr-2"
                        />
                        <label htmlFor="cat-all" className="text-gray-700">All Categories</label>
                      </div>
                      {categories.map(category => (
                        <div key={category} className="flex items-center">
                          <input 
                            type="radio" 
                            id={`cat-${category}`}
                            name="category"
                            checked={selectedCategory === category}
                            onChange={() => setSelectedCategory(category)}
                            className="mr-2"
                          />
                          <label htmlFor={`cat-${category}`} className="text-gray-700">{category}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Subcategories */}
                <div className="mb-4 border-b pb-4">
                  <button 
                    className="flex items-center justify-between w-full text-left font-medium mb-2"
                    onClick={() => toggleFilterSection('subcategories')}
                  >
                    <span>Equipment Type</span>
                    {expandedFilters.subcategories ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>
                  
                  {expandedFilters.subcategories && (
                    <div className="pl-2 space-y-2">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="subcat-all" 
                          name="subcategory"
                          checked={selectedSubcategory === ''}
                          onChange={() => setSelectedSubcategory('')}
                          className="mr-2"
                        />
                        <label htmlFor="subcat-all" className="text-gray-700">All Types</label>
                      </div>
                      {subcategories.map(subcategory => (
                        <div key={subcategory} className="flex items-center">
                          <input 
                            type="radio" 
                            id={`subcat-${subcategory}`}
                            name="subcategory"
                            checked={selectedSubcategory === subcategory}
                            onChange={() => setSelectedSubcategory(subcategory)}
                            className="mr-2"
                          />
                          <label htmlFor={`subcat-${subcategory}`} className="text-gray-700">{subcategory}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Locations */}
                <div className="mb-4 border-b pb-4">
                  <button 
                    className="flex items-center justify-between w-full text-left font-medium mb-2"
                    onClick={() => toggleFilterSection('locations')}
                  >
                    <span>Pickup Location</span>
                    {expandedFilters.locations ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>
                  
                  {expandedFilters.locations && (
                    <div className="pl-2 space-y-2">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="loc-all" 
                          name="location"
                          checked={selectedLocation === ''}
                          onChange={() => setSelectedLocation('')}
                          className="mr-2"
                        />
                        <label htmlFor="loc-all" className="text-gray-700">All Locations</label>
                      </div>
                      {locations.map(location => (
                        <div key={location} className="flex items-center">
                          <input 
                            type="radio" 
                            id={`loc-${location}`}
                            name="location"
                            checked={selectedLocation === location}
                            onChange={() => setSelectedLocation(location)}
                            className="mr-2"
                          />
                          <label htmlFor={`loc-${location}`} className="text-gray-700">{location}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Availability */}
                <div className="mb-4">
                  <button 
                    className="flex items-center justify-between w-full text-left font-medium mb-2"
                    onClick={() => toggleFilterSection('availability')}
                  >
                    <span>Availability</span>
                    {expandedFilters.availability ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>
                  
                  {expandedFilters.availability && (
                    <div className="pl-2 space-y-2">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="available-only"
                          checked={availableOnly}
                          onChange={toggleAvailableOnly}
                          className="mr-2"
                        />
                        <label htmlFor="available-only" className="text-gray-700">Available Now</label>
                      </div>
                    </div>
                  )}
                </div>
                
                <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center">
                  <Sliders size={16} className="mr-2" />
                  Apply Filters
                </button>
              </div>
              
              {/* Products Grid */}
              <div className="flex-grow">
                {paginatedTools.length > 0 ? (
                  <>
                    {/* Grid View */}
                    {viewMode === 'grid' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedTools.map(tool => (
                          <div 
                            key={tool.id} 
                            className="bg-white rounded-lg shadow overflow-hidden cursor-pointer transform transition hover:scale-105"
                            onClick={() => viewToolDetails(tool.id)}
                          >
                            <div className="relative">
                              <img src={tool.image} alt={tool.name} className="w-full h-48 object-cover" />
                              {!tool.available && (
                                <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 m-2 rounded-md text-sm font-medium">
                                  Currently Unavailable
                                </div>
                              )}
                            </div>
                            <div className="p-4">
                              <div className="flex justify-between items-start">
                                <h3 className="font-semibold text-lg">{tool.name}</h3>
                                <div className="flex items-center">
                                  <Star size={16} className="text-yellow-400 fill-current" />
                                  <span className="ml-1 text-gray-700">{tool.rating}</span>
                                  <span className="ml-1 text-gray-500">({tool.reviewCount})</span>
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm mt-2">{tool.description}</p>
                              <div className="flex items-center mt-2 text-sm text-gray-600">
                                <span className="mr-2">{tool.category}</span>
                                <span>&bull;</span>
                                <span className="ml-2">{tool.subcategory}</span>
                              </div>
                              <div className="mt-2 text-sm text-gray-600">
                                <span>Location: {tool.location}</span>
                              </div>
                              <div className="mt-4 flex justify-between items-center">
                                <div>
                                  <span className="text-2xl font-bold text-green-600">${tool.pricePerDay}</span>
                                  <span className="text-gray-600 text-sm">/day</span>
                                </div>
                                <button 
                                  className={`px-4 py-2 rounded-md ${tool.available 
                                    ? 'bg-green-600 text-white hover:bg-green-700' 
                                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                                  disabled={!tool.available}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (tool.available) {
                                      // Add rental logic here
                                      alert(`Renting ${tool.name}`);
                                    }
                                  }}
                                >
                                  {tool.available ? 'Rent Now' : 'Not Available'}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* List View */}
                    {viewMode === 'list' && (
                      <div className="space-y-4">
                        {paginatedTools.map(tool => (
                          <div 
                            key={tool.id} 
                            className="bg-white rounded-lg shadow overflow-hidden flex cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => viewToolDetails(tool.id)}
                          >
                            <div className="relative w-48">
                              <img src={tool.image} alt={tool.name} className="w-full h-full object-cover" />
                              {!tool.available && (
                                <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-xs font-medium">
                                  Unavailable
                                </div>
                              )}
                            </div>
                            <div className="p-4 flex-grow flex flex-col">
                              <div className="flex justify-between items-start">
                                <h3 className="font-semibold text-lg">{tool.name}</h3>
                                <div className="flex items-center">
                                  <Star size={16} className="text-yellow-400 fill-current" />
                                  <span className="ml-1 text-gray-700">{tool.rating}</span>
                                  <span className="ml-1 text-gray-500">({tool.reviewCount})</span>
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm mt-2 flex-grow">{tool.description}</p>
                              <div className="mt-2 flex flex-col sm:flex-row sm:justify-between sm:items-end">
                                <div>
                                  <div className="flex items-center text-sm text-gray-600">
                                    <span className="mr-2">{tool.category}</span>
                                    <span>&bull;</span>
                                    <span className="ml-2">{tool.subcategory}</span>
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    <span>Location: {tool.location}</span>
                                  </div>
                                </div>
                                <div className="mt-4 sm:mt-0 flex items-center justify-between sm:justify-end sm:space-x-4">
                                  <div>
                                    <span className="text-2xl font-bold text-green-600">${tool.pricePerDay}</span>
                                    <span className="text-gray-600 text-sm">/day</span>
                                  </div>
                                  <button 
                                    className={`px-4 py-2 rounded-md ${tool.available 
                                      ? 'bg-green-600 text-white hover:bg-green-700' 
                                      : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                                    disabled={!tool.available}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (tool.available) {
                                        // Add rental logic here
                                        alert(`Renting ${tool.name}`);
                                      }
                                    }}
                                  >
                                    {tool.available ? 'Rent Now' : 'Not Available'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="mt-8 flex justify-center">
                        <nav className="flex items-center space-x-1">
                          <button 
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-md ${currentPage === 1 
                              ? 'text-gray-400 cursor-not-allowed' 
                              : 'text-gray-700 hover:bg-gray-200'}`}
                          >
                            <ChevronLeft size={20} />
                          </button>
                          
                          {[...Array(totalPages)].map((_, i) => {
                            const page = i + 1;
                            // Show current page, first and last pages, and pages adjacent to current page
                            if (
                              page === 1 || 
                              page === totalPages || 
                              (page >= currentPage - 1 && page <= currentPage + 1)
                            ) {
                              return (
                                <button
                                  key={page}
                                  onClick={() => handlePageChange(page)}
                                  className={`px-4 py-2 rounded-md ${currentPage === page
                                    ? 'bg-green-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-200'}`}
                                >
                                  {page}
                                </button>
                              );
                            } else if (
                              (page === currentPage - 2 && currentPage > 3) ||
                              (page === currentPage + 2 && currentPage < totalPages - 2)
                            ) {
                              return <span key={page} className="px-2">...</span>;
                            }
                            return null;
                          })}
                          
                          <button 
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-md ${currentPage === totalPages 
                              ? 'text-gray-400 cursor-not-allowed' 
                              : 'text-gray-700 hover:bg-gray-200'}`}
                          >
                            <ChevronRightIcon size={20} />
                          </button>
                        </nav>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-white rounded-lg shadow p-8 text-center">
                    <div className="text-gray-500 text-lg mb-4">No equipment found matching your search criteria</div>
                    <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                    <button 
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                      onClick={clearAllFilters}
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        // Tool Details View
        selectedTool && (
          <div className="container mx-auto px-4 py-8">
            <button 
              onClick={backToListings}
              className="mb-6 flex items-center text-green-700 hover:text-green-800 font-medium"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Equipment Listings
            </button>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  <div className="relative h-64 md:h-full">
                    <img src={selectedTool.image} alt={selectedTool.name} className="w-full h-full object-cover" />
                    {!selectedTool.available && (
                      <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 m-4 rounded-md text-sm font-medium">
                        Currently Unavailable
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="md:w-1/2 p-6">
                  <div className="flex justify-between items-start">
                    <h1 className="text-3xl font-bold text-gray-800">{selectedTool.name}</h1>
                    <div className="flex items-center bg-gray-100 px-3 py-1 rounded-md">
                      <Star size={18} className="text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-800 font-medium">{selectedTool.rating}</span>
                      <span className="ml-1 text-gray-600">({selectedTool.reviewCount} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center">
                    <span className="text-gray-600">Category:</span>
                    <span className="ml-2 bg-gray-100 px-2 py-1 rounded text-sm">{selectedTool.category}</span>
                    <span className="mx-2 text-gray-400">|</span>
                    <span className="text-gray-600">Type:</span>
                    <span className="ml-2 bg-gray-100 px-2 py-1 rounded text-sm">{selectedTool.subcategory}</span>
                  </div>
                  
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Description</h2>
                    <p className="text-gray-700">{selectedTool.description}</p>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-gray-700">Pickup Location: <span className="font-medium">{selectedTool.location}</span></span>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-green-600">${selectedTool.pricePerDay}</div>
                      <div className="text-gray-600">per day</div>
                    </div>
                    <button 
                      className={`px-8 py-3 rounded-md text-lg font-medium ${selectedTool.available 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                      disabled={!selectedTool.available}
                    >
                      {selectedTool.available ? 'Rent This Equipment' : 'Currently Unavailable'}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Equipment Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-lg mb-2">Specifications</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Power Source: Diesel Engine</li>
                      <li>• Operating Weight: 7,500 lbs</li>
                      <li>• Dimensions: 12' L x 6' W x 8' H</li>
                      <li>• Warranty: Included with rental</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-2">Rental Information</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• ID Required for Pickup</li>
                      <li>• Delivery Available (Additional Fee)</li>
                      <li>• Training Available</li>
                      <li>• 24-Hour Support Line</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Related Equipment</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Display 3 tools with the same category */}
                  {getSortedTools()
                    .filter(tool => tool.category === selectedTool.category && tool.id !== selectedTool.id)
                    .slice(0, 3)
                    .map(tool => (
                      <div 
                        key={tool.id} 
                        className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          viewToolDetails(tool.id);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <div className="flex items-center space-x-4">
                          <img src={tool.image} alt={tool.name} className="w-16 h-16 object-cover rounded" />
                          <div>
                            <h3 className="font-medium">{tool.name}</h3>
                            <div className="text-green-600 font-medium">${tool.pricePerDay}/day</div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}