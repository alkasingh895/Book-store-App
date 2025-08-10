import React, { useEffect } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from "axios";
import toast from 'react-hot-toast';

function Signup() {

  const location=useLocation()
  const navigate = useNavigate();
  const from=location.state?.from?.pathname || "/";
  



  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async ( data) => {
    const userInfo={
      fullname:data.fullname,
      email:data.email,
      password:data.password,
      

    }
   await axios.post("http://localhost:5001/user/signup",userInfo)
    .then((res)=>{
      console.log(res.data)
      if(res.data){
        toast.success("signup Successfuly")
        navigate(from ,{replace:true});
        

      }
      localStorage.setItem("User",JSON.stringify(res.data.user));
    })
    .catch((err)=>{
      if(err.response){
        console.log(err);
        toast.error("Error:" + err.response.data.message);
      }
    });
    
  };

  // Redirected from login
  useEffect(() => {
    const shouldShowLogin = localStorage.getItem("showLogin");
    if (shouldShowLogin === "true") {
      localStorage.removeItem("showLogin");
      setTimeout(() => {
        document.getElementById("my_modal_3")?.showModal();
      }, 100);
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen dark:bg-slate-900 dark:text-white">
      <form
        className="w-[400px] p-10 border-0 bg-white dark:bg-slate-800 dark:text-white rounded shadow-md relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Close Button */}
        <button onClick={() => navigate('/')} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>

        <h3 className="font-bold text-lg mb-4">Signup</h3>

        {/* Name Field */}
        <div className="mb-3">
          <label className="block text-sm">Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full px-3 py-2 border rounded-md outline-none bg-white dark:bg-slate-700 dark:text-white"
            {...register("fullname", { required: "Name is required" })}
          />
          {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label className="block text-sm">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-md outline-none bg-white dark:bg-slate-700 dark:text-white"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div className="mb-3">
          <label className="block text-sm">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded-md outline-none bg-white dark:bg-slate-700 dark:text-white"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Button and Login Link */}
        <div className="flex flex-col items-center gap-2 mt-4">
          <button type="submit" className="bg-pink-500 text-white rounded-md px-6 py-2 hover:bg-pink-700 duration-200">
            Signup
          </button>

          <p className="text-md">
            Already have an account?{" "}
            <span
              className="underline text-blue-900 cursor-pointer"
              onClick={() => {
                localStorage.setItem("showLogin", "true");
                navigate("/login");
              }}
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
