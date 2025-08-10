import React from 'react';
import Home from './home/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
// import Courses from './assets/components/Course';
import Courses from './Courses/Courses';
import Signup from './assets/components/Signup';
import Login from './assets/components/Login';
import Contacts from'./Contacts/Contacts';
import {Toaster} from 'react-hot-toast';
import { useAuth } from './context/AuthProvider';




const App = () => {


  const [authUser, setAuthUser] = useAuth();
console.log("Logged in user from context:", authUser);

  return (

    <>
    <div className='dark:bg-slate-900 dark:text-white'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Course" element={authUser?<Courses/>:<Navigate to="/signup"/>} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Contact" element={<Contacts />} />
        
       
        
       
        
      </Routes>
      <Toaster/>
      </div>
    </>
  );
};

export default App;
