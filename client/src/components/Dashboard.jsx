import React, { useState, useEffect } from 'react';
import { FiHome, FiShoppingBag, FiUsers, FiSettings, FiHelpCircle, FiBarChart2, FiPackage, FiMessageSquare, FiLock, FiMenu, FiX } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard');

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const salesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 4500 },
    { name: 'May', sales: 6000 },
    { name: 'Jun', sales: 5500 },
  ];

  const recentOrders = [
    { id: 1, customer: 'John Doe', total: 120.50, status: 'Delivered' },
    { id: 2, customer: 'Jane Smith', total: 85.20, status: 'Processing' },
    { id: 3, customer: 'Bob Johnson', total: 250.00, status: 'Shipped' },
  ];

  const NavItem = ({ icon: Icon, text }) => (
    <li className="mb-4">
      <button
        onClick={() => setActivePage(text)}
        className={`flex items-center w-full text-left ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-500'} ${activePage === text ? 'font-bold' : ''}`}
      >
        <Icon className="mr-2" /> {text}
      </button>
    </li>
  );

  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { title: 'Total Sales', value: '$24,500' },
                { title: 'New Orders', value: '152' },
                { title: 'New Customers', value: '64' },
                { title: 'Support Tickets', value: '12' },
              ].map((item, index) => (
                <div key={index} className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1`}>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-3xl font-bold">{item.value}</p>
                </div>
              ))}
            </div>

            <div className={`p-6 rounded-lg shadow-md mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="text-xl font-semibold mb-4">Sales Analytics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="name" stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
                  <YAxis stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                      border: 'none',
                      borderRadius: '0.375rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="sales" fill={darkMode ? '#60A5FA' : '#3B82F6'} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        );
      case 'Orders':
        return (
          <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'}`}>
                    <th className="px-4 py-2">Order ID</th>
                    <th className="px-4 py-2">Customer</th>
                    <th className="px-4 py-2">Total</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <td className="px-4 py-2">{order.id}</td>
                      <td className="px-4 py-2">{order.customer}</td>
                      <td className="px-4 py-2">${order.total.toFixed(2)}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${order.status === 'Delivered' ? 'bg-green-200 text-green-800' : order.status === 'Processing' ? 'bg-yellow-200 text-yellow-800' : 'bg-blue-200 text-blue-800'}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Products':
        return <div className="text-xl">Products Page Content</div>;
      case 'Customers':
        return <div className="text-xl">Customers Page Content</div>;
      case 'Support':
        return <div className="text-xl">Support Page Content</div>;
      case 'Permissions':
        return <div className="text-xl">Permissions Page Content</div>;
      case 'Settings':
        return <div className="text-xl">Settings Page Content</div>;
      default:
        return <div className="text-xl">Page not found</div>;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <nav className={`fixed top-0 left-0 h-full w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 shadow-lg transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'transform translate-x-0' : 'transform -translate-x-full'} lg:translate-x-0 z-20`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <img src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9" alt="Company Logo" className="w-10 h-10 rounded-full" />
            <h1 className="ml-2 text-lg font-bold">Admin Dashboard</h1>
          </div>
          <button className="lg:hidden" onClick={toggleMobileMenu}>
            <FiX className="w-6 h-6" />
          </button>
        </div>
        <ul>
          <NavItem icon={FiHome} text="Dashboard" />
          <NavItem icon={FiShoppingBag} text="Orders" />
          <NavItem icon={FiPackage} text="Products" />
          <NavItem icon={FiUsers} text="Customers" />
          <NavItem icon={FiMessageSquare} text="Support" />
          <NavItem icon={FiLock} text="Permissions" />
          <NavItem icon={FiSettings} text="Settings" />
        </ul>
      </nav>

      <main className="lg:ml-64 p-4 lg:p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <button className="lg:hidden mr-4" onClick={toggleMobileMenu}>
              <FiMenu className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold">{activePage}</h2>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${darkMode ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;