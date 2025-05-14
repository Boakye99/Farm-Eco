import useCartStore from "../store/cartStore";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight, ChevronLeft } from "lucide-react";

const Cart = () => {
  const {
    cartItems,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
  } = useCartStore();

  // Calculate shipping cost (free if order is above $50)
  const shippingCost = totalPrice() >= 50 ? 0 : 4.99;
  
  // Calculate final total
  const finalTotal = totalPrice() + shippingCost;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb navigation */}
        <div className="mb-8">
          <Link to="/" className="text-gray-500 hover:text-gray-700 flex items-center text-sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Continue shopping
          </Link>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <span className="text-gray-500">
            {totalItems()} {totalItems() === 1 ? "item" : "items"}
          </span>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 p-4 rounded-full">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. Find something you'll love in our product collection.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center bg-[#1CA9C9] text-white px-8 py-3 rounded-lg hover:bg-[#178BA8] transition-all shadow-md hover:shadow-lg"
            >
              Browse Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-200">
                  <div className="hidden md:flex justify-between px-6 py-4 bg-gray-50">
                    <span className="text-sm font-medium text-gray-500">Product</span>
                    <div className="flex space-x-8 md:space-x-16">
                      <span className="text-sm font-medium text-gray-500">Quantity</span>
                      <span className="text-sm font-medium text-gray-500">Price</span>
                    </div>
                  </div>

                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-6 flex flex-col md:flex-row md:items-center"
                    >
                      <div className="flex flex-1 items-center">
                        <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="mt-1 text-sm text-gray-500 md:hidden">
                            ${item.price}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 md:mt-0 flex justify-between md:justify-end items-center md:space-x-8 lg:space-x-16">
                        {/* Quantity selector */}
                        <div className="flex items-center border border-gray-200 rounded-lg max-w-[120px]">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="flex-1 flex justify-center items-center h-10 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <div className="flex-1 h-10 flex items-center justify-center text-center text-gray-700 bg-white">
                            {item.quantity}
                          </div>
                          <button
                            onClick={() => addToCart(item)}
                            className="flex-1 flex justify-center items-center h-10 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right min-w-[80px]">
                          <p className="hidden md:block font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${totalPrice().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  
                  {shippingCost > 0 && (
                    <div className="text-xs text-gray-500 italic">
                      Free shipping on orders over $50
                    </div>
                  )}
                  
                  <div className="h-px bg-gray-200 my-4"></div>
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <Link 
                  to="/checkout"
                  className="w-full mt-6 bg-[#1CA9C9] text-white py-3 px-4 rounded-xl font-medium hover:bg-[#178BA8] transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    We accept all major credit cards and PayPal
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;