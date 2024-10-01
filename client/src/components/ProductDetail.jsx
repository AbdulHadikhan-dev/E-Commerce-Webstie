import { useState } from "react";
import Navigation from "./Navigation";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { FiShoppingBag } from "react-icons/fi";
// import { FaCheck } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, addQuantity } from "../Redux/cartSlice";
// import Product from "./Product";
import { addToWishList } from "../Redux/favoraiteSlice";

const ProductDetail = () => {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  const [productDetail, setProductDetail] = useState({});
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectColor, setSelectColor] = useState(colors[0]);
  const [selectSize, setSelectSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    async function getProductDetail() {
      // fetch product data from API
      let respone = await fetch(`http://localhost:3005/product/find/${id}`);
      let r = await respone.json();
      // console.log(r);
      setProductDetail(r[0]);
      setColors(r[0].colors);
      setSizes(r[0].sizes);
    }

    getProductDetail();
  }, [id]);

  const addColor = () => {
    let colorNodeList = document.querySelectorAll(".color");
    colorNodeList.forEach((color, index) => {
      color.style.backgroundColor = `${colors[index]}`;
    });
  };
  addColor();

  const handleColor = (e) => {
    setSelectColor(e.target.id);
    console.log(selectColor, colors);
  };

  const handleSize = (e) => {
    setSelectSize(e.target.id);
    console.log(selectSize);
  };

  // Dispatching action to add a product or update its quantity
  const handleAddToCart = () => {
    if (sizes.length > 0) {
      console.log("if work", sizes);
      if (!selectColor && !selectSize) {
        alert("Please select a color and size");
        return;
      } else if (!selectColor) {
        alert("Please select a color");
        return;
      } else if (!selectSize) {
        alert("Please select a size");
        return;
      } else {
        alert("Product add Successfully");
      }
    } else {
      console.log("else work", sizes);
      if (!selectColor) {
        alert("Please select a color");
        return;
      } else {
        alert("Product add Successfully");
      }
    }

    let existingProduct = "";
    if (cart.length > 0) {
      existingProduct = cart.find((product) => {
        let { _id } = product;
        let id = _id.slice(0, 24);
        console.log(_id, id);
        return (
          id === productDetail._id &&
          product.color === selectColor &&
          product.size === selectSize
        );
      });
    }

    if (existingProduct) {
      dispatch(
        addQuantity({
          ...existingProduct,
          quantity: [quantity],
        })
      );
    } else {
      dispatch(
        addProduct({
          _id: productDetail._id + selectColor + "-" + selectSize,
          company: productDetail.company,
          name: productDetail.name,
          description: productDetail.description,
          quantity,
          price: productDetail.price,
          discount: productDetail.discount > 0 ? productDetail.discount : false,
          color: selectColor,
          size: selectSize,
          sizes,
          image: productDetail.image,
          rate: productDetail.rate,
          // favorite: false,
        })
      );
    }
    setQuantity(1);
  };

  const handleExplore = () => {
    console.log("explore");
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

  // console.log(colors, sizes, productDetail.sizes);
  return (
    //? this is my own implementation.
    <div className="product-detail py-4 mb-12 sm:mb-0">
      <Navigation heading={"Detail Product"} screen={"lg:hidden"} />
      <div className="flex max-sm:flex-col">
        <div className="img h-1/2 2xl:h-1/3 sm:w-1/2 sm:ml-2 flex gap-2 justify-end">
          <div className="images flex flex-col gap-2 max-sm:hidden justify-between 2xl:justify-normal items-end">
            <img
              src={productDetail.image}
              alt={productDetail.name}
              className="h-20 rounded-lg w-full lg:h-28 2xl:h-36 cursor-pointer"
            />
            <img
              src={productDetail.image}
              alt={productDetail.name}
              className="h-20 rounded-lg w-full lg:h-28 2xl:h-36 cursor-pointer"
            />
            <img
              src={productDetail.image}
              alt={productDetail.name}
              className="h-20 rounded-lg w-full lg:h-28 2xl:h-36 cursor-pointer"
            />
            <img
              src={productDetail.image}
              alt={productDetail.name}
              className="h-20 rounded-lg w-full lg:h-28 2xl:h-36 cursor-pointer"
            />
          </div>
          <div className="sm:w-3/4 flex justify-center items-center 2xl:h-[65vh]">
            <img
              src={productDetail.image}
              alt={productDetail.name}
              className="sm:rounded-lg sm:h-full sm:w-full"
            />
          </div>
        </div>
        <div className="information relative pl-5 pr-8 py-2 flex flex-col gap-4 sm:my-0 sm:py-0 my-3 sm:w-1/2">
          <div className="favorite absolute top-3 right-3 sm:top-5 sm:right-12">
            <CiHeart
              className="font-bold h-7 w-7 sm:h-8 sm:w-8 md:w-9 md:h-9 lg:h-10 lg:w-10 cursor-pointer"
              onClick={() => {
                dispatch(
                  addToWishList({
                    id: productDetail._id,
                    name: productDetail.name,
                    price: productDetail.price,
                    image: productDetail.image,
                    rate: productDetail.rate,
                    review: productDetail.review,
                    company: productDetail.company,
                    discount: productDetail.discount,
                  })
                );
              }}
            />
          </div>
          <div className="core flex flex-col gap-[2px] lg:gap-2">
            <div className="1 flex gap-[10px] items-center">
              <div className="company text-[#87909c] font-medium text-[15px] lg:text-base 2xl:text-lg">
                {productDetail.company}
              </div>
              <div className="flex gap-1 items-center">
                <FaStar className="text-yellow-500" />
                <div className="rate flex items-center font-semibold text-sm lg:text-base 2xl:text-lg">
                  {productDetail.rate}
                </div>
                <div className="review text-[#87909c] text-sm lg:text-base 2xl:text-lg">
                  ({productDetail.review})
                </div>
              </div>
            </div>
            <div className="2 text-xl font-semibold sm:text-2xl lg:text-3xl 2xl:text-4xl">
              {productDetail.name}
            </div>
            <div className="3">
              {productDetail.discount > 0 &&
                productDetail.discount < productDetail.price && (
                  <div className="flex gap-2 items-center">
                    <div className="discount-price text-[#ee2146] text-xl sm:text-xl lg:text-2xl 2xl:text-3xl font-medium">
                      ${productDetail.discount}.00
                    </div>
                    <div className="previous-price text-[#959fa8]  text-base sm:text-lg lg:text-xl 2xl:text-2xl line-through font-medium">
                      ${productDetail.price}.00
                    </div>
                  </div>
                )}
              {!productDetail.discount && (
                <div className="price font-medium text-lg sm:text-xl lg:text-2xl 2xl:text-3xl">
                  ${productDetail.price}.00
                </div>
              )}
            </div>
          </div>
          <div className="desc text-[#8a9096] text-base sm:text-sm lg:text-base 2xl:text-lg">
            {productDetail.description}
          </div>
          <div className="color-sizes flex 2xl:flex-col 2xl:gap-6">
            <div className="colors w-1/2 flex flex-col gap-2">
              <div className="heading text-[15px] font-medium">Colors</div>
              <div className="flex gap-3 flex-wrap">
                {colors.map((color) => {
                  return (
                    <div
                      className={`color rounded-full h-10 w-10 cursor-pointer border-2 border-transparent hover:border-black transition-transform transform hover:scale-110 flex justify-center items-center`}
                      id={color}
                      key={color}
                      onClick={handleColor}
                    >
                      {/* <FaCheck className="text-white" /> */}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="size w-1/2 flex flex-col gap-2">
              <div className="heading text-[15px] font-medium">Size</div>
              <div className="flex gap-3 flex-wrap">
                {sizes.map((size) => {
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
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="heading text-[15px] font-medium">Quantity</div>
            <div className="quantity flex gap-2 font-semibold text-2xl items-center mx-2">
              <div className="1 cursor-pointer" onClick={handleMin}>
                -
              </div>
              <div className="2">{quantity}</div>
              <div className="3 cursor-pointer" onClick={handleAdd}>
                +
              </div>
            </div>
          </div>
          <div className="add-to-cart flex lg:flex-col gap-2 py-2">
            <button
              className="add-to-cart border border-black p-2 text-base w-full flex gap-2 items-center font-semibold justify-center cursor-pointer hover:bg-slate-100 duration-200"
              onClick={handleAddToCart}
            >
              <FiShoppingBag className="scale-125" />
              ADD TO CART
            </button>
            <Link
              to={"/explore"}
              className="border border-black p-2 text-base w-full flex gap-2 items-center font-semibold justify-center bg-black text-white cursor-pointer hover:text-slate-200 duration-200"
              onClick={handleExplore}
            >
              Explore More
            </Link>
          </div>
        </div>
      </div>
      {/* <div className="related-product max-sm:hidden">
        <Product />
      </div> */}
    </div>
  );
};

export default ProductDetail;
