import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEdit,
  FaTrash,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";

import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  const [image, setimage] = useState("");
  console.log(user);
  return !isAuthenticated ? (
    <div className="min-h-screen bg-gray-100 flex justify-center md:py-10">
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
              console.log(
                e.target.files,
                URL.createObjectURL(e.target.files[0])
              );
              setimage(
                URL.createObjectURL(e.target.files[e.target.files.length - 1])
              );
            }}
          />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 mt-20 md:mt-36">
          {/* Profile Picture */}
          <div className="relative md:w-72">
            <img
              src={user.picture? user.picture:'https://placehiol.com'}
              alt={user.picture? user.picture:'/'}
              className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
            />
            {/* Online Status */}
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></span>
          </div>

          {/* User Info */}
          <div className="flex-grow">
            <h1 className="text-4xl font-extrabold text-gray-800">{user.name? user.name:'John'}</h1>
            <p className="text-lg text-gray-600 mt-1">E-commerce Specialist</p>
            <p className="text-gray-500">Lahore, Pakistan</p>
            <p className="text-sm text-gray-400 mt-2">
              Member since January 2021
            </p>
            <p className="text-gray-700 mt-4">
              Bio: A passionate e-commerce enthusiast who loves to shop and
              explore new trends. Always excited to learn more about the latest
              tech and gadgets!
            </p>

            {/* Social Icons */}
            <div className="mt-4 flex space-x-4 text-gray-500">
              <a href="#" className="hover:text-blue-500">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:text-pink-500">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-4 mt-6 md:mt-0 md:space-y-0 md:flex-row md:space-x-4 justify-end">
          <button className="flex items-center bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transition duration-300">
            <FaEdit className="mr-2" />
            Edit Profile
          </button>
          <button className="flex items-center bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-red-600 hover:to-red-700 transition duration-300">
            <FaTrash className="mr-2" />
            Delete Account
          </button>
          <button className="flex items-center bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-lg shadow-md hover:from-gray-700 hover:to-gray-800 transition duration-300">
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
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-indigo-500" />
                <span>johndoe@example.com</span>
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-indigo-500" />
                <span>123 Main St, Lahore, Pakistan</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Shipping Address
            </h2>
            <p className="mt-4 text-gray-700">123 Main St, Lahore, Pakistan</p>
          </div>
        </div>

        {/* Simple Order History */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800">Order History</h2>
          <ul className="mt-4 space-y-4">
            <li className="bg-gray-50 p-4 rounded-lg shadow-md transition duration-200 hover:shadow-lg">
              <p className="font-medium text-gray-800">Order #1234</p>
              <p className="text-gray-500">Date: 2024-10-01</p>
              <p className="text-gray-500">Total: $120.00</p>
            </li>
            <li className="bg-gray-50 p-4 rounded-lg shadow-md transition duration-200 hover:shadow-lg">
              <p className="font-medium text-gray-800">Order #5678</p>
              <p className="text-gray-500">Date: 2024-09-25</p>
              <p className="text-gray-500">Total: $80.00</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  ) : (
    loginWithRedirect()
  );
};

export default UserProfile;
