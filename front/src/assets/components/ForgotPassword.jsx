import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";

import toast from "react-hot-toast";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const handleResetPassword = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post(
        "/password/forgot-password",
        {
          email,
          newPassword,
        }
      );

      toast.success(
        response.data.message
      );

      setTimeout(() => {

  navigate("/");

}, 1500);

      setEmail("");

      setNewPassword("");

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-slate-950 text-white px-4">

      <form
        onSubmit={handleResetPassword}
        className="bg-slate-900 p-8 rounded-2xl w-full max-w-md border border-slate-800"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Forgot Password
        </h1>

        <div className="mb-4">

          <label className="block mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 outline-none"
            required
          />

        </div>

        <div className="mb-6">

          <label className="block mb-2">
            New Password
          </label>

          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 outline-none"
            required
          />

        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 py-3 rounded-lg font-semibold duration-300"
        >
          Reset Password
        </button>

      </form>

    </div>
  );
}

export default ForgotPassword;