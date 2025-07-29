import React from 'react'
import Navbar from '../assets/components/Navbar'
import Course from '../assets/components/Course'
import Footer from '../assets/components/footer'
import list from '../assets/list.json';



function Courses() {
    console.log(list);
  return (
    <>
    <Navbar/>
    <div className='min-h-screen'>
        <Course/>
    </div>
    
    <Footer/>
    </>
  )
}

export default Courses
