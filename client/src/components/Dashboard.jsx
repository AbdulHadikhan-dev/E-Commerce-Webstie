import { useState, useEffect } from "react";
import {
  FiHome,
  FiShoppingBag,
  FiUsers,
  FiPackage,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { LuPackagePlus } from "react-icons/lu";
import User from "./User";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AddProductPage from "./Addproduct";
import Product from "./Product";
import { useSelector } from "react-redux";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [updateForm, setUpdateForm] = useState({});
  const [getSingleOrder, setSingleOrder] = useState([]);
  const products = useSelector((state) => state.product.value);

  const fetchUsers = async () => {
    const url = `${import.meta.env.VITE_REACT_PUBLIC_BACKEND_URL}/api/user/all`;
    const response = await fetch(url);
    let r = await response.json();
    setUsers(r.length);
  };

  const fetchOrders = async () => {
    const url = `${
      import.meta.env.VITE_REACT_PUBLIC_BACKEND_URL
    }/api/order/all`;
    const response = await fetch(url);
    let r = await response.json();
    setOrders(r);
  };

  useEffect(() => {
    fetchOrders();
    fetchUsers();
  }, []);

  useEffect(() => {
    orders.forEach((singleItem) => {
      singleItem.cart.forEach((order) => {
        setSingleOrder([...getSingleOrder, order]);
      });
    });
  }, [orders]);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 4500 },
    { name: "May", sales: 6000 },
    { name: "Jun", sales: 5500 },
  ];

  const NavItem = ({ icon: Icon, text }) => (
    <li className="mb-4">
      <button
        onClick={() => setActivePage(text)}
        className={`flex items-center w-full text-left ${
          darkMode
            ? "text-gray-300 hover:text-white"
            : "text-gray-700 hover:text-blue-500"
        } ${activePage === text ? "font-bold" : ""}`}
      >
        <Icon className="mr-2" /> {text}
      </button>
    </li>
  );

  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { title: "Total Sales", value: "$24,500" },
                { title: "Orders", value: "152" },
                { title: "Total Customers", value: users },
                { title: "Total Product", value: products.length },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg shadow-md ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1`}
                >
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-3xl font-bold">{item.value}</p>
                </div>
              ))}
            </div>

            <div
              className={`p-6 rounded-lg shadow-md mb-8 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h3 className="text-xl font-semibold mb-4">Sales Analytics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={darkMode ? "#374151" : "#e5e7eb"}
                  />
                  <XAxis
                    dataKey="name"
                    stroke={darkMode ? "#9CA3AF" : "#4B5563"}
                  />
                  <YAxis stroke={darkMode ? "#9CA3AF" : "#4B5563"} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                      border: "none",
                      borderRadius: "0.375rem",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="sales"
                    fill={darkMode ? "#60A5FA" : "#3B82F6"}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        );
      case "Orders":
        return (
          <div className="p-6 bg-gray-100 min-h-screen">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <input
                  type="text"
                  placeholder="Search here..."
                  className="border border-gray-300 rounded-lg p-2 w-1/4"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                  Export all orders
                </button>
              </div>

              <table className="w-full text-left table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Quantity</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Payment Method</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {console.log(getSingleOrder)}

                  {getSingleOrder.map((order, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-4 flex items-center">
                        <img
                          src="https://via.placeholder.com/40"
                          alt="Product"
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        {order.product}
                      </td>
                      <td className="py-3 px-4">{order.orderId}</td>
                      <td className="py-3 px-4">{order.price}</td>
                      <td className="py-3 px-4">{order.quantity}</td>
                      <td className="py-3 px-4">{order.payment}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-white ${
                            order.status === "Success"
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="bg-blue-100 text-blue-500 px-4 py-1 rounded-lg">
                          Tracking
                        </button>
                      </td>
                      <td className="py-3 px-4 flex space-x-2">
                        <Menu>
                          <MenuButton as={Button}>Actions</MenuButton>
                          <MenuList>
                            <MenuItem className="text-green-600">
                              Deliver
                            </MenuItem>
                            <MenuItem className="text-red-600">Cancel</MenuItem>
                            <MenuItem className="text-red-600">Delete</MenuItem>
                          </MenuList>
                        </Menu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "Products":
        return <div className={`${!updateForm.data?'product-continer flex flex-wrap justify-between xl:justify-start gap-y-6 px-5 lg:px-12 mt-6 gap-4': ''}`}>
            {!updateForm.data &&
              products.map((product) => {
                return (
                  <Product
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    brand={product.brand}
                    rating={product.rating}
                    price={product.price}
                    reviews={product.reviews}
                    image={product.images[0]}
                    hidden={"hidden"}
                    dashboard={true}
                    updateForm={updateForm}
                    setUpdateForm={setUpdateForm}
                    // favorite={product.favorite}
                  />
                );
              })}
            {updateForm.data && (
              <AddProductPage
                updateForm={updateForm}
                setUpdateForm={setUpdateForm}
              />
            )}
          </div>
        
      case "AddProducts":
        return (
          <div>
            <AddProductPage darkMode={darkMode} />
          </div>
        );
      case "Customers":
        return (
          <div>
            <User />
          </div>
        );
      default:
        return <div className="text-xl">Page not found</div>;
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <nav
        className={`fixed top-0 left-0 h-full w-64 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } p-4 shadow-lg transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "transform translate-x-0"
            : "transform -translate-x-full"
        } lg:translate-x-0 z-20`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9"
              alt="Company Logo"
              className="w-10 h-10 rounded-full"
            />
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
          <NavItem icon={LuPackagePlus} text="AddProducts" />
          <NavItem icon={FiUsers} text="Customers" />
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
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              darkMode
                ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
