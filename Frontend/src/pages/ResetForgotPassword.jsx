import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Spinner } from "../components/Loader/Spinner";
import { resetForgotPassword } from "../features/actions/authentication";

const ResetForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.authentication);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordRules = {
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
    validate: {
      hasUppercase: (value) =>
        /[A-Z]/.test(value) || "Must contain at least one uppercase letter",
      hasSpecialChar: (value) =>
        /[^A-Za-z0-9]/.test(value) ||
        "Must contain at least one special character",
    },
  };

  const onSubmit = (data) => {
    const payload = {
      email,
      token,
      password: data.password,
      password_confirmation: data.password_confirmation,
    };
    dispatch(resetForgotPassword(payload))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all"
    >
      <div className="bg-white rounded-lg max-w-[1100px] w-full min-h-[500px] md:min-h-[600px] overflow-hidden flex flex-col md:flex-row relative shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-300">
        {/* Left Side: Image - Hidden on mobile, block on md+ screens */}
        <div className="hidden md:block md:w-[55%] relative group">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop"
            alt="Signup Background"
            className="absolute inset-0 w-full h-full object-cover grayscale-[20%]"
          />
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col bg-white overflow-y-auto max-h-[90vh]">
          <div className="w-full max-w-sm mx-auto">
            {/* Logo */}
            <div className="mb-6 text-center md:text-left">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="h-24 md:h-32 w-auto inline-block md:block"
              />
            </div>

            <div className="mb-6 md:mb-8 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-2">
                Reset Password
              </h2>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-[#84BC22] font-bold hover:underline cursor-pointer ml-1"
              >
                Go to home
              </button>
            </div>

            <div className="space-y-4">
              <div className="group">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">
                  Password
                </label>

                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Password is required",
                      ...passwordRules,
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password..."
                    className="w-full h-14 px-5 pr-14 bg-gray-50 border-2 border-gray-100 rounded-md focus:border-brand-green focus:bg-white focus:outline-none transition-all font-semibold"
                  />

                  {/* TOGGLE ICON */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-green transition"
                  >
                    {showPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>

                  {errors.password && (
                    <div className="text-start text-sm pt-2 text-red-600">
                      {errors.password.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    {...register("password_confirmation", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter confirm password..."
                    className="w-full h-14 px-5 pr-14 bg-gray-50 border-2 border-gray-100 rounded-md focus:border-brand-green focus:bg-white focus:outline-none transition-all font-semibold"
                  />

                  {/* TOGGLE ICON */}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-green transition"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>

                  {errors.password_confirmation && (
                    <div className="text-start text-sm pt-2 text-red-600">
                      {errors.password_confirmation.message}
                    </div>
                  )}
                </div>
              </div>

              <button className="w-full bg-[#84BC22] hover:bg-[#74a51d] text-white h-14 rounded-md font-black text-lg uppercase tracking-wide transition-all shadow-lg active:scale-[0.98] mt-4">
                {isLoading ? <Spinner /> : "Change Password"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ResetForgotPassword;
