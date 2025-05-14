import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import useCartStore from '../store/cartStore';
import { ChevronLeft, ChevronRight, CreditCard, Truck, Smartphone, Check, Info } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Get user from Supabase auth
  useEffect(() => {
    async function fetchUserAddress() {
      try {
        setLoading(true);
        
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error("Not authenticated");
        }
        
        // Fetch user's address
        const { data, error } = await supabase
          .from('user_addresses')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (error) throw error;
        
        setUserAddress(data);
      } catch (err) {
        console.error("Error fetching user address:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserAddress();
  }, []);

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handlePlaceOrder = async () => {
    try {
      setOrderProcessing(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Not authenticated");
      }
      
      // Create order in Supabase
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: totalPrice,
          payment_method: selectedPaymentMethod,
          status: selectedPaymentMethod === 'pay_later' ? 'pending' : 'processing',
          shipping_address: userAddress.id,
        })
        .select()
        .single();
        
      if (orderError) throw orderError;
      
      // Add order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      }));
      
      const { error: orderItemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
        
      if (orderItemsError) throw orderItemsError;
      
      // Successfully created order
      setOrderId(order.id);
      setOrderComplete(true);
      clearCart();
      
    } catch (err) {
      console.error("Error placing order:", err);
      setError("Failed to place order. Please try again.");
    } finally {
      setOrderProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">Loading checkout...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-red-50 p-6 rounded-lg max-w-md">
          <h2 className="text-red-800 text-xl font-bold mb-2">Error</h2>
          <p className="text-red-700">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
            onClick={() => window.location.href = '/'}
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Order Complete!</h2>
          <p className="text-center text-gray-600 mb-6">Your order #{orderId} has been placed successfully.</p>
          
          <div className="border-t border-b border-gray-200 py-4 my-4">
            <p className="text-gray-700 font-medium mb-1">Payment Method</p>
            <p className="text-gray-600">
              {selectedPaymentMethod === 'card' && 'Credit Card'}
              {selectedPaymentMethod === 'mobile_money' && 'Mobile Money'}
              {selectedPaymentMethod === 'pay_later' && 'Pay on Delivery'}
            </p>
            
            <div className="mt-4">
              <p className="text-gray-700 font-medium mb-1">Shipping Address</p>
              <p className="text-gray-600">{userAddress.full_name}</p>
              <p className="text-gray-600">{userAddress.street_address}</p>
              <p className="text-gray-600">{userAddress.city}, {userAddress.state} {userAddress.postal_code}</p>
              <p className="text-gray-600">{userAddress.country}</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-800 font-bold text-xl mb-6">Total: ${totalPrice.toFixed(2)}</p>
            <button 
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full"
              onClick={() => window.location.href = '/'}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Checkout Steps */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex justify-between items-center p-4">
            {[1, 2, 3, 4].map((step) => (
              <div 
                key={step} 
                className="flex flex-col items-center"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === step 
                    ? 'bg-blue-500 text-white'
                    : currentStep > step 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step ? <Check size={16} /> : step}
                </div>
                <span className="text-xs mt-2 font-medium text-gray-500">
                  {step === 1 && 'Cart'}
                  {step === 2 && 'Address'}
                  {step === 3 && 'Payment'}
                  {step === 4 && 'Confirm'}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left side - Checkout steps */}
          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Step 1 - Cart Review */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Review Your Cart</h2>
                  
                  {cartItems.length === 0 ? (
                    <p className="text-gray-500 py-6 text-center">Your cart is empty</p>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center border-b pb-4">
                          <div className="h-16 w-16 bg-gray-100 rounded flex items-center justify-center">
                            {item.image ? (
                              <img src="/api/placeholder/80/80" alt="Product" className="object-cover" />
                            ) : (
                              <div className="text-gray-400 text-xs text-center">No image</div>
                            )}
                          </div>
                          <div className="ml-4 flex-1">
                            <h3 className="font-medium text-gray-800">{item.name}</h3>
                            <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                          </div>
                          <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Step 2 - Shipping Address */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                  
                  {userAddress ? (
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
                      <h3 className="font-medium text-gray-800">{userAddress.full_name}</h3>
                      <p className="text-gray-600">{userAddress.street_address}</p>
                      <p className="text-gray-600">
                        {userAddress.city}, {userAddress.state} {userAddress.postal_code}
                      </p>
                      <p className="text-gray-600">{userAddress.country}</p>
                      <p className="text-gray-600 mt-2">Phone: {userAddress.phone}</p>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mb-4">
                      <div className="flex">
                        <Info size={20} className="text-yellow-500 mr-2" />
                        <p className="text-yellow-700">No shipping address found. Please add one before continuing.</p>
                      </div>
                    </div>
                  )}
                  
                  <button
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    onClick={() => window.location.href = '/account/addresses'}
                  >
                    {userAddress ? 'Change Address' : 'Add Address'}
                  </button>
                </div>
              )}
              
              {/* Step 3 - Payment Method */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                  
                  <div className="space-y-3">
                    <div 
                      className={`p-4 border rounded-md cursor-pointer ${
                        selectedPaymentMethod === 'card' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handlePaymentMethodSelect('card')}
                    >
                      <div className="flex items-center">
                        <CreditCard size={20} className="text-gray-600 mr-3" />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">Credit Card</h3>
                          <p className="text-sm text-gray-500">Pay with your credit or debit card</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border ${
                          selectedPaymentMethod === 'card' 
                            ? 'border-blue-500 bg-blue-500' 
                            : 'border-gray-300'
                        } flex items-center justify-center`}>
                          {selectedPaymentMethod === 'card' && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className={`p-4 border rounded-md cursor-pointer ${
                        selectedPaymentMethod === 'mobile_money' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handlePaymentMethodSelect('mobile_money')}
                    >
                      <div className="flex items-center">
                        <Smartphone size={20} className="text-gray-600 mr-3" />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">Mobile Money</h3>
                          <p className="text-sm text-gray-500">Pay with your mobile money account</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border ${
                          selectedPaymentMethod === 'mobile_money' 
                            ? 'border-blue-500 bg-blue-500' 
                            : 'border-gray-300'
                        } flex items-center justify-center`}>
                          {selectedPaymentMethod === 'mobile_money' && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className={`p-4 border rounded-md cursor-pointer ${
                        selectedPaymentMethod === 'pay_later' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handlePaymentMethodSelect('pay_later')}
                    >
                      <div className="flex items-center">
                        <Truck size={20} className="text-gray-600 mr-3" />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">Pay on Delivery</h3>
                          <p className="text-sm text-gray-500">Pay when your order is delivered</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border ${
                          selectedPaymentMethod === 'pay_later' 
                            ? 'border-blue-500 bg-blue-500' 
                            : 'border-gray-300'
                        } flex items-center justify-center`}>
                          {selectedPaymentMethod === 'pay_later' && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 4 - Order Summary */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Items ({totalItems})</h3>
                      <div className="space-y-2">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {item.name} × {item.quantity}
                            </span>
                            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-medium text-gray-700 mb-2">Shipping Address</h3>
                      <div className="text-sm text-gray-600">
                        <p>{userAddress.full_name}</p>
                        <p>{userAddress.street_address}</p>
                        <p>{userAddress.city}, {userAddress.state} {userAddress.postal_code}</p>
                        <p>{userAddress.country}</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-medium text-gray-700 mb-2">Payment Method</h3>
                      <div className="text-sm text-gray-600">
                        {selectedPaymentMethod === 'card' && (
                          <div className="flex items-center">
                            <CreditCard size={16} className="mr-2" />
                            <span>Credit Card</span>
                          </div>
                        )}
                        {selectedPaymentMethod === 'mobile_money' && (
                          <div className="flex items-center">
                            <Smartphone size={16} className="mr-2" />
                            <span>Mobile Money</span>
                          </div>
                        )}
                        {selectedPaymentMethod === 'pay_later' && (
                          <div className="flex items-center">
                            <Truck size={16} className="mr-2" />
                            <span>Pay on Delivery</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right side - Order summary */}
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">$0.00</span>
                </div>
              </div>
              
              <div className="border-t pt-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-bold">Total</span>
                  <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between">
                {currentStep > 1 && (
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
                    onClick={handlePreviousStep}
                    disabled={orderProcessing}
                  >
                    <ChevronLeft size={16} className="mr-1" />
                    Back
                  </button>
                )}
                
                {currentStep < 4 ? (
                  <button
                    className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center ml-auto ${
                      (currentStep === 2 && !userAddress) || (currentStep === 3 && !selectedPaymentMethod) 
                        ? 'opacity-50 cursor-not-allowed' 
                        : ''
                    }`}
                    onClick={handleNextStep}
                    disabled={(currentStep === 2 && !userAddress) || (currentStep === 3 && !selectedPaymentMethod)}
                  >
                    Next
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                ) : (
                  <button
                    className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex-1 ${
                      orderProcessing ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={handlePlaceOrder}
                    disabled={orderProcessing}
                  >
                    {orderProcessing ? 'Processing...' : 'Place Order'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}