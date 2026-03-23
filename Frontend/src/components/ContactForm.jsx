import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { instance } from "../services/axiosInterceptor";
import { Spinner } from "../../../admin/src/components/Loader/Spinner";
import { contactUs } from "../features/actions/customer";

export default function ContactForm() {
  const dispatch = useDispatch();
  const { customerLoading } = useSelector((state) => state.customer);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [captcha, setCaptcha] = useState(null);

  // Fetch captcha
  const getCaptcha = async () => {
    try {
      const res = await instance.get("/admin/captcha"); // your API
      setCaptcha(res?.data?.data);
    } catch (error) {
      console.error("Captcha error:", error);
    }
  };
  useEffect(() => {
    getCaptcha();
  }, []);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      captcha_token: captcha?.token,
    };

    dispatch(contactUs(payload))
      .unwrap()
      .then(() => {
        reset();
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-lg "
    >
      {/* Full Name */}
      <div className="mb-4">
        <label className="text-sm font-medium">Full Name *</label>
        <input
          type="text"
          placeholder="Enter your full name"
          {...register("name", { required: "Full name is required" })}
          className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="text-sm font-medium">Email Address *</label>
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
          className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="text-sm font-medium">Phone (Optional)</label>
        <input
          type="text"
          placeholder="Enter your phone"
          {...register("phone")}
          className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green"
        />
      </div>

      {/* Message */}
      <div className="mb-4">
        <label className="text-sm font-medium">Message</label>
        <textarea
          rows="4"
          placeholder="Briefly describe..."
          {...register("message", { required: "Message is required" })}
          className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green"
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* CAPTCHA */}
      {captcha && (
        <div className="mb-4">
          <label className="text-sm font-medium">
            Solve: {captcha.question} =
          </label>
          <input
            type="text"
            placeholder="Enter answer"
            {...register("captcha_answer", {
              required: "Captcha answer is required",
            })}
            className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green"
          />
          {errors.captcha_answer && (
            <p className="text-red-500 text-xs mt-1">
              {errors.captcha_answer.message}
            </p>
          )}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-brand-green text-white py-2 rounded-xl hover:bg-lime-600 transition"
      >
        {customerLoading ? <Spinner /> : "Send Message"}
      </button>
    </form>
  );
}
