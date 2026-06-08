import React from 'react';
import Home from './home/Home';
import { Routes, Route, Navigate } from 'react-router-dom';

import Courses from './Courses/Courses';
import Signup from './assets/components/Signup';
import Login from './assets/components/Login';
import Contacts from'./Contacts/Contacts';
import Admin from './Admin/Admin';
import AdminLogin from './assets/components/AdminLogin';
import {Toaster} from 'react-hot-toast';
import { useAuth } from './context/AuthProvider';
import { useAdmin } from './context/AdminProvider';

import AdminLayout from './Admin/AdminLayout';
import ContactMessages from './Admin/ContactMessages';
import Newsletter from './Admin/Newsletter';
import Dashboard from './Admin/Dashboard';
import ForgotPassword from "./assets/components/ForgotPassword";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Profile from "./assets/components/Profile";
import AdminOrders from "./pages/AdminOrders";
import BookDetails from "./pages/BookDetails";
import Watchlist from "./pages/Watchlist";

import PaymentSuccess
from "./pages/PaymentSuccess";



const App = () => {


  const [authUser, setAuthUser] = useAuth();
  const [adminUser, setAdminUser] = useAdmin();
console.log("Logged in user from context:", authUser);

  return (

    <>
    
    <div className='bg-white text-slate-900 dark:bg-slate-900 dark:text-white min-h-screen'>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/course" element={authUser ? <Courses /> : <Navigate to="/signup" />} />

        <Route
  path="/cart"
  element={
    authUser ? <Cart /> : <Navigate to="/login" />
  }
/>


        
  <Route
  path="/admin"
  element={adminUser ? <AdminLayout /> : <Navigate to="/" />}
>

  <Route
  index
  element={<Dashboard />}
/>

  <Route
    path="books"
    element={<Admin />}
  />

  <Route
    path="messages"
    element={<ContactMessages />}
  />

  <Route
    path="newsletter"
    element={<Newsletter />}
  />




  <Route
  path="orders"
  element={<AdminOrders />}
/>

</Route>


        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
        <Route path="/contact" element={<Contacts />} />


        <Route
  path="/checkout"
  element={<Checkout />}
/>



<Route
  path="/my-orders"
  element={<MyOrders />}
/>


<Route
  path="/book/:id"
  element={<BookDetails />}
/>


<Route
  path="/profile"
  element={<Profile />}
/>  



<Route
  path="/watchlist"
  element={<Watchlist />}
/>




<Route
  path="/payment-success"
  element={
    <PaymentSuccess />
  }
/>


             
      </Routes>
      <AdminLogin />
      <Toaster/>
      </div>
    </>
  );
};

export default App;
