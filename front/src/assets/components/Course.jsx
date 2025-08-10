import React from 'react'
import Card from './card'
import { Link } from "react-router-dom"
import { useState } from 'react'
import { useEffect } from 'react'
import axios from "axios"

function Course() {
  const [book,setBook]=useState([])
  useEffect(() =>{
   const getBook=async()=>{
    try {
     const res = await axios.get("http://localhost:5001/book");
     console.log(res.data);
     setBook(res.data);
    
    } catch (error) {
      console.log(error);
      
    }
   };
   getBook();
  },[])
  return (
    <>
      {/* ✅ Light + Dark Mode Background */}
      <div className="bg-white text-black dark:bg-[#0c1022] dark:text-white min-h-screen pt-[90px]">
        <div className='max-w-screen-2xl mx-auto md:px-20 px-4'>
          <div className='items-center justify-center text-center'>
            <h1 className='text-2xl md:text-4xl'>
              We are delighted to have you <span className='text-blue-500 dark:text-blue-400'>Here! :)</span>
            </h1>
            <p className='mt-12'>
             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro,
             assumenda? Repellendus, iste corrupti? Tempore laudantium
             repellendus accusamus accusantium sed architecto odio, nisi expedita
             quas quidem nesciunt debitis dolore non aspernatur praesentium
             assumenda sint quibusdam, perspiciatis, explicabo sequi fugiat amet
             animi eos aut. Nobis quisquam reiciendis sunt quis sed magnam
             consequatur!
            </p>
            <Link to="/">
              <button className='mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300 cursor-pointer'>Back</button>
            </Link>
          </div>

          <div className='mt-12 grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch'>
            {book.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Course
