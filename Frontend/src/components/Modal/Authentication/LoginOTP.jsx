import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  customerLogin,
  verifyCustomer,
} from "../../../features/actions/authentication";
import { FiX } from "react-icons/fi";
import { Spinner } from "../../Loader/Spinner";
import { OtpGrid } from "../../OtpGrid";

const LoginOTP = ({ isOpen, onClose, onSwitch }) => {
  const dispatch = useDispatch();
  const {
    isCustomerLoggedIn,
    customerData,
    loginCredentials,
    isLoading,
    isCredentials,
  } = useSelector((state) => state.authentication);

  const [otp, setOtp] = useState("");
  const handleConfirm = () => {
    if (otp.length !== 6) return;
    dispatch(
      verifyCustomer({
        customer_id: customerData?.data?.customer_id,
        otp,
      }),
    );
  };

  const handleResendOtp = () => {
    dispatch(
      customerLogin({
        login: loginCredentials.email,
        password: loginCredentials.password,
      }),
    );
  };

  useEffect(() => {
    if (isCustomerLoggedIn || !isCredentials) {
      onClose();
    }
  }, [isCustomerLoggedIn, isCredentials]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg max-w-[1100px] w-full min-h-[500px] md:min-h-[600px] overflow-hidden flex flex-col md:flex-row relative shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-black hover:bg-gray-100 p-2 rounded-md transition-all z-20"
          >
            <FiX size={28} />
          </button>

          {/* Left Side: Image - UPDATED: Added 'hidden md:block' */}
          <div className="hidden md:block md:w-[55%] relative group">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop"
              alt="Login Background"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          </div>

          {/* Right Side: Form - UPDATED: Added 'py-12' for better mobile spacing */}
          <div className="w-full md:w-[45%] p-8 md:p-16 flex flex-col justify-center bg-white">
            <div className="w-full max-w-sm mx-auto">
              {/* Logo */}
              <div className="mb-8 md:mb-5 text-center md:text-left">
                <img
                  src="src/assets/images/logo.png"
                  alt="Logo"
                  className="h-24 md:h-32 w-auto inline-block md:block"
                />
              </div>

              <div className="mb-8 md:mb-10 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-3">
                  Enter the Login OTP
                </h2>
                <button
                  onClick={onSwitch}
                  className="text-[#84BC22] font-bold hover:underline cursor-pointer ml-1"
                >
                  Back to login
                </button>
              </div>

              <div className="space-y-6">
                <div className="text-right mb-4">
                  {/* OTP GRID */}
                  <OtpGrid onChange={setOtp} />
                  <button
                    onClick={handleResendOtp}
                    className="text-[#84BC22] font-bold  text-sm hover:underline"
                  >
                    Resend
                  </button>
                </div>

                <button
                  onClick={handleConfirm}
                  disabled={otp.length !== 6}
                  className="w-full bg-[#84BC22] hover:bg-[#74a51d] text-white h-16 rounded-md font-black text-lg uppercase tracking-wide transition-all shadow-lg shadow-[#84BC22]/20 active:scale-[0.98]"
                >
                  {isLoading ? <Spinner /> : "Verify"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginOTP;
