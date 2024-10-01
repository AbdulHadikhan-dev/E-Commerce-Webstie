import { useSelector, useDispatch } from "react-redux";
import { removeFavoriteProduct } from "../Redux/favoraiteSlice";

const WishList = () => {
  const favorites = useSelector((state) => state.favorites.value);
  const dispatch = useDispatch();

  const handleDelete = (product) => {
    dispatch(removeFavoriteProduct(product));
  };
  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 sm:mb-0">
          Your Favorites
        </h1>
        <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-600 transition duration-300">
          Sort by Price
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((product) => {
          return (
            <div
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              key={product._id}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  {product.name}
                </h2>
                <p className="text-lg text-gray-500 mb-4">${product.price}.00</p>
                <button
                  className="bg-red-500 text-white w-full py-2 rounded-lg hover:bg-red-600 transition duration-300"
                  onClick={() => handleDelete(product)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishList;
