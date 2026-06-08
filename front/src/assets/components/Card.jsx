import React from "react";
import api from "../../api/axios.js";
import { useNavigate } from "react-router-dom";
import { useEffect,  useState } from "react";


import { FaHeart } from "react-icons/fa";
import { TbHeartPlus } from "react-icons/tb";

import { BsThreeDotsVertical } from "react-icons/bs";


function Card({
  item,
  isWatchlist = false,
}) {

const [liked, setLiked] = useState(false);


const [showMenu, setShowMenu] =
  useState(false);


useEffect(() => {

  const checkWatchlist =
    async () => {

      try {

        const user =
          JSON.parse(
            localStorage.getItem(
              "User"
            )
          );

        if (!user) return;

        const res =
          await api.get(
            `/watchlist/${user._id}`
          );

        const exists =
          res.data.watchlist.some(
            (w) =>
              w.bookId?._id ===
              item._id
          );

        setLiked(exists);

      } catch (error) {

        console.log(error);

      }
    };

  checkWatchlist();

}, [item._id]);



const navigate = useNavigate();  
const isFree = item.category === "free";

const handleAddToCart = async () => {

  try {
    const user = JSON.parse(
      localStorage.getItem("User")
    );

    if (!user || !user._id) {
      alert("Please login first");
      return;
    }

    const response = await api.post(
      "/cart/add",
      {
        userId: user._id,
        bookId: item._id,
      }
    );

    if (response.data.success) {
      alert("Book added to cart 🛒");
    } else {
      alert(response.data.message || "Failed to add to cart");
    }
} catch (error) {
  console.error("Add to cart error:", error);
  
  const errorMessage = error.response?.data?.message || error.message || "Failed to add to cart";
  alert(errorMessage);
}


};


const handleWatchlist = async () => {
  try {

    const user = JSON.parse(
      localStorage.getItem("User")
    );

    if (!user || !user._id) {
      alert("Please login first");
      return;
    }

    const res = await api.post(
      "/watchlist/add",
      {
        userId: user._id,
        bookId: item._id,
      }
    );

    if (res.data.success) {

      setLiked(true);


    }

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Failed to add watchlist"
    );

  }
};


const handleRemoveWatchlist =
  async () => {

    try {

      const user =
        JSON.parse(
          localStorage.getItem("User")
        );

      await api.delete(
        `/watchlist/${user._id}/${item._id}`
      );

      setLiked(false);

      if (isWatchlist) {
        window.location.reload();
      }

    } catch (error) {

      console.log(error);

      alert(
        "Failed to remove watchlist"
      );

    }
  };


const handleMoveToCart = async () => {
  try {

    const user = JSON.parse(
      localStorage.getItem("User")
    );

    await api.post(
      "/cart/add",
      {
        userId: user._id,
        bookId: item._id,
      }
    );

    await api.delete(
      `/watchlist/${user._id}/${item._id}`
    );

    alert("Moved to Cart");

    window.location.reload();

  } catch (error) {

    console.log(error);

    alert("Failed to move to cart");

  }
};



return ( <div className="h-full px-1"> 
<div
  onClick={() =>
    navigate(`/book/${item._id}`)
  }
  className="
    relative
    card
    bg-white
    text-slate-900
    shadow-md
    border
    border-gray-200
    dark:border-slate-700
    w-full
    h-full
    min-h-[380px]
    flex
    flex-col
    hover:scale-[1.02]
    duration-200
    dark:bg-slate-800
    dark:text-white
    cursor-pointer
  "
>

{isWatchlist ? (

  <>
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
      }}
      className="
        absolute
        top-2
        right-2
        z-20
        p-1
        text-black
      "
    >
      <BsThreeDotsVertical
        className="text-black dark:text-white text-xl"
      />
    </button>

    {showMenu && (
      <div
        className="
          absolute
          top-12
          right-2
          z-30
          bg-white
          rounded-md
          shadow-lg
          border
          p-2
        "
      >

<button
  onClick={(e) => {
    e.stopPropagation();
    handleMoveToCart();
  }}
  className="
    block
    w-full
    text-left
    px-4
    py-2
    text-sm
    text-red-500
    hover:bg-gray-100
    cursor-pointer
  "
>
  Move To Cart
</button>


 <button
  onClick={(e) => {
    e.stopPropagation();
    handleRemoveWatchlist();
  }}
  className="
    block
    w-full
    text-left
    px-4
    py-2
    text-sm
    text-red-500
    hover:bg-gray-100
    cursor-pointer
  "
>
  Remove from Watchlist
</button>
      </div>
    )}

  </>

) : (
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      handleWatchlist();
    }}
    className="
      absolute
      top-2
      right-2
      z-20
      w-6
      h-6
      rounded-full
      bg-white
      shadow-md
      flex
      items-center
      justify-center
    "
  >
    {liked ? (
      <FaHeart className="text-red-500 text-lg" />
    ) : (
      <TbHeartPlus className="text-gray-700 text-xl" />
    )}
  </button>

)}


<figure className="relative h-44 shrink-0 overflow-hidden rounded-t-2xl">

  <img
    src={item.image}
    alt={item.name}
    className="h-full w-full object-cover"
  />
</figure>


    <div className="card-body flex flex-col flex-1 gap-2 p-4">

      <div className="flex items-start justify-between gap-2 min-h-[2.5rem]">
        <h2 className="font-bold text-sm leading-snug line-clamp-2 flex-1 text-left text-slate-900 dark:text-white">
          {item.name}
        </h2>

        <span
          className={`badge shrink-0 text-xs uppercase ${
            isFree
              ? "badge-success"
              : "badge-secondary"
          }`}
        >
          {item.category}
        </span>
      </div>

      <p className="text-xs text-slate-700 dark:text-gray-300 line-clamp-3 text-left flex-1 min-h-[3rem]">
        {item.title}
      </p>

    <div className="flex items-center gap-2 mt-2">

  <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
    ⭐ {item.rating?.toFixed(1) || 0}
  </span>

  <span className="text-xs text-gray-500">
    ({item.numReviews || 0} Reviews)
  </span>

</div>



      <div className="flex items-center justify-between gap-2 pt-3 mt-auto border-t border-gray-200 dark:border-slate-600">

        <span className="badge badge-outline font-semibold text-slate-800 border-slate-400 dark:text-white dark:border-slate-500">
          {item.price === 0
            ? "Free"
            : `₹${item.price}`}
        </span>

        <button
          type="button"
         onClick={(e) => {
  e.stopPropagation();
  handleAddToCart();
}}
          className="text-xs px-3 py-1.5 rounded-full border border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white duration-300"
        >
          Add To Cart 🛒
        </button>

      </div>
    </div>
  </div>
</div>


);
}

export default Card;
