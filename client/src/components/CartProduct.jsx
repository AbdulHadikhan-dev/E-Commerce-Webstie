import { useState } from "react";
import { FaStar, FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeProduct, clearCart } from "../Redux/cartSlice";

import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

import { useAuth0 } from "@auth0/auth0-react";

import { useToast } from "@chakra-ui/react";

const ShoppingCart = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  const cart = useSelector((state) => state.cart.value);
  const authenticated = useSelector((state) => state.authenticated.value);

  const dispatch = useDispatch();
  const toast = useToast();

  console.log(cart, authenticated);

  const [deliveryForm, setDeliveryForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    additional: "",
  });

  const [creditCard, setCreditCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [promoCode, setPromoCode] = useState("");
  const [errors, setErrors] = useState({});
  const [errors2, setErrors2] = useState({});
  const [payMethod, setPayMethod] = useState("card");

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryForm({ ...deliveryForm, [name]: value });
  };

  const validateFormCard = () => {
    const newErrors = {};
    if (!creditCard.number) newErrors.number = "Card number is required";
    if (!creditCard.expiry) newErrors.expiry = "Expiry date is required";
    if (!creditCard.cvv) newErrors.cvv = "CVV is required";
    if (!creditCard.name) newErrors.name = "Name on card is required";
    setErrors({ ...newErrors, ok: false });
    return Object.keys(newErrors).length === 0;
  };

  const validateFormCash = () => {
    const newErrors = {};
    if (!deliveryForm.name) newErrors.name = "Name is required";
    if (!deliveryForm.phone)
      newErrors.phone = "Phone or Contact Number is required";
    if (!deliveryForm.zip) newErrors.zip = "zip or postal code is required";
    if (!deliveryForm.address) newErrors.address = "Address is required";
    if (!deliveryForm.city) newErrors.city = "City is required";
    if (!deliveryForm.state) newErrors.state = "State is required";
    setErrors2({ ...newErrors, ok: false });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(deliveryForm);
    // console.log(promoCode, creditCard);
    if (payMethod === "card") {
      if (validateFormCard()) {
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
        if (authenticated) {
          if (cart.length === 0) {
            alert(
              "There is no product in cart, please must be add product on cart"
            );
            return false;
          }
          // Make API call to submit order with user information
          let postData = await fetch(
            `${import.meta.env.VITE_REACT_PUBLIC_BACKEND_URL}/api/order/add`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user: JSON.parse(localStorage.getItem("user")),
                creditCard,
                promoCode,
                cart,
                totalPrice: total,
                payMethod,
                date: new Date(),
              }),
            }
          );
          let response = await postData.json();
          toast({
            title: "Order Done Successfully",
            description: "thanks for your order. order received in 2-3 days",
            status: "success",
            position: "top-right",
            duration: 9000,
            isClosable: true,
          });
          if (response.ok) {
            dispatch(clearCart());
            setCreditCard({
              number: "",
              expiry: "",
              cvv: "",
              name: "",
            });
            setPromoCode("");
          }
        } else {
          loginWithRedirect();
        }
        // console.log("Order submitted", { cart, creditCard, promoCode });
      }
    } else {
      if (validateFormCash()) {
        if (
          errors2.name === undefined &&
          errors2.city === undefined &&
          errors2.state === undefined &&
          errors2.zip === undefined &&
          errors2.phone === undefined &&
          errors2.address === undefined
        ) {
          setErrors2({ ...errors2, ok: true });
          console.log(errors2);
        }
        if (!errors2.ok) return false;
        if (authenticated) {
          if (cart.length === 0) {
            alert(
              "There is no product in cart, please must be add product on cart"
            );
            return false;
          }
          // Make API call to submit order with user information
          let postData = await fetch(
            `${import.meta.env.VITE_REACT_PUBLIC_BACKEND_URL}/api/order/add`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user: JSON.parse(localStorage.getItem("user")),
                deliveryForm,
                cart,
                totalPrice: total,
                payMethod,
                date: new Date(),
              }),
            }
          );
          let response = await postData.json();
          toast({
            title: "Order Done Successfully",
            description: "thanks for your order. order received in 2-3 days",
            status: "success",
            position: "top-right",
            duration: 9000,
            isClosable: true,
          });
          if (response.ok) {
            dispatch(clearCart());
            setDeliveryForm({
              name: "",
              phone: "",
              address: "",
              city: "",
              state: "",
              zip: "",
              additional: "",
            });
          }
        } else {
          loginWithRedirect();
        }
      }
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

  const StyledFormControlLabel = styled((props) => (
    <FormControlLabel {...props} />
  ))(({ theme }) => ({
    variants: [
      {
        props: { checked: true },
        style: {
          ".MuiFormControlLabel-label": {
            color: theme.palette.primary.main,
          },
        },
      },
    ],
  }));

  function MyFormControlLabel(props) {
    const radioGroup = useRadioGroup();

    let checked = false;

    if (radioGroup) {
      checked = radioGroup.value === props.value;
    }

    return <StyledFormControlLabel checked={checked} {...props} />;
  }

  MyFormControlLabel.propTypes = {
    /**
     * The value of the component.
     */
    value: PropTypes.any,
  };

  return (
    <div className="mx-auto p-14 w-full max-sm:p-4 mb-20 lg:mb-0">
      <h1 className="text-3xl font-bold text-center mb-4 md:hidden">
        Shopping Cart
      </h1>
      <div className="flex justify-around max-md:flex-col gap-8">
        <div className="w-1/2 max-md:w-full max-h-screen overflow-auto">
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
                  className="absolute h-44 top-[-10px] right-12 max-lg:right-6 max-md:h-36 max-md:right-4"
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
          <div className="payment-method flex-col gap-4">
            <h2 className="text-3xl font-semibold mb-4">Payment Method</h2>
            <RadioGroup name="use-radio-group" defaultValue="Credit Card">
              <MyFormControlLabel
                value="Cash on Delivery"
                label="Cash on Delivery"
                onChange={() => setPayMethod("cash")}
                control={<Radio />}
              />
              <MyFormControlLabel
                value="Credit Card"
                label="Credit Card"
                onChange={() => setPayMethod("card")}
                control={<Radio />}
              />
            </RadioGroup>
          </div>
          {payMethod === "cash" && (
            <form
              onSubmit={handleSubmit}
              className="bg-white p-4 rounded-lg shadow-md mb-4"
            >
              <h2 className="text-2xl font-semibold mb-4">
                Payment Details{" "}
                <span className="text-lg font-normal block sm:inline-block">
                  (Cash on Delivery)
                </span>
              </h2>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={deliveryForm.name}
                  onChange={handleChange}
                  className={`w-full border rounded px-3 py-2 ${
                    errors2.name ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your Name"
                />
                {errors2.name && (
                  <p className="text-red-500 text-sm mt-1">{errors2.name}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="city" className="block mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={deliveryForm.city}
                    onChange={handleChange}
                    className={`w-full border rounded px-3 py-2 ${
                      errors2.city ? "border-red-500" : ""
                    }`}
                    placeholder="Enter City Name"
                  />
                  {errors2.city && (
                    <p className="text-red-500 text-sm mt-1">{errors2.city}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="zip" className="block mb-1">
                    Zip
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={deliveryForm.zip}
                    onChange={handleChange}
                    className={`w-full border rounded px-3 py-2 ${
                      errors2.zip ? "border-red-500" : ""
                    }`}
                    placeholder="Zip or Postal Code"
                  />
                  {errors2.zip && (
                    <p className="text-red-500 text-sm mt-1">{errors2.zip}</p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block mb-1">
                  Contact Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={deliveryForm.phone}
                  onChange={handleChange}
                  className={`w-full border rounded px-3 py-2 ${
                    errors2.phone ? "border-red-500" : ""
                  }`}
                  placeholder="+92 99999999"
                />
                {errors2.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors2.phone}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="state" className="block mb-1">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={deliveryForm.state}
                  onChange={handleChange}
                  className={`w-full border rounded px-3 py-2 ${
                    errors2.state ? "border-red-500" : ""
                  }`}
                  placeholder="State or Province Name"
                />
                {errors2.state && (
                  <p className="text-red-500 text-sm mt-1">{errors2.state}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="cardName" className="block mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={deliveryForm.address}
                  onChange={handleChange}
                  className={`w-full border rounded px-3 py-2 ${
                    errors2.address ? "border-red-500" : ""
                  }`}
                  placeholder="Enter Shipping Address"
                />
                {errors2.address && (
                  <p className="text-red-500 text-sm mt-1">{errors2.address}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="promoCode" className="block mb-1">
                  Additional
                </label>
                <input
                  type="text"
                  id="additional"
                  value={promoCode}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter Additional Information"
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
          )}
          {payMethod === "card" && (
            <form
              onSubmit={handleSubmit}
              className="bg-white p-4 rounded-lg shadow-md mb-4"
            >
              <h2 className="text-2xl font-semibold mb-4">
                Payment Details{" "}
                <span className="text-lg font-normal block sm:inline-block">
                  (Card)
                </span>
              </h2>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
