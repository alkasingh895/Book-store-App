import React, {
  useState,
  useEffect,
} from "react";

import {
  loadStripe,
} from "@stripe/stripe-js";

import api from "../api/axios";


import { useNavigate , useLocation } from "react-router-dom";

function Checkout() {

const stripePromise =
  loadStripe(
    "pk_test_xxxxxxxxx"
  );


  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  const [cartItems, setCartItems] =
    useState([]);


const location = useLocation();

const buyNowBook =
  location.state?.buyNowBook;



  const [formData, setFormData] =
  useState({
    fullName: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternatePhone: "",
  });

  useEffect(() => {
    fetchCart();
  }, []);


  const fetchCart = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("User")
      );

      if (!user) return;

      const res = await api.get(
  `/cart/${user._id}`
);
      setCartItems(res.data.cartItems);
    } catch (error) {
      console.log(error);
    }
  };

  const totalItems = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      item.bookId.price *
        item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };



  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.fullName.trim().length < 3) {
    alert("Enter valid full name");
    return;
  }

  if (!/^[6-9]\d{9}$/.test(formData.phone)) {
    alert("Enter valid mobile number");
    return;
  }

  if (!/^\d{6}$/.test(formData.pincode)) {
    alert("Enter valid pincode");
    return;
  }

  if (formData.address.trim().length < 10) {
    alert("Enter complete address");
    return;
  }

  if (!formData.city.trim()) {
    alert("Enter city");
    return;
  }

  if (!formData.state.trim()) {
    alert("Enter state");
    return;
  }


   console.log(formData);
  console.log(cartItems);

 const user = JSON.parse(
  localStorage.getItem("User")
);

try {

if (
  paymentMethod === "CARD" ||
  paymentMethod === "UPI"
) {

  console.log(
    "FRONTEND CART =",
    cartItems
  );

  const response =
    await api.post(
  "/payment/create-checkout-session",
      {
        userId: user._id,

        cartItems:
          buyNowBook
            ? [
                {
                  bookId: buyNowBook,
                  quantity: 1,
                },
              ]
            : cartItems,

        formData,

        paymentMethod,

        totalAmount:
          buyNowBook
            ? buyNowBook.price
            : totalPrice,
      }
    );

  window.location.href =
    response.data.session_url;

  return;
}
console.log("PAYMENT METHOD =", paymentMethod);
console.log("CART ITEMS =", cartItems);
console.log("TOTAL PRICE =", totalPrice);



  const res =await api.post(
  "/order/create",
  {
    userId: user._id,

    items: buyNowBook
      ? [
          {
            bookId: buyNowBook._id,
            quantity: 1,
          },
        ]
      : cartItems,

    ...formData,

    paymentMethod,

    totalAmount: buyNowBook
      ? buyNowBook.price
      : totalPrice,
  }
);

  console.log(res.data);

  alert("Order Placed Successfully 🎉");


  if (!buyNowBook) {
  await api.delete(
  `/cart/clear/${user._id}`
);
}

navigate("/my-orders");

} catch (error) {

  console.log("FULL ERROR =", error);

  console.log(
    "BACKEND ERROR =",
    error.response?.data
  );

  alert(
    error.response?.data?.message ||
    "Order Failed"
  );
}
  };

  return (
<div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex justify-center items-center p-6">

<div className="bg-white dark:bg-slate-800 w-full max-w-2xl p-8 rounded-2xl shadow-xl">


 {/* Back Button */}

<div className="mb-4">
<button
  onClick={() => navigate("/cart")}
  className="
  px-3
  py-2
  rounded-lg
  bg-slate-200
  dark:bg-slate-700
  text-slate-800
  dark:text-white
  hover:scale-105
  duration-300
  "
>
  ← Back To Cart
</button>
</div>




{/* Heading */}
 <h1 className="text-3xl font-bold text-center mb-6 text-slate-800 dark:text-white">
 Checkout
</h1>

<form
  onSubmit={handleSubmit}
  className="space-y-4"
>


  {/* name */}
 <input
  type="text"
  name="fullName"
  placeholder="Full Name"
  value={formData.fullName}
  onChange={handleChange}
  className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
  required
/>

          {/* Phone */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="
              w-full
              p-3
              border
              rounded-lg
              dark:bg-slate-700
              dark:text-white
            "
            required
          />


        <div className="grid md:grid-cols-2 gap-4">

  <input
    type="text"
    name="pincode"
    placeholder="Pincode"
    value={formData.pincode}
    onChange={handleChange}
    className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
    required
  />

  <input
    type="text"
    name="locality"
    placeholder="Locality"
    value={formData.locality}
    onChange={handleChange}
    className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
    required
  />

</div>

 <textarea
  name="address"
  placeholder="House No, Building Name, Street, Area"
  value={formData.address}
  onChange={handleChange}
  className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
  rows="4"
  required
/>

<div className="grid md:grid-cols-2 gap-4">

  <input
    type="text"
    name="city"
    placeholder="City / District / Town"
    value={formData.city}
    onChange={handleChange}
    className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
    required
  />

  <input
    type="text"
    name="state"
    placeholder="State"
    value={formData.state}
    onChange={handleChange}
    className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
    required
  />

</div>

<div className="grid md:grid-cols-2 gap-4">

  <input
    type="text"
    name="landmark"
    placeholder="Landmark (Optional)"
    value={formData.landmark}
    onChange={handleChange}
    className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
  />

  <input
    type="text"
    name="alternatePhone"
    placeholder="Alternate Phone (Optional)"
    value={formData.alternatePhone}
    onChange={handleChange}
    className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
  />

</div>


<h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">
  Delivery Address
</h2>



{/* Payment Method */}
          <div>
            <h3 className="font-semibold mb-3 text-slate-800 dark:text-white">
              Payment Method
            </h3>

            <div className="space-y-2 text-slate-800 dark:text-white">

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="COD"
                  checked={
                    paymentMethod ===
                    "COD"
                  }
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                />
                Cash On Delivery
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="UPI"
                  checked={
                    paymentMethod ===
                    "UPI"
                  }
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                />
                UPI
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="CARD"
                  checked={
                    paymentMethod ===
                    "CARD"
                  }
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                />
                Credit / Debit Card
              </label>

            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-xl">

            <h2 className="font-bold text-lg mb-3 text-slate-800 dark:text-white">
              Order Summary
            </h2>

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between text-sm mb-2 text-slate-700 dark:text-white"
              >
                <span>
                  {item.bookId.name}
                  {" "}
                  ×{" "}
                  {item.quantity}
                </span>

                <span>
                  ₹
                  {item.bookId.price *
                    item.quantity}
                </span>
              </div>
            ))}

            <hr className="my-3" />

            <div className="flex justify-between text-slate-800 dark:text-white">
              <span>
                Total Items
              </span>
              <span>
                {totalItems}
              </span>
            </div>

            <div className="flex justify-between text-xl font-bold text-pink-500 mt-2">
              <span>
                Total Amount
              </span>
              <span>
                ₹ {totalPrice}
              </span>
            </div>

          </div>

          {/* Place Order */}
          <button
  type="submit"
  className="
  w-full
  mt-4
  bg-pink-500
  hover:bg-pink-600
  text-white
  py-3
  rounded-xl
  font-bold
  text-lg
  shadow-lg
  transition
  cursor-pointer
  "
>
  Place Order
</button>

        </form>
      </div>
    </div>
  );
}

export default Checkout;