import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProductStore from '../store/productStore';

const ProductDetails = () => {
  // Use useParams to get the product id from the URL
  const { id } = useParams();
  const productId = id;
  
  // Get all necessary functions from the store at the top level
  const getProductById = useProductStore((state) => state.getProductById);
  const getProductsByCategory = useProductStore((state) => state.getProductsByCategory);
  
  // Component state
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add console logging to debug
    console.log("Product ID from params:", productId);
    
    // Fetch product based on ID from URL params
    const foundProduct = getProductById(productId);
    console.log("Found product:", foundProduct);
    
    setProduct(foundProduct);
    
    // Get related products if we have a product
    if (foundProduct) {
      const related = getProductsByCategory(foundProduct.category)
        .filter(p => p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
    
    setIsLoading(false);
  }, [getProductById, getProductsByCategory, productId]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">Loading product...</h2>
        </div>
      </div>
    );
  }

  // Show not found state if product doesn't exist
  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">Product not found</h2>
          <p className="mt-2 text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="mt-4 inline-block px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} ${product.name}(s) to cart`);
    // Here you would typically dispatch to a cart store
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6 text-sm">
        <Link to="/" className="text-gray-600 hover:text-green-600">Home</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to="/products" className="text-gray-600 hover:text-green-600">Products</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to={`/products?category=${product.category}`} className="text-gray-600 hover:text-green-600 capitalize">
          {product.category}
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-800 font-medium">{product.name}</span>
      </div>

      {/* Product Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Product Image */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-contain rounded-md"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.floor(product.details.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">{product.details.rating} ({product.details.reviews} reviews)</span>
            </div>
          </div>

          <p className="text-2xl font-bold text-green-600 mb-4">${product.price.toFixed(2)}</p>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="mb-6">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {product.inStock && (
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-24">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium transition duration-150 ease-in-out"
              >
                Add to Cart
              </button>
            </div>
          )}

          {/* Quick Specs */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-semibold mb-2">Quick Specifications</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
              <li className="flex items-start">
                <span className="font-medium text-gray-600 mr-2">Manufacturer:</span>
                <span>{product.details.manufacturer}</span>
              </li>
              {product.details.weight && (
                <li className="flex items-start">
                  <span className="font-medium text-gray-600 mr-2">Weight:</span>
                  <span>{product.details.weight}</span>
                </li>
              )}
              {product.details.material && (
                <li className="flex items-start">
                  <span className="font-medium text-gray-600 mr-2">Material:</span>
                  <span>{product.details.material}</span>
                </li>
              )}
              {product.details.warranty && (
                <li className="flex items-start">
                  <span className="font-medium text-gray-600 mr-2">Warranty:</span>
                  <span>{product.details.warranty}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <div className="mb-12">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-1 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'description'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`px-1 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'specifications'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`px-1 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'features'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Features
            </button>
          </nav>
        </div>

        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-700">{product.description}</p>
              {product.details.usage && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold mb-2">Usage</h4>
                  <p className="text-gray-700">{product.details.usage}</p>
                </div>
              )}
              {product.details.benefits && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold mb-2">Benefits</h4>
                  <ul className="list-disc pl-5 text-gray-700">
                    {product.details.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.details)
                .filter(([key]) => !['features', 'benefits', 'rating', 'reviews'].includes(key))
                .map(([key, value]) => (
                  <div key={key} className="border-b border-gray-200 pb-4">
                    <h4 className="text-sm font-medium text-gray-500 capitalize mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                    <p className="text-gray-900">
                      {Array.isArray(value) ? value.join(', ') : String(value)}
                    </p>
                  </div>
                ))}
            </div>
          )}

          {activeTab === 'features' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Key Features</h3>
              <ul className="space-y-4">
                {product.details.features?.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <Link to={`/products/${relatedProduct.id}`} key={relatedProduct.id} className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                <img 
                  src={relatedProduct.image} 
                  alt={relatedProduct.name} 
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-green-600">{relatedProduct.name}</h3>
                  <p className="mt-1 text-green-600 font-semibold">${relatedProduct.price.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;