import { useState } from "react";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";

import { RxCross2 } from "react-icons/rx";

const Filter = () => {
  const [range, setRange] = useState([3, 300]);
  const queryParameters = new URLSearchParams(window.location.search);
  const q = queryParameters.get("q");

  return (
    <div className="p-4 bg-white rounded md:mt-4 mt-0">
      <div>
        <div
          className="w-full flex justify-end items-center md:hidden"
          onClick={() => {
            const categories = document.querySelector(".categories");
            categories.classList.remove("w-[60%]");
            categories.classList.add("w-0");
            categories.classList.add("false");
            categories.classList.remove("true");
          }}
        >
          <RxCross2 className="scale-150" />
        </div>
        <h2 className="font-bold text-lg pb-2 border-b border-gray-200">
          Popular Shopping Ideas
        </h2>
        <ul className="list-none space-y-1 py-2">
          <li
            className={`${
              q === "sport-accessories" ? "text-blue-600" : ""
            } hover:text-blue-600 transition-colors cursor-pointer`}
            onClick={() => {
              location.href = "/results/search?q=sports-accessories";
            }}
          >
            Sports Accessories
          </li>
          <li
            className={`${
              q === "furniture" ? "text-blue-600" : ""
            } hover:text-blue-600 transition-colors cursor-pointer`}
            onClick={() => {
              location.href = "/results/search?q=furniture";
            }}
          >
            Furniture
          </li>
          <li
            className={`${
              q === "laptop" ? "text-blue-600" : ""
            } hover:text-blue-600 transition-colors cursor-pointer`}
            onClick={() => {
              location.href = "/results/search?q=laptop";
            }}
          >
            Laptop
          </li>
          <li
            className={`${
              q === "skin-care" ? "text-blue-600" : ""
            } hover:text-blue-600 transition-colors cursor-pointer`}
            onClick={() => {
              location.href = "/results/search?q=skin-care";
            }}
          >
            Skin care
          </li>
          <li
            className={`${
              q === "shirt" ? "text-blue-600" : ""
            } cursor-pointer hover:text-blue-600`}
            onClick={() => {
              location.href = "/results/search?q=shirt";
            }}
          >
            Shirt
          </li>
        </ul>
      </div>

      <div className="mt-4">
        <h2 className="font-bold text-lg pb-2 border-b border-gray-200">
          More-sustainable Products
        </h2>
        <div className="py-2">
          <input type="checkbox" id="climate" className="mr-2" />
          <label
            htmlFor="climate"
            className="hover:text-blue-600 transition-colors"
          >
            Climate Pledge Friendly
          </label>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="font-bold text-lg pb-2 border-b border-gray-200">
          Department
        </h2>
        <ul className="list-none space-y-1 py-2">
          <li className="hover:text-blue-600 transition-colors cursor-pointer">
            PC Gaming Keyboards
          </li>
          <li className="hover:text-blue-600 transition-colors cursor-pointer">
            Computer Keyboard & Mouse Combos
          </li>
          {/* <!-- Add more items here --> */}
        </ul>
      </div>

      <div className="mt-4">
        <h2 className="font-bold text-lg pb-2 border-b border-gray-200">
          Customer Review
        </h2>
        <div className="py-2">
          {/* <!-- This will be a star rating component, for example --> */}
          <span className="hover:text-blue-600 transition-colors">
            ★★★★☆ & Up
          </span>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="font-bold text-lg pb-2 border-b border-gray-200">
          Brands
        </h2>
        <div className="flex flex-col py-2">
          {/* <!-- Add checkboxes for each brand --> */}
          <div>
            <input type="checkbox" id="logitech" className="mr-2" />
            <label
              htmlFor="logitech"
              className="hover:text-blue-600 transition-colors"
            >
              Logitech
            </label>
          </div>
          {/* <!-- Add more brands here --> */}
        </div>
      </div>

      <div className="mt-4">
        <h2 className="font-bold text-lg pb-2 border-b border-gray-200">
          Price
        </h2>
        <div className="value font-semibold p-2">
          ${range[0]} - ${range[1]}
        </div>
        <RangeSlider
          aria-label={["min", "max"]}
          defaultValue={[3, 100]}
          onChange={(e) => {
            console.log("Range changed", e);
            setRange([e[0] * 3, e[1] * 3]);
          }}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
        <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded transition-colors">
          Go
        </button>
      </div>
    </div>
  );
};

export default Filter;
