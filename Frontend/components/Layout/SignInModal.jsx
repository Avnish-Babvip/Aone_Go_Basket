import React, { useEffect } from 'react';
import { FiX, FiMail } from "react-icons/fi";

const SignInModal = ({ isOpen, onClose, onSwitch }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
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
                        <div className="mb-8 md:mb-10 text-center md:text-left">
                            <img src="/images/logo.png" alt="Logo" className="h-12 md:h-14 w-auto inline-block md:block" />
                        </div>

                        <div className="mb-8 md:mb-10 text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-3">Welcome Back</h2>
                            <p className="text-gray-500 font-medium">
                                New user? <button onClick={onSwitch} className="text-[#84BC22] font-bold hover:underline cursor-pointer ml-1">Create an account</button>
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="group">
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Email or Phone Number</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Enter details..."
                                        className="w-full h-14 px-5 bg-gray-50 border-2 border-gray-100 rounded-md focus:border-[#84BC22] focus:bg-white focus:outline-none transition-all font-semibold"
                                    />
                                    <FiMail className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#84BC22]" size={20} />
                                </div>
                            </div>

                            <button className="w-full bg-[#84BC22] hover:bg-[#74a51d] text-white h-16 rounded-md font-black text-lg uppercase tracking-wide transition-all shadow-lg shadow-[#84BC22]/20 active:scale-[0.98]">
                                Send Login Code
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInModal;