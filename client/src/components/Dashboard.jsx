/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import {
  FiHome,
  FiShoppingBag,
  FiUsers,
  FiPackage,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
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

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [deleteProduct, setDeleteProduct] = useState({});
  const [updateForm, setUpdateForm] = useState({});
  const products = useSelector((state) => state.product.value);
  const admin = useSelector((state) => state.admin.value);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const toast = useToast();

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

  const actionButton = async (action) => {
    if (admin) {
      const url = `${import.meta.env.VITE_REACT_PUBLIC_BACKEND_URL}/api/order/${
        action.status
      }/query?order_id=${action.id}&user_email=${action.email}`;
      const response = await fetch(url);
      let r = await response.json();
      console.log(r);
      alert(r.msg);
      fetchOrders();
    } else {
      toast({
        title: "Oops! Something went wrong",
        description: "Only Admin can Change product status!",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchUsers();
  }, []);

  // useEffect(() => {
  //   orders.forEach((singleItem) => {
  //     singleItem.cart.forEach((order) => {
  //       setSingleOrder([...getSingleOrder, order]);
  //     });
  //   });
  // }, [orders]);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  // const toggleDarkMode = () => {
  //   const newDarkMode = !darkMode;
  //   setDarkMode(newDarkMode);
  //   localStorage.setItem("darkMode", newDarkMode);
  // };

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
          <div className="sm:p-6 bg-gray-100 min-h-screen w-auto flex justify-center items-center">
            <div className="bg-white rounded-lg md:p-4 shadow-md">
              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Delete Product
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      {`Delete a product will not delete it into the server.`}
                      <p>Are you sure?</p>
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme="red"
                        ml={3}
                        onClick={() => {
                          actionButton({
                            status: "delete",
                            id: deleteProduct.id,
                            email: deleteProduct.email,
                          });
                          onClose();
                        }}
                      >
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
              <div className="justify-between items-center mb-4 hidden">
                <input
                  type="text"
                  placeholder="Search here..."
                  className="border border-gray-300 rounded-lg p-2 w-1/4"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                  Export all orders
                </button>
              </div>

              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-base max-sm:text-xs leading-normal">
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Product ID</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Quantity</th>
                    <th className="py-3 px-4">Payment Method</th>
                    <th className="py-3 px-4">User email</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-base max-sm:text-xs">
                  {orders.map((order) => {
                    console.log(orders);
                    return order.cart.map((item, index) => {
                      console.log(item);
                      return (
                        <tr
                          key={index}
                          className={`border-b border-gray-200 hover:bg-gray-100 ${
                            item.status === "delete" && "hidden"
                          }`}
                        >
                          <td className="py-3 px-4 flex items-center font-medium">
                            <img
                              src={item.image[0]}
                              alt={item.image[0]}
                              className="w-10 h-10 rounded-full mr-3"
                            />
                            {item.title}
                          </td>
                          <td className="py-3 px-4 font-semibold">{item.id}</td>
                          <td className="py-3 px-4 font-semibold">
                            ${item.price}
                          </td>
                          <td className="py-3 px-4 font-semibold">
                            {item.quantity}
                          </td>
                          <td className="py-3 px-4 font-semibold">
                            {order.creditCard ? "credit card" : "cash on delivery"}
                          </td>

                          <td className="py-3 px-4 font-medium">
                            {order.user?.email}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              className={`px-2 py-1 rounded-md font-semibold inline-block ${
                                item.status === "deliverd"
                                  ? "text-green-500"
                                  : item.status === "processing"
                                  ? "text-yellow-600"
                                  : item.status === "cancel"
                                  ? "text-red-500"
                                  : ""
                              }
                              ${
                                item.status === "deliverd"
                                  ? "bg-green-50"
                                  : item.status === "processing"
                                  ? "bg-yellow-50"
                                  : item.status === "cancel"
                                  ? "bg-red-50"
                                  : ""
                              }
                              `}
                            >
                              {item.status}
                            </button>
                          </td>
                          <td className="py-3 px-4 flex space-x-2">
                            <div className="dropdown">
                              <div tabIndex={0} role="button" className="btn">
                                <BsThreeDotsVertical />
                              </div>
                              <ul
                                tabIndex={0}
                                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                              >
                                <li
                                  className="font-semibold px-3 py-1 hover:bg-slate-100 cursor-pointer"
                                  onClick={() =>
                                    actionButton({
                                      status: "deliverd",
                                      id: item.id,
                                      email: order.user?.email,
                                    })
                                  }
                                >
                                  Deliverd
                                </li>
                                <li
                                  className="font-semibold px-3 py-1 hover:bg-slate-100 cursor-pointer"
                                  onClick={() =>
                                    actionButton({
                                      status: "cancel",
                                      id: item.id,
                                      email: order.user?.email,
                                    })
                                  }
                                >
                                  Cancel
                                </li>
                                <li
                                  className="font-semibold px-3 py-1 hover:bg-slate-100 cursor-pointer"
                                  onClick={() => {
                                    onOpen();
                                    setDeleteProduct({
                                      id: item.id,
                                      email: order.user?.email,
                                    });
                                  }}
                                >
                                  Delete
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      );
                    });
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "Products":
        return (
          <div
            className={`${
              !updateForm.data
                ? "product-continer flex flex-wrap justify-between xl:justify-start sm:gap-y-6 sm:px-5 lg:px-12 mt-6 gap-4 max-sm:gap-2"
                : ""
            }`}
          >
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
        );

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
          {/* <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              darkMode
                ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button> */}
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
