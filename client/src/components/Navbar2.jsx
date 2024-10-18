import React from "react";
import { BiHomeAlt } from "react-icons/bi";
import { MdFavoriteBorder } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { LiaUser } from "react-icons/lia";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


const Navbar2 = ({ varients }) => {
  const admin = useSelector((state) => state.admin.value);
  return (
    <>
      <nav
        className={`flex justify-between py-4 px-4 items-center ${varients} w-full lg:hidden z-10 bg-white`}
      >
        <div className="hr w-full h-[1px] bg-slate-200 absolute top-0 left-0"></div>
        <Link to={"/"} className="w-[25%]">
          <div className="home flex flex-col gap-1 cursor-pointer font-semibold hover:text-black text-[#6C7278] duration-500  items-center justify-center">
            <BiHomeAlt className="h-7 w-7" />
            <span className="text-sm">Home</span>
          </div>
        </Link>
        <Link to={"/search"} className="w-[25%]">
          <div className="explore flex flex-col gap-1 cursor-pointer font-semibold hover:text-black text-[#6C7278] duration-500  items-center justify-center">
            <CiSearch className="h-7 w-7" />
            <span className="text-sm">Search</span>
          </div>
        </Link>
        <Link to={"/wishlist"} className="w-[25%]">
          <div className="wishlist flex flex-col gap-1 cursor-pointer font-semibold hover:text-black text-[#6C7278] duration-500  items-center justify-center">
            <MdFavoriteBorder className="h-7 w-7" />
            <span className="text-sm">Favorite</span>
          </div>
        </Link>
        {!admin && <Link to={"/profile"} className="w-[25%]">
          <div className="profile flex flex-col gap-1 cursor-pointer font-semibold hover:text-black text-[#6C7278] duration-500  items-center justify-center">
            <LiaUser className="h-7 w-7" />
            <span className="text-sm">Profile</span>
          </div>
        </Link>}
        {admin && <Link to={"/dashboard"} className="w-[25%]">
          <div className="profile flex flex-col gap-1 cursor-pointer font-semibold hover:text-black text-[#6C7278] duration-500  items-center justify-center">
            <AiOutlineFundProjectionScreen className="h-7 w-7" />
            <span className="text-sm">Dashboard</span>
          </div>
        </Link>}
      </nav>
    </>
  );
};

export default Navbar2;
