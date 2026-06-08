import React from 'react'
// import Navbar from "../assets/components/Navbar";
// import Freebook from '../assets/components/Freebook';
import Navbar from "../assets/components/navbar.jsx";
import Banner from '../assets/components/Banner';
import Freebook from '../assets/components/freebook.jsx';
import Footer from '../assets/components/footer'




function Home() {
  return (
    <div className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white min-h-screen">
    <Navbar />
    <Banner />
    <Freebook/>
    <Footer/>
    </div>
  )
}

export default Home
