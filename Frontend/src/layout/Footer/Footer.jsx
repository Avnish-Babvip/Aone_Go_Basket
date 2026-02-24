import { Link, NavLink } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { BiSolidSend } from "react-icons/bi";
import { useSelector } from "react-redux";

function Footer() {
  const { categoryData } = useSelector((state) => state.category);
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 w-full">
      {/* Container removed to allow full width, using px-4 to 20 for internal spacing */}
      <div className="w-full px-4 md:px-10 lg:px-16">
        {/* Top Section: 6 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10 mb-16">
          {/* 1. Logo & Description (Wider column) */}
          <div className="lg:col-span-1 min-w-[200px]">
            <NavLink to="/" className="flex items-center mb-6">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="h-20 w-30 object-contain"
              />
            </NavLink>
            <p className="text-gray-500 text-[14px] leading-6 mb-6">
              We offer high-quality foods the delivery service and best the food
              market can blindly trust.
            </p>
            <div className="flex gap-2">
              <SocialBtn icon={<FaFacebookF />} bg="#3b5998" />
              <SocialBtn icon={<FaTwitter />} bg="#55acee" />
              <SocialBtn icon={<FaInstagram />} bg="#e4405f" />
              <SocialBtn icon={<FaYoutube />} bg="#cd201f" />
            </div>
          </div>

          <div>
            <h3 className="text-black font-bold text-base mb-6">About Us</h3>
            <ul className="space-y-4 text-gray-500 text-[14px]">
              <li>
                <Link
                  to="/about-us"
                  className="hover:text-brand-green transition-colors"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="hover:text-brand-green transition-colors"
                >
                  Contact us
                </Link>
              </li>

              <li>
                <Link
                  to="/faq"
                  className="hover:text-brand-green transition-colors"
                >
                  FAQ's
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-black font-bold text-base mb-6">
              Shop Categories
            </h3>
            <ul className="space-y-4 text-gray-500 text-[14px]">
              {Array.isArray(categoryData) &&
                categoryData.map((cat, idx) => (
                  <li>
                    <Link
                      to={`/category?category_slug=${cat?.slug}`}
                      className="hover:text-brand-green transition-colors"
                    >
                      {cat?.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h3 className="text-black font-bold text-base mb-6">
              Our Information
            </h3>
            <ul className="space-y-4 text-gray-500 text-[14px]">
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-brand-green transition-colors"
                >
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-black font-bold text-base mb-6">
              Subscribe Now
            </h3>
            <p className="text-gray-500 text-[14px] mb-6 leading-6">
              Subscribe your email for newsletter and featured news based on
              your interest
            </p>
            <div className="relative group">
              <input
                type="email"
                placeholder="Write your email here"
                className="w-full h-12 bg-white border border-gray-200 rounded-md px-4 pr-12 text-sm focus:border-brand-green outline-none transition-all"
              />
              <button className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-brand-green text-white rounded-md hover:bg-brand-green transition-colors">
                <BiSolidSend size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payments */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-sm">
            © Copyright 2026{" "}
            <span className="text-black font-semibold">BABVIP</span>. All rights
            reserved
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 ">
            <img src="/images/visa.png" alt="Visa" className="h-3 md:h-4" />
            <img
              src="/images/mastercard.png"
              alt="Mastercard"
              className="h-5 md:h-10"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

// Reusable Social Button Component
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
