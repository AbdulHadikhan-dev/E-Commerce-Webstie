// import { useEffect, useState } from "react";
// import Navigation from "./Navigation";
// import { useSelector, useDispatch } from "react-redux";
// import { increment, decrement, removeProduct } from "../Redux/cartSlice";
// import { MdDelete } from "react-icons/md";
// import { FaHeart } from "react-icons/fa";
// import { FiMinus } from "react-icons/fi";
// import { FaPlus } from "react-icons/fa6";

// const CartProduct = () => {
//   const [totalPrice, setTotalPrice] = useState(0);

//   const cart = useSelector((state) => state.cart.value);
//   const dispatch = useDispatch();

//   //   const removeFromCart = (productId) => {
//   //     dispatch(removeProduct(productId));
//   //   };

//   useEffect(() => {
//     setTotalPrice(0);
//     cart.forEach((product) => {
//       if (!product.discount) {
//         setTotalPrice((prev) => prev + product.price * product.quantity);
//       } else {
//         setTotalPrice((prev) => prev + product.discount * product.quantity);
//       }
//     });
//   }, [cart]);

//   const handleIncrement = (product) => {
//     dispatch(increment(product));
//   };

//   const handleDecrement = (product) => {
//     dispatch(decrement(product));
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <Navigation heading={"Shopping Cart"} screen={"lg:hidden"} />
//       <section className="bg-white shadow-md rounded-lg p-4 my-4">
//         {cart.length === 0 && (
//           <div className="there is no product yet text-2xl lg:text-3xl font-semibold text-center">
//             There is no Product Left
//           </div>
//         )}
//         <ul>
//           {cart.map((product) => {
//             // console.log(product._id);
//             return (
//               <li
//                 className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 mb-4 hover:bg-gray-50 transition-colors duration-300"
//                 key={product._id}
//               >
//                 {/* Product Image and Details */}
//                 <div className="flex items-center max-sm:w-full">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-24 h-24 object-cover rounded-lg shadow-sm mr-4"
//                   />
//                   <div>
//                     <h2 className="text-lg font-semibold text-gray-800 md:text-xl lg:text-2xl hover:text-indigo-600 transition-colors duration-300">
//                       {product.name}
//                     </h2>
//                     <div className="text-green-500 font-semibold">In Stock</div>
//                     <div className="color flex items-center gap-2 mt-2">
//                       <span className="text-gray-600">Color:</span>
//                       <div
//                         className="rounded-full flex justify-center items-center p-4 h-7 w-7 border"
//                         style={{ backgroundColor: product.color }}
//                       ></div>
//                     </div>
//                     <div className="size flex items-center gap-2 mt-2">
//                       <span className="text-gray-600">Size:</span>
//                       <div className="rounded-full flex justify-center items-center bg-black text-white text-sm p-4 h-7 w-7">
//                         {product.size}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Product Actions and Price */}
//                 <div className="text-right flex flex-row-reverse sm:flex-col gap-2 md:gap-3 lg:gap-4 mt-4 sm:mt-0 max-sm:justify-between max-sm:w-full">
//                   {/* Display Discounted Price and Original Price if discount is available */}
//                   <p className="text-gray-800 text-xl font-bold md:text-xl lg:text-2xl max-sm:hidden">
//                     {product.discount ? (
//                       <>
//                         <span className="line-through text-gray-500 mr-2">
//                           ${product.price}.00
//                         </span>
//                         <span className="text-red-500">
//                           ${product.discount}.00
//                         </span>
//                       </>
//                     ) : (
//                       <>${product.price}.00</>
//                     )}
//                   </p>
//                   <div className="text-gray-600 flex lg:gap-2 items-center justify-end max-sm:hidden">
//                     <div
//                       className="decrement cursor-pointer p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
//                       onClick={() => handleDecrement(product)}
//                     >
//                       <FiMinus />
//                     </div>
//                     <span className="font-semibold text-xl">
//                       {product.quantity}
//                     </span>
//                     <div
//                       className="increment cursor-pointer p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
//                       onClick={() => handleIncrement(product)}
//                     >
//                       <FaPlus />
//                     </div>
//                   </div>
//                   <div className="sm:hidden">
//                   <p className="text-gray-800 text-xl font-bold md:text-xl lg:text-2xl">
//                     {product.discount ? (
//                       <>
//                         <span className="line-through text-gray-500 mr-2">
//                           ${product.price}.00
//                         </span>
//                         <span className="text-red-500">
//                           ${product.discount}.00
//                         </span>
//                       </>
//                     ) : (
//                       <>${product.price}.00</>
//                     )}
//                   </p>
//                     <div className="text-gray-600 flex gap-2 md:gap-3 lg:gap-3 items-center justify-end">
//                       <div
//                         className="decrement cursor-pointer p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
//                         onClick={() => handleDecrement(product)}
//                       >
//                         <FiMinus />
//                       </div>
//                       <span className="font-semibold">{product.quantity}</span>
//                       <div
//                         className="increment cursor-pointer p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
//                         onClick={() => handleIncrement(product)}
//                       >
//                         <FaPlus />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-start">
//                     <button className="text-gray-600 hover:text-red-500 flex gap-1 font-bold items-center transition-colors duration-300">
//                       <FaHeart className="h-5 w-5" />
//                       Save
//                     </button>
//                     <div className="hidden sm:block h-4 w-[1px] bg-gray-400"></div>
//                     <button
//                       className="text-gray-600 hover:text-red-500 flex gap-1 font-bold items-center transition-colors duration-300"
//                       onClick={() => dispatch(removeProduct(product))}
//                     >
//                       <MdDelete className="h-5 w-5 lg:w-6 lg:h-6" />
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       </section>

