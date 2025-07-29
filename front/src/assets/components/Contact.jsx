import React from 'react';
import { Link } from "react-router-dom"
import { useForm } from 'react-hook-form';

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Contact Form Data:", data);
    alert("Message submitted successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 px-4">
      <div className="bg-white dark:bg-slate-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Contact Us</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none dark:bg-slate-700 dark:text-white"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Email</label>
            <input
              type="email"
              placeholder="Email address"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none dark:bg-slate-700 dark:text-white"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Message */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Message</label>
            <textarea
              placeholder="Type your message"
              {...register("message", { required: "Message is required" })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none dark:bg-slate-700 dark:text-white"
              rows={4}
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500  hover:bg-pink-700 duration-200 text-white font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
