import React, { useEffect, useState } from 'react'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";



// import axios from "axios"
import api from "../../api/axios.js"
// import Card from './card';
import Card from './Card.jsx';



function Freebook() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        
        const res = await api.get("/book");
        const data = res.data.filter((data) => data.category === "free");
        console.log(data);
        
        setBook(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

    
  return (
  <>
  <div className='max-w-screen-2xl mx-auto md:px-20 px-4 bg-white text-slate-900 dark:bg-slate-900 dark:text-white py-8'>
    <div>
      <h1 className='font-semibold text-xl pb-2 text-slate-900 dark:text-white'>Free Offered Courses</h1>
    <p className="text-slate-700 dark:text-gray-300">
    Learn,ispum dolor sit amet consectetur adipisicing elit Dolor,
    et totam Tempora amet atque expedita, quae totam sed  partiatur 
    corporis at veniam est voluptas animi!
    </p>
    </div>
  
  {/* ========== CHANGE: slider padding — cards niche cut na hon, har slide same width ========== */}
  <div className="mt-8 pb-20 min-h-[420px]">
    {book.length === 0 ? (
      <p className="text-sm text-gray-500">Free books load nahi hui. Backend check karo.</p>
    ) : (
      <Slider {...settings}>
        {book.map((item) => (
          <div key={item._id} className="px-2 outline-none">
            <Card item={item} />
          </div>
        ))}
      </Slider>
    )}
  </div>
  </div>

  </>
    
  );
}

export default Freebook
