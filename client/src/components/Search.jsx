import React from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { GoArrowUpLeft } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { change, reset } from "../Redux/searchSlice";
import { RxCross2 } from "react-icons/rx";

const Search = () => {
  const search = useSelector((state) => state.search.value);
  const dispatch = useDispatch();

  const handlerChange = (e) => {
    dispatch(change(e.target.value));
  };

  return (
    <div className="h-screen w-full bg-white">
      <div className="search relative flex justify-center mt-6 bg-[#f4f4f4] rounded-md w-80 mx-auto px-2 items-center">
        <Link to={"/results/search"}>
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
              location.href = "/results/search";
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
      <div className="search flex flex-col gap-2 bg-[#f4f4f4] w-80 mx-auto">
        <div className="item flex justify-between p-2">
          <span className="name text-base">Keyboard</span>
          <GoArrowUpLeft className="h-6 w-6 text-[#959fa8]" />
        </div>
        <div className="item flex justify-between p-2">
          <span className="name text-base">Keyboard</span>
          <GoArrowUpLeft className="h-6 w-6 text-[#959fa8]" />
        </div>
        <div className="item flex justify-between p-2">
          <span className="name text-base">Keyboard</span>
          <GoArrowUpLeft className="h-6 w-6 text-[#959fa8]" />
        </div>
      </div>
    </div>
  );
};

export default Search;
