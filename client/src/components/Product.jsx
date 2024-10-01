import { useSelector, useDispatch } from "react-redux";
import { addToWishList } from "../Redux/favoraiteSlice";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";

const Product = ({
  id,
  name,
  discount,
  price,
  image,
  review,
  rate,
  company,
  favorite,
}) => {
  const favorites = useSelector((state) => state.favorites.value);
  const dispatch = useDispatch();

  // console.log(favorites);

  return (
    <div className="relative w-[45%] md:w-[48%] lg:w-[50%] xl:w-1/4">
      <div
        className={`favoraite absolute top-2 right-2 bg-[#b4b3b3] rounded-full p-1 md:p-2 md:top-8 md:right-8 lg:top-14 lg:right-10 z-10 cursor-pointer`}
        onClick={() => {
          dispatch(
            addToWishList({
              id,
              name,
              price,
              image,
              rate,
              review,
              company,
              discount,
            })
          );
          console.log(favorites);
        }}
      >
        {favorite && (
          <FaHeart className="font-bold md:h-6 md:w-6 lg:h-8 lg:w-8 text-red-600" />
        )}
        {!favorite && (
          <CiHeart className="font-bold md:h-6 md:w-6 lg:h-8 lg:w-8 text-white" />
        )}
      </div>
      <Link
        to={`/product/${id}`}
        className="product relative flex flex-col gap-[2px] md:gap-1 lg:gap-1 "
      >
        <div className="img">
          <img
            src={image}
            alt={image}
            className="rounded-md md:scale-90 lg:relative lg:top-3"
          />
        </div>
        <div className="overall flex gap-[6px] xl:gap-2 text-[12px] md:text-base items-center md:mx-4 lg:mx-6 lg:text-xl">
          <div className="company text-gray-500 mr-1">{company}</div>
          <div className="rate flex items-center font-semibold">
            <FaStar className="text-yellow-500" />
            {rate}
          </div>
          <div className="review text-gray-500 text-[11px] md:text-sm lg:text-lg">
            ({review})
          </div>
        </div>
        <div className="name text-sm font-medium md:text-lg md:mx-4 lg:mx-6 lg:text-2xl">
          {name}
        </div>
        {discount > 0 && discount < price && (
          <div className="flex gap-2 items-center md:mx-4 lg:mx-6">
            <div className="discount-price text-[#ee2146] text-sm md:text-lg lg:text-2xl font-medium">
              ${discount}.00
            </div>
            <div className="previous-price text-[#959fa8] text-[12px] md:text-base lg:text-xl line-through font-medium">
              ${price}.00
            </div>
          </div>
        )}
        {!discount && (
          <div className="price text-sm font-medium md:text-lg md:mx-4 lg:mx-6 lg:text-2xl">
            ${price}.00
          </div>
        )}
      </Link>
    </div>
  );
};

export default Product;
