import { useEffect, useState, useRef } from "react";
import { PiFire } from "react-icons/pi";
import { FiFilter } from "react-icons/fi";
import Product from "./Product";
import Filter from "./Filter";
import { useSelector, useDispatch } from "react-redux";
import { change } from "../Redux/searchSlice";

const Search = () => {
  const [products, setProducts] = useState([]);
  const search = useSelector((state) => state.search.value);
  const favoraites = useSelector((state) => state.favorites.value);
  const dispatch = useDispatch();

  const queryParameters = new URLSearchParams(window.location.search);
  const q = queryParameters.get("q");
  const [totalProducts, setTotalProducts] = useState(0);
  const cateogoryArray = useRef([
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
  ]);
  let cateogory = useRef(false);

  useEffect(() => {
    dispatch(change(q));
    cateogoryArray.current.forEach((item) => {
      if (item === q) {
        cateogory.current = true;
      }
    });
    if (cateogory.current === true) {
      fetch(`https://dummyjson.com/products/category/${q}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("cateogory data", data);
          console.log(q);
          setProducts(data.products);
          setTotalProducts(data.products.length);
        });
    } else {
      fetch(`https://dummyjson.com/products/search?q=${q}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("search", data);
          console.log(q);
          setProducts(data.products);
          setTotalProducts(data.products.length);
        });
    }
  }, []);

  return (
    <div className="main w-full flex h-screen results-container">
      <div className="categories max-md:absolute w-0 md:w-[20%] overflow-hidden false z-50 duration-300">
        <Filter />
      </div>
      <div
        className="results w-full md:w-[80%]"
        // onClick={() => {
        //   const categories = document.querySelector(".categories");
        //   categories.classList.remove("fixed");
        //   categories.classList.remove("w-[60%]");
        //   categories.classList.remove("right-0");
        //   categories.classList.remove("top-0");
        //   categories.classList.add("w-0");
        //   categories.classList.add("false");
        //   categories.classList.remove("true");
        // }}
      >
        <div className="search py-3 px-4">
          <h2 className="font-semibold text-2xl">Results</h2>
          <span className="">{totalProducts} items found for &quot;{search}&quot;</span>
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
              if (categories.classList.contains("false")) {
                categories.classList.add("w-[60%]");
                categories.classList.add("right-0");
                categories.classList.add("top-0");
                categories.classList.remove("w-0");
                categories.classList.add("true");
                categories.classList.remove("false");
                categories.classList.remove("overflow-hidden");
                categories.classList.add("overflow-auto");
              } else {
                categories.classList.remove("w-[60%]");
                categories.classList.remove("right-0");
                categories.classList.remove("top-0");
                categories.classList.add("w-0");
                categories.classList.remove("true");
                categories.classList.add("false");
                categories.classList.remove("overflow-auto");
                categories.classList.add("overflow-hidden");
              }
            }}
          >
            <span>Filter</span>
            <FiFilter />
          </div>
        </div>
        <div className="container bg-[#fff] flex flex-wrap px-2 lg:px-4 justify-between xl:justify-start gap-y-6 py-2 lg:py-0 max-h-screen overflow-auto">
          {products?.map((product) => {
            favoraites.forEach((item) => {
              if (item.id === product.id) {
                product.favorite = true;
              }
            });
            return (
              <Product
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                stock={product.stock}
                reviews={product.reviews}
                brand={product.brand}
                rating={product.rating}
                price={product.price}
                review={product.review}
                image={product.images[0]}
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
