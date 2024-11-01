import React from "react";
// import { BiHomeAlt } from "react-icons/bi";
// import { MdFavoriteBorder } from "react-icons/md";
// import { CiSearch } from "react-icons/ci";
// import { LiaUser } from "react-icons/lia";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import HomeIcon from "@mui/icons-material/Home";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";

const Navbar2 = ({ varients }) => {
  const admin = useSelector((state) => state.admin.value);
  return (
    <>
      <nav
        className={`flex justify-between py-4 px-4 items-center ${varients} w-full lg:hidden z-10 bg-white`}
      >
        <div className="hr w-full h-[1px] bg-slate-200 absolute top-0 left-0"></div>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "text-black w-[25%]" : "text-[#6C7278] w-[25%]"
          }
        >
          <div className="home flex flex-col gap-1 cursor-pointer font-semibold hover:text-black  duration-500  items-center justify-center">
            <HomeIcon fontSize="large" />
            <span className="text-sm">Home</span>
          </div>
        </NavLink>
        <NavLink
          to={"/search"}
          className={({ isActive }) =>
            isActive ? "text-black w-[25%]" : "text-[#6C7278] w-[25%]"
          }
        >
          <div className="explore flex flex-col gap-1 cursor-pointer font-semibold hover:text-black  duration-500  items-center justify-center">
            <SearchOutlinedIcon fontSize="large" />
            <span className="text-sm">Search</span>
          </div>
        </NavLink>
        <NavLink
          to={"/wishlist"}
          className={({ isActive }) =>
            isActive ? "text-black w-[25%]" : "text-[#6C7278] w-[25%]"
          }
        >
          <div className="wishlist flex flex-col gap-1 cursor-pointer font-semibold hover:text-black  duration-500  items-center justify-center">
            <FavoriteIcon sx={{ fontSize: 30 }} />
            <span className="text-sm">Favorite</span>
          </div>
        </NavLink>
        {!admin && (
          <NavLink
            to={"/profile"}
            className={({ isActive }) =>
              isActive ? "text-black w-[25%]" : "text-[#6C7278] w-[25%]"
            }
          >
            <div className="profile flex flex-col gap-1 cursor-pointer font-semibold hover:text-black  duration-500  items-center justify-center">
              <PersonIcon fontSize="large" />
              <span className="text-sm">Profile</span>
            </div>
          </NavLink>
        )}
        {admin && (
          <NavLink to={"/dashboard"} className="w-[25%]">
            <div className="profile flex flex-col gap-1 cursor-pointer font-semibold hover:text-black text-[#6C7278] duration-500  items-center justify-center">
              <AiOutlineFundProjectionScreen className="h-7 w-7" />
              <span className="text-sm">Dashboard</span>
            </div>
          </NavLink>
        )}
      </nav>
    </>
  );
};

export default Navbar2;
