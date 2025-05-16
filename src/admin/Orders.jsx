import { useState, useEffect } from 'react';
import { Clock, Package, Truck, Check, X, MapPin, ChevronLeft } from 'lucide-react';


const mockOrders = [
  {
    id: 'ORD-2023-001',
    customer: 'John Smith',
    items: [
      { name: 'Wireless Headphones', quantity: 1, price: 79.99 },
      { name: 'Phone Case', quantity: 2, price: 19.99 }
    ],
    total: 119.97,
    status: 'delivered',
    date: '2025-05-10T14:30:00',
    address: '123 Main St, New York, NY 10001',
    trackingNumber: 'TRK12345678'
  },
  {
    id: 'ORD-2023-002',
    customer: 'Sarah Johnson',
    items: [
      { name: 'Smart Watch', quantity: 1, price: 249.99 }
    ],
    total: 249.99,
    status: 'processing',
    date: '2025-05-14T09:15:00',
    address: '456 Elm St, Chicago, IL 60007',
    trackingNumber: null
  },
  {
    id: 'ORD-2023-003',
    customer: 'Michael Brown',
    items: [
      { name: 'Bluetooth Speaker', quantity: 1, price: 129.99 },
      { name: 'USB-C Cable', quantity: 3, price: 12.99 }
    ],
    total: 168.96,
    status: 'shipped',
    date: '2025-05-12T16:45:00',
    address: '789 Oak Dr, Los Angeles, CA 90001',
    trackingNumber: 'TRK87654321'
  },
  {
    id: 'ORD-2023-004',
    customer: 'Emily Davis',
    items: [
      { name: 'Laptop Stand', quantity: 1, price: 49.99 },
      { name: 'Wireless Mouse', quantity: 1, price: 29.99 },
      { name: 'Keyboard', quantity: 1, price: 59.99 }
    ],
    total: 139.97,
    status: 'pending',
    date: '2025-05-15T10:30:00',
    address: '321 Pine Rd, Seattle, WA 98101',
    trackingNumber: null
  }
];



const deliveryCoordinates = [
  { lat: 40.7128, lng: -74.006, timestamp: "2025-05-14T09:30:00", status: "Picked up from warehouse" },
  { lat: 40.7135, lng: -74.012, timestamp: "2025-05-14T10:45:00", status: "In transit" },
  { lat: 40.7142, lng: -74.018, timestamp: "2025-05-14T12:15:00", status: "Out for delivery" },
  { lat: 40.7150, lng: -74.022, timestamp: "2025-05-14T14:30:00", status: "Delivered" }
];

