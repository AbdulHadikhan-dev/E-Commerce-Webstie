import React from "react";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";

const Filter = () => {
  return (
    <div className="p-4 bg-white rounded mt-4">
      <div>
        <h2 className="font-bold text-lg pb-2 border-b border-gray-200">
          Popular Shopping Ideas
        </h2>
        <ul className="list-none space-y-1 py-2">
          <li className="hover:text-blue-600 transition-colors cursor-pointer">
            Wireless
          </li>
          <li className="hover:text-blue-600 transition-colors cursor-pointer">
            Tablet
          </li>
          <li className="hover:text-blue-600 transition-colors cursor-pointer">
            Laptop
          </li>
          <li className="hover:text-blue-600 transition-colors cursor-pointer">
            Mechanical
          </li>
          <li className="cursor-pointer text-blue-500 hover:underline">
            See more
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
        <div className="value font-semibold p-2">$3 - $230</div>
        <RangeSlider aria-label={["min", "max"]} defaultValue={[10, 30]}>
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
