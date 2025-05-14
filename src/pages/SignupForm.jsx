import React, { useState } from 'react';
import {supabase} from '../lib/supabaseClient'
import { Eye, EyeOff, ArrowRight, ArrowLeft, Check, X } from 'lucide-react';


export default function SignUpForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  console.log(supabase)
  // Form states
  const [formData, setFormData] = useState({
    // Auth data
    email: '',
    password: '',
    confirmPassword: '',
    
    // User profile data
    firstName: '',
    lastName: '',
    displayName: '',
    phoneNumber: '',
    birthDate: '',
    
    // Address data
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    addressType: 'both',
    
    // Preferences
    marketingEmails: true,
    orderUpdates: true,
    newsletter: false
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    
    if (step < 4) {
      setStep(step + 1);
      setError(null);
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setError(null);
    }
  };
  
  const validateStep1 = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }
    
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    return true;
  };
  
  const validateStep2 = () => {
    if (!formData.firstName || !formData.lastName) {
      setError('First and last name are required');
      return false;
    }
    
    if (formData.phoneNumber && !formData.phoneNumber.match(/^\+?[0-9]{10,15}$/)) {
      setError('Please enter a valid phone number');
      return false;
    }
    
    return true;
  };
  
  const validateStep3 = () => {
    if (!formData.addressLine1 || !formData.city || !formData.state || !formData.postalCode || !formData.country) {
      setError('Address, city, state, postal code, and country are required');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // 1. Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      });
      
      if (authError) throw authError;
      
      const userId = authData.user.id;
      
      // 2. Create user profile
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert([
          {
            id: userId,
            first_name: formData.firstName,
            last_name: formData.lastName,
            display_name: formData.displayName || `${formData.firstName} ${formData.lastName}`,
            phone_number: formData.phoneNumber,
            birth_date: formData.birthDate || null,
          }
        ]);
      
      if (profileError) throw profileError;
      
      // 3. Create user address
      const { error: addressError } = await supabase
        .from('user_addresses')
        .insert([
          {
            user_id: userId,
            address_line1: formData.addressLine1,
            address_line2: formData.addressLine2 || null,
            city: formData.city,
            state: formData.state,
            postal_code: formData.postalCode,
            country: formData.country,
            is_default: true,
            address_type: formData.addressType,
          }
        ]);
      
      if (addressError) throw addressError;
      
      // 4. Create user preferences
      const { error: prefError } = await supabase
        .from('user_preferences')
        .insert([
          {
            user_id: userId,
            marketing_emails: formData.marketingEmails,
            order_updates: formData.orderUpdates,
            newsletter: formData.newsletter,
          }
        ]);
      
      if (prefError) throw prefError;
      
      setSuccess(true);
      setStep(5); // Move to success step
      
    } catch (error) {
      console.error('Error during sign up:', error);
      setError(error.message || 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };
  
  // Form steps
  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Create Your Account</h2>
      <p className="text-gray-600">Start by setting up your login credentials</p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="you@example.com"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="••••••••"
            />
            <button 
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="••••••••"
          />
        </div>
      </div>
    </div>
  );
  
  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
      <p className="text-gray-600">Tell us a bit about yourself</p>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        
        <div>
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">Display name <span className="text-gray-400">(optional)</span></label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="How you want to be addressed"
          />
        </div>
        
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone number <span className="text-gray-400">(optional)</span></label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        
        <div className="sm:col-span-2">
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Birth date <span className="text-gray-400">(optional)</span></label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
  
  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Your Address</h2>
      <p className="text-gray-600">Where should we send your orders?</p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">Address line 1</label>
          <input
            type="text"
            id="addressLine1"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Street address or P.O. box"
          />
        </div>
        
        <div>
          <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">Address line 2 <span className="text-gray-400">(optional)</span></label>
          <input
            type="text"
            id="addressLine2"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Apartment, suite, unit, building, floor, etc."
          />
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              {/* Add more countries as needed */}
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Address type</label>
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <input
                id="addressTypeBoth"
                name="addressType"
                type="radio"
                value="both"
                checked={formData.addressType === 'both'}
                onChange={handleChange}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="addressTypeBoth" className="ml-3 block text-sm font-medium text-gray-700">
                Shipping and Billing
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="addressTypeShipping"
                name="addressType"
                type="radio"
                value="shipping"
                checked={formData.addressType === 'shipping'}
                onChange={handleChange}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="addressTypeShipping" className="ml-3 block text-sm font-medium text-gray-700">
                Shipping only
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="addressTypeBilling"
                name="addressType"
                type="radio"
                value="billing"
                checked={formData.addressType === 'billing'}
                onChange={handleChange}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="addressTypeBilling" className="ml-3 block text-sm font-medium text-gray-700">
                Billing only
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Preferences</h2>
      <p className="text-gray-600">Tell us how you'd like to hear from us</p>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="marketingEmails"
              name="marketingEmails"
              type="checkbox"
              checked={formData.marketingEmails}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="marketingEmails" className="font-medium text-gray-700">Marketing emails</label>
            <p className="text-gray-500">Receive emails about new products, offers, and promotions</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="orderUpdates"
              name="orderUpdates"
              type="checkbox"
              checked={formData.orderUpdates}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="orderUpdates" className="font-medium text-gray-700">Order updates</label>
            <p className="text-gray-500">Receive notifications about your order status</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="newsletter"
              name="newsletter"
              type="checkbox"
              checked={formData.newsletter}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="newsletter" className="font-medium text-gray-700">Newsletter</label>
            <p className="text-gray-500">Receive our weekly newsletter with industry news and tips</p>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderSuccessStep = () => (
    <div className="text-center space-y-6">
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800">Account Created Successfully!</h2>
      <p className="text-gray-600">Thank you for signing up. We've sent you an email with a verification link.</p>
      <p className="text-gray-600">Please verify your email address to complete the registration process.</p>
      
      <button
        type="button"
        className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => window.location.href = '/login'}
      >
        Go to Login
      </button>
    </div>
  );
  
  const getStepContent = () => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderSuccessStep();
      default:
        return renderStep1();
    }
  };
  
  // Step indicator
  const renderStepIndicator = () => {
    const steps = [
      { number: 1, name: 'Account' },
      { number: 2, name: 'Profile' },
      { number: 3, name: 'Address' },
      { number: 4, name: 'Preferences' }
    ];
    
    return (
      <div className="py-4">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-between w-full">
            {steps.map((stepItem) => (
              <li key={stepItem.number} className={`relative ${stepItem.number !== 4 ? 'pr-8 sm:pr-20' : ''}`}>
                <div className="flex items-center">
                  <div
                    className={`${
                      step >= stepItem.number
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    } h-8 w-8 rounded-full flex items-center justify-center`}
                  >
                    {step > stepItem.number ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span>{stepItem.number}</span>
                    )}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      step >= stepItem.number ? 'text-indigo-600' : 'text-gray-500'
                    } hidden sm:inline-block`}
                  >
                    {stepItem.name}
                  </span>
                </div>
                {stepItem.number !== 4 && (
                  <div className="hidden sm:block absolute top-4 right-0 w-16 h-0.5 bg-gray-200">
                    <div
                      className={`h-0.5 ${
                        step > stepItem.number ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                      style={{ width: step > stepItem.number ? '100%' : '0%' }}
                    ></div>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      {step < 5 && renderStepIndicator()}
      
      <form onSubmit={handleSubmit} className="mt-4">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-sm text-red-600 rounded-md p-4 flex items-start">
            <X className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        {getStepContent()}
        
        <div className="mt-8 flex justify-between">
          {step > 1 && step < 5 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </button>
          )}
          
          {step < 5 && (
            step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="ml-auto flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
                {!loading && <Check className="h-4 w-4 ml-2" />}
              </button>
            )
          )}
        </div>
      </form>
    </div>
  );
}