export default function Order() {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showMap, setShowMap] = useState(false);

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", icon: <Clock size={16} className="mr-1" /> },
      processing: { color: "bg-blue-100 text-blue-800", icon: <Package size={16} className="mr-1" /> },
      shipped: { color: "bg-purple-100 text-purple-800", icon: <Truck size={16} className="mr-1" /> }, 
      delivered: { color: "bg-green-100 text-green-800", icon: <Check size={16} className="mr-1" /> },
      cancelled: { color: "bg-red-100 text-red-800", icon: <X size={16} className="mr-1" /> }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Simple tracking map component
  const TrackingMap = ({ coordinates }) => {
    return (
      <div className="bg-gray-100 rounded-lg p-4 mt-4">
        <h3 className="text-lg font-medium mb-2">Delivery Tracking</h3>
        <div className="bg-white p-4 rounded-lg mb-4 h-64 flex items-center justify-center relative">
          <div className="text-center text-gray-500">
            {/* Map placeholder - In a real app, this would be replaced with an actual map component */}
            <div className="w-full h-48 bg-blue-50 rounded-lg flex items-center justify-center relative">
              <img src="/api/placeholder/400/320" alt="Map placeholder" className="rounded-lg" />
              
              {/* Simplified path representation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-blue-600 h-1 w-3/4 relative">
                  {coordinates.map((coord, index) => (
                    <div 
                      key={index} 
                      className="absolute top-0 w-3 h-3 bg-blue-600 rounded-full transform -translate-y-1" 
                      style={{ left: `${(index / (coordinates.length - 1)) * 100}%` }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-2 text-sm">Tracking visualization</p>
          </div>
        </div>
        
        {/* Tracking timeline */}
        <div className="space-y-3">
          {coordinates.map((point, index) => (
            <div key={index} className="flex items-start">
              <div className="mr-3 flex flex-col items-center">
                <div className={`w-2 h-2 rounded-full mt-1 ${index === coordinates.length - 1 ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                {index < coordinates.length - 1 && <div className="w-0.5 h-6 bg-gray-300"></div>}
              </div>
              <div>
                <p className="text-sm font-medium">{point.status}</p>
                <p className="text-xs text-gray-500">{new Date(point.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
        </div>

        {/* Main content area */}
        <div className="bg-white shadow rounded-lg">
          {selectedOrder ? (
            <div className="p-6">
              {/* Order detail view */}
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <ChevronLeft size={20} className="mr-1" />
                  Back to Orders
                </button>
                <StatusBadge status={selectedOrder.status} />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column: Order details */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4 text-gray-900">Order #{selectedOrder.id}</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Customer</p>
                        <p className="font-medium">{selectedOrder.customer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Order Date</p>
                        <p className="font-medium">{formatDate(selectedOrder.date)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Delivery Address</p>
                        <p className="font-medium">{selectedOrder.address}</p>
                      </div>
                      {selectedOrder.trackingNumber && (
                        <div>
                          <p className="text-sm text-gray-500">Tracking Number</p>
                          <p className="font-medium">{selectedOrder.trackingNumber}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Items</h3>
                    <div className="bg-gray-50 rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {selectedOrder.items.map((item, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.price.toFixed(2)}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${(item.quantity * item.price).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-gray-50">
                          <tr>
                            <td colSpan="3" className="px-6 py-4 text-right text-sm font-medium text-gray-900">Total</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${selectedOrder.total.toFixed(2)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                  
                  {/* Status update controls */}
                  <div>
                    <h3 className="text-lg font-medium mb-2">Update Status</h3>
                    <div className="flex flex-wrap gap-2">
                      {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
                        <button
                          key={status}
                          onClick={() => updateOrderStatus(selectedOrder.id, status)}
                          className={`px-4 py-2 rounded text-sm font-medium ${
                            selectedOrder.status === status
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Right column: Tracking information */}
                <div className="lg:col-span-1">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Delivery Status</h3>
                      <button
                        onClick={() => setShowMap(!showMap)}
                        className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        <MapPin size={16} className="mr-1" />
                        {showMap ? 'Hide Map' : 'Show Map'}
                      </button>
                    </div>
                    
                    {/* Show track map if shipping started and map is toggled on */}
                    {(showMap && ['shipped', 'delivered'].includes(selectedOrder.status)) && (
                      <TrackingMap coordinates={deliveryCoordinates} />
                    )}
                    
                    {/* Status history */}
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Status History</h4>
                      <div className="space-y-3">
                        {/* This would typically come from the order history */}
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium">Order Placed</p>
                            <p className="text-xs text-gray-500">{formatDate(selectedOrder.date)}</p>
                          </div>
                        </div>
                        
                        {selectedOrder.status !== 'pending' && (
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium">Processing Started</p>
                              <p className="text-xs text-gray-500">{formatDate(new Date(new Date(selectedOrder.date).getTime() + 3600000).toISOString())}</p>
                            </div>
                          </div>
                        )}
                        
                        {['shipped', 'delivered'].includes(selectedOrder.status) && (
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium">Shipped</p>
                              <p className="text-xs text-gray-500">{formatDate(new Date(new Date(selectedOrder.date).getTime() + 86400000).toISOString())}</p>
                            </div>
                          </div>
                        )}
                        
                        {selectedOrder.status === 'delivered' && (
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium">Delivered</p>
                              <p className="text-xs text-gray-500">{formatDate(new Date(new Date(selectedOrder.date).getTime() + 259200000).toISOString())}</p>
                            </div>
                          </div>
                        )}
                        
                        {selectedOrder.status === 'cancelled' && (
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium">Cancelled</p>
                              <p className="text-xs text-gray-500">{formatDate(new Date().toISOString())}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Orders list view */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr 
                        key={order.id} 
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.date)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            className="text-blue-600 hover:text-blue-900"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOrder(order);
                            }}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}