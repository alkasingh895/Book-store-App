import React from 'react'
// import Card from './card'
import Card from './Card.jsx'
import { Link } from "react-router-dom"
import { useState } from 'react'
import { useEffect } from 'react'
// import axios from "axios"
import api from "../../api/axios.js"

function Course() {
  const [book,setBook]=useState([])
  const [search, setSearch] = useState("");



const [sortBy, setSortBy] =
  useState("default");



  useEffect(() =>{
const getBook=async()=>{
    try {
     // const res = await axios.get("http://localhost:5001/book");
     const res = await api.get("/book");
     console.log(res.data);
     setBook(res.data);
    
    } catch (error) {
      console.log(error);
      
    }
   };

   getBook();
  },[])



const filteredBooks = book
  .filter((item) => {

    const matchesSearch =
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.type?.toLowerCase().includes(search.toLowerCase());

    return matchesSearch;

  })
  .sort((a, b) => {

    if (sortBy === "lowToHigh") {
      return a.price - b.price;
    }

    if (sortBy === "highToLow") {
      return b.price - a.price;
    }

    if (sortBy === "rating") {
      return (b.rating || 0) - (a.rating || 0);
    }

    return 0;

  });


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

          {/* ========== CHANGE: books section — saari books clear dikhein, scroll ke liye padding ========== */}
          <div className="mt-10 mb-16 text-left">


<div className="flex flex-col md:flex-row gap-4 mb-6">

  <input
    type="text"
    placeholder="🔍 Search books..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="
      flex-1
      px-4
      py-2
      border
      rounded-lg
      bg-white
      dark:bg-slate-800
      dark:border-slate-600
      outline-none
      focus:ring-2
      focus:ring-pink-500
    "
  />

<select
    value={sortBy}
    onChange={(e) =>
      setSortBy(e.target.value)
    }
    className="
      px-4
      py-2
      border
      rounded-lg
      bg-white
      dark:bg-slate-800
    "
  >
    <option value="default">
      Sort By
    </option>

    <option value="lowToHigh">
      Price Low → High
    </option>

    <option value="highToLow">
      Price High → Low
    </option>

    <option value="rating">
      Highest Rated
    </option>
  </select>

</div>




            <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">All Books ({filteredBooks.length})</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              
            </p>
            {book.length === 0 ? (
              <p className="text-red-500">Books load nahi hui. Backend port 5001 par chal raha hai?</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
                {filteredBooks.map((item) => (
                  <Card key={item._id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Course
