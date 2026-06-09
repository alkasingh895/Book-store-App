import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Cart() {
    const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

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
  console.log(error.response?.data);
  alert(error.response?.data?.message || error.message);
}
  };

  const removeFromCart = async (cartId) => {
    try {
      await api.delete(
  `/cart/${cartId}`
);
      fetchCart();
    } catch (error) {
      console.log(error);
      alert("Failed to remove item");
    }
  };

  const updateQuantity = async (
    bookId,
    quantity
  ) => {
    try {
      const user = JSON.parse(
        localStorage.getItem("User")
      );

     await api.put(
  "/cart/update",
        {
          userId: user._id,
          bookId,
          quantity,
        }
      );

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      item.bookId.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 p-6 md:p-10 transition-all duration-300">


        <div className="mb-6">
  <button
    onClick={() => navigate("/course")}
    className="
      bg-pink-500
      hover:bg-pink-600
      text-white
      px-2
      py-2
      rounded-xl
      font-base
      transition-all
      duration-300
      shadow-md
      cursor-pointer
    "
  >
    ← Back to Courses
  </button>
</div>

      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-pink-500">
          🛒 Shopping Cart
        </h1>

        <p className="text-gray-500 dark:text-white mt-3">
          Review and manage your selected courses
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-10 text-center">

          <div className="text-5xl mb-4">
            🛒
          </div>

          <h2 className="text-3xl font-bold text-slate-700 dark:text-white">
            Your Cart is Empty
          </h2>

          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Add some courses to get started.
          </p>

        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="
              bg-white/80
              dark:bg-slate-800/80
              backdrop-blur-lg
              rounded-3xl
              shadow-xl
              hover:shadow-pink-500/20
              hover:-translate-y-1
              transition-all
              duration-300
              p-6
              mb-6
              flex
              flex-col
              md:flex-row
              items-center
              gap-6
              border
              border-gray-200
              dark:border-slate-700
              "
            >
              {/* Image */}
              <img

                src={item.bookId.image}
                alt={item.bookId.name}

                 onClick={() =>
    navigate(`/book/${item.bookId._id}`)
  }


                className="
                w-36
                h-36
                rounded-2xl
                object-cover
                shadow-lg
                border
                border-gray-200
                dark:border-slate-700
                "
              />

              {/* Details */}
              <div className="flex-1 w-full">

                <h2 
                onClick={() =>
    navigate(`/book/${item.bookId._id}`)
  }
                className="text-lg font-medium text-slate-800 dark:text-white">
                  {item.bookId.name}
                </h2>

                <p className="text-pink-500 text-base font-medium mt-3">
                  ₹{item.bookId.price}
                </p>

                {/* Quantity */}
                <div className="flex items-center gap-4 mt-5">

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.bookId._id,
                        item.quantity - 1
                      )
                    }
                    disabled={item.quantity <= 1}
                    className="
                    w-6
                    h-6
                    rounded-l-none
                    bg-gray-200
                    dark:bg-slate-700
                    hover:bg-gray-300
                    dark:hover:bg-slate-600
                    text-lg
                    font-semibold
                    "
                  >
                    −
                  </button>

                  <span className="text-xl font-bold text-slate-800 dark:text-white">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.bookId._id,
                        item.quantity + 1
                      )
                    }
                    className="
                    w-6
                    h-6
                    rounded-1-none
                    bg-green-500
                    hover:bg-green-600
                    text-white
                    text-lg
                    font-semibold
                    shadow-md
                    "
                  >
                    +
                  </button>

                </div>

                {/* Remove */}
                <button
                  onClick={() =>
                    removeFromCart(item._id)
                  }
                  className="
                  mt-5
                  bg-pink-500
                  hover:bg-red-600
                  text-white
                  px-3
                  py-1
                  rounded-lg
                  font-normal
                  shadow-md
                  transition
                  cursor-pointer
                  "
                >
                  🗑 
                </button>

              </div>

              {/* Subtotal */}
              <div className="text-center md:text-right">

                <p className="text-gray-500 dark:text-gray-400">
                  Subtotal
                </p>

                <p className="text-base font-medium text-pink-500">
                  ₹
                  {item.bookId.price *
                    item.quantity}
                </p>

              </div>
            </div>
          ))}

          {/* Summary Card */}
          <div className="
          bg-white
          dark:bg-slate-800
          shadow-2xl
          rounded-xl
          p-8
          mt-8
          border
          border-gray-200
          dark:border-slate-700
          ">

            <div className="flex justify-between items-center">

              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                Total Amount
              </h2>

              <h2 className="text-xl font-semibold text-pink-500">
                ₹{totalPrice}
              </h2>

            </div>

            <button

                onClick={() => navigate("/checkout")}
              className="
              w-full
              mt-6
              bg-pink-500
              hover:bg-pink-600
              text-white
              py-2
              rounded-2xl
              font-semibold
              text-sm
              shadow-lg
              transition
              cursor-pointer
              "
            >
              Proceed To Checkout
            </button>

          </div>
        </>
      )}
    </div>
  );
}

export default Cart;