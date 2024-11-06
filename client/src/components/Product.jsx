import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToWishList, removeItemFromWishList } from "../Redux/favoraiteSlice";
import { IoMdHeart } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";

import { Spinner } from "@chakra-ui/react";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Product = ({
  id,
  title,
  description,
  discount,
  price,
  image,
  reviews,
  rating,
  brand,
  stock,
  // favorite,
  hidden,
}) => {
  const favorites = useSelector((state) => state.favorites.value);
  const dispatch = useDispatch();
  const [favoraite, setFavoraite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    favorites.forEach((f) => {
      if (f.id === id) {
        setFavoraite(true);
      }
    });
  }, [favorites]);

  return (
    <div className="relative w-[45%] md:w-[48%] lg:w-[50%] xl:w-1/4">
      <div
        className={`favoraite absolute top-2 right-2 bg-[#b4b3b3] rounded-full p-1 md:p-2 h-8 w-8 md:h-10 md:w-10 flex justify-center items-center md:top-8 md:right-8 lg:top-14 lg:right-10 z-10 cursor-pointer ${hidden}`}
        onClick={() => {
          setIsLoading(true);
          console.log(favorites);
          setTimeout(() => {
            setIsLoading(false);
            let findItem = favorites.find((item) => {
              return item.id === id;
              // localStorage.setItem("favorites", JSON.stringify(favorite));
            });

            if (!findItem) {
              dispatch(
                addToWishList({
                  id,
                  title,
                  price,
                  image,
                  rating,
                  reviews,
                  brand,
                  discount,
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
        {favoraite && !isLoading && (
          <FavoriteIcon
            // fontSize="medium"
            className="h-4 w-4 lg:h-8 lg:w-8 text-red-500"
          />
        )}
        {!favoraite && !isLoading && (
          <FavoriteBorderIcon
            // fontSize="medium"
            className="text-white h-4 w-4 lg:h-8 lg:w-8"
          />
        )}
        {isLoading && (
          <Spinner
            className="h-4 w-4 lg:h-6 lg:w-6 text-white"
          />
        )}
      </div>
      <Link
        to={`/product/${id}`}
        className="product relative flex flex-col gap-[2px] md:gap-1 lg:gap-1"
      >
        <div className="img flex justify-center items-center">
          <img
            src={image}
            alt={image}
            className="rounded-md md:scale-90 lg:relative lg:top-3 border bg-gray-200 bg-cover bg-center max-h-[550px]"
          />
        </div>
        <div className="overall flex gap-[6px] xl:gap-2 text-[12px] md:text-sm items-center md:mx-4 lg:mx-6 lg:text-base">
          <div className="company text-gray-500 mr-[6px] font-medium">
            {brand ? brand : "unknown"}
          </div>
          <div className="rate flex gap-1 items-center font-semibold">
            <FaStar className="text-yellow-500" />
            {rating}
          </div>
          <div className="review text-gray-500 text-[11px] md:text-sm lg:text-base">
            ( {reviews?.length} )
          </div>
        </div>
        <div className="name text-sm font-medium md:text-lg md:mx-4 lg:mx-6 lg:text-2xl">
          {title}
          {stock === 0 && (
            <span className="text-base ml-4 text-red-500">Out Of Stock</span>
          )}
        </div>
        <div className="desciption text-[11px] md:text-sm md:mx-4 lg:mx-6 lg:text-base">
          {description.length > 50
            ? description.slice(0, 50) + "..."
            : description}
        </div>
        {/* {discount > 0 && discount < price && (
          <div className="flex gap-2 items-center md:mx-4 lg:mx-6">
            <div className="discount-price text-[#ee2146] text-sm md:text-lg lg:text-2xl font-medium">
              ${discount}
            </div>
            <div className="previous-price text-[#959fa8] text-[12px] md:text-base lg:text-xl line-through font-medium">
              ${price}
            </div>
          </div>
        )} */}
        {!discount && (
          <div className="price text-sm font-medium md:text-lg md:mx-4 lg:mx-6 lg:text-2xl">
            ${price}
          </div>
        )}
      </Link>
    </div>
  );
};

export default Product;
