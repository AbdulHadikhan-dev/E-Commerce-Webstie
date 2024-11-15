import { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { GoArrowUpLeft } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { change, reset } from "../Redux/searchSlice";
import { RxCross2 } from "react-icons/rx";
import { FaTags } from "react-icons/fa";
import { motion } from "framer-motion";

const Search = () => {
  const [suggestions, setsuggestions] = useState([]);
  const search = useSelector((state) => state.search.value);
  const dispatch = useDispatch();

  const handlerChange = (e) => {
    dispatch(change(e.target.value));
  };

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setsuggestions(data);
      });
  }, []);

  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      let searchItem = document.querySelector(".items");
      searchItem.classList.remove("w-80");
      searchItem.classList.add("w-0");
      searchItem.classList.add("overflow-hidden");
      searchItem.classList.remove("overflow-auto");
      searchItem.classList.remove("h-96");
      searchItem.classList.add("h-0");
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-h-screen w-full bg-white">
      <div
        className="search relative flex flex-col"
        ref={ref}
        onClick={() => {
          let searchItem = document.querySelector(".items");
          searchItem.classList.add("w-80");
          searchItem.classList.remove("w-0");
          searchItem.classList.add("overflow-auto");
          searchItem.classList.remove("overflow-hidden");
          searchItem.classList.add("h-96");
          searchItem.classList.remove("h-0");
        }}
      >
        <div className="relative flex items-center justify-center mt-6 bg-[#f4f4f4] rounded-md w-80 mx-auto px-2">
          <Link to={`/results/search?q=${search}`}>
            <CiSearch className="text-[#959fa8] h-6 w-6 font-bold cursor-pointer" />
          </Link>
          <input
            type="text"
            placeholder="Search"
            value={search}
            className="w-full focus:outline-none bg-transparent p-2 text-[#959fa8] placeholder:text-[#959fa8]"
            onChange={handlerChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log("Search");
                location.href = `/results/search?q=${search}`;
              }
            }}
          />
          {search.length > 0 && (
            <RxCross2
              className="h-6 w-6 text-[#959fa8] cursor-pointer"
              onClick={() => dispatch(reset())}
            />
          )}
        </div>
        <div className="items flex flex-col gap-2 bg-[#f4f4f4] w-80 mx-auto h-0 overflow-hidden">
          {suggestions.map((item) => {
            return (
              <motion.button
                key={item.slug}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  if (
                    e.target.classList.contains("bg-indigo-100 text-indigo-800")
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
                className={`inline-flex items-center w-full px-3 py-2 text-sm font-medium`}
              >
                <FaTags className="mr-2 h-4 w-4" />
                {item.name}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
