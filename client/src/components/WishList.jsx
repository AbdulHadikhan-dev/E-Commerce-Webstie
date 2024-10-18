import { useSelector, useDispatch } from "react-redux";
import { removeFavoriteProduct } from "../Redux/favoraiteSlice";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const WishList = () => {
  const favorites = useSelector((state) => state.favorites.value);
  const dispatch = useDispatch();

  const handleDelete = (product) => {
    dispatch(removeFavoriteProduct(product));
  };
  console.log(favorites);
  return (
    <div className="mx-auto p-6 sm:p-8 lg:px-12 lg:py-8">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 sm:mb-0">
          Your Favorites
        </h1>
        <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-600 transition duration-300">
          Sort by Price
        </button>
      </header>

      <div className="flex flex-col sm:flex-row items-center sm:items-start flex-wrap gap-6">
        {favorites.map((product) => {
          return (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="bg-white w-full sm:w-[30%] md:w-[22%] rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  {product.title}
                </h2>
                <p className="text-lg text-gray-500 mb-4">${product.price}</p>
                <button
                  className="bg-red-500 text-white w-full py-2 rounded-lg hover:bg-red-600 transition duration-300 flex justify-center items-center gap-2"
                  onClick={() => handleDelete(product)}
                >
                  Delete <FaTrash />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default WishList;
