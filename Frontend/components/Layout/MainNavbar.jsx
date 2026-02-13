import { NavLink } from "react-router-dom";
import { FiShoppingBag, FiUser } from "react-icons/fi";
import { useState } from "react";
import MenuItem from "./MenuItem";
import Search from "./Search";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal"; // Ensure you create this file

function MainNavbar({ setIsCartOpen }) {
  // authView can be: null, 'signin', or 'signup'
  const [authView, setAuthView] = useState(null);

  const linkClass = ({ isActive }) =>
    `relative h-20 flex items-center gap-1 text-sm font-semibold transition-all px-1
     ${isActive ? "text-emerald-600 after:w-full" : "text-gray-700 hover:text-emerald-600 after:w-0 hover:after:w-full"}
     after:absolute after:left-0 after:bottom-[-1px] after:h-[3px] after:bg-emerald-500 after:transition-all after:duration-300`;

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <NavLink to="/" className="flex-shrink-0">
          <img src="/images/logo.png" alt="Logo" className="h-9 w-auto" />
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-7 h-20">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <MenuItem title="Categories" options={["Fruits", "Vegetables"]} />
          <MenuItem title="More" options={["Fruits", "Vegetables"]} />
        </nav>

        {/* Search */}
        <div className="hidden lg:flex flex-1 justify-center max-w-[300px]">
          <Search />
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-6">
          <div 
            onClick={() => setAuthView('signin')}
            className="hidden md:flex items-center gap-2 cursor-pointer font-bold text-sm text-gray-700 hover:text-emerald-600 transition-colors"
          >
            <FiUser className="text-xl" />
            <span>Sign In</span>
          </div>

          <div onClick={() => setIsCartOpen(true)} className="relative cursor-pointer text-gray-700 hover:text-emerald-600">
            <FiShoppingBag className="text-2xl" />
            <span className="absolute -top-1.5 -right-2 bg-emerald-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">0</span>
          </div>
        </div>
      </div>

      {/* Auth Modals */}
      <SignInModal 
        isOpen={authView === 'signin'} 
        onClose={() => setAuthView(null)} 
        onSwitch={() => setAuthView('signup')} 
      />

      <SignUpModal 
        isOpen={authView === 'signup'} 
        onClose={() => setAuthView(null)} 
        onSwitch={() => setAuthView('signin')} 
      />
    </div>
  );
}

export default MainNavbar;