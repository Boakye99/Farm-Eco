import { useState } from 'react';
import { Save, X, Upload, Plus, Minus } from 'lucide-react';

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: 'equipment',
    description: '',
    inStock: true,
    details: {
      manufacturer: '',
      capacity: '',
      dimensions: '',
      material: '',
      color: '',
      features: [''],
      assembly: '',
      rating: 5,
      reviews: 0
    }
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProduct(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setProduct(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const addFeature = () => {
    setProduct(prev => ({
      ...prev,
      details: {
        ...prev.details,
        features: [...prev.details.features, '']
      }
    }));
  };
  
  const removeFeature = (index) => {
    const newFeatures = [...product.details.features];
    newFeatures.splice(index, 1);
    setProduct(prev => ({
      ...prev,
      details: {
        ...prev.details,
        features: newFeatures
      }
    }));
  };
  
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...product.details.features];
    newFeatures[index] = value;
    setProduct(prev => ({
      ...prev,
      details: {
        ...prev.details,
        features: newFeatures
      }
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend API
    console.log('Product data to be submitted:', product);
    
    // Show success message
    setSuccessMessage('Product added successfully!');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
    
    // Reset form (optional)
    /*
    setProduct({
      name: '',
      price: '',
      category: 'equipment',
      description: '',
      inStock: true,
      details: {
        manufacturer: '',
        capacity: '',
        dimensions: '',
        material: '',
        color: '',
        features: [''],
        assembly: '',
        rating: 5,
        reviews: 0
      }
    });
    setImagePreview(null);
    */
  };
  
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Add New Product</h1>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
            >
              <X size={16} className="mr-2" />
              Cancel
            </button>
            <button
              form="product-form"
              type="submit"
              className="px-4 py-2 bg-green-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-green-700 flex items-center"
            >
              <Save size={16} className="mr-2" />
              Save Product
            </button>
          </div>
        </div>
        
        {successMessage && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {successMessage}
          </div>
        )}
        
        <form id="product-form" onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price (USD) *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={product.price}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                    min="0"
                    className="block w-full pl-7 pr-12 border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={product.category}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  <option value="equipment">Equipment</option>
                  <option value="seeds">Seeds</option>
                  <option value="fertilizer">Fertilizer</option>
                  <option value="tools">Tools</option>
                  <option value="irrigation">Irrigation</option>
                  <option value="pest-control">Pest Control</option>
                  <option value="harvest">Harvest</option>
                  <option value="storage">Storage</option>
                </select>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="inStock" className="block text-sm font-medium text-gray-700">
                    Availability
                  </label>
                </div>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      id="inStock"
                      name="inStock"
                      checked={product.inStock}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 h-4 w-4"
                    />
                    <span className="ml-2 text-sm text-gray-700">In Stock</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={product.description}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-40 w-40 border-2 border-dashed border-gray-300 rounded-md flex justify-center items-center bg-gray-50 mr-4">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover rounded-md" />
                  ) : (
                    <div className="text-center p-4">
                      <Upload className="mx-auto h-10 w-10 text-gray-400" />
                      <p className="mt-1 text-xs text-gray-500">Upload image</p>
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="mt-2 text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Product Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="details.manufacturer" className="block text-sm font-medium text-gray-700 mb-1">
                  Manufacturer
                </label>
                <input
                  type="text"
                  id="details.manufacturer"
                  name="details.manufacturer"
                  value={product.details.manufacturer}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="details.capacity" className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity
                </label>
                <input
                  type="text"
                  id="details.capacity"
                  name="details.capacity"
                  value={product.details.capacity}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="details.dimensions" className="block text-sm font-medium text-gray-700 mb-1">
                  Dimensions
                </label>
                <input
                  type="text"
                  id="details.dimensions"
                  name="details.dimensions"
                  value={product.details.dimensions}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="details.material" className="block text-sm font-medium text-gray-700 mb-1">
                  Material
                </label>
                <input
                  type="text"
                  id="details.material"
                  name="details.material"
                  value={product.details.material}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="details.color" className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <input
                  type="text"
                  id="details.color"
                  name="details.color"
                  value={product.details.color}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="details.assembly" className="block text-sm font-medium text-gray-700 mb-1">
                  Assembly Instructions
                </label>
                <input
                  type="text"
                  id="details.assembly"
                  name="details.assembly"
                  value={product.details.assembly}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="details.rating" className="block text-sm font-medium text-gray-700 mb-1">
                  Initial Rating (1-5)
                </label>
                <input
                  type="number"
                  id="details.rating"
                  name="details.rating"
                  value={product.details.rating}
                  onChange={handleInputChange}
                  min="1"
                  max="5"
                  step="0.1"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="details.reviews" className="block text-sm font-medium text-gray-700 mb-1">
                  Initial Reviews Count
                </label>
                <input
                  type="number"
                  id="details.reviews"
                  name="details.reviews"
                  value={product.details.reviews}
                  onChange={handleInputChange}
                  min="0"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Product Features
                </label>
                <button
                  type="button"
                  onClick={addFeature}
                  className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200"
                >
                  <Plus size={14} className="mr-1" />
                  Add Feature
                </button>
              </div>
              {product.details.features.map((feature, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-grow border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder={`Feature ${index + 1}`}
                  />
                  {product.details.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="ml-2 p-1 text-red-600 hover:text-red-800"
                    >
                      <Minus size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 text-right">
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-green-700"
              >
                Save Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}