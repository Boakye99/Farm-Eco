import { useState } from 'react';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Camera, 
  Tag, 
  Landmark, 
  FileText, 
  Star, 
  DollarSign, 
  Grid 
} from 'lucide-react';

export default function AddRental() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    image: "",
    rating: 0,
    reviewCount: 0,
    pricePerDay: 0,
    available: true,
    location: "",
    description: "",
  });
  
  const [preview, setPreview] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setPreview(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    // In a real app, you would send this data to your API
    console.log("Submitted rental item:", formData);
    alert("Rental item added successfully!");
    
    // Reset form
    setFormData({
      name: "",
      category: "",
      subcategory: "",
      image: "",
      rating: 0,
      reviewCount: 0,
      pricePerDay: 0,
      available: true,
      location: "",
      description: "",
    });
    setCurrentStep(1);
    setPreview(false);
  };

  const handleImageChange = (e) => {
    // In a real app, you would handle file upload
    // For now, we'll just use the URL directly
    setFormData(prev => ({
      ...prev,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNhcnLKeEcUCuQH61I6vuEk6nIoJzga0rJYg&s"
    }));
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step === currentStep 
                  ? "border-blue-500 bg-blue-500 text-white" 
                  : step < currentStep 
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-gray-300 text-gray-500"
              }`}
            >
              {step < currentStep ? <Check size={20} /> : step}
            </div>
            {step < 4 && (
              <div 
                className={`w-16 h-1 ${
                  step < currentStep ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderBasicInfo = () => {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Item Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g. Commercial Sprayer System"
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Category</option>
              <option value="Crop Care">Crop Care</option>
              <option value="Harvesting">Harvesting</option>
              <option value="Planting">Planting</option>
              <option value="Tillage">Tillage</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Subcategory</label>
            <input
              type="text"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleInputChange}
              placeholder="e.g. Sprayers"
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderImageDetails = () => {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Image & Location</h2>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <div className="flex items-center space-x-4">
            <div className="w-36 h-36 border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 rounded">
              {formData.image ? (
                <img 
                  src="/api/placeholder/400/320" 
                  alt="Equipment preview" 
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="text-center">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <span className="text-xs text-gray-500">Upload image</span>
                </div>
              )}
            </div>
            <div>
              <input
                type="file"
                id="image-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label
                htmlFor="image-upload"
                className="bg-white py-2 px-4 border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Select File
              </label>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="e.g. Temale Field Station"
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    );
  };

  const renderPricingReviews = () => {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Pricing & Reviews</h2>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Price Per Day ($)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <DollarSign size={16} className="text-gray-500" />
            </div>
            <input
              type="number"
              name="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleInputChange}
              placeholder="e.g. 130"
              className="w-full pl-10 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              min="0"
              step="0.01"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Rating (0-5)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Star size={16} className="text-gray-500" />
              </div>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                placeholder="e.g. 4.3"
                className="w-full pl-10 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                min="0"
                max="5"
                step="0.1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Review Count</label>
            <input
              type="number"
              name="reviewCount"
              value={formData.reviewCount}
              onChange={handleInputChange}
              placeholder="e.g. 54"
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              min="0"
            />
          </div>
        </div>
        
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id="available"
            name="available"
            checked={formData.available}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="available" className="ml-2 block text-sm text-gray-700">
            Available for rent
          </label>
        </div>
      </div>
    );
  };

  const renderDescription = () => {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Description</h2>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Detailed Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Provide a detailed description of the rental item..."
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 h-32"
          />
          <p className="text-xs text-gray-500">
            Include specifications, features, and usage instructions
          </p>
        </div>
      </div>
    );
  };

  const renderPreview = () => {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Review New Rental Item</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-4 rounded flex items-center justify-center h-48">
              {formData.image ? (
                <img 
                  src="/api/placeholder/400/320" 
                  alt={formData.name}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <Camera size={64} className="text-gray-400" />
              )}
            </div>
            
            <div className="md:col-span-2 flex flex-col space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{formData.name || "Unnamed Item"}</h3>
                <div className="flex items-center mt-1">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1 text-sm text-gray-600">
                    {formData.rating} ({formData.reviewCount} reviews)
                  </span>
                  <span className={`ml-4 px-2 py-1 text-xs font-semibold rounded ${formData.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {formData.available ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Tag size={16} className="mr-1" />
                  {formData.category || "No Category"} {formData.subcategory && `/ ${formData.subcategory}`}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Landmark size={16} className="mr-1" />
                  {formData.location || "No Location"}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign size={16} className="mr-1" />
                  ${formData.pricePerDay}/day
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700">Description</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {formData.description || "No description provided."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentStep = () => {
    if (preview) {
      return renderPreview();
    }
    
    switch (currentStep) {
      case 1:
        return renderBasicInfo();
      case 2:
        return renderImageDetails();
      case 3:
        return renderPricingReviews();
      case 4:
        return renderDescription();
      default:
        return null;
    }
  };

  const renderNavigationButtons = () => {
    return (
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 1 && !preview}
          className={`flex items-center px-4 py-2 border rounded ${
            currentStep === 1 && !preview
              ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          <ChevronLeft size={16} className="mr-1" />
          Back
        </button>
        
        {preview ? (
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setPreview(false)}
              className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50"
            >
              Edit Details
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 border border-transparent rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Add Item
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center px-4 py-2 border border-transparent rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            {currentStep === 4 ? "Preview" : "Next"}
            <ChevronRight size={16} className="ml-1" />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Add New Rental Item</h1>
            <p className="text-gray-600">Complete all information in steps</p>
          </div>
          
          {!preview && renderStepIndicator()}
          
          <div className="mt-6">
            {renderCurrentStep()}
            {renderNavigationButtons()}
          </div>
        </div>
      </div>
    </div>
  );
}