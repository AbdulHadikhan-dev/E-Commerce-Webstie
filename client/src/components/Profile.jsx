/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
  FaSignOutAlt,
} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoCameraOutline } from "react-icons/io5";

import { useAuth0 } from "@auth0/auth0-react";

// import { Login } from "../Redux/authenticated";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button
} from '@chakra-ui/react'

const UserProfile = ({
  User,
  setUser,
  addDetails,
  setAddDetails,
  image,
  setImage,
  fetchUser,
}) => {
  const { logout } = useAuth0();
  const [orders, setOrders] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  // const authenticated = useSelector((state) => state.authenticated.value);

  const fetchOrders = () => {
    // Fetch orders from backend API
    fetch(
      `${
        import.meta.env.VITE_REACT_PUBLIC_BACKEND_URL
      }/api/order/find?user_id=${User.sub}`
    )
      .then((res) => res.json())
      .then((orders) => {
        setOrders(orders);
        console.log(orders);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  };

  // console.log("user from userState", User);

  useEffect(() => {
    fetchOrders();
  }, [User]);

  const handleAddDetails = () => {
    let addDetail = document.querySelector(".add-details");
    let black = document.querySelector(".black");
    addDetail.classList.remove("hidden");
    black.classList.remove("hidden");
  };

  const handleChange = (e) => {
    setAddDetails({ ...addDetails, [e.target.name]: e.target.value });
  };

  const handleDeleteAccount = () => {
    fetch(
      `${
        import.meta.env.VITE_REACT_PUBLIC_BACKEND_URL
      }/api/user/delete/account/${User.sub}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sub: User.sub }),
      }
    ).then(() => {
      localStorage.removeItem("user");
      logout({ logoutParams: { returnTo: window.location.origin } });
    });
  };

  const handleSetDetail = (e) => {
    e.preventDefault();
    console.log(addDetails);
    fetch(
      `${
        import.meta.env.VITE_REACT_PUBLIC_BACKEND_URL
      }/api/user/update/user/addDetails/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addDetails),
      }
    )
      .then(() => {
        fetchUser(JSON.parse(localStorage.getItem("user")));
      })
      .then(() => {
        let addDetail = document.querySelector(".add-details");
        let black = document.querySelector(".black");
        addDetail.classList.add("hidden");
        black.classList.add("hidden");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center md:py-10 max-sm:mb-20">
      <div className="black absolute top-0 h-full w-full z-[60] bg-black bg-opacity-20 hidden"></div>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Account
            </AlertDialogHeader>

            <AlertDialogBody>
              {`Are you sure? You can't undo this action afterwards.`}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDeleteAccount} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <div
        className="add-details bg-white p-6 rounded-lg shadow-lg max-w-md w-full h-fit fixed top-[50%] left-[50%] z-[70] hidden"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Add Information
        </h2>
        <form onSubmit={handleSetDetail}>
          <RxCross2
            className="absolute top-8 right-8 cursor-pointer scale-150"
            onClick={() => {
              let addDetail = document.querySelector(".add-details");
              let black = document.querySelector(".black");
              addDetail.classList.add("hidden");
              black.classList.add("hidden");
            }}
          />
          {/* <!-- Name --> */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={addDetails.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Your Name"
            />
          </div>

          {/* <!-- Location --> */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={addDetails.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Your Location"
            />
          </div>

          {/* <!-- Bio --> */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="bio"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={addDetails.bio}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Short bio about yourself"
            ></textarea>
          </div>

          {/* <!-- Contact Number --> */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="contact"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={addDetails.contact}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Your Contact Number"
            />
          </div>

          {/* <!-- Shipping Address --> */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="address"
            >
              Shipping Address
            </label>
            <textarea
              id="address"
              name="address"
              value={addDetails.address}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Your Shipping Address Street Address"
            ></textarea>
          </div>

          {/* <!-- Submit Button --> */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-8 relative">
        {/* Back Cover Picture */}

        <div
          className="absolute top-0 left-0 w-full h-40 bg-cover bg-center rounded-t-lg bg-slate-400"
          style={{ backgroundImage: `url(${image})` }}
        >
          <label
            htmlFor="uplode"
            className="select-image absolute right-3 top-3 border rounded-ful`l p-3 flex justify-center items-center cursor-pointer"
          >
            <IoCameraOutline className="text-white scale-150 font-semibold" />
          </label>
          <input
            type="file"
            name="bg-image"
            id="uplode"
            className="hidden"
            onChange={(e) => {
              setImage(
                URL.createObjectURL(e.target.files[e.target.files.length - 1])
              );
              fetch(
                `${
                  import.meta.env.VITE_REACT_PUBLIC_BACKEND_URL
                }/api/user/update/user/cover`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    sub: User.sub,
                    image,
                  }),
                }
              )
                .then((res) => {
                  res.json();
                })
                .then((data) => {
                  setUser(data);
                });
            }}
          />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 mt-20 md:mt-36">
          {/* Profile Picture */}
          <div className="relative">
            <img
              src={User.picture}
              alt={User.picture}
              className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
            />
            {/* Online Status */}
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></span>
          </div>

          {/* User Info */}
          <div className="flex-grow">
            <h1 className="text-4xl font-semibold text-gray-800">
              {User.name}
            </h1>
            <p className="text-lg text-gray-600 mt-1">E-commerce Specialist</p>
            <p className="text-gray-500">{User.location}</p>
            <p className="text-sm text-gray-400 mt-2">
              Member since January 2021
            </p>
            <p className="text-gray-700 my-4">Bio: {User.bio}</p>

            {/* Social Icons */}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-4 mt-6 md:mt-0 md:space-y-0 md:flex-row md:space-x-4 justify-end">
          <button
            className="flex items-center bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transition duration-300"
            onClick={handleAddDetails}
          >
            <FaEdit className="mr-2" />
            Edit Profile
          </button>
          <button
            className="flex items-center bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-red-600 hover:to-red-700 transition duration-300"
            onClick={onOpen}
          >
            <FaTrash className="mr-2" />
            Delete Account
          </button>
          <button
            className="flex items-center bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-lg shadow-md hover:from-gray-700 hover:to-gray-800 transition duration-300"
            onClick={() => {
              localStorage.removeItem("isUserLoggedIn");
              localStorage.removeItem("user");
              logout({ logoutParams: { returnTo: window.location.origin } });
            }}
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-200"></div>

        {/* User Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Contact Information
            </h2>
            <ul className="mt-4 text-gray-700 space-y-2">
              <li className="flex items-center">
                <FaPhoneAlt className="mr-2 text-indigo-500" />
                <span>{User.contact ? User.contact : "+92 0000000000"}</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-indigo-500" />
                <span>{User.email}</span>
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-indigo-500" />
                <span>
                  {User.address ? User.address : "Please Add location"}
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Shipping Address
            </h2>
            <p className="mt-4 text-gray-700">
              {User.address ? User.address : "Please Add location"}
            </p>
          </div>
        </div>

        {/* Simple Order History */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800">Order History</h2>
          <ul className="mt-4 space-y-4">
            {orders.length === 0 && (
              <div className="text-2xl font-bold text-gray-800 w-full mx-auto text-center">
                There is No Order Left
              </div>
            )}
            {orders.map((order) => {
              return (
                <li
                  className="bg-gray-50 p-4 rounded-lg shadow-md transition duration-200 hover:shadow-lg"
                  key={order._id}
                >
                  <p className="font-medium text-gray-800">Order #1234</p>
                  <p className="text-gray-500">Date: {order.date}</p>
                  {order.cart.map((item) => {
                    return (
                      <div
                        className="order flex gap-3 items-center my-2"
                        key={item.id}
                      >
                        <img src={item.image[0]} alt="" className="h-20" />
                        <div className="details flex flex-col gap-2">
                          <p className="text-lg font-medium">{item.title}</p>
                          <div className="flex gap-3 items-center">

                          <p className="text-base">
                            {item.price} x {item.quantity}
                          </p>
                          <div className={`inline-block w-fit rounded-md px-3 py-1 font-semibold text-sm ${item.status==='processing'?'text-yellow-600 bg-yellow-50': item.status === 'deliverd'? 'text-green-600 bg-green-100': item.status === 'cancel'?'text-red-500 bg-red-100' : 'hidden'}`}>
                            {item.status}
                          </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <p className="text-black text-lg">
                    Total: ${order.totalPrice.toFixed(2)}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
