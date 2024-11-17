/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { LiaUser } from "react-icons/lia";
import { MdFavoriteBorder } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { GoArrowUpLeft } from "react-icons/go";
import { MdLogin } from "react-icons/md";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import Cart from "./Cart";
import { FaTags } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";

import { motion } from "framer-motion";

import { useSelector, useDispatch } from "react-redux";
import { change, reset } from "../Redux/searchSlice";
import { Link } from "react-router-dom";

const Navbar = ({ varients, icons, logo }) => {
  const search = useSelector((state) => state.search.value);
  const admin = useSelector((state) => state.admin.value);
  const authenticated = useSelector((state) => state.authenticated.value);

  const dispatch = useDispatch();
  const [suggestions, setsuggestions] = useState([]);

  const suggestion = useRef();

  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setsuggestions(data);
      });
  }, []);

  const handlerChange = (e) => {
    dispatch(change(e.target.value));

    suggestion.current.classList.add("w-full");
    suggestion.current.classList.remove("w-0");
  };

  const ref = useRef(null);

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    // Check if the clicked target is outside the referenced element
    if (ref.current && !ref.current.contains(event.target)) {
      // console.log(ref.current, !ref.current.contains(event.target));
      let container = document.querySelector("#inputSearch");
      container.classList.add("w-80");
      container.classList.remove("w-[620px]");
      suggestion.current.classList.remove("overflow-auto");
      suggestion.current.classList.add("overflow-hidden");
      suggestion.current.classList.remove("h-96");
      suggestion.current.classList.add("h-0");
      suggestion.current.classList.remove("w-full");
      suggestion.current.classList.add("w-0");
      suggestion.current.classList.remove("p-2");
      suggestion.current.classList.add("p-0");
    }
  };

  return (
    <>
      {/* <div className="blur fixed w-full bg-white bg-opacity-40 top-0 h-0 left-0 z-30"></div> */}
      <nav
        className={`flex justify-between px-6 lg:px-12 py-3 items-center bg-opacity-15 ${varients}`}
      >
        <div
          className={`logo text-2xl lg:text-4xl font-bold cursor-pointer ${logo}`}
          onClick={() => (location.href = "/")}
        >
          BR.<span className="text-[#bcc1a3]">F</span>
        </div>
        <div
          id="inputSearch"
          className="search relative max-lg:hidden z-50 bg-[#f4f4f4] w-80 flex items-center rounded-md px-2 duration-300"
          ref={ref}
          onClick={() => {
            let container = document.querySelector("#inputSearch");
            container.classList.add("w-[620px]");
            container.classList.remove("w-80");
            suggestion.current.classList.add("w-full");
            suggestion.current.classList.remove("w-0");
            suggestion.current.classList.add("overflow-auto");
            suggestion.current.classList.remove("overflow-hidden");
            suggestion.current.classList.add("h-96");
            suggestion.current.classList.remove("h-0");
            suggestion.current.classList.add("p-2");
            suggestion.current.classList.remove("p-0");
          }}
        >
          <Link to={`/results/search?q=${search}`}>
            <CiSearch
              className="text-gray-600 h-6 w-6 font-bold cursor-pointer"
              onClick={() => {
                if (search.length > 0) {
                  suggestion.current.classList.remove("w-full");
                  suggestion.current.classList.add("w-0");
                }
              }}
            />
          </Link>
          <input
            type="text"
            placeholder="Search"
            value={search}
            className="w-full focus:outline-none bg-transparent p-2 px-2 text-gray-600 placeholder:text-[#959fa8]"
            onChange={handlerChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log(search);
                let container = document.querySelector("#inputSearch");
                container.classList.add("w-80");
                container.classList.remove("w-[620px]");
                suggestion.current.classList.remove("w-full");
                suggestion.current.classList.add("w-0");
                location.href = "/results/search?q=" + search;
              }
            }}
          />
          {search.length > 0 && (
            <RxCross2
              className="h-6 w-6 text-gray-600 cursor-pointer"
              onClick={() => dispatch(reset())}
            />
          )}
          <div
            className={`items flex flex-wrap items-center gap-1 p-0 bg-[#f4f4f4] w-0 overflow-hidden h-0 mx-auto absolute top-8 left-0 max-lg:hidden`}
            ref={suggestion}
          >
            {suggestions.map((item) => {
              return (
                // <div
                //   // to={`/results/search?q=${item.slug}`}
                //   className="item flex justify-between p-2 cursor-pointer hover:bg-gray-200 duration-100"
                //   key={item.slug}
                //   onClick={() =>
                //     (location.href = `/results/search?q=${item.slug}`)
                //   }
                // >
                //   <span className="name text-base">{item.name}</span>
                //   <GoArrowUpLeft className="h-6 w-6 text-[#959fa8]" />
                // </div>
                <motion.button
                  key={item.slug}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    if (
                      e.target.classList.contains(
                        "bg-indigo-100 text-indigo-800"
                      )
                    ) {
                      e.target.classList.add("bg-gray-400");
                      e.target.classList.add("text-gray-800");
                      e.target.classList.remove("bg-indigo-100");
                      e.target.classList.remove("text-indigo-800");
                    } else {
                      e.target.classList.add("bg-indigo-100");
                      e.target.classList.add("text-indigo-800");
                      e.target.classList.remove("bg-gray-400");
                      e.target.classList.remove("text-gray-800");
                    }
                    location.href = `/results/search?q=${item.slug}`;
                  }}
                  className={`inline-flex items-center w-fit h-fit px-3 py-2 rounded-full text-sm font-medium`}
                >
                  <FaTags className="mr-2 h-4 w-4" />
                  {item.name}
                </motion.button>
              );
            })}
          </div>
        </div>
        <div className="overall flex gap-6 items-center max-lg:gap-0 ">
          <Cart varients={`h-6 w-6 lg:h-7 md:w-7 ${icons} hover:scale-110 duration-200`} />
          <div className="favorite  max-lg:hidden hover:scale-110 duration-200">
            <Link to={"/wishlist"}>
              <div className="favorite">
                <MdFavoriteBorder
                  className={`h-7 w-7 lg:h-8 md:w-8 cursor-pointer ${icons}`}
                />
              </div>
            </Link>
          </div>
          {authenticated && (
            <Link to={"/profile"}>
              <div className="profile max-lg:hidden hover:scale-110 duration-200">
                <div className="user">
                  <LiaUser
                    className={`h-8 w-8 lg:h-9 md:w-9 cursor-pointer ${icons}`}
                  />
                </div>
              </div>
            </Link>
          )}
          {!authenticated && (
            // <Link to={"/login"}>
            <div
              className="profile max-lg:hidden hover:scale-110 duration-200"
              onClick={() => {
                loginWithRedirect();
              }}
            >
              <div className="user">
                <MdLogin
                  className={`h-8 w-8 lg:h-9 lg:w-9 cursor-pointer ${icons}`}
                />
              </div>
            </div>
            // </Link>
          )}
          {authenticated && (
            <Link to={"/dashboard"}>
              <div className="profile max-lg:hidden hover:scale-110 duration-200">
                <div className="user">
                  <AiOutlineFundProjectionScreen
                    className={`h-8 w-8 lg:h-9 lg:w-9 cursor-pointer ${icons}`}
                  />
                </div>
              </div>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
