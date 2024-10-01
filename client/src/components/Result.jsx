import React, { useEffect, useState } from "react";
import { PiFire } from "react-icons/pi";
import { FiFilter } from "react-icons/fi";
import Product from "./Product";
import Filter from "./Filter";

const Search = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetching data from the API
      const url = "http://localhost:3000/product/all";
      const response = await fetch(url);
      let r = await response.json();
      setProduct(r);
    };
    fetchData();
  }, []);

  window.addEventListener("click", () => {
    const categories = document.querySelector(".categories");
    categories.classList.remove("fixed");
    categories.classList.remove("w-[60%]");
    categories.classList.remove("right-0");
    categories.classList.remove("top-0");
    categories.classList.remove("z-50");
    categories.classList.add("w-0");
    categories.classList.add("Filter");
  });
  return (
    <div className="main w-full flex h-screen results-container">
      <div className="categories w-0 md:w-[20%] overflow-hidden Filter">
        <Filter />
      </div>
      <div className="results w-full md:w-[80%]">
        <div className="search py-3 px-4">
          <h2 className="font-semibold text-2xl">Results</h2>
          <span className="">15 items found for &quot;Keyboard&quot;</span>
        </div>
        <div className="sort flex justify-between items-center px-5 lg:px-12 my-4 md:hidden">
          <div className="sale flex gap-1 items-center font-semibold">
            <span>Sale</span>
            <PiFire className="h-5 w-5" />
          </div>
          <div
            className="flex flex-row-reverse gap-1 items-center font-semibold z-40"
            onClick={() => {
              const categories = document.querySelector(".categories");
              categories.classList.add("fixed");
              categories.classList.add("w-[60%]");
              categories.classList.add("right-0");
              categories.classList.add("top-0");
              categories.classList.add("z-50");
              categories.classList.remove("w-0");
              categories.classList.remove("Filter");
            }}
          >
            <span>Filter</span>
            <FiFilter />
          </div>
        </div>
        <div className="container bg-[#fff] flex flex-wrap px-2 lg:px-4 justify-between xl:justify-start gap-y-6 py-2 lg:py-0">
          {product.map((product) => {
            return (
              <Product
                key={product._id}
                id={product._id}
                name={product.name}
                company={product.company}
                rate={product.rate}
                price={product.price}
                discount={product.discount}
                review={product.review}
                image={product.image}
                favorite={product.favorite}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
