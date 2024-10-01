import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Cart = ({ varients }) => {
  const cart = useSelector((state) => state.cart.value);

  return (
    <Link to={"/cart"}>
      <div className="cart relative p-2 cursor-pointer">
        {cart.length !== 0 && (
          <div className="bages rounded-full bg-red-500 text-white p-[9px] absolute top-1 right-0 h-4 w-4 z-10 flex justify-center items-center text-[11px]">
            {cart.length}
          </div>
        )}
        <FiShoppingBag className={`${varients}`} />
      </div>
    </Link>
  );
};

export default Cart;
