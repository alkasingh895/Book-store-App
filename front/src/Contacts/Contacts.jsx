import React from 'react';
import Navbar from '../assets/components/Navbar';
import Contact from '../assets/components/Contact';
import Footer from '../assets/components/footer';

function Contacts() {
  // Removed undefined console.log

  return (
    <>
      <Navbar />
      <div className='min-h-screen'>
        <Contact />
      </div>
      <Footer />
    </>
  );
}

export default Contacts;
