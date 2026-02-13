import React, { useEffect } from 'react';
import { FiX, FiUser, FiMail, FiPhone, FiTag } from "react-icons/fi";

const SignUpModal = ({ isOpen, onClose, onSwitch }) => {
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

                {/* Left Side: Image - Hidden on mobile, block on md+ screens */}
                <div className="hidden md:block md:w-[55%] relative group">
                    <img
                        src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop"
                        alt="Signup Background"
                        className="absolute inset-0 w-full h-full object-cover grayscale-[20%]"
                    />
                </div>

                {/* Right Side: Form */}
                <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col justify-center bg-white overflow-y-auto max-h-[90vh] md:max-h-none">
                    <div className="w-full max-w-sm mx-auto">
                        {/* Logo */}
                        <div className="mb-6 text-center md:text-left">
                            <img src="/images/logo.png" alt="Logo" className="h-10 md:h-12 w-auto inline-block md:block" />
                        </div>

                        <div className="mb-6 md:mb-8 text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-2">Sign Up for free!</h2>
                            <p className="text-sm text-gray-500 font-medium">
                                Already registered? <button onClick={onSwitch} className="text-[#84BC22] font-bold hover:underline cursor-pointer ml-1">Sign In Now</button>
                            </p>
                        </div>

                        <div className="space-y-4">
                            <InputField label="Name" placeholder="Full name" icon={<FiUser />} />
                            <InputField label="E-Mail" placeholder="Enter E-Mail address" icon={<FiMail />} />
                            <InputField label="Mobile No" placeholder="Enter Phone No" icon={<FiPhone />} />
                            <InputField label="Referral No" placeholder="Enter Referral No" icon={<FiTag />} />

                            <button className="w-full bg-[#84BC22] hover:bg-[#74a51d] text-white h-14 rounded-md font-black text-lg uppercase tracking-wide transition-all shadow-lg active:scale-[0.98] mt-4">
                                Send Code
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InputField = ({ label, placeholder, icon }) => (
    <div className="group">
        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">{label}</label>
        <div className="relative">
            <input 
                type="text" 
                placeholder={placeholder} 
                className="w-full h-11 px-4 bg-gray-50 border-2 border-gray-100 rounded-md focus:border-[#84BC22] focus:bg-white focus:outline-none transition-all font-semibold text-sm" 
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#84BC22]">{icon}</span>
        </div>
    </div>
);

export default SignUpModal;