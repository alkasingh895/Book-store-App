import React from 'react'
import banner from "../../assets/Banner.png"

function Banner() {
  return (
    <>
    <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 flex  flex-col md:flex-row' >
    <div className=' w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-32'>
    <div className='space-y-10'>
    <h1 className='text-4xl font-bold'>
      Hello, welcome here to learn something <span className='text-blue-900'>new everyday!!!</span>
    </h1>
    <p className='text-xl'>
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
  <input type="email" placeholder="mail@site.com" required className="bg-transparent text-black dark:text-white w-full focus:outline-none" />
</label>
<div className="validator-hint hidden">Enter valid email address</div>

</div>
<button className=" btn  btn-secondary">Secondary</button>
</div>



    <div className='  order-1 w-full md:w-1/2 flex justify-center items-center pt-11'>
    <img src={banner} className="w-96 h-auto object-contain" alt="banner"/>
    </div>
    </div>
    </>
  )
}

export default Banner
