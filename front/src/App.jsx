import React from 'react';
import Home from './home/Home';
import { Routes, Route } from 'react-router-dom';
// import Courses from './assets/components/Course';
import Courses from './Courses/Courses';
import Signup from './assets/components/Signup';
import Login from './assets/components/Login';
import Contacts from'./Contacts/Contacts';




const App = () => {
  return (

    <>
    <div className='dark:bg-slate-900 dark:text-white'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Course" element={<Courses />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Contact" element={<Contacts />} />
        
        
       
        
      </Routes>
      </div>
    </>
  );
};

export default App;