//       <section className="bg-white shadow-md rounded-lg p-4 mb-20">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-gray-800">Total</h2>
//           <p className="text-2xl font-bold text-gray-800">${totalPrice}.00</p>
//         </div>
//         <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
//           Proceed to Checkout
//         </button>
//       </section>
//     </div>
//   );
// };

// export default CartProduct;

import { useState } from "react";
import { FaStar, FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeProduct, clearCart } from "../Redux/cartSlice";

import { useAuth0 } from "@auth0/auth0-react";

const ShoppingCart = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  console.log(cart);
  // const [cartItems, setCartItems] = useState([
  //   {
  //     id: 1,
  //     name: "Classic T-Shirt",
  //     price: 29.99,
  //     quantity: 1,
  //     size: "M",
  //     rating: 4,
  //   },
  //   {
  //     id: 2,
  //     name: "Denim Jeans",
  //     price: 59.99,
  //     quantity: 1,
  //     size: "L",
  //     rating: 5,
  //   },
  // ]);

  const [creditCard, setCreditCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [promoCode, setPromoCode] = useState("");
  const [errors, setErrors] = useState({});

  const updateQuantityFun = (item, newQuantity) => {
    console.log("updateQuantity", item);
    dispatch(updateQuantity({ item, newQuantity }));
  };

  const updateSize = (id, newSize) => {
    dispatch(
      cart.map((item) => (item.id === id ? { ...item, size: newSize } : item))
    );
  };

  const updateRating = (id, newRating) => {
    dispatch(
      cart.map((item) =>
        item.id === id ? { ...item, rating: newRating } : item
      )
    );
  };

  const removeItem = (product) => {
    dispatch(removeProduct(product));
  };

  const handleCreditCardChange = (e) => {
    const { name, value } = e.target;
    setCreditCard({ ...creditCard, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!creditCard.number) newErrors.number = "Card number is required";
    if (!creditCard.expiry) newErrors.expiry = "Expiry date is required";
    if (!creditCard.cvv) newErrors.cvv = "CVV is required";
    if (!creditCard.name) newErrors.name = "Name on card is required";
    setErrors({ ...newErrors, ok: false });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (
        errors.number === undefined &&
        errors.expiry === undefined &&
        errors.cvv === undefined &&
        errors.name === undefined
      ) {
        setErrors({ ...errors, ok: true });
        console.log(errors);
      }
      if (!errors.ok) return false;
      if (cart.length === 0) {
        alert(
          "There is no product in cart, please must be add product on cart"
        );
        return false;
      }
      if (isAuthenticated) {
        if (cart.length === 0) {
          alert(
            "There is no product in cart, please must be add product on cart"
          );
          return false;
        }
        // Make API call to submit order with user information
        let postData = await fetch(`${import.meta.env.VITE_REACT_PUBLIC_BACKEND_URL}/order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user,
            creditCard,
            promoCode,
            cart,
          }),
        });
        let response = await postData.json();
        alert(response.msg);
        if (response.ok) {
          dispatch(clearCart());
          setCreditCard({
            number: "",
            expiry: "",
            cvv: "",
            name: "",
          });
        }
      } else {
        loginWithRedirect();
      }
      // console.log("Order submitted", { cart, creditCard, promoCode });
    }
  };

  const subtotal = cart.reduce((sum, item) => {
    if (item.discount) {
      return sum + item.discount * item.quantity;
    } else {
      return sum + item.price * item.quantity;
    }
  }, 0);
  const discount = promoCode === "SUMMER10" ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  return (
    <div className="mx-auto p-14 w-full max-sm:p-4 mb-20 lg:mb-0">
      <h1 className="text-3xl font-bold text-center mb-4 md:hidden">
        Shopping Cart
      </h1>
      <div className="flex justify-around max-md:flex-col gap-8">
        <div className="w-1/2 max-md:w-full">
          {cart.length === 0 && (
            <div className="text-center text-xl md:text-2xl lg:text-4xl font-bold">
              There is no product Left in Cart
            </div>
          )}
          {cart.map((item) => {
            // console.log(item)
            return (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-md mb-4 relative"
              >
                <img
                  src={item.image[0]}
                  alt={item.title}
                  className="absolute h-44 top-[-10px] right-12"
                />
                <div className="flex justify-between items-center mb-2 w-1/2">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <button
                    onClick={() => removeItem(item)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Remove item"
                  >
                    <FaTrash className="absolute top-5 right-5" />
                  </button>
                </div>
                {!item.discount && (
                  <p className="text-gray-600 mb-2 w-1/2">
                    ${item.price.toFixed(2)}
                  </p>
                )}
                {item.discount && (
                  <p className="text-gray-600 mb-2">${item.discount}</p>
                )}
                <div className="flex items-center mb-2 w-1/2">
                  <label htmlFor={`quantity-${item.id}`} className="mr-2">
                    Quantity:
                  </label>
                  <input
                    type="number"
                    id={`quantity-${item.id}`}
                    min="1"
                    value={item.quantity}
                    onChange={(e) => {
                      let value = parseInt(e.target.value);
                      updateQuantityFun(item, value);
                    }}
                    className="border rounded px-2 py-1 w-16"
                  />
                </div>
                {item.sizes.length > 0 && (
                  <div className="flex items-center mb-2 w-1/2">
                    <span className="mr-2">Size:</span>
                    {item.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => updateSize(item.id, size)}
                        className={`mr-1 px-2 py-1 rounded ${
                          item.size === size
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
                <div className="flex items-center w-1/2">
                  <span className="mr-2">Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => updateRating(item.id, star, item.rating)}
                      className={`mr-1 ${
                        star <= item.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      aria-label={`Rate ${star} stars`}
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-lg shadow-md mb-4"
          >
            <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block mb-1">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="number"
                value={creditCard.number}
                onChange={handleCreditCardChange}
                className={`w-full border rounded px-3 py-2 ${
                  errors.number ? "border-red-500" : ""
                }`}
                placeholder="1234 5678 9012 3456"
              />
              {errors.number && (
                <p className="text-red-500 text-sm mt-1">{errors.number}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="expiry" className="block mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  value={creditCard.expiry}
                  onChange={handleCreditCardChange}
                  className={`w-full border rounded px-3 py-2 ${
                    errors.expiry ? "border-red-500" : ""
                  }`}
                  placeholder="MM/YY"
                />
                {errors.expiry && (
                  <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
                )}
              </div>
              <div>
                <label htmlFor="cvv" className="block mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={creditCard.cvv}
                  onChange={handleCreditCardChange}
                  className={`w-full border rounded px-3 py-2 ${
                    errors.cvv ? "border-red-500" : ""
                  }`}
                  placeholder="123"
                />
                {errors.cvv && (
                  <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="cardName" className="block mb-1">
                Name on Card
              </label>
              <input
                type="text"
                id="cardName"
                name="name"
                value={creditCard.name}
                onChange={handleCreditCardChange}
                className={`w-full border rounded px-3 py-2 ${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="promoCode" className="block mb-1">
                Promo Code
              </label>
              <input
                type="text"
                id="promoCode"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter promo code"
              />
            </div>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span>
                    {item.title} x {item.quantity}
                  </span>
                  {!item.discount && (
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  )}
                  {item.discount && (
                    <span>${(item.discount * item.quantity).toFixed(2)}</span>
                  )}
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
