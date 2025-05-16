import { useState, useEffect } from "react";
import useRentalStore from "../store/rentalStore";
import { useParams, useNavigate } from "react-router-dom";

const RentalConfirmationPage = () => {
  const { toolId } = useParams();
  const navigate = useNavigate();
  
  // Use the store's function to get the selected tool by ID
  const { viewToolDetails, getSelectedTool } = useRentalStore(state => ({
    viewToolDetails: state.viewToolDetails,
    getSelectedTool: state.getSelectedTool
  }));
  
  // Set the selected tool ID when component mounts
  useEffect(() => {
    if (toolId) {
      viewToolDetails(Number(toolId));
    }
  }, [toolId, viewToolDetails]);
  
  // Get the selected tool using the store's getter
  const selectedTool = getSelectedTool();
  
  const [rentalDetails, setRentalDetails] = useState({
    startDate: "",
    endDate: "",
    quantity: 1,
    deliveryOption: "pickup",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    specialInstructions: "",
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Calculate rental duration in days
  const calculateDuration = () => {
    if (!rentalDetails.startDate || !rentalDetails.endDate) return 0;
    const start = new Date(rentalDetails.startDate);
    const end = new Date(rentalDetails.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1; // Minimum 1 day
  };
  
  // Calculate total cost
  const calculateTotalCost = () => {
    const duration = calculateDuration();
    const deliveryFee = rentalDetails.deliveryOption === "delivery" ? 50 : 0;
    return (selectedTool?.pricePerDay * duration * rentalDetails.quantity) + deliveryFee;
  };
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRentalDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  
  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!rentalDetails.startDate) newErrors.startDate = "Start date is required";
    if (!rentalDetails.endDate) newErrors.endDate = "End date is required";
    if (new Date(rentalDetails.startDate) > new Date(rentalDetails.endDate)) {
      newErrors.endDate = "End date must be after start date";
    }
    if (!rentalDetails.contactName) newErrors.contactName = "Name is required";
    if (!rentalDetails.contactPhone) newErrors.contactPhone = "Phone number is required";
    if (!rentalDetails.contactEmail) newErrors.contactEmail = "Email is required";
    if (rentalDetails.contactEmail && !/\S+@\S+\.\S+/.test(rentalDetails.contactEmail)) {
      newErrors.contactEmail = "Email is invalid";
    }
    
    return newErrors;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmation(true);
    }, 1500);
  };
  
  // If tool doesn't exist, show error
  if (!selectedTool) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Tool Not Found</h2>
          <p className="text-gray-600 mb-6">
            The requested tool could not be found. Please try again or browse our available tools.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md transition duration-200"
          >
            Browse Tools
          </button>
        </div>
      </div>
    );
  }
  
  // Show confirmation message after successful submission
  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your rental of {selectedTool.name} has been confirmed. We'll contact you soon with more details.
          </p>
          <div className="bg-gray-50 p-4 rounded-md mb-6 text-left">
            <h3 className="font-semibold text-gray-700 mb-2">Rental Summary:</h3>
            <p className="text-sm text-gray-600">Rental Period: {rentalDetails.startDate} to {rentalDetails.endDate}</p>
            <p className="text-sm text-gray-600">Duration: {calculateDuration()} days</p>
            <p className="text-sm text-gray-600">Quantity: {rentalDetails.quantity}</p>
            <p className="text-sm text-gray-600">Delivery: {rentalDetails.deliveryOption === "delivery" ? "Delivery to your location" : "Pickup from our facility"}</p>
            <p className="text-sm font-medium text-gray-800 mt-2">Total Cost: GH₵ {calculateTotalCost().toFixed(2)}</p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md transition duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Complete Your Rental</h1>
          <p className="mt-2 text-lg text-gray-600">You're just a few steps away from renting your farm equipment</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Tool Information */}
            <div className="md:w-1/3 bg-gray-50 p-6">
              <div className="rounded-lg overflow-hidden mb-4">
                <img 
                  src={selectedTool.image} 
                  alt={selectedTool.name} 
                  className="w-full h-64 object-cover"
                />
              </div>
              <h2 className="text-xl font-bold text-gray-800">{selectedTool.name}</h2>
              <div className="flex items-center mt-1 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(selectedTool.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-1">({selectedTool.reviewCount} reviews)</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{selectedTool.description}</p>
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <p className="flex justify-between">
                  <span className="text-gray-600">Daily Rate:</span>
                  <span className="font-semibold">GH₵ {selectedTool.pricePerDay.toFixed(2)}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-semibold">{selectedTool.location}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Availability:</span>
                  <span className={`font-semibold ${selectedTool.available ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedTool.available ? 'In Stock' : 'Currently Unavailable'}
                  </span>
                </p>
              </div>
            </div>
            
            {/* Rental Form */}
            <div className="md:w-2/3 p-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Rental Period */}
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Rental Period</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <input
                          type="date"
                          id="startDate"
                          name="startDate"
                          min={new Date().toISOString().split('T')[0]}
                          className={`w-full py-2 px-3 border ${errors.startDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                          value={rentalDetails.startDate}
                          onChange={handleChange}
                        />
                        {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
                      </div>
                      <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <input
                          type="date"
                          id="endDate"
                          name="endDate"
                          min={rentalDetails.startDate || new Date().toISOString().split('T')[0]}
                          className={`w-full py-2 px-3 border ${errors.endDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                          value={rentalDetails.endDate}
                          onChange={handleChange}
                        />
                        {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}
                      </div>
                    </div>
                  </div>
                  
                  {/* Quantity and Delivery Options */}
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <select
                      id="quantity"
                      name="quantity"
                      className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={rentalDetails.quantity}
                      onChange={handleChange}
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="deliveryOption" className="block text-sm font-medium text-gray-700 mb-1">Delivery Option</label>
                    <select
                      id="deliveryOption"
                      name="deliveryOption"
                      className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={rentalDetails.deliveryOption}
                      onChange={handleChange}
                    >
                      <option value="pickup">Pickup from location</option>
                      <option value="delivery">Delivery to my address (+GH₵ 50)</option>
                    </select>
                  </div>
                  
                  {/* Contact Information */}
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          id="contactName"
                          name="contactName"
                          className={`w-full py-2 px-3 border ${errors.contactName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                          placeholder="Your full name"
                          value={rentalDetails.contactName}
                          onChange={handleChange}
                        />
                        {errors.contactName && <p className="mt-1 text-sm text-red-600">{errors.contactName}</p>}
                      </div>
                      <div>
                        <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          id="contactPhone"
                          name="contactPhone"
                          className={`w-full py-2 px-3 border ${errors.contactPhone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                          placeholder="e.g., 024-123-4567"
                          value={rentalDetails.contactPhone}
                          onChange={handleChange}
                        />
                        {errors.contactPhone && <p className="mt-1 text-sm text-red-600">{errors.contactPhone}</p>}
                      </div>
                    </div>
                    <div className="mt-4">
                      <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
                        className={`w-full py-2 px-3 border ${errors.contactEmail ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                        placeholder="your@email.com"
                        value={rentalDetails.contactEmail}
                        onChange={handleChange}
                      />
                      {errors.contactEmail && <p className="mt-1 text-sm text-red-600">{errors.contactEmail}</p>}
                    </div>
                  </div>
                  
                  {/* Special Instructions */}
                  <div className="md:col-span-2">
                    <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">Special Instructions (Optional)</label>
                    <textarea
                      id="specialInstructions"
                      name="specialInstructions"
                      rows="3"
                      className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Any special requirements or notes"
                      value={rentalDetails.specialInstructions}
                      onChange={handleChange}
                    />
                  </div>
                  
                  {/* Rental Summary */}
                  <div className="md:col-span-2">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Rental Summary</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Tool:</span>
                          <span className="font-medium">{selectedTool.name}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Daily Rate:</span>
                          <span className="font-medium">GH₵ {selectedTool.pricePerDay.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{calculateDuration()} days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Quantity:</span>
                          <span className="font-medium">{rentalDetails.quantity}</span>
                        </div>
                        {rentalDetails.deliveryOption === "delivery" && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Delivery Fee:</span>
                            <span className="font-medium">GH₵ 50.00</span>
                          </div>
                        )}
                        <div className="border-t border-gray-300 pt-2 mt-2">
                          <div className="flex justify-between">
                            <span className="font-semibold">Total:</span>
                            <span className="font-bold text-green-600">GH₵ {calculateTotalCost().toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md transition duration-200 flex items-center justify-center"
                    disabled={isSubmitting || !selectedTool.available}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : !selectedTool.available ? (
                      "Currently Unavailable"
                    ) : (
                      "Confirm Rental"
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="w-full mt-4 bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-md transition duration-200 hover:bg-gray-50"
                  >
                    Cancel and Return to Listings
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalConfirmationPage;