import { useState } from "react";
import { FiX, FiSearch, FiPlus, FiMinus, FiUser } from "react-icons/fi";

function MobileMenuSidebar({ isOpen, onClose }) {
  return (
    <div className={`fixed top-0 right-0 h-full w-[300px] bg-white z-[120] shadow-2xl transition-transform duration-300 flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex items-center justify-between p-5 border-b">
        <img src="/images/logo.png" alt="Logo" className="h-6 w-auto" />
        <button onClick={onClose} className="text-2xl text-gray-400"><FiX /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-5 pb-20">
        <div className="relative mb-6">
          <input type="text" placeholder="Search products..." className="w-full bg-gray-100 rounded-lg py-3 px-4 text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
          <FiSearch className="absolute right-3 top-3.5 text-gray-400" />
        </div>
        
        <MobileMenuItem title="Demos" options={["Modern", "Standard"]} />
        <MobileMenuItem title="Categories" options={["Fruits", "Vegetables"]} />
        
        <div className="mt-8 border-t pt-6 flex items-center gap-2 font-bold text-gray-700">
          <FiUser className="text-xl" />
          <span>Sign In</span>
        </div>
      </div>
    </div>
  );
}

function MobileMenuItem({ title, options }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-50">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between py-4 text-gray-700 font-semibold">
        {title}
        {isOpen ? <FiMinus className="text-emerald-500" /> : <FiPlus className="text-gray-400" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-60" : "max-h-0"}`}>
        {options.map((opt, idx) => (
          <a key={idx} href="#" className="block py-3 px-4 text-sm text-gray-500 border-l-2 border-emerald-100 mb-1 ml-2">{opt}</a>
        ))}
      </div>
    </div>
  );
}

export default MobileMenuSidebar;