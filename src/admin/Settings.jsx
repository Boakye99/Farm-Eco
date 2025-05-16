import { useState } from "react";
import { 
  Save, 
  Bell, 
  Users, 
  ShieldCheck, 
  CreditCard, 
  Package, 
  Mail, 
  Globe, 
  Image, 
  ChevronRight,
  Info
} from "lucide-react";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);
  
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Settings</h1>
        </div>
        
        <nav className="mt-4">
          <SettingsNavItem 
            title="General Settings" 
            icon={<Globe size={18} />} 
            active={activeTab === "general"} 
            onClick={() => setActiveTab("general")} 
          />
          <SettingsNavItem 
            title="User Management" 
            icon={<Users size={18} />} 
            active={activeTab === "users"} 
            onClick={() => setActiveTab("users")} 
          />
          <SettingsNavItem 
            title="Security" 
            icon={<ShieldCheck size={18} />} 
            active={activeTab === "security"} 
            onClick={() => setActiveTab("security")} 
          />
          <SettingsNavItem 
            title="Payment Methods" 
            icon={<CreditCard size={18} />} 
            active={activeTab === "payment"} 
            onClick={() => setActiveTab("payment")} 
          />
          <SettingsNavItem 
            title="Shipping Options" 
            icon={<Package size={18} />} 
            active={activeTab === "shipping"} 
            onClick={() => setActiveTab("shipping")} 
          />
          <SettingsNavItem 
            title="Email Templates" 
            icon={<Mail size={18} />} 
            active={activeTab === "email"} 
            onClick={() => setActiveTab("email")} 
          />
          <SettingsNavItem 
            title="Store Appearance" 
            icon={<Image size={18} />} 
            active={activeTab === "appearance"} 
            onClick={() => setActiveTab("appearance")} 
          />
          <SettingsNavItem 
            title="Notifications" 
            icon={<Bell size={18} />} 
            active={activeTab === "notifications"} 
            onClick={() => setActiveTab("notifications")} 
          />
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === "general" && <GeneralSettings />}
          {activeTab === "users" && <UserManagement />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "payment" && <PaymentSettings />}
          {activeTab === "shipping" && <ShippingSettings />}
          {activeTab === "email" && <EmailSettings />}
          {activeTab === "appearance" && <AppearanceSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          
          <div className="mt-8 pt-4 border-t flex justify-end">
            <button 
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={handleSave}
            >
              <Save className="mr-2" size={18} />
              Save Changes
            </button>
          </div>
          
          {saved && (
            <div className="fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md flex items-center">
              <Info size={20} className="mr-2 text-green-500" />
              Settings saved successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SettingsNavItem({ title, icon, active, onClick }) {
  return (
    <button 
      className={`flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors ${active ? "bg-blue-50 text-blue-600 font-medium border-r-4 border-blue-600" : "text-gray-700"}`}
      onClick={onClick}
    >
      <span className="flex items-center">
        <span className="mr-3">{icon}</span>
        {title}
      </span>
      <ChevronRight size={16} className={active ? "text-blue-600" : "text-gray-400"} />
    </button>
  );
}

function GeneralSettings() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">General Settings</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            defaultValue="My Awesome Store"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Store URL</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            defaultValue="https://myawesomestore.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Store Description</label>
          <textarea 
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24" 
            defaultValue="Your one-stop shop for amazing products."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
          <select className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="AUD">AUD - Australian Dollar</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
          <select className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="UTC">UTC</option>
            <option value="EST">Eastern Standard Time (EST)</option>
            <option value="CST">Central Standard Time (CST)</option>
            <option value="MST">Mountain Standard Time (MST)</option>
            <option value="PST">Pacific Standard Time (PST)</option>
          </select>
        </div>
        
        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="maintenance" 
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            defaultChecked={false}
          />
          <label htmlFor="maintenance" className="ml-2 block text-sm text-gray-700">
            Enable Maintenance Mode
          </label>
        </div>
      </div>
    </div>
  );
}

function UserManagement() {
  const users = [
    { id: 1, name: "John Smith", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Sarah Johnson", email: "sarah@example.com", role: "Manager", status: "Active" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", role: "Editor", status: "Inactive" },
  ];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">User Management</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Add New User
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id}>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-4 space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Security Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Password Policy</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="min-length" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked={true}
              />
              <label htmlFor="min-length" className="ml-2 block text-sm text-gray-700">
                Require minimum password length of 8 characters
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="uppercase" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked={true}
              />
              <label htmlFor="uppercase" className="ml-2 block text-sm text-gray-700">
                Require at least one uppercase letter
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="number" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked={true}
              />
              <label htmlFor="number" className="ml-2 block text-sm text-gray-700">
                Require at least one number
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="special" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked={false}
              />
              <label htmlFor="special" className="ml-2 block text-sm text-gray-700">
                Require at least one special character
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Two-Factor Authentication</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="require-2fa" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked={false}
              />
              <label htmlFor="require-2fa" className="ml-2 block text-sm text-gray-700">
                Require two-factor authentication for all admin users
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Session Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Session timeout (minutes)
              </label>
              <input 
                type="number" 
                className="w-32 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                defaultValue="30"
                min="5"
                max="240"
              />
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="force-logout" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked={true}
              />
              <label htmlFor="force-logout" className="ml-2 block text-sm text-gray-700">
                Force logout after password change
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentSettings() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Payment Settings</h2>
      
      <div className="space-y-8">
        <div className="border rounded-md p-4">
          <div className="flex items-center mb-4">
            <input 
              type="checkbox" 
              id="stripe" 
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              defaultChecked={true}
            />
            <label htmlFor="stripe" className="ml-2 block text-md font-medium text-gray-700">
              Stripe
            </label>
          </div>
          
          <div className="pl-6 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
              <input 
                type="password" 
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                defaultValue="sk_test_********************************************"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Webhook Secret</label>
              <input 
                type="password" 
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                defaultValue="whsec_********************************************"
              />
            </div>
          </div>
        </div>
        
        <div className="border rounded-md p-4">
          <div className="flex items-center mb-4">
            <input 
              type="checkbox" 
              id="paypal" 
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              defaultChecked={false}
            />
            <label htmlFor="paypal" className="ml-2 block text-md font-medium text-gray-700">
              PayPal
            </label>
          </div>
          
          <div className="pl-6 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client ID</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Enter PayPal client ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Secret</label>
              <input 
                type="password" 
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Enter PayPal client secret"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">General Payment Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Currency</label>
              <select className="w-64 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="AUD">AUD - Australian Dollar</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="test-mode" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked={true}
              />
              <label htmlFor="test-mode" className="ml-2 block text-sm text-gray-700">
                Enable test mode for all payment gateways
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShippingSettings() {
  const shippingMethods = [
    { id: 1, name: "Standard Shipping", price: 5.99, estimated: "3-5 days", enabled: true },
    { id: 2, name: "Express Shipping", price: 15.99, estimated: "1-2 days", enabled: true },
    { id: 3, name: "Free Shipping", price: 0, estimated: "5-7 days", enabled: false }
  ];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Shipping Settings</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Add Shipping Method
        </button>
      </div>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-3">Shipping Methods</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method Name</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Delivery</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {shippingMethods.map(method => (
                  <tr key={method.id}>
                    <td className="py-3 px-4">{method.name}</td>
                    <td className="py-3 px-4">${method.price.toFixed(2)}</td>
                    <td className="py-3 px-4">{method.estimated}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        method.enabled ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}>
                        {method.enabled ? "Enabled" : "Disabled"}
                      </span>
                    </td>
                    <td className="py-3 px-4 space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Shipping Zones</h3>
          <div className="border rounded-md p-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Shipping Zone</label>
              <select className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="worldwide">Worldwide</option>
                <option value="domestic">Domestic Only</option>
                <option value="custom">Custom Zones</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="free-shipping" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked={false}
              />
              <label htmlFor="free-shipping" className="ml-2 block text-sm text-gray-700">
                Enable free shipping for orders over
              </label>
              <input 
                type="number" 
                className="ml-2 w-24 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                defaultValue="100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmailSettings() {
  const templates = [
    { id: 1, name: "Order Confirmation", subject: "Your order has been confirmed", lastUpdated: "2025-02-15" },
    { id: 2, name: "Shipping Confirmation", subject: "Your order has been shipped", lastUpdated: "2025-02-15" },
    { id: 3, name: "Password Reset", subject: "Reset your password", lastUpdated: "2025-01-10" },
    { id: 4, name: "Welcome Email", subject: "Welcome to Our Store", lastUpdated: "2025-01-05" },
  ];
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Email Settings</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-3">SMTP Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Host</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                defaultValue="smtp.example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Port</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                defaultValue="587"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                defaultValue="notifications@mystore.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                defaultValue="************"
              />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <input 
              type="checkbox" 
              id="use-ssl" 
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              defaultChecked={true}
            />
            <label htmlFor="use-ssl" className="ml-2 block text-sm text-gray-700">
              Use SSL/TLS encryption
            </label>
          </div>
          <div className="mt-4">
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
              Test Connection
            </button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Email Templates</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template Name</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {templates.map(template => (
                  <tr key={template.id}>
                    <td className="py-3 px-4">{template.name}</td>
                    <td className="py-3 px-4">{template.subject}</td>
                    <td className="py-3 px-4">{template.lastUpdated}</td>
                    <td className="py-3 px-4 space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button className="text-indigo-600 hover:text-indigo-900">Preview</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Default Sender Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Name</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                defaultValue="My Awesome Store"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Email</label>
              <input 
                type="email" 
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                defaultValue="notifications@mystore.com"
              />
            </div>
            <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Reply-To Email</label>
              <input 
                type="email" 
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                defaultValue="support@mystore.com"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppearanceSettings() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Store Appearance</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-3">Theme Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-md p-4 hover:shadow-lg transition-shadow cursor-pointer bg-white">
              <div className="bg-blue-600 h-32 rounded-md mb-3"></div>
              <div className="text-center">
                <span className="font-medium">Modern (Default)</span>
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
              </div>
            </div>
            <div className="border rounded-md p-4 hover:shadow-lg transition-shadow cursor-pointer bg-white">
              <div className="bg-gray-800 h-32 rounded-md mb-3"></div>
              <div className="text-center">
                <span className="font-medium">Dark Mode</span>
              </div>
            </div>
            <div className="border rounded-md p-4 hover:shadow-lg transition-shadow cursor-pointer bg-white">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-32 rounded-md mb-3"></div>
              <div className="text-center">
                <span className="font-medium">Vibrant</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Logo & Branding</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Logo</label>
              <div className="mt-1 flex items-center">
                <div className="h-16 w-16 rounded border overflow-hidden bg-gray-100 flex items-center justify-center">
                  <Image size={32} className="text-gray-400" />
                </div>
                <button className="ml-4 px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                  Upload
                </button>
                <button className="ml-2 px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                  Remove
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Favicon</label>
              <div className="mt-1 flex items-center">
                <div className="h-10 w-10 rounded border overflow-hidden bg-gray-100 flex items-center justify-center">
                  <Image size={16} className="text-gray-400" />
                </div>
                <button className="ml-4 px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                  Upload
                </button>
                <button className="ml-2 px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Custom Colors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
              <div className="flex items-center">
                <input 
                  type="color" 
                  className="h-10 w-16 p-1 border rounded-md cursor-pointer"
                  defaultValue="#3B82F6"
                />
                <input 
                  type="text" 
                  className="ml-2 w-32 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  defaultValue="#3B82F6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color</label>
              <div className="flex items-center">
                <input 
                  type="color" 
                  className="h-10 w-16 p-1 border rounded-md cursor-pointer"
                  defaultValue="#6B7280"
                />
                <input 
                  type="text" 
                  className="ml-2 w-32 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  defaultValue="#6B7280"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Accent Color</label>
              <div className="flex items-center">
                <input 
                  type="color" 
                  className="h-10 w-16 p-1 border rounded-md cursor-pointer"
                  defaultValue="#10B981"
                />
                <input 
                  type="text" 
                  className="ml-2 w-32 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  defaultValue="#10B981"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
              <div className="flex items-center">
                <input 
                  type="color" 
                  className="h-10 w-16 p-1 border rounded-md cursor-pointer"
                  defaultValue="#F3F4F6"
                />
                <input 
                  type="text" 
                  className="ml-2 w-32 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  defaultValue="#F3F4F6"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Typography</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading Font</label>
              <select className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="system">System Default</option>
                <option value="inter">Inter</option>
                <option value="roboto">Roboto</option>
                <option value="merriweather">Merriweather</option>
                <option value="playfair">Playfair Display</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Body Font</label>
              <select className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="system">System Default</option>
                <option value="inter">Inter</option>
                <option value="roboto">Roboto</option>
                <option value="open-sans">Open Sans</option>
                <option value="lato">Lato</option>
              </select>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Custom CSS</h3>
          <div>
            <textarea 
              className="w-full p-3 border rounded-md font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-48" 
              placeholder="/* Add your custom CSS here */"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Add custom CSS to modify your store's appearance. Changes will be applied immediately.
          </p>
        </div>
      </div>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Notification Settings</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-3">Admin Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <h4 className="font-medium text-gray-800">New Orders</h4>
                <p className="text-sm text-gray-500">Receive notifications when new orders are placed</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="email-orders" 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked={true}
                  />
                  <label htmlFor="email-orders" className="ml-2 block text-sm text-gray-700">
                    Email
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="push-orders" 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked={true}
                  />
                  <label htmlFor="push-orders" className="ml-2 block text-sm text-gray-700">
                    Push
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <h4 className="font-medium text-gray-800">Low Stock Alerts</h4>
                <p className="text-sm text-gray-500">Get notified when product inventory is running low</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="email-stock" 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked={true}
                  />
                  <label htmlFor="email-stock" className="ml-2 block text-sm text-gray-700">
                    Email
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="push-stock" 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked={false}
                  />
                  <label htmlFor="push-stock" className="ml-2 block text-sm text-gray-700">
                    Push
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <h4 className="font-medium text-gray-800">Customer Reviews</h4>
                <p className="text-sm text-gray-500">Get notified when customers leave reviews</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="email-reviews" 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked={false}
                  />
                  <label htmlFor="email-reviews" className="ml-2 block text-sm text-gray-700">
                    Email
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="push-reviews" 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked={true}
                  />
                  <label htmlFor="push-reviews" className="ml-2 block text-sm text-gray-700">
                    Push
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <h4 className="font-medium text-gray-800">Failed Payments</h4>
                <p className="text-sm text-gray-500">Get notified when payments fail</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="email-payments" 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked={true}
                  />
                  <label htmlFor="email-payments" className="ml-2 block text-sm text-gray-700">
                    Email
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="push-payments" 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked={true}
                  />
                  <label htmlFor="push-payments" className="ml-2 block text-sm text-gray-700">
                    Push
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Push Notification Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notification Sound</label>
              <select className="w-64 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="default">Default</option>
                <option value="chime">Chime</option>
                <option value="bell">Bell</option>
                <option value="none">None (Silent)</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="browser-notifications" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked={true}
              />
              <label htmlFor="browser-notifications" className="ml-2 block text-sm text-gray-700">
                Enable browser notifications
              </label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="do-not-disturb" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked={false}
              />
              <label htmlFor="do-not-disturb" className="ml-2 block text-sm text-gray-700">
                Do not disturb mode
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Email Notification Schedule</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Daily Digest</label>
              <select className="w-64 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="disabled">Disabled</option>
                <option value="morning">Morning (8:00 AM)</option>
                <option value="afternoon">Afternoon (2:00 PM)</option>
                <option value="evening">Evening (6:00 PM)</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="weekly-report" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked={true}
              />
              <label htmlFor="weekly-report" className="ml-2 block text-sm text-gray-700">
                Send weekly summary report
              </label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="monthly-report" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked={true}
              />
              <label htmlFor="monthly-report" className="ml-2 block text-sm text-gray-700">
                Send monthly analytics report
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}