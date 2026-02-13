import { NavLink } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import AppDownloadBanner from "../Pages/Home/AppDownloadBanner";

function Footer() {
  return (
    <>
      <AppDownloadBanner />

      <footer className="bg-white border-t border-gray-100 pt-16 pb-8 w-full">
        <div className="w-full px-4 md:px-10 lg:px-16">

          {/* Changed grid-cols-6 to grid-cols-5 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">

            {/* 1. Logo & Description */}
            <div className="min-w-[200px]">
              <NavLink to="/" className="flex items-center mb-6">
                <img src="/images/logo.png" alt="Logo" className="h-20 w-auto" />
              </NavLink>
              <p className="text-gray-500 text-[14px] leading-6 mb-6">
                We offer high-quality foods the delivery service and best the food market can blindly trust.
              </p>
              <div className="flex gap-2">
                <SocialBtn icon={<FaFacebookF />} bg="#3b5998" />
                <SocialBtn icon={<FaTwitter />} bg="#55acee" />
                <SocialBtn icon={<FaInstagram />} bg="#e4405f" />
                <SocialBtn icon={<FaYoutube />} bg="#cd201f" />
              </div>
            </div>

            {/* 2. About Us */}
            <div>
              <h3 className="text-black font-bold text-base mb-6">About Us</h3>
              <ul className="space-y-4 text-gray-500 text-[14px]">
                <li><NavLink
                    to="about"
                    className={({ isActive }) => `${isActive}  hover:text-emerald-600 transition-colors duration-300`}>About us
                    </NavLink>
                    </li>
                <li>
                  <NavLink
                    to="contact-us"
                    className={({ isActive }) => `${isActive}  hover:text-emerald-600 transition-colors duration-300`}>Contact us</NavLink>
                </li>
                {/* <li><a href="#" className="hover:text-emerald-600 transition-colors">Customer Support</a></li> */}
                <li>
                  <NavLink
                    to="faq"
                    className={({ isActive }) => `${isActive}  hover:text-emerald-600 transition-colors duration-300`}>FAQ's</NavLink>
                </li>
              </ul>
            </div>

            {/* 3. Shop Categories */}
            <div>
              <h3 className="text-black font-bold text-base mb-6">Shop Categories</h3>
              <ul className="space-y-4 text-gray-500 text-[14px]">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Vegetables</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Fresh Fruits</a></li>

              </ul>
            </div>

            {/* 4. Our Information */}
            <div>
              <h3 className="text-black font-bold text-base mb-6">Our Information</h3>
              <ul className="space-y-4 text-gray-500 text-[14px]">
                  <li>
                  <NavLink
                    to="privacy-policy"
                    className={({ isActive }) => `${isActive}  hover:text-emerald-600 transition-colors duration-300`}>Privacy Policy</NavLink>
                </li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Terms & conditions</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Return Policy</a></li>
              </ul>
            </div>

            {/* 5. Subscribe Now (Replaces Community as the 5th column) */}
            <div>
              <h3 className="text-black font-bold text-base mb-6">Subscribe Now</h3>
              <p className="text-gray-500 text-[14px] mb-6 leading-6">
                Subscribe your email for newsletter and featured news based on your interest
              </p>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Write your email here"
                  className="w-full h-12 bg-white border border-gray-200 rounded-md px-4 pr-12 text-sm focus:border-emerald-500 outline-none transition-all"
                />
                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors">
                  <FiArrowRight size={18} />
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-gray-500 text-sm">
              © Copyright 2026 <span className="text-black font-semibold">AONE GO BASKET</span>. All rights reserved
            </p>

            <div className="flex flex-wrap items-center justify-center gap-5 grayscale opacity-70">
              <img src="/images/credit.png" alt="Visa" className="h-10 md:h-10" />
              <img src="/images/mastercard-payment.png" alt="Mastercard" className="h-10 md:h-10" />
              <img src="/images/upi-payment.png" alt="UPI" className="h-10 md:h-10" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function SocialBtn({ icon, bg }) {
  return (
    <a
      href="#"
      style={{ backgroundColor: bg }}
      className="w-8 h-8 flex items-center justify-center rounded-full text-white transition-transform hover:-translate-y-1"
    >
      <span className="text-xs">{icon}</span>
    </a>
  );
}

export default Footer;