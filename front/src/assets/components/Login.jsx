import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Login() {
  const navigate = useNavigate();  // <-- Added
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log("Form Data:", data);
    // API ya login logic
  };

  useEffect(() => {
    const shouldOpenModal = localStorage.getItem("showLogin");
    if (shouldOpenModal === "true") {
      localStorage.removeItem("showLogin");
      const modal = document.getElementById("my_modal_3");
      if (modal) modal.showModal();
    }
  }, []);

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-white text-black dark:bg-slate-900 dark:text-white">
          
          {/* ❌ Close Button with navigation */}
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => {
              document.getElementById("my_modal_3")?.close();
              navigate('/');  //  Redirect to home
            }}
          >
            ✕
          </button>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg mb-4">Login</h3>

            {/* Email Field */}
            <div className='mb-3 space-y-1'>
              <label>Email</label><br />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-80 px-3 py-2 border rounded-md outline-none bg-white dark:bg-slate-700 dark:text-white"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className='mb-3 space-y-1'>
              <label>Password</label><br />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-80 px-3 py-2 border rounded-md outline-none bg-white dark:bg-slate-700 dark:text-white"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Login Button and Signup Link */}
            <div className='flex flex-col sm:flex-row justify-around items-center mt-4 gap-3 sm:gap-0'>
              <button type="submit" className="bg-pink-500 text-white rounded-md px-6 py-2 hover:bg-pink-700 duration-200">
                Login
              </button>
              <p className="text-sm">
                Not registered?{" "}
                <span
                  className="underline text-blue-500 dark:text-blue-300 cursor-pointer"
                  onClick={() => {
                    localStorage.setItem("showSignup", "true");
                    navigate("/signup");
                  }}
                >
                  Signup
                </span>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
