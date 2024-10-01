import { CiSearch } from "react-icons/ci";
import { LiaUser } from "react-icons/lia";
import { MdFavoriteBorder } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { GoArrowUpLeft } from "react-icons/go";
import { MdLogin } from "react-icons/md";
import Cart from "./Cart";

import { useAuth0 } from "@auth0/auth0-react";

import { useSelector, useDispatch } from "react-redux";
import { change, reset } from "../Redux/searchSlice";
import { Link } from "react-router-dom";

const Navbar = ({ varients, icons, logo }) => {
  const search = useSelector((state) => state.search.value);
  const dispatch = useDispatch();

  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handlerChange = (e) => {
    dispatch(change(e.target.value));
  };

  return (
    <>
      <div className="blur fixed w-full bg-white bg-opacity-40 top-0 h-0 left-0 z-30"></div>
      <nav
        className={`flex justify-between px-6 lg:px-12 py-3 items-center bg-opacity-15 ${varients}`}
      >
        <div className={`logo text-2xl lg:text-4xl font-bold ${logo}`}>
          BR.<span className="text-[#bcc1a3]">F</span>
        </div>
        <div
          id="inputSearch"
          className="search z-40 relative max-lg:hidden bg-[#f4f4f4] w-80 flex items-center rounded-md px-2 duration-300"
        >
          <Link to={"/results/search"}>
            <CiSearch
              className="text-[#959fa8] h-6 w-6 font-bold cursor-pointer"
              onClick={() => dispatch(reset())}
            />
          </Link>
          <input
            type="text"
            placeholder="Search"
            value={search}
            className="w-full focus:outline-none bg-transparent p-2 px-2 text-[#959fa8] placeholder:text-[#959fa8]"
            onChange={handlerChange}
            onBlur={() => {
              let blur = document.querySelector(".blur");
              let container = document.querySelector("#inputSearch");
              container.classList.add("w-80");
              container.classList.remove("w-[620px]");
              blur.classList.remove("h-screen");
              blur.classList.add("h-0");
            }}
            onFocus={() => {
              let blur = document.querySelector(".blur");
              let container = document.querySelector("#inputSearch");
              container.classList.add("w-[620px]");
              container.classList.remove("w-80");
              blur.classList.remove("h-0");
              blur.classList.add("h-screen");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log(search);
                location.href = "/results/search";
                dispatch(reset());
              }
            }}
          />
          {search.length > 0 && (
            <RxCross2
              className="h-6 w-6 text-[rgb(149,159,168)] cursor-pointer"
              onClick={() => dispatch(reset())}
            />
          )}
          {search.length > 0 && (
            <div className="items flex flex-col gap-2 bg-[#f4f4f4] w-full mx-auto absolute top-8 left-0 max-lg:hidden">
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
          )}
        </div>
        <div className="overall flex gap-6 items-center max-lg:gap-0 ">
          <Cart varients={`h-6 w-6 lg:h-7 md:w-7 ${icons}`} />
          <div className="favorite  max-lg:hidden">
            <Link to={"/wishlist"}>
              <div className="favorite">
                <MdFavoriteBorder className={`h-7 w-7 lg:h-8 md:w-8 cursor-pointer ${icons}`} />
              </div>
            </Link>
          </div>
          {isAuthenticated && (
            <Link to={"profile"}>
              <div className="profile max-lg:hidden">
                <div className="user">
                  <LiaUser
                    className={`h-8 w-8 lg:h-9 md:w-9 cursor-pointer ${icons}`}
                  />
                </div>
              </div>
            </Link>
          )}
          {!isAuthenticated && (
            // <Link to={"/login"}>
            <div
              className="profile max-lg:hidden"
              onClick={() => loginWithRedirect()}
            >
              <div className="user">
                <MdLogin
                  className={`h-8 w-8 lg:h-9 md:w-9 cursor-pointer ${icons}`}
                />
              </div>
            </div>
            // </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
