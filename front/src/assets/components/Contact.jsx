import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, User, MessageSquare, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/axios.js";

function Contact() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Submit Handler
  const onSubmit = async (data) => {
  try {

    const response = await api.post("/contact/send", data);

    if (response.data.success) {
      toast.success("✅ Message sent successfully!");
      reset();
    }

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message || "❌ Failed to send message"
    );
  }
};
  return (
    <div className="min-h-screen pt-28 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center px-4 py-10">
      
      {/* Contact Card */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-10">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-pink-500 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-slate-800 dark:text-white">
            Contact Us
          </h2>

          <p className="text-slate-500 dark:text-slate-300 mt-3">
            We'd love to hear from you. Send us your message anytime.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Name */}
          <div>
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2 block">
              Full Name
            </label>

            <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-xl overflow-hidden bg-white dark:bg-slate-700 focus-within:ring-2 focus-within:ring-pink-500">
              <span className="px-4 text-slate-500">
                <User size={20} />
              </span>

              <input
                type="text"
                placeholder="Enter your full name"
                {...register("name", {
                  required: "Name is required",
                })}
                className="w-full px-3 py-4 outline-none bg-transparent text-slate-800 dark:text-white"
              />
            </div>

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2 block">
              Email Address
            </label>

            <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-xl overflow-hidden bg-white dark:bg-slate-700 focus-within:ring-2 focus-within:ring-pink-500">
              <span className="px-4 text-slate-500">
                <Mail size={20} />
              </span>

              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                })}
                className="w-full px-3 py-4 outline-none bg-transparent text-slate-800 dark:text-white"
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2 block">
              Your Message
            </label>

            <div className="flex border border-slate-300 dark:border-slate-600 rounded-xl overflow-hidden bg-white dark:bg-slate-700 focus-within:ring-2 focus-within:ring-pink-500">
              <span className="px-4 pt-4 text-slate-500">
                <MessageSquare size={20} />
              </span>

              <textarea
                rows={5}
                placeholder="Write your message here..."
                {...register("message", {
                  required: "Message is required",
                })}
                className="w-full px-3 py-4 outline-none bg-transparent resize-none text-slate-800 dark:text-white"
              />
            </div>

            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-pink-500 hover:bg-pink-600 transition-all duration-300 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-pink-300"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;