import { NavLink } from "react-router-dom";
import { FiMenu, FiHome, FiShoppingBag, FiSearch, FiUser } from "react-icons/fi";

function BottomMobileNav({ setIsMenuOpen, setIsCartOpen }) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-100 z-[100] flex items-center justify-around px-2 pb-1 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <BottomNavItem icon={<FiMenu />} label="Menu" onClick={() => setIsMenuOpen(true)} />
      
      <NavLink to="/" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-emerald-500' : 'text-gray-500'}`}>
        <FiHome className="text-xl" />
        <span className="text-[10px] font-medium">Home</span>
      </NavLink>

      <div className="relative" onClick={() => setIsCartOpen(true)}>
        <div className="flex flex-col items-center gap-1 text-gray-500">
          <FiShoppingBag className="text-xl" />
          <span className="text-[10px] font-medium">Cart</span>
        </div>
        <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[8px] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center">0</span>
      </div>

      <BottomNavItem icon={<FiSearch />} label="Search" onClick={() => setIsMenuOpen(true)} />
      <BottomNavItem icon={<FiUser />} label="Account" />
    </div>
  );
}

function BottomNavItem({ icon, label, onClick }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 text-gray-500 active:text-emerald-500">
      <span className="text-xl">{icon}</span>
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

export default BottomMobileNav;