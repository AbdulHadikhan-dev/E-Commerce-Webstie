import { useState } from "react";
import Navigation from "./Navigation";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { IoMdHeart } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";
// import { FaCheck } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, addQuantity } from "../Redux/cartSlice";
// import Product from "./Product";
import { addToWishList, removeItemFromWishList } from "../Redux/favoraiteSlice";

import { Spinner } from "@chakra-ui/react";

const ProductDetail = () => {
  const cart = useSelector((state) => state.cart.value);
  const product = useSelector((state) => state.product.value);
  const favorites = useSelector((state) => state.favorites.value);
  const dispatch = useDispatch();

  const [productDetail, setProductDetail] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectColor, setSelectColor] = useState(colors[0]);
  const [selectSize, setSelectSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);
  // const [Alert, setAlert] = useState({});
  const [favoraite, setFavoraite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  // console.log(id);

  async function getProductDetail() {
    // fetch product data from API
    // let response = await fetch(`https://dummyjson.com/products/${id}`);
    // let data = await response.json();
    // console.log(data);
    let r = product.find((product) => product.id == id);

    setProductDetail([r]);
    // console.log(r);
  }
  console.log(favoraite, isLoading);

  useEffect(() => {
    getProductDetail();
  }, [id, product]);

  // Dispatching action to add a product or update its quantity
  const handleAddToCart = () => {
    let existingProduct = "";
    if (cart.length > 0) {
      existingProduct = cart.find((product) => {
        let { id } = product;
        if (product.color && product.size) {
          return (
            id === productDetail[0].id &&
            product.color === selectColor &&
            product.size === selectSize
          );
        } else if (product.color) {
          return id === productDetail[0].id && product.color === selectColor;
        } else if (product.size) {
          return id === productDetail[0].id && product.size === selectSize;
        } else {
          console.log("product existent", id === productDetail[0].id, id);
          return id === productDetail[0].id;
        }
      });
    }
    console.log("existingProduct", existingProduct);
    if (existingProduct) {
      dispatch(
        addQuantity({
          existingProduct,
          quantity,
        })
      );
    } else {
      dispatch(
        addProduct({
          id: productDetail[0].id,
          brand: productDetail[0].brand,
          title: productDetail[0].title,
          description: productDetail[0].description,
          quantity,
          price: productDetail[0].price,
          discount: productDetail[0].discount,
          color: selectColor,
          size: selectSize,
          sizes,
          image: productDetail[0].images,
          rating: productDetail[0].rating,
          // favorite: false,
        })
      );
    }
    setQuantity(1);
  };

  const handleMin = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      console.log(quantity);
    }
  };

  const handleAdd = () => {
    setQuantity(quantity + 1);
    console.log(quantity);
  };
  // setTimeout(()=> {

  console.log(
    "productDetail",
    productDetail,
    productDetail[0] ? productDetail[0].images[0] : "data was not loaded yet"
  );
  // }, 5000);
  // <div className="alert w-full duration-200 mb-2">{Alert.Component}</div>;
  return (
    //? this is my own implementation.
    productDetail[0] ? (
      <div className="product-detail py-4 mb-12 sm:mb-0">
        {console.log("productDetails")}
        <Navigation heading={"Detail Product"} screen={"lg:hidden"} />
        <div className="flex max-sm:flex-col">
          <div className="img h-1/2 2xl:h-1/3 sm:w-1/2 sm:ml-2 flex gap-2 justify-end max-sm:hidden">
            <div className="images flex flex-col gap-2 max-sm:hidden justify-normal 2xl:justify-normal items-center">
              {productDetail[0].images.map((item, index) => {
                return (
                  <img
                    key={item}
                    src={productDetail[0].images[index]}
                    alt={productDetail[0].title}
                    className="h-20 rounded-lg lg:h-28 2xl:h-36 cursor-pointer hover:bg-gray-200 p-3 duration-200"
                    onClick={(e) => {
                      let mainImage = document.getElementById("main-image");
                      console.log(e.target.src, mainImage);
                      mainImage.src = e.target.src;
                    }}
                  />
                );
              })}
            </div>
            <div className="sm:w-[70%] flex justify-center items-center">
              <img
                id="main-image"
                src={productDetail[0].images[0]}
                alt={productDetail[0].title}
                className="sm:rounded-lg  max-h-[700px]"
              />
            </div>
          </div>
          <div className="carousel w-full sm:hidden h-[70%]">
            {productDetail[0].images.map((image, index) => {
              return <div id={`slide${index+1}`} className="carousel-item relative w-full" key={image}>
              <img
                src={image}
                className="w-full"
                />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href={`#slide${index.length}`} className="btn btn-circle">
                  ❮
                </a>
                <a href={`#slide${index+2}`} className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
              })}
          </div>
          <div className="information relative pl-5 pr-8 py-2 flex flex-col gap-4 sm:my-0 sm:py-0 my-3 sm:w-1/2">
            <div className="core flex flex-col gap-[2px] lg:gap-2">
              <div className="1 flex gap-[10px] items-center">
                <div className="company text-[#87909c] font-medium text-[15px] lg:text-base 2xl:text-lg">
                  {productDetail[0].brand ? productDetail[0].brand : "unknown"}
                </div>
                <div className="flex gap-1 items-center">
                  <FaStar className="text-yellow-500" />
                  <div className="rate flex items-center font-semibold text-sm lg:text-base 2xl:text-lg">
                    {productDetail[0].rating}
                  </div>
                  <div className="review text-[#87909c] text-sm lg:text-base 2xl:text-lg">
                    ({productDetail[0].reviews.length})
                  </div>
                </div>
              </div>
              <div className="2 text-xl font-semibold sm:text-2xl lg:text-3xl 2xl:text-4xl">
                {productDetail[0].title}
              </div>
              <div className="3">
                {/* {productDetail.discount > 0 &&
                productDetail.discount < productDetail.price && (
                  <div className="flex gap-2 items-center">
                    <div className="discount-price text-[#ee2146] text-xl sm:text-xl lg:text-2xl 2xl:text-3xl font-medium">
                      ${productDetail.discount}.00
                    </div>
                    <div className="previous-price text-[#959fa8]  text-base sm:text-lg lg:text-xl 2xl:text-2xl line-through font-medium">
                      ${productDetail.price}.00
                    </div>
                  </div>
                )} */}
                {/* {!productDetail.discount && ( */}
                <div className="price font-medium text-lg sm:text-xl lg:text-2xl 2xl:text-3xl">
                  ${productDetail[0].price}
                </div>
                {/* )} */}
              </div>
            </div>
            <div className="description text-[#8a9096] text-base sm:text-sm lg:text-base 2xl:text-lg">
              {productDetail[0].description}
            </div>
            <div className="color-sizes flex 2xl:flex-col 2xl:gap-6">
              <div className="colors w-1/2 flex flex-col gap-2">
                {/* <div className="heading text-[15px] md:text-lg lg:text-xl font-medium">
                Colors
              </div> */}
                {/* <div className="flex gap-3 flex-wrap">
                {colors.map((color) => {
                  return (
                    <div
                      className={`color rounded-full h-10 w-10 cursor-pointer border hover:border-2 hover:border-black transition-transform transform hover:scale-110 flex justify-center items-center`}
                      id={color}
                      key={color}
                      onClick={handleColor}
                    >
                      {/* <FaCheck className="text-white" /> */}
                {/* </div>
                  {/* );
                })} */}
                {/* </div> */}
              </div>
              <div className="size w-1/2 flex flex-col gap-2">
                {/* {sizes.length > 0 && (
                <div className="heading text-[15px] md:text-lg lg:text-xl font-medium">
                  Size
                </div>
              )} */}
                <div className="flex gap-3 flex-wrap">
                  {/* {sizes.map((size) => {
                  return (
                    <div
                      className="flex items-center justify-center rounded-full h-10 w-10 border-2 cursor-pointer border-black text-black hover:bg-black hover:text-white transition-transform transform hover:scale-110"
                      key={size}
                      id={size}
                      onClick={handleSize}
                    >
                      {size}
                    </div>
                  );
                })} */}
                </div>
              </div>
            </div>
            {productDetail[0].stock === 0 && (
              <div className="out-of-stock text-red-500 text-2xl md:text-3xl lg:text-4xl font-semibold">
                Out Of Stock
              </div>
            )}
            <div
              className={`flex flex-col gap-2 ${
                productDetail[0].stock === 0 && "hidden"
              }`}
            >
              <div className="heading text-[15px] md:text-lg lg:text-xl font-medium">
                Quantity
              </div>
              <div className="quantity flex gap-2 font-semibold text-2xl items-center mx-2">
                <div className="1 cursor-pointer scale-75" onClick={handleMin}>
                  <LuMinus />
                </div>
                <div className="2">{quantity}</div>
                <div className="3 cursor-pointer scale-90" onClick={handleAdd}>
                  <LuPlus />
                </div>
              </div>
            </div>
            <div className="add-to-cart flex lg:flex-col gap-2 py-2">
              <button
                className={`add-to-cart border border-black p-2 text-base w-full flex gap-2 items-center font-semibold justify-center cursor-pointer hover:bg-slate-100 duration-200 ${
                  productDetail[0].stock === 0 && "hidden"
                }`}
                onClick={handleAddToCart}
              >
                <FiShoppingBag className="scale-125" />
                ADD TO CART
              </button>
              <button
                className={`border border-black md:p-2 p-1 text-base w-full flex md:gap-3 gap-1 items-center font-semibold justify-center bg-black text-white cursor-pointer hover:text-slate-200 duration-200 ${
                  productDetail[0].stock === 0 && "hidden"
                }`}
                onClick={() => {
                  setIsLoading(true);
                  console.log(favorites);
                  setTimeout(() => {
                    let findItem = favorites.find((item) => {
                      return item.id === productDetail[0].id;
                      // localStorage.setItem("favorites", JSON.stringify(favorite));
                    });

                    if (!findItem) {
                      dispatch(
                        addToWishList({
                          id: productDetail[0].id,
                          title: productDetail[0].title,
                          price: productDetail[0].price,
                          image: productDetail[0].image,
                          rating: productDetail[0].rating,
                          reviews: productDetail[0].reviews,
                          brand: productDetail[0].brand,
                          discount: productDetail[0].discount,
                        })
                      );
                      setFavoraite(true);
                    } else {
                      dispatch(removeItemFromWishList(findItem));
                      setFavoraite(false);
                    }
                    setIsLoading(false);
                  }, 1300);
                }}
              >
                {!favoraite && !isLoading
                  ? "Add To WishList"
                  : favoraite && !isLoading
                  ? "Remove From WishList"
                  : ""}
                {!isLoading && <IoMdHeart className="text-white scale-150" />}
                {isLoading && (
                  <Spinner className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
        {/* <div className="related-product max-sm:hidden">
        <Product />
      </div> */}
      </div>
    ) : (
      <></>
    )
  );
};

export default ProductDetail;
