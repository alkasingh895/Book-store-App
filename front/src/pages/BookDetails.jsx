import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";


function BookDetails() {

 const [copied, setCopied] =
  useState(false);

  const [showFullInsight, setShowFullInsight] =
  useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [aiInsight, setAiInsight] =
   useState("");

  

  useEffect(() => {
    fetchBook();
  }, [id]); // id ko dependency array mein dalna good practice hai



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
        bookId: book._id,
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


const speakInsight = () => {

  if (!aiInsight) return;

  window.speechSynthesis.cancel();

  const speech =
    new SpeechSynthesisUtterance(
      aiInsight
    );

  speech.lang = "en-US";
  speech.rate = 1;

  window.speechSynthesis.speak(
    speech
  );
};



const stopSpeech = () => {

  window.speechSynthesis.cancel();

};




const regenerateInsight =
  async () => {

    localStorage.removeItem(
      `bookInsight_${id}`
    );

    setAiInsight("");

    const aiRes = await axios.get(
      `http://localhost:5000/api/ai-recommendations/${id}`
    );

    setAiInsight(
      aiRes.data.insight
    );

    localStorage.setItem(
      `bookInsight_${id}`,
      aiRes.data.insight
    );
};




const copyInsight = async () => {

  if (!aiInsight) return;

  await navigator.clipboard.writeText(
    aiInsight
  );

  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 2000);

};



const fetchBook = async () => {
  try {

    const res = await axios.get(
      `http://localhost:5000/book/${id}`
    );

    setBook(res.data);

    const allBooks =
      await api.get("/book");

    const cachedInsight =
  localStorage.getItem(
    `bookInsight_${id}`
  );

if (cachedInsight) {

  setAiInsight(
    cachedInsight
  );

} else {

  const aiRes = await axios.get(
    `http://localhost:5000/api/ai-recommendations/${id}`
  );

  setAiInsight(
    aiRes.data.insight
  );

  localStorage.setItem(
    `bookInsight_${id}`,
    aiRes.data.insight
  );

}
   
const filteredBooks =
      allBooks.data.filter(
        (b) =>
          b.type?.toLowerCase() ===
            res.data.type?.toLowerCase() &&
          b._id !== res.data._id
      );

    setSimilarBooks(
      filteredBooks.slice(0, 4)
    );

  } catch (error) {

    console.log(error);

  }


};

  if (!book) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse text-lg font-medium text-slate-500 dark:text-slate-400">
          Loading book details...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="group mb-8 flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
      >
        <span className="transform group-hover:-translate-x-1 transition-transform">←</span> 
        Back to collection
      </button>

      {/* Main Card Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-3xl shadow-xl md:shadow-2xl overflow-hidden p-6 sm:p-10">
        
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center md:items-start">
          
          {/* Left Side: Image Section */}
          <div className="w-full max-w-[280px] sm:max-w-[320px] flex-shrink-0 aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-md hover:shadow-xl transition-shadow duration-300">
            <img
              src={book.image}
              alt={book.name}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Right Side: Details Section */}
          <div className="flex-1 w-full pt-2">
            
            {/* Title & Author/Subtitle */}
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 text-slate-900 dark:text-white">
              {book.name}
            </h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium mb-6">
              {book.title}
            </p>

            {/* Rating & Reviews Row */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <span className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full text-sm font-bold border border-amber-200/40 dark:border-amber-900/40">
                ⭐ {book.rating || "0.0"}
              </span>
              <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
                ({book.numReviews || 0} Customer Reviews)
              </span>
            </div>

            {/* Pricing Section */}
            <div className="mb-8">
              <span className="text-sm font-semibold tracking-wide text-slate-400 dark:text-slate-500 uppercase block mb-1">
                Special Price
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-pink-500 dark:text-pink-400">
                  ₹{book.price}
                </span>
                <span className="text-xs text-green-600 dark:text-green-400 font-semibold bg-green-50 dark:bg-green-950/30 px-2 py-0.5 rounded">
                  Inclusive of all taxes
                </span>
              </div>
            </div>


 {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-md">
              <button
          type="button"
         onClick={(e) => {
  e.stopPropagation();
  handleAddToCart();
}}
          className="w-full sm:flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg shadow-pink-500/20 active:scale-98 px-6 py-3.5 rounded-xl font-bold tracking-wide transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          Add To Cart 🛒
        </button>
<button
  type="button"
  onClick={() =>
    navigate("/checkout", {
      state: {
        buyNowBook: book,
      },
    })
  }
  className="w-full sm:flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg shadow-pink-500/20 active:scale-98 px-6 py-3.5 rounded-xl font-bold tracking-wide transition-all transform hover:-translate-y-0.5 cursor-pointer"
>
  ⚡ Buy Now
</button>
            </div>

          </div>
        </div>

      </div>

<div className="mt-12 bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 border border-slate-200 dark:border-slate-800">

  <div className="flex items-center justify-between mb-4">

    <h2 className="text-2xl font-bold">
      🤖 AI Book Insight
    </h2>

    <div className="flex gap-2">

      <button
        onClick={speakInsight}
        className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-400 text-white cursor-pointer "
      >
        🔊 Listen
      </button>

      <button
        onClick={stopSpeech}
        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-600 text-white cursor-pointer "
      >
        ⏹ Stop
      </button>


   <button
  onClick={copyInsight}
  className="
    px-4
     py-2
    rounded-xl
    bg-violet-600
    hover:bg-violet-400
    text-white
    cursor-pointer  
  "
>
  {copied ? "✓ Copied" : "📋 Copy"}
</button>



<button
  onClick={regenerateInsight}
  className="
   px-4
    py-2
    rounded-xl
   hover:bg-blue-300
    text-white
    cursor-pointer
  "
>
  🔄 
</button>


    </div>

  </div>

  <div className="bg-gradient-to-r from-violet-50 to-pink-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-2xl">

    <p className="text-slate-700 dark:text-slate-300 leading-8 whitespace-pre-line">
  {showFullInsight
    ? aiInsight
    : aiInsight?.slice(0, 350) +
      (aiInsight?.length > 350 ? "..." : "")}
</p>

{aiInsight?.length > 350 && (
  <button
    onClick={() =>
      setShowFullInsight(
        !showFullInsight
      )
    }
    className="
      mt-4
      text-pink-500
      font-semibold
      hover:text-pink-600
      transition
      
    "
  >
    {showFullInsight
      ? "Show Less ▲"
      : "Show More ▼"}
  </button>
)}

  </div>

</div>


<div className="mt-16">

  <h2 className="text-2xl font-bold mb-6">
    📚 You May Also Like
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

    {similarBooks.map((item) => (

      <div
        key={item._id}
        onClick={() =>
          navigate(`/book/${item._id}`)
        }
        className="
          cursor-pointer
          bg-white
          dark:bg-slate-800
          rounded-2xl
          shadow-lg
          overflow-hidden
          hover:scale-105
          transition
        "
      >

        <img
          src={item.image}
          alt={item.name}
          className="
            w-full
            h-48
            object-cover
          "
        />

        <div className="p-4">

          <h3 className="font-semibold truncate">
            {item.name}
          </h3>

          <p className="text-pink-500 font-bold mt-2">
            ₹{item.price}
          </p>

        </div>

      </div>

    ))}

  </div>

</div>
    </div>
  );
}

export default BookDetails;


















