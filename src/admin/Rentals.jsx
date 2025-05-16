import { useState, useEffect } from 'react';
import { Search, Calendar, Trash2, Edit, Filter, Download, Plus, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

// Mock data for rental items
const mockRentalItems = [
  {
    id: 1,
    name: "Tractor - John Deere 5E",
    category: "Heavy Machinery",
    rentalPrice: 250,
    rentalPeriod: "day",
    status: "rented",
    renter: "Green Fields Farm",
    startDate: "2025-05-10",
    endDate: "2025-05-17",
    thumbnail: "/api/placeholder/80/80",
    condition: "Excellent"
  },
  {
    id: 2,
    name: "Water Pump - 3HP",
    category: "Irrigation",
    rentalPrice: 45,
    rentalPeriod: "day",
    status: "available",
    renter: null,
    startDate: null,
    endDate: null,
    thumbnail: "/api/placeholder/80/80",
    condition: "Good"
  },
  {
    id: 3,
    name: "Harvester - Compact",
    category: "Heavy Machinery",
    rentalPrice: 320,
    rentalPeriod: "day",
    status: "maintenance",
    renter: null,
    startDate: null,
    endDate: null,
    thumbnail: "/api/placeholder/80/80",
    condition: "Under repair"
  },
  {
    id: 4,
    name: "Drone - Crop Monitoring",
    category: "Technology",
    rentalPrice: 75,
    rentalPeriod: "day",
    status: "rented",
    renter: "Riverside Organics",
    startDate: "2025-05-12",
    endDate: "2025-05-16",
    thumbnail: "/api/placeholder/80/80",
    condition: "Excellent"
  },
  {
    id: 5,
    name: "Soil Testing Kit - Professional",
    category: "Tools",
    rentalPrice: 35,
    rentalPeriod: "week",
    status: "rented",
    renter: "Happy Valley Farms",
    startDate: "2025-05-01",
    endDate: "2025-05-22",
    thumbnail: "/api/placeholder/80/80",
    condition: "Good"
  },
  {
    id: 6,
    name: "Seed Drill - Medium",
    category: "Planting",
    rentalPrice: 120,
    rentalPeriod: "day",
    status: "available",
    renter: null,
    startDate: null,
    endDate: null,
    thumbnail: "/api/placeholder/80/80",
    condition: "Good"
  }
];

// Status badge component
const StatusBadge = ({ status }) => {
  const getBgColor = () => {
    switch (status) {
      case 'rented': return 'bg-blue-100 text-blue-800';
      case 'available': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBgColor()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Header component
const Header = () => (
  <div className="mb-6">
    <h1 className="text-2xl font-bold text-gray-900">Equipment Rentals</h1>
    <p className="text-gray-600">Manage all rental equipment and track current status</p>
  </div>
);

// Stats overview component
const StatsOverview = ({ items }) => {
  // Calculate statistics
  const totalItems = items.length;
  const rentedItems = items.filter(item => item.status === 'rented').length;
  const availableItems = items.filter(item => item.status === 'available').length;
  const maintenanceItems = items.filter(item => item.status === 'maintenance').length;

  const stats = [
    { name: 'Total Equipment', value: totalItems, bgColor: 'bg-gray-100' },
    { name: 'Currently Rented', value: rentedItems, bgColor: 'bg-blue-100' },
    { name: 'Available', value: availableItems, bgColor: 'bg-green-100' },
    { name: 'In Maintenance', value: maintenanceItems, bgColor: 'bg-yellow-100' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className={`${stat.bgColor} rounded-lg p-4`}>
          <h3 className="text-lg font-medium text-gray-700">{stat.name}</h3>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

// Table filters and search component
const TableControls = ({ 
  searchTerm, 
  onSearchChange, 
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange
}) => {
  // Mock categories and statuses for filters
  const categories = ["All Categories", "Heavy Machinery", "Irrigation", "Tools", "Technology", "Planting"];
  const statuses = ["All Statuses", "rented", "available", "maintenance", "overdue"];

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
      <div className="relative flex-grow max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search equipment..."
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative">
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 pr-8 appearance-none bg-white"
            value={selectedCategory}
            onChange={onCategoryChange}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <Filter className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        <div className="relative">
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 pr-8 appearance-none bg-white"
            value={selectedStatus}
            onChange={onStatusChange}
          >
            {statuses.map((status, index) => (
              <option key={index} value={status}>
                {status === "All Statuses" 
                  ? status 
                  : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <Filter className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        <button className="bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
        
        <button className="bg-green-600 text-white rounded-lg px-4 py-2 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Item</span>
        </button>
      </div>
    </div>
  );
};

// Equipment table component
const EquipmentTable = ({ items }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Equipment
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rental Rate
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Renter
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rental Period
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Condition
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-md object-cover" src={item.thumbnail} alt={item.name} />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">ID: {item.id}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">${item.rentalPrice}/{item.rentalPeriod}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={item.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.renter || '-'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.startDate && item.endDate ? (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div className="text-sm text-gray-900">
                      {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">-</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.condition}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Pagination component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-between py-3 mt-4">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 border ${
                  page === currentPage
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-600 z-10'
                    : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                } text-sm font-medium`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

// Main Rentals Admin component
export default function RentalsAdmin() {
  const [rentalItems, setRentalItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(mockRentalItems.length / itemsPerPage);

  useEffect(() => {
    // Simulate API fetch with a slight delay
    const timer = setTimeout(() => {
      setRentalItems(mockRentalItems);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter items based on search and filters
  const filteredItems = rentalItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || 
                            item.category === selectedCategory;
    
    const matchesStatus = selectedStatus === 'All Statuses' || 
                          item.status === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Paginate items
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 max-w-full mx-auto bg-gray-50 min-h-screen">
      <Header />
      
      <StatsOverview items={rentalItems} />
      
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <TableControls 
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          selectedCategory={selectedCategory}
          onCategoryChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1); // Reset to first page on filter change
          }}
          selectedStatus={selectedStatus}
          onStatusChange={(e) => {
            setSelectedStatus(e.target.value);
            setCurrentPage(1); // Reset to first page on filter change
          }}
        />
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : filteredItems.length > 0 ? (
          <>
            <EquipmentTable items={paginatedItems} />
            <Pagination 
              currentPage={currentPage}
              totalPages={Math.max(1, Math.ceil(filteredItems.length / itemsPerPage))}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="py-12 text-center">
            <p className="text-gray-500 text-lg">No rental items match your search criteria.</p>
            <button 
              className="mt-4 text-indigo-600 hover:text-indigo-800"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All Categories');
                setSelectedStatus('All Statuses');
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}