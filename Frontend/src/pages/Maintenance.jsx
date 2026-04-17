import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { siteSettings } from "../features/actions/home";
import { useForm } from "react-hook-form";
import { FiUser, FiMail, FiPhone, FiMessageSquare } from "react-icons/fi";
import { submitMaintenanceContact } from "../features/actions/maintenance";
import { instance } from "../services/axiosInterceptor";
import { Spinner } from "../../../admin/src/components/Loader/Spinner";

const Maintenance = () => {
  const dispatch = useDispatch();
  const { siteData } = useSelector((state) => state.home);
  const { maintenanceLoading } = useSelector((state) => state.maintenance);

  const [captcha, setCaptcha] = useState(null);

  // Fetch captcha
  const getCaptcha = async () => {
    try {
      const res = await instance.get("/customer/captcha/maintenance"); // your API
      setCaptcha(res?.data);
    } catch (error) {
      console.error("Captcha error:", error);
    }
  };
  useEffect(() => {
    getCaptcha();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    dispatch(siteSettings());
  }, []);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      token: captcha?.token,
    };

    dispatch(submitMaintenanceContact(payload))
      .unwrap()
      .then(() => {
        reset();
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4 py-10">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* ================= LEFT ================= */}
        <div className="text-center md:text-left">
          {siteData?.footer_logo && (
            <img
              src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL_2}/${siteData.footer_logo}`}
              alt="Logo"
              className="h-16 object-contain mx-auto md:mx-0 mb-4"
            />
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-brand-green mb-2">
            Aone Go Basket
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            🚧 We’re Under Maintenance
          </h2>

          <p className="text-gray-600 mb-6">
            We're currently improving your shopping experience. Drop your query
            and we’ll get back to you.
          </p>

          <div className="flex justify-center md:justify-start">
            <div className="w-10 h-10 border-4 border-brand-green border-dashed rounded-full animate-spin"></div>
          </div>
        </div>

        {/* ================= RIGHT (FORM) ================= */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Send Enquiry
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <div className="flex items-center border border-gray-200 rounded-lg px-3">
                <FiUser className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register("name", { required: "Name is required" })}
                  className="w-full p-2 outline-none"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <div className="flex items-center border border-gray-200 rounded-lg px-3">
                <FiMail className="text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full p-2 outline-none"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Mobile */}
            <div>
              <div className="flex items-center border border-gray-200 rounded-lg px-3">
                <FiPhone className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Mobile Number"
                  {...register("mobile", { required: "Mobile is required" })}
                  className="w-full p-2 outline-none"
                />
              </div>
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.mobile.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <div className="flex items-start border border-gray-200 rounded-lg px-3">
                <FiMessageSquare className="text-gray-400 mt-3" />
                <textarea
                  placeholder="Your Message"
                  rows={3}
                  {...register("message", { required: "Message is required" })}
                  className="w-full p-2 outline-none"
                />
              </div>
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* CAPTCHA */}
            {captcha && (
              <div className="mb-4">
                <label className="text-sm font-medium">
                  Solve: {captcha.question} =
                </label>
                <input
                  type="number"
                  placeholder="Enter answer"
                  {...register("captcha", {
                    required: "Captcha answer is required",
                  })}
                  className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                />
                {errors.captcha && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.captcha.message}
                  </p>
                )}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-brand-green text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition"
            >
              {maintenanceLoading ? <Spinner /> : "Submit Enquiry"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
