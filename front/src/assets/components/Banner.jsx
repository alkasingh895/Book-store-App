import React from 'react'
import { useState } from "react";
import api from "../../api/axios.js";
import toast from "react-hot-toast";
// import banner from "../../assets/Banner.png" // project mein file nahi thi
// Unsplash — internet off / block hone par broken icon aata tha:
// const banner = "https://images.unsplash.com/photo-1497633762263-10fc9da17ca5?w=600&h=450&fit=crop"
// LOCAL image — hamesha load (public folder)
const banner = "/banner-books.svg";

// Apni photo: front/public/Banner.png rakho → const banner = "/Banner.png"

function Banner() {

  const [email, setEmail] = useState("");


const handleSubscribe = async () => {
  try {

    if (!email) {
      return toast.error("Please enter your email");
    }

    const response = await api.post("/newsletter/subscribe", {
      email,
    });

    if (response.data.success) {
      toast.success("🎉 Subscribed Successfully!");
      setEmail("");
    }

  } catch (error) {

    console.log(error);

    toast.error(
      error.response?.data?.message || "Subscription failed"
    );
  }
};



  return (
    <>
    {/* CHANGE: light mode — hero section white background, dark readable text */}
    <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row bg-white dark:bg-transparent pt-24 pb-8' >
    <div className=' w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-32'>
    <div className='space-y-10'>
    <h1 className='text-4xl font-bold text-slate-900 dark:text-white'>
      Hello, welcome here to learn something <span className='text-blue-600 dark:text-blue-400'>new everyday!!!</span>
    </h1>
    <p className='text-xl text-slate-700 dark:text-gray-300'>
     Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor,
     et totam. Tempora amet atque expedita, quae corrupti totam sed
     pariatur corporis at veniam est voluptas animi!
    </p>

    {/* input fild email */}
<label className="input validator flex items-center gap-2 bg-white dark:bg-[#0c1022] border border-gray-300 rounded-md px-4 py-2 w-full ">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </g>
  </svg>
 <input
  type="email"
  placeholder="mail@site.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  className="bg-transparent text-black dark:text-white w-full focus:outline-none"
/>
</label>
<div className="validator-hint hidden">Enter valid email address</div>

</div>
<button
  onClick={handleSubscribe}
  className="btn btn-secondary"
>
  Subscribe
</button>
</div>



    <div className='  order-1 w-full md:w-1/2 flex justify-center items-center pt-11'>
    <img
      src={banner}
      className="w-96 max-w-full h-auto object-contain rounded-2xl shadow-lg"
      alt="bookStore books"
      onError={(e) => {
        e.currentTarget.onerror = null
        e.currentTarget.src = "/Banner.svg"
      }}
    />
    </div>
    </div>
    </>
  )







}

export default Banner
