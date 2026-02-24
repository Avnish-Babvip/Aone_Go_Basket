import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import { forgotPassword } from "../../features/actions/authentication";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../../components/Loader/Spinner";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const slides = [
    {
      title: "Demo Text Here",
      subtitle: "Slider 1",
      desc: "Founder, Flo and Wer shop",
    },
    {
      title: "Empower Your Business",
      subtitle: "Slider 2",
      desc: "Grow with Smart HRMS Tools",
    },
    {
      title: "Seamless Experience",
      subtitle: "Slider 3",
      desc: "Manage employees with ease",
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };
  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.authentication);

  const onSubmit = (data) => {
    dispatch(forgotPassword(data));
  };

  // Auto slide
  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute w-40 h-40 bg-gradient-to-r from-[#009220] to-[#549A01] rounded-full left-1/2 -translate-x-1/2 -top-20 shadow-[0_0_180px_60px_rgba(200,160,255,0.55)]"></div>

      <div className="absolute w-60 h-60 bg-gradient-to-r from-[#009220] to-[#549A01] shadow-[0_0_180px_60px_rgba(200,160,255,0.55)] rounded-full sm:-bottom-18 -bottom-36 right-64 sm:right-25"></div>
      <div className="hidden sm:block  absolute w-36 h-36 bg-gradient-to-r from-[#009220] to-[#549A01] shadow-[0_0_180px_60px_rgba(200,160,255,0.55)] rounded-full  -left-18"></div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-[90%] md:w-[70%] lg:w-[65%] bg-white rounded-3xl shadow-xl overflow-hidden z-10"
      >
        {/* Left Side - Login */}
        <div className="w-full md:w-1/2 px-10 py-20 flex flex-col justify-center text-center">
          <img src="/logo.png" alt="Logo" className="mx-auto w-40 mb-4" />
          <h2 className="text-3xl font-semibold tracking-tight mb-6 text-gray-800">
            Forgot Password
          </h2>

          <input
            {...register("email", {
              required: "Email is required",
            })}
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-8 focus:ring-2 focus:ring-brand-green outline-none"
          />

          <button className="w-full bg-gradient-to-r  from-[#009220] to-[#549A01] text-white py-4 rounded-lg font-semibold shadow-md hover:shadow-lg transition">
            {isLoading ? <Spinner /> : "Submit"}
          </button>

          <div className="flex justify-center gap-4 mt-4 text-sm">
            <Link to="/login" className="text-black hover:underline">
              Back to Login
            </Link>
          </div>
        </div>

        {/* Right Side - Slider */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-b from-[#009220] to-[#549A01] text-white flex-col  justify-end px-10 relative">
          <div className="transition-all duration-700 absolute bottom-10">
            <h2 className="text-3xl font-bold mb-2">{slides[current].title}</h2>
            <h4 className="font-semibold">{slides[current].subtitle}</h4>
            <p className="text-gray-400">{slides[current].desc}</p>
            <p className="text-sm mt-6 opacity-70">
              {current + 1} of {slides.length}
            </p>
          </div>

          {/* Controls */}
          <div className="absolute bottom-10 right-10 flex gap-3">
            <button
              onClick={prevSlide}
              className="w-9 h-9 flex  items-center justify-center rounded-full border border-gray-400 hover:bg-gray-200 hover:text-black transition"
            >
              <IoArrowBackOutline />
            </button>
            <button
              onClick={nextSlide}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-400 hover:bg-gray-200 hover:text-black transition"
            >
              <IoArrowForwardOutline />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